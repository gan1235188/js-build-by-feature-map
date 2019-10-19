type babelTransformPlugin = any

export interface builderConfig {
  isDifferentFile: boolean //是否将不同特性的代码存放到不同的文件夹
  
}

export interface featureTransformType {
    [featureName: string]: babelTransformPlugin
}

export interface featureMapBuilder {
  isBuilding: boolean
  featureMapMD5Key?: string
  isFull: boolean
  outputPath?: string
  isWatchMode: boolean
  config: builderConfig
}

export interface featureMapBuilders {
  [key: string]: featureMapBuilder
}

export interface featureMap {
  jsonStrings?: boolean
  dynamicImport?: boolean
  regenerator?: boolean
  functionBind?: boolean
  spread?: boolean
  destructuring?: boolean
  optionalCatchBinding?: boolean
  unicodePropertyRegex?: boolean
  asyncToGenerator?: boolean
  arrowFunctions?: boolean
  blockScopedFunctions?: boolean
  blockScoping?: boolean
  classProperties?: boolean
  classes?: boolean
  computedProperties?: boolean
  dotallRegex?: boolean
  exponentiationOperator?: boolean
  forOf?: boolean
  functionName?: boolean
  instanceof?: boolean
  literals?: boolean
  propertyLiterals?: boolean
  memberExpressionLiterals?: boolean
  modulesMmd?: boolean
  modulesSystemjs?: boolean
  modulesUmd?: boolean
  modulesCommonjs?: boolean
  namedCapturingGroupsRegex?: boolean
  newTarget?: boolean
  objectSuper?: boolean
  parameters?: boolean
  reservedWord?: boolean
  shorthandProperties?: boolean
  stickyRegex?: boolean
  templateLiterals?: boolean
  typeofSymbol?: boolean
  unicodeRegex?: boolean
  exportDefaultFrom?: boolean
  exportNamespaceFrom?: boolean
  logicalAssignmentOperators?: boolean
  optionalChaining?: boolean
  pipelineOperator?: boolean
  nullishCoalescingOperator?: boolean
  doExpressions?: boolean
  functionSent?: boolean
  numericSeparator?: boolean
  throwExpressions?: boolean
  propertyMutators?: boolean
  asyncGeneratorFunctions?: boolean
  partialApplication?: boolean
  privateMethods?: boolean
  decorators?: boolean
}

export interface dynamicProperty {
  [key: string]: boolean
}
