# Redux中间件

## 1. 什么是中间件

Redux允许我们使用中间件来扩展Redux应用程序。

Redux 中间件（Middleware）是 Redux 提供的一种机制，用于在 Redux store 和 Redux action 之间添加自定义的逻辑。中间件可以拦截 Redux action，修改它们，或者延迟它们的分发。

Redux 中间件的主要用途包括：

1. **日志记录**：记录 Redux action 的分发和状态的变化，方便调试和追踪问题。
2. **异步操作**：处理异步操作，如 API 请求，并返回一个 Promise 或一个 action。
3. **错误处理**：处理 Redux action 分发过程中的错误。
4. **副作用**：执行副作用操作，如发送网络请求、读取或写入本地存储等。

Redux 中间件的基本工作原理是，Redux store 在分发 action 时，会先调用中间件，然后再调用 reducer。中间件可以拦截 action，修改它们，或者延迟它们的分发。

## 2. 加入中间件后的reducer

<figure><img src="../../../.gitbook/assets/redux加入了中间件后工作流 (1).svg" alt=""><figcaption></figcaption></figure>

store拿到actions后，将actions传递给中间件，中间件处理完actions后，将同步的actions传递给reducer，然后reducer更新state并返回最新state给到store，最后store同步更新到component。

## **3. 中间件开发的模板代码**

是一个柯里化形式的函数。

<div align="left">

<figure><img src="../../../.gitbook/assets/截屏2024-09-17 09.39.22.png" alt="" width="373"><figcaption></figcaption></figure>

</div>

1. 最内层返回的action=>{}函数，形参是action，这个方法可以决定对action如何处理
2. 中间返回的next=>{}，形参是next，next是一个函数，当中间件的逻辑代码（action=>{}的{}中的逻辑代码)执行完成后，就会调用next方法，next方法的目的是将action返回的结果传递给reducer或者下一个中间件。
3. 最外层的store=>{}，可以通过store获取disptach，来触发其他的action；也可以拿到其他的变量，如store.getState()拿到全局状态。

## 4. 注册中间件

中间件只有被注册后，才能在readux中被使用

```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));
```

在上面的示例中，`applyMiddleware` 函数将 `thunk` 中间件应用到 Redux store 中。`thunk` 中间件允许 Redux action 是一个函数，而不是一个普通的对象。这个函数可以包含异步操作，并返回一个 action 或一个 Promise。

#### 注意事项

* Redux 中间件应该是一个纯函数，它不应该修改传入的参数，而是返回一个新的参数。
* Redux 中间件应该遵循一些约定，如返回一个新的函数，该函数接受 `next` 和 `action` 作为参数，并返回一个新的函数，该函数接受 `next` 和 `action` 作为参数。
* Redux 中间件应该遵循一些最佳实践，如使用 `redux-thunk` 处理异步操作，使用 `redux-promise` 处理 Promise，使用 `redux-saga` 处理副作用操作等。

通过使用 Redux 中间件，可以扩展 Redux 的功能，使其能够处理更复杂的场景，如异步操作、副作用操作等。

## 5. 开发一个中间件

applyMiddleware可以接收多个中间件，如下，logger和test两个中间件依次被注册，<mark style="color:purple;">执行顺序与注册顺序一致</mark>。

```javascript

import { createStore, applyMiddleware } from "redux";
import logger from "./logger";
import { reducer } from "./reducers";
import test from "./test";

// applyMiddleware 依次注册中间件，执行顺序与注册顺序一致
export const store = createStore(reducer, applyMiddleware(logger, test));
```

{% code title="logger.js【logger中间件】" %}
```javascript
export default (store) => (next) => (action) => {
  console.log("store", store);
  console.log("action", action);
  let result = next(action); // next(action)执行完之后，返回的结果
  console.log("next Store", store.getState()); // 打印执行完action后的store
  return result;
};
```
{% endcode %}

## 6. 开发thunk中间件

以下代码实现一个异步中间件。dispatch原先接受一个同步action对象触发同步reducer更改store，这里可以接受一个异步action 函数，这个异步action函数接受dispatch方法作为入参，可以用来异步触发同步action，从而实现异步更改store。

```javascript
/**
 * 1. 当前这个中间件函数不关心你想执行什么样的异步操作，只关心你执行的是不是异步操作
 * 2. 如果执行的是异步操作，你在触发action的时候传给我一个函数，如果执行的是同步操作，就传action对象
 * 3. 异步操作代码要写在传递进来的函数里面
 * 4. 当这个中间件函数在调用你传递进来的函数时，要将dispatch方法传递进去，这样在异步action函数中可以去dispatch新的action，从而更改redcuer
 */
export default (store) => (next) => (action) => {
  if (typeof action === "function") {
    // 这样在异步函数中可以使用dispatch方法了
    return action(store.dispatch);
  }
  next(action);
};
```

```javascript
// action定义
export const increment_async = () => (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: "increment", // 计数器递增的action
    });
  }, 2000);
};
// 异步触发action方式
dispatch(increment_async())
```
