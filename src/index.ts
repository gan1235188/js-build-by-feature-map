import * as webpack from 'webpack'
import transformConfig from './transformConfig'
import * as path from 'path'
import { 
  featureMap,
  featureTransformType,
  featureMapBuilders,
  featureMapBuilder,
  builderConfig
} from './types'

export * from './types'

const clone = require('clone')
const md5 = require('md5')
let featureConfig: featureTransformType = {}
const featureMapBuilders: featureMapBuilders = {}
export async function build(
  featureMap: featureMap= {},
  specialWebpackConfig: any = {},
  builderConfig: builderConfig = getDefaultBuilderConfig()): Promise<featureMapBuilder>
{
  const builderStatus = getBuilderStatus(featureMap, builderConfig, specialWebpackConfig)

  if(builderStatus.isBuilding && builderStatus.buildPromise) {
    return builderStatus.buildPromise
  }

  builderStatus.buildPromise = new Promise<featureMapBuilder>(async (resolve, reject) => {
    const pluginConfig = createSpecialPluginConfigByFeatureMap(featureMap, featureConfig)
    const _webpackConfig = getWebpackConfig(specialWebpackConfig, builderStatus)
    const webpackConfig = setWebpackConfigTransformPlugin(pluginConfig, _webpackConfig)

    builderStatus.isBuilding = builderStatus.isWatchMode
    runWebpack(webpackConfig, resolve, reject, builderStatus)
  })

  return builderStatus.buildPromise
}

export function setTransformPlugin(_specialTransformConfig: featureTransformType) {
  featureConfig = _specialTransformConfig
}

function getFeatureMapMD5Key(featureMap: featureMap) {
  try {
    return md5(JSON.stringify(featureMap || {}))
  }catch(e) {
    console.error(e)
  }
}

function getDefaultBuilderConfig(): builderConfig {
  return {
    isDifferentFile: false
  }
}

function getBuilderDefaultStatus(featureMapMD5Key: string = '') {
  const status: featureMapBuilder = {
    isBuilding: false,
    isFull: true,
    isWatchMode: false,
    config: getDefaultBuilderConfig()
  }
  if(featureMapMD5Key && featureMapMD5Key !== 'undefined') {
    status.featureMapMD5Key = featureMapMD5Key
  }

  return status
}

function getBuilderStatus(
  featureMap: featureMap,
  builderConfig: builderConfig,
  webpackConfig: webpack.Configuration
): featureMapBuilder {
  if(featureMap) {
    const featureMapMD5Key = getFeatureMapMD5Key(featureMap)
    if(featureMapBuilders[featureMapMD5Key]) return featureMapBuilders[featureMapMD5Key]

    return featureMapBuilders[featureMapMD5Key]= {
      ...getBuilderDefaultStatus(),
      featureMapMD5Key,
      isFull: isFull(featureMap),
      isWatchMode: webpackConfig.watch,
      config: {
        ...getDefaultBuilderConfig(),
        ...builderConfig
      }
    }
  }

  return getBuilderDefaultStatus()
}

function isFull(featureMap: featureMap) {
  if(!featureMap) return true
  return Object.keys(featureMap).every(key => (featureMap as any)[key])
}

function runWebpack(
  webpackConfig: webpack.Configuration,
  resolve: Function,
  reject: Function,
  builderStatus: featureMapBuilder)
{
  const compiler = webpack(webpackConfig, (err, stats) => {
    stats && stats.toString && console.log(stats.toString({
      chunks: false,  // 使构建过程更静默无输出
      colors: true    // 在控制台展示颜色
    }));

    let info = {} as webpack.Stats.ToJsonOutput
    if(stats && stats.toJson) {
      info = stats.toJson();
      if (stats.hasWarnings()) {
        console.warn(info.warnings);
      }
    }

    if (err || stats.hasErrors()) {
      return reject(err || info.errors)
    }

    resolve(builderStatus)
  }) as webpack.Compiler

  compiler.hooks && compiler.hooks.done.tap('done', () => {
    resolve(builderStatus)
  })
}

function createSpecialPluginConfigByFeatureMap(
  featureMap: featureMap,
  specialTransformConfig: featureTransformType)
{
  const result: featureTransformType = {}
  const _transformConfig = clone({
    ...transformConfig,
    ...specialTransformConfig
  })

  Object.keys(_transformConfig).forEach(key => {
    const map = (featureMap || {}) as any
    if(!map[key]) {
      result[key] = _transformConfig[key]
    }
  })

  return result
}

function setWebpackConfigTransformPlugin (
  specialTransformConfig: featureTransformType,
  webpackConfig: webpack.Configuration
) {
  // TODO: 如果js的loader使用了除了babel以外的loader会导致问题
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


function getWebpackConfig(
  specialWebpackConfig: webpack.Configuration = {},
  builderStatus: featureMapBuilder)
{
  if(builderStatus.isFull) {
    return specialWebpackConfig
  }

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

  const webpackConfig = clone({
    ...defaultConfig,
    ...specialWebpackConfig
  })

  setWebpackOutput(webpackConfig, builderStatus)

  return webpackConfig
}

function setWebpackOutput(
  webpackConfig: webpack.Configuration,
  builderStatus: featureMapBuilder)
{
  if(!builderStatus.featureMapMD5Key || !webpackConfig.output) return

  const output = webpackConfig.output
  if(output.path && builderStatus.config.isDifferentFile) {
    webpackConfig.output.path = path.resolve(output.path + `/featureMD5Key_${builderStatus.featureMapMD5Key}`)
    builderStatus.outputPath = webpackConfig.output.path
  }

  //先注释
  // if(output.filename && !builderStatus.config.isDifferentFile) {
  //   let filename = webpackConfig.output.filename
  //   filename = filename.replace('.js', builderStatus.featureMapMD5Key +'.js')
  // }
}