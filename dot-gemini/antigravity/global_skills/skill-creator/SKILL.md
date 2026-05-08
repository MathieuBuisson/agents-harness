---
name: skill-creator
description:
  Use this skill to create new skills, modify and improve existing skills, and measure skill performance.
  Use this skill when users want to create a skill from scratch, edit, or optimize an existing skill.
  Use this skill to optimize a skill's description for better triggering accuracy.
---

# Skill Creator

A skill for creating new skills and improving them.

At a high level, the process of creating a skill goes like this:

- Decide what you want the skill to do and how it should do it
- Write a draft of the skill
- Create a few test prompts, check if the skill is triggering for them and evaluate the results.
- Help the user evaluate the results both qualitatively and quantitatively
  - Draft some quantitative evals if there aren't any (if there are some, you can either use as is or modify if you feel something needs to change about them).
  - Then explain them to the user (or if they already existed, explain the ones that already exist)
- Rewrite the skill based on feedback from the user's evaluation of the results
- Repeat until you're satisfied

Your job when using this skill is to figure out where the user is in this process and then jump in and help them progress through these stages. So for instance, maybe they're like "I want to make a skill for X". You can help narrow down what they mean, write a draft, write the test cases, figure out how they want to evaluate, run all the prompts, and repeat.

## Creating a skill

### Capture Intent

Start by understanding the user's intent. The current conversation might already contain a workflow the user wants to capture (e.g., they say "turn this into a skill"). If so, extract answers from the conversation history first — the tools used, the sequence of steps, corrections the user made, input and output formats. The user may need to fill the gaps, and should confirm before proceeding to the next step.

1. What should this skill enable AI agents to do?
2. When should this skill trigger? (what user phrases/contexts)
3. What's the expected output format?
4. Should we set up test cases to verify the skill works? Skills with objectively verifiable outputs (file transforms, data extraction, code generation, fixed workflow steps) benefit from test cases. Skills with subjective outputs (writing style, art) often don't need them. Suggest the appropriate default based on the skill type, but let the user decide.

### Interview and Research

Proactively ask questions about edge cases, input and output formats, example files, success criteria, and dependencies. Wait to write test prompts until you've got this part ironed out.

### Write the SKILL.md

Based on the user interview, fill in these components:

- **name**: Skill identifier (it should match the name of the parent directory).
- **description**:
  When to trigger, what it does.
  This is the primary triggering mechanism - include both what the skill does AND specific contexts for when to use it. All "when to use" info goes here, not in the body.
  Note: currently AI agents have a tendency to "undertrigger" skills -- to not use them when they'd be useful. To combat this, each line in the **description** should start with "Use this skill to ..." or "Use this skill when ...".
- **compatibility**: Required tools, dependencies (optional, rarely needed)
- **the rest of the skill :)**

### Skill Writing Guide

#### Anatomy of a Skill

```
skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter (name, description required)
│   └── Markdown instructions
└── Bundled Resources (optional)
    ├── scripts/    - Executable code for deterministic/repetitive tasks
    ├── references/ - Examples, templates, etc. for the skill
    └── assets/     - Files used in output (templates, icons, fonts)
```

#### Progressive Disclosure

Skills use a three-level loading system:
1. **Metadata** (name + description) - Always in context (~100 words)
2. **SKILL.md body** - In context whenever skill triggers (<400 lines ideal)
3. **Bundled resources** - As needed (scripts can execute without loading)

**Key patterns:**
- Keep SKILL.md under 400 lines; if you're approaching this limit, add an additional layer of hierarchy along with clear pointers about where the model using the skill should go next to follow up.
- Reference files clearly from SKILL.md with guidance on when to read them
- For large reference files (>300 lines), include a table of contents

**Domain organization**: When a skill supports multiple domains/frameworks, organize by variant:
```
cloud-deploy/
├── SKILL.md (workflow + selection)
└── references/
    ├── aws.md
    ├── gcp.md
    └── azure.md
```
The SKILL.md should point AI agents to the specific reference file based on the domain/framework.

#### Writing Patterns

Prefer using the imperative form in instructions.

**Defining output formats** - You can do it like this:
```markdown
## Report structure
ALWAYS use this exact template:
# [Title]
## Executive summary
## Key findings
## Recommendations
```

**Examples pattern** - It's useful to include examples. You can format them like this (but if "Input" and "Output" are in the examples you might want to deviate a little):
```markdown
## Commit message format
**Example 1:**
Input: Added user authentication with JWT tokens
Output: feat(auth): implement JWT-based authentication
```

Example files and template files should go in the `references/` directory and be clearly pointed to from the SKILL.md instructions.

### Writing Style

Use theory of mind and try to make the skill general and not super-narrow to specific examples. Start by writing a draft and then look at it with fresh eyes and improve it.

### Test Cases

After writing the skill draft, come up with 2-3 realistic test prompts — the kind of thing a real user would actually say. Share them with the user: "Here are a few test cases I'd like to try. Do these look right, or do you want to add more?" Then run them.

Save test cases to `evals/evals.json`.

```json
{
  "skill_name": "example-skill",
  "evals": [
    {
      "id": 1,
      "prompt": "User's task prompt",
      "expected_output": "Description of expected result",
      "files": []
    }
  ]
}
```

See `references/schemas.md` for the full schema.

## Improving the skill

### How to think about improvements

1. **Generalize from the feedback.** You and the user are iterating on only a few examples over and over again because it helps move faster. The user knows these examples in and out and it's quick for them to assess new outputs. But if the skill you and the user are codeveloping works only for those examples, it's useless. Rather than put in overfitty changes, or oppressively constrictive MUSTs, if there's some stubborn issue, you might try using different patterns of working.

2. **Keep the prompt lean.** Remove things that aren't pulling their weight. Make sure to read the transcripts, not just the final outputs — if it looks like the skill is making the model waste a bunch of time doing things that are unproductive, you can try getting rid of the parts of the skill that are making it do that.

3. **Explain the why.** Try to explain the **why** behind everything you're asking the model to do. Today's LLMs can go beyond rote instructions and really make things happen. Even if the feedback from the user is terse or frustrated, try to actually understand the task and why the user is writing what they wrote, and then transmit this understanding into the instructions.

### The iteration loop

After improving the skill:

1. Apply your improvements to the skill
2. Read the new feedback, improve again, repeat

Keep going until the user says they're happy.

## Reference files

The references/ directory has additional documentation:
- `references/schemas.md` — JSON structures for evals.json