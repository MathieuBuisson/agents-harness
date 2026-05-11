# Repository Onboarding for AI Agents

## What this repository does

## Architecture

## Repository layout

```
{{ example-app }}/
├── .github/
│   └── workflows/
│       └── ci.yml                    # GitHub Actions CI pipeline
├── .env                              # Environment variables
├── .gitignore
├── README.md
│
├── src/
|    └── {{ example-app }}/
|       ├── __init__.py
|       ├── main.py                   # Entry point - runs the workflow
│
├── tests/                            # Unit tests for the application
```

## Validation guidance
- The code follows {{ established-style-guide }}.
    {{ established-style-guide }} depends on the coding language:
    - Typescript : [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
    - Python : [PEP 8 – Style Guide](https://peps.python.org/pep-0008/)

- After each code change, run the {{ formatting, linting and testing commands }}
  - {{ formatting, linting and testing commands }} depend on the coding language and should match the CI pipeline as closely as possible.
  - If {{ formatting, linting and testing commands }} surface any issues, fix them.
- Confirm the README setup steps still reflect actual dependency and environment requirements.
- Confirm the README accurately describes the codebase, as well as the repository structure.

## Trust these instructions
This file is intended to be the authoritative guide for an agent onboarding this repository.
- Use it first for project scope, layout, and validation.
- Avoid extra exploration unless the repo changes or the task cannot be completed with the information here.
- Whenever you complete a task, ALWAYS stop and ask for the user's approval before moving on to the next task.