# useNavigate

### **useNavigate**

useNavigate 是 React Router 提供的一个 Hook，用于在函数组件中导航到不同的路由。它返回一个函数，该函数接受一个路径作为参数，并导航到该路径。

```js
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/new-path');
  }

  return (
    <button onClick={handleClick}>Go to new path</button>
  );
}
```
