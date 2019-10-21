(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: build, setTransformPlugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "build", function() { return build; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTransformPlugin", function() { return setTransformPlugin; });
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack */ "webpack");
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _transformConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transformConfig */ "./src/transformConfig.ts");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const clone = __webpack_require__(/*! clone */ "clone");
const md5 = __webpack_require__(/*! md5 */ "md5");
let featureConfig = {};
const featureMapBuilders = {};
function build(featureMap = {}, specialWebpackConfig = {}, builderConfig = getDefaultBuilderConfig()) {
    return __awaiter(this, void 0, void 0, function* () {
        const builderStatus = getBuilderStatus(featureMap, builderConfig, specialWebpackConfig);
        if (builderStatus.isBuilding && builderStatus.buildPromise) {
            return builderStatus.buildPromise;
        }
        builderStatus.buildPromise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const pluginConfig = createSpecialPluginConfigByFeatureMap(featureMap, featureConfig);
            const _webpackConfig = getWebpackConfig(specialWebpackConfig, builderStatus);
            const webpackConfig = setWebpackConfigTransformPlugin(pluginConfig, _webpackConfig);
            builderStatus.isBuilding = builderStatus.isWatchMode;
            runWebpack(webpackConfig, resolve, reject, builderStatus);
        }));
        return builderStatus.buildPromise;
    });
}
function setTransformPlugin(_specialTransformConfig) {
    featureConfig = _specialTransformConfig;
}
function getFeatureMapMD5Key(featureMap) {
    try {
        return md5(JSON.stringify(featureMap || {}));
    }
    catch (e) {
        console.error(e);
    }
}
function getDefaultBuilderConfig() {
    return {
        isDifferentFile: false
    };
}
function getBuilderDefaultStatus(featureMapMD5Key = '') {
    const status = {
        isBuilding: false,
        isFull: true,
        isWatchMode: false,
        config: getDefaultBuilderConfig()
    };
    if (featureMapMD5Key && featureMapMD5Key !== 'undefined') {
        status.featureMapMD5Key = featureMapMD5Key;
    }
    return status;
}
function getBuilderStatus(featureMap, builderConfig, webpackConfig) {
    if (featureMap) {
        const featureMapMD5Key = getFeatureMapMD5Key(featureMap);
        if (featureMapBuilders[featureMapMD5Key])
            return featureMapBuilders[featureMapMD5Key];
        return featureMapBuilders[featureMapMD5Key] = Object.assign(Object.assign({}, getBuilderDefaultStatus()), { featureMapMD5Key, isFull: isFull(featureMap), isWatchMode: webpackConfig.watch, config: Object.assign(Object.assign({}, getDefaultBuilderConfig()), builderConfig) });
    }
    return getBuilderDefaultStatus();
}
function isFull(featureMap) {
    if (!featureMap)
        return true;
    return Object.keys(featureMap).every(key => featureMap[key]);
}
function runWebpack(webpackConfig, resolve, reject, builderStatus) {
    const compiler = webpack__WEBPACK_IMPORTED_MODULE_0__(webpackConfig, (err, stats) => {
        stats && stats.toString && console.log(stats.toString({
            chunks: false,
            colors: true // 在控制台展示颜色
        }));
        let info = {};
        if (stats && stats.toJson) {
            info = stats.toJson();
            if (stats.hasWarnings()) {
                console.warn(info.warnings);
            }
        }
        if (err || stats.hasErrors()) {
            return reject(err || info.errors);
        }
        resolve(builderStatus);
    });
    compiler.hooks && compiler.hooks.done.tap('done', () => {
        resolve(builderStatus);
    });
}
function createSpecialPluginConfigByFeatureMap(featureMap, specialTransformConfig) {
    const result = {};
    const _transformConfig = clone(Object.assign(Object.assign({}, _transformConfig__WEBPACK_IMPORTED_MODULE_1__["default"]), specialTransformConfig));
    Object.keys(_transformConfig).forEach(key => {
        const map = (featureMap || {});
        if (!map[key]) {
            result[key] = _transformConfig[key];
        }
    });
    return result;
}
function setWebpackConfigTransformPlugin(specialTransformConfig, webpackConfig) {
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
    };
    webpackConfig.module = webpackConfig.module || {};
    webpackConfig.module.rules = webpackConfig.module.rules || [];
    findJsLoaderAndReplacePlugin(webpackConfig.module.rules, transformLoader);
    return webpackConfig;
}
function findJsLoaderAndReplacePlugin(rules, transformLoader) {
    rules.forEach(item => {
        if (isJsLoader(item)) {
            item.use = transformLoader.use;
        }
        if (item.rules)
            findJsLoaderAndReplacePlugin(item.rules, transformLoader);
    });
}
function isJsLoader(rule) {
    const testFilePath = 'a.js';
    const testType = getType(rule.test);
    if (testType === 'String') {
        return /\.js\b/.test(rule.test);
    }
    if (testType === 'RegExp') {
        return rule.test.test(testFilePath);
    }
    if (testType === 'Function') {
        return rule.test(testFilePath);
    }
    if (testType === 'Array') {
        return rule.test.every(isJsLoader);
    }
    if (testType === 'Object') {
        const testField = rule.test;
        let result = false;
        if (testField.and && getType(testField.and) === 'Array') {
            result = isJsLoader(testField.and);
        }
        if (testField.exclude) {
            result = result && !isJsLoader(testField.exclude);
        }
        if (testField.include) {
            result = result || isJsLoader(testField.include);
        }
        if (testField.not) {
            result = result && !isJsLoader(testField.not);
        }
        if (testField.or) {
            result = result || isJsLoader(testField.or);
        }
        if (testField.test) {
            result = result || isJsLoader(testField.test);
        }
        return result;
    }
    return false;
}
function getType(test) {
    return Object.prototype.toString.apply(test).slice(8, -1);
}
function getWebpackConfig(specialWebpackConfig = {}, builderStatus) {
    if (builderStatus.isFull) {
        return specialWebpackConfig;
    }
    const defaultConfig = {
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
    };
    const webpackConfig = clone(Object.assign(Object.assign({}, defaultConfig), specialWebpackConfig));
    setWebpackOutput(webpackConfig, builderStatus);
    return webpackConfig;
}
function setWebpackOutput(webpackConfig, builderStatus) {
    if (!builderStatus.featureMapMD5Key || !webpackConfig.output)
        return;
    const output = webpackConfig.output;
    if (output.path && builderStatus.config.isDifferentFile) {
        webpackConfig.output.path = path__WEBPACK_IMPORTED_MODULE_2__["resolve"](output.path + `/featureMD5Key_${builderStatus.featureMapMD5Key}`);
        builderStatus.outputPath = webpackConfig.output.path;
    }
    //先注释
    // if(output.filename && !builderStatus.config.isDifferentFile) {
    //   let filename = webpackConfig.output.filename
    //   filename = filename.replace('.js', builderStatus.featureMapMD5Key +'.js')
    // }
}


/***/ }),

/***/ "./src/transformConfig.ts":
/*!********************************!*\
  !*** ./src/transformConfig.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    jsonStrings: '@babel/plugin-proposal-json-strings',
    //转换js动态加载: import()
    dynamicImport: '@babel/plugin-proposal-dynamic-import',
    //转换await, yield
    regenerator: '@babel/plugin-transform-regenerator',
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
    // 插件：'@babel/plugin-transform-destructuring'的局部功能(object部分)
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
    arrowFunctions: '@babel/plugin-transform-arrow-functions',
    // 转化块级空间函数定义
    blockScopedFunctions: '@babel/plugin-transform-block-scoped-functions',
    // 转化块级变量声明，同时会转化const 和let声明
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
    duplicateKeys: '@babel/plugin-transform-duplicate-keys',
    //转化求幂操作符：x ** 2 === Math.pow(x, 2)
    exponentiationOperator: '@babel/plugin-transform-exponentiation-operator',
    //转化for of循环： for(var i of obj){}
    forOf: '@babel/plugin-transform-for-of',
    //es2015对各种function的name属性做了统一，所以需要插件支持
    //依赖于各种转化插件，如箭头函数，class等等
    functionName: '@babel/plugin-transform-function-name',
    //使得instanceof操作符兼容Symbol.hasInstance
    'instanceof': '@babel/plugin-transform-instanceof',
    //let a = 0o07 === a = 7 以及类似的东西
    //https://www.babeljs.cn/docs/babel-plugin-transform-literals
    literals: '@babel/plugin-transform-literals',
    // 将关键字/保留字做为属性时，加上单双引号：const obj = {default: 1} 转化为 const obj = { "default": 1 }
    // 主要是解决import等里面用到的default以及其它关键字和保留字
    propertyLiterals: '@babel/plugin-transform-property-literals',
    // 将关键字/保留字做为属性时，加上单双引号：obj.default = 1 转为 obj["default"] = 1
    // 主要是解决import等里面用到的default以及其它关键字和保留字
    memberExpressionLiterals: '@babel/plugin-transform-member-expression-literals',
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
    newTarget: '@babel/plugin-transform-new-target',
    // 转化super()：参考https://www.babeljs.cn/docs/babel-plugin-transform-object-super
    objectSuper: '@babel/plugin-transform-object-super',
    /**
     * 转化函数参数，包括：
     * 默认值：(x = 1) => alert(x)
     * 解构：({ x }) => alert(x)
     * rest: (...x) => alert(x.length)
     */
    parameters: '@babel/plugin-transform-parameters',
    // 转化保留字变量：var abstract = 1; 转为 var _abstract = 1
    reservedWord: '@babel/plugin-transform-reserved-words',
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
    // exportDefaultFrom: '@babel/plugin-proposal-export-default-from',
    /**
     * 支持语法：export * as n from 'xxx'
     * 在当前模块导入xxx模块中x 并重命名为n
     * 并从当前模块导出n
     */
    // exportNamespaceFrom: '@babel/plugin-proposal-export-namespace-from',
    /**
     * 转化短路赋值：
     *   a ||= 3 等价与 a || (a = 3)
     *   a &&= 4 等价与 a && (a = 4)
     */
    logicalAssignmentOperators: '@babel/plugin-proposal-logical-assignment-operators',
    /**
     * 转化可选择的属性读取：
     *  //如果obj存在，同时，obj.test存在，读取obj.test.name的值
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
    nullishCoalescingOperator: ['@babel/plugin-proposal-nullish-coalescing-operator', { 'loose': true }],
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
    privateMethods: ['@babel/plugin-proposal-private-methods', { loose: true }],
    // 支持装饰器：此插件的配置legacy必须与privateMthods和class-properties的loose一致
    decorators: ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }]
});


/***/ }),

/***/ "clone":
/*!************************!*\
  !*** external "clone" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("clone");

/***/ }),

/***/ "md5":
/*!**********************!*\
  !*** external "md5" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("md5");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ })

/******/ });
});