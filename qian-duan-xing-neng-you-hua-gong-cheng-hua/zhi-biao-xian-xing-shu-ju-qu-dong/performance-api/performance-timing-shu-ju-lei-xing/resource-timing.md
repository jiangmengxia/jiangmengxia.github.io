# Resource timing

## Resource timing

Resource timing是Performance API的一部分，可以检索和分析详细**加载应用程序的资源**的网络**计时数据**。例如，应用程序可以使用计时指标来确定加载特定资源（如图像或脚本）所需的时间长度，无论是作为页面加载的一部分隐式加载，还是从JavaScript显式加载，例如使用[`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) API。

Resource timing 是由[`PerformanceResourceTiming`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming) entry 对象来表示。它扩展了[`PerformanceEntry`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry) interface，将[`entryType`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry/entryType) 设为`"resource"`

对于每个[`PerformanceResourceTiming`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming)  entry，都将记录一个资源加载时间线，其中包含

* 网络事件的高分辨率时间戳( [high-resolution timestamps](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp))，如重定向开始和结束时间、
* DNS查找开始和结束日期、
* 请求开始、响应开始和结束时间等。

除了时间戳外，还包括提供有关资源信息的其他属性，如获取的资源的大小或启动获取的资源类型。

## 1 资源加载时间线 <a href="#resource_loading_timestamps" id="resource_loading_timestamps"></a>



<figure><img src="../../../../.gitbook/assets/{05D9B370-1EA0-44BC-8FC4-C6BE76E07963}.png" alt=""><figcaption></figcaption></figure>

以下是资源加载的指标，可以采用网络重定向、DNS寻址、链接、请求、响应这几个步骤去记忆大部分的指标。

* startTime：资源加载过程开始前的时间戳。
* redirectStart：启动重定向的获取的时间戳。&#x20;
* redirectEnd：在收到对上次重定向的响应的最后一个字节后立即加上时间戳。&#x20;
* workerStart：启动Service Worker线程之前的时间戳。&#x20;
* fetchStart：浏览器开始获取资源之前的时间戳。&#x20;
* domainLookupStart：浏览器开始查找资源域名之前的时间戳。&#x20;
* domainLookupEnd：浏览器完成对资源的域名查找后的时间戳。&#x20;
* connectStart：在用户代理开始建立与服务器的连接以检索资源之前的时间戳
* secureConnectionStart：如果资源是通过安全连接加载的，请在浏览器开始握手过程之前立即标记时间戳，以保护当前连接。&#x20;
* connectEnd：浏览器完成与服务器的连接以检索资源后立即加上时间戳。&#x20;
* requestStart：浏览器开始向服务器、缓存或本地资源请求资源之前的时间戳。&#x20;
* responseStart：浏览器从服务器、缓存或本地资源接收到响应的第一个字节后的时间戳。&#x20;
* responseEnd：浏览器收到资源的最后一个字节后或传输连接关闭前的时间戳，以先到者为准。

可以通过以下方式获取以上所有的指标。

```javascript
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const request = entry.responseStart - entry.requestStart;
    if (request > 0) {
      console.log(`${entry.name}: Request time: ${request}ms`);
    }
  });
});

observer.observe({ type: "resource", buffered: true });
```

## 2 [Resource size](https://developer.mozilla.org/en-US/docs/Web/API/Performance\_API/Resource\_timing#resource\_size) <a href="#resource_size" id="resource_size"></a>

PerformanceResourceTiming接口有三个属性，可用于获取有关资源的大小数据。

* transferSize属性返回获取的资源的大小（以字节为单位），包括响应头字段和响应有效载荷正文。&#x20;
* encodedBodySize属性返回在删除任何应用的内容编码之前，从有效负载主体的获取（HTTP或缓存）接收到的大小（以八位字节为单位）。
* decodedBodySize返回在删除任何应用的内容编码后从消息正文的获取（HTTP或缓存）接收到的大小（以八位字节为单位）。

## 3 [Other properties](https://developer.mozilla.org/en-US/docs/Web/API/Performance\_API/Resource\_timing#other\_properties) <a href="#other_properties" id="other_properties"></a>

参考 [additional resources information](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming#additional\_resource\_information)

## 4 传统资源计时指标[Typical resource timing metrics](https://developer.mozilla.org/en-US/docs/Web/API/Performance\_API/Resource\_timing#typical\_resource\_timing\_metrics) <a href="#typical_resource_timing_metrics" id="typical_resource_timing_metrics"></a>

* 测量TCP握手时间（connectEnd-connectStart）&#x20;
* 测量DNS查找时间（domainLookupEnd-domainLookupStart）
* 测量重定向时间（redirectEnd-redirectStart）&#x20;
* 测量请求时间（responseStart-requestStart）&#x20;
* 测量TLS协商时间（requestStart-secureConnectionStart）&#x20;
* 测量获取时间（无重定向）（responseEnd-fetchStart）&#x20;
* 测量ServiceWorker处理时间（fetchStart-workerStart）&#x20;
* 检查内容是否已压缩（decodedBodySize不应编码为BodySize）
* 检查本地缓存是否命中（transferSize应为0）&#x20;
* 检查是否使用了现代和快速的协议（nextHopProtocol应该是HTTP/2或HTTP/3）&#x20;
* 检查是否正确的资源是渲染阻塞（renderBlockingStatus）

## 2.3.5 [Cross-origin timing information](https://developer.mozilla.org/en-US/docs/Web/API/Performance\_API/Resource\_timing#cross-origin\_timing\_information) <a href="#cross-origin_timing_information" id="cross-origin_timing_information"></a>

<mark style="color:red;">当CORS生效时，许多计时属性的值将返回为零</mark>，除非服务器的访问策略允许共享这些值。这要求提供资源的服务器发送[`Timing-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Timing-Allow-Origin)响应标头，其中包含一个值，该值指定了允许获取受限时间戳值的一个或多个来源。&#x20;

从网页本身以外的源加载资源时，默认情况下返回为0的属性：redirectStart、redirectEnd、domainLookupStart、domainLookupEnd、connectStart、connectEnd、secureConnectionStart、requestStart和responseStart。&#x20;

例如，为了允许https://developer.mozilla.org为了查看资源定时信息，跨源资源应发送：

```javascript
Timing-Allow-Origin: https://developer.mozilla.org
```

## 2.3.6 [Managing resource buffer sizes](https://developer.mozilla.org/en-US/docs/Web/API/Performance\_API/Resource\_timing#managing\_resource\_buffer\_sizes) <a href="#managing_resource_buffer_sizes" id="managing_resource_buffer_sizes"></a>

如果您的网站或应用程序获取了250多个资源，并且您想记录250多个PerformanceResourceTiming条目，则需要增加资源计时缓冲区的大小。

&#x20;要设置浏览器性能资源数据缓冲区的大小，请使用 [`Performance.setResourceTimingBufferSize()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/setResourceTimingBufferSize)方法，要清除浏览器性能资源的数据缓冲区，请使用 [`Performance.clearResourceTimings()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/clearResourceTimings) 方法。

&#x20;要在浏览器的资源计时缓冲区已满时收到通知，请监听 [`resourcetimingbufferfull`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/resourcetimingbufferfull\_event) 事件。

通过以下方式可以自定义设置资源计时的缓存大小。更多缓存相关信息请移步[Managing buffer sizes](https://developer.mozilla.org/en-US/docs/Web/API/Performance\_API/Performance\_data#managing\_buffer\_sizes)。

```
performance.setResourceTimingBufferSize(500);
```
