const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const { NormalModuleReplacementPlugin } = require('webpack');
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// Get the mode from environment variable or default to development
const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  entry: './src/main.ts',
  output: {
    path: join(__dirname, '../../dist/apps/my-api'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@learning-nx/shared-utils': join(
        __dirname,
        '../../libs/shared-utils/src/index.ts'
      ),
    },
    // plugins: [
    //   new TsconfigPathsPlugin({
    //     configFile: join(__dirname, 'tsconfig.app.json'),
    //   }),
    // ],
  },
  target: 'node',
  plugins: [
    // Replace environment.ts with environment.prod.ts in production
    new NormalModuleReplacementPlugin(
      /environments\/environment\.ts/,
      function (resource) {
        if (mode === 'production') {
          resource.request = resource.request.replace('environment.ts', 'environment.prod.ts');
        }
      }
    ),
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: true,
      outputHashing: 'none',
      generatePackageJson: true,
      bundle: true,
      bundleDependencies: true
    }),
  ],
};
