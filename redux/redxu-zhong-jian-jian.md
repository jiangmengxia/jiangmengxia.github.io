# Redxu中间件

## 什么是中间件

Redux允许我们使用中间件来扩展Redux应用程序。

Redux 中间件（Middleware）是 Redux 提供的一种机制，用于在 Redux store 和 Redux action 之间添加自定义的逻辑。中间件可以拦截 Redux action，修改它们，或者延迟它们的分发。

Redux 中间件的主要用途包括：

1. **日志记录**：记录 Redux action 的分发和状态的变化，方便调试和追踪问题。
2. **异步操作**：处理异步操作，如 API 请求，并返回一个 Promise 或一个 action。
3. **错误处理**：处理 Redux action 分发过程中的错误。
4. **副作用**：执行副作用操作，如发送网络请求、读取或写入本地存储等。

Redux 中间件的基本工作原理是，Redux store 在分发 action 时，会先调用中间件，然后再调用 reducer。中间件可以拦截 action，修改它们，或者延迟它们的分发。

#### 使用示例

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



## 加入中间件后的reducer

<figure><img src="../.gitbook/assets/redux加入了中间件后工作流 (1).svg" alt=""><figcaption></figcaption></figure>

store拿到actions后，将actions传递给中间件，中间件处理完actions后，将同步的actions传递给reducer，然后reducer更新state并返回最新state给到store，最后store同步更新到component。
