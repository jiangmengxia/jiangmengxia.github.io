# js|css的不同加载方式

## js 的加载

<figure><img src="../../.gitbook/assets/image (14) (1).png" alt=""><figcaption></figcaption></figure>

```
（1）  <script/>      ：同步加载，加载后立即执行，阻塞DOM解析
（2）  <script async/> ：异步加载，加载后立即执行，阻塞DOM解析
（3）  <script defer/> ：异步加载，加载后等待DOM解析完成再执行，不阻塞DOM解析

css 的同步加载和异步加载
（1）  <link/>      ：同步加载，加载后立即执行，阻塞DOM解析
（2）  <link async/> ：异步加载，加载后立即执行，阻塞DOM解析
（3）  <link defer/> ：异步加载，加载后等待DOM解析完成再执行，不阻塞DOM解析
```

## css的加载是否会造成阻塞

[https://cloud.tencent.com/developer/article/1370715](https://cloud.tencent.com/developer/article/1370715)

[https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement/defer](https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement/defer)

[https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement/async](https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement/async)

<mark style="color:red;">有的文档看到说CSS有Defer和Async选项，是错误的，官方说了defer和async只适用于script标签。</mark>

CSS 不会直接阻塞 HTML 的解析，但可能会影响DOM树的渲染。具体来说，CSS 会阻塞渲染（Render Blocking）和解析（Parse Blocking）。

~~当浏览器解析到 CSS 文件时，它会暂停 HTML 的解析，直到 CSS 文件被下载并解析完成。<mark style="background-color:purple;">这是因为 CSS 文件可能会影响页面的布局和样式，所以浏览器需要先解析 CSS 才能继续解析 HTML</mark>。~~

&#x20;        CSS下载和解析本身不会影响解析HTML，两者是并行的，CSSOM Tree和DOM Tree都生成后，才能进行布局，即生成Layout Tree(渲染树）。也就是是说如果下载或者解析时间过长，从布局开始的所有活动都会等待其结束，将解析结果返回后再依次执行后续活动。

&#x20;       当在构建DOM树时，如果碰到非异步加载的`<script>`标签，那么浏览器将阻塞构建DOM树而执行脚本。如果<mark style="color:red;">执行脚本时CSSOM尚未构建完成，脚本将被阻塞而等待CSS的加载和CSSOM树的构建（不知道正确性）</mark>。

&#x20;       默认情况下：DOM解析（构建DOM Tree)和JS执行都会影响DOM节点，因此互斥，DOM解析会停下来，让JS先执行，可认为<mark style="color:red;">JS解析执行优先级高于DOM解析</mark>

&#x20;                               CSS解析（构建CSSOM Tree) 和JS执行都会影响样式，<mark style="color:red;">CSSOM Tree构建优先级高娱JS解析执行</mark>。

&#x20;       &#x20;

<figure><img src="../../.gitbook/assets/1 (1).svg" alt=""><figcaption></figcaption></figure>



基于CSS的优化方式

[https://juejin.cn/post/6844903950907342861](https://juejin.cn/post/6844903950907342861)

通过异步加载非关键js脚本与css样式表来加速网页网页渲染[https://renzibei.com/2020/07/17/%E9%80%9A%E8%BF%87%E5%BC%82%E6%AD%A5%E5%8A%A0%E8%BD%BD%E9%9D%9E%E5%85%B3%E9%94%AEjs%E8%84%9A%E6%9C%AC%E4%B8%8Ecss%E6%A0%B7%E5%BC%8F%E8%A1%A8%E6%9D%A5%E5%8A%A0%E9%80%9F%E7%BD%91%E9%A1%B5%E7%BD%91%E9%A1%B5%E6%B8%B2%E6%9F%93/](https://renzibei.com/2020/07/17/%E9%80%9A%E8%BF%87%E5%BC%82%E6%AD%A5%E5%8A%A0%E8%BD%BD%E9%9D%9E%E5%85%B3%E9%94%AEjs%E8%84%9A%E6%9C%AC%E4%B8%8Ecss%E6%A0%B7%E5%BC%8F%E8%A1%A8%E6%9D%A5%E5%8A%A0%E9%80%9F%E7%BD%91%E9%A1%B5%E7%BD%91%E9%A1%B5%E6%B8%B2%E6%9F%93/)
