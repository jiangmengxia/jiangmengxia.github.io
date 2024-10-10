# useContext

### **useContext**

它允许在函数组件中使用上下文，也就是允许跨层级获取数据时简化数据的代码。 父层级创建上下文，存储数据。通过context.provider包裹子孙组件，通过这种方式可以提供数据给子孙组件。 子孙组件通过useContext获取context上下文的数据。

```js
const context = createContext({state: 'Hello World'}); 
function App() {
  return <context.Provider value="Hello World">
    <Foo/>
  </context.Provider>;
}
function Foo() {
  const context = useContext(MyContext);
// MyContext 是一个 Context 对象（React.createContext 的返回值）
// 当前的 Context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。
  return <div>{context}</div>;
}
```

**useContext优点**

&#x20;(1) 代码简洁：使用 useContext 可以避免在组件树中逐层传递 props，从而简化代码。

&#x20;(2) 上下文数据共享：使用 useContext 可以在组件树中共享数据，而不需要通过 props 逐层传递。

&#x20;(3) 上下文数据更新：当上下文数据更新时，使用 useContext 的组件会自动重新渲染，从而获取最新的数据。

**useContext 缺点或注意事项**

&#x20;(1) 上下文数据更新：当上下文数据更新时，使用 useContext 的组件会自动重新渲染，从而获取最新的数据。但是，如果上下文数据没有更新，组件不会重新渲染，这可能会导致组件中的数据与上下文数据不一致。因此，在使用 useContext 时，需要注意上下文数据的更新。

&#x20;(2) 上下文数据类型：上下文数据的类型应该是一致的，否则可能会导致组件中的数据类型错误。例如，如果上下文数据是一个字符串，那么组件中的数据类型也应该是一个字符串。

&#x20;(3) 上下文数据更新时机：上下文数据的更新时机应该与组件的渲染时机一致，否则可能会导致组件中的数据与上下文数据不一致。例如，如果上下文数据在组件渲染之前更新，那么组件中的数据将无法获取到最新的上下文数据。

**useContext 使用场景**

&#x20;(1) 全局状态管理：当需要在多个组件之间共享全局状态时，可以使用 useContext。例如，可以在根组件中创建一个上下文，用于存储用户信息、主题等全局状态，然后在需要使用这些状态的组件中使用 useContext 获取这些状态。

&#x20;(2) 主题切换：当需要在多个组件之间切换主题时，可以使用 useContext。例如，可以在根组件中创建一个上下文，用于存储当前的主题，然后在需要使用主题的组件中使用 useContext 获取当前的主题，并根据主题渲染不同的样式。
