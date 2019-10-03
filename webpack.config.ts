var webpackNodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './index.ts',
  mode: 'development',
  output: {
    libraryTarget: 'umd',
    path: __dirname,
    filename: './dist/build.js'
  },
  devtool: false,
  resolve: {
    extensions: ['.ts', '.js']
  },
  target: 'node',
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  }
}