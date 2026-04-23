---
name: code-reviewer
description:
  Use this skill to review code. It can review local changes (staged or working tree), a specified file, or a specified directory.
  Use this skill to assess code quality, correctness, maintainability, and adherence to established conventions and patterns.
---

# Code Reviewer

This skill guides the agent in conducting professional and thorough code reviews for both local changes and a specific file.

## Workflow

### 1. Determine Review Target
*   **Specified File**: If the user provides a file (e.g., "review @file:main.py"), target that file.
*  **Specified Directory**: If the user provides a directory (e.g., "review @directory:src"), target all files in this directory.
*   **Local Changes**: If no file or directory is specified, or if the user asks to "review my changes", target the current local file system states (staged and unstaged changes).

### 2. Preparation

#### For Specified Directory
1. **Identify Files**:
	* Get all the files in the specified directory, including files in any subdirectory
	* Exclude the files that would be excluded by the `.gitignore`.

#### For Local Changes:
1.  **Identify Changes**:
    *   Check status: `git status`
    *   Read diffs: `git diff` (working tree) and/or `git diff --staged` (staged).

### 3. In-Depth Analysis
Analyze the code changes based on the following pillars:

*   **Correctness**: Does the code achieve its stated purpose without bugs or logical errors?
*   **Maintainability**: Is the code clean, well-structured, and easy to understand and modify in the future? Consider factors like code clarity, modularity, and adherence to established conventions and patterns.
*   **Readability**: Is the code well-commented (where necessary) and consistently formatted according to standard coding style guidelines?
*   **Efficiency**: Are there any obvious performance bottlenecks or resource inefficiencies?
*   **Security**: Are there any potential security vulnerabilities or insecure coding practices?
*   **Edge Cases and Error Handling**: Does the code appropriately handle edge cases and potential errors?

### 4. Categorize Findings

Assign a severity to each finding, based on this guidance:

| Severity | Assign to findings which are |
|--------|---------|
| **Critical** | Bugs, security issues, or breaking changes |
| **Improvements** | Suggestions for better code quality, maintainability, or performance |
| **Nitpicks** | Formatting or minor style issues |

This prevents authors from treating all feedback as mandatory and prioritize findings.

### 5. Provide Feedback

#### Structure
*   **Summary**: A high-level overview of the review.
*   **Findings**:
	* Findings should be sorted by severity: **Critical** first and **Nitpicks** last.
	* Format as a table, based on the following example:	

| File : line number | Severity | Explanation of *why* it matters | Suggestion on how to fix it |
| --- | --- | --- | --- |
| main.py : line 42 | Improvements | **Config Instantiation Overhead:** You are instantiating `Config()` within `setup_logger`. If `setup_logger` is called multiple times across different modules, `Config()` is initialized every time. If your `Config` class performs environment variable parsing, validation, or disk I/O, this could introduce unnecessary overhead. | It might be better to import a singleton instance of the configuration (e.g., `from bill_ingestion.config import config` if defined) or cache the instance. |

*   **Conclusion**: Clear recommendation (Approved / Request Changes).

#### Tone
*   Be specific.
*   Be constructive and professional.
