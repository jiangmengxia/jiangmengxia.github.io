# useRouteMatch

### **useRouteMatch**

useRouteMatch 是 React Router 提供的一个 Hook，用于在函数组件中获取当前路由的匹配信息。它返回一个 match 对象，该对象包含了当前路由的路径、参数、是否匹配等。

```js
import { useRouteMatch } from 'react-router-dom';

function MyComponent() {
  const match = useRouteMatch('/path/:id');

  console.log(match.params.id); // 当前路由的参数
  console.log(match.isExact); // 当前路由是否精确匹配

  return (
    <div>Current path: {match.params.id}</div>
  );
}
```
