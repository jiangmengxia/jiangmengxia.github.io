# ES Module

ESModule是2014年被提出的。

市面上大部分浏览器都支持ESModule了， 我们只需给script标签加上一个type=module属性，如下：

```markup
<script type='module' src='...'></script>
<script type='module'>
    ...
</script>
```



## 1. 4个特性

* ESModule**自动采用严格模式**，而不需要额外去写‘use strict’
  * 非严格模式下，this指向全局对象。而严格模式下， this =undefined
* 每个ESModule都是运行在单独的**私有作用域**当中，不用担心在全局范围内使用的变量，造成全局污染

```html
<script type='module'>
    let foo = 2
    console.log(foo) // 2
</script>
<script type='module'>
     console.log(foo) // undefined
</script>
```

* ESModule是通过**CORS的方式去请求外部 JS 模块**的，也就是说跨域的请求，ESModule会直接拦截掉，除非服务端去配置支持跨域地址
* ESModule的script标签会**自动延迟执行脚本**，等同于script标签的defer属性。

## 2. 导入导出

* 单独导出

<pre class="language-javascript" data-title="user.js"><code class="lang-javascript">export const createUser = ()=>{
    ...
}

<strong>export class User{
</strong>    ...
}
</code></pre>

* 集中导出，便于重命名

{% code title="user.js" %}
```javascript

const createUser = ()=>{
    ...
}

class User{
    ...
}
// 集中导出方式1：合并导出
export {createUser,User}

// 集中导出方式2：重命名导出
export {
    createUser as default, // 这种会变成当前文件的默认导出成员,这时候引入必须用 default as
    User as TheUser
}

// 集中导出方式3：默认导出方式，即 export {createUser as default} 等同于
export default createUser
```
{% endcode %}

```javascript
// 集中导出方式1 合并导出 - 对应引入
import  { User, createUser } from 'user.js'
// 集中导出方式2 重命名导出 - 对应导入
import { default as createUser , TheUser } from 'user.js'
// 集中导出方式3：默认导出方式 - 对应导入
import createUser from 'user.js'

```

### 导出注意事项

* `export default {name, user}` , 导出的是一个对象{name,user}

&#x20;      而 `export {name,user}` 不是，它只是esModule的语法的一种形式，是一个固定用法，需要区别开来。

* export导出某个变量，如上面的name，实际上导出的是这个值的引用。并且到处的变量是只读的，我们并不能直接去修改它，否则会报错。

&#x20;       如下图中，引入处修改name为tome，运行时报错“TypeError”

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2FjxYCqWdlbs1byBNr5GMt%2F%E6%88%AA%E5%B1%8F2024-09-28%2013.48.06.png?alt=media&#x26;token=833a6f74-2d59-4773-8f28-a9584a205a7f" alt=""><figcaption></figcaption></figure>

### 导入注意事项

* 导入的文件路径名称必须完整，不能省略.js或index.js，当然dev开发环境，有的打包工具会帮我们做掉
* 导入的文件路径的./也不能省略，当省略时esModule会认为是在加载第三方模块。
* 导入文件路径可以用/从根目录开始索引
* `import {} from './xxx'` 或者 ~~import './xxx'~~ 当引入模块为空时，它只会执行该模块，而不会导入成员
* `import  * as  API` ， 当导入模块成员太多，可以用这种方法
* 动态加载函数

```javascript
import ('./xxx').then(module=>{
    // 可以拿到模块的成员变量
})
```

* `import {name, default as title}  from './xxx'`也可以写成 `import title , {name} from './xxx'`
* <mark style="color:red;">`export  {name, default as title }`</mark>` ``from ''./xxx"` 直接将导入的成员导出，当前作用域无法访问这些成员。这种一般在index文件的时候会用到，为了统一导出。



## 3. pollyfill兼容方案

了解了 ES Modules 当中的这些特性和语法过后，在回过头来去看下如何去解决运行环境的兼容性问题。正如前面所提到的 ES Modules 是 2014年才被提出来的，这也就意味着早期的浏览器不可能支持这个特性。另外在 IE 和一些国产的浏览器上截止到目前为止都还没有支持，所以说我们在使用 ES Modules 的时候还是需要去考虑兼容性的问题。一般我们借助于<mark style="color:red;">编译工具</mark>，编译成低版本的代码，然后再到浏览器中执行。

Polyfill 可以帮助我们解决一些兼容问题，它可以让我们在浏览器当中直接去支持 ES Modules 当中绝大多数的特性。这个模块的名称叫做  <mark style="color:orange;">**browser-ES-Module-loader**</mark>，这个模块实际上就是一个 JS 文件，我们只需要将这个文件引入到网页当中就可以让这个网页去运行 ES Modules 了。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>ES Module 浏览器环境 Polyfill</title>
</head>
<body>
  <script nomodule src="https://unpkg.com/promise-polyfill@8.1.3/dist/polyfill.min.js"></script>
  <script nomodule src="https://unpkg.com/browser-es-module-loader@0.4.1/dist/babel-browser-build.js"></script>
  <script nomodule src="https://unpkg.com/browser-es-module-loader@0.4.1/dist/browser-es-module-loader.js"></script>
  <script type="module">
    import { foo } from './module.js'
    console.log(foo)
  </script>
</body>
</html>

```

script标签的新属性<mark style="color:red;">nomudule</mark>，是一个布尔属性，用于在HTML中指定哪些浏览器应该忽略一个特定的脚本。这个属性通常与`<script>`标签一起使用，用于提供回退方案，<mark style="color:red;">**以便在不支持ES模块的浏览器中加载旧版本的JavaScript代码**</mark>。

### ES Module Loader 原理

浏览器中的ES Module Loader（ESM Loader）是用于加载和执行ECMAScript模块的一种机制。ESM Loader的主要职责是解析模块的导入和导出，并确保模块的依赖关系能够正确解析和加载。以下是ESM Loader的基本原理：

1. **解析模块**：ESM Loader首先需要解析模块的导入和导出语句。在ESM中，导入语句使用`import`关键字，导出语句使用`export`关键字。解析器会读取模块的源代码，识别出所有的导入和导出语句，并记录它们之间的关系。
2. **构建依赖图**：解析器会构建一个模块依赖图，该图记录了每个模块及其依赖的其他模块。这个依赖图是递归的，因为一个模块可能依赖于其他模块，而这些模块又可能依赖于其他模块。
3. **加载模块**：ESM Loader会按照依赖图的顺序加载模块。首先加载根模块（即直接被应用程序导入的模块），然后加载其依赖的模块，依此类推。加载模块时，ESM Loader会执行以下步骤：
   * **下载模块**：ESM Loader会从网络或本地文件系统下载模块的源代码。
   * **解析模块**：ESM Loader会解析模块的源代码，识别出所有的导入和导出语句。
   * **执行模块**：ESM Loader会执行模块的代码，并将执行结果存储起来，以便其他模块可以访问。
4. **模块缓存**：为了提高性能，ESM Loader会缓存已经加载的模块。这意味着如果一个模块已经被加载过，那么在后续的导入中，ESM Loader会直接从缓存中获取模块的导出，而不是重新加载和执行模块的代码。
5. **模块导出和导入**：ESM Loader会处理模块的导出和导入语句。当一个模块被导入时，ESM Loader会返回模块的导出对象。当一个模块导出时，ESM Loader会将导出的变量或函数存储起来，以便其他模块可以访问。
6. **动态导入**：ESM Loader还支持动态导入，即可以在运行时根据条件导入模块。动态导入使用`import()`函数，该函数返回一个Promise对象，该对象在模块加载完成后解析为模块的导出对象。

总之，ESM Loader是浏览器中用于加载和执行ECMAScript模块的一种机制。它通过解析模块的导入和导出语句，构建模块依赖图，并按照依赖图的顺序加载模块，从而确保模块的依赖关系能够正确解析和加载。



## 4. importMap (草案)

我们在使用 Webpack 等打包器的时候，项目依赖的模块是安装在 node\_modules 目录下的。在打包器执行构建的时候，会从 node\_modules 中查询依赖的包，找到对应的模块，最终将模块代码合并到最终的构建输出文件中。

在浏览器中，其实是一样的，只不过我们要告诉浏览器去哪里找这些包。目前有一个规范（草案阶段）给出了解决方案，那就是 [`import-map`open in new window](https://wicg.github.io/import-maps/)。我们简单说明一下。

```markup
<script type="importmap">
{
  "imports": {
    "moment": "/node_modules/moment/src/moment.js",
    "lodash": "/node_modules/lodash-es/lodash.js",
  }
}
</script>
```

通过 `type=importmap` 的 script 标签，来告诉浏览器可以在哪里找到这些模块。

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2FL10p35u9X1HBn5sSLrtX%2Fimage.png?alt=media&#x26;token=1832c216-46fc-410b-9425-764533193edc" alt=""><figcaption></figcaption></figure>

从 [caniuseopen in new window](https://caniuse.com/?search=import-map) 上看，目前主流浏览器对 `import-map` 的支持不一，因此，我们还不能在浏览器中直接使用。

现在常规的做法还是经一道打包器的处理，将依赖的模块都打到最终的构建输出中（代码依然是 ES Module）。

## 5. ES Module in Node

在[深入理解 ES Module](https://everfind.github.io/posts/deep-dive-into-es-module.html)中可以熟悉下ES Module 的工作原理。

ES Module正在逐渐成为JavaScript模块的标准，并且Node.js也在逐渐支持ES Module。在未来的Node.js版本中，ES Module可能会成为默认的模块系统。

关于ES Module版本支持

* Node.js 12及更高版本：ES模块默认启用，你不需要使用`--experimental-modules`或者`--input-type=module`选项。
* Node.js 11：需要使用`--`<mark style="color:red;">`experimental-modules`</mark>选项来启用ES模块。
* Node.js 10及更低版本：不支持ES模块，你需要使用CommonJS模块系统。

### Node <mark style="color:red;">ES Module 三种方式</mark>

* 以 `.mjs` 后缀结尾的文件，然后在执行入口文件时候，使用node命令。对于node11版本的，需要使用`--`<mark style="color:red;">`experimental-modules`</mark>来启用。如下：

```javascript
// 试验版本，会给出一个警告： the ESM Module loader is experimental，希望不要在生产环境中使用
node experimental-modules index.mjs 
```

* 以 `.js` 后缀结尾的文件，但是所在包 `package.json` 中设置了 `type` 字段并且值为 `module，这样可以`将**整个项目转换为ES**模块，你就可以使用`.js`后缀来标识ES模块文件，而不需要使用`.mjs`后缀。
* 命令行中指定了 `--input-type=module` 参数

除了命令行以外，NodeJS 在处理 ES Module 的时候，都与 `package.json` 中的字段有关，这里详细说明下。

`package.json` 中与模块处理的字段主要有如下几个。

* `name` 包的名称，可以与 `imports` 和 `exports` 配合使用
* `main` 包的默认导出模块
* `type` 用于在加载 `.js` 文件时确定模块类型
* `exports` 指定包导出了哪些模块
* `imports` 包导入了哪些模块，只供包内部使用

`main` 字段指定包的默认导出模块，在所有 NodeJS 版本中都适用。同时，`exports` 字段也可以定义包的入口点，而且除了 `exports` 定义的入口点以外，包内的其他模块将对外不可见，即 `exports` 同时还提供了一定的封装特性。

当 `main` 和 `exports` 同时定义的时候，`exports` 的优先级比 `main` 更高，即 NodeJS 会忽略 `main` 中的定义。

## 6. Node ESModule\&CommonJS交互 <a href="#exports" id="exports"></a>

&#x20;在Node.js中，ES Module和CommonJS是两种不同的模块系统，它们可以相互交互。以下是一些基本的交互方式：

1. **CommonJS导入ES Module**：在CommonJS模块中，你可以使用`import()`函数来动态导入一个ES Module。

{% code title="commonjs.js" %}
```javascript
export default foo = 'commonjs export value'
```
{% endcode %}

{% code title="es-module.js" %}
```javascript
const module = import './esModule.mjs';
console.log(module.foo) // commonjs export value

import {foo}  from './esModule.mjs' 
// 低node版本则会报错 the request module does not provide an export named foo
```
{% endcode %}

以上ES Module模块中引用<mark style="color:red;">默认导出</mark>形式的CommonJS模块，是完全没问题。但是改成`import {foo}  from './esModule.mjs'` 形式的导出，则会报错，高node版本则不会有这个问题。

2. **ES Module导入CommonJS**：在ES Module中，你可以直接导入一个CommonJS模块，Node.js会自动将CommonJS模块转换为ES Module。

```javascript
// esModule.mjs
import commonModule from './commonModule.js';

commonModule.hello(); // 输出: Hello, world!
```

在这个示例中，`esModule.mjs`是一个ES Module，它直接导入一个CommonJS模块。

需要注意的是，虽然ES Module和CommonJS可以相互交互，但在某些情况下，你可能需要使用一些适配器库来处理兼容性问题。例如，如果你想要在ES Module中使用一些使用CommonJS编写的第三方库，你可能需要使用`esm`或`babel`等工具来转换这些库。

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2FbCtTw19AUiSobgV61n0Y%2F%E6%88%AA%E5%B1%8F2024-09-28%2018.41.44.png?alt=media&#x26;token=558216fd-bd55-4d56-a567-33083759bb13" alt=""><figcaption></figcaption></figure>

\


(注意：不同node版本会有差异）



## 7. Babel in NodeJs(低版本）

早期NodeJS版本，可以使用Babel去实现将ES Module的兼容。Babel是目前最主流的一款JS**编译器**。它可以将一些使用了新特性的代码编译成当前支持的代码。

{% embed url="https://www.bilibili.com/video/BV1kP41177wp?p=15&spm_id_from=pageDriver&vd_source=36cd504ec13dd4e9f53ea20a7fadae5f" %}

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2F47lIvx1MrJIMiaty5VeA%2F%E6%88%AA%E5%B1%8F2024-09-30%2019.42.44.png?alt=media&#x26;token=2bf7411b-5270-4292-99c7-5018f63d3cc5" alt=""><figcaption></figcaption></figure>

它是通过一个插件去实现转化一个新特性转化的。

我们熟知的preset-env就是一些插件集合，在这个插件集合中包含了所有JS的新特性。

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2FiLlJyq7GQPpiynr2lnuk%2F%E6%88%AA%E5%B1%8F2024-09-30%2020.38.04.png?alt=media&#x26;token=942e7a95-56d8-4795-9094-9439168f4e10" alt=""><figcaption></figcaption></figure>

使用方式，使用以下代码可以将低版本的JS转化成高版本的JS，当然除了`@babel/preset-env`，也可以选择其他插件。

```
yarn babel-node index.js --presets = @babel/preset-env
```

如果你不想通过命令行指定babel的话，可以采用.babric来指定babel配置。





参考：   [https://www.bilibili.com/video/BV1kP41177wp?p=16\&vd\_source=36cd504ec13dd4e9f53ea20a7fadae5f](https://www.bilibili.com/video/BV1kP41177wp?p=16\&vd\_source=36cd504ec13dd4e9f53ea20a7fadae5f)
