# Contributing Guidelines

This document outlines the source control conventions for the OneAccept project. All team members must follow these guidelines to maintain a clean and consistent git history.

## Table of Contents

- [Branch Naming](#branch-naming)
- [Commit Messages](#commit-messages)
- [Workflow](#workflow)

---

## Branch Naming

All branches must follow this pattern:

```
type/ticket-description
```

### Branch Types

| Type       | Use For                       |
| ---------- | ----------------------------- |
| `feature`  | New features or capabilities  |
| `bugfix`   | Bug fixes                     |
| `fix`      | Alternative for bug fixes     |
| `hotfix`   | Urgent production fixes       |
| `chore`    | Maintenance tasks             |
| `docs`     | Documentation changes         |
| `refactor` | Code refactoring              |
| `test`     | Adding or updating tests      |
| `ci`       | CI/CD configuration changes   |
| `perf`     | Performance improvements      |
| `build`    | Build system changes          |
| `style`    | Code style/formatting changes |
| `revert`   | Reverting previous changes    |

### Branch Name Examples

```bash
# With ticket number (recommended)
feature/OA-123-add-user-authentication
bugfix/OA-456-fix-login-crash
hotfix/OA-789-critical-security-patch

# Without ticket number
chore/update-dependencies
docs/update-api-documentation
refactor/clean-utils-library
test/add-entity-tests
```

### Protected Branches

These branches are always allowed and don't need to follow the pattern:

- `main`
- `master`
- `develop`
- `staging`
- `production`
- `release/*`
- `hotfix/*`

---

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
type(scope): description
```

### Commit Types

| Type       | When to Use                         | Example                                      |
| ---------- | ----------------------------------- | -------------------------------------------- |
| `feat`     | Adding a new feature                | `feat(server): add merchant review endpoint` |
| `fix`      | Fixing a bug                        | `fix(client): resolve crash on app startup`  |
| `docs`     | Documentation changes only          | `docs: update API documentation`             |
| `style`    | Code formatting (no logic changes)  | `style(admin): format dashboard components`  |
| `refactor` | Code restructuring (no feature/fix) | `refactor(utils): simplify date helpers`     |
| `perf`     | Performance improvements            | `perf(server): optimize database queries`    |
| `test`     | Adding or updating tests            | `test(entities): add user entity tests`      |
| `build`    | Build system or dependencies        | `build(deps): upgrade nestjs to 10.3.0`      |
| `ci`       | CI/CD configuration                 | `ci: add deployment workflow`                |
| `chore`    | Maintenance tasks                   | `chore: update gitignore patterns`           |
| `revert`   | Reverting a previous commit         | `revert: revert "feat(server): add auth"`    |

### Commit Scopes

Scopes help identify which part of the codebase was changed:

| Scope             | Maps To                | Description                     |
| ----------------- | ---------------------- | ------------------------------- |
| `server`          | `apps/app-server`      | NestJS backend                  |
| `client`          | `apps/app-client`      | Expo/React Native mobile app    |
| `entities`        | `libs/entities`        | TypeORM entity definitions      |
| `enums`           | `libs/enums`           | Shared enums                    |
| `utils`           | `libs/utils`           | Shared utilities                |
| `constants`       | `libs/constants`       | Shared constants                |
| `frontend-shared` | `libs/frontend-shared` | Shared frontend code            |
| `schemas`         | `libs/schemas`         | Shared schemas                  |
| `deps`            | -                      | Dependency updates              |
| `infra`           | `infra/`               | Infrastructure (Pulumi, Docker) |
| `config`          | Root config files      | Configuration files             |
| `release`         | -                      | Release-related changes         |

### Commit Message Rules

1. **Type is required** and must be lowercase
2. **Scope is recommended** but optional for cross-cutting changes
3. **Description must**:
   - Start with lowercase
   - Not end with a period
   - Be concise (max 100 characters total)
   - Use imperative mood ("add" not "added")

### Commit Examples

```bash
# Features
feat(server): add user authentication endpoint
feat(client): implement push notifications
feat(admin): add merchant dashboard

# Bug fixes
fix(client): resolve crash on iOS 17
fix(server): handle null pointer in payment service
fix(entities): correct merchant entity relations

# Documentation
docs: update contributing guidelines
docs(server): add API endpoint documentation

# Dependencies
build(deps): upgrade nx to 21.3.0
build(deps): add commitlint packages

# Without scope (cross-cutting changes)
chore: update eslint configuration
ci: add source control validation workflow
```

---

## Workflow

### Starting New Work

1. **Create a branch** from `main`:

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/OA-123-add-new-feature
   ```

2. **Make changes** and commit following the conventions:

   ```bash
   git add .
   git commit -m "feat(server): add new endpoint for merchants"
   ```

3. **Push and create PR**:
   ```bash
   git push -u origin feature/OA-123-add-new-feature
   ```

### Before Pushing

The following validations run automatically:

- **On commit**: Commit message format is validated
- **On push**: Branch name is validated
- **On PR**: CI validates all commits and branch name

---

## Quick Reference Card

```
Branch:  type/TICKET-123-description
Commit:  type(scope): description
Types:   feat | fix | docs | style | refactor | perf | test | build | ci | chore | revert
Scopes:  server | client | admin | aurora | entities | enums | utils | constants | deps | infra | config
```
