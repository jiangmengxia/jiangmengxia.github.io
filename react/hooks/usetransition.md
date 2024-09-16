# useTransition

seTransition 是 React 18 引入的一个新的 Hook。它可以让你在组件中创建一个过渡状态，以便在更新过程中提供更好的用户体验。这个 Hook 特别适用于那些需要处理大量数据或复杂计算的场景。

```js
const [isPending, startTransition] = useTransition();
```

参数说明

* isPending：一个布尔值，表示当前是否有过渡正在进行。如果为 true，则表示有过渡正在进行，此时应该避免执行任何阻塞用户界面的操作。
