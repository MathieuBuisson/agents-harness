---
description: Update the documentation files to reflect changes since the last commit
---

# Update the documentation files

## Guardrails
- Do not modify any files.
- Do not assume missing context.
- Prefer concise synthesis over long quotes.

## Steps

### 1. Discover the files that have been changed since the last commit
- Find all the files that have been changed since the last git commit.

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