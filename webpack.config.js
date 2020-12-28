const { resolve } = require('path');
/**
 * main
 */
module.exports = {
  target: 'node',
  entry: {
    raytracing: './src/index.ts',
  },
  devtool: 'source-map',
  output: {
    filename: 'raytracing.js',
    path: resolve(__dirname, 'build'),
    library: 'Raytracing',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this',
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compiler: 'ttypescript',
            },
          },
        ],
        include: [resolve(__dirname, 'src')],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@src': resolve(__dirname, './src/'),
      '@map': resolve(__dirname, './map/'),
    },
  },
  performance: {
    maxAssetSize: 500000,
  },
};
