import nx from '@nx/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: [
      '**/dist',
      '**/out-tsc',
      '**/node_modules',
      '**/.admin',
      '**/.next',
      '**/android',
      '**/ios',

      // TypeScript build info
      '**/*.tsbuildinfo',
      '**/tsconfig.tsbuildinfo',

      // Cache
      '**/.cache',
      '**/.nx'
    ]
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: { import: importPlugin },

    rules: {
      'import/order': ['warn'],
      'import/no-duplicates': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_', // Ignore args starting with _
          varsIgnorePattern: '^_' // Ignore vars starting with _
        }
      ],
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allowCircularSelfDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*']
            }
          ]
        }
      ],
      'padding-line-between-statements': [
        'warn',
        // Blank line AFTER function declarations
        { blankLine: 'always', prev: 'function', next: '*' },
        // Blank line BEFORE function declarations
        { blankLine: 'always', prev: '*', next: 'function' },

        // Blank line AFTER if/for/while/switch blocks
        {
          blankLine: 'always',
          prev: ['if', 'for', 'while', 'switch'],
          next: '*'
        },
        // Blank line BEFORE if/for/while/switch blocks
        {
          blankLine: 'always',
          prev: '*',
          next: ['if', 'for', 'while', 'switch']
        },

        // Blank line AFTER return statements
        { blankLine: 'always', prev: 'return', next: '*' },
        // Blank line BEFORE return statements
        { blankLine: 'always', prev: '*', next: 'return' },

        // Blank line AFTER variable declarations (const/let/var block)
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        // But allow consecutive variable declarations without blank lines
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var']
        }
      ]
    }
  }
];
