---
description: Load project context from markdown files
---

# Load Project Context

Read any file named: `README.md` or `AGENTS.md` at the repository root, then build a compact working summary for the agent.

## Guardrails
- Do not modify any files.
- Do not assume missing context.
- Prefer concise synthesis over long quotes.
- If a file conflicts with another file, note the conflict explicitly.

## Steps

### 1. Discover the context files
Find any file named: `README.md` or `AGENTS.md` at the repository root.

### 2. Read and extract the important parts
From each file, identify:
- project purpose
- setup and run instructions
- conventions and standards
- commands and scripts
- architecture notes
- contributor or workflow instructions
- any constraints, warnings, or assumptions

### 3. Synthesize the project context
Produce a compact summary with:
- what the project is
- how it is structured
- how it is meant to be used
- the most important conventions to follow
- any open questions or missing information

### 4. Prioritize agent readiness
When answering later tasks, treat this summary as the baseline project context and follow its conventions unless the user asks otherwise.

## Output format
Return:
- a list of notable warnings or conflicts
- any missing context that should be checked next