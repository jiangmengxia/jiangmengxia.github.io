# 高精度时间 High precision timing

Performance API可以进行高精度的度量，这都是得益于“<mark style="background-color:purple;">潜在亚毫秒分辨率的时间</mark>”和“<mark style="background-color:purple;">不受系统时钟偏斜或调整影响的稳定单调时钟</mark>”的高精度测量。

需要**高分辨率计时器**来进行精确的基准测试，而不是不太精确和非单调的日期时间戳。 本页概述了高精度时间在Performance API中的工作方式以及与日期时间戳的比较。

## 1 [`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/Performance\_API/High\_precision\_timing#domhighrestimestamp) <a href="#domhighrestimestamp" id="domhighrestimestamp"></a>

通过使用[`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp)类型作为时间值来实现高精度计时。单位为毫秒，应精确到5µs（微秒）。但是，如果浏览器无法提供精确到5微秒的时间值，则浏览器可以将该值表示为精确到毫秒的毫秒时间。这可能是由于硬件/软件限制或安全和隐私原因造成的。有关更多信息，请参阅下面关于降低精度的部分（ [reduced precision](https://developer.mozilla.org/en-US/docs/Web/API/Performance\_API/High\_precision\_timing#reduced\_precision)）。 性能API中的所有时间戳都使用[`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp)类型。以前，Performance API（和其他Web API）使用`EpochTimeStamp`类型（以前称为DOMTimeStamp）。这些类型现在不被鼓励。

## 2 [`Performance.now()` vs. `Date.now()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance\_API/High\_precision\_timing#performance.now\_vs.\_date.now) <a href="#performance.now_vs._date.now" id="performance.now_vs._date.now"></a>

JavaScript将 `Date.now()` 定义为自历元 ([epoch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Date#the\_epoch\_timestamps\_and\_invalid\_date)) 以来经过的毫秒数，历元定义为1970年1月1日UTC开始的午夜。另一方面，`performance.now()` 方法与 [`Performance.timeOrigin`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/timeOrigin) 属性有关。有关更多信息，请参阅下面的 [time origins section](https://developer.mozilla.org/en-US/docs/Web/API/Performance\_API/High\_precision\_timing#time\_origins) 部分。

JavaScript 的`Date` times 会受到系统时钟偏差或调整的影响。这意味着时间的值可能并不总是单调递增的。Date对象的主要目的是向用户显示时间和日期信息，因此许多操作系统都运行一个定期同步时间的守护进程。时钟可能每小时调整几毫秒。

`performance.now()` 方法（和所有其他 `DOMHighResTimeStamp` 值）提供单调递增的时间值，不受时钟调整的影响。这意味着它保证DOMHighResTimeStamp值至少等于（如果不大于）您上次访问它的时间。

```javascript
Date.now(); // 1678889977578
performance.now(); // 233936
```

为了测量性能、计算精确的帧速率（FPS）、动画循环等，请使用`performance.now()`而不是JavaScript的`Date.new()`提供的单调递增的高分辨率时间。

| -                        | [`Performance.now()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)             | [`Date.now()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Date/now) |
| ------------------------ | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Resolution               | sub-milliseconds                                                                                    | milliseconds                                                                                               |
| Origin                   | [`Performance.timeOrigin`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/timeOrigin) | Unix Epoch (January 1, 1970, UTC)                                                                          |
| Use clock adjustments    | No                                                                                                  | Yes                                                                                                        |
| Monotonically increasing | Yes                                                                                                 | No                                                                                                         |

## 3 时间起源 [Time origins](https://developer.mozilla.org/en-US/docs/Web/API/Performance\_API/High\_precision\_timing#time\_origins) <a href="#time_origins" id="time_origins"></a>

The Performance API 使用 [`Performance.timeOrigin`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/timeOrigin) 属性决定performance-related 的时间戳的基线。所有`DOMHighResTimeStamp` 时间 都与 `timeOrigin` 属性相关联。

在window上下文中，这个时间基线是当前导航（navigation ）开始的时间。

在 [`Worker`](https://developer.mozilla.org/en-US/docs/Web/API/Worker) and [`ServiceWorker`](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker)这个时间基线是当前worker启动的时间。

```javascript
// Level 1 (clock change risks)
currentTime = performance.timing.navigationStart + performance.now();

// Level 2 (no clock change risks)
currentTime = performance.timeOrigin + performance.now();

```

## 4 降低的精确度 [Reduced precision](https://developer.mozilla.org/en-US/docs/Web/API/Performance\_API/High\_precision\_timing#reduced\_precision) <a href="#reduced_precision" id="reduced_precision"></a>

为了防止定时攻击和指纹识别（[fingerprinting](https://developer.mozilla.org/en-US/docs/Glossary/Fingerprinting)），DOMHighResTimeStamp类型根据站点隔离状态进行了粗化。

* Resolution in isolated contexts（隔离上下文）: 5 microseconds
* Resolution in non-isolated contexts（非隔离上下文）: 100 microseconds

如果你想要让你的站点跨域隔离（cross-origin isolation）使用 [`Cross-Origin-Opener-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy) (COOP) and [`Cross-Origin-Embedder-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy) (COEP) headers:

```javascript
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

这些标题<mark style="color:red;">确保</mark><mark style="color:red;">**顶级文档**</mark><mark style="color:red;">不会与</mark><mark style="color:red;">**跨源文档**</mark><mark style="color:red;">共享浏览上下文组</mark>。[`Cross-Origin-Opener-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy)策略过程隔离了您的文档，如果潜在攻击者在弹出窗口中打开它，他们将无法访问您的全局对象，从而防止了一系列被称为 [XS-Leaks](https://github.com/xsleaks/xsleaks)的跨源攻击。
