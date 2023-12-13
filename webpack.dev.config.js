const path = require('path');
const { createConfig } = require('@edx/frontend-build');
const CopyPlugin = require('copy-webpack-plugin');

const config = createConfig('webpack-dev');

config.resolve.modules = [
  path.resolve(__dirname, './src'),
  'node_modules',
];

config.module.rules[0].exclude = /node_modules\/(?!(query-string|split-on-first|strict-uri-encode|@edx))/;

config.plugins.push(
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, './public/robots.txt'),
        to: path.resolve(__dirname, './dist/robots.txt'),
      },
    ],
  }),
);

config['devServer'].host = process.env.HOST ||'0.0.0.0';
config['devServer'].port = process.env.PORT || 8080;
config['devServer'].https = true;
module.exports = config;
