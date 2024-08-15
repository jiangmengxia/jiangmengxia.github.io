# React Hooks

## 概述
React Hooks是React 16.8引入的新特性，它是函数式组件的功能增强,让函数式组件可以做类组件的事情.允许在函数组件可以存储状态、拥有可以处理副作用的能力和其他React特性，如生命周期方法和上下文等。目的是让开发者在不使用类组件的情况下实现相同的功能。

副作用：在编程中，副作用（Side Effects）是指那些不直接返回值，而是对程序状态或外部环境产生影响的操作。也就是说只要不是直接把数据转化成视图的代码，都属于副作用，如获取DOM元素、为DOM元素添加事件、设置定时器、以及发送AJAX请求等。

在类组件中，我们一般通过生命周期钩子来处理副作用，在函数式组件中，我们就用Hooks来处理副作用。

类组件的缺点：
（1）缺少逻辑复用机制
     为了复用机制，我们不得不使用高阶组件（HOC）和render props，但高阶组件的嵌套会使得代码难变得臃肿，难以理解和维护，增加了调试难度、降低运行效率。
（2）类组件经常会变得复杂难以维护
     类组件中，经常会将业务逻辑相关逻辑拆分到不同生命周期中，
     而在一个生命周期中又存在多个不相干业务逻辑，使得代码难以维护，逻辑混乱。
（3）类成员方法不能保证this指向的正确性
     在处理函数中，我们如果要更改状态的话，必须要更正函数内部this的指向，否则this会变成undefined，我们通常用bind或者函数嵌套函数的方式来处理，但这样又会增加代码的复杂度。

Hooks的优点：
（1）类组件逻辑复用困难，而Hooks可以方便地实现逻辑复用
（2）Hooks让代码更加简洁，避免了类组件中生命周期函数的逻辑混乱
（3）函数组件没有this，而Hooks可以方便地访问组件的状态和属性
（4）Hooks让函数组件有了更多的能力，如处理副作用、访问上下文等

## 常见hooks说明
以下是一些关于React Hooks的详细说明：

### **useState**
它利用闭包，允许在函数组件中存储、使用状态。useState接受一个初始状态作为参数，并返回一个包含当前状态和更新状态的数组。
useState的参数：可以是一个值，或者一个返回值的函数。当参数是一个函数时，这个函数的返回值会被用作初始状态。这个函数只会被调用一次，即组件首次渲染的时候（re-render时不会被调用），一般用在初始值是动态值的情况。
useState的注意事项：每次调用useState都会创建一个新的状态变量（不是同一个状态），因此不能在循环、条件或嵌套函数中调用useState。

useState本身是异步的（下一个周期才更新，react状态更新是批量的、链式的），所以不能依赖前一次的状态值，如果需要依赖前一次的状态值，可以使用函数式更新，即传入一个函数，函数的参数是前一次的状态值，函数的返回值是新的状态值。

useState也是可以是同步的，场景有：
（1）在 React 18 及更高版本中，使用并发特性：在 React 18 及更高版本中，引入了并发特性，如 startTransition。当状态更新被包裹在 startTransition 中时，React 会立即处理这些更新，而不是将其放入队列中。这可以确保在用户交互过程中，状态更新能够立即反映出来。

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

useReducer相对于useState有什么优势？
（1）reducer函数可以接受更多的参数，比如初始状态，而useState只能接受一个参数，即初始状态。
（2）reducer函数可以更好地管理复杂的状态逻辑，而useState需要将状态拆分为多个变量，然后在函数组件中管理这些变量。
（3）reducer函数可以更好地处理异步操作，而useState需要将异步操作放在函数组件中，这可能会导致代码难以维护。
（4）更好的可预测性：useReducer 通过将状态更新逻辑集中在一个地方，使得状态更新更加清晰、易管理、可预测。在 useReducer 中，状态的更新是通过纯函数（reducer）来完成的，这使得状态更新更加透明和可测试。
（5）更好的性能：当状态更新逻辑比较复杂时，useReducer 可以提供更好的性能。因为 useReducer 可以通过重新渲染整个组件来更新状态，而不是每次都重新渲染组件中的每个状态。这可以减少不必要的渲染，提高性能。
（6）更好的状态管理：对于大型应用或复杂的状态逻辑，useReducer 可以提供更好的集中管理状态。


### **useContext**
它允许在函数组件中使用上下文，也就是允许跨层级获取数据时简化数据的代码。
父层级创建上下文，存储数据。通过context.provider包裹子孙组件，通过这种方式可以提供数据给子孙组件。
子孙组件通过useContext获取context上下文的数据。

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
(1) 代码简洁：使用 useContext 可以避免在组件树中逐层传递 props，从而简化代码。
(2) 上下文数据共享：使用 useContext 可以在组件树中共享数据，而不需要通过 props 逐层传递。
(3) 上下文数据更新：当上下文数据更新时，使用 useContext 的组件会自动重新渲染，从而获取最新的数据。

**useContext 缺点或注意事项**
(1) 上下文数据更新：当上下文数据更新时，使用 useContext 的组件会自动重新渲染，从而获取最新的数据。但是，如果上下文数据没有更新，组件不会重新渲染，这可能会导致组件中的数据与上下文数据不一致。因此，在使用 useContext 时，需要注意上下文数据的更新。
(2) 上下文数据类型：上下文数据的类型应该是一致的，否则可能会导致组件中的数据类型错误。例如，如果上下文数据是一个字符串，那么组件中的数据类型也应该是一个字符串。
(3) 上下文数据更新时机：上下文数据的更新时机应该与组件的渲染时机一致，否则可能会导致组件中的数据与上下文数据不一致。例如，如果上下文数据在组件渲染之前更新，那么组件中的数据将无法获取到最新的上下文数据。

**useContext 使用场景**
(1) 全局状态管理：当需要在多个组件之间共享全局状态时，可以使用 useContext。例如，可以在根组件中创建一个上下文，用于存储用户信息、主题等全局状态，然后在需要使用这些状态的组件中使用 useContext 获取这些状态。
(2) 主题切换：当需要在多个组件之间切换主题时，可以使用 useContext。例如，可以在根组件中创建一个上下文，用于存储当前的主题，然后在需要使用主题的组件中使用 useContext 获取当前的主题，并根据主题渲染不同的样式。

### **useEffect**
它允许在函数组件中执行副作用。
可以把useEffect看作是componentDidMount、componentDidUpdate和componentWillUnmount这三个生命周期函数的组合。

useEffect(()=>{})   =>  conponentDidMount + componentDidUpdate, 挂载和更新时执行
useEffect(()=>{},[]) =>  componentDidMount , 挂载时执行一次
useEffect(()=>{},[a]) =>  conponentDidUpdate(a) ，  变量a更新时执行
useEffect(()=>{},[a,b]) =>  conponentDidUpdate(a,b)， 变量a或b更新时执行
useEffect(()=>{}=>{}) =>  conponentWillUnmount， 组件卸载时执行

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
报错提示：React Hook "useEffect" is called conditionally. React Hooks must be called in the exact same order in ev<|code_middle|>

**useEffect相比于类组件的生命周期优势**
(1) 更简洁的代码、更易理解：useEffect 可以将多个生命周期函数合并为一个函数，从而简化代码。
(2) 更灵活的依赖管理：useEffect 可以接受一个依赖数组作为参数，从而指定在哪些变量更新时执行副作用。这使得副作用的管理更加灵活。
(3) 更好的性能：useEffect 可以避免不必要的副作用执行，从而提高性能。例如，当依赖数组为空时，副作用只会在组件挂载时执行一次，而不会在组件更新时执行。

**useEffect缺点**
(1) 代码可读性差：useEffect 的代码更臃肿，可读性较差，因为它将多个生命周期函数合并为一个函数，使得代码难以理解。
(2) 依赖管理复杂：useEffect 的依赖管理比较复杂，需要仔细管理依赖数组中的变量，否则可能会导致副作用执行不正确。
(3) 性能问题：当依赖数组中的变量更新时，useEffect 会执行副作用，这可能会导致不必要的副作用执行，从而影响性能。因此，在使用 useEffect 时，需要注意依赖数组中的变量，避免不必要的副作用执行。


### **useMemo**
它的行为非常类似Vue中的计算属性，它仅会在某个依赖项改变时重新计算，并且返回一个计算结果，称memoized（记忆的）值。如果依赖项并未更新，则也不会重新计算，从而有助于避免在每个渲染上进行昂贵的计算。

缺点：
(1) 代码可读性差：useMemo 的代码更臃肿，可读性较差，因为它将多个生命周期函数合并为一个函数，使得代码难以理解。
(2) 依赖管理复杂：useMemo 的依赖管理比较复杂，需要仔细管理依赖数组中的变量，否则可能会导致副作用执行不正确。
(3) 性能问题：当依赖数组中的变量更新时，useMemo 会执行副作用，这可能会导致不必要的副作用执行，从而影响性能。因此，在使用 useMemo 时，需要注意依赖数组中的变量，避免不必要的副作用执行。

### **useCallback**
它与useMemo类似，只不过缓存的是函数。
场景：
（1）避免在每次渲染时都创建新的函数，从而避免不必要的重新渲染。
（2）将函数传递给子组件时，可以避免子组件在每次渲染时都重新创建函数，从而提高性能。

### **useReducer**
useReducer 是 React 提供的一个用于管理复杂状态逻辑的 Hook。它接受一个 reducer 函数和一个初始状态作为参数，并返回一个状态和一个 dispatch 函数。reducer 函数接受两个参数，一个是当前状态，另一个是 action，根据 action 的类型来更新状态。

### **useRef**
保存数据（跨组件周期），及时组件重新渲染，保存的数据依然还在，保存的数据不会被更改，触发组件重新渲染。

### **useImperativeHandle**
它允许在函数组件中自定义暴露给父组件的实例值、方法等。

总的来说，React Hooks是React 16.8引入的新特性，它允许在函数组件中使用状态和其他React特性。React Hooks的性能优化主要体现在避免不必要的重新渲染和避免组件的重复渲染方面。

## 不常用的hooks

### **useSyncExternalStore**
seSyncExternalStore 是 React 18 引入的一个新的 Hook。可以让你在函数组件中订阅外部存储，并在存储更新时重新渲染组件。这个 Hook 特别适用于那些需要与外部系统（如 Redux store、Context 等）进行交互的场景。
```js
const state = useSyncExternalStore(
  subscribe, // 订阅函数，当数据源更新时调用
  getSnapshot, // 获取当前数据快照的函数
  getServerSnapshot // 可选，用于获取服务端渲染时的数据快照
);
```
参数说明
* subscribe：一个函数，用于订阅外部数据源的变化（如Redux Store）。当数据源发生变化时，React 会调用这个函数，并传入一个回调函数，当数据源更新时，需要调用这个回调函数来通知 React 重新渲染组件。
* getSnapshot：一个函数，用于获取当前数据源的快照。每次组件渲染时，React 都会调用这个函数来获取最新的数据。
* getServerSnapshot：一个可选的函数，用于获取服务端渲染时的数据快照。这个函数只在服务端渲染时调用，用于确保服务端和客户端的数据一致性。


### **useTransition**
useTransition 是 React 18 引入的一个新的 Hook。它可以让你在组件中创建一个过渡状态，以便在更新过程中提供更好的用户体验。这个 Hook 特别适用于那些需要处理大量数据或复杂计算的场景。

```js
const [isPending, startTransition] = useTransition();
```
参数说明
* isPending：一个布尔值，表示当前是否有过渡正在进行。如果为 true，则表示有过渡正在进行，此时应该避免执行任何阻塞用户界面的操作。

### **useDeferredValue**
useDeferredValue 是 React 18 引入的一个新的 Hook。它可以让你在组件中创建一个延迟值，以便在更新过程中提供更好的用户体验。这个 Hook 特别适用于那些需要处理大量数据或复杂计算的场景。

```js
const deferredValue = useDeferredValue(value);
```
参数说明
* value：一个值，可以是任何类型的数据。这个值会被延迟更新，以便在更新过程中提供更好的用户体验。

### **useId**


## react路由Hooks

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



### useParameters
useParameters 是 React Router 提供的一个 Hook，用于在函数组件中获取当前路由的参数。它返回一个包含当前路由参数的对象。
```js
import { useParameters } from 'react-router-dom';

function MyComponent() {
  const params = useParameters();

  console.log(params.id); // 获取名为 'id' 的路由参数的值

  return (
    <div>Current id: {params.id}</div>
  );
}
```

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
