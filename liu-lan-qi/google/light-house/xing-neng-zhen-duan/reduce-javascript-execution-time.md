# Reduce JavaScript execution time

当你的JavaScript需要很长时间才能执行时，它会以多种方式降低页面性能：

* **Network cost 网络开销**

&#x20;      More bytes 等价于更长的下载时间 .

* **Parse and compile cost 解析和编译开销**

&#x20;      JS在主线程上被解析和编译。当主线程忙碌中，页面无法及时响应用户输入。

* **Execution cost 执行开销**

&#x20;      **JS也在主线程上执行。**

JavaScript is also executed on the main thread. If your page runs a lot of code before it's really needed, that also delays your [Time To Interactive](https://web.dev/articles/tti), which is one of the key metrics related to how users perceive your page speed.

*   **Memory cost**

    If your JavaScript holds on to a lot of references, it can potentially consume a lot of memory. Pages appear janky or slow when they consume a lot of memory. Memory leaks can cause your page to freeze up completely.



参考

[https://developer.chrome.com/docs/lighthouse/performance/bootup-time/?utm\_source=lighthouse\&utm\_medium=devtools](https://developer.chrome.com/docs/lighthouse/performance/bootup-time/?utm\_source=lighthouse\&utm\_medium=devtools)
