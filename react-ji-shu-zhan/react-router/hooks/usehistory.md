# useHistory

### useHistory

useHistory 是 React Router 提供的一个 Hook，用于在函数组件中获取历史记录对象。它返回一个 history 对象，该对象包含了一些用于导航的方法，如 push、replace 等。

```js
import { useHistory } from 'react-router-dom';

function MyComponent() {
  const history = useHistory();

  function handleClick() {
    history.push('/new-path');
  }

  return (
    <button onClick={handleClick}>Go to new path</button>
  );
}
```
