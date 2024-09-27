# service worker

Service Worker 是一个 JavaScript 程序，它可以在后台运行，并拦截和处理网络请求。Service Worker 可以用于实现许多功能，例如离线缓存、后台同步、推送通知等。

Service Worker在实际业务场景中使用频率不是很高，但在特定的网站使用[**PWA(Progressive Web Apps**)](https://developer.mozilla.org/zh-TW/docs/Web/Progressive\_web\_apps)情況下算是非常常见的功能。

以下是一个使用service-worker的网页，这种所需资源量特别多的情况下，类似微博、抖音等、大数据量的博客等，都是可以使用这种技术。

[https://web.dev/learn/performance/prefetching-prerendering-precaching?hl=zh-cn#service\_worker\_precaching](https://web.dev/learn/performance/prefetching-prerendering-precaching?hl=zh-cn#service\_worker\_precaching)

<figure><img src="../../.gitbook/assets/image (56).png" alt=""><figcaption></figcaption></figure>

## 背景

有一个困扰 传统web用户多年的难题——丢失网络连接。即使是世界上最好的 web app，如果**下载不了**它，也是非常糟糕的体验。再此之前虽然已经有各种技术去尝试着解决这个问题，并且其中一些问题已被解决。但是，最重要的问题是，**仍然没有一个好的统筹机制对资源缓存和自定义的网络请求进行控制**。

Service worker 修复了这个问题。使用 service worker，你可以将 app 设置为首先使用<mark style="color:red;">缓存资源</mark>，从而即使在离线状态，也可以提供默认的体验，然后从网络获取更多数据（通常称为“<mark style="color:red;">离线优先</mark>”）。原生 app 就是实现可离线缓存，体验流畅，这是为什么大家都会选择原生 app，而不是选择 web app 的主要原因之一。

service worker 的功能类似于<mark style="color:red;">代理服务器</mark>，允许你去修改请求和响应，将其替换成来自其自身缓存的项目。

<figure><img src="../../.gitbook/assets/image (52).png" alt=""><figcaption></figcaption></figure>

如上图，service worker相当于在page和Network中充当**代理（proxy）**的作用，它将Page需要的资源从网络中预先下载好，存放到UA（浏览器）本地缓存中，供随时使用。如果，有些资源无法正常获取，也需要设计友好提示，以舒缓用户使用时情绪。

Service worker的缓存技术就是[预先资源加载策略](../render-new/you-hua-zi-yuan-jia-zai-de-ce-le.md)中的“preCache技术”。

兼容性可查看：[https://caniuse.com/serviceworkers](https://caniuse.com/serviceworkers)



## 特点

### JS worker机制

service worker本质上使用的是UA的JS worker，也就是线程机制。也就是由JS主线程创建的一个协程（也称附加线程），这样service worker则与主线程并行了，不会影响主线程的执行。

注册是在window上下文中进行，它的注册方法如下

```javascript
if ("serviceWorker" in navigator) {
  // Supported!
   navigator.serviceWorker
    .register("service-worker.js", {
      scope: "./",
    })
    .then((registration) => {
      let serviceWorker;
      if (registration.installing) {
        serviceWorker = registration.installing;
        document.querySelector("#kind").textContent = "installing";
      } else if (registration.waiting) {
        serviceWorker = registration.waiting;
        document.querySelector("#kind").textContent = "waiting";
      } else if (registration.active) {
        serviceWorker = registration.active;
        document.querySelector("#kind").textContent = "active";
      }
      if (serviceWorker) {
        // logState(serviceWorker.state);
        serviceWorker.addEventListener("statechange", (e) => {
          // logState(e.target.state);
        });
      }
    })
    .catch((error) => {
      // Something went wrong during registration. The service-worker.js file
      // might be unavailable or contain a syntax error.
    });
    
    
}
```

当然，线程之间的交互也是用postMessage。其中window上下文中发送和监听消息，如下：

```javascript
navigator.serviceWorker.ready.then((registration) => {
        registration.active.postMessage(
          "Test message sent immediately after creation",
        );
});
```

在service worker中监听消息：

```javascript
// This must be in `service-worker.js`
addEventListener("message", (event) => {
  console.log(`Message received: ${event.data}`);
});

// 给目标资源设置一个编号或者名称
const todo = "todo";
// 需安装+下载+缓存的数据
const assets = [
  "/",
  "./index.html",
  "./index.css",
  "./index.js",
  "./assets/icon-100.png",
  "./assets/icon-150.png",
  "./assets/icon-250.png",
];

// 监听install 事件
addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(todo).then(cache => {
      cache.addAll(assets);
    })
  );
});

// 监听fetch事件
self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});

```

* `install` 事件一般是被用来填充你的浏览器的离线缓存能力。这里我们将文件加入到缓存中！
* `fetch`自定义请求，每次任何被 service worker 控制的资源被请求到时，都会触发 `fetch` 事件，这些资源包括了指定的 scope 内的文档，和这些文档内引用的其他任何资源（比如 `index.html` 发起了一个跨域的请求来嵌入一个图片，这个也会通过 service worker ）。

更多配置可参考：

[https://developer.mozilla.org/zh-CN/docs/Web/API/Service\_Worker\_API/Using\_Service\_Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Service\_Worker\_API/Using\_Service\_Workers)

### **沒有this取而代之的是self**

Service Worker不是在JS主线程上执行的，其context是不同的。 一般service worker中我们用self表示当前上下文，当然也可以直接省略，从上面的案例代码就可以看出。

### 无法直接访问DOM

这个本来就是线程的特点，无法之间获取主线程的上下文，都是通过postMessage来传递数据的。当然，它可以通过postMessage来设法去操控DOM。

### 原则上只能在HTTPS上运行

service worker在client和service端充当proxy的职责，因此有很大的安全隐患，因此为确保安全性，要求只能在HTTPS上运行，除了DEV环境下，允许使用localhost或127.0.0.1上运行。

## 生命周期

<figure><img src="../../.gitbook/assets/image (54).png" alt="" width="360"><figcaption></figcaption></figure>

这个也比较简单，从上面的注册代码也能看出整个流程：

（1）客户端<mark style="color:red;">**注册**</mark>service worker，注册之前会查看是否已经存在，若已经存在在版本比较，有差异则进行安装。

&#x20; (2)  注册成功后，<mark style="color:red;">**install**</mark>缓存资源，如果之前已经有过缓存资源，这一步会清除旧的缓存资源，并将新的缓存资源加入到cache storage中。使用方法有addEventListener监听或者直接用oninstall 方法：

```javascript
function installSources(event){
  event.waitUntil(
    caches
      .open("v1")
      .then((cache) =>
        cache.addAll([
          "/",
          "/index.html",
          "/style.css",
          "/app.js",
          "/image-list.js",
          "/star-wars-logo.jpg",
          "/gallery/",
          "/gallery/bountyHunters.jpg",
          "/gallery/myLittleVader.jpg",
          "/gallery/snowTroopers.jpg",
        ]),
      ),
  );
}

self.addEventListener("install", (event) => {
    installSources(event)
});

oninstall = (event) => {
 installSources(event)
};
```

（3）install后回去<mark style="color:red;">**active**</mark>（激活）servic worker。这步骤会将不在预期版本中的缓存资源清除掉：

```javascript
self.addEventListener("activate", (event) => {
  const cacheAllowlist = ["v2"];
  event.waitUntil(
    caches.forEach((cache, cacheName) => {
      if (!cacheAllowlist.includes(cacheName)) {
        return caches.delete(cacheName);
      }
    }),
  );
});
```

&#x20;         在service worker不是第一次安装的情况下，（也就是第二个分支）的情况下，这时候状态会一直停留在waiting中，无法直接去active，可以通过skipWaiting等方式去触发，这种情况下触发active的方式有：

* 关闭当前tab
* 等待24小时
* 手动触发
* 执行skipWaiting

&#x20;      skipWaiting会强制等待 service worker 成为激活的 service worker。它一般与 [`Clients.claim()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Clients/claim) 一起使用，以确保原 service worker 的更新，能立即对当前对客户端和其他所有激活的客户端生效。

&#x20;       执行skipWaiting后触发activate并不会正式启用新Service Worker开始代理，以下有几种方式可让新Service Worker接管旧Service Worker代理：

&#x20;       （1）reload page   （2） 执行  [`Clients.claim()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Clients/claim) ，一般采用当前方法体验较好

（4）关于 [`Clients.claim()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Clients/claim) ，允许一个激活的 service worker 将自己设置为其 [`scope`](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/scope) 内所有 clients 的[`controller`](https://developer.mozilla.org/zh-CN/docs/Web/API/ServiceWorkerContainer/controller) . 这会在由此 service worker 控制的任何 clients 中触发 [`navigator.serviceWorker`](https://developer.mozilla.org/zh-CN/docs/Web/API/ServiceWorkerContainer) 上的 "`controllerchange`" 事件。

&#x20;         当一个 service worker 被初始注册时，页面在下次加载之前不会使用它。 `claim()` 方法会<mark style="color:red;">立即控制这些页面</mark>。请注意，这会<mark style="color:red;">导致 service worker 控制通过网络定期加载的页面，或者可能通过不同的 service worker 加载</mark>。

```javascript
// 注册 Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
    console.log('Service Worker registered with scope:', registration.scope);

    // 立即控制当前页面
    registration.addEventListener('updatefound', function() {
      const newWorker = registration.installing;
      newWorker.addEventListener('statechange', function() {
        if (newWorker.state === 'installed') {
          newWorker.addEventListener('waiting', function() {
            newWorker.postMessage({ action: 'skipWaiting' });
          });
        }
      });
    });

    // 控制当前页面
    registration.addEventListener('controllerchange', function() {
      console.log('Service Worker is now controlling the page.');
    });

    // 立即控制当前页面
    registration.active.postMessage({ action: 'skipWaiting' });
  }).catch(function(error) {
    console.log('Service Worker registration failed:', error);
  });
}

```

在上面的示例中，我们首先注册了一个 Service Worker，然后在 Service Worker 中监听了 `updatefound` 事件和 `controllerchange` 事件。当 Service Worker 更新时，我们使用 `postMessage` 方法发送一个消息，要求 Service Worker 跳过等待状态，并立即控制当前页面。这符合 `Clients.claim()` 的使用方式，因为 `Clients.claim()` 可以立即将 Service Worker 控制当前页面。





参考：

[https://medium.com/@b09112332/%E8%AA%8D%E8%AD%98service-worker-f2d2e74bd3c0](https://medium.com/@b09112332/%E8%AA%8D%E8%AD%98service-worker-f2d2e74bd3c0)

[https://www.cronj.com/blog/browser-push-notifications-using-javascript/](https://www.cronj.com/blog/browser-push-notifications-using-javascript/)[https://developer.mozilla.org/zh-CN/docs/Web/API/Service\_Worker\_API/Using\_Service\_Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Service\_Worker\_API/Using\_Service\_Workers)
