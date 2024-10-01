# webpack快速上手

webpack提供了一整套前端项目模块化的方案，而不仅仅局限于对JS代码的模块化。

通过webpack提供的前端模块化方案，可以很轻松的对开发过程中所有的资源进行模块化。

webpack想法比较先进，随着版本迭代、更新、优化，webpack已经是非常受欢迎了，基本上覆盖了市面上绝大部分前端web项目的开发过程。

下面从一些小案例来说明webpack的基本使用。



## 快速上手

webpack4开始，支持0配置的方式直接启动打包。整个打包过程会按照约定，将`src/.indexjs` 打包成 `dist/main.js` 。但是很多时候我们需要自定义路径，比如入口文件、打包目标目录等，这时候需要为webpack添加专门的配置文件 `webpack.conf.js`。



{% code title="webpack.conf.js" %}
```javascript
module.export = {
    entry:'./src/index.js', // 入口文件 
    // 输出文件的位置
    output:{
        fileName:'bundle.js',
        path: Path.join(__dirname,'dist'),  // 绝对路径
    } 
}
```
{% endcode %}

## 工作模式

简化配置的复杂程度，是针对于不同环境的预设配置。如果没有预设mode属性，则wenpack4及以上的版本会默认为“production”的模式。这种工作模式有三种：

* production模式，webpack会自动启动一些优化插件：
  * 自动代码压缩
* develop模式，webpack会优化打包速度
* none模式，webpack就是运行最原始状态的打包，不做任何额外处理

工作模式可以通过命令行--mode 设置，也可以通过配置文件配置。

## 打包结果运行原理

webpack打包后整体生成代码是一个**立即执行函数**。它接受一个叫作“`modules`”的参数，调用时传入一个数组。这个数组的每一项都是一个参数列表相同的函数。这里的函数对应的就是源代码的模块。也就是说，最终每一个模块都会被包裹进这样的函数中，从而实现模块的**私有作用域**。

```javascript
(function(modules){
  ... 
})([
  （function(module, __webpack_exports__,__webpack_require__){}）,
  （function(module, __webpack_exports__,__webpack_require__){}）
])
```



具体看下这个函数内部的实现：

* 定义一个对象 `installedModules` ，用来缓存加载过的模块
* 定义 require 函数，这个函数是专门用来加载模块的
* 一些使用工具或变量
* 返回一个函数，该函数用来加载模块，并导出模块



```javascript
(function(modules){
  // the module cache
  var installedModules = {}
  // the require function, 会判断该模块是否加载过，未加载则加载，加载后执行。
  function __webpack_require__(moduleId){...}
  // expose the modules object (__weboack_modules__)
  __webpack_require__.m = modules
  // expose the module cache
  __webpack_require__.c = installedModules
  // defined getter function form harmony exports
  __webpack_require__.d = function(exports,name,getter){...}
  // defined __esModule on exports
  __webpack_require__.r = function(exports){...}
  
  // create a fake namespace object
  __webpack_require__.t = function(value,mode){...}
  // getDefaultExport funciton for compatibility with non-harmony modules
  __webpack_require__.n = function(module){...}
  
  //object.property.hasOwnProperty.call
  __webpack_require__.o = function(object,property)...}
  // path
  __webpack_require__.p = ''
  
  // load entry mode and return exports
  retrun __webpack_require__(__webpack_require__.s=0)
  
})([
  （function(module, __webpack_exports__,__webpack_require__){}）,
  （function(module, __webpack_exports__,__webpack_require__){}）
])
```

## 资源模块的加载

