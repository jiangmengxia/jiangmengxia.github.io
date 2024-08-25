
# localstorage监听变更

在 Web Storage API 中，`localStorage` 的变化无法直接通过事件监听器来检测。但是，你可以通过监听 `storage` 事件来检测其他窗口或标签页中 `localStorage` 的变化。

`storage` 事件会在同源的不同窗口或标签页中 `localStorage` 发生变化时触发。这个事件会在当前窗口或标签页中触发，并且会传递一个 `StorageEvent` 对象作为参数。

以下是一个示例：

```javascript
window.addEventListener('storage', function(event) {
  if (event.key === 'myKey') {
    console.log('The value for myKey has been changed to', event.newValue);
  }
});
```

在这个示例中，我们监听了 `storage` 事件，并在事件处理函数中检查了 `event.key` 是否为 `'myKey'`。如果是，我们就打印出新的值。

需要注意的是，`storage` 事件只会在同源的不同窗口或标签页中 `localStorage` 发生变化时触发，而不会在当前窗口或标签页中 `localStorage` 发生变化时触发。此外，`storage` 事件也不会在 `localStorage` 的数据被删除时触发。