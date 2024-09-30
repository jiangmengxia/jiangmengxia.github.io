# web-vitals量化指标

## web-vitals 各项指标简介

`web-vitals`是谷歌的 Chrome 维护团队于 2020 年开源的工具库，它基于统一的浏览器 `Performance API` 获取标准化的用户体验指标。

它主要测量6项指标，分别是：

1. 首次内容绘制 (First Contentful Paint，FCP)
2. 最大内容绘制 (Largest Contentful Paint，LCP)
3. 首次输入延迟 (First Input Delay ，FID)
4. 交互到绘制延迟（Interaction to Next Paint，INP）
5. 累积布局偏移 (Cumulative Layout Shift，CLS)
6. 第一字节时间 (Time to First Byte，TTFB)

下面我们将逐一了解这些指标的测量目标、评分标准和具体示例。

## 1. 首次<mark style="background-color:purple;">内容</mark>绘制 (First Contentful Paint，FCP)

FCP测量从页面开始加载到页面中<mark style="color:red;">任意部分内容首次</mark>（文本、图像、`<svg/>`，`<canvas/>`等内容）<mark style="color:red;">完成渲染的时长</mark>。

其值为浮点数，单位是毫秒。<mark style="color:red;">FCP值越小表示该指标状况越好、页面的初始内容渲染越快</mark>。

页面中率先出现的文本图像等视觉可见内容，直接决定了用户对页面加载速度的主观体验，所以这一指标选择测量这些内容的渲染耗时，从而量化用户的主观体验。

注意，FCP测量的是**任意部分**DOM完成渲染的耗时，而非**全部**内容完成渲染耗时，不等于`onLoad`事件。

如下图中的例子，FCP指标的值为1439毫秒，在这个时刻页面中首次渲染出了文字和图像。

<figure><img src="../../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

按照Chrome官方的推荐标准，FCP指标3个等级的评分分别为：

* 优：小于1.8秒
* 待改进：大于1.8秒且小于3秒
* 差：大于3秒

<figure><img src="../../.gitbook/assets/image (1) (1).png" alt=""><figcaption></figcaption></figure>

## 2. 最大内容绘制 (Largest Contentful Paint，LCP)

LCP测量从页面开始加载到<mark style="background-color:blue;">可视区域内</mark><mark style="background-color:blue;">**尺寸最大**</mark>的文字或图像等内容的渲染完成的耗时。

其值为浮点数，单位是毫秒。<mark style="color:red;">LCP值越小表示该指标状况越好、最大元素渲染越快</mark>。

之所以测量最大的内容，是因为尺寸最大的内容往往最能吸引用户的注意力，其渲染耗时，直接影响了用户对页面整体渲染速度的体验。

我们可以用Chrome浏览器自带 DevTool 中的 Performance Insights 工具来判断页面中什么元素是最大内容，例如下图中的`img.banner-image`就是掘金首页的最大内容元素，这个元素渲染的耗时为1.55秒，即LCP的值。

<figure><img src="../../.gitbook/assets/image (2).png" alt=""><figcaption></figcaption></figure>

按照Chrome官方的推荐标准，LCP指标3个等级的评分分别为：

* 优：小于2.5秒
* 待改进：大于2.5秒且小于4秒
* 差：大于4秒

<figure><img src="../../.gitbook/assets/image (3).png" alt=""><figcaption></figcaption></figure>

## 3. 首次输入延迟 (First Input Delay ，FID)&#x20;

FID 测量<mark style="color:red;">用户首次交互（点击、触摸）后到浏览器开始响应之间的时间间隔</mark>。

其值为浮点数，单位是毫秒。<mark style="color:red;">FID值越小表示该指标状况越好，用户首次与页面交互时，浏览器响应的延迟越小</mark>。

这一指标只关注页面中首次交互的原因是因为，首次交互时，页面往往处于尚未完全加载的状态，异步响应数据仍在等待响应、部分JS和CSS仍在执行和渲染的过程中，浏览器的主线程会短暂的处于忙碌状态，往往不能即时响应用户交互。

但是第一次交互的延迟长短往往决定了用户对网页流畅度的第一印象，所以这一指标的测量目标，也能量化用户的主观体验。

按照Chrome官方的推荐标准，FID指标3个等级的评分分别为：

* 优：小于100毫秒
* 待改进：大于100毫秒且小于300毫秒
* 差：大于300毫秒

<figure><img src="../../.gitbook/assets/image (4).png" alt=""><figcaption></figcaption></figure>



> 注：FID指标与下文将要提到的 INP 指标测量目标有所重叠，且普适性不及INP，未来可能会被INP替代。

## 4. 交互到绘制延迟（Interaction to Next Paint，INP）

INP测量用户在页面浏览过程中的<mark style="color:red;">所有交互（点击、键盘输入、触摸等）与浏览器渲染响应的</mark><mark style="color:red;">**整体**</mark><mark style="color:red;">延迟</mark>情况。

其值为浮点数，单位是毫秒。<mark style="color:red;">INP值越小表示该指标状况越好，用户的各类交互响应延迟越小</mark>。

与FID只关注首次交互不同，INP会关注用户浏览网页全过程中的**所有**交互，所以`web-vitals`库中获取INP值的`onINP(FCPReportCallback)`方法，通常会在页面可视化状态变化或页面卸载时多次触发，综合统计一段时间内的多次交互，按特定算法，计算该时段内的INP指标值。

INP指标3个等级的评分分别为：

* 优：小于200毫秒
* 待改进：大于200毫秒且小于500毫秒
* 差：大于500毫秒

<figure><img src="../../.gitbook/assets/image (5).png" alt=""><figcaption></figcaption></figure>

> INP是新近加入`web-vitals`的一项指标，仍处于实验状态，其标准可能会有调整，目前描述的是其2023年5月的状况。

## 5. 累积布局偏移 (Cumulative Layout Shift，CLS)

CLS测量<mark style="color:red;">页面中所有</mark><mark style="color:red;">**意外**</mark><mark style="color:red;">布局变化的累计分值</mark>。

其值为浮点数，**无单位，** <mark style="color:red;">值的大小表示意外布局变化的多少和影响范围的大小</mark>。

CLS值的计算类似INP，会统计一段时间内的所有意外布局变化，按特定算法，计算出分值。

所谓**意外布局变化**是指 DOM 元素在前后绘制的2帧之间，非用户交互引起DOM元素尺寸、位置的变化。

请看示例视频：

<figure><img src="../../.gitbook/assets/image (6).png" alt=""><figcaption></figcaption></figure>

这段视频中用户本想点击取消按钮，但是页面元素的布局位置突然产生了变化，出现了**非用户交互导致**的**意外布局变化**，原本取消按钮的位置被确认按钮替代，导致了用户本想点击取消，却触发了购买的误操作，严重损害了用户体验。

> [《意外布局变化》在线DEMO](https://link.juejin.cn/?target=https%3A%2F%2Fcodesandbox.io%2Fp%2Fdevbox%2Fcls-demo-qfu8g5%3Ffile%3D%252Fsrc%252Findex.js%253A6%252C53)

引入`web-vitals`库后调用`onCLS`API就能获取CLS的值，同时获取到对应的意外布局变化的具体来源，如下图中`sources`字段的2个对象就通过DOM元素引用，明确地告诉了我们引起布局变化的来源，以及变化前后的尺寸位置等详细数据`sources[i].currentRect, sources[i].previousRect`：

<figure><img src="../../.gitbook/assets/image (7).png" alt=""><figcaption></figcaption></figure>

按照Chrome官方的推荐标准，CLS指标3个等级的评分分别为：

* 优：小于0.1
* 待改进：大于0.1且小于0.25
* 差：大于0.25

<figure><img src="../../.gitbook/assets/image (8).png" alt=""><figcaption></figcaption></figure>

## 6. 第一字节时间 (Time to First Byte，TTFB)

TTFB测量<mark style="color:red;">前端页面（Document）的HTTP请求发送后，到接收到第一字节数据响应的耗时，通常包括重定向、DNS查询、服务器响应延迟</mark>等耗时。

其值为浮点数，单位是毫秒。值越小表示该项指标状况越好，页面HTTP响应的耗时越短，也就是页面的加载更快。

TTFB指标值的大小直接决定着页面初始内容渲染耗时的长短，往往和`FCP`、`LCP`指标有明显的相关关系，对用户体验有直接影响，所以`web-viatals`也将其当做了量化用户体验的指标之一。

除了可以通过`web-vitals`库的`onTTFB()`API获取，也可以使用 Chrome 自带的 DevTool Network 网络面板计算得出。

如下图的例子知乎首页的`TTFB`指标值即为：

* `文档响应的整体耗时` 减去 `内容下载耗时（Content Download）`
* 391毫秒 - 57毫秒 = 335毫秒

<figure><img src="../../.gitbook/assets/image (9).png" alt=""><figcaption></figcaption></figure>

TTFB指标3个等级的评分分别为：

* 优：小于800毫秒
* 待改进：大于800毫秒且小于1800毫秒
* 差：大于1800毫秒

<figure><img src="../../.gitbook/assets/image (10).png" alt=""><figcaption></figcaption></figure>

尽管以上指标都可以通过原生Performance API计算获得，但仍然推荐使用的`web-vitals`库，因为它能帮助我们处理了许多细节问题，例如标签页处于<mark style="color:red;">后台时的计算、指标获取时机、浏览器兼容性</mark>等等，能确保我们<mark style="color:red;">测量出标准、稳定的指标</mark>数值。

## 六大指标对比



<table><thead><tr><th width="166">名称</th><th width="211">作用</th><th width="190">注意事项</th><th>范围</th></tr></thead><tbody><tr><td>首次内容绘制(<strong>FCP</strong>)</td><td>测量从页面开始加载到页面中<strong>任意</strong>部分内容（文本、图像、<code>&#x3C;svg/></code>，<code>&#x3C;canvas/></code>等内容）完成渲染的时长</td><td>测量任意<strong>部分</strong>DOM渲染的耗时，而非全部内容，不等于页面所有内容完全加载完成的<code>onLoad</code>事件。</td><td><p></p><p></p><p><mark style="color:green;"><strong>优</strong></mark>：小于1.8秒</p><p>待改进：大于1.8秒且小于3秒</p><p>差：大于3秒</p></td></tr><tr><td>最大内容绘制 (<strong>LCP</strong>)</td><td>测量从页面开始加载到可视区域内尺寸最大的文字或图像渲染完成的耗时。</td><td>对于UI渲染逻辑复杂的前端应用，不同优化可能会有不同的最大元素，统计获得的最大元素可能有多个。</td><td><p></p><p><mark style="color:green;"><strong>优</strong></mark>：小于2.5秒</p><p>待改进：大于2.5秒且小于4秒</p><p>差：大于4秒</p></td></tr><tr><td>首次输入延迟(<strong>FID</strong>)</td><td>测量用户首次交互（点击、触摸）后到浏览器开始响应用户交互之间的时间间隔。</td><td>未来可能会被INP替代</td><td><p></p><p><mark style="color:green;"><strong>优</strong></mark>：小于100毫秒</p><p>待改进：大于100毫秒且小于300毫秒</p><p>差：大于300毫秒</p></td></tr><tr><td>交互到绘制延迟(<strong>INP</strong>)</td><td>测量用户在页面浏览过程中的所有交互（点击、键盘输入、触摸等）与浏览器绘制对应响应的<strong>整体</strong>延迟情况</td><td>通常会在页面可视化状态变化或页面卸载时进行计算。</td><td><p></p><p><mark style="color:green;"><strong>优</strong></mark>：小于200毫秒</p><p>待改进：大于200毫秒且小于500毫秒</p><p>差：大于500毫秒</p></td></tr><tr><td>累积布局偏移(<strong>CLS</strong>)</td><td>测量页面中，一定时间段内所有意外布局变化的累计分值。</td><td>通常会在页面可视化状态变化或页面卸载时进行计算</td><td><p></p><p><mark style="color:green;"><strong>优</strong></mark>：小于0.1</p><p>待改进：大于0.1且小于0.25</p><p>差：大于0.25</p></td></tr><tr><td>第一字节时间(<strong>TTFB</strong>)</td><td>测量页面本身（Document）的HTTP请求发送后，到接收到第一字节数据响应的耗时</td><td>往往和FCP、LCP指标有相关关系</td><td><p></p><p><mark style="color:green;"><strong>优</strong></mark>：小于800毫秒</p><p>待改进：大于800毫秒且小于1800毫秒</p><p>差：大于1800毫秒</p></td></tr></tbody></table>

## `web-vitals`使用示例

> 获取`web-vitals`数据在线 DEMO: [output.jsbin.com/bizanep](https://link.juejin.cn/?target=https%3A%2F%2Foutput.jsbin.com%2Fbizanep)

<figure><img src="../../.gitbook/assets/image (12).png" alt=""><figcaption></figcaption></figure>

```markup
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>获取 web-vitals 数据 DEMO</title>
</head>
<body>
  <h2 id="fcp">FCP:</h2>
  <h2 id="lcp">LCP:</h2>
  <h2 id="ttfb">TTFB:</h2>
  <p>首次交互（例如：点击任意位置）后可获取：</p>
  <h2 id="fid">FID:</h2>
  <p>页面可视化状态变化为隐藏（例如：切换标签页）后可获取：</p>
  <h2 id="inp">INP:</h2>
  <h2 id="cls">CLS:</h2>
  
  
  <a href="https://github.com/JuniorTour">Author: https://github.com/JuniorTour</a>
  
  <script type="module">
    import {onFCP, onLCP, onFID, onCLS, onINP, onTTFB} from 'https://unpkg.com/web-vitals@3?module';

    function setInnerHtml(id, html) {
      if (!id || !html) {
        return
      }
      const el = document.querySelector(`#${id}`)
      if (el) {
        el.innerHTML = html
      }
    }
    
    function onGetWebVitalsData(data) {
      console.log(data)
      if (!data?.name) {
        return
      }
      const name = data.name
      const value = data.value
      const rating = data.rating
      const msg = (`${name}: value=${value}, rating=${rating}`)
      console.log(msg)
      setInnerHtml(name?.toLowerCase(), msg)
    }
    
    onFCP(onGetWebVitalsData);
    onLCP(onGetWebVitalsData); 
    onFID(onGetWebVitalsData); 
    onCLS(onGetWebVitalsData);
    onINP(onGetWebVitalsData);
    onTTFB(onGetWebVitalsData);
  </script>

</body>
</html>

```

要注意的细节是，这些指标中：

* `onFCP, onTTFB` 均为在页面初始化时自动触发。
* `onFID`是在用户第一次与页面交互时触发。
* `onCLS, onINP`则因为要测量页面的全生命周期，往往无固定触发时间点，在实践中通常会在交互停止一段时间后，或页面可视状态变化（例如切换标签页）后多次触发。
* `onLCP`的触发分2种情况：

1. 如果有用户交互，例如点击、按下按键，会立刻触发onLCP回调。
2. 如果始终没有用户交互，会在页面标签页切换到后台时触发onLCP回调。

> 源码：[web-vitals/src/onLCP.ts at a948d3cde1770eabb8a215072cfd9713e940c4d9 · GoogleChrome/web-vitals](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FGoogleChrome%2Fweb-vitals%2Fblob%2Fa948d3cde1770eabb8a215072cfd9713e940c4d9%2Fsrc%2FonLCP.ts%23L83)

`web-vitals`的这些指标是Chrome维护团队基于海量用户数据、经过大量实践后设计出来的，能科学地将主观的用户体验量化为客观的指标，是我们进行体验优化的必备工具。

大量的收集这些指标数据，加以汇总分析便可以实现针对用户体验的“真实用户监控”（[en.wikipedia.org/wiki/Real\_u…](https://link.juejin.cn/?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FReal\_user\_monitoring%25EF%25BC%2589) ，从用户客户端收集到**海量**数据，要比我们在内部的测试开发环境上测量出的**少量**实验室数据更全面、更客观、更有说服力，更有助于我们做出数据驱动的优化决策。

## 小结

我们知道，建立量化指标的意义是为了能真正的改善用户体验。

本小节详细介绍了`web-viatals`库来量化指标。其中主要讲解了FCP、LCP、CLS、FID、INP、TTFB6项用户体验指标的含义、细节和具体用法。

实际在性能优化中，需要考量的不仅仅这6个指标，也不一定要用web-vitals库，也可以选择更合适的指标获取方案，甚至可以使用window.performance获取原生的指标，并根据需要使用、组合指标，来量化指标。
