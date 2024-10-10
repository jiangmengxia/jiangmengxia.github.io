# React中使用Redux（react-redux）

## Redux的工作流

<figure><img src="../../.gitbook/assets/react中redux工作流 (2).svg" alt=""><figcaption></figcaption></figure>

* 组件内部通过触发一个action
* Store接收到action并将action分发给Reducer
* Reducer根据action类型将状态更改后，将新的状态返回给store
* 组件订阅(subscribe）了Store中的状态，Store中的状态更新会同步到组件

这里的store指的是通过createStore得到的实例。

## react-redux

<mark style="background-color:purple;">`react-redux`</mark> 是一个用于将 React 与 Redux 集成的库。它提供了一些 API，如 `Provider`、`connect` 和 `useSelector` 等，用于将 Redux store 与 React 组件连接起来。

### **Provider组件**

Provider组件的作用：将创建出来的store放在一个全局的地方，供全部组件使用，因此需要包裹在所有组件的最外层。

```javascript
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provier>
,container)
```

### **Connect组件**

**Connect作用**

* 帮助订阅store，并在store中状态发生更新时，帮助我们重新渲染组件。
* 可以拿到store的状态，并映射到组件中的props中对应的属性（通过<mark style="background-color:purple;">`mapStateToProps`</mark>`入参进行映射）`
* 可以获取dispatch方法，从而可以使用dispatch方法调用action（通过`mapDispatchToProps入参映射到props的方法）`

`connect` 是 Redux 提供的一个高阶函数，用于将 React 组件与 Redux store 连接起来。`connect` 函数接受两个参数：`mapStateToProps` 和 `mapDispatchToProps`，并返回一个新的函数，该函数接受一个 React 组件作为参数，并返回一个新的 React 组件。

#### `mapStateToProps`

`mapStateToProps` 是一个函数，用于将 Redux store 中的状态映射到组件的 props 中。`mapStateToProps` 函数接受两个参数：`state` 和 `ownProps`，并返回一个对象，该对象包含了需要传递给组件的 props。

#### `mapDispatchToProps`

`mapDispatchToProps` 是一个函数，用于将 Redux store 中的 dispatch 方法映射到组件的 props 中。`mapDispatchToProps` 函数接受两个参数：`dispatch` 和 `ownProps`，并返回一个对象，该对象包含了需要传递给组件的 props。

#### 使用示例1 - 不传`mapDispatchToProps`

```javascript
import { connect } from 'react-redux';
import { increment } from './actions';

function Counter({ 
  count, // store中的count状态Ï
  dispatch // connect帮助加上去的
 }) {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={()=>{
        // 使用dispatch触发一个increment的action
        dispatch(increment())
      }}>Increment</button>
    </div>
  );
}

const mapStateToProps = state => ({
  count: state.count
});

export default connect(mapStateToProps)(Counter);
```

#### 使用示例2-传`mapDispatchToProps`

```javascript
import { connect } from 'react-redux';
import { increment } from './actions';

function Counter({ 
  count, // store中的count状态
  increment, // 该方法中使用dispatch触发一个increment的action
}) {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

const mapStateToProps = state => ({
  count: state.count
});

const mapDispatchToProps = dispatch => ({
  increment: () => dispatch(increment())
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

在上面的示例中，`Counter` 组件通过 `connect` 函数与 Redux store 连接起来。`mapStateToProps` 函数将 Redux store 中的 `count` 状态映射到组件的 `count` prop 中。`mapDispatchToProps` 函数将 Redux store 的 `dispatch` 方法映射到组件的 `increment` prop 中。这样，`Counter` 组件就可以通过 `count` prop 访问 Redux store 中的 `count` 状态，并通过 `increment` prop 触发 Redux store 的 `increment` action。

## counterReducer合并reducers

拆分：将不同业务的reducer拆分，每一个reducer的结构都是一样的

合并：利用reducer的Conbine，`combineReducers` 用于将多个 reducer 合并为一个 reducer。在大型应用中，通常会有多个 reducer，每个 reducer 负责管理应用的一部分状态。`combineReducers` 函数可以将这些 reducer 合并为一个 reducer，这样 Redux store 就可以管理整个应用的状态。

```javascript
import { combineReducers } from 'redux';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todoReducer
});

export default rootReducer;

```
