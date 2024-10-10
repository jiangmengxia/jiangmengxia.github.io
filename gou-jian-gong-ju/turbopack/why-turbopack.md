---
description: 关键词：构建、Turbo 引擎、热更新、懒构建、缓存
---

# Why Turbopack

## 初识

Turbopack 是专为 JavaScript 和 TypeScript 打造的，使用 Rust 开发的构建工具。由 Webpack 和 [Next.js](https://nextjs.org/) 开发者们在 [Vercel](https://vercel.com/) 共同打造。

对于拥有组件数 30,000 左右的应用，Turbopack 相较于 Vite 提速可达 <mark style="color:red;">10</mark> 倍，而 Webpack 可达到 <mark style="color:red;">700</mark> 倍。对于**体量最大的应用**，其差异更为明显，构建速度相较于 Vite 可达 <mark style="color:red;">20</mark> 倍。对于组件数超过 50,000 的应用，其差异甚至更加明显，更新速度比 Vite 快 20 倍。

Turbopack 性能提升的秘诀由两个部分组成，一方面<mark style="color:red;">机器码进行了高度优化</mark>，另一方面是打造了<mark style="color:red;">一个低层级递增式计算引擎</mark>，这个引擎可以<mark style="color:red;">缓存至函数的层级</mark>。只要 Turbopack 执行了<mark style="color:red;">一次构建任务</mark>，就不会再重复构建。

我们的团队吸取了 Webpack 十年来的教训，结合 Turborepo 和 Google's Bazel 创新性的递增式计算，为未来几十年准备了一个计算架构。

***

以下描述是为什么重新构建一个Turbopack，而新的构建工具为啥不采用Vite的预编译、不限制原生ESM、不直接使用ESBuild，还说明了为什么创建Turbo 引擎。

***

## <mark style="color:red;">构建代码</mark> vs 原生ESM

Vite 这类框架依赖于浏览器原生支持的 ES Module 特性，可以让应用代码在开发环境中无需进行构建。这个做法可以响应式地大幅提升更新的性能，因为每次只需要转化一个文件。

可对于由许多模块组成的大型应用，Vite 可能会遇到拓展上的问题。浏览器泛滥的网络请求会导致应用启动速度相对较慢（参考[vite性能瓶颈](../vite/xing-neng-ping-jing.md)）。对于浏览器环境，即便代码在一台本地服务器上，网络请求数越少越能提升应用的请求速度。

这就是为什么我们选择像 Webpack 一样，让 Turbopack 将代码构建到开发服务器。尤其对于大型应用来说，Turbopack 的构建速度可以变得更快，因为它是用 Rust 进行开发的，并且会跳过一些只适用于生产构建进行的优化操作。

## 递增式计算（Turbo 引擎）

有两种方式可以加快进程：一种是减少工作量，另一种是并行工作。我们知道如果想打造最快的构建工具，就需要双管齐下。

我们打造了一个可复用 Turbo 引擎，用于实现<mark style="color:red;">分布式（多个大脑）</mark>与<mark style="color:red;">增量式（并行&并发）</mark>功能。Turbo 引擎类似于一个函数调度器，它会并排将函数调用调度到所有可用的内核。另外 Turbo 引擎还将缓存所调度的函数调用结果，也就是说不会重复做同一件事。简单来说，它能**以最快的速度完成最小的工作**。

## why not Vite 和 ESBuild

其它工具对于 `减少工作量` 有不同的做法。比如 Vite 在开发环境下，使用原生 ESM 尽可能降低工作量。我们不采取这种方式的原因都列在上面了。

Vite 在底层使用 ESBuild 执行太多工作了。ESbuild 是一个超快的构建工具，可并不强制你用原生 ESM。但我们决定不采用 ESBuild 的原因如下：

<mark style="color:red;">ESBuild 其超级优化的代码只为一件事 —— 构建代码</mark>。它<mark style="color:red;">没有 HMR（热更新）</mark>，我们可不希望在开发服务器失去这么个功能。

ESBuild 诚然是一个超快的构建工具，可是它<mark style="color:red;">没有什么缓存可言</mark>。这就意味着你 _每次_ 都要重复相同的工作，哪怕有原生速度的加持。

Evan Wallace 提到 ESBuild 是[下一代构建工具的试金石](https://news.ycombinator.com/item?id=22336334)，我们认同他的观点。但我们相信一个由 Rust 驱动、支持递增式计算构建工具，可以比 ESBuild 在性能上有更大的提升。

## 懒构建

早期版本的 Next.js 在开发模式中，尝试构建_整个_ Web 应用，但我们很快意识到这种 `急切` 的做法并不理想。现代版本的 Node.js 只有在开发服务器请求的时候，才会对页面进行构建。举个例子，当你访问 `localhost:3000` 时，只有 `pages/index.jsx` 这个页面及其依赖模块会被构建。

这种 `懒构建` 的做法（有且仅有在被引用时才会构建）是实现一个高性能开发服务器的关键。原生 ESM 在处理这方面的工作没什么亮点，当请求一个模块，ESM 还会再去请求其它依赖模块。不管怎样，我们想要开发一个构建工具来解决以上痛点。

<mark style="color:red;">ESBuild 没有一个</mark> <mark style="color:red;"></mark><mark style="color:red;">`懒构建`</mark> <mark style="color:red;"></mark><mark style="color:red;">的概念</mark>，除非你指定某些构建的入口文件，否则只能一次性全部构建。

Turbopack 在开发模式中，将创建一个<mark style="color:red;">模块依赖关系图</mark>，用于描述你的应用所引入和导出的模块，这些模块只有在被请求时，才会被加入到关系图内，而且只会构建需要用到的代码。你可以在 [核心概念](https://turbo.hector.im/repo/docs/core-concepts/caching) 章节了解更多相关内容。

这个策略令 Turbopack 在初次启动开发服务器时极其迅猛。我们计算出页面渲染所需的代码，然后将其装进一个 Chunk 并传给浏览器。对于大型应用，这个方法可比原生 ESM 要快得多。



### 总结

我们想要：

* 打造一个在大型应用上，比原生 ESM 要快的构建工具。
* 采用递增式计算方法。Turbo 引擎将其带进了 Turbopack 的核心架构，利用最快的速度完成最小的工作。
* 优化开发服务器启动时间。为此，我们创建了一个<mark style="color:red;">「懒」模块依赖关系视图</mark>，只计算出被请求到的模块代码。

这就是为什么我们选择打造 Turbopack。



参考：

[https://turbo.hector.im/pack/docs](https://turbo.hector.im/pack/docs)
