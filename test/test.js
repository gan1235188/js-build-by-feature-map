var build = require('../dist/build')
var path = require('path')

build.build({}, {
  entry: __dirname + '/code.js',
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: 'result.js'
  },
  module: {
    rules: [
      {
        test: /\.js/
      }
    ]
  }
})