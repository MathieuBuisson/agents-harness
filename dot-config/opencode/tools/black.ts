import { tool } from "@opencode-ai/plugin"
import fs from "fs/promises"
import path from "path"

export default tool({
  description: "Run black commands to format Python code or check Python code style.",
  args: {
    paths: tool.schema.array(tool.schema.string())
      .describe("List of relative files or directories (e.g., ['main.py', 'src/'])"),
    check: tool.schema.boolean().optional()
      .describe("Don't write files back, just return status"),
    diff: tool.schema.boolean().optional()
      .describe("Don't write files back, just show a diff of proposed changes"),
    fast: tool.schema.boolean().optional()
      .describe("Skip temporary sanity checks for speed")
  },
  async execute({ paths, check, diff, fast }, { worktree, $ }) {
    // Flag mutual exclusion guard
    if (check && diff) {
      return "Cannot use --check and --diff together. Use --check to get exit status only, or --diff to see proposed changes.";
    }

    const invalidPaths = (
      await Promise.all(
        paths.map(async (p) => {
          try {
            await fs.access(path.join(worktree, p));
            return null;
          } catch {
            return p;
          }
        })
      )
    ).filter((p): p is string => p !== null);

    if (invalidPaths.length > 0) {
      return `Path(s) do not exist: ${invalidPaths.map(p => `'${p}'`).join(", ")}`;
    }

    const flags = [];
    if (check) flags.push("--check");
    if (diff) flags.push("--diff");
    if (fast) flags.push("--fast");

    try {
      const result = await $`black ${paths} ${flags}`
        .cwd(worktree)
        .nothrow()
        .quiet();

      // ✅ CHANGE: Added output limiting to protect context window
      const limit = (str: string) => {
        const MAX_LEN = 2000;
        return str.length > MAX_LEN
          ? str.substring(0, MAX_LEN) + "\n... [Output truncated for brevity] ..."
          : str;
      };

      const resolveStatus = (exitCode: number, check?: boolean, diff?: boolean): string => {
        if (exitCode === 123) return "Internal error (possibly a syntax error in source file)";

        if (check) {
          return exitCode === 0
            ? "All files are already formatted"
            : "Files would be reformatted";
        }

        if (diff) {
          return exitCode === 0
            ? "No changes needed"
            : "Diff generated — files would be reformatted";
        }

        // Default: format mode
        return exitCode === 0
          ? "No changes needed"
          : "Files were reformatted";
      };

      return {
        success: result.exitCode === 0,
        status: resolveStatus(result.exitCode, check, diff),
        stdout: limit(result.stdout.toString().trim()),
        stderr: limit(result.stderr.toString().trim())
      };
    } catch (err: any) {
      return `Execution error: ${err.message}`;
    }
  }
})
