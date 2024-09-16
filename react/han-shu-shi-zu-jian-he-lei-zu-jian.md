# 函数式组件和类组件

## 一般回答 <a href="#mufpu" id="mufpu"></a>

对于标题的函数式组件和类组件的区别，我们一般回答有以下几点：

* state区别，若没有hooks，则函数式组件没法具备setState一样功能的函数
* 性能区别，**但是在现代浏览器中，闭包和类的原始性能只有在极端场景下才会有明显的差别。**

1.
   1. 性能主要取决于代码的作用，而不是选择函数式还是类组件。尽管优化策略有差别，但性能差异可以忽略不计。
   2. 类组件中常常用到嵌套很深的组件树，所以从这个角度来看，函数式组件性能略胜一筹
   3. 参考官网：([zh-hans.reactjs.org/docs/hooks-…](https://link.juejin.cn/?target=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Fhooks-faq.html%23are-hooks-slow-because-of-creating-functions-in-render))
   4. 参考作者github：([github.com/ryardley/ho…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fryardley%2Fhooks-perf-issues%2Fpull%2F2))

* 实例化的区别，函数式组件式不需要实例化的，因此比类组件少一些实例化构造开始、初始化等的开销
* 继承的区别，类组件组件可以extends一个组件，而函数式组件不能
* this的区别，类组件实例化后每个实例都有this，而函数式组件没有this（this===undefined）

## this引发的问题 <a href="#qayvc" id="qayvc"></a>

大部分场景不论用函数式组件还是类组件，完成的功能能保持一致，但也有不一样的情况，掘金上的一篇文章，正好很好的描述了this引发的问题一种情况，参考[React函数式组件和类组件的区别，不只是只有state和性能！](https://juejin.cn/post/6844904049146331150)一文，但在这篇文章中，我不赞同作者原因的描述。

首先对于以下两点描述，我是不赞同的

1. 在 React 中 Props 是不可变(immutable)的，所以他们永远不会改变。
2. 而 this 是而且永远是可变(mutable)的。

在上述作者的code（[https://codesandbox.io/s/pjqnl16lm7?file=/src/index.js:0-1119](https://codesandbox.io/s/pjqnl16lm7?file=/src/index.js:0-1119)）基础上进行了少许改动，下面👇🏻是我的code实例（[https://codesandbox.io/s/sweet-flower-fifhvw?file=/src/views/ProfilePageFunction.js](https://codesandbox.io/s/sweet-flower-fifhvw?file=/src/views/ProfilePageFunction.js)），我将ProfilePageFunction和ProfilePageClass组件，分别加入了新旧props对比和新旧this对比的方法，发现每次render时Props都是mutable，反而是类组件的this被复用了，所以只实例化一次，因此this是不变的。

**那到底是什么原因引起的问题呢？**

我将函数式组件和类组件render前后的props、this、showMessage方法进行了比较，我们发现：

![](https://cdn.nlark.com/yuque/0/2022/png/642413/1645248619329-e2e24e26-6e6d-419c-95e5-d122357594c3.png)

（1）函数式组件render前后：

* props值更新
* showMessage值更新

因为没有this，点击（Follow）事件发生后，绑定的历史的showMessage，此时props.user是当时的值（假设NameA）,当切换profile引起re-render的时候，并不会影响之前点击事件绑定的showMessage以及内部的变量的值，因此show的值还是历史的props.user，也就是NameA。当re-render好了之后，此时Follow按钮单击事件绑定的是新生成的showMessage函数，当前的props.user也变成了新的值（假设NameB），如果此时再点击Follow按钮，则展示的Profile就是此时的showMessage里的变量props.user，也就是NameB。

（2）类组件

* props值更新
* this不变
* showMessage不变

因为showMessage、this都是不变的，但是props值更新了，因此re-render后必然展示的是最新的props。

## this问题总结 <a href="#gjwom" id="gjwom"></a>

函数式组件，由于没有实例的说法，每次re-render之后，所有的函数都是新创建的（这里不考虑使用memoization的Hook），函数内的变量，也都是新生成的。

类组件，re-render之后，this和内部函数是不变的，因此事件回调函数是不变的，而this.props的值是可变的。

【参考文献】

* React 函数式组件和类组件的区别，不是只有state和性能！[https://codesandbox.io/s/pjqnl16lm7?file=/src/index.js:0-1119](https://codesandbox.io/s/pjqnl16lm7?file=/src/index.js:0-1119)
