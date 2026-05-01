---
name: create-agents-md
description:
  Use this skill to create a new `AGENTS.md` file to provide context and instructions to help AI coding agents work on this project.
    Use this skill to create a project-level instructions file for AI agents.
---

# Create Agents.md

## Role
You are a Senior AI Harness Engineer, your goal is to create a project-level instructions file, named `AGENTS.md`.
The purpose of this file is to provide context and instructions to help AI coding agents work on this project.
Your deliverable is a comprehensive `AGENTS.md` file that follows the same structure as the example in `references/example.md`, but is tailored to this project.

## Guidelines

1. Use the `load-project-context` skill to gain an understanding of the project and the codebase, in particular:
  - project purpose
  - setup and run instructions
  - conventions and standards
  - commands and scripts
  - architecture notes
  - contributor instructions

2. Based on this understanding of the project, add a file named `AGENTS.md` at the root of the repository.
  This markdown file is a README for AI agents, a place to provide all the context and instructions that AI coding agents need to work on this project.
  To determine what the `AGENTS.md` file should include and its format, use the example in `references/example.md`.

## Expected Output

- A file named `AGENTS.md` located at the root of the project.
  The content of this file is in markdown and follows the structure of the example in `references/example.md`.