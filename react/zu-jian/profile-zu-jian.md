# Profile组件

Profile组件允许测量该节点树渲染的性能，并通过回调函数返回性能指标。

```
<Profiler id="App" onRender={onRender}>
  <App />
</Profiler>

// 渲染指标回调
function onRender(
    id,  
    phase,
    actualDuration, 
    baseDuration, 
    startTime,
    commitTime
) {
  // Aggregate or log render timings...
}
```

【参数详解】

* **id: string** - 发生提交的 Profiler 树的 id。 如果有多个 profiler，它能用来分辨树的哪一部分发生了“提交”。
* **phase: "mount" | "update"或"**nested-update" - 判断是组件树的第一次装载引起的重渲染，还是由内部update（setState）、外部的update（props变更)、hooks内的state变更引起的重渲染。
* **actualDuration: number** - 本次更新在渲染 Profiler 和它的子代上花费的时间。 这个数值表明使用 memoization 之后能表现得多好。（例如 [React.memo](https://link.zhihu.com/?target=https%3A//react.docschina.org/docs/react-api.html%23reactmemo)，[useMemo](https://link.zhihu.com/?target=https%3A//react.docschina.org/docs/hooks-reference.html%23usememo)，[shouldComponentUpdate](https://link.zhihu.com/?target=https%3A//react.docschina.org/docs/hooks-faq.html%23how-do-i-implement-shouldcomponentupdate)）。 理想情况下，由于子代只会因特定的 prop 改变而重渲染，因此这个值应该在第一次装载之后显著下降。
* **baseDuration: number** - 在 Profiler 树中最近一次每一个组件 render 的持续时间。 这个值估计了最差的渲染时间。（例如当它是第一次加载或者组件树没有使用 memoization）。
* **startTime: number** - 本次更新中 React 开始渲染的时间戳。
* **commitTime: number** - 本次更新中 React commit 阶段结束的时间戳。 在一次 commit 中这个值在所有的 profiler 之间是共享的，可以将它们按需分组。
* **interactions: Set** - 当更新被制定时，[“interactions”](https://link.zhihu.com/?target=https%3A//fb.me/react-interaction-tracing) 的集合会被追踪。（例如当 render 或者 setState 被调用时）。

【其他特性】

* Profile允许嵌套使用

【使用参考】

[https://juejin.cn/post/7008337341634854942](https://juejin.cn/post/7008337341634854942)

\
\


[https://blog.csdn.net/React\_Community/article/details/123516458](https://blog.csdn.net/React\_Community/article/details/123516458)
