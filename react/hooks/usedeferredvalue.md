# useDeferredValue

useDeferredValue 是 React 18 引入的一个新的 Hook。它可以让你在组件中创建一个延迟值，以便在更新过程中提供更好的用户体验。这个 Hook 特别适用于那些需要处理大量数据或复杂计算的场景。

```js
const deferredValue = useDeferredValue(value);
```

参数说明

* value：一个值，可以是任何类型的数据。这个值会被延迟更新，以便在更新过程中提供更好的用户体验。
