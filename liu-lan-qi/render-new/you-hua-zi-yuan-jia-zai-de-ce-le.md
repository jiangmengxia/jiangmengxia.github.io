# 优化资源加载的策略

## preFetch 预取回

*   用于提示浏览器在CPU和网络带宽空闲时，预先下载指定URL的JS，图片、音频、HTML文档等各类资源，存储到浏览器本地缓存中，从而减少该资源文件后续加载的耗时，从而优化用户体验。

    ```
    <link rel="prefetch" href="https://github.com/JuniorTour/juniortour.js" />
    ```

## preLoad 预加载

*   提前加载资源，当用户点击链接时，浏览器会立即加载资源，提高用户体验。 与预取回不同，预加载用于提高当前页面中资源加载的优先级，确保关键资源优先加载完成。 预加载最常见的用法是用于字体文件，减少因字体加载较慢导致的文字字体闪烁变化。例如：

    ```
    <link rel="preload" as="font" href="/main.woff" />
    ```

## preConnect 预连接

*   提示用于提前与目标域名握手，完成DNS寻址，并建立TCP和TLS链接。具体使用方式是将link标签的rel属性设为preconnect，并将href属性设为目标域名，例如 :

    ```
    <link rel="preconnect" href="https://github.com" />
    ```

    优化效果是通过提前完成DNS寻址、建立TCP链接和完成TLS握手，从而减少后续访问目标域名时的连接耗时，改善用户体验。 注意！ 强烈建议只对重要域名进行Preconnect优化，数量不要超过 6 个。 因为Preconnect生效后，会与目标域名的保持至少10秒钟的网络连接，占用设备的网络和内存资源，甚至阻碍其他资源的加载。

## preRender 预渲染

*   是将网页内容在用户访问前生成静态HTML文件的技术，优化了首次访问速度，减少服务器压力，提升用户体验。预渲染可应用于单页面应用(SPA)、静态站点生成器和网站爬虫，但存在未处理动态元素和SEO限制。预渲染引擎如Prerender.io和Nuxt.js可自动为SPA生成预渲染页面，提高搜索引擎可见性。

    ```
    <link rel="prerender" href="https://github.com" />
    ```

## preCache 预缓存

*   是指预先下载和存储网络资源，以减少未来访问延迟的技术。这适用于如视频、网页图像等大块数据。预缓存能提升用户满意度，增加页面加载速度，节省流量，优化用户体验，并提升应用程序运行效率。因此，它被广泛用于各种网络应用，如在线教育、在线游戏和电子商务等，以提高用户体验和满足需求。

    ```
    <link rel="precache" href="https://github.com/JuniorTour/juniortour.js" />
    ```

## dnsPrefetch DNS预解析

*   提前解析域名，提高页面加载速度。

    ```
    <link rel="dns-prefetch" href="https://github.com" />
    ```
