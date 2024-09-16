# Immutable数据流及应用

facebook的Immutable帮助解决

（1）pureComponent 浅层对比

（2）shouldComponentUpdate，react.memo 中深层对比耗性能等问题

Immutable生成的对象中，任一节点的变更，都会生成新的变量，也就是新的引用，但是其他非变更的节点的引用时不变的（也就复用），这样的好处时，不需要进行深度遍历，提高性能

实际应用场景

（1）组件中的复杂的变量，可以用Immutable变量

（2）redux+Immutable进行数据存储



[https://juejin.cn/post/6863832173703593997?searchId=202312262036407573927152B66A94E0FD](https://juejin.cn/post/6863832173703593997?searchId=202312262036407573927152B66A94E0FD)[https://zhuanlan.zhihu.com/p/20295971?columnSlug=purerender](https://zhuanlan.zhihu.com/p/20295971?columnSlug=purerender)
