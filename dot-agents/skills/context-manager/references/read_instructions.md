# Read Instructions

This reference covers the instructions to read a project's context files and to load their content as session context.

## Guidelines

1. Check if the context files exist.
    The context files managed by this skill are :

    - `[project root directory]/context/session_history.md`: A file that records the history of the project's sessions, including key decisions, discussions, and code changes.
    - `[project root directory]/context/task_plan.md`: A file that outlines the current task plan, including phases.
    - `[project root directory]/AGENTS.md` : A file that provides context and instructions to help AI agents work on the project.

2. If a context file does not exist, just skip to the next context file.

3. If the context files exist, read them as explained in the section **How to read context files**.

## How to read context files

### session_history.md

  1. In the first section of this file, read :
      - **Date:** the date of when the session history was last updated
      - **Repository:** the path of the project's root directory

  2. Read the last 500 lines of this files to get the most recent interactions, decisions, and code changes
  3. Read the section named **Last action** to get the **Last action**'s description and date and time.

### task_plan.md

  1. Read the file `task_plan.md`.
  2. Getting the status of tasks:

      - Each task is represented as a markdown checklist item (e.g., `- [ ] Task description`).
      - If the box of a checklist item is unchecked (e.g., `- [ ] Task description`), it means that the corresponding task has NOT been completed.
      - If the box of a checklist item is unchecked (e.g., `- [x] Task description`), it means that the corresponding task has been completed.

  3. Getting the status of phases:

      - Each phase has a status that can be one of the following: `pending`, `in_progress`, or `complete`.
      - In this file, phases are listed in chronological order.
      - The project's current phase is the first phase with the status set to: `in_progress`.
      - If there are no phase with the status `in_progress`, then the project's current phase is the first one with the status set to: `pending`.
      - Output to the user the current phase and all tasks contained in it.

### AGENTS.md

  1. Get the current content of the file `AGENTS.md`
  2. Keep this content in your session context, this is your instruction manual on how to work in this project.
  3. The sections that are particularly important for you are :
      - Architecture
      - Repository layout
      - Validation guidance
      - Trust these instructions
