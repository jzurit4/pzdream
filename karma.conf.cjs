const path = require('path');

process.env.CHROME_BIN = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

module.exports = function (config) {
  const coverage = process.env.COVERAGE === 'true';

  config.set({
    basePath: '',
    frameworks: ['jasmine', 'webpack'],

    files: ['test/setup.js', 'test/**/*.spec.jsx'],

    preprocessors: {
      'test/setup.js': ['webpack'],
      'test/**/*.spec.jsx': ['webpack'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: { chrome: '100' } }],
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
                plugins: coverage
                  ? [['babel-plugin-istanbul', { exclude: ['**/*.spec.jsx', 'test/**'] }]]
                  : [],
              },
            },
          },
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        ],
      },
      resolve: { extensions: ['.js', '.jsx'] },
      stats: 'errors-only',
    },
    webpackMiddleware: { stats: 'errors-only' },

    reporters: ['progress', ...(coverage ? ['coverage'] : [])],
    coverageReporter: {
      dir: 'coverage/',
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
      ],
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
      },
    },
    singleRun: true,
    browserNoActivityTimeout: 60000,
    client: { jasmine: { random: false } },
  });
};