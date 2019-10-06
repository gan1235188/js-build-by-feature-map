var build = require('js-build-by-feature-map')
var path = require('path')

build.build({}, {
  entry: __dirname + '/code.js',
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: 'result.js'
  }
})