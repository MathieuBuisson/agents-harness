# Write Instructions

This reference covers the instructions to follow when creating or updating a project's context files.

## Guidelines

1. Check if the context files already exist.
    The context files managed by this skill are :

    - `[project root directory]/context/session_history.md`: A file that records the history of the project's sessions, including key decisions, discussions, and code changes.
    - `[project root directory]/context/task_plan.md`: A file that outlines the current task plan, including phases.
    - `[project root directory]/AGENTS.md` : A file that provides context and instructions to help AI agents work on the project.

2. If the context files do not exist:
  - Create the `AGENTS.md` file at the root of the repository, using [agents_example.md](agents_example.md) as an example.
  - Create the `context` directory at the root of the repository, if it doesn't already exist.
  - Create the `session_history.md` file in the `context` directory, using [session_history.md](session_history.md) as reference.
  - Create the `task_plan.md` file in the `context` directory, using [task_plan.md](task_plan.md) as reference.

3. If the context files already exist, update them as explained in the section **How to update existing context files**.

## How to update existing context files

### session_history.md

  1. Export the current session history
  2. Read the section named **Last action** in the existing `session_history.md` file to get the **Last action**'s description and date and time.
  3. In the current session history, get all interactions, decisions, and code changes that have occurred since the **Last action**.
  4. For each significant interaction, decision, or code change obtained in step 3, append the `session_history.md` file with a new entry that includes:
      - A brief description of the interaction or decision.
      - The files explored during that interaction, if any.
      - The analysis provided during that interaction, if any.
      - The recommendations provided during that interaction, if any.

  5. NEVER overwrite existing entries in the `session_history.md` file. Always append new entries.
  6. Update the section named **Last action** in the `session_history.md` file with a description of the last action and the date and time of this last action in the format `YYYY-MM-DD_hh:mm`.
  7. Update the line containing "**Date:**" in the first section of `session_history.md` with the current date in the format `YYYY-MM-DD`.

### task_plan.md

  1. Review the current task plan in the `task_plan.md` file.
  2. Update existing tasks as needed, like so:

      - Each task is represented as a markdown checklist item (e.g., `- [ ] Task description`).
      - Each task should be inside a phase
      - If a task has not been completed, the box of the corresponding checklist item should be unchecked (e.g., `- [ ] Task description`).
      - If a task has been completed, check the box of the corresponding checklist item (e.g., `- [x] Task description`).

  3. Update existing phases as needed, like so:

      - Each phase should have a status that can be one of the following: `pending`, `in_progress`, or `complete`.
      - If a phase does not contain any task or all the tasks it contains are NOT completed, its status should be `pending`.
      - If a phase contains completed AND not completed tasks, its status should be `in_progress`.
      - If all the tasks contained in a phase are completed, then the status of this phase should be `complete`.

  4. If there are any new phases or tasks that need to be added to the task plan, add them under the appropriate phase or create a new phases as needed.
  5. If you are unsure if any new phases or tasks need to be added, ask the user for clarification on the current state of the project and any upcoming work that needs to be added to the `task_plan.md`.
  6. If you are unsure about the status of any existing tasks, ask the user for clarification on which tasks have been completed.
  8. Always ensure that the task plan is up to date and accurately reflects the current state of the project.
  9. NEVER delete existing tasks or phases from the `task_plan.md` file. Always add new tasks or phases as needed and update the status of existing ones without removing them.

### AGENTS.md

  1. Export the current session history
  2. Read the section named **Last action** in the existing `session_history.md` file to get the **Last action**'s description and date and time.
  3. In the current session history, get all interactions, decisions, and code changes that have occurred since the **Last action**.
  4. Discover the files that have been changed since the last commit:
      - Execute `git status` to verify the git repository state and ensure you are tracking the correct changes.
      - Execute `git diff` and `git diff --staged` to find all the files that have been changed since the last git commit.
  5. Get the current content of the file `AGENTS.md`
  6. Based on the current content of the file `AGENTS.md` and its purpose (provide context and instructions to help AI agents work on the project), determine whether any of the information gathered in steps 3 and 4 warrant any change to `AGENTS.md`.
  7. If any change to `AGENTS.md` are warranted, display your proposed changes and ask for user's approval before writing them to `AGENTS.md`.
