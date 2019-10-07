type babelTransformPlugin = any

export interface featureTransformType {
    [featureName: string]: babelTransformPlugin
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
