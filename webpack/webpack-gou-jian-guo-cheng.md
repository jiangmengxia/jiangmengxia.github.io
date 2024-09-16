# webpack构建过程

## 1. 前言

毋庸置疑，webpack是前端最流行的打包工具，没有之一。构建流程大体（图片引用[https://juejin.cn/post/6844904000169607175](https://juejin.cn/post/6844904000169607175)）：



<figure><img src="../.gitbook/assets/image (13).png" alt=""><figcaption></figcaption></figure>

* 【webpack-cli】是webpack的命令行生效所需的依赖
* 【webpack初始化】webpack读取config文件后，根据配置所进行的初始化，主要有以下三个动作：
  * 生成compiler
  * 初始化默认插件
  * 初始化Options配置
* 【webpack构建】
  * 构建依赖compiler；构建过程中，会经历不同的生命周期，并且抛出hooks，供用户实现自定义plugin功能。
* 【构建结束，输出文件】



## 2. webpack构建流程通俗化 <a href="#sbqff" id="sbqff"></a>

【分析入口文件】

entry找到入口文件，根据入口文件索引所有依赖文件之间的依赖关系，生成一棵树。这棵树上每个文件要怎么处理，就在webpack config文件中配置modules，modules可以配置使用不同的loader来处理不同类型的文件，当然有时候loader配置的时候，需要结合plugin配合使用。

【生成html等目标文件】

最后生成什么文件、怎么生成这些目标文件，就需要plugin了。webpack会根据modules，output等的配置（或优化项的配置等）知道生成的目标文件的名称。HtmlwebpackPlugin会根据webpack的config项找到要生成的目标文件（css/js），并且根据配置来组织如何生成html文件，也就是如何将css和js文件怎么插入到html文件中。

【plugins处理的时机】

webpack在整个构建过程中，会抛出很多hooks，通过这些hooks，可以在对应的时机自定义plugin的功能。好比HtmlwebpackPlugin要在所有的css文件已经抽离，入口js文件已经生成后才能将css/js插入到模板html文件中。

## **3. Compiler模块** <a href="#xxuuo" id="xxuuo"></a>

字面意思是编译器，和compliation是两个不同的概念，编译器(compiler)的一次执行才是一次编译（compliation）。**Compiler 主要工作就是执行编译。**

**Compiler 模块是 webpack 的主要引擎，它通过** [**CLI**](https://webpack.docschina.org/api/cli) **（webpack-cli）或者** [**Node API**](https://webpack.docschina.org/api/node) **传递的所有选项创建出一个 compilation 实例；**它扩展（extends）自 Tapable 类，用来注册和调用插件。 大多数面向用户的插件会首先在 Compiler 上注册。

Compiler拿到config的配置信息，将进行一些初始配置：

* 初始化插件、options配置等
* 环境准备
* 处理entry

compiler 在不同生命周期会暴露不同的钩子， 可以通过如下方式访问：

```
compiler.hooks.someHook.tap('MyPlugin', (params) => {
  /* ... */
});
```

下面依次介绍一下compiler在编译过程中提供的钩子。

## 常用钩子

看语雀上面的文档。

## 总结 <a href="#hjff2" id="hjff2"></a>

* compiler主要是用来控制compilation的执行，并为它的执行提供必要的初始化数据，最后基于compilation的执行结果和配置信息判断是否要输出相应的目标文件。
* compilation主要是基于compiler提供的入参，进行模块构建的过程（也就是基于文件之间的引用关系生成一棵树）。基于处理好的entry数据和提供的工具，进行文件依赖的遍历和依赖树的创建，从而生成目标文件的信息（所有文件的目录、名称、内容等）。
* 一般来说，一次webpack-cli的命令执行，就会生成一次compiler，整个compiler的处理流程中，可能会有n次compilation的执行。
*
  * 由于config文件的配置信息是不变的，在多次compilation时，可以复用这些配置信息，以及基于这些配置信息处理后的对象。

【参考文献】

[https://juejin.cn/post/6844903779712630797](https://juejin.cn/post/6844903779712630797)





