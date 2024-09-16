# 热更新&热重载

## 概念

**冷更新：**就是检测到文件或内容变更后，直接自动关闭页面，然后服务重启。

**热重载**：是检测到文件或内容变更后，服务器无需重启 ，页面也无需关闭，而是重新编译, 然后刷新页面内容，也就window.location.reload，webpack本身就支持热重载。

**热更新**：也称热替换，在热重载会触发window.location.reload，因此不会保留状态。而热更新不会reload页面，而是计算更新的内容，自动将需要更新的内容替换，也保留了当时的状态。

对于webpack而言，webpack里的HMR（hotModuleReplacement）模块实现了热更新，允许在运行时替换、添加、删除各种模块，而无需进行完全刷新重新加载整个页面。

目的：加快开发速度，所以只适用于开发环境下使用 思路：

1、保留在完全重新加载页面时丢失的应用程序的状态

2、只更新改变的内容，以节省开发时间

3、调整样式更加快速，几乎等同于在浏览器调试器中更改样式

使用方法：new webpack.HotModuleReplacementPlugin() 设置devServer选项中的hot字段为true则为热更替，否则是热重载。

实现：开发阶段，如果每次文件变更后，都要手动去打包是很不方便的。 通常在开发阶段采用以下三种方式进行热重载 1、webpack的Watch Mode 2、webpack-dev-server 3、webpack-dev-middleware



## 热更新主要流程 <a href="#junon" id="junon"></a>

1. 首先 webpack-dev-server 会建立一个服务器webpackDevServer服务，并且和浏览器建立 websocket 通信。
2. webpackDevServer启动后，进行构建，过程中会生成一个Hash值

<figure><img src="../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

3. 服务器监听（watch机制）到文件的变更，会重新complication，依据模块（文件）依赖关系，完成打包。过程中，会生成新的Hash、新的XXX.hot-update.json文件和XXX.hot-update.js文件。

<figure><img src="../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

&#x20;     首先，我们知道Hash值代表每一次编译的标识。其次，根据新生成文件名可以发现，上次输出的Hash值会作为本次编译新生成的文件标识。依次类推，本次输出的Hash值会被作为下次热更新的标识。

&#x20;      此后webpackDevServer会通知浏览器，文件有更新，浏览器则根据上一次的hash值向webpackDevServer进行两次请求，获得本次更新的内容（hot.json和hot.js)。

<figure><img src="../.gitbook/assets/image (2).png" alt=""><figcaption></figcaption></figure>

首先看json文件，返回的结果中，h代表本次新生成的Hash值，用于下次文件热更新请求的前缀。c表示当前要热更新的文件对应的是index模块。

再看下生成的js文件，那就是本次修改的代码，重新编译打包后的。

<figure><img src="../.gitbook/assets/image (3).png" alt=""><figcaption></figcaption></figure>

\>>>>>>>>>>>>>>>>>>>>>>>>>>> 代码无改动的情况 >>>>>>>>>>>>>>>>>>>>>>>>>>>>

还有一种情况是，如果没有任何代码改动，直接保存文件，控制台也会输出编译打包信息的。此时只生成了hot-update.json文件，没有生成hot-update.js文件，表示说无内容变更

<figure><img src="../.gitbook/assets/image (4).png" alt=""><figcaption></figcaption></figure>

此时浏览器也会发出的请求，可以看到c值为空，代表本次没有需要更新的代码。

<figure><img src="../.gitbook/assets/image (5).png" alt=""><figcaption></figcaption></figure>

## 热更新实现原理

### 1. webpack-dev-server启动服务 <a href="#vj4b9" id="vj4b9"></a>

入口文件（启动webpackServer服务命令代码）

（1） 启动webpack，生成compiler实例。compiler上有很多方法，比如可以启动 webpack 所有**编译**工作，以及**监听**本地文件的变化。

```
// 生成webpack编译主引擎 compiler
let compiler = webpack(config);

// 启动本地服务
let server = new Server(compiler, options, log);
server.listen(options.port, options.host, (err) => {
  if (err) {throw err};
});
```

本地服务

（1）使用了使用express框架启动本地Http server，让浏览器可以请求本地的**静态资源**。

（2）启动了websocket服务，通过websocket，可以建立本地服务和浏览器的双向通信。这样就可以实现当本地文件发生变化，立马告知浏览器可以热更新代码啦！

```
class Server {
    constructor() {
        this.setupApp();
        this.createServer();
    }
    
    setupApp() {
        // 依赖了express
    	this.app = new express();
    }
    
    createServer() {
        this.listeningApp = http.createServer(this.app);
    }
    listen(port, hostname, fn) {
        return this.listeningApp.listen(port, hostname, (err) => {
            // 启动express服务后，启动websocket服务
            this.createSocketServer();
        }
    }                                   
}
```

### 2. 修改webpack.config.js的entry配置 <a href="#nqhzt" id="nqhzt"></a>

启动本地服务前，调用了updateCompiler(this.compiler)方法。这个方法中有 2 段关键性代码。一个是获取websocket客户端代码路径（**webpack-dev-server/client/index.js）**，另一个是根据配置获取webpack热更新代码路径（**webpack/hot/dev-server.js**）。

```
// 获取websocket客户端代码
const clientEntry = `${require.resolve(
    '../../client/'
)}?${domain}${sockHost}${sockPath}${sockPort}`;

// 根据配置获取热更新代码
let hotEntry;
if (options.hotOnly) {
    hotEntry = require.resolve('webpack/hot/only-dev-server');
} else if (options.hot) {
    hotEntry = require.resolve('webpack/hot/dev-server');
}
```

修改后的webpack入口配置如下：

```
// 修改后的entry入口
{ entry:
    { index: 
        [
            // 上面获取的clientEntry
            'xxx/node_modules/webpack-dev-server/client/index.js?http://localhost:8080',
            // 上面获取的hotEntry
            'xxx/node_modules/webpack/hot/dev-server.js',
            // 开发配置的入口
            './src/index.js'
    	],
    },
}      
```

为什么要新增了 2 个文件？在入口默默增加了 2 个文件，那就意味会一同打包到bundle文件中去，也就是线上运行时。

**【webpack-dev-server/client/index.js】文件**

这个文件是websocket的客户端的代码，这部分代码是被注入到入口配置中的，目的是使得浏览器（客户端）能实现与本地websoket的服务端进行通信。

【**webpack/hot/dev-server.js**】文件

这个文件主要是用于检查更新逻辑的，后续会有进一步介绍。

### 2.3. 监听webpack编译结束 <a href="#i42yo" id="i42yo"></a>

修改好入口配置后，又调用了setupHooks方法。这个方法是用来注册监听事件的，监听每次webpack编译完成。

```
// 绑定监听事件
setupHooks() {
    const {done} = compiler.hooks;
    // 监听webpack的done钩子，tapable提供的监听方法
    done.tap('webpack-dev-server', (stats) => {
        this._sendStats(this.sockets, this.getStats(stats));
        this._stats = stats;
    });
};
```

当监听到一次webpack编译结束，就会调用\_sendStats方法通过websocket给浏览器发送通知，ok和hash事件，这样浏览器就可以拿到最新的hash值了，做检查更新逻辑。

```
// 通过websoket给客户端发消息
_sendStats() {
    this.sockWrite(sockets, 'hash', stats.hash);
    this.sockWrite(sockets, 'ok');
}
```

### 2.4 webpack监听文件变化 <a href="#auuju" id="auuju"></a>

每次修改代码，就会触发编译。说明我们还需要监听本地代码的变化，主要是通过setupDevMiddleware方法实现的。

这个方法主要执行了webpack-dev-middleware库。很多人分不清webpack-dev-middleware和webpack-dev-server的区别。其实就是因为webpack-dev-server只负责启动服务和前置准备工作，所有文件相关的操作都抽离到webpack-dev-middleware库了，主要是本地文件的**编译**和**输出**以及**监听**，无非就是职责的划分更清晰了。

```
compiler.watch(options.watchOptions, (err) => {
    if (err) { /*错误处理*/ }
});

// 通过“memory-fs”库将打包后的文件写入内存
setFs(context, compiler); 
```

* 第一步：compiler.watch

compiler实例主要干了两件事：

（1）根据webpack配置文件，执行一系列解析、编译过程，分析文件依赖关系，并根据loader和plugins对文件进行解析、格式转换等，最终打包成浏览器可执行文件

（2）调用Compiler的watch方法，对本地文件开启监听，当文件发生变化时，重新编译，编译完成后继续监听

* 第二部：setFs

这个方法主要目的就是将编译后的文件打包到内存。这就是为什么在开发的过程中，你会发现dist目录没有打包后的代码，因为都在内存中。原因就在于访问内存中的代码比访问文件系统中的文件更快，而且也减少了代码写入文件的开销，这一切都归功于memory-fs。

### 2.5 浏览器接收到热更新的通知 <a href="#ky4gi" id="ky4gi"></a>

我们已经在文件变更后，重新打好包，并通过\_sendStats将ok和hash信息(message)传给浏览器，浏览器将依据这两个值，请求上面所说的hot-update.json和hot-update.js文件。下面重点讲的就是\_sendStats方法中的ok和hash事件都做了什么。

那浏览器是如何接收到websocket的消息呢？回忆下[第 2.2 步骤](https://www.yuque.com/jiangmengxia-uvyxh/mzdsxg/crpbtowdrpt30ogb#nqhZT)增加的入口文件，也就是注入的websocket客户端代码。

（1）webpack-dev-server/client/index.js

```
'xxx/node_modules/webpack-dev-server/client/index.js?http://localhost:8080'
```

```
var socket = require('./socket');
var onSocketMessage = {
    hash: function hash(_hash) {
        // 更新currentHash值
        status.currentHash = _hash;
    },
    ok: function ok() {
        sendMessage('Ok');
        // 进行更新检查等操作
        reloadApp(options, status);
    },
};
// 连接服务地址socketUrl，?http://localhost:8080，本地服务地址
socket(socketUrl, onSocketMessage);

function reloadApp() {
	if (hot) {
        log.info('[WDS] App hot update...');
        
        // hotEmitter其实就是EventEmitter的实例
        var hotEmitter = require('webpack/hot/emitter');
        hotEmitter.emit('webpackHotUpdate', currentHash);
    } 
}
```

socket方法建立了websocket和服务端的连接，并注册了 2 个监听事件。

* hash事件，更新最新一次打包后的hash值。
* ok事件，进行热更新检查。

\
热更新检查事件是调用reloadApp方法。

（2）webpack/hot/dev-server.js\
\


```
// node_modules/webpack/hot/dev-server.js
var check = function check() {
    module.hot.check(true)
        .then(function(updatedModules) {
            // 容错，直接刷新页面
            if (!updatedModules) {
                window.location.reload();
                return;
            }
            
            // 热更新结束，打印信息
            if (upToDate()) {
                log("info", "[HMR] App is up to date.");
            }
    })
        .catch(function(err) {
            window.location.reload();
        });
};

var hotEmitter = require("./emitter");
hotEmitter.on("webpackHotUpdate", function(currentHash) {
    lastHash = currentHash;
    check();
});
```

这里webpack监听到了webpackHotUpdate事件，并获取最新了最新的hash值，然后终于进行检查更新了。检查更新呢调用的是module.hot.check方法。那么问题又来了，module.hot.check又是哪里冒出来了的！答案是HotModuleReplacementPlugin搞得鬼。

### 2.6 HotModuleReplacementPlugin <a href="#ojexh" id="ojexh"></a>

前面好像一直是webpack-dev-server做的事，那HotModuleReplacementPlugin在热更新过程中又做了什么伟大的事业呢？

配置热更新和不配置时bundle.js的区别。内存中看不到？直接执行webpack命令就可以看到生成的bundle.js文件啦。不要用webpack-dev-server启动就好了。

(1)未配置热更新

<figure><img src="../.gitbook/assets/image (6).png" alt=""><figcaption></figcaption></figure>

(2）配置了HotModuleReplacementPlugin或--hot的。

<figure><img src="../.gitbook/assets/image (8).png" alt=""><figcaption></figcaption></figure>



或者在source里也可以看到源码

<figure><img src="../.gitbook/assets/image (7).png" alt=""><figcaption></figcaption></figure>

也就是说说HotModuleReplacementPlugin也在编译时，注入了代码。

关于webpack如何为HotModuleReplacementPlugin注入代码，这里我就不讲了，因为这需要你对tapable以及plugin机制有一定了解，可以看下我写的文章[Webpack插件机制之Tapable-源码解析](https://juejin.cn/post/6844904004435050503)。

### 2.7 module.hot.chec <a href="#risbv" id="risbv"></a>

module.hot.check的代码来自于HotModuleReplacementPlugin注入的代码中，它做了什么？

（1）利用上一次保存的hash值，调用hotDownloadManifest发送xxx/hash.hot-update.json的ajax请求；该接口返回了下一次更新的hash值(update.h)和需要更新的文件(update.c)

```
hotAvailableFilesMap = update.c; // 需要更新的文件
hotUpdateNewHash = update.h; // 更新下次热更新hash值
hotSetStatus("prepare"); // 进入热更新准备状态
```

（2）调用hotDownloadUpdateChunk发送xxx/hash.hot-update.js 请求，通过JSONP方式。

```
function hotDownloadUpdateChunk(chunkId) {
    var script = document.createElement("script");
    script.charset = "utf-8";
    script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
    if (null) script.crossOrigin = null;
    document.head.appendChild(script);
 }
```

这个函数体为什么要单独拿出来，因为这里要解释下为什么使用JSONP获取最新代码？主要是因为JSONP获取的代码可以直接执行。为什么要直接执行？我们来回忆下/hash.hot-update.js的代码格式是怎么样的。

![](https://cdn.nlark.com/yuque/0/2023/png/642413/1676096843001-e50df8d2-d07d-43a1-8631-1cd190b4c9bd.png)

可以发现，新编译后的代码是在一个webpackHotUpdate函数体内部的。也就是要立即执行webpackHotUpdate这个方法。

再看下webpackHotUpdate这个方法。

```
window["webpackHotUpdate"] = function (chunkId, moreModules) {
    hotAddUpdateChunk(chunkId, moreModules);
} ;
```

这个方法webpackHotUpdate方法

```
function hotAddUpdateChunk(chunkId, moreModules) {
    // 更新的模块moreModules赋值给全局全量hotUpdate
    for (var moduleId in moreModules) {
        if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
	    hotUpdate[moduleId] = moreModules[moduleId];
        }
    }
    // 调用hotApply进行模块的替换
    hotUpdateDownloaded();
}
```

* hotAddUpdateChunk方法会把更新的模块moreModules赋值给全局全量hotUpdate。
* hotUpdateDownloaded方法会调用hotApply进行代码的替换。

### 2.8 hotApply 热更新模块替换 <a href="#y6ycq" id="y6ycq"></a>

热更新的核心逻辑就在hotApply方法了。

**（1）删除过期的模块，就是需要替换的模块**

```
var queue = outdatedModules.slice();
while (queue.length > 0) {
    moduleId = queue.pop();
    // 从缓存中删除过期的模块
    module = installedModules[moduleId];
    // 删除过期的依赖
    delete outdatedDependencies[moduleId];
    
    // 存储了被删掉的模块id，便于更新代码
    outdatedSelfAcceptedModules.push({
        module: moduleId
    });
}
```

**（2）将新的模块添加到 modules 中**

```
appliedUpdate[moduleId] = hotUpdate[moduleId];
for (moduleId in appliedUpdate) {
    if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
        modules[moduleId] = appliedUpdate[moduleId];
    }
}
```

**（3）通过\_\_webpack\_require\_\_执行相关模块的代码**

```
for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
    var item = outdatedSelfAcceptedModules[i];
    moduleId = item.module;
    try {
        // 执行最新的代码
        __webpack_require__(moduleId);
    } catch (err) {
        // ...容错处理
    }
}
```

## 总结 <a href="#o0s84" id="o0s84"></a>

<figure><img src="../.gitbook/assets/image (9).png" alt=""><figcaption></figcaption></figure>



<figure><img src="../.gitbook/assets/yuque_diagram (1).jpg" alt=""><figcaption></figcaption></figure>
