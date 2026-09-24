import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";

test("input errors become concise action failures", () => {
  for (const [token, readme, expected] of [
    ["", "false", "Input required and not supplied: github-token"],
    ["dummy", "invalid", "sync-github-readme"],
  ]) {
    const result = spawnSync(process.execPath, ["dist/index.js"], {
      cwd: new URL("..", import.meta.url),
      env: {
        ...process.env,
        "INPUT_GITHUB-TOKEN": token,
        "INPUT_SYNC-GITHUB-README": readme,
      },
      encoding: "utf8",
    });

    assert.equal(result.status, 1);
    assert.match(result.stdout, /::error::/);
    assert.ok(result.stdout.includes(expected));
    assert.equal(result.stderr, "");
  }
});
