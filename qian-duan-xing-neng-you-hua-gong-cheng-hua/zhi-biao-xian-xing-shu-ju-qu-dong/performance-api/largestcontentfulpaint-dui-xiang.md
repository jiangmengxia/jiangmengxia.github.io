# LargestContentfulPaint 对象

这个API提供的关键时刻是最大内容绘制（LCP）指标。它提供了视口中可见的最大图像或文本块的渲染时间，从页面首次开始加载时开始记录。当确定LCP时需被考察的元素有：

* [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) 元素
* SVG内的[`<image>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image) 元素
* Video的Post图片
* 元素的背景图片
* 整组的文本节点，比如[`<p>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p)。

如果需要测量其他元素被渲染的次数，可以用[`PerformanceElementTiming`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceElementTiming) API。

其他关键绘制（paint）时刻的测量，用[`PerformancePaintTiming`](https://developer.mozilla.org/en-US/docs/Web/API/PerformancePaintTiming) API，比如：

* [First paint](https://developer.mozilla.org/en-US/docs/Glossary/First\_paint) (FP):  首次渲染的事件。这个指标也是可选的，不是所有浏览器都支持的。
* [First contentful paint](https://developer.mozilla.org/en-US/docs/Glossary/First\_contentful\_paint) (FCP): 首次内容（DOM Text或image内容）渲染的事件。

## 属性

除去Performace Entry共有属性后，新增的主要属性如下，且属性均是**只读**的。

### [`LargestContentfulPaint.element`](https://developer.mozilla.org/en-US/docs/Web/API/LargestContentfulPaint/element)&#x20;

被认定为最大内容的元素

### [`LargestContentfulPaint.renderTime`](https://developer.mozilla.org/en-US/docs/Web/API/LargestContentfulPaint/renderTime)&#x20;

这个最大内容的元素被绘制到屏幕上的时间，对于跨域的图片，如果未设置`Timing-Allow-Origin`则不会被监听到。

## [`LargestContentfulPaint.loadTime`](https://developer.mozilla.org/en-US/docs/Web/API/LargestContentfulPaint/loadTime)

这个最大内容的元素被加载的时间

### [`LargestContentfulPaint.size`](https://developer.mozilla.org/en-US/docs/Web/API/LargestContentfulPaint/size)&#x20;

这个最大内容的元素的固有大小（非渲染大小）返回为面积（宽\*高）。

### [`LargestContentfulPaint.id`](https://developer.mozilla.org/en-US/docs/Web/API/LargestContentfulPaint/id)&#x20;

这个最大内容的元素的ID

### [`LargestContentfulPaint.url`](https://developer.mozilla.org/en-US/docs/Web/API/LargestContentfulPaint/url)&#x20;

如果这个最大内容的元素是图片，则返回它的url，否则为空

## 监听最大内容绘制时间

```javascript
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lastEntry = entries[entries.length - 1]; // Use the latest LCP candidate
  console.log("LCP:", lastEntry.startTime);
  console.log(lastEntry);
});
observer.observe({ type: "largest-contentful-paint", buffered: true });

```



## 跨域图片渲染时间



若需要获得跨域图片的渲染时间，则需要再http请求头中添加属性`Timing-Allow-Origin`，否则无法获取，如下：

```javascript
Timing-Allow-Origin: https://developer.mozilla.org
```



