<!--
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-08-13 11:06:53
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-08-15 14:52:25
 * @FilePath: \jiangmengxia.github.io\tools\performance-index.md
 * @Description: Description
-->
# 网页性能指标收集工具

## Performance API

`Performance API` 是一个 Web API，用于获取网页加载过程中的性能信息。它提供了多个接口和属性，可以用来测量和报告网页的关键性能指标（Key Performance Indicators，KPIs）。以下是一些常见的 `Performance API` 接口和属性：

1. **Performance**：`Performance` 接口提供了与页面性能相关的信息。它是一个全局对象，可以通过 `window.performance` 访问。

2. **PerformanceTiming**：`PerformanceTiming` 接口提供了与页面加载过程相关的时间戳。它是一个 `Performance` 对象的属性，可以通过 `performance.timing` 访问。

3. **PerformanceNavigationTiming**：`PerformanceNavigationTiming` 接口提供了与页面导航相关的时间戳。它是一个 `Performance` 对象的属性，可以通过 `performance.getEntriesByType('navigation')` 访问。

4. **PerformancePaintTiming**：`PerformancePaintTiming` 接口提供了与页面绘制相关的时间戳。它是一个 `Performance` 对象的属性，可以通过 `performance.getEntriesByType('paint')` 访问。

5. **PerformanceResourceTiming**：`PerformanceResourceTiming` 接口提供了与页面加载过程中各个资源相关的时间戳。它是一个 `Performance` 对象的属性，可以通过 `performance.getEntriesByType('resource')` 访问。

6. **PerformanceObserver**：`PerformanceObserver` 接口用于观察性能条目（performance entries）。它是一个全局对象，可以通过 `window.PerformanceObserver` 访问。

7. **PerformanceEntry**：`PerformanceEntry` 接口表示一个性能条目。它是一个 `PerformanceObserver` 的回调函数的参数。

这些接口和属性可以帮助开发者了解网页加载的性能，从而进行优化。例如，如果某个资源的 `responseEnd` 和 `responseStart` 之间的时间差很大，可能意味着这个资源需要很长时间才能加载完成，可以尝试优化这个资源的加载。

希望这个解释对你有帮助！

## PerformanceTiming 接口（较旧接口）

`PerformanceTiming` 是一个 Web API 接口，用于获取网页加载过程中的性能信息。它提供了多个属性，每个属性都表示一个时间戳，用于记录网页加载过程中的各个阶段。以下是一些常见的 `PerformanceTiming` 属性：

- `navigationStart`：页面开始加载的时间戳。
- `unloadEventStart`：前一个页面的 unload 事件开始的时间戳。
- `unloadEventEnd`：前一个页面的 unload 事件结束的时间戳。
- `redirectStart`：第一个重定向开始的时间戳。
- `redirectEnd`：最后一个重定向结束的时间戳。
- `fetchStart`：浏览器开始请求页面的时间戳。
- `domainLookupStart`：浏览器开始进行 DNS 查询的时间戳。
- `domainLookupEnd`：DNS 查询结束的时间戳。
- `connectStart`：浏览器开始建立 TCP 连接的时间戳。
- `connectEnd`：TCP 连接建立结束的时间戳。
- `secureConnectionStart`：浏览器开始进行 SSL/TLS 握手的时间戳。
- `requestStart`：浏览器开始发送请求的时间戳。
- `responseStart`：浏览器收到响应的第一个字节的时间戳。
- `responseEnd`：浏览器收到响应的最后一个字节的时间戳。
- `domLoading`：浏览器开始解析 HTML 文档的时间戳。
- `domInteractive`：浏览器完成解析 HTML 文档，并开始加载子资源的时间戳。
- `domContentLoadedEventStart`：DOMContentLoaded 事件开始的时间戳。
- `domContentLoadedEventEnd`：DOMContentLoaded 事件结束的时间戳。
- `domComplete`：浏览器完成解析 HTML 文档，并加载完所有子资源的时间戳。
- `loadEventStart`：load 事件开始的时间戳。
- `loadEventEnd`：load 事件结束的时间戳。

这些时间戳可以帮助开发者了解网页加载的性能，从而进行优化。例如，如果 `domInteractive` 和 `domContentLoadedEventStart` 之间的时间差很大，可能意味着页面中有大量的 JavaScript 需要执行，可以尝试优化 JavaScript 的加载和执行。

### PerformanceNavigationTiming 接口（较新接口）

`PerformanceNavigationTiming` 是一个 Web API 接口，用于获取网页加载过程中各个资源的时间戳。它提供了多个属性，每个属性都表示一个时间戳，用于记录资源加载过程中的各个阶段。以下是一些常见的 `PerformanceNavigationTiming` 属性：

- `startTime`：资源请求开始的时间戳。
- `duration`：资源加载的总时间。
- `redirectStart`：第一个重定向开始的时间戳。
- `redirectEnd`：最后一个重定向结束的时间戳。
- `fetchStart`：浏览器开始请求资源的时间戳。
- `domainLookupStart`：浏览器开始进行 DNS 查询的时间戳。
- `domainLookupEnd`：DNS 查询结束的时间戳。
- `connectStart`：浏览器开始建立 TCP 连接的时间戳。
- `connectEnd`：TCP 连接建立结束的时间戳。
- `secureConnectionStart`：浏览器开始进行 SSL/TLS 握手的时间戳。
- `requestStart`：浏览器开始发送请求的时间戳。
- `responseStart`：浏览器收到响应的第一个字节的时间戳。
- `responseEnd`：浏览器收到响应的最后一个字节的时间戳。

这些时间戳可以帮助开发者了解网页加载过程中各个资源的性能，从而进行优化。例如，如果某个资源的 `responseEnd` 和 `responseStart` 之间的时间差很大，可能意味着这个资源需要很长时间才能加载完成，可以尝试优化这个资源的加载。

以下是一个使用 `PerformanceNavigationTiming` 的例子：

```javascript
if ('performance' in window) {
  const resourceTiming = window.performance.getEntriesByType('navigation');
  resourceTiming.forEach((resource) => {
    console.log('Resource:', resource.name);
    console.log('Start Time:', resource.startTime);
    console.log('Duration:', resource.duration);
    console.log('Redirect Start:', resource.redirectStart);
    console.log('Redirect End:', resource.redirectEnd);
    console.log('Fetch Start:', resource.fetchStart);
    console.log('Domain Lookup Start:', resource.domainLookupStart);
    console.log('Domain Lookup End:', resource.domainLookupEnd);
    console.log('Connect Start:', resource.connectStart);
    console.log('Connect End:', resource.connectEnd);
    console.log('Secure Connection Start:', resource.secureConnectionStart);
    console.log('Request Start:', resource.requestStart);
    console.log('Response Start:', resource.responseStart);
    console.log('Response End:', resource.responseEnd);
  });
}
```

在这个例子中，我们使用 `window.performance.getEntriesByType('navigation')` 获取所有的资源加载时间戳，然后遍历每个资源，打印出各个时间戳的信息。

### PerformancePaintTiming 接口

`PerformancePaintTiming` 是一个 Web API 接口，用于获取浏览器绘制网页的各个阶段的时间戳。它提供了以下两个属性：

- `first-paint`：浏览器完成首次绘制的时间戳。这个绘制可能包括文本、图像等。
- `first-contentful-paint`：浏览器完成首次内容绘制的时间戳。这个绘制可能包括文本、图像等，但不包括背景色。

这两个时间戳可以帮助开发者了解网页的首次绘制性能，从而进行优化。例如，如果 `first-contentful-paint` 的时间戳很大，可能意味着页面中有大量的 JavaScript 需要执行，可以尝试优化 JavaScript 的加载和执行。

### PerformanceResourceTiming 接口

`PerformanceResourceTiming` 是一个 Web API 接口，用于获取网页加载过程中各个资源的性能信息。它提供了多个属性，每个属性都表示一个时间戳，用于记录资源加载过程中的各个阶段。以下是一些常见的 `PerformanceResourceTiming` 属性：

- `startTime`：资源请求开始的时间戳。
- `duration`：资源加载的总时间。
- `redirectStart`：第一个重定向开始的时间戳。
- `redirectEnd`：最后一个重定向结束的时间戳。
- `fetchStart`：浏览器开始请求资源的时间戳。
- `domainLookupStart`：浏览器开始进行 DNS 查询的时间戳。
- `domainLookupEnd`：DNS 查询结束的时间戳。
- `connectStart`：浏览器开始建立 TCP 连接的时间戳。
- `connectEnd`：TCP 连接建立结束的时间戳。
- `secureConnectionStart`：浏览器开始进行 SSL/TLS 握手的时间戳。
- `requestStart`：浏览器开始发送请求的时间戳。
- `responseStart`：浏览器收到响应的第一个字节的时间戳。
- `responseEnd`：浏览器收到响应的最后一个字节的时间戳。

这些时间戳可以帮助开发者了解网页加载过程中各个资源的性能，从而进行优化。例如，如果某个资源的 `responseEnd` 和 `responseStart` 之间的时间差很大，可能意味着这个资源需要很长时间才能加载完成，可以尝试优化这个资源的加载。

以下是一个使用 `PerformanceResourceTiming` 的例子：

```javascript
if ('performance' in window) {
  const resourceTiming = window.performance.getEntriesByType('resource');
  resourceTiming.forEach((resource) => {
    console.log('Resource:', resource.name);
    console.log('Start Time:', resource.startTime);
    console.log('Duration:', resource.duration);
    console.log('Redirect Start:', resource.redirectStart);
    console.log('Redirect End:', resource.redirectEnd);
    console.log('Fetch Start:', resource.fetchStart);
    console.log('Domain Lookup Start:', resource.domainLookupStart);
    console.log('Domain Lookup End:', resource.domainLookupEnd);
    console.log('Connect Start:', resource.connectStart);
    console.log('Connect End:', resource.connectEnd);
    console.log('Secure Connection Start:', resource.secureConnectionStart);
    console.log('Request Start:', resource.requestStart);
    console.log('Response Start:', resource.responseStart);
    console.log('Response End:', resource.responseEnd);
  });
}
```


### webvitas

`webvitals` 是一个 JavaScript 库，用于测量和报告网页的关键性能指标（Key Performance Indicators，KPIs）。这些指标包括：

- **首次内容绘制（First Contentful Paint，FCP）**：浏览器首次绘制文本、图片、非空白 canvas 或 SVG 等内容的时间。
- **首次有效绘制（First Meaningful Paint，FMP）**：页面主要内容开始呈现的时间。
- **首次输入延迟（First Input Delay，FID）**：用户首次与页面交互（如点击链接、按钮等）到浏览器实际响应该交互的时间。
- **最大内容绘制（Largest Contentful Paint，LCP）**：最大内容元素（如图片或文本块）完全加载并渲染的时间。
- **累积布局偏移（Cumulative Layout Shift，CLS）**：页面在加载过程中发生的所有布局偏移的总和。

`webvitals` 库提供了一些函数，可以测量这些指标，并将结果发送到服务器或进行其他处理。例如，可以使用 `webvitals.getCLS()` 函数测量 CLS，并使用 `webvitals.onCLS()` 函数在页面加载时自动测量 CLS。

以下是一个使用 `webvitals` 库的例子：

```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'webvitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```





