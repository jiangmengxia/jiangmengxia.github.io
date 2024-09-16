# webpack proxy跨域

我们在使用webpack在dev环境下构建项目并启动运行的时候，与后端接口联调时，往往会遇到跨域问题。

跨域问题的原因来自于浏览器的同源策略。关于同源策略，请查阅：

此处为语雀内容卡片，点击链接查看：[https://www.yuque.com/jiangmengxia-uvyxh/mzdsxg/tp84bl](https://www.yuque.com/jiangmengxia-uvyxh/mzdsxg/tp84bl)

## webpack proxy跨域思路 <a href="#a58go" id="a58go"></a>

同源策略是浏览器需要遵循的标准，而如果是服务器向服务器请求就无需遵循同源策略**。** 代理服务器主要实现了**转发浏览器请求**和**转发服务器的响应**。

代理服务器一般有两种方案，一个是正向代理，一个是反向代理。这两种方式在👇🏻文档中有详细讲过。

此处为语雀内容卡片，点击链接查看：[https://www.yuque.com/go/doc/67562679](https://www.yuque.com/go/doc/67562679)

webpack proxy工作原理实质上是利用http-proxy-middleware 这个http代理中间件，实现请求转发给其他服务器。

**http-proxy-middleware采用的是反向代理的策略**。

[https://www.cnblogs.com/houxianzhou/p/14743623.html](https://www.cnblogs.com/houxianzhou/p/14743623.html)
