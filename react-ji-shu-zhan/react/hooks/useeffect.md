# useEffect

### **useEffect**

它允许在函数组件中执行副作用。 可以把useEffect看作是componentDidMount、componentDidUpdate和componentWillUnmount这三个生命周期函数的组合。

```
useEffect(()=>{}) => conponentDidMount + componentDidUpdate, 挂载和更新时执行 
useEffect(()=>{},[]) => componentDidMount , 挂载时执行一次 
useEffect(()=>{},[a]) => conponentDidUpdate(a) ， 变量a更新时执行
useEffect(()=>{},[a,b]) => conponentDidUpdate(a,b)， 变量a或b更新时执行 
useEffect(()=>{}=>{}) => conponentWillUnmount， 组件卸载时执行
```

useEffect的第一个参数，如果是异步函数，

```js
useEffect(async()=>{
   const response = await fetch('https://api.example.com/data');
   const data = await response.json();
   console.log(data)
   // 因为此时useEffect返回的是一个promise，所以会报错，需要返回的是一个function
}, []);

// 解决办法1
useEffect(()=>{
   const fetchData = async()=>{
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      console.log(data)
   }
   fetchData();
}, []);
// 解决办法2 - 立即执行
useEffect(()=>{
  (async()=>{
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      console.log(data)
   })()
}, []);
```

报错提示：React Hook "useEffect" is called conditionally. React Hooks must be called in the exact same order in ev<|code\_middle|>

**useEffect相比于类组件的生命周期优势**

&#x20;(1) 更简洁的代码、更易理解：useEffect 可以将多个生命周期函数合并为一个函数，从而简化代码。

&#x20;(2) 更灵活的依赖管理：useEffect 可以接受一个依赖数组作为参数，从而指定在哪些变量更新时执行副作用。这使得副作用的管理更加灵活。

&#x20;(3) 更好的性能：useEffect 可以避免不必要的副作用执行，从而提高性能。例如，当依赖数组为空时，副作用只会在组件挂载时执行一次，而不会在组件更新时执行。

**useEffect缺点**

&#x20;(1) 代码可读性差：useEffect 的代码更臃肿，可读性较差，因为它将多个生命周期函数合并为一个函数，使得代码难以理解。

&#x20;(2) 依赖管理复杂：useEffect 的依赖管理比较复杂，需要仔细管理依赖数组中的变量，否则可能会导致副作用执行不正确。

&#x20;(3) 性能问题：当依赖数组中的变量更新时，useEffect 会执行副作用，这可能会导致不必要的副作用执行，从而影响性能。因此，在使用 useEffect 时，需要注意依赖数组中的变量，避免不必要的副作用执行。
