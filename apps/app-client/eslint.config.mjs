import nextEslintPluginNext from '@next/eslint-plugin-next';
import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';

export default [
  {
    plugins: { '@next/next': nextEslintPluginNext },
    rules: {
      // Core Web Vitals rules (from next/core-web-vitals)
      ...nextEslintPluginNext.configs.recommended.rules,
      ...nextEslintPluginNext.configs['core-web-vitals'].rules
    }
  },
  ...nx.configs['flat/react-typescript'],
  ...baseConfig,
  {
    ignores: ['dist/**/*', '**/out-tsc']
  }
];
