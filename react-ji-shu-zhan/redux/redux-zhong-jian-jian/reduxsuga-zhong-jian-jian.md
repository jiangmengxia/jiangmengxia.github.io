# redux-suga中间件

## 作用

`redux-saga` 是一个 Redux 中间件，用于<mark style="background-color:purple;">处理副作用</mark>操作。在 Redux 中，action 是一个普通的对象，它包含了 action 的类型和 payload。然而，有时候我们需要在分发 action 之前执行一些副作用操作，如 API 请求、读取或写入本地存储等。这时，我们也可以使用 `redux-saga` 中间件，将副作用操作封装在 saga 中。

<mark style="background-color:purple;">redux-suga跟redux-thunk作用是一样的，都是用来处理异步操作的。redux-suga相比之下更为强大，它可以将异步操作从Action Creator中抽离出来，放在一个独立的文件夹中</mark>。

## 使用

#### 使用示例

```javascript
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas'; // sagas 定义了所有的副作用

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
// 启用suga
sagaMiddleware.run(rootSaga);
```

在上面的示例中，`createSagaMiddleware` 函数创建了一个 saga 中间件，并将其应用到 Redux store 中。`rootSaga` 是一个 saga，<mark style="color:purple;">它包含了所有的副作用操作</mark>。`sagaMiddleware.run(rootSaga)` 会<mark style="color:purple;">启动 saga，并开始处理副作用操作</mark>。



`redux-saga` 的 saga 是一个 <mark style="background-color:purple;">Generator 函数</mark>，用于处理副作用操作。saga 可以包含多个步骤，每个步骤可以是一个普通的操作，如分发一个 action，或者是一个异步操作，如发起一个 API 请求。

**相关APIs**:

* put方法：将结果传给reducer，reducer修改并更新store
* call方法： 执行异步函数，取得结果
* takeEvery：监听某个action的触发 （类似于subscribe)，当action触发时，执行对应的suga副作用方法。
* all：用于并行执行多个 saga。`all` 函数接受一个数组作为参数，数组中的每个元素都是一个 saga。`all` 函数会并行执行这些 saga，并返回一个 Promise，该 Promise 在所有 saga 都完成后才会被解析。
* delay：用于延迟执行

**示例**：

{% code title="sagas.js -- 定义副作用" %}
```javascript
import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_USER } from './actions';
import { fetchUserSuccess } from './actions';

function* fetchUserSaga(action) {
  try {
    const user = yield call(fetch, `/api/users/${action.payload}`);
    yield put(fetchUserSuccess(user));
  } catch (error) {
    console.error(error);
  }
}

function* rootSaga() {
  yield takeEvery(FETCH_USER, fetchUserSaga);
}

export default rootSaga;
```
{% endcode %}

```jsx
<button 
    // 方法一 ：传参payload
    onclick={()=>payload=>({type:FETCH_USER,payload})}
    // 方法二：无需传参payload
    onclick={()=>({type:FETCH_USER,payload})}
>
触发异步action
</button>
```

在上面的示例中，`fetchUserSaga` 是一个 saga，它处理 `FETCH_USER` action。saga 使用 `call` 函数发起一个 API 请求，并使用 `put` 函数分发一个 action。`rootSaga` 是一个 saga，它使用 **`takeEvery` 函数监听 `FETCH_USER` action，并在 action 分发时调用 `fetchUserSaga` saga**。



## suga文件的拆分与合并

使用all方法，合并多个suga

```javascript
import { all } from "redux-suga/effects";
import CounterSuga from "./counter.suga";
import ModalSuga from "./modal.suga";

export default function* rootSaga() {
  yield all([
    // your sagas here
    CounterSuga(),
    ModalSuga(),
  ]);
}
```

{% code title="counter.suga.js" %}
```javascript

export default function* CounterSuga(state = {}, action) {
  // 监听INC action
  yield takeEvery(actionTypes.INC, function* (action) {
    // ...
  });
  // 监听DEC action
  yield takeEvery(actionTypes.DEC, function* (action) {
    // ...
  });
}

```
{% endcode %}

{% code title="modal.suga.js" %}
```javascript
export default function* ModalSuga(state = {}, action) {
  // 监听MODAL_OPEN的action
  yield takeEvery(actionTypes.MODAL_OPEN, function* (action) {
    // ...
  });
}
```
{% endcode %}



