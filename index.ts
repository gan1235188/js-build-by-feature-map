import * as webpack from 'webpack'
import * as path from 'path'
import transformConfig, { featureTransformType } from './transformConfig'

let featureConfig: featureTransformType = {}

interface dynamicProperty {
  [key: string]: boolean
}

export async function build(featureMap: dynamicProperty, specialWebpackConfig: any = {}) {
  const pluginConfig = createSpecialPluginConfigByFeatureMap(featureMap, featureConfig)
  let webpackConfig = getWebpackConfig(specialWebpackConfig)

  webpackConfig = setWebpackConfigTransformPlugin(pluginConfig, webpackConfig)

  return new Promise((resolve, reject) => {
    console.log(webpackConfig)
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        reject(err)
        console.error(err)
        return
      }

      resolve()
    })
  })
}

export function setTransformPlugin(_specialTransformConfig: featureTransformType) {
  featureConfig = _specialTransformConfig
}

function createSpecialPluginConfigByFeatureMap(
  featureMap: dynamicProperty,
  specialTransformConfig: featureTransformType)
{
  const result: featureTransformType = {}
  const _transformConfig = {
    ...transformConfig,
    ...specialTransformConfig
  }

  Object.keys(_transformConfig).forEach(key => {
    if(!featureMap[key]) {
      result[key] = _transformConfig[key]
    }
  })

  return result
}

function setWebpackConfigTransformPlugin (
  specialTransformConfig: featureTransformType,
  webpackConfig: webpack.Configuration
) {
  const transformPlugin = {
    test: /\.js$/,
    use: [
      {
        loader: 'js-build-by-feature-map-loader',
        options: {
          specialTransformConfig,
          envName: 'development',
        }
      }
    ]
  }
  webpackConfig.module = webpackConfig.module || {} as any
  webpackConfig.module.rules = webpackConfig.module.rules  || []
  webpackConfig.module.rules.unshift(transformPlugin)

  return webpackConfig
}


function getWebpackConfig(specialWebpackConfig: webpack.Configuration) {
  const defaultConfig: any = {
    entry: './test-code/index.js',
    mode: 'development',
    output: {
      path: __dirname,
      filename: 'result.js'
    },
    devtool: false,
    module: {
      rules: []
    }
  }

  return {
    ...defaultConfig,
    ...specialWebpackConfig
  }
}
