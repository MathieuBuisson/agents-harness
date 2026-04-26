import { tool } from "@opencode-ai/plugin"
import fs from "fs/promises"
import path from "path"

const MAX_LEN = 2000;

const limit = (str: string): string =>
  str.length > MAX_LEN
    ? str.substring(0, MAX_LEN) + "\n... [Output truncated for brevity] ..."
    : str;

const resolveStatus = (exitCode: number): string => {
  switch (exitCode) {
    case 0:   return "No type errors found";
    case 1:   return "Type errors detected";
    case 2:   return "Fatal error (bad arguments or internal mypy crash)";
    default:  return `Unexpected exit code: ${exitCode}`;
  }
};

export default tool({
  description: "Run mypy to perform static type checking on Python files or directories.",
  args: {
    paths: tool.schema.array(tool.schema.string())
      .describe("List of relative files or directories (e.g., ['src/', 'tests/', 'setup.py'])"),
  },
  async execute({ paths }, { worktree, $ }) {
    if (paths.length === 0) {
      return { success: false, error: "No paths provided." };
    }

    const worktreeResolved = path.resolve(worktree);

    const invalidPaths = (
      await Promise.all(
        paths.map(async (p) => {
          const resolved = path.resolve(worktree, p);
          if (!resolved.startsWith(worktreeResolved + path.sep) && resolved !== worktreeResolved) {
            return { p, reason: "outside worktree" };
          }
          try {
            await fs.access(resolved);
            return null;
          } catch {
            return { p, reason: "does not exist" };
          }
        })
      )
    ).filter((x): x is { p: string; reason: string } => x !== null);

    if (invalidPaths.length > 0) {
      const detail = invalidPaths.map(({ p, reason }) => `'${p}' (${reason})`).join(", ");
      return { success: false, error: `Invalid path(s): ${detail}` };
    }

    try {
      const result = await $`mypy ${paths} --install-types --non-interactive`
        .cwd(worktree)
        .nothrow()
        .quiet();

      return {
        success: result.exitCode === 0,
        status: resolveStatus(result.exitCode),
        stdout: limit(result.stdout.toString().trim()),
        stderr: limit(result.stderr.toString().trim()),
      };
    } catch (err: any) {
      return { success: false, error: `Execution error: ${err.message}` };
    }
  }
})