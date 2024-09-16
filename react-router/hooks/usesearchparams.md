# useSearchParams

### **useSearchParams**

useSearchParams 是 React Router 提供的一个 Hook，用于在函数组件中获取和设置 URL 的搜索参数。它返回一个包含两个元素的数组，第一个元素是一个包含当前搜索参数的对象，第二个元素是一个函数，用于设置新的搜索参数。

```js
import { useSearchParams } from 'react-router-dom';
function MyComponent() {
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams.get('name')); // 获取名为 'name' 的搜索参数的值

  function handleClick() {
    setSearchParams({ name: 'John' }); // 设置新的搜索参数
  }

  return (
    <button onClick={handleClick}>Set search params</button>
  );
}
```
