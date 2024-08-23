# js如何获取浏览器的某个域名下所有已经发送的接口
题目展示方式：html、mathjs
解决renderServer服务渲染时mathjs中图片存在渲染不全的问题。

在浏览器中，JavaScript 通常不能获取同源下已发送的接口信息，因为出于安全考虑，浏览器限制了对这些数据的访问。但是，如果你想要监控或者分析网络请求，可以使用浏览器开发者工具（DevTools）中的网络(Network)面板。

如果你是开发者并且想要在自己的网页中获取网络请求信息，你可以使用 PerformanceObserver 接口来监听性能信息，并通过这种方式获取到发出的请求。但这通常用于性能监控，而不是获取所有请求详情。

以下是一个使用 PerformanceObserver 监听网络请求的简单示例：

```js
if (window.PerformanceObserver) {
  let observer = new PerformanceObserver((list) => {
    for (let entry of list.getEntries()) {
      if (entry.initiatorType === 'fetch' || entry.initiatorType === 'xmlhttprequest') {
        console.log(entry); // 这里可以获取到发送的请求信息
      }
    }
  });
  
  observer.observe({ entryTypes: ['resource'] });
}
```

# 渲染缓存

将接口的入参生成MD5的hash值，作为文件名称，将图片存到oss上。在下次渲染前，先生成的hash值，看是不是已经存在，已存在则直接返回文件，否则走渲染生成新的文件，并上传到oss上，然后返回给接口。



