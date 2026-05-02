# Staged file count (commit hook)

## Limit

You can stage at most **15 paths** in a single commit (each file counts as one path). The limit is defined as `MAX_STAGED_FILES` in `scripts/validate-staged-file-count.sh`.

If you go over that, the commit is blocked until you commit in smaller chunks or use the bypass below.

## How to skip this check

Set the environment variable **`skip`** (must be lowercase) for that commit:

```bash
skip=1 git commit -m "chore: large refactor"
```

Accepted values: **`1`**, **`true`**, or **`yes`** (lowercase only).

If bypass never seems to apply, make sure you did not rely on `SKIP`, `Skip`, or other names — only **`skip`** works.

To clear a mistakenly exported variable:

```bash
unset skip
```
