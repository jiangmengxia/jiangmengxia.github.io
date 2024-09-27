# 优化资源加载的策略

## dnsPrefetch DNS 预解析

与上文的预取回Prefetch不同，DNS预取回用于对**目标域名**提前进行DNS寻址，取回并缓存域名对应的IP地址，而非像预取回Prefetch那样缓存文件资源。

优化效果是通过提前解析出目标域名的IP地址，从而减少后续从目标域名加载资源的耗时，加快页面加载速度，改善用户体验。

具体使用方式是将`link`标签的`rel`属性设为`dns-prefetch`，并将`href`属性值设为**目标域名。**

```
<link rel="dns-prefetch" href="https://github.com" />
```

通常来说，解析DNS的耗时往往有几十甚至几百毫秒，对资源加载耗时有直接影响。

> DNS预取回的能力与预连接Preconnect有所重合，这是因为往往`dns-prefetch`的**浏览器兼容性**略好于`preconnect`，往往两者一同使用。
>
> 但近年来，IE被废弃，用户大都已使用更新版本的现代浏览器，兼容性不再重要，单独使用<mark style="color:red;">`preconnect`</mark><mark style="color:red;">即可替代</mark><mark style="color:red;">`dns-prefetch`</mark>。

例如，我们网站的有部分懒加载的静态资源，部署在域名为 [static.juejin.com](https://juejin.cn/book/7306163555449962533/section/static.juniortour.com) 的CDN上，那么在HTML中添加如下2行HTML代码：

```javascript
<link rel="preconnect" href="static.juniortour.com" />
<link rel="dns-prefetch" href="static.juniortour.com" />
```

就能观察到网页中懒加载触发时，对目标域名的JS、CSS等资源加载耗时会显著减少。因为预连接 Preconnect 的生效使得资源加载时的DNS寻址、SSL握手等阶段得以提前进行，各资源加载时的总耗时就大幅减少，产生了显著的优化效果。

具体的优化效果可以参考这份数据：

| 文本title   | 优化前（无Preconnect && DNS-Prefetch）                                                                         | 优化后（有Preconnect && DNS-Prefetch）                                                                         | 差异                                                                                                                      |
| --------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| 加载耗时      | 1400 ms                                                                                                  | 451 ms                                                                                                   | -949 ms (-67%)                                                                                                          |
| 开发者工具计时截图 | <img src="../../.gitbook/assets/image (47).png" alt="" data-size="original">                             | <img src="../../.gitbook/assets/image (48).png" alt="" data-size="original">                             | 在DevTool - Network - 资源 - 计时（Timing）面板中可以看到，因为Preconnect && DNS-Prefetch优化生效，连接开始阶段的耗时从950ms降低到了1400ms，使得资源的整体加载耗时大幅减少。 |
| 在线DEMO    | [jsbin.com/panorej/edi…](https://link.juejin.cn/?target=https%3A%2F%2Fjsbin.com%2Fpanorej%2Fedit%3Fhtml) | [jsbin.com/haragis/edi…](https://link.juejin.cn/?target=https%3A%2F%2Fjsbin.com%2Fharagis%2Fedit%3Fhtml) |                                                                                                                         |



## preConnect 预连接（三次握手）

预链接提示用于提前与目标域名握手，完成DNS寻址，并建立TCP和TLS链接。具体使用方式是将link标签的rel属性设为preconnect，并将href属性设为目标域名，例如 :

```
<link rel="preconnect" href="https://github.com" />
```

优化效果是通过提前完成DNS寻址、建立TCP链接和完成TLS握手，从而减少后续访问目标域名时的连接耗时，改善用户体验。&#x20;

<mark style="color:red;">注意！ 强烈建议只对重要域名进行Preconnect优化，数量不要超过 6 个。</mark>&#x20;

因为Preconnect生效后，会与目标域名的保持至少10秒钟的网络连接，占用设备的网络和内存资源，甚至阻碍其他资源的加载。

## preFetch 预取回（资源）

预取回用于提示浏览器在CPU和网络带宽空闲时，预先下载指定URL的<mark style="color:red;">JS，图片、音频、HTML</mark>文档等各类资源，存储到浏览器本地缓存中，从而减少该资源文件后续加载的耗时，从而优化用户体验。

具体使用方式是将`link`标签的`rel`属性设为`prefetch`，并将`href`属性设为**目标资源URL**，例如

```
<link rel="prefetch" href="https://github.com/JuniorTour/juniortour.js" />
```

该标签插入DOM后，将触发一次`href`属性值对应URL的HTTP请求，并将响应保存到本地的<mark style="color:red;">`prefetch cache`</mark>中，但是并不会进一步解析、运行该资源。

**支持资源**有很多：<mark style="color:red;">JS、CSS、各种格式的图片、音频、WASM文件、字体文件、甚至HTML文档</mark>本身都可实施 prefetch，预先缓存。

命中预取回缓存的请求，在开发者工具中的`Network`标签中的`Size`列，会有独特的`(prefetch cache)`标记：

> DEMO：[output.jsbin.com/cuxerej](https://link.juejin.cn/?target=https%3A%2F%2Foutput.jsbin.com%2Fcuxerej)

### `crossorigin`属性

`crossorigin`属性是浏览器同源策略的相关API，用于对<mark style="color:red;">`link`</mark><mark style="color:red;">、</mark><mark style="color:red;">`script`</mark><mark style="color:red;">和</mark><mark style="color:red;">`img`</mark>等元素指定以何种<mark style="color:red;">跨域资源共享模式</mark>加载目标资源。

默认情况下，JS脚本、图片等部分静态资源不受同源策略的限制，可以从任何跨域域名加载第三方JS文件、图片文件。

这样的规则有明显的**安全风险**，例如：

* 第三方JS文件可以访问第一方网站的错误上下文，从而获取内部信息。
* 第三方资源的源服务器可以在HTTP请求过程中通过SSL握手验证、`cookies`等手段获取用户身份信息。

为了缓解这些安全风险，浏览器引入了可用于`link`、`script`和`img`元素的`crossorigin`属性，对于这些元素加载的资源指定3类**跨域资源共享模式**，分别是：

* 没有`crossorigin`属性：无法获取 JS 的错误上下文，也不会在SSL握手阶段附带Cookies等用户身份相关的信息。
* 将`crossorigin`值设置为`"`**`anonymous`**`"`：可以访问JavaScript的错误上下文，但在请求过程中的SSL握手阶段不会携带cookies或其他用户凭据。
* 将`crossorigin`值设置为`"`**`use-credentials`**`"`：既可以访问JavaScript的错误上下文，也可以在请求过程中的SSL握手阶段携带Cookies或用户凭据。

此外，Chrome浏览器的**HTTP缓存**以及相应的Prefetch、Preconnect资源优先级提示效果也会受到`crossorigin`属性的影响。

对于跨域资源，则其资源优先级提示也需要设置为跨域，即`crossorigin="anonymous"`，例如：`<link rel="prefetch" href="https://github.com/JuniorTour/juniortour.js" crossorigin="anonymous" />`

资源是否跨域，可以依据浏览器自动附带的`Sec-Fetch-Mode`请求头判断：

* 值为`no-cors`，表示当前资源加载的模式并**非**跨域资源共享模式。其对应的资源优先级提示**不**需要设置为跨域`crossorigin="anonymous"`，**就能**命中Prefetch等专用缓存。
* 值为`cors`，表示当前资源加载的模式**是**跨域资源共享模式。其对应的资源优先级提示**需要**设置为跨域`crossorigin="anonymous"`或`"use-credentials"`，**才能**命中Prefetch等专用缓存。

<div align="left">

<figure><img src="../../.gitbook/assets/image (49).png" alt="" width="375"><figcaption></figcaption></figure>

</div>

## preLoad 预加载（资源）

预加载提前加载资源，当用户点击链接时，浏览器会立即加载资源，提高用户体验。 与预取回不同，预加载用于提高当前页面中资源加载的优先级，确保关键资源优先加载完成。&#x20;

<mark style="color:red;">预加载最常见的用法是用于字体文件，减少因字体加载较慢导致的文字字体闪烁变化</mark>。例如：

```
<link rel="preload" as="font" href="/main.woff" />
```

应用了`preload`提示的资源，通常会以较高的优先级**率先**在网页中加载，例如下图中的`nato-sans.woff2`请求，`Priority`列的值为`High`，加载顺序仅次于`Document`本身，能让字体较早在页面中渲染生效。

> `as`属性是必填属性，是`link`标签带有`rel="preload"`属性时，确定不同类型资源优先级的依据。
>
> 完整可选值请参考[MDN：link attribute as](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FHTML%2FElement%2Flink%23attributes%3A\~%3Atext%3Dglobal%2520attributes.-%2Cas%2C-This%2520attribute%2520is)\
> \
> Preload 在线 DEMO：[output.jsbin.com/cuxerej](https://link.juejin.cn/?target=https%3A%2F%2Foutput.jsbin.com%2Fcuxerej)

<div align="left">

<figure><img src="../../.gitbook/assets/image (50).png" alt="" width="375"><figcaption></figcaption></figure>

</div>

## preRender 预渲染（页面）

预渲染是将<mark style="color:red;">网页内容在用户访问前生成静态HTML文件的技术，优化了首次访问速度，减少服务器压力，提升用户体验</mark>。

预渲染可应用于单页面应用(SPA)、静态站点生成器和网站爬虫，但存在未处理动态元素和SEO限制。预渲染引擎如Prerender.io和Nuxt.js可自动为SPA生成预渲染页面，提高搜索引擎可见性。

```
<link rel="prerender" href="https://github.com" />
```

对于本节预操作之中，prerender（预渲染）是其中提升访问速度最明显的，假定我们已经知道用户下一个将访问的页面地址 [http://www.xxx.com.cn，我们可以在当前页通过以下方式告知浏览器](http://www.xxx.com.xn--cn,-128dz2ba1c760cp3de0am4oypcru7bd1az41aewoln5ay23b198d6bza1obr28g/)

浏览器加载并渲染页面，设置页面状态为’prerender’（此时页面不可见），当用户真正访问时，浏览器变更页面的状态为’visible’，将其迅速呈现出来，页面<mark style="color:red;">秒速响应</mark>。

> 注意： <mark style="color:red;">渲染页面对浏览器而言是比较昂贵的操作，因此并不是所有情况下都会去做预渲染</mark>，当出现以下情况时，预处理将被中止。

* 当资源有限时，防止启动预渲染。
* 由于高成本或资源需求而放弃预渲染 - 例如高CPU或内存使用，昂贵的数据访问等等。
* 由于所获取内容的类型或属性而放弃预渲染：
* 如果目标表现出非幂等行为：共享本地存储的突变，带有除GET，HEAD或OPTION之外的动词的`XMLHttpRequest`，依此类推。
* 如果目标触发需要用户输入的条件：确认对话框，身份验证提示，警报等。

> 注意：prerender 目前只有Chrome支持的比较好

## service worker preCache (预缓存)

您还可以使用 [Service Worker](https://developer.mozilla.org/docs/Web/API/Service\_Worker\_API) 推测性地预提取资源。 Service Worker 预缓存可以[使用 `Cache` API 提取和保存资源](https://developer.mozilla.org/docs/Web/API/CacheStorage)， 允许浏览器使用 `Cache` API 处理请求，而无需 网络。Service Worker 预缓存使用非常有效的 Service Worker 缓存策略，称为[仅缓存策略](https://developer.chrome.com/docs/workbox/caching-strategies-overview/?hl=zh-cn#cache-only)。这种模式 其有效性，因为一旦资源被放入 Service Worker 缓存，它们 在请求后几乎会立即被提取。



<figure><img src="../../.gitbook/assets/image.png" alt=""><figcaption><p>&#x3C;ph type="x-smartling-placeholder"><br>仅缓存策略只会从 网络。安装后，缓存的 只从 Service Worker 缓存中检索资源。</p></figcaption></figure>



> <mark style="color:blue;">\</ph></mark> <mark style="color:blue;"></mark><mark style="color:blue;">**重要提示**</mark>：计划在不久的将来 该课程详细介绍了各种性能优化 例如 Service Worker [运行时 缓存](https://developer.chrome.com/docs/workbox/caching-resources-during-runtime?hl=zh-cn)。

要使用 Service Worker 预缓存资源，您可以使用 [Workbox](https://developer.chrome.com/docs/workbox/?hl=zh-cn)。如果您 但您可以编写自己的代码来缓存 文件。无论采用哪种方式，您都决定使用 Service Worker 来预缓存 但需要知道，当服务启动[时， 工作器数量](https://developer.chrome.com/docs/workbox/service-worker-lifecycle/?hl=zh-cn#installation)。安装完成后，系统会立即将预缓存的资源 以供 Service Worker 在您网站上控制的任何页面上进行检索。



> <mark style="color:blue;">\</ph></mark> <mark style="color:blue;"></mark><mark style="color:blue;">**重要提示**</mark>：当然，您可以自行编写 Service Worker，则使用 Workbox 有助于在 其特别之处在于，它可跟踪 缓存的内容如果将来更新 Service Worker，Workbox 自动从缓存中移除过期的条目 自行完成所需的工作量

Workbox 使用[预缓存清单](https://developer.chrome.com/docs/workbox/modules/workbox-precaching/?hl=zh-cn#explanation-of-the-precache-list)来确定应将哪些资源 已预缓存预缓存清单是文件和版本控制信息的列表 用作“可信来源”要预缓存的资源

```javascript
[{  
    url: 'script.ffaa4455.js',
    revision: null
}, {
    url: '/index.html',
    revision: '518747aa'
}]
```

上述代码是包含两个文件的示例清单： `script.ffaa4455.js`和`/index.html`。如果资源包含版本 文件本身包含的信息（称为文件哈希值），则 `revision` 属性可以保留为 `null`，因为文件已进行版本控制（例如， `ffaa4455`，适用于上述代码中的 `script.ffaa4455.js` 资源）。对于 无版本控制的资源，可以在构建时为其生成修订版本。

设置完成后，可使用 Service Worker 预缓存静态页面或其 子资源来加快后续网页导航的速度。

```javascript
workbox.precaching.precacheAndRoute([
  '/styles/product-page.ac29.css',
  '/styles/product-page.39a1.js',
]);
```

例如，在电子商务商品详情页面上，可以使用 Service Worker 预缓存呈现商品详情页所需的 CSS 和 JavaScript， 让用户更快地导航到商品详情页面在 在前面的示例中，`product-page.ac29.css` 和 `product-page.39a1.js` 是 已预缓存[`workbox-precaching` 中提供的 `precacheAndRoute` 方法](https://developer.chrome.com/docs/workbox/reference/workbox-precaching/?hl=zh-cn#method-precacheAndRoute) 自动注册所需的处理程序，以确保预缓存的资源 会在必要时从 Service Worker API 中提取。

由于[Service Worker 受到广泛支持](https://caniuse.com/serviceworkers)，因此您可以使用 Service Worker 必要时在任何现代浏览器上预缓存。



更多关于service worker的介绍。可参考[ service worker](../jian-jin-shi-web-ying-yong-pwa/service-worker.md) 小节

## 其他

> 注：在2022年初，Chrome 102 新增了`fetch-priority`属性，可用来更精细地控制资源加载的优先级，目前仍处于实验阶段，未来可能会更加完善，示例如下：

```javascript
<img src="important.jpg" fetchpriority="high">
<img src="small-avatar.jpg" fetchpriority="low">
<script src="low-priority.js" fetchpriority="low"></script>

// 只对 preload link 标签生效
<link href="main.css" rel="preload" as="image" fetchpriority="high"> 
```



【参考】

[https://web.dev/learn/performance/prefetching-prerendering-precaching?hl=zh-cn#service\_worker\_precaching](https://web.dev/learn/performance/prefetching-prerendering-precaching?hl=zh-cn#service\_worker\_precaching)

[https://medium.com/@b09112332/%E8%AA%8D%E8%AD%98service-worker-f2d2e74bd3c0](https://medium.com/@b09112332/%E8%AA%8D%E8%AD%98service-worker-f2d2e74bd3c0)

[https://juejin.cn/book/7306163555449962533/section/7310260645608292352#heading-1](https://juejin.cn/book/7306163555449962533/section/7310260645608292352#heading-1)

[https://dknfeiov.github.io/2019/05/17/prerender%E5%8A%A0%E9%80%9F%E7%BD%91%E9%A1%B5%E8%AE%BF%E9%97%AE/](https://dknfeiov.github.io/2019/05/17/prerender%E5%8A%A0%E9%80%9F%E7%BD%91%E9%A1%B5%E8%AE%BF%E9%97%AE/)
