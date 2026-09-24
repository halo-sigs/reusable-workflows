import assert from "node:assert/strict";
import test from "node:test";
import axios from "axios";
import { Octokit } from "octokit";
import { formatError } from "../src/utils/format-error.ts";

test("HTTP failure includes the request and server detail without credentials", () => {
  const error = new axios.AxiosError(
    "Request failed with status code 422",
    "ERR_BAD_REQUEST",
    {
      method: "post",
      url: "/releases",
      headers: { Authorization: "Bearer private-token" },
    },
    {},
    {
      status: 422,
      data: { detail: "Invalid version", requestId: "req-123" },
    },
  );

  assert.equal(
    formatError(error),
    "POST /releases: HTTP 422: Invalid version (requestId: req-123)",
  );
});

test("network and non-Axios failures remain readable", () => {
  const networkError = new axios.AxiosError("socket hang up", "ECONNRESET", {
    method: "get",
    url: "/releases",
  });

  assert.equal(formatError(networkError), "GET /releases: socket hang up");
  assert.equal(
    formatError(new Error("Missing release ID")),
    "Missing release ID",
  );
});

test("GitHub API failure includes request path and status", async () => {
  const octokit = new Octokit({
    auth: "dummy",
    request: {
      fetch: async () =>
        new Response(JSON.stringify({ message: "Not Found" }), {
          status: 404,
          headers: { "content-type": "application/json" },
        }),
    },
  });

  await assert.rejects(
    octokit.request("GET /repos/{owner}/{repo}?debug=private-token", {
      owner: "halo-sigs",
      repo: "missing",
    }),
    (error) => {
      assert.match(error.request.url, /debug=private-token/);
      assert.equal(
        formatError(error),
        "GET /repos/halo-sigs/missing: HTTP 404: Not Found",
      );
      return true;
    },
  );
});
