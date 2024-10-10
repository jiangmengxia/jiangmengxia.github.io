# Vite

## Vite的基本原理‌

Vite利用‌[ES modules](https://www.baidu.com/s?wd=ES%20modules\&rsv\_idx=2\&tn=baiduhome\_pg\&usm=2\&ie=utf-8\&rsv\_pq=8e5801df0041272f\&oq=vite%E5%8E%9F%E7%90%86\&rsv\_t=c1abL7pa28bs0JA2zOWToXjPJElqmgtKcj5ebmuE8IKRxTzSdANWHEvMiQS84%2FnBDUiN\&sa=re\_dqa\_generate)和浏览器原生的import/export功能，通过轻量级的服务器实现快速的模块热更新。在**开发模式**下，Vite启动一个基于原生ES模块的服务器，提供模块热更新（HMR）等功能。在**生产模式**下，Vite使用‌[Rollup](https://www.baidu.com/s?wd=Rollup\&rsv\_idx=2\&tn=baiduhome\_pg\&usm=2\&ie=utf-8\&rsv\_pq=8e5801df0041272f\&oq=vite%E5%8E%9F%E7%90%86\&rsv\_t=ab6fhD3AA1Ul1f3zGZUJ1G4vW6ZZbE2XvE%2BGrzx7iJrjHJIDODFxjhRjunVkgFy9noY3\&sa=re\_dqa\_generate)进行代码分割和优化，生成最终的静态资源文件。

#### Vite的开发模式

1. ‌**启动开发服务器**‌：Vite启动一个基于原生ES模块的服务器，提供丰富的内建功能，如模块热更新（HMR）。
2. ‌**按需加载**‌：当浏览器遇到import语句时，Vite会发送HTTP请求获取模块内容，实现按需加载。
3. ‌**模块热更新**‌：通过WebSocket连接，当代码修改时，服务端发送消息通知客户端重新加载修改的模块，实现热更新。

#### Vite的构建模式

<mark style="color:red;">Vite 的构建模式并不是简单的“生产模式”</mark>。Vite 提供了两种主要的**构建模式**：开发模式和生产模式。

1. ‌**代码预构建**‌：使用esbuild对源代码进行轻量级转换和优化，减少构建时间。
2. ‌**代码分割和优化**‌：使用Rollup进行代码分割和优化，生成高度优化的静态资源文件。

#### Vite的优势和特点

* ‌**快速启动**‌：利用原生ES模块，显著提升开发体验。
* ‌**按需编译**‌：按需加载模块，减少初始化时间。
* ‌**模块热更新**‌：实现快速的热更新，提高开发效率。
* ‌**高度可扩展**‌：提供插件API和‌[JavaScript API](https://www.baidu.com/s?wd=JavaScript%20API\&rsv\_idx=2\&tn=baiduhome\_pg\&usm=2\&ie=utf-8\&rsv\_pq=8e5801df0041272f\&oq=vite%E5%8E%9F%E7%90%86\&rsv\_t=3877TC38F6nIEU%2FRvrU428Cn10rKA2NWU4cNMhnyVZPWBDsIM24JzPk4dTebek0LQ97Z\&sa=re\_dqa\_generate)，支持高度自定义。

## 我的疑惑

### vite 代码预构建是不是仅适用于开发环境之下

Vite 的代码预构建（pre-bundling）确实主要在开发模式下进行，但并不是说在生产模式下不会进行预构建。实际上，Vite 的预构建机制在开发模式和生成模式下都会使用。

在开发模式下，Vite 会启动一个开发服务器，并且会进行以下步骤：

1. **预构建依赖**：Vite 会扫描你的项目中的依赖，并使用 esbuild 对这些依赖进行预构建。预构建的过程会将依赖打包成一个或多个文件，这些文件会被缓存，以便在后续的请求中快速加载。
2. **热模块替换（HMR）**：Vite 利用 esbuild 的快速构建能力，实现了热模块替换（HMR）。当你的代码发生变化时，Vite 会快速重新构建和替换变更的模块，而不需要重新加载整个页面。
3. **实时更新**：Vite 的开发服务器会监听文件系统的变化，并在文件发生变化时自动重新构建和更新页面。

<mark style="color:red;">在生产模式下，Vite 也会进行预构建，但主要目的是为了优化构建速度和减小打包体积</mark>。在生产模式下，Vite 会使用 Rollup 进行打包，并且会进行更多的优化，比如代码压缩、Tree Shaking 等。

因此，Vite 的预构建机制在开发模式和生成模式下都会使用，但它们的目的和优化策略有所不同。

### vite在开发环境下会用到rollup吗

在 Vite 的开发模式下，主要使用的是 esbuild 进行依赖预构建和模块热替换（HMR）。然而，当你在开发模式下启动 Vite 时，Vite 仍然会使用 Rollup 进行一些额外的处理。

具体来说，当 Vite 开发服务器启动时，它会进行以下步骤：

1. **预构建依赖**：Vite 会使用 esbuild 对你的项目中的依赖进行预构建。预构建的过程会将依赖打包成一个或多个文件，这些文件会被缓存，以便在后续的请求中快速加载。
2. **启动开发服务器**：Vite 会启动一个开发服务器，监听文件系统的变化。
3. **处理请求**：当浏览器请求模块时，Vite 会使用 Rollup 进行模块的打包和转换。Rollup 会根据模块的依赖关系，将模块打包成一个或多个文件，并返回给浏览器。

因此，虽然 Vite 在开发模式下主要使用 esbuild 进行依赖预构建和模块热替换，但在处理浏览器请求时，Vite 仍然会使用 Rollup 进行模块的打包和转换。
