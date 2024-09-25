# User timing(用户自定义）

User timing是Performance API的一部分，允许您使用高精度时间戳来<mark style="background-color:purple;">自定义</mark>测量应用程序的性能，该时间戳是浏览器性能时间线的一部分。

有两种类型的计时性能Entry可用：

* &#x20;PerformanceMark Entry：是您可以在应用程序中的（时间线）任何位置命名和添加的mark。
* &#x20;PerformanceMeasureEntry：是两个marks之间的时间度量。

概念

虽然浏览器为浏览器的性能时间线提供了某些信息（称作entry），例如[Resource Timing API](https://developer.mozilla.org/en-US/docs/Web/API/Performance\_API/Resource\_timing) 所提供的entry 可以帮助我们确定资源事件线上的各项指标，从而分析资源加载的性能。

但是，浏览器无法确定应用程序中发生了什么。例如，当用户单击按钮或在应用程序中执行特定任务时，没有高精度的性能度量。<mark style="color:red;">**User timing API**</mark> <mark style="color:red;"></mark><mark style="color:red;">是浏览器性能时间线的扩展</mark>，可帮助您测量和记录应用程序自定义的性能数据。

通过<mark style="color:red;">**User timing API**</mark> 你可以为你自定义的性能指标命名，这样它也会被集成进Performance 面板。当然它还可以与PerformanceObserver对象等其他性能API配合使用。



## 创建Mark

作为开始衡量应用程序功能性能的第一步，您需要在代码的重要位置添加命名的性能mark。理想情况下，你会浏览你的代码库，确定关键路径和重要任务，以确保它们能够快速执行。

&#x20;[`performance.mark()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark)用于创建一个[`PerformanceMark`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceMark)类型的Entry对象。使用方法如下，接收一个name的入参，最后作为该生成对象的name属性

```javascript
// Place at a location in the code that starts login
performance.mark("login-started");

// Place at a location in the code that finishes login
performance.mark("login-finished");

```

如果name属性不够用，可以添加其他属性：

```javascript
performance.mark("login-started", {
  startTime: 12.5,
  detail: { htmlElement: myElement.id },
});
```



## [Measuring duration between markers](https://developer.mozilla.org/en-US/docs/Web/API/Performance\_API/User\_timing#measuring\_duration\_between\_markers) <a href="#measuring_duration_between_markers" id="measuring_duration_between_markers"></a>

有了上面的mark，就可以测量mark之间的时间。

&#x20;[`Performance.measure()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure)方法用于创建一个[`PerformanceMeasure`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceMeasure) 对象。它接收一个或多个name参数，用来测量两个mark之间的事件。使用方式如下：

```javascript
const loginMeasure = performance.measure(
  "login-duration",
  "login-started",
  "login-finished",
);

console.log(loginMeasure.duration);
```

和mark一样，可以添加其他自定义属性：

例如，您可以使用点击事件中的event.timestamp属性来准确知道用户何时点击登录，并将其测量到UI更新的时间点，即这里的“登录完成”标记。

```javascript
loginButton.addEventListener("click", (clickEvent) => {
  fetch(loginURL).then((data) => {
    renderLoggedInUser(data);

    const marker = performance.mark("login-finished");

    performance.measure("login-click", {
      detail: { htmlElement: myElement.id },
      start: clickEvent.timeStamp,
      end: marker.startTime,
    });
  });
});

```

## 监听[measures](https://developer.mozilla.org/en-US/docs/Web/API/Performance\_API/User\_timing#observing\_performance\_measures)

```javascript
function perfObserver(list, observer) {
  list.getEntries().forEach((entry) => {
    if (entry.entryType === "mark") {
      console.log(`${entry.name}'s startTime: ${entry.startTime}`);
    }
    if (entry.entryType === "measure") {
      console.log(`${entry.name}'s duration: ${entry.duration}`);
    }
  });
}
const observer = new PerformanceObserver(perfObserver);
observer.observe({ entryTypes: ["measure", "mark"] });

```

For more information, see [`PerformanceObserver`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver).

## 检索[markers and measures](https://developer.mozilla.org/en-US/docs/Web/API/Performance\_API/User\_timing#retrieving\_markers\_and\_measures)

为了在单个时间点检索性能标记和度量，performance接口提供了三种方法，如下所示。

* [`performance.getEntries()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntries)

```javascript
const entries = performance.getEntries();
entries.forEach((entry) => {
  if (entry.entryType === "mark") {
    console.log(`${entry.name}'s startTime: ${entry.startTime}`);
  }
  if (entry.entryType === "measure") {
    console.log(`${entry.name}'s duration: ${entry.duration}`);
  }
});

```

* [`performance.getEntriesByType(entryType)`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType)

```javascript
const marks = performance.getEntriesByType("mark");
marks.forEach((entry) => {
  console.log(`${entry.name}'s startTime: ${entry.startTime}`);
});

const measures = performance.getEntriesByType("measure");
measures.forEach((entry) => {
  console.log(`${entry.name}'s duration: ${entry.duration}`);
});

```

* &#x20;[`performance.getEntriesByName(name, entryType)`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByName)&#x20;

```javascript
// Log all marks named "debug-marks"
const debugMarks = performance.getEntriesByName("debug-mark", "mark");
debugMarks.forEach((entry) => {
  console.log(`${entry.name}'s startTime: ${entry.startTime}`);
});

```

## 移除[markers and measures](https://developer.mozilla.org/en-US/docs/Web/API/Performance\_API/User\_timing#removing\_markers\_and\_measures)

由于marks和measures长期占用着内存空间，因此在不用的时候最好手动清除掉。清除marks和measures 提供了两种方式：

* [`performance.clearMarks()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/clearMarks)

```javascript
// Clear all marks
performance.clearMarks();

// Removes the marker with the name "myMarker"
performance.clearMarks("myMarker");

// Clear all measures
performance.clearMeasures();

// Removes the measure with the name "myMeasure"
performance.clearMeasures("myMeasure");

```

* [`performance.clearMeasures()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/clearMeasures)

```javascript
// Clear all marks
performance.clearMarks();

// Removes the marker with the name "myMarker"
performance.clearMarks("myMarker");

// Clear all measures
performance.clearMeasures();

// Removes the measure with the name "myMeasure"
performance.clearMeasures("myMeasure");

```

