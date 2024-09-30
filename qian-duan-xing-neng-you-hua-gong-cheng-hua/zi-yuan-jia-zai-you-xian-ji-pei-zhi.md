# 资源加载优先级配置

对运行在浏览器中的前端应用来说，JS、CSS等各类静态资源加载的耗时、时间节点，直接决定了页面的渲染速度，进而深刻影响着用户体验。“**预设资源优先级”**是优化静态资源加载顺序、时间节点的第一选择的方法。

我们先看一下网上找来的优化效果：

<figure><img src="../.gitbook/assets/image (46).png" alt=""><figcaption></figcaption></figure>

通过**预设资源优先级（仅几行代码），**可快速达到效果，立竿见影，速度提升67%**。**该方法并不改变资源大小，而是通过设置优先级，是的各个资源的某些任务并行，从而整体提速。



## **预设资源优先级五大方式**

预设资源优先级主要方法有**：**

1. 预取回 Prefetch：link标签，支持资源类型有脚本、样式表、字体、图像等
2. 预加载 Preload：link标签，支持的资源类型包括脚本、样式表、字体、图像等。
3. 预连接 Preconnect：link标签，
4. DNS预取回 DNS-Prefetch：：link标签，支持多种类型数据，<mark style="color:red;">JS、CSS、各种格式的图片、音频、WASM文件、字体文件、甚至HTML文档本身</mark>
5. 预渲染 PreRender：link标签，

以上预设资源优先级的几种方式的，请参考[优化资源加载的策略](../liu-lan-qi/render-new/you-hua-zi-yuan-jia-zai-de-ce-le.md)小节

## 推荐工具[resource-hint-generator](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FJuniorTour%2Fresource-hint-generator)

用于快速配置优先级

[https://juejin.cn/book/7306163555449962533/section/7310260645608292352#heading-6](https://juejin.cn/book/7306163555449962533/section/7310260645608292352#heading-6)

## 验证，量化与评估

[https://juejin.cn/book/7306163555449962533/section/7310260645608292352#heading-12](https://juejin.cn/book/7306163555449962533/section/7310260645608292352#heading-12)
