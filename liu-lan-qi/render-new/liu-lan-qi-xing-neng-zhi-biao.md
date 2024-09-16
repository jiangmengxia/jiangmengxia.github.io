# 浏览器性能指标

## &#x20;1. **window.performance**

`window.performance`是一个Web API，它提供了关于浏览器性能的信息。它可以帮助开发者了解网页的性能，并找出性能瓶颈。以下是一些常见的 `window.performance`属性和方法：

* \*\*performance.timing\*\*：这是一个对象，它包含了与页面加载时间相关的信息，如页面开始加载的时间、DNS解析时间、TCP连接时间、请求发送时间、响应接收时间、DOM加载时间、页面完全加载时间等。
* \*\*performance.navigation\*\*：这是一个对象，它包含了与页面导航相关的信息，如页面重定向次数、页面加载类型等。
* \*\*performance.memory\*\*：这是一个对象，它包含了与JavaScript内存使用相关的信息，如JavaScript堆的大小、JavaScript堆的使用量等。
* \*\*performance.getEntries()\*\*：这是一个方法，它返回一个PerformanceEntry对象的数组，包含了与页面加载时间相关的信息，如资源加载时间、网络请求时间等。
* \*\*performance.now()\*\*：这是一个方法，它返回一个高精度的时间戳，用于测量时间间隔。

通过使用 `window.performance`，开发者可以了解网页的性能，并找出性能瓶颈。例如，开发者可以使用 `performance.timing`来测量页面加载时间，使用 `performance.getEntries()`来测量资源加载时间，使用 `performance.now()`来测量时间间隔。通过优化这些指标，可以提高网页的性能和用户体验。

## **2. 网络性能指标**

浏览器网络接口响应的指标是衡量浏览器处理网络请求和响应的能力的重要指标，它们可以帮助开发者了解网页的网络性能，并找出性能瓶颈。以下是一些常见的浏览器网络接口响应的指标：

[https://developer.chrome.com/docs/devtools/network/reference/?utm\_source=devtools#timing-explanation](https://developer.chrome.com/docs/devtools/network/reference/?utm\_source=devtools#timing-explanation)

* 排队时间（Queueing）
* 安装时间（Stalled)：它表示浏览器在发送请求之前等待的时间
* DNS LookUp:域名解析时间
* initial Connect & Connection Start：都表示浏览器开始建立与服务器的连接的时间。两者差异是：
  * initial Connect：这个指标表示浏览器开始建立与服务器的连接的时间，包括DNS解析、TCP连接和TLS握手等步骤。这个指标可以帮助开发者了解网络连接的建立速度，从而优化网页的加载性能。
  * Connection Start：这个指标表示浏览器开始建立与服务器的连接的时间，但不包括DNS解析和TCP连接等步骤。这个指标可以帮助开发者了解网络连接的建立速度，但可能不如 initial Connect 准确。

总的来说，initial Connect 和 Connection Start 都是衡量网络连接建立速度的重要指标，但 initial Connect 的范围更广，可能更准确。在优化网页的加载性能时，开发者可以根据需要选择使用这两个指标。

* Proxy negotiation 表示浏览器与代理服务器进行协商的时间
* 请求发送时间（request sent)
* 等待服务端响应时间（waiting for server）
* 响应内容下载时间（Time Content Downloaded)

<figure><img src="../../.gitbook/assets/image (13) (1).png" alt=""><figcaption></figcaption></figure>

## 3. **RAIL衡量模型**

RAIL, 是 Response, Animation, Idle, 和 Load 的首字母缩写，RAIL模型是一种以用户为中心的性能模型，RAIL代表Web应用生命周期的四个不同方面：响应、动画、空闲和加载。

该模型分为以下几类指标：

### 3.1 **响应性能指标**

浏览器响应性能指标是衡量浏览器响应用户输入的能力的重要指标，它们可以帮助开发者了解网页的响应性能，并找出性能瓶颈。以下是一些常见的浏览器响应性能指标：

* 首次输入延迟时间（First Input Delay，FID）：首次输入延迟时间是用户首次与页面交互（如点击按钮）到浏览器响应该交互的时间。首次输入延迟时间越短，用户体验越好。
* &#x20;最大输入延迟时间（Max Input Delay，MID）：最大输入延迟时间是所有用户输入的延迟时间的最大值。最大输入延迟时间越短，用户体验越好。
* 用户可交互时间（Time To Interactive，TTI）：用户可交互时间是浏览器从开始加载到页面完全可交互的时间。用户可交互时间越短，用户体验越好。
* 首次内容绘制时间（First Contentful Paint，FCP）：首次内容绘制时间是浏览器从开始加载到第一个内容元素渲染完成的时间。首次内容绘制时间越短，用户体验越好。
* 首次有效绘制时间（First Meaningful Paint，FMP）：首次有效绘制时间是浏览器从开始加载到主要内容元素渲染完成的时间。首次有效绘制时间越短，用户体验越好。
* 最大内容绘制时间（Largest Contentful Paint，LCP）：最大内容绘制时间是浏览器从开始加载到最大内容元素渲染完成的时间。最大内容绘制时间越短，用户体验越好。
* 累积布局偏移（Cumulative Layout Shift，CLS）：累积布局偏移是测量页面在加载过程中布局变化的程度。累积布局偏移越低，用户体验越好。

### 3.2 **动画性能**

浏览器动画性能指标是衡量浏览器动画性能的重要指标，它们可以帮助开发者了解动画的性能，并找出性能瓶颈。以下是一些常见的浏览器动画性能指标：

* 帧率（Frames Per Second，FPS）：帧率是指动画每秒渲染的帧数。帧率越高，动画越流畅。一般来说，60FPS是流畅动画的目标。
* 渲染时间（Rendering Time）：渲染时间是指浏览器渲染一帧动画所需的时间。渲染时间越短，动画越流畅。
* 重绘次数（Repaints）：重绘是指浏览器重新绘制网页元素的过程。重绘次数越多，性能开销越大。
* 回流次数（Reflows）：回流是指浏览器重新计算网页元素的位置和大小的过程。回流次数越多，性能开销越大。
* JavaScript执行时间（JavaScript Execution Time）：JavaScript执行时间是指执行JavaScript代码所需的时间。JavaScript执行时间越短，动画越流畅。
* 网络延迟（Network Latency）：网络延迟是指浏览器从服务器获取资源所需的时间。网络延迟越大，动画越卡顿。
* &#x20;CPU使用率（CPU Usage）：CPU使用率是指CPU处理动画所需的时间。CPU使用率越高，动画越卡顿。

### 3.3 **空闲性能指标**

浏览器空闲性能指标是衡量浏览器在空闲时间执行后台任务的能力的重要指标，它们可以帮助开发者了解网页的空闲性能，并找出性能瓶颈。以下是一些常见的浏览器空闲性能指标：

* 空闲时间（Idle Time）：空闲时间是浏览器处于空闲状态的时间。空闲时间越长，浏览器可以执行更多的后台任务。
* 后台任务执行时间（Background Task Execution Time）：后台任务执行时间是浏览器执行后台任务所需的时间。后台任务执行时间越短，用户体验越好。
* 后台任务队列长度（Background Task Queue Length）：后台任务队列长度是浏览器后台任务队列的长度。后台任务队列长度越短，浏览器可以更快地执行后台任务。
* 后台任务执行频率（Background Task Execution Frequency）：后台任务执行频率是浏览器执行后台任务的频率。后台任务执行频率越高，浏览器可以更快地执行后台任务。
* 后台任务执行延迟（Background Task Execution Delay）：后台任务执行延迟是浏览器执行后台任务的时间间隔。后台任务执行延迟越短，浏览器可以更快地执行后台任务。

### 3.4 **加载性能指标**

浏览器加载性能指标是衡量浏览器加载网页的能力的重要指标，它们可以帮助开发者了解网页的加载性能，并找出性能瓶颈。以下是一些常见的浏览器加载性能指标：

* \*\*加载时间（Load Time）\*\*：加载时间是指从用户输入URL到网页完全加载完成的时间。加载时间越短，用户体验越好。
* \*\*首字节时间（Time To First Byte，TTFB）\*\*：首字节时间是浏览器从发送请求到接收到服务器返回的第一个字节的时间。首字节时间越短，服务器响应速度越快。
* &#x20;\*\*渲染时间（Render Time）\*\*：渲染时间是指从网页开始加载到所有内容都渲染完成的时间。渲染时间越短，用户体验越好。
* &#x20;\*\*首屏时间（First Paint Time）\*\*：首屏时间是浏览器从开始加载到首屏内容渲染完成的时间。首屏时间越短，用户体验越好。
* \*\*可交互时间（Time To Interactive，TTI）\*\*：可交互时间是浏览器从开始加载到页面完全可交互的时间。可交互时间越短，用户体验越好。
* \*\*最大内容绘制时间（Largest Contentful Paint，LCP）\*\*：最大内容绘制时间是浏览器从开始加载到最大内容元素渲染完成的时间。最大内容绘制时间越短，用户体验越好。
* &#x20;\*\*首次内容绘制时间（First Contentful Paint，FCP）\*\*：首次内容绘制时间是浏览器从开始加载到第一个内容元素渲染完成的时间。首次内容绘制时间越短，用户体验越好。
* &#x20;\*\*首次有效绘制时间（First Meaningful Paint，FMP）\*\*：首次有效绘制时间是浏览器从开始加载到主要内容元素渲染完成的时间。首次有效绘制时间越短，用户体验越好。
* \*\*首次输入延迟时间（First Input Delay，FID）\*\*：首次输入延迟时间是用户首次与页面交互（如点击按钮）到浏览器响应该交互的时间。首次输入延迟时间越短，用户体验越好。
* \*\*累积布局偏移（Cumulative Layout Shift，CLS）\*\*：累积布局偏移是测量页面在加载过程中布局变化的程度。累积布局偏移越低，用户体验越好。
