# useLocation

### useLocation

useLocation 是 React Router 提供的一个 Hook，用于在函数组件中获取当前路由信息。它返回一个 location 对象，该对象包含了当前路由的路径、搜索参数、hash 等。

```js
import { useLocation } from 'react-router-dom';

function MyComponent() {
  const location = useLocation();

  console.log(location.pathname); // 当前路由的路径
  console.log(location.search); // 当前路由的搜索参数
  console.log(location.hash); // 当前路由的 hash

  return (
    <div>Current path: {location.pathname}</div>
  );
}
```
