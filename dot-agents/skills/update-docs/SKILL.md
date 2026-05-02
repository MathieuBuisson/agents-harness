---
name: update-docs
description:
  Use this skill to update the documentation files to reflect changes since the last commit.
  Use this skill to ensure that the docs are up-to-date and accurately reflect the changes made to the codebase.
---

# Update Docs

## Guardrails
- Do not modify any files.
- Do not assume missing context.
- **Do not guess repository state**: Always execute terminal commands (e.g., `git status`, `git diff`) to determine if the directory is a git repository and what has changed. Never rely on assumptions or conversational memory.
- Prefer concise synthesis over long quotes.

## Steps

### 1. Discover the files that have been changed since the last commit
- Execute `git status` to verify the git repository state and ensure you are tracking the correct changes.
- Execute `git diff` and `git diff --staged` to find all the files that have been changed since the last git commit.

### 2. Identify the changes
- For each file, identify the git diffs since the last git commit.

### 3. Discover the documentation files
Find any file named: `README.md` or `AGENTS.md` at the repository root.

### 4. Identify any documentation updates
- Analyse the content of the documentation files
- Identify if/where the content of these files does not reflect the changes identified in step 2.

## Output format
Return:
- a list of suggested changes to the documentation files to make them reflect the changes (if any) identified in step 2.