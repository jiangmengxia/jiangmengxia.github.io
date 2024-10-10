# useSyncExternalStore

useSyncExternalStore 是 React 18 引入的一个新的 Hook。可以让你在函数组件中订阅外部存储，并在存储更新时重新渲染组件。这个 Hook 特别适用于那些需要与外部系统（如 Redux store、Context 等）进行交互的场景。

```js
const state = useSyncExternalStore(
  subscribe, // 订阅函数，当数据源更新时调用
  getSnapshot, // 获取当前数据快照的函数
  getServerSnapshot // 可选，用于获取服务端渲染时的数据快照
);
```

参数说明

* subscribe：一个函数，用于订阅外部数据源的变化（如Redux Store）。当数据源发生变化时，React 会调用这个函数，并传入一个回调函数，当数据源更新时，需要调用这个回调函数来通知 React 重新渲染组件。
* getSnapshot：一个函数，用于获取当前数据源的快照。每次组件渲染时，React 都会调用这个函数来获取最新的数据。
* getServerSnapshot：一个可选的函数，用于获取服务端渲染时的数据快照。这个函数只在服务端渲染时调用，用于确保服务端和客户端的数据一致性。
