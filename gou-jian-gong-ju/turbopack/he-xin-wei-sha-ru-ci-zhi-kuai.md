# 核心—为啥如此之快

## Turbo 引擎

Turbopack 之所以这么快是因为它建立在一个可复用的 <mark style="color:red;">Rust Library</mark> 之上，也就是所谓的 Turbo 引擎，使其支持<mark style="color:red;">递增式计算</mark>。它的运作方式：

### 函数级缓存

**函数级缓存**（Function-level Caching）是一种优化技术，它通过<mark style="color:red;">缓存函数的执行结果来提高程序的性能</mark>。当函数被调用时，如果函数的参数没有改变，那么函数的结果可以直接从缓存中获取，而不需要再次执行函数。这样可以避免重复计算，提高程序的效率。参考[函数式缓存具体案例](../../qian-duan-ji-chu/javascript/index.md#han-shu-shi-huan-cun)

在由 **Turbo 驱动**的程序里，你可以给特定某些函数打上<mark style="color:red;">「记忆」</mark>标签。当这些函数被调用时，Turbo 引擎将记住它们**调用方式及其返回值**。这些状态都将缓存到内存里。

下面是一个工具构建流程经简化的例子

<figure><img src="../../.gitbook/assets/image (59).png" alt=""><figcaption></figcaption></figure>

初次构建，api.ts -> apiContents

&#x20;                                                               \->  concat（api,sdk） ->  fullBundle

&#x20;                  sdk.ts -> sdkContents

每个函数调用后的入参、结果都会被缓存在对应的Memorized函数中。

<figure><img src="../../.gitbook/assets/image (60).png" alt=""><figcaption></figcaption></figure>

如上图，当且仅当sdl.ts函数发生改变，而api.ts未发生变更。

只需重新构建以sdk.ts为起点的函数及后续依赖它的函数：sdk.ts -> sdkContents  ->  concat（api,sdk） ->  fullBundle。如果sdk.ts结果不变，则后续依赖它的函数则无需重新构建。

假设一个构建工具有成千上万的文件需要读取和转化，这里心智模型是一样的。你可以像上面一样，通过缓存函数避免重复操作，来节省大量的工作和时间。

### 缓存

<mark style="color:red;">Turbo 引擎目前将缓存放在内存里</mark>。这就意味着缓存伴随着整个进程的生命周期，这在开发服务器中是很有用的。当你在 Next v13 运行 `next dev --turbo` 时，你就开始在用 Turbo 引擎缓存了。当你关闭了开发服务器，缓存就会被清理。

<mark style="color:red;">在未来，我们计划将缓存持久化</mark>。要么将缓存保存至文件系统，要么就像 Turborepo 那样远程缓存，也就是说 Turbopack 将跨运行、跨机器间支持缓存。

### 这有什么用？

这个方法令 Turbopack 能够迅速计算出应用的<mark style="color:red;">递增式更新</mark>，并<mark style="color:red;">优化 Turbopack 在开发模式下的更新任务</mark>，<mark style="color:red;">意味着你的开发服务器可以快速响应文件变化</mark>。

未来，持久化缓存将拥抱更快的生产构建。在生产构建中有了函数调用的缓存，将重新构建发生变化的文件，也许能节省大量的时间。

## 根据请求编译（动态编译、懒构建）

Turbo 引擎能够为开发服务器提供极快的更新体验，但还有另一个重要的考量 —— <mark style="color:red;">启动时间</mark>。开发服务器启动得越快，你就能越快投入工作。

这两种方式可以加快这个过程：<mark style="color:red;">提高性能（并行&并发考虑）</mark>和<mark style="color:red;">减少工作量（按需构建）</mark>。对于启动开发服务器而言，要减少工作量就得 _仅编译需要用到的代码_。

#### <mark style="background-color:purple;">1. 页面级编译</mark>

两三年前（老版本的）的 Next.js 版本会在开发服务器启动前，编译整个应用代码。在 Next.js \[11],我们开始只编译_会被请求到的页面代码_。

这个方式比以往更佳，但不还算不上优秀。当你访问 `/users` 时，我们<mark style="color:red;">会构建所有的客户端和服务端模块、动态导入的模块、CSS、图片文件等其它引用资源</mark>。这意味着，如果你的页面有很大一部分内容是不可见的，或者是被标签页隐藏掉了，我们仍然还是会将它们进行编译。

#### <mark style="background-color:purple;">2.请求级编译</mark>

聪明的 Turbopack 会知道_仅编译你请求的代码_。如果浏览器请求 HTML，我们只编译 HTML，不会编译 HTML 引用的资源。

如果浏览器想要获取 CSS，我们就只编译 CSS，不会编译其引用的图片文件。假设你在 `next/dynamic` 后面引入了一个大型图表 Library，只有当标签页可见并且图表显示时，这个 Library 才会被编译。<mark style="color:orange;">Turbopack 甚至知道只有在你打开了 Chrome DevTools 时，才编译 Source Maps</mark>

如果我们使用原生 ESM，我们也能得到差不多的效果，除了它需要向服务器发送大量的请求，这在 [Why Turbopack](https://turbo.hector.im/pack/docs/why-turbopack) 章节就说过了。拥有了请求级编译，减少请求量的同时，还能有原生语言速度的加持。你可以查看 [性能测试](https://turbo.hector.im/pack/docs/benchmarks) 章节，了解其显著的性能提升。

## 即时编译（Just In Time**非官方**）

Turbo 引擎在运行时将 JavaScript 代码转换为更高效的<mark style="color:red;">机器代码</mark>，从而提高代码的执行速度。这种即时编译技术可以显著提高应用的性能，特别是在处理大量 JavaScript 代码时。

## **智能预加载(非官方）**

Turbo 引擎可以智能地预加载页面和组件，以减少应用的加载时间。这种预加载技术可以显著提高用户的体验，特别是在处理大量页面和组件时。
