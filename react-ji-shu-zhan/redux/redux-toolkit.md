# Redux-toolkit

## 1. 前言

Redux Toolkit 是 Redux 官方提供的一个工具集，是对Redux的二次封装，用于<mark style="background-color:purple;">简化 Redux</mark> 的使用。

官网：[https://cn.redux-toolkit.js.org/tutorials/quick-start](https://cn.redux-toolkit.js.org/tutorials/quick-start)

安装：

```
npm install @reduxjs/toolkit 
```

## 2. 状态切片-createSlice

Redux Toolkit 的状态切片（State Slice）是一个用于定义 Redux reducer 和 action 的工具。状态切片将 reducer 和 action 定义在一个地方，从而简化 Redux 的使用。

对于状态切片，可以认为它就是一个小小的Reducer函数。在Redux中原本Reducer函数和Action对象都需要分别创建，现在可以由状态切片来替换，也就是说它会返回Reducer函数和Actions（<mark style="background-color:purple;">实际上action对象都不需要了，直接可以通过Actions.\[actionName]触发一个reducer变更</mark>）。

<figure><img src="../../.gitbook/assets/截屏2024-09-18 22.53.23.png" alt=""><figcaption></figcaption></figure>

**案例**：

```javascript
const counterSlice = createSlice({
  name: 'counter', // 唯一的命名空间
  initialState: 0, // 初始状态
  reducers: {
    increment: state => state + 1,
    // decrement: state => state - 1,
    decrement:(state, action)=>{
      return state-action.payload
    }
  }
});
export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

## 3. 创建Store - configureStore

`configureStore` 用于创建 Redux store。`configureStore` 函数接受一个配置对象作为参数，该对象包含了 Redux store 的配置信息，如 reducer、中间件等。

这里定义的多个reducer就相当于之前CombineReducer做的事情了。

```javascript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import todoReducer from './todoSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo:todoReducer
  }
  devTools:process.env.NODE_ENV!=="'production'"
});
```

## 4. Provider配置

将[创建Store - configureStore](redux-toolkit.md#id-3.-chuang-jian-store-configurestore) 中创建的store，通过Provider放进整个上下文中。

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'

// As of React 18
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

## 5. 触发actions

```javascript
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'
import styles from './Counter.module.css'

export function Counter() {
  const count = useSelector((state) => state.counter)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
```

## 6. Action预处理-prepare

参考：[https://www.bilibili.com/video/BV1tu411a7bN?p=42\&vd\_source=36cd504ec13dd4e9f53ea20a7fadae5f](https://www.bilibili.com/video/BV1tu411a7bN?p=42\&vd\_source=36cd504ec13dd4e9f53ea20a7fadae5f)

在 Redux Toolkit 中，`prepare` 是一个用于准备 Redux action 的函数。`prepare` 函数接受一个函数作为参数，该函数接受 Redux action 的类型和 payload 作为参数，并返回一个新的 Redux action。

#### 使用示例1：

```javascript
import { createAction } from '@reduxjs/toolkit';

const increment = createAction('INCREMENT', prepare => {
  return {
    // 每次只能加1
    payload: prepare(1)
  };
});

// 使用 action
store.dispatch(increment());

```

在上面的示例中，`increment` 是一个 Redux action，它使用 `prepare` 函数来准备 Redux action 的 payload。

**使用示例2：**

```javascript
const counterSlice = createSlice({
  name: 'counter', // 唯一的命名空间
  initialState: 0, // 初始状态
  reducers: {
    increment: {
      reducer:state => state + 1,
       // v是action的传参
      prepare: v=>{
       // 用于覆盖原有的payload值，可以用于倒计时的场景
       return { payload:v<0 ? 60 : v}
      }
    }
  }
});
```

## 7. 执行异步操作-CreateAsyncThunk

[https://redux-toolkit-cn.netlify.app/api/createasyncthunk/](https://redux-toolkit-cn.netlify.app/api/createasyncthunk/)

<mark style="background-color:purple;">dispatch(PromiseInstance)</mark>派发异步action，<mark style="background-color:purple;">PromiseInstance</mark>是一个异步action。

createSlice创建的切片中，定义<mark style="background-color:purple;">extraReducers</mark>用来处理异步action返回不同结果的reducer。

如下图，<mark style="background-color:blue;">\[fetchUserById.fulfilled]:(state, action)=>{}</mark> 实现的是当异步action执行成功时的reducer。

```javascript
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from './userAPI'

// 首先, 创建 thunk
const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId, thunkAPI) => {
    const response = await userAPI.fetchById(userId)
    return response.data
  }
)

// 接着, 在你的 reducers 中处理这些 actions:
const usersSlice = createSlice({
  name: 'users',
  initialState: { entities: [], loading: 'idle' },
  reducers: {
    // 标准 reducer 逻辑, 带有每个 reducer 自动生成的 action types
  },
  extraReducers: {
    // 在这里添加处理额外 action types 的 reducers, 并且如果有需要的话，也在此处理加载状态
    [fetchUserById.fulfilled]: (state, action) => {
      // 把用户添加到 state 数组中
      state.entities.push(action.payload)
    }
  }
})

// 稍后, 在应用中需要用到的地方派发这个 thunk
dispatch(fetchUserById(123))
```
