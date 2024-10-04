# Minimize main thread work

最小化主线程工作。

浏览器的渲染过程是将代码转换为用户可以与之交互的网页。默认情况下，渲染器进程的主线程通常处理大多数代码：它解析HTML并构建DOM，解析CSS并应用指定的样式，以及解析、计算和执行JavaScript。 主线程还处理用户事件。因此，每当主线程忙于其他事情时，您的网页可能不会对用户交互做出响应，从而导致糟糕的体验。

## 如何审计为失败？

Lighthouse标记在加载过程中使主线程繁忙超过4秒的页面：

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2FcclnRkfNHP2Z4tRC3HOr%2Fimage.png?alt=media&#x26;token=84d24762-baa3-46b6-aa2d-a6d038067ec5" alt=""><figcaption></figcaption></figure>

为了帮助您识别主线程负载的来源，Lighthouse显示了浏览器加载页面时CPU时间的细分。

## 如何最小化主线程工作？

以下各节根据Lighthouse报告的类别进行组织。有关Chromium如何渲染网页的概述，请参阅框架的解剖结构（[The anatomy of a frame](https://aerotwist.com/blog/the-anatomy-of-a-frame/) ）。

请参阅减少主线程工作（ [Do less main thread work](https://developer.chrome.com/docs/devtools/lighthouse#main)），了解如何使用Chrome DevTools来准确调查页面加载时主线程正在做什么。

### **脚本评估 Script evaluation**

* [Optimize third-party JavaScript](https://web.dev/articles/fast#optimize\_your\_third\_party\_resources) 优化第三方JavaScript&#x20;
* [Debounce your input handlers](https://web.dev/articles/debounce-your-input-handlers) 对输入处理程序进行去抖动处理&#x20;
* [Use web workers](https://web.dev/articles/off-main-thread)

### **样式和布局（Style and layout）**

* [Reduce the scope and complexity of style calculations](https://web.dev/articles/reduce-the-scope-and-complexity-of-style-calculations)  减少样式计算的范围和复杂性&#x20;
* [Avoid large, complex layouts and layout thrashing](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing)  避免大型、复杂的布局和布局混乱

### **渲染（Rendering）**

* [Stick to compositor only properties and manage layer count](https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count) 坚持使用合成器特性，并管理图层数量
* [Simplify paint complexity and reduce paint areas](https://web.dev/articles/simplify-paint-complexity-and-reduce-paint-areas) 简化绘制复杂性，并减少绘制区域

### Parsing HTML and CSS <a href="#parsing_html_and_css" id="parsing_html_and_css"></a>

* [Extract critical CSS](https://web.dev/articles/extract-critical-css)  提取关键CSS
* [Minify CSS](https://web.dev/articles/minify-css)   最小化CSS
* [Defer non-critical CSS](https://web.dev/articles/defer-non-critical-css)  推迟非关键CSS

### Script parsing and compilation <a href="#script_parsing_and_compilation" id="script_parsing_and_compilation"></a>

* [Reduce JavaScript payloads with code splitting](https://web.dev/articles/reduce-javascript-payloads-with-code-splitting)  通过代码拆分减少JS负载
* [Remove unused code](https://web.dev/articles/remove-unused-code)  删除无用代码

### Garbage collection <a href="#garbage_collection" id="garbage_collection"></a>

* [Monitor your web page's total memory usage with `measureMemory()`](https://web.dev/articles/monitor-total-page-memory-usage)   使用measureMemory方法监控网站总内存使用情况

### Resources（参考资源） <a href="#resources" id="resources"></a>

* [Source code for **Minimize main thread work** audit](https://github.com/GoogleChrome/lighthouse/blob/main/core/audits/mainthread-work-breakdown.js)  最小化主线程工作审计的源码
* [Main thread (MDN)](https://developer.mozilla.org/docs/Glossary/Main\_thread)           &#x20;
* [Inside look at modern web browser (part 3)](https://developer.chrome.com/blog/inside-browser-part3)  深入了解现代浏览器
