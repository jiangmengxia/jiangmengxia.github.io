# 模块打包工具

## 由来

模块打包工具的由来是什么呢，先简单总结下，有以下几点：

1. 首先，我们前面学的ES Modules存在环境兼容问题，尽管现在很多主流浏览器已经支持这个特性了，我们也不能去做到去统一所有用户使用的浏览器环境。
2. 其次，通过模块化划分出来的模块文件比较多，而我们前端应用呢是运行在浏览器上的，模块文件过多会导致网络请求频繁，从而影响应用工作效率。
3. 这是JS文件基础上所有前端资源模块化的一个发散，也就是说模块化不应该仅支持JS文件，而应该支持所有类型文件，如css、image、font等。
4. 前端模块化工程后，前端开发人员只需要关注代码本身功能的实现，而无需过多关注模块之间的依赖关系，从而基本上不会出现因为文件依赖关系不当而产生的bug，因此可以大大提高开发效率和成本。



基于模块化的特点，我们设想需要这样一款打包工具：

* 代码编译降级成兼容性好的代码。ES6 -> ES5。
* 将散落文件打包到一起，解决频繁请求问题。
* 支持不同种类资源类型。
* 模块化区分不同环境，开发环境、生产环境，开发环境我们期望**热更新**来帮助提升开发效率。

<figure><img src="../../../../.gitbook/assets/截屏2024-10-01 10.06.35.png" alt=""><figcaption></figcaption></figure>

现在讨论的是对于整个前端应用的模块化方案，而不是前面的仅仅针对JS的模块化。



## 模块化打包工具

常见的模块化打包工具有webpack、**Parcel、**rollup、**Browserify、SystemJS。**

1. **Webpack**：Webpack是一个流行的模块化打包工具，它可以将多个模块打包成一个或多个文件，并支持各种插件和加载器。Webpack还支持代码分割、懒加载等功能。
2. **Rollup**：Rollup是一个专注于ES模块的模块化打包工具，它可以将多个ES模块打包成一个或多个文件。Rollup还支持Tree Shaking，即删除未使用的代码。
3. **Parcel**：Parcel是一个零配置的模块化打包工具，它可以将多个模块打包成一个或多个文件。Parcel还支持热模块替换、自动安装依赖等功能。
4. **Browserify**：Browserify是一个用于在浏览器中打包CommonJS模块的工具。Browserify可以将多个CommonJS模块打包成一个或多个文件。
5. **SystemJS**：SystemJS是一个动态模块加载器，它可以加载各种模块格式，包括ES模块、CommonJS、AMD等。SystemJS还支持模块的懒加载和预加载。

这里以webpack去介绍一下打包工具干了什么。

webpack作为一个模块打包工具，本身可以解决模块化，JS代码打包的问题。

* **模块加载器（loader）**

通过webpack可以将零散的模块代码打包到一个JS文件。对于代码中哪些有环境兼容问题的代码，就可以在打包过程中通过**模块加载器（loader）**对其进行编译转换。

* **拆分（code Spliting）**

其次，webpack还支持代码**拆分（code Spliting）**的能力。它可以将所有代码按照我们的需要去打包，这样就不用担心因将所有代码打包到一起，产生文件过大，资源加载效率低下的问题。我们可以将应用加载过程中，初次运行所需的代码，必须的那些模块打包到一起。对于其他模块，在应用工作过程中，将需要的模块异步加载的方式打包，从而实现<mark style="color:red;">增量加载</mark>或<mark style="color:red;">渐进式加载</mark>。这样就不用担心**文件太大或者文件太碎**这两个极端的问题。

* **资源模块**（Asset Module)

webpack允许应用在模块化的过程中，载入任意类型的**资源模块**（Asset Module)，可以通过js的import导入，比如css，image、font等。

总的来说，其他打包工具功能大差不大，所有打包工具都是以前端整体模块化（而非JS模块化）为目标，优势是在开发阶段让开发者正好的体验模块化带来的优势，同时不必担心模块化对生产环境造成影响。

模块化打包工具各有优缺点，你可以根据你的需求选择最适合的工具。
