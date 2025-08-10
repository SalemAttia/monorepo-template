const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const { NormalModuleReplacementPlugin } = require('webpack');

// Get the mode from environment variable or default to development
const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  output: {
    path: join(__dirname, '../../dist/apps/my-api'),
  },
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
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
  ],
};
