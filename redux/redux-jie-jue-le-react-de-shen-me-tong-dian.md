# Redux解决了React的什么痛点

Redux的数据流向是至顶向下的流向，如果没有useContext很难做到跨层级的状态共享。但是引入了useContext存在



Redux 作为一种数据管理容器，实现中最大特点就是数据流动可预测，核心在于 immutable state tree。减少甚至避免了应用中不同组件之间逻辑相互影响导致数据流向复杂不清、bug 难追踪的问题，还带来一些额外的特性：时间回溯、SSR、良好的维护性、可跟踪应用状态的开发工具等等。而且 redux 推崇函数式编程（functional programming)，很好测试。



