module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Enforce type from allowed list
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation only
        'style', // Code style (formatting, semicolons, etc.)
        'refactor', // Code refactoring (no feature/fix)
        'perf', // Performance improvement
        'test', // Adding/updating tests
        'build', // Build system or external dependencies
        'ci', // CI configuration
        'chore', // Maintenance tasks
        'revert' // Revert a previous commit
      ]
    ],
    // Enforce scope from allowed list
    'scope-enum': [
      2,
      'always',
      [
        // Apps
        'server', // app-server (NestJS)
        'client', // app-client (React)
        // Libs
        'entities', // libs/entities
        'enums', // libs/enums
        'constants', // libs/constants
        'interfaces', // libs/interfaces
        'schemas', // libs/schemas
        'frontend-shared', // libs/frontend-shared
        // Infrastructure & Config
        'deps', // Dependencies
        'infra', // Infrastructure (Pulumi, Docker, etc.)
        'config', // Configuration files
        'release' // Release-related changes
      ]
    ],
    // Allow empty scope for cross-cutting changes (warning only)
    'scope-empty': [1, 'never'],
    // Enforce lowercase for type
    'type-case': [2, 'always', 'lower-case'],
    // Enforce lowercase for scope
    'scope-case': [2, 'always', 'lower-case'],
    // Subject should not be empty
    'subject-empty': [2, 'never'],
    // Subject should not end with period
    'subject-full-stop': [2, 'never', '.'],
    // Header max length (type + scope + subject)
    'header-max-length': [2, 'always', 100],
    // Body max line length
    'body-max-line-length': [2, 'always', 100]
  }
};
