import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...nx.configs['flat/react-typescript'],
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      // shadcn emits path aliases; Nx otherwise requires relative imports within a project.
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
      ]
    }
  },
  {
    ignores: ['**/out-tsc']
  }
];
