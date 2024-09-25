# Service Timing(不常用）

Server-Timing是Performance API的一部分，它允许服务器将有关请求-响应周期内的度量指标传递给UA (一般指浏览器）。您可以收集这些信息，并以与使用Performance API处理的所有其他指标相同的方式对服务器端指标进行操作。

大概意思是，通过请求头中插入一些Service Timing类型的请求头，可以获取后端的一些性能指标。

## [Sending server metrics](https://developer.mozilla.org/en-US/docs/Web/API/Performance\_API/Server\_timing#sending\_server\_metrics) <a href="#sending_server_metrics" id="sending_server_metrics"></a>

&#x20;[`Server-Timing`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server-Timing) HTTP header 用于显示任何后端服务器定时指标。例如，您可能希望发送数据库读/写操作时间、CPU时间和文件系统访问。

您可以发送带值或不带值的指标。这些指标可以选择性地包含描述。建议尽量缩短名称、描述和数据，以尽量减少HTTP开销。

Examples of `Server-Timing` headers:

```javascript
// Single metric without value
Server-Timing: missedCache

// Single metric with value
Server-Timing: cpu;dur=2.4

// Single metric with description and value
Server-Timing: cache;desc="Cache Read";dur=23.2

// Two metrics with values
Server-Timing: db;dur=53, app;dur=47.2

// Server-Timing as trailer
Trailer: Server-Timing
--- response body ---
Server-Timing: total;dur=123.4

```

要计算真实的服务器端指标，请参阅服务器端CMS、框架或编程语言的文档，了解如何衡量后端应用程序的性能。如果您的服务器使用Node.js，那么浏览器中的性能API会非常熟悉性能测量API。这是因为Node.js性能模块是W3C Web性能API的一个子集，也是Node.js特定性能测量的附加API。有关更多信息，请参阅Node.js性能文档 [Node.js performance documentation](https://nodejs.org/api/perf\_hooks.html#performance-measurement-apis)。

请注意，服务器、客户端和任何中间代理之间没有时钟同步。这意味着，如果您的服务器发送时间戳或startTime，则该值可能无法有意义地映射到客户端时间线的startTime。

一旦计算出所需的指标，服务器需要在其响应中发送ServerTiming标头。有关如何在Node.js中发送标头的示例，请参阅服务器计时参考页面 [`Server-Timing`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server-Timing)。



## [Retrieving（检索） server metrics](https://developer.mozilla.org/en-US/docs/Web/API/Performance\_API/Server\_timing#retrieving\_server\_metrics) <a href="#retrieving_server_metrics" id="retrieving_server_metrics"></a>

服务器计时指标通常出现在浏览器的开发人员工具中，但它们也存储为 [`PerformanceServerTiming`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceServerTiming) p性能entry，您可以像访问其他性能数据一样访问这些entry。然而，它们本身并没有“Service Timing”entry。<mark style="color:red;">PerformanceServerTiming对象可以从“Navigation”和“Resource”性能 entry 中观察到</mark>。您可以从[`PerformanceResourceTiming.serverTiming`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/serverTiming)属性访问服务器指标，该属性是PerformanceServerTiming对象的数组。

A `PerformanceObserver` can log the entries on the client side with the following code:

```javascript
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    entry.serverTiming.forEach((serverEntry) => {
      console.log(
        `${serverEntry.name} (${serverEntry.description}) duration: ${serverEntry.duration}`,
      );
      // Logs "cache (Cache Read) duration: 23.2"
      // Logs "db () duration: 53"
      // Logs "app () duration: 47.2"
    });
  });
});

["navigation", "resource"].forEach((type) =>
  observer.observe({ type, buffered: true }),
);

```
