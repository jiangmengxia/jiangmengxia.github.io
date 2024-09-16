# 不同的hash

## hash

代表的是根据compilation过程计算的hash，其中compilation代表整个webpack的compiler编译过程，对于热更新，每次更新后会触发一次compilation，则生成一个新的hash。

可以看出，hash是针对整个工程的，所以只要修改任意的文件，整个工程的hash值都会更改，比如你只改了js，但css ，img这些hash都会一起被更改，因为他们用的是同一个hash值。

可以从下图看见每个压缩后的文件的hash值是一样的，所以对于没有改变的模块而言，这样做显然不恰当，因为缓存失效了嘛。此时，chunkhash的用途随之而来。

<figure><img src="../.gitbook/assets/image (10).png" alt=""><figcaption></figcaption></figure>

## chunkhash

模块的hash，根据模块的修改才改变对应的hash值，如果新增加或减少了一个依赖模块或者模块内容发生变更，对应的模块的chunckHash值也会变化。一般不做特殊处理时，该模块的css和js的chunkHash是同步的。

chunkhash根据不同的入口Entry，进行依赖文件解析、构建对应的chunk，生成对应的哈希值。在生产环境构建时，会把公共库和程序入口文件区分开，单独打包构建，接着我们采用chunkhash的方式生成哈希值，那么只要我们不改动公共库的代码，就可以保证其哈希值不会受影响。并且webpack4中支持了异步import功能，固，chunkhash也作用于此，我们将各个模块的hash值 (除主干文件) 改为chunkhash，然后重新build一下，可得下图：

<figure><img src="../.gitbook/assets/image (11).png" alt=""><figcaption></figcaption></figure>

每个js文件的hash值不一样了，但是因为我们css也是模块引入到js里面的，所以js和css的hash是一样的 如：test2.js和test.css。这就导致 ，如果我css没更改，只改了js，css的hash也会变，或者只改了css，js没改，js的hash值也会变；这时候就需要contenthash了。

## contenthash

指根据文件内容计算得来的hash。只有文件内容发生变更，它所在的chunk的contentHash才会变化。

contenthash是针对文件内容级别的，只有你自己模块的内容变了，那么hash值才改变，所以我们可以通过contenthash解决上诉问题。如下：

<figure><img src="../.gitbook/assets/image (12).png" alt=""><figcaption></figcaption></figure>



[https://juejin.cn/post/6844903841771552782](https://juejin.cn/post/6844903841771552782)[https://juejin.cn/post/6844903872419332109](https://juejin.cn/post/6844903872419332109)
