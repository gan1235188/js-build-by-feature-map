var webpackNodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  output: {
    libraryTarget: 'umd',
    path: __dirname,
    filename: './dist/build.js'
  },
  devtool: false,
  resolve: {
    extensions: ['.ts', '.js']
  },
  node: {
    __dirname: false,
    fs: false
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