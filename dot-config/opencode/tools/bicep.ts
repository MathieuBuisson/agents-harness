import { tool } from "@opencode-ai/plugin"
import fs from "fs/promises"
import path from "path"

export default tool({
  description: "Execute Bicep commands (format, lint, build, generate-params) with automatic fallback and file validation.",
  args: {
    subcommand: tool.schema.enum(["format", "lint", "build", "generate-params"])
      .describe("The bicep subcommand to run"),
    filePath: tool.schema.string()
      .describe("Relative path to the .bicep or .bicepparam file"),
    additionalArgs: tool.schema.array(tool.schema.string()).optional()
      .describe("Optional flags, e.g., ['--outfile', 'main.json']")
  },
  async execute({ subcommand, filePath, additionalArgs = [] }, { worktree, $ }) {
    // 1. Path Validation
    const absolutePath = path.join(worktree, filePath);
    try {
      await fs.access(absolutePath);
    } catch {
        return `Error: The file '${filePath}' does not exist in the workspace.`;
    }

    // 2. Determine Command (az bicep vs bicep)
    const hasAzBicep = await $`az bicep version`.nothrow().quiet().exitCode === 0;
    const baseCmd = hasAzBicep ? ["az", "bicep"] : ["bicep"];

    try {
      // 3. Execution
      const result = await $`${baseCmd} ${subcommand} --file ${absolutePath} ${additionalArgs}`
        .nothrow()
        .quiet();

      return {
        success: result.exitCode === 0,
        command: `${baseCmd.join(" ")} ${subcommand}`,
        exitCode: result.exitCode,
        stdout: result.stdout.toString().trim(),
        stderr: result.stderr.toString().trim()
      };
    } catch (err: any) {
      return `CLI Execution failed: ${err.message}`;
    }
  }
})
