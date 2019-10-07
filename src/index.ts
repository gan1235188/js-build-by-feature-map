import * as webpack from 'webpack'
import transformConfig from './transformConfig'
import { featureMap, featureTransformType } from './types'

export * from './types'

let featureConfig: featureTransformType = {}

export async function build(featureMap: featureMap, specialWebpackConfig: any = {}) {
  const pluginConfig = createSpecialPluginConfigByFeatureMap(featureMap, featureConfig)
  let webpackConfig = getWebpackConfig(specialWebpackConfig)

  webpackConfig = setWebpackConfigTransformPlugin(pluginConfig, webpackConfig)

  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig, (err, stats) => {
      if (err) {
        reject(err)
        console.error(err)
        return
      }
      
      const info = stats.toJson();
      if (stats.hasErrors()) {
        throw new Error(info.errors[0])
      }

      if (stats.hasWarnings()) {
        console.warn(info.warnings);
      }
    }) as any

    compiler.hooks.done.tap('done', () => {
      resolve()
    })
  })
}

export function setTransformPlugin(_specialTransformConfig: featureTransformType) {
  featureConfig = _specialTransformConfig
}

function createSpecialPluginConfigByFeatureMap(
  featureMap: featureMap,
  specialTransformConfig: featureTransformType)
{
  const result: featureTransformType = {}
  const _transformConfig = {
    ...transformConfig,
    ...specialTransformConfig
  }

  Object.keys(_transformConfig).forEach(key => {
    if((featureMap as any)[key]) {
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
          transformConfig: specialTransformConfig,
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
