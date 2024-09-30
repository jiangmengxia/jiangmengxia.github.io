# PerformanceEventTiming



Event Timing API 的 `PerformanceEventTiming`  ，可帮助深入了解用户交互触发的某些事件类型的延迟。

此API通过为某些事件类型提供事件时间戳和持续时间来实现对缓慢事件的可见性（请参见下文）。例如，您可以监视用户操作与其事件处理程序开始之间的时间，或者事件处理程序运行所需的时间。

这个API对于测量 **首次输入延迟** （FID）特别有用：从用户首次与应用程序交互到浏览器实际能够响应该交互的时间。

您通常通过创建 `PerformanceObserver` 实例，然后调用其 `observe()` 方法，传入“event”或“first input”作为类型选项的值来处理PerformanceEventTiming对象。然后，将使用您可以分析的PerformanceEventTiming对象列表调用PerformanceObserver对象的回调。更多信息请参见下面的示例。

默认情况下，当 PerformanceEventTiming Entry 的持续时间为104ms或更长时，它们将被公开。研究表明，未在100ms内处理的用户输入被认为是缓慢的，104ms是大于100ms的8的第一个倍数（出于安全原因，此API四舍五入到最接近的8ms倍数）。但是，您可以使用 `observe()` 方法中的 `durationThreshold`  选项将 PerformanceObserver 设置为不同的**阈值**。



## 暴露的事件

Event Timing API所暴露的接口：

| Click events       | [`auxclick`](https://developer.mozilla.org/en-US/docs/Web/API/Element/auxclick\_event), [`click`](https://developer.mozilla.org/en-US/docs/Web/API/Element/click\_event), [`contextmenu`](https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu\_event), [`dblclick`](https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick\_event)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Composition events | [`compositionend`](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend\_event), [`compositionstart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart\_event), [`compositionupdate`](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionupdate\_event)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Drag & drop events | [`dragend`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragend\_event), [`dragenter`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragenter\_event), [`dragleave`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragleave\_event), [`dragover`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragover\_event), [`dragstart`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragstart\_event), [`drop`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drop\_event)                                                                                                                                                                                                                                                                                                                                       |
| Input events       | [`beforeinput`](https://developer.mozilla.org/en-US/docs/Web/API/Element/beforeinput\_event), [`input`](https://developer.mozilla.org/en-US/docs/Web/API/Element/input\_event)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Keyboard events    | [`keydown`](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown\_event), [`keypress`](https://developer.mozilla.org/en-US/docs/Web/API/Element/keypress\_event), [`keyup`](https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup\_event)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Mouse events       | [`mousedown`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown\_event), [`mouseenter`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter\_event), [`mouseleave`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave\_event), [`mouseout`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout\_event), [`mouseover`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover\_event), [`mouseup`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup\_event)                                                                                                                                                                                                                                                                                                                                                 |
| Pointer events     | [`pointerover`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerover\_event), [`pointerenter`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerenter\_event), [`pointerdown`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerdown\_event), [`pointerup`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerup\_event), [`pointercancel`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointercancel\_event), [`pointerout`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerout\_event), [`pointerleave`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerleave\_event), [`gotpointercapture`](https://developer.mozilla.org/en-US/docs/Web/API/Element/gotpointercapture\_event), [`lostpointercapture`](https://developer.mozilla.org/en-US/docs/Web/API/Element/lostpointercapture\_event) |
| Touch events       | [`touchstart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchstart\_event), [`touchend`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchend\_event), [`touchcancel`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchcancel\_event)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

以上均是**离散事件**，其他事件未支持，是因为其他事件属于“**持续事件**”，它们在这里还无法获得有意义的性能指标，比如：[`mousemove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove\_event), [`pointermove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove\_event), [`pointerrawupdate`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerrawupdate\_event), [`touchmove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchmove\_event), [`wheel`](https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel\_event), [`drag`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drag\_event)。

你可以通过以下方式获得所有暴露的事件：

```javascript
const exposedEventsList = [...performance.eventCounts.keys()];
```



## 获取Event Timing 信息

```javascript
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    // Full duration
    const duration = entry.duration;

    // Input delay (before processing event)
    const delay = entry.processingStart - entry.startTime;

    // Synchronous event processing time
    // (between start and end dispatch)
    const eventHandlerTime = entry.processingEnd - entry.processingStart;
    console.log(`Total duration: ${duration}`);
    console.log(`Event delay: ${delay}`);
    console.log(`Event handler duration: ${eventHandlerTime}`);
  });
});

// Register the observer for events
observer.observe({ 
type: "event", 
buffered: true,
durationThreshold:16 // 可选参数，默认104ms，最小16ms
});

```



## [Reporting the First Input Delay (FID)](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEventTiming#reporting\_the\_first\_input\_delay\_fid) <a href="#reporting_the_first_input_delay_fid" id="reporting_the_first_input_delay_fid"></a>

```javascript
// Keep track of whether (and when) the page was first hidden, see:
// https://github.com/w3c/page-visibility/issues/29
// NOTE: ideally this check would be performed in the document <head>
// to avoid cases where the visibility state changes before this code runs.
let firstHiddenTime = document.visibilityState === "hidden" ? 0 : Infinity;
document.addEventListener(
  "visibilitychange",
  (event) => {
    firstHiddenTime = Math.min(firstHiddenTime, event.timeStamp);
  },
  { once: true },
);

// Sends the passed data to an analytics endpoint. This code
// uses `/analytics`; you can replace it with your own URL.
function sendToAnalytics(data) {
  const body = JSON.stringify(data);
  // Use `navigator.sendBeacon()` if available,
  // falling back to `fetch()`.
  (navigator.sendBeacon && navigator.sendBeacon("/analytics", body)) ||
    fetch("/analytics", { body, method: "POST", keepalive: true });
}

// Use a try/catch instead of feature detecting `first-input`
// support, since some browsers throw when using the new `type` option.
// https://webkit.org/b/209216
try {
  function onFirstInputEntry(entry) {
    // Only report FID if the page wasn't hidden prior to
    // the entry being dispatched. This typically happens when a
    // page is loaded in a background tab.
    if (entry.startTime < firstHiddenTime) {
      const fid = entry.processingStart - entry.startTime;

      // Report the FID value to an analytics endpoint.
      sendToAnalytics({ fid });
    }
  }

  // Create a PerformanceObserver that calls
  // `onFirstInputEntry` for each entry.
  const po = new PerformanceObserver((entryList) => {
    entryList.getEntries().forEach(onFirstInputEntry);
  });

  // Observe entries of type `first-input`, including buffered entries,
  // i.e. entries that occurred before calling `observe()` below.
  po.observe({
    type: "first-input",
    buffered: true,
  });
} catch (e) {
  // Do nothing if the browser doesn't support this API.
}

```
