# agents-harness

Personal configuration, skills, and workflows for AI agents (OpenCode, Antigravity).

## Agents Supported

- **OpenCode** — Config in `dot-config/opencode/`
- **Antigravity** — Config in `dot-gemini/`

## Directory Structure

```
agents-harness/
├── dot-agents/skills/                    # OpenCode skills
│   ├── code-reviewer/
│   ├── get-changes-since-last-commit/
│   ├── load-project-context/
│   ├── obsidian-markdown/
│   ├── define-project/                  # Brainstorm and plan new coding projects; produces a Specifications Document
│   └── update-docs/
├── dot-config/opencode/
│   ├── AGENTS.md                          # OpenCode persona
│   ├── opencode.json                      # Model config
│   └── tools/
│       ├── bicep.ts                      # Enables OpenCode to run bicep commands (format, lint, build, generate-params)
│       └── mypy.ts                       # Run mypy to perform static type checking on Python files or directories
├── dot-gemini/
│   ├── GEMINI.md                          # Antigravity persona
│   └── antigravity/
│       ├── global_skills/                 # Antigravity skills (same format as OpenCode)
│       │   ├── code-reviewer/
│       │   ├── obsidian-markdown/
│       │   └── define-project/            # Brainstorm and plan new coding projects; produces a Specifications Document
│       ├── global_workflows/              # Antigravity workflows
│       ├── mcp_config.json
│       └── skills.txt                     # Path to global_skills
└── README.md
```

## Core Concepts

| Concept | OpenCode | Antigravity |
|---|---|---|
| Persona | `AGENTS.md` | `GEMINI.md` |
| Reusable instructions | `skills/` (folder + `SKILL.md`) | `global_skills/` (folder + `SKILL.md`) and `global_workflows/` (`.md` file) |
| Config | `opencode.json` | `mcp_config.json`, `skills.txt` |

### Skill Format

```
<skill-name>/
└── SKILL.md
```

Frontmatter:
```yaml
---
name: <name>
description: <description>
---
```

### Workflow Format (Antigravity)

```
global_workflows/<name>.md
```

Frontmatter:
```yaml
---
description: <description>
---
```

## Skill ↔ Workflow Sync

Three items exist as both OpenCode skills and Antigravity workflows:

- `get-changes-since-last-commit`
- `load-project-context`
- `update-docs`

When updating one, replicate to the other with appropriate format changes:

- Skill → Workflow: Move `SKILL.md` content to `.md` file, rename `name:` field in frontmatter to `description:`, remove `name:` line
- Workflow → Skill: Move `.md` content to `SKILL.md`, add `name:` to frontmatter matching the filename

## Usage

Copy the relevant directories and files to the target repository.

For OpenCode:
- `dot-config/opencode/` → `~/.config/opencode/`
- `dot-agents/skills/` → `~/.agents/skills/`

For Antigravity:
- `dot-gemini/` → `~/.gemini/`