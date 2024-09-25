# 长动画帧Timing(LoAF)

## Long animation frame timing

长动画帧（Long animation frame timing，LoAF）会影响网站的用户体验。它们可能会导致用户界面（UI）更新缓慢，导致看似无响应的控件和笨拙（或不平滑）的动画效果和滚动，从而导致用户沮丧。长动画帧API允许开发人员获取有关长动画帧的信息，并更好地了解其根本原因。本文展示了如何使用长动画框架API。

### &#x20;1. 概念

长动画帧（或LoAF）是延迟超过<mark style="background-color:purple;">50ms</mark>的渲染更新。

对于平滑的动画，更新需要很快——为了使动画以每秒60帧的平滑速度运行，每个动画帧应在大约16ms（1000/60）内渲染。

## 2 监控LoAF

可以通过（1）监控类型为“long-animation-frame”的entries（2）getEntriesByType 来获得长动画帧的信息。

```javascript
const observer = new PerformanceObserver((list) => {
  console.log(list.getEntries());
});

observer.observe({ type: "long-animation-frame", buffered: true });

const loafs = performance.getEntriesByType("long-animation-frame");
```

## 3 LoAF的JSON对象格式

```javascript
{
  "blockingDuration": 0,  // 
  "duration": 60,
  "entryType": "long-animation-frame",
  "firstUIEventTimestamp": 11801.099999999627, // 
  "name": "long-animation-frame",
  "renderStart": 11858.800000000745, // 
  "scripts": [ // PerformanceScriptTiming 对象
    {
      "duration": 45,
      "entryType": "script",
      "executionStart": 11803.199999999255,
      "forcedStyleAndLayoutDuration": 0,
      "invoker": "DOMWindow.onclick", // 脚本被触发的方式
      "invokerType": "event-listener", 
      "name": "script",
      "pauseDuration": 0,
      "sourceURL": "https://web.dev/js/index-ffde4443.js",
      "sourceFunctionName": "myClickHandler",
      "sourceCharPosition": 17796,
      "startTime": 11803.199999999255,
      "window": [Window object],
      "windowAttribution": "self"
    }
  ],
  "startTime": 11802.400000000373,
  "styleAndLayoutStart": 11858.800000000745 // 
}

```

* [`blockingDuration`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongAnimationFrameTiming/blockingDuration)：表示<mark style="background-color:purple;">主线程被阻止响应高优先级任务（如用户输入）的总时间</mark>（毫秒）。这是通过计算LoAF中持续时间超过50ms的所有长任务，从每个任务中减去50ms，将渲染时间加到最长的任务时间上，并将结果相加来计算的。
* [`firstUIEventTimestamp`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongAnimationFrameTiming/firstUIEventTimestamp)表示在当前动画帧期间排队的第一个UI事件（如鼠标或键盘事件）的时间，也就是它阻塞的第一个UI事件。
* [`renderStart`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongAnimationFrameTiming/renderStart)：表示渲染周期（rendering cycle）的开始时间，包括[`Window.requestAnimationFrame()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) 回调、样式和布局计算、[`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)回调和 [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)回调。
* [`styleAndLayoutStart`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongAnimationFrameTiming/styleAndLayoutStart)：表示当前动画帧的样式和布局计算所花费的时间段的开始。
* [`script.executionStart`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceScriptTiming/executionStart)：表示脚本编译完成和执行开始的时间。
* [`script.forcedStyleAndLayoutDuration`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceScriptTiming/forcedStyleAndLayoutDuration)：表示脚本处理强制布局/样式所花费的总时间（以毫秒为单位）。请参阅避免布局抖动（[Avoid layout thrashing](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing#avoid\_layout\_thrashing)）以了解导致此问题的原因。
* [`script.invoker`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceScriptTiming/invoker) and [`script.invokerType`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceScriptTiming/invokerType)：表示脚本如何被调用（例如，“IMG#id.onload”或“Window.requestAnimationFrame”）和脚本入口点类型（例如，"`event-listener`"或`resolve-promise`）。
* [`script.pauseDuration`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceScriptTiming/pauseDuration)：表示脚本在“暂停”同步操作（例如 [`Window.alert()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)调用或同步 [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)）上花费的总时间（以毫秒为单位）。
* [`script.sourceCharPosition`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceScriptTiming/sourceCharPosition), [`script.sourceFunctionName`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceScriptTiming/sourceFunctionName), and [`script.sourceURL`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceScriptTiming/sourceURL)：分别表示脚本字符位置、函数名称和脚本URL。值得注意的是，报告的函数名称将是脚本的“入口点”（即堆栈的顶层），而不是任何特定的慢速子函数。 例如，如果事件处理程序调用顶级函数，而顶级函数又调用慢速子函数（slow sub-function），则source\*字段将报告顶级函数的名称和位置，而不是慢速子函数。这是因为性能原因——全栈跟踪成本很高。
* [`script.windowAttribution`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceScriptTiming/windowAttribution) an [`script.window`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceScriptTiming/window)：描述此脚本在顶级文档中执行的容器（即顶级文档或和[`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)）与顶级文档的关系的枚举值，以及对其 [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window)对象的引用。
