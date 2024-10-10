# Vite功能特性

官方链接：[https://cn.vite.dev/guide/](https://cn.vite.dev/guide/)

对非常基础的使用来说，使用 Vite 开发和使用一个静态文件服务器并没有太大区别。然而，Vite 还通过原生 ESM 导入提供了许多主要用于打包场景的**增强功能**。

## NPM依赖解析

### 依赖解析

当遇到一个`import`语句时，它会检查这个模块是否是一个NPM依赖。如果是，Vite会使用Node.js的`resolve`模块来解析这个依赖的路径，得到合法URL。

然后重写导入为合法的 URL（浏览器能识别的），例如 `/node_modules/.vite/deps/my-dep.js?v=f3sf2ebd` 以便浏览器能够正确导入它们。

### <mark style="color:red;">预构建（预解析）</mark> <a href="#npm-dependency-resolving-and-pre-bundling" id="npm-dependency-resolving-and-pre-bundling"></a>

[预构建](https://cn.vite.dev/guide/dep-pre-bundling.html) 将所有CommonJS / UMD模块导入格式转化成标准的ESModule模式（ES6标准）。这一步由[esbuild](http://esbuild.github.io/)执行。

预构建的过程会生成一个<mark style="color:red;">虚拟的文件</mark>，这个文件包含了所有依赖的代码，并且已经进行了适当的转换和优化。

### **模块加载**

当Vite需要加载一个NPM依赖时，它会从<mark style="color:red;">预构建的文件</mark>中加载代码，而不是直接从NPM包中加载。这样可以提高加载速度，并且使得Vite可以更好地进行代码优化。

### **缓存**

**详情参考：**[**https://cn.vite.dev/guide/dep-pre-bundling#caching**](https://cn.vite.dev/guide/dep-pre-bundling#caching)

**文件系统缓存**

Vite会缓存预构建好的文件（即依赖文件），以便在后续的构建中重复使用。这样可以进一步提高构建速度，并且使得Vite可以更好地处理大型项目。

**HTTP缓存**

此外，Vite 通过 **HTTP 头来缓存**请求得到的依赖，所以如果你想要编辑或调试一个依赖，请按照 [这里](https://cn.vite.dev/guide/dep-pre-bundling.html#%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98) 的步骤操作。

## 模块下载

<mark style="color:red;">Vite在</mark><mark style="color:red;background-color:purple;">开发模式</mark><mark style="color:red;">下会自动下载和解析NPM依赖</mark>。当你第一次启动Vite开发服务器时，Vite会自动下载你的项目所需的NPM依赖，并将它们解析为ES模块。<mark style="color:red;">这意味着你不需要手动下载NPM包，Vite会为你处理这些事情</mark>。

然而，需要注意的是，Vite在<mark style="color:red;background-color:purple;">构建模式</mark><mark style="color:red;">下并不会自动下载NPM依赖</mark>。在构建模式下，Vite会使用预构建的依赖，这些依赖是在开发模式下下载和缓存的。如果你在构建模式下遇到了依赖问题，你可以尝试重新启动开发服务器，或者手动删除`node_modules`文件夹和`package-lock.json`文件（或`yarn.lock`文件），然后重新安装NPM依赖。

总的来说，Vite在开发模式下会自动下载和解析NPM依赖，你不需要手动下载NPM包。然而，在构建模式下，你需要确保所有的NPM依赖都已经正确下载和解析。

## 热更新

Vite 提供了一套原生 ESM 的 [HMR API](https://cn.vite.dev/guide/api-hmr.html)。 具有 HMR 功能的框架可以利用该 API 提供即时、准确的更新，而无需重新加载页面或清除应用程序状态。Vite 内置了 HMR 到 [Vue 单文件组件（SFC）](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue) 和 [React Fast Refresh](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react) 中。也通过 [@prefresh/vite](https://github.com/JoviDeCroock/prefresh/tree/main/packages/vite) 对 Preact 实现了官方集成。

注意，你不需要手动设置这些 —— 当你通过 [`create-vite`](https://cn.vite.dev/guide/) 创建应用程序时，所选模板已经为你预先配置了这些。

## 构建优化

* #### CSS 代码分割 <a href="#css-code-splitting" id="css-code-splitting"></a>
*   #### 预加载指令生成 <a href="#preload-directives-generation" id="preload-directives-generation"></a>

    Vite 会为入口 chunk 和它们在打包出的 HTML 中的直接引入自动生成 `<link rel="modulepreload">` 指令。
* #### [异步 Chunk 加载优化](https://cn.vite.dev/guide/features#async-chunk-loading-optimization) <a href="#async-chunk-loading-optimization" id="async-chunk-loading-optimization"></a>

&#x20;      利用前面的预加载技术，提前确定模块的依赖关系，所以当某个模块A被加载时，它的依赖模块B会自动也进行加载，而不需要在A解析完后再加载B，这样大大提升了加载速度

## 其他特点

* 天生支持TS
* 优先支持Vue(插件）
* TSX、JSX支持，开箱即用，若使用React需要额外配置
* CSS
  * 导入.css文件会把内容插入到 `<style>` 标签中，同时也带有 HMR 支持。
  * 可配置PostCSS， CSS 最小化压缩将在 PostCSS 之后运行
  * 任何以 `.module.css` 为后缀名的 CSS 文件都被认为是一个 [CSS modules 文件](https://github.com/css-modules/css-modules)。导入这样的文件会返回一个相应的模块对象：
  * #### CSS 预处理器支持，需要时安装特定的依赖即可 <a href="#css-pre-processors" id="css-pre-processors"></a>
  * #### 自动注入 CSS 内容的行为可以通过 `?inline` 参数来关闭。在关闭时，被处理过的 CSS 字符串将会作为该模块的默认导出，但样式并没有被注入到页面中。 <a href="#css-pre-processors" id="css-pre-processors"></a>
  * 从 Vite 4.4 开始，已经实验性地支持 [Lightning CSS](https://lightningcss.dev/)
* 静态资源处理详见[静态资源处理](https://cn.vite.dev/guide/assets.html)。
* Glob 导入，Vite 支持使用特殊的 `import.meta.glob` 函数从文件系统导入多个模块
* 动态导入
* WebAssembly，预编译的 `.wasm` 文件可以通过 `?init` 来导入
* 支持Web Workers导入JS模块
* 内容安全策略（CSP）



## 我的问题

### <mark style="background-color:purple;">vite开发环境下需要构建吗？</mark>

在Vite的开发环境下，你不需要手动构建你的项目。Vite的开发服务器会自动处理你的项目，包括<mark style="color:red;">解析和转换</mark>NPM依赖，处理CSS和JavaScript文件等。

当你启动Vite的开发服务器时，Vite会自动下载你的项目所需的NPM依赖，并将它们解析为ES模块。这意味着你不需要手动下载NPM包，Vite会为你处理这些事情。

此外，Vite的开发服务器还提供了一些额外的功能，如热模块替换（HMR），你可以实时看到代码的更改效果，而不需要重新加载页面。

然而，需要注意的是，<mark style="color:red;">Vite在开发环境下并不会生成最终的构建文件</mark>。如果你需要生成最终的构建文件，你可以使用Vite的构建命令`vite build`。这个命令会生成一个优化的构建版本，你可以将其部署到生产环境中。
