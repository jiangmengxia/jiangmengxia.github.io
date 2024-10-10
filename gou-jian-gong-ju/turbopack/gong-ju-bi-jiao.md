# 工具比较

## Turbopack vs Vite

{% embed url="https://turbo.hector.im/pack/docs/comparisons/turbopack-vs-vite" %}

### 开发服务器启动时间

<mark style="color:red;">Vite(开发环境） 是无需进行代码构建的</mark>，它直接将模块发送给浏览器，也就是说**浏览器要处理大量模块依赖**。

Turbopack 会构建你的应用代码，意味着在将代码发送至浏览器前需要处理大量任务。

不过 Turbopack 处理模块依赖要比浏览器快多了。通过预构建，我们可以比 Vite 使用的原生 ESM 节省更多时间。你可以访问 [Why Turbopack](https://turbo.hector.im/pack/docs/why-turbopack#bundling-vs-native-esm) 章节了解更多详情。

对于有 1,000 个模块的应用，Vite 需要 4.8s 启动，而 Turbopack 仅需 1.1s —— 快出 4.2x。

随着模块数越多，Turbopack相比于vite的优势就越明显。

### 文件更新 (HMR)

Vite 丝滑的开发体验得益于它的快速刷新能力。当你更新一个文件时，Vite 使用原生ESM系统向浏览器发送一个更新的模块，并通过一些方式将其整合到现有的模块依赖图。

而在 Turbopack 上，我们发现我们并不需要一开始就构建所有的代码。我们更新代码的方式和 Vite 相似，

vite通过Websoket发送更新模块，但是当

但是效率会更高一点：<mark style="color:red;">Turbopack 通过 WebSocket 发送更新的模块，并且不需要进行任何构建</mark>。

对于有 1,000 个模块应用，Turbopack 的文件更新可达到 **5.7x 快于 Vite** 。

随着模块数越多，Turbopack相比于vite的优势就越明显。

## Turbopack vs Webpack

{% embed url="https://turbo.hector.im/pack/docs/comparisons/turbopack-vs-webpack" %}
