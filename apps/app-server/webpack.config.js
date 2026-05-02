const { join, resolve } = require('path');
const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');

const root = resolve(__dirname, '../..');

module.exports = {
  resolve: {
    alias: {
      '@entities': resolve(root, 'libs/entities/src'),
      '@enums': resolve(root, 'libs/enums/src'),
      '@interfaces': resolve(root, 'libs/interfaces/src'),
      '@constants': resolve(root, 'libs/constants/src'),
      '@schemas': resolve(root, 'libs/schemas/src')
    }
  },
  output: {
    path: join(__dirname, 'dist'),
    clean: true,
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    })
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      sourceMap: true
    })
  ]
};
