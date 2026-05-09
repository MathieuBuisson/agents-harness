---
name: context-manager
description:
  Use this skill to create context files for a new project.
  Use this skill to export the session history to a markdown file.
  Use this skill to create or update a project's task plan as a markdown file.
  Use this skill to load project context from markdown files.
  Use this skill to build a summary of the project for the agent to use as context for later tasks.
---

# Context Manager

This skill guides the agent in managing context files for a project, updating them as the project evolves, and exporting session history to markdown files.
This skill explains how to create and maintain task plans to keep track of the status of project phases and tasks.
This skill also explains how to read context files and to load their content as session context.
The context files managed by this skill are :

  - `[project root directory]/context/session_history.md`: A file that records the history of the project's sessions, including key decisions, discussions, and code changes.
  - `[project root directory]/context/task_plan.md`: A file that outlines the current task plan, including phases
  - `[project root directory]/AGENTS.md` : A file that provides context and instructions to help AI agents work on the project.

## Invocation syntax
/context-manager <mode> [payload]

- `mode` is required: must be `read` or `write`
- If `mode` is `read`: Only follow the instructions in the file [references/read_instructions.md](references/read_instructions.md)
- If `mode` is `write`: Only follow the instructions in the file [references/write_instructions.md](references/write_instructions.md)
- `payload` is optional: it can be used to provide additional information
