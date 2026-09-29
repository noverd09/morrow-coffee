# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Coffee-mockup is a coffee website project. The codebase lives in `C:\Users\Admin\coffee-mockup`.

---

# Hard rules — non-negotiable, no exceptions

Violating any of these can cause real damage: lost data, broken trust, shipped-broken work. Always follow.

## 1. Ask Before Destructive Commands

Never run irreversible or shared-state-changing commands without explicit permission. State the exact command, why you want to run it, and wait for an OK.

Always require confirmation:
- `git push --force` / `--force-with-lease`
- `git reset --hard`, `git clean -fd`, `git checkout -- .`
- `git merge`, `git rebase`, `git cherry-pick` onto shared branches
- `git branch -D`, deleting remote branches (`git push origin :branch`)
- `git commit --amend` on already-pushed commits
- `git tag -d` / force-pushing tags
- `rm -rf`, dropping DB tables, truncating data, running destructive migrations
- Anything touching production: deploys, infra apply, secrets, DNS
- Publishing packages, posting to GitHub/Slack/email, or anything visible to others

Safe by default: read-only commands (`status`, `diff`, `log`), local builds, tests, lint, typecheck, and edits inside the working tree.

If unsure whether a command is destructive — ask.

## 2. Think Before Coding

- State assumptions explicitly instead of guessing.
- Present multiple interpretations when a request is ambiguous.
- Push back when a simpler approach exists.
- Stop and ask for clarification when confused — don't silently guess.

## 3. Simplicity First

- Write the minimum code that solves the problem.
- No features beyond what was requested.
- No abstractions for single-use code.
- No speculative "flexibility" or error handling.
- **Test:** "Would a senior engineer say this is overcomplicated?"

## 4. Surgical Changes

- Touch only what's necessary for the task.
- Don't improve adjacent code or formatting.
- Match existing style even if you'd differ.
- Remove only orphaned code YOUR changes created.
- **Test:** "Every changed line should trace directly to the user's request."

## 5. Verify Before Reporting Complete

Before reporting any task as complete, verify it actually works:

- Run the tests, execute the script, check the output yourself.
- For TypeScript: run `tsc --noEmit` and fix every type error.
- For builds: run the build command and confirm it succeeds.
- If you cannot verify (no test exists, can't run the code), say so explicitly. Don't imply success.

Report outcomes faithfully:
- If tests fail, say so with the relevant output. Never claim "all tests pass" when output shows failures.
- Never suppress, simplify, or skip a failing check (test, lint, type error) to manufacture a green result.
- Never characterize incomplete or broken work as done.
- When something did pass or work, state it plainly. Don't hedge confirmed results with disclaimers.

The goal is an accurate report, not a defensive one.

## 6. Learn From Corrections

When the user corrects a mistake you made:

1. Apply the correction.
2. Append a rule to `learnings.md` so the same mistake doesn't recur.
3. Show the user the new rule before continuing.

---

# Low priority — references and conveniences

Useful context. Skim once, refer back as needed.

## Goal-Driven Execution

Transform imperative tasks into verifiable goals:
- Instead of "Add validation" → "Write tests for invalid inputs, then make them pass"
- Instead of "Fix the bug" → "Write a test that reproduces it, then make it pass"

For multi-step tasks, state a plan with verification steps.
