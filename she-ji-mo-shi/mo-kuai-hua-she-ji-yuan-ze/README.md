# 模块化设计原则

## 模块化的演变

### 阶段1：基于文件划分的方式

将每个script引入的JS文件，作为一个模块。

<figure><img src="../../.gitbook/assets/截屏2024-09-23 21.59.23.png" alt=""><figcaption></figcaption></figure>

存在问题：

* 所有模块都是在全局作用域下工作，会污染全局作用域
* 命名冲突问题
* 无法管理模块依赖关系

原始方式完全依靠约定，当体量大了之后，更加不好管理了。

### 阶段2：命名空间方式

约定每个模块，只暴露一个全局对象。依旧利用script将各个模块引入。

<figure><img src="../../.gitbook/assets/截屏2024-09-23 22.04.39.png" alt=""><figcaption></figcaption></figure>

可以减少命名冲突可能。但存在的问题是：

* 模块依旧没有私有空间，模块内成员仍然可以在外部被访问，被修改。
* 模块依赖关系依旧没有解决

### 阶段3： IIFE-立即执行函数

利用立即执行函数为每个模块提供私有空间。具体做法：

<figure><img src="../../.gitbook/assets/截屏2024-09-23 22.14.14.png" alt=""><figcaption></figcaption></figure>

* 保护私有空间：使得模块成员只能在模块内部访问，外部变量无法直接访问。只能通过该模块提供的对外接口访问内部变量或方法。这样确保了私有变量的安全。
* 解决了模块的依赖关系问题。如上图立即函数入参Jquery，则就知道当前模块依赖Jquery这个模块。



以上三个阶段，是早期在没有工具和规范的环境下，实现前端模块化的方式，虽然解决了一些问题，但仍旧存在未解决的问题。

## 模块化规范（前端）

对于以上几个模块化方式都是在原始的模块系统为基础，通过约定的方式去实现模块化的代码组织。这些方式在不同的开发者去实施的时候，会有一些差别。为了统一不同开发者和不同的项目之间的差异性，急需一个标准作为规范，去规范模块化的实现方式。

另外在模块化开发中，针对模块加载的问题，在这几种方式中都是通过script标签手动去引入每一个模块。这就意味着模块化的加载不受代码控制，需要手动引入，多引入、未引入都是问题，因此可维护性差。

以上两个问题，说明急需：（1）统一模块化规范（2）一种基础功能代码能够根据依赖关系，自动引入模块。

模块化规范是一种定义如何组织、加载和交互模块的约定。不同的编程语言和平台有不同的模块化规范。以下是几种常见的模块化规范：

### 1. CommonJS

CommonJS是<mark style="background-color:purple;">Node.js</mark>的模块系统，它定义了如何在服务器端模块化JavaScript代码。CommonJS模块使用`require`语句导入模块，使用`module.exports`或`exports`导出模块。

```javascript
// 导出
module.exports = {
  myFunction: function() {
    // ...
  }
};

// 导入
const myModule = require('./myModule.js');
myModule.myFunction();
```

Node的执行机制是在启动时加载模块（<mark style="background-color:purple;">同步模式</mark>），执行过程中是不需要加载的，只会使用模块。所以这种方式在node中不会有问题。

但是如果换到浏览器端，必然导致效率低下。每次页面加载会导致大量<mark style="background-color:purple;">同步</mark>模块的请求出现，所以早期模块化中，并没有采用CommonJs规范。而是专门为浏览器端根据浏览器的特点制定了一套新的规范：AMD。

### 2. AMD（Asynchronous Module Definition）

AMD规范定义了如何定义和加载模块，它允许<mark style="background-color:purple;">异步</mark>加载模块，从而提高页面加载速度。代表库有<mark style="background-color:purple;">RequireJS</mark>。

```javascript
// 定义模块,三个参数：模块名称（可省略），依赖模块集合，具体函数
//     或者两个参数：依赖模块集合，具体函数
define('moduleC' , ['moduleA', 'moduleB'], function(moduleA, moduleB) {
  // 使用moduleA和moduleB
});

// 加载模块，用法与defined类似。
require(['moduleA', 'moduleB'], function(moduleA, moduleB) {
  // 使用moduleA和moduleB
});
```

当require去加载这个模块时，会自动生成一个script标签，去发送加载对应脚本文件的请求，并且执行相应模块代码。

目前绝大多数第三方库都支持AMD规范。也就是说ADM的生态是比较好的，但是使用起来比较复杂。

现在这个AMD已经不太被前端推崇，它只是在前端模块化标准化道路上的一个产物，给模块化提供了一种有效手段。

除此之外，同期出现的还有淘宝推荐的Sea.js+CMD。

### 3. CMD（Common Module Definition）

CMD规范是Sea.js实现的模块化规范，它和CommonJS类似，但更注重按需加载和依赖管理。

```javascript
// 定义模块
define(function(require, exports, module) {
  // 使用require导入模块
  var moduleA = require('./moduleA.js');
  // 使用exports导出模块
  exports.myFunction = function() {
    // ...
  };
});

// 加载模块
seajs.use(['moduleA', 'moduleB'], function(moduleA, moduleB) {
  // 使用moduleA和moduleB
});
```

当时的设计想法是希望CMD写出来的代码跟CommonJS类似，从而减轻开发者的学习成本。但是后来这种方式被requireJS也兼容了。

### 4. ES6 Modules

ES6（ECMAScript 2015）引入了原生的JavaScript模块系统，称为ES6 Modules。ES6模块是静态的，编译时确定依赖关系，支持导入和导出，并且默认是异步加载的。

```javascript
// 导出
export function myFunction() {
  // ...
}

// 导入
import { myFunction } from './myModule.js';
```

### 5. UMD（Universal Module Definition）

UMD（Universal Module Definition）是一种通用的模块定义规范，它允许模块在多种环境中运行，包括CommonJS、AMD和全局变量环境。UMD规范的目标是提供一个统一的接口，使得模块可以在不同的环境中使用。

UMD规范的实现通常是一个立即执行的函数表达式（IIFE），它检查当前环境并选择合适的模块定义方式。以下是一个简单的UMD模块示例：

```javascript
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['moduleA', 'moduleB'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory(require('moduleA'), require('moduleB'));
  } else {
    // 全局变量
    root.myModule = factory(root.moduleA, root.moduleB);
  }
}(this, function(moduleA, moduleB) {
  // 使用moduleA和moduleB
}));
```

### 最佳实际 (ES Module+CommonJS)

浏览器端使用：ES Module

Node端使用：CommonJS

<figure><img src="../../.gitbook/assets/截屏2024-09-23 22.49.54.png" alt=""><figcaption></figcaption></figure>

