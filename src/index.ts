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

      console.log(stats.toString({
        chunks: false,  // 使构建过程更静默无输出
        colors: true    // 在控制台展示颜色
      }));
      
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
    const map = featureMap || {}
    if(!(map as any)[key]) {
      result[key] = _transformConfig[key]
    }
  })

  return result
}

function setWebpackConfigTransformPlugin (
  specialTransformConfig: featureTransformType,
  webpackConfig: webpack.Configuration
) {
  const transformLoader = {
    test: /\.js$/,
    use: [
      {
        loader: 'js-build-by-feature-map-loader',
        options: {
          transformConfig: specialTransformConfig,
          envName: webpackConfig.mode,
        }
      }
    ]
  }
  webpackConfig.module = webpackConfig.module || {} as any
  webpackConfig.module.rules = webpackConfig.module.rules  || []
  findJsLoaderAndReplacePlugin(webpackConfig.module.rules, transformLoader)
  return webpackConfig
}

function findJsLoaderAndReplacePlugin(rules: webpack.RuleSetRule[], transformLoader: webpack.RuleSetRule) {
  rules.forEach(item => {
    if(isJsLoader(item)) {
      item.use = transformLoader.use
    }

    if(item.rules) findJsLoaderAndReplacePlugin(item.rules, transformLoader)
  })
}

function isJsLoader(rule: webpack.RuleSetRule): boolean {
  const testFilePath = 'a.js'
  const testType = getType(rule.test)
  if(testType === 'String') {
    return /\.js\b/.test(rule.test as string)
  }

  if(testType === 'RegExp') {
    return (rule.test as RegExp).test(testFilePath)
  }

  if(testType === 'Function') {
    return (rule.test as Function)(testFilePath)
  }

  if(testType === 'Array') {
    return (rule.test as Array<webpack.RuleSetRule>).every(isJsLoader)
  }

  if(testType === 'Object') {
    const testField = rule.test as any
    let result = false
    
    if(testField.and && getType(testField.and) === 'Array') {
      result = isJsLoader(testField.and)
    }

    if(testField.exclude) {
      result = result && !isJsLoader(testField.exclude)
    }

    if(testField.include) {
      result = result || isJsLoader(testField.include)
    }

    if(testField.not) {
      result = result && !isJsLoader(testField.not)
    }

    if(testField.or) {
      result = result || isJsLoader(testField.or)
    }

    if(testField.test) {
      result = result || isJsLoader(testField.test)
    }

    return result
  }

  return false
}

function getType(test: any) {
  return Object.prototype.toString.apply(test).slice(8, -1)
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
