# Redux解决了React的什么痛点

## 在react中不使用redux时遇到的问题

在React中组件通信的数据流向是至顶向下的单向的，顶层组件可以通过props属性向下层组件传递数据，而下层组件不能向上级传递数据，要实现下层组件修改数据，需要上层传递修改数据的方法到下层组件，当项目越来越大的时候，组件之间传递数据变得越来越困难。

<figure><img src="../../.gitbook/assets/截屏2024-09-16 18.04.54.png" alt=""><figcaption></figcaption></figure>

## 在react中使用redux的好处

使用redux进行状态管理，由于store是独立于组件，使的数据管理独立于组件，解决了组件与组件之间的数据传递困难的问题。

<figure><img src="../../.gitbook/assets/截屏2024-09-16 18.46.56.png" alt=""><figcaption></figcaption></figure>

Redux 作为一种数据管理容器，实现中最大特点就是数据流动可预测，核心在于 immutable state tree。减少甚至避免了应用中不同组件之间逻辑相互影响导致数据流向复杂不清、bug 难追踪的问题，还带来一些额外的特性：时间回溯、SSR、良好的维护性、可跟踪应用状态的开发工具等等。而且 redux 推崇函数式编程（functional programming)，很好测试。
