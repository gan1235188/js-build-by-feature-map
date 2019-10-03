type babelTransformPlugin = any

export interface featureTransformType {
    [featureName: string]: babelTransformPlugin
}

export default {
    jsonStrings: '@babel/plugin-proposal-json-strings',

    //转换js动态加载: import()
    dynamicImport: '@babel/plugin-proposal-dynamic-import',

    //转换await, yield
    regenrator: '@babel/plugin-transform-regenerator',

    //转化: ::obj.test, ::obj.test(1), obj::test, obj::test(1)
    functionBind: '@babel/plugin-proposal-function-bind',

    //转化展开：...，如：[1,...[2,3]] === [1,2,3]
    spread: '@babel/plugin-transform-spread',

    /**
     * 转化解构：
     *  如const { x } = { x: 1} === x = {x: 1}.x
     *  let [a, b, ...c] = [1, 2, 3, 4] === a = 1, b = 2, c = [3,4]
     */
    destructuring: '@babel/plugin-transform-destructuring',

    // (不在需要)插件：'@babel/plugin-transform-destructuring'的局部功能(object部分)
    objectRestSpread: '@babel/plugin-proposal-object-rest-spread',

    //转化：try...catch时，catch的括号(以及参数)可以省略
    optionalCatchBinding: '@babel/plugin-proposal-optional-catch-binding',

    /**
     * 正则表达式跟unicode相关的修正
     * 以下是部分功能：
     *  转化: /\p{Unified_Ideograph}/u为普通浏览器兼容的正则
     *  /[\u4e00-\u9fa5]/是错的，不要用二十年前的正则表达式了
     *  /\p{Unified_Ideograph}/u是正确的，不需要维护，匹配所有汉字。这里 \p是 Unicode 属性转义正则表达式。
     *  /\p{Ideographic}/u 和 /\p{Script=Han}/u 匹配了除了汉字以外的其他一些字符，在「汉字匹配正则表达式」这个需求下，是错的。
     *  目前只有 Chrome 支持 Unicode 属性转义正则表达式。对其他环境，使用 @babel/plugin-proposal-unicode-property-regex 和 regexpu-core 进行优雅降级。
     */
    unicodePropertyRegex: '@babel/plugin-proposal-unicode-property-regex',

    // 单独转化async和await，如果有yied和*，则不转化
    asyncToGenerator: '@babel/plugin-transform-async-to-generator',

    // 转化箭头函数：()=>{} === function(){}
    // arrowFunctions: '@babel/plugin-transform-arrow-functions',

    // 转化块级空间函数定义
    blockScopedFunctions: '@babel/plugin-transform-block-scoped-functions',

    // 转化块级变量声明
    blockScoping: '@babel/plugin-transform-block-scoping',

    // 转换class属性，类属性插件必须要在类插件之前
    // loose模式：是否使用Object.defineProperty设置(如果为false)
    // 如果使用了插件@babel/plugin-proposal-decorators并且legacy为true，则loose必须为true
    classProperties: ['@babel/plugin-proposal-class-properties', { 'loose': true }],

    // 转换类
    classes: '@babel/plugin-transform-classes',

    //计算属性：obj = { ['x' + 2]: 'x2' } => obj = {x2: 'x2'}
    computedProperties: '@babel/plugin-transform-computed-properties',

    //匹配转化正则表达式的dotAll模式：s修饰符，"."可以匹配任何单字符
    dotallRegex: '@babel/plugin-transform-dotall-regex',

    //对象重复属性(get属性与非get属性重名)
    // '@babel/plugin-transform-duplicate-keys',

    //转化求幂操作符：x ** 2 === Math.pow(x, 2)
    exponentiationOperator: '@babel/plugin-transform-exponentiation-operator',

    //转化for of循环： for(var i of obj){}
    forOf: '@babel/plugin-transform-for-of',

    //es2015对各种function的name属性做了统一，所以需要插件支持
    //依赖于各种转化插件，如箭头函数，class等等
    functionName: '@babel/plugin-transform-function-name',

    //使得instanceof操作符兼容System
    instanceof: '@babel/plugin-transform-instanceof',

    //let a = 0o07 === a = 7 以及类似的东西
    //https://www.babeljs.cn/docs/babel-plugin-transform-literals
    literals: '@babel/plugin-transform-literals',

    // 将关键字/保留字做为属性时，加上单双引号：const obj = {default: 1} 转化为 const obj = { "default": 1 }
    // 主要是解决import等里面用到的default以及其它关键字和保留字
    propertyLiterals: '@babel/plugin-transform-property-literals', //es3

    // 将关键字/保留字做为属性时，加上单双引号：obj.default = 1 转为 obj["default"] = 1
    // 主要是解决import等里面用到的default以及其它关键字和保留字
    memberExpressionLiterals: '@babel/plugin-transform-member-expression-literals', //es3

    /**
     * (一般不用)将模块转化为AMD模式：
     * export default 42 => define(["export"], xxxx)。
     * 参考：https://www.babeljs.cn/docs/babel-plugin-transform-modules-amd
     */
    // modulesMmd: '@babel/plugin-transform-modules-amd',

    /**
     * (一般不用)将模块转化为System模式：
     * export default 42 => System.register(["export"], xxxx)。
     * 参考：https://www.babeljs.cn/docs/babel-plugin-transform-modules-systemjs
     */
    // modulesSystemjs: '@babel/plugin-transform-modules-systemjs',

    /**
     * (一般不用)将模块转化为UMD模式：
     * export default 42 => (function(xxx){xxx})(xxx, function(){})
     * 参考：https://www.babeljs.cn/docs/babel-plugin-transform-modules-umd
     */
    // modulesUmd: '@babel/plugin-transform-modules-umd',

    /**
     * (常用))将模块转化为commonJS模式：
     * export default 42 => (function(xxx){xxx})(xxx, function(){})
     * 参考：https://www.babeljs.cn/docs/babel-plugin-transform-modules-umd
     * 注意，不能转化["import()"]
     */
    modulesCommonjs: '@babel/plugin-transform-modules-commonjs',

    /**
     * 转化正则表达式的新语法，类似：/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
     * 注意，这个插件生成的代码需要支持ES6语法的浏览器或者引入polyfill
     * 参考：https://www.babeljs.cn/docs/babel-plugin-transform-named-capturing-groups-regex
     */
    namedCapturingGroupsRegex: '@babel/plugin-transform-named-capturing-groups-regex',

    // 将function里面的new.target转化为：this.constructor(支持new.target语法)))
    newRarget: '@babel/plugin-transform-new-target',

    // 转化super()：参考https://www.babeljs.cn/docs/babel-plugin-transform-object-super
    ObjectSuper: '@babel/plugin-transform-object-super',

    /**
     * 转化函数参数，包括：
     * 默认值：(x = 1) => alert(x)
     * 解构：({ x }) => alert(x)
     * rest: (...x) => alert(x.length)
     */
    parameters: '@babel/plugin-transform-parameters',

    // 转化保留字变量：var abstract = 1; 转为 var _abstract = 1
    reservedWord: '@babel/plugin-transform-reserved-words', //es3

    // const x = { test } 转为 const x = { test: test }
    shorthandProperties: '@babel/plugin-transform-shorthand-properties',

    // /s/y => new RegExp('s', 'y')。 疑问：浏览器不支持y模式还管用吗?
    stickyRegex: '@babel/plugin-transform-sticky-regex',

    // 转化模版文字：`dafa${123}` === 'dafa'.concat(123)
    templateLiterals: '@babel/plugin-transform-template-literals',

    // 转化支持：typeof Symbol === 'symbol'
    typeofSymbol: '@babel/plugin-transform-typeof-symbol',

    /**
     * 转化正则表达式中u模式下，.可以匹配任意字符(没有u修饰符，则不能匹配码点大于oxFFFF的Unicode 字符)
     * 注意：使用此插件回导致 /\p{Unified_Ideograph}/u 报错，
     * 需要使用插件'@babel/plugin-proposal-unicode-property-regex'
     */
    unicodeRegex: '@babel/plugin-transform-unicode-regex',

    /**
     * 支持语法：export x as n from 'xxx'
     * 在当前模块导入xxx模块中x
     * 并从当前模块导出x
     */
    exportDefaultFrom: '@babel/plugin-proposal-export-default-from',

    /**
     * 支持语法：export * as n from 'xxx'
     * 在当前模块导入xxx模块中x 并重命名为n
     * 并从当前模块导出n
     */
    exportNamespaceFrom: '@babel/plugin-proposal-export-namespace-from',

    /**
     * 转化短路赋值：
     *   a ||= 3 等价与 a || (a = 3)
     *   a &&= 4 等价与 a && (a = 4)
     */
    logicalAssignmentOperators: '@babel/plugin-proposal-logical-assignment-operators',

    /**
     * 转化可选择的属性读取：
     *  //如果obj存在，同时，obj.test存在，读取obj.test.name的志
     *  obj?.test?.name //b不会抛错
     */
    optionalChaining: '@babel/plugin-proposal-optional-chaining',

    /**
     * 转化操作符 |> 
     * let result = 1 |> fn1 |> fn2 |> fn3
     * 等价于
     * let result = fn3(fn2(fn1(1)))
     * 
     * demo: 
     * function add2(x) {
     *      return (y) => {
     *          return x + y
     *      }
     *  }
     *
     *  let result1 = 1 |> add(2) |> add(3) |> add(4)
     */
    pipelineOperator: ['@babel/plugin-proposal-pipeline-operator', { 'proposal': 'minimal' }],

    // 转化操作符??: var result = a ?? b     判定a是否为null或者undefined
    nullishCoalescingOperator: ['@babel/plugin-proposal-nullish-coalescing-operator', { 'loose': false }],

    // (没看出什么优势))转化do表达式: https://www.babeljs.cn/docs/babel-plugin-proposal-do-expressions
    doExpressions: '@babel/plugin-proposal-do-expressions',

    /**
     * 解决generator函数的第一个next方法参数被丢弃的问题
     * function *test() {
     *      console.log(yield)
     *      console.log(yield)
     * }
     * 
     * *test()
     *  .next(2) //没有console.log
     *  .next(3) //console.log(3) 打印3
     * 
     * function *test() {
     *      console.log(function.sent)
     *      console.log(yield)
     * }
     * 
     * *test()
     *  .next(2) //console.log(3) 打印2
     *  .next(3) //console.log(3) 打印3
     */
    functionSent: '@babel/plugin-proposal-function-sent',

    // 转化数字分隔符_，增加可读性
    // 1_000 === 1000, 0.000_001 === 0.000001
    numericSeparator: '@babel/plugin-proposal-numeric-separator',

    // 支持语法：const a = 1 || throw new Error(1)
    throwExpressions: '@babel/plugin-proposal-throw-expressions',

    // 转化对象的getter setter属性：使用Object.defineProperty定义
    propertyMutators: '@babel/plugin-transform-property-mutators',

    // 支持generator返回promise，
    // 参考：https://www.babeljs.cn/docs/babel-plugin-proposal-async-generator-functions
    asyncGeneratorFunctions: '@babel/plugin-proposal-async-generator-functions',

    // 支持局部参数传递(替换不需要this功能的bind函数)：
    // 参考：https://www.babeljs.cn/docs/babel-plugin-proposal-partial-application
    partialApplication: '@babel/plugin-proposal-partial-application',

    // (注意是使用WeakMap实现，存在兼容问题)类的私有属性、方法和getter、setter
    privateMethods: '@babel/plugin-proposal-private-methods',

    // 支持装饰器：此插件的配置legacy必须与privateMthods和class-properties的loose一致
    decorators: ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }]
} as featureTransformType