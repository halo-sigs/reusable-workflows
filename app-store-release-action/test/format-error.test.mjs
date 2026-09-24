import assert from "node:assert/strict";
import test from "node:test";
import axios from "axios";
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
