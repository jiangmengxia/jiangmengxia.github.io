# 发展历程

HTTP是基于TCP/IP协议的应用层协议，是Client-Service通信的主流协议，共经历了4个版本

● <mark style="color:purple;">HTTP 0.9 -> HTTP 1.0 -> HTTP 1.1 -> HTTP 2</mark>

<mark style="color:purple;">● 未来HTTP3.0</mark>

## 1. HTTP 0.9

最初版本的HTTP协议并没有版本号，后来为了与之后版本进行区分，才定为版本0.9的。HTTP/0.9 极其简单：请求由单行指令构成，以唯一可用方法GET开头，其后跟目标资源的路径（一旦连接到服务器，协议、服务器、端口号这些都不是必须的）。

【特点】

● 只支持HTML

● 仅支持get

● 无请求头和响应头（只有响应内容）

【请求内容】

● 仅支持get

● get + 资源名称

请求头

```
GET /mypage.html
```

响应体

```
<HTML> 这是一个非常简单的HTML页面 </HTML>
```

## 2. HTTP 1.0

由于浏览器和服务器各种不同厂商，急需构建可扩展性，新增了：

* HTTP协议版本
* User-Agent
* 请求的状态码
* 引入了HTTP请求头的概念
  * 通过content-type允许传输除了纯文本以外的文本

【特点】

● 提供header，根据header不同来处理不同类型（contentType）的资源

● 每次发完请求都要创建TCP链接

● 并且有Client端和Server端都有队头阻塞问题

存在的问题：

● 无法复用连接，每次请求都需要建立三次握手建立连接，完成交互后进行四次挥手断开连接。

● 对头阻塞，规定后一个请求，必须在接受到前一个请求的响应后才能发送。

<figure><img src="../../.gitbook/assets/image (3) (1).png" alt=""><figcaption><p>http1</p></figcaption></figure>

## 3. HTTP 1.1 - 标准化的协议

HTTP/1.0定义的它存在局限性，并非官方标准。而HTTP/1.1才是官方标准。HTTP/1.1 消除了大量歧义内容并引入了多项改进：

### 3.1 复用连接

节省了多次打开TCP连接加载网页文档资源的时间,长连接：新增Connection字段，可以设置keep-alive值保持连接不断开， 默认在TCP链接上，可以处理多个请求，也就是链接复用

<figure><img src="../../.gitbook/assets/image (1) (1) (2) (1).png" alt=""><figcaption></figcaption></figure>

### 3.2 管线化技术

是Http请求整批送出的技术，再传送过程中无需等待服务器返回。它允许在第一个应答响应前就发送第二个请求，降低通信延迟。

● 管线化机制

须透过永久连线完成，并且只有 GET 和 HEAD 等要求可以进行管线化，非幂等的方法，例如POST将不会被管线化。连续的 GET 和 HEAD 请求总可以管线化的。一个连续的幂等请求，如 GET，HEAD，PUT，DELETE，是否可以被管线化取决于一连串请求是否依赖于其他的。此外，初次建立连线时也不应启动管线机制，因为服务器不一定支援 HTTP/1.1 版本的协定。HTTP 管线化同时依赖于客户端和服务器的支持。

● TCP连接复用（Chrome机制）

http1.1协议Chrome限制一个域名下，最多可以建立6个TCP连接，可以通过6个TCP连接进行链路复用，如果有多余的请求，则需进行排队。

### 3.3 支持响应分块

适用于大数据传输，断点传输在此技术上进一步实现。

一方面，当数据包数据量过大，对于网络中的各种通信设备（路由器等）非常不友好，排队过程中会导致内存溢出、内存不足造成工作性能差等问题。另一方面，分块传输，每个请求只需要传输少量的数据，响应快。

### 3.4 缓存控制机制

{% embed url="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching" %}

<figure><img src="../../.gitbook/assets/image (2) (1) (2) (1) (1).png" alt=""><figcaption></figcaption></figure>

### 3.5 内容协商机制

允许客户端与服务端约定包括语言，编码方式，内容格式、压缩机制、缓存机制等，并允许客户端和服务器之间约定以最合适的内容进行交换。

{% embed url="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Content_negotiation" %}

### 3.6 Host头

能够使不同域名配置在同一个IP地址的服务器上

<figure><img src="../../.gitbook/assets/image (3) (1) (2).png" alt=""><figcaption></figcaption></figure>

### 3.7 支持断点传输

也叫分块传输、断点续传。

[https://www.jianshu.com/p/cb01c6e11e8f](https://www.jianshu.com/p/cb01c6e11e8f)

### 3.8 缺点

服务器处理多个请求，按<mark style="color:purple;background-color:yellow;">顺序</mark>请求的，导致<mark style="background-color:purple;">队头阻塞</mark>问题

<figure><img src="../../.gitbook/assets/image (4) (2).png" alt=""><figcaption></figcaption></figure>

### 3.9 请求头&响应体

请求头

```
GET /en-US/docs/Glossary/Simple_header HTTP/1.1  
Host: developer.mozilla.org
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: https://developer.mozilla.org/en-US/docs/Glossary/Simple_header
```

响应体

```
200 OK
Connection: Keep-Alive
Content-Encoding: gzip
Content-Type: text/html; charset=utf-8
Date: Wed, 20 Jul 2016 10:55:30 GMT
Etag: "547fa7e369ef56031dd3bff2ace9fc0832eb251a"
Keep-Alive: timeout=5, max=1000
Last-Modified: Tue, 19 Jul 2016 00:59:33 GMT
Server: Apache
Transfer-Encoding: chunked
Vary: Cookie, Accept-Encoding

(content)
```

## 4.HTTP 2.0

由于网页变得越来越复杂，更多的数据被HTTP传输，增加了其压力，响应性和实时性有更高的要求。HTTP/1.1链接需要请求以正确的顺序发送，也就是说服务端需要等所有请求拿到后，再一次响应给客户端。也就是说，客户端发送三个请求A,B,C,服务端拿到C,B,A ,必须等ABC都拿到之后，再按ABC的顺序响应，这里面就有服务端延迟等待的时候浪费掉了。

HTTP/2.0相比于HTTP/1.1，

### 4.1 头部压缩。

如下图：Header以：开头，如：method，这些冒号开头的请求头，会给它做一个映射表，可以对头部进行压缩。

<figure><img src="../../.gitbook/assets/image (5) (2).png" alt=""><figcaption></figcaption></figure>

### 4.2 二进制流

在应用层和传输层中间加入了二进制分帧层。于是请求和响应数据分割成了最小单位帧。 这样就可以采用二进制的格式来传输数据，相比之前的文本格式，解析起来更高效。

### 4.3 服务端推送机制

其允许服务器在客户端缓存中填充数据，通过一个叫服务器推送的机制主动将内容推送给client

### 4.4 多路复用协议

● 原本HTTP链接之间是不互通的，每个HTTP连接都需要一个专门的TCP，要知道TCP连接有一定的性能瓶颈（TCP握手和慢启动）。而多路复用是的多个HTTP之间能够复用TCP连接，从而减少TCP连接。

● 用同一个TCP链接来发送数据，一个域名一个TCP链接，将多个请求，用二进制分帧层实现分帧，把数据传输给服务器，这就是多路复用，解决了队头阻塞问题。

● 并行的请求能在同一个链接中处理，移除了HTTP/1.x中顺序和阻塞的约束。也就是客户端和服务端的通信完全是并发的。

## 5. 未来设想 - HTTP3.0

● TCP就是有阻塞问题，在传输过程中一个数据丢了，要重传，后面的包要在前面的包重传完了之后才能轮到它。

● 解决了TCP队头阻塞问题：移除了TCP，采用UDP，并且在UDP的上层加了一层QUIK协议。

● 部署存在很大的问题，还未应用
