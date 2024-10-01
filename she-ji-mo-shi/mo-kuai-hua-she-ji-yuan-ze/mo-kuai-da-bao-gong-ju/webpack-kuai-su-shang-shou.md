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

由于webpack默认仅内置了js的loader，因此当entry设置为css文件时，会直接报错。此时需要为css文件添加css-loader。如下：

```javascript
module.export = {
    entry:'./src/index.css', // 入口文件 
    // 输出文件的位置
    output:{
        fileName:'bundle.js',
        path: Path.join(__dirname,'dist'),  // 绝对路径
    } 
    module:{
         rules:[
              test:/.css$/,
              use:['style-loader','css-loader']
         ]
    }
}
```

如果仅仅使用css-loader，它只会把模块化的代码插入到一个数组中，如下，并不会真正被应用。因此还需要style-loader，将样式注入到style标签内。

<figure><img src="../../../.gitbook/assets/截屏2024-10-01 14.41.06.png" alt=""><figcaption></figcaption></figure>

## 导入资源模块

即对于不同文件类型，使用不同loader，这块不再展开细讲。

webpack建议我们在JS中引入CSS或其他资源模块，它是建议在编写代码过程中引入需要的资源文件（即<mark style="color:red;">根据代码需要动态导入资源</mark>），那是因为<mark style="color:red;">真正需要资源的不是应用而是代码</mark>。

JS有个功能：<mark style="color:red;">驱动了整个前端应用</mark>。

常见loader：

### 文件资源加载器

**大多数加载器都类似于css-loader，可以将资源模块转化成JS代码的实现方式去工作**。但是还有些我们经常用到的资源，如图片、字体，这些文件呢是没有办法通过JS代码的方式去表现的。对于这类资源的loader，需要用到<mark style="color:red;">文件资源加载器,</mark>**即file-loader。**

```javascript
import icon from './icon.png'

const img = new Image()
img.src = icon
document.body.appendChild(img)
```



```javascript
module.export = {
    entry:'./src/index.css', // 入口文件 
    // 输出文件的位置
    output:{
        fileName:'bundle.js',
        path: Path.join(__dirname,'dist'),  // 绝对路径
        publicPath:'./dist'  
        // 默认打包路径，这里需要补充上去，
        // 否则webpack默认认为file-loader后生成的文件都在入口文件的根目录下（也就是src）
    } 
    module:{
         rules:[
              {
                  test:/.css$/,
                  use:['style-loader','css-loader']
              },
              {
                  test:/.png$/,
                  use:['file-loader']
              }
         ]
    }
}
```



在加入file-loader ，打包后，生成的文件.bundlejs，我们发现最终将图片的**文件名称**导出出去了。



<figure><img src="../../../.gitbook/assets/截屏2024-10-01 15.14.00.png" alt=""><figcaption></figcaption></figure>

### URL加载器

除了用文件url的方式去加载资源外，还有一种以data-url的方式，也比较常见。

<figure><img src="../../../.gitbook/assets/截屏2024-10-01 15.58.19.png" alt=""><figcaption></figcaption></figure>

关于生成data-url，需要使用url-loader。它比较适合体积小的资源，体积大的资源会导致打包结果过大。

### 常用加载器分类

* 编译转换类：将资源模块转化为JS代码，如css-loader

<div align="center">

<figure><img src="../../../.gitbook/assets/截屏2024-10-01 16.04.10.png" alt="" width="375"><figcaption></figcaption></figure>

</div>

* 文件操作类：将模块拷贝到输出目录，同时将文件的访问路径向外导出，如File-loader



<figure><img src="../../../.gitbook/assets/截屏2024-10-01 16.06.27.png" alt="" width="375"><figcaption></figcaption></figure>

* 代码检查类：

<figure><img src="../../../.gitbook/assets/截屏2024-10-01 16.07.50.png" alt="" width="375"><figcaption></figcaption></figure>

## webpack加载资源的方式

webpack触发资源的加载方式，除了JS导入资源方式，如下：

* 遵循ES Module标准的import声明
* 遵循CommonJS标砖的require函数
* 遵循AMD标准的define函数和require函数

此外，loader加载的非JS也会触发资源加载，如

* CSS-loader去加载的css文件中的@import指令和url函数。
* HTML-loader去加载的html文件中的IMG标签的src、或其他表情的相关属性

<figure><img src="../../../.gitbook/assets/截屏2024-10-01 16.20.43.png" alt="" width="209"><figcaption></figcaption></figure>

