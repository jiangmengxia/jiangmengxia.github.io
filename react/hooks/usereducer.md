# useReducer

### **useReducer**

它是另一种函数组件保存状态的方法，它允许在函数组件中使用reducer。useReducer接受两个参数，第一个参数是一个reducer函数，用于计算新的状态；第二个参数是初始状态。

reducer函数接受action的类型，根据action来判断触发什么action，从而改变state的值，返回新的state。

```js
const [state, dispatch] = useReducer(reducer, initialState);
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

//使用
function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
```

useReducer相对于useState有什么优势？&#x20;

（1）reducer函数可以接受更多的参数，比如初始状态，而useState只能接受一个参数，即初始状态。&#x20;

（2）reducer函数可以更好地管理复杂的状态逻辑，而useState需要将状态拆分为多个变量，然后在函数组件中管理这些变量。&#x20;

（3）reducer函数可以更好地处理异步操作，而useState需要将异步操作放在函数组件中，这可能会导致代码难以维护。&#x20;

（4）更好的可预测性：useReducer 通过将状态更新逻辑集中在一个地方，使得状态更新更加清晰、易管理、可预测。在 useReducer 中，状态的更新是通过纯函数（reducer）来完成的，这使得状态更新更加透明和可测试。&#x20;

（5）更好的性能：当状态更新逻辑比较复杂时，useReducer 可以提供更好的性能。因为 useReducer 可以通过重新渲染整个组件来更新状态，而不是每次都重新渲染组件中的每个状态。这可以减少不必要的渲染，提高性能。&#x20;

（6）更好的状态管理：对于大型应用或复杂的状态逻辑，useReducer 可以提供更好的集中管理状态。
