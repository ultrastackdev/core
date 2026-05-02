

#!/usr/bin/env bash

# Branch naming convention validator
# Pattern: type/ticket-description
# Examples: feature/OA-123-add-login, bugfix/OA-456-fix-crash

# Get current branch name
BRANCH_NAME=$(git symbolic-ref --short HEAD 2>/dev/null)

# Exit successfully if not on a branch (detached HEAD)
if [ -z "$BRANCH_NAME" ]; then
  exit 0
fi

# Branches that are always allowed
ALLOWED_BRANCHES="^(main|master|develop|staging|production|release/.+|hotfix/.+)$"

if [[ "$BRANCH_NAME" =~ $ALLOWED_BRANCHES ]]; then
  exit 0
fi

# Branch naming pattern: type/ticket-description
# Types: feature, bugfix, fix, hotfix, chore, docs, refactor, test, ci, perf, build, style, revert
# Ticket: Optional ticket number like OA-123 or JIRA-456
# Description: kebab-case description
BRANCH_PATTERN="^(feature|bugfix|fix|hotfix|chore|docs|refactor|test|ci|perf|build|style|revert)\/([A-Z]+-[0-9]+-)?[a-z0-9]+(-[a-z0-9]+)*$"

if [[ ! "$BRANCH_NAME" =~ $BRANCH_PATTERN ]]; then
  echo ""
  echo "ERROR: Invalid branch name: '$BRANCH_NAME'"
  echo ""
  echo "Branch names must follow the pattern:"
  echo "  type/ticket-description"
  echo ""
  echo "Allowed types:"
  echo "  feature, bugfix, fix, hotfix, chore, docs, refactor,"
  echo "  test, ci, perf, build, style, revert"
  echo ""
  echo "Examples:"
  echo "  feature/OA-123-add-user-authentication"
  echo "  bugfix/OA-456-fix-login-crash"
  echo "  chore/update-dependencies"
  echo "  docs/readme-update"
  echo ""
  echo "Protected branches (always allowed):"
  echo "  main, master, develop, staging, production, release/*, hotfix/*"
  echo ""
  exit 1
fi

exit 0