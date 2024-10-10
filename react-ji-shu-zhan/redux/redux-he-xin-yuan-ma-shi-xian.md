# Redux核心源码实现

## 1. 实现createStore

```javascript
/*
* reducer ： 根据action的Type来更改store
* preloadedState： store的初始状态
* enhancer：对store的功能进行增强
* 返回一个store对象
*/
createStore(reducer,preloadedState,enhancer)

```

返回store对象，该对像包含以下方法：

* getState：用来获取全局状态
* dispatch：用来分发一个action
* subscribe：用来监听action的分发，绑定listener。

```javascript
function createStore(reducer, preloadState, enhancer) {
  // 约束reducer函数类型
  if (typeof reducer !== "function") {
    throw new Error("reducer必须是一个函数");
  }
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error("enhancer必须是一个函数");
    }
    // 自己去创建自定义的store，实现更强大的store功能
    return enhancer(createStore)(reducer, preloadState);
  }

  // 表示store对象中存储的全局状态
  let state = preloadState;
  // 存储订阅者函数集合
  let listeners = [];

  // 获取状态的
  function getState() {
    return state;
  }

  // 方法用来触发action
  function dispatch(action) {
    // 判断action是否是对象
    if (!isPlainObject(action)) {
      throw new Error("action必须是一个对象");
    }
    if (action.type === undefined) {
      throw new Error("action必须有一个type属性");
    }
    // 调用reducer函数，更新全局状态
    state = reducer(state, action);
    // 触发订阅者函数
    listeners.forEach((listener) => listener());
  }

  // 订阅方法
  function subscribe(listener) {
    listeners.push(listener);
    // 返回一个函数，用来取消订阅
    return function () {
      listeners = listeners.filter((l) => l !== listener);
    };
  }
  return {
    getState,
    dispatch,
    subscribe,
  };
}

function isPlainObject(obj) {
  // 排除基本数据类型和空值
  if (typeof obj === "object" || obj === null) return false;
  //区分数组和对象
  //   if (Object.getPrototypeOf(obj) === Object.prototype) return true;
  //   return false;
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}

```

## 2. 实现一个enhancer

<mark style="background-color:purple;">enhancer的目的是为了强化store，一般情况下，就是加强dispatch</mark>

### enhancer

{% code title="实现一个增强版store" %}
```javascript
// 实现与thunk方法一样的功能，：dispatch允许分发异步action
function enhancer(createStore) {
  return function (reducer, preloadState) {
    // 创建store
    const store = createStore(reducer, preloadState);
    const dispatch = store.dispatch;

    // 增强的dispatch方法,做的事跟实现的thunk方法一样
    function _dispatch(action) {
      // 异步action
      if (typeof action === "function") {
        return action(dispatch);
      }
      // 同步的，调用原本的dispatch方法
      dispatch(action);
    }

    // 返回store
    return {
      ...store,
      dispatch: _dispatch, // 重写dispatch方法
    };
  };
}
```
{% endcode %}

### 完整案例

{% code title="index.html" %}
```html
<!--
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-09-17 16:20:39
 * @LastEditors: jiangmengxia jiangmengxia@qq.com
 * @LastEditTime: 2024-09-17 17:46:58
 * @FilePath: /jiangmengxia.github.io/redux/demos/redux/index2.html
 * @Description: Description
-->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="btnInc">+</button>
    <span id="counter">0</span>
    <button id="btnDec">-</button>
    <script src="./index.js"></script>
  </body>
</html>

```
{% endcode %}

{% code title="index.js" %}
```javascript
/*
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-09-17 16:02:16
 * @LastEditors: jiangmengxia jiangmengxia@qq.com
 * @LastEditTime: 2024-09-18 21:59:09
 * @FilePath: /jiangmengxia.github.io/redux/demos/redux/enhancer/index.js
 * @Description: Description
 */

// 实现与thunk方法一样的功能，：dispatch允许分发异步action
function enhancer(createStore) {
  return function (reducer, preloadState) {
    // 创建store
    const store = createStore(reducer, preloadState);
    const dispatch = store.dispatch;

    // 增强的dispatch方法,做的事跟实现的thunk方法一样
    function _dispatch(action) {
      // 异步action
      if (typeof action === "function") {
        return action(dispatch);
      }
      // 同步的，调用原本的dispatch方法
      dispatch(action);
    }

    // 返回store
    return {
      ...store,
      dispatch: _dispatch, // 重写dispatch方法
    };
  };
}

function createStore(reducer, preloadState, enhancer) {
  // 约束reducer函数类型
  if (typeof reducer !== "function") {
    throw new Error("reducer必须是一个函数");
  }
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error("enhancer必须是一个函数");
    }
    // 自己去创建自定义的store，实现更强大的store功能
    return enhancer(createStore)(reducer, preloadState);
  }

  // 表示store对象中存储的全局状态
  let state = preloadState;
  // 存储订阅者函数集合
  let listeners = [];

  // 获取状态的
  function getState() {
    return state;
  }

  // 方法用来触发action
  function dispatch(action) {
    // 判断action是否是对象
    if (!isPlainObject(action)) {
      throw new Error("action必须是一个对象");
    }
    if (action.type === undefined) {
      throw new Error("action必须有一个type属性");
    }
    // 调用reducer函数，更新全局状态
    state = reducer(state, action);
    // 触发订阅者函数
    listeners.forEach((listener) => listener());
  }

  // 订阅方法
  function subscribe(listener) {
    listeners.push(listener);
    // 返回一个函数，用来取消订阅
    return function () {
      listeners = listeners.filter((l) => l !== listener);
    };
  }
  return {
    getState,
    dispatch,
    subscribe,
  };
}
function isPlainObject(obj) {
  // 排除基本数据类型和空值
  if (typeof obj !== "object" || obj === null) return false;
  //区分数组和对象
  //   if (Object.getPrototypeOf(obj) === Object.prototype) return true;
  //   return false;
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}

// 1. 创建一个 reducer
function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1,
      };
    case "DECREMENT":
      return {
        count: state.count - 1,
      };
    default:
      return state;
  }
}
/************************************************************************ */
// 自定义createStore方法+enhancer方法实现redux-thunk功能
function doCounter() {
  // 2. 创建一个 store
  const store = createStore(counter, { count: 0 }, enhancer);

  // 3. 订阅 store 的变化
  store.subscribe(() => {
    console.log(store.getState());
    document.getElementById("counter").innerText = store.getState().count;
  });

  document.getElementById("btnInc").onclick = () => {
    //   store.dispatch({ type: "INCREMENT" });
    store.dispatch((dispatch) => {
      setTimeout(() => {
        dispatch({ type: "INCREMENT" });
        console.log("延迟INC");
      }, 1000);
    });
  };
  document.getElementById("btnDec").onclick = () => {
    store.dispatch({ type: "DECREMENT" });
  };
}

doCounter();

```
{% endcode %}

## 3. 实现applyMiddleware

<mark style="background-color:purple;">applyMiddlewarea目的是生成一个可以注入多个中间件，运行多次加强store（主要也是加强dispatch），相当于返回一个超级加强版的enhancer。</mark>

### 完整案例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="btnInc">+</button>
    <span id="counter">0</span>
    <button id="btnDec">-</button>
    <script src="./index.js"></script>
  </body>
</html>

```

```javascript
/*
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-09-17 16:02:16
 * @LastEditors: jiangmengxia jiangmengxia@qq.com
 * @LastEditTime: 2024-09-17 21:47:00
 * @FilePath: /jiangmengxia.github.io/redux/demos/redux/applyMiddleware/index.js
 * @Description: Description
 */

// 实现与thunk方法一样的功能，：dispatch允许分发异步action
function enhancer(createStore) {
  return function (reducer, preloadState) {
    // 创建store
    const store = createStore(reducer, preloadState);
    const dispatch = store.dispatch;

    // 增强的dispatch方法,做的事跟实现的thunk方法一样
    function _dispatch(action) {
      // 异步action
      if (typeof action === "function") {
        return action(dispatch);
      }
      // 同步的，调用原本的dispatch方法
      dispatch(action);
    }

    // 返回store
    return {
      ...store,
      dispatch: _dispatch, // 重写dispatch方法
    };
  };
}
// 插件1
function logger(store) {
  return function l1(next) {
    return function l11(action) {
      console.log("====logger===", store);
      // console.log("action", action);
      let result = next(action); // next(action)执行完之后，返回的结果, next方法实际就是dispatch方法
      // console.log("next Store", store.getState()); // 打印执行完action后的store
      return result;
    };
  };
}
// 插件2
function thunk(store) {
  return function t1(next) {
    return function t11(action) {
      console.log("====thunk===", store);
      if (typeof action === "function") {
        // 这样在异步函数中可以使用dispatch方法了
        return action(store.dispatch);
      }
      next(action);
    };
  };
}

function createStore(reducer, preloadState, enhancer) {
  // 约束reducer函数类型
  if (typeof reducer !== "function") {
    throw new Error("reducer必须是一个函数");
  }
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error("enhancer必须是一个函数");
    }
    // 自己去创建自定义的store，实现更强大的store功能
    return enhancer(createStore)(reducer, preloadState);
  }

  // 表示store对象中存储的全局状态
  let state = preloadState;
  // 存储订阅者函数集合
  let listeners = [];

  // 获取状态的
  function getState() {
    return state;
  }

  // 方法用来触发action
  function dispatch(action) {
    // 判断action是否是对象
    if (!isPlainObject(action)) {
      throw new Error("action必须是一个对象");
    }
    if (action.type === undefined) {
      throw new Error("action必须有一个type属性");
    }
    // 调用reducer函数，更新全局状态
    state = reducer(state, action);
    // 触发订阅者函数
    listeners.forEach((listener) => listener());
  }

  // 订阅方法
  function subscribe(listener) {
    listeners.push(listener);
    // 返回一个函数，用来取消订阅
    return function () {
      listeners = listeners.filter((l) => l !== listener);
    };
  }
  return {
    getState,
    dispatch,
    subscribe,
  };
}
function isPlainObject(obj) {
  // 排除基本数据类型和空值
  if (typeof obj !== "object" || obj === null) return false;
  //区分数组和对象
  //   if (Object.getPrototypeOf(obj) === Object.prototype) return true;
  //   return false;
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}

// 1. 创建一个 reducer
function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1,
      };
    case "DECREMENT":
      return {
        count: state.count - 1,
      };
    default:
      return state;
  }
}

const compose = (...funcs) => {
  // logger  thunk
  console.log(funcs);
  // 倒着循环，才能先拿到thunk，再拿到logger
  return (dispatch) => {
    for (let i = funcs.length - 1; i >= 0; i--) {
      // applyMiddleware传入的w1,w2,w3中间件
      // w3拿到的是w2执行后的dispatch方法，w2拿到的是w1执行后的dispatch方法,w1拿到的是store.dispatch方法
      dispatch = funcs[i](dispatch);
    }
    return dispatch;
  };
};

// 自定义applyMiddleware方法，返回的是一个enhancer方法，
//                          即(createStore)=>(reducer,preloadState)=>{return 一个newStore}
// applyMiddleware作用是对dispatch加强功能
const applyMiddleware = (...middlewares) => {
  // 返回一个enhancer
  return function (createStore) {
    return (reducer, preloadState) => {
      // 创建store
      let store = createStore(reducer, preloadState);
      // 阉割版的store
      var middlewareApi = {
        getState: store.getState,
        dispatch: store.dispatch,
        subscribe: store.subscribe,
      };

      // 调用中间件的第一层函数，传递阉割版的store对象
      // 学习视频https://www.bilibili.com/video/BV1tu411a7bN?p=35&vd_source=36cd504ec13dd4e9f53ea20a7fadae5f
      // chain现在存的是两个next=>action=>{...}函数
      const chain = middlewares.map((middleware) => {
        return middleware(middlewareApi);
      });

      // 生成最后加强版的dispatch
      const dispatch = compose(...chain)(store.dispatch);
      return {
        ...store,
        dispatch,
      };
    };
  };
};

/****************** 使用 ***************************/
function doCounter() {
  // 2. 创建一个 store
  const store = createStore(
    counter,
    { count: 0 },
    applyMiddleware(logger, thunk)
  );

  // 3. 订阅 store 的变化
  store.subscribe(() => {
    console.log(store.getState());
    document.getElementById("counter").innerText = store.getState().count;
  });

  document.getElementById("btnInc").onclick = () => {
    //   store.dispatch({ type: "INCREMENT" });
    store.dispatch((dispatch) => {
      setTimeout(() => {
        dispatch({ type: "INCREMENT" });
        console.log("延迟INC");
      }, 1000);
    });
  };
  document.getElementById("btnDec").onclick = () => {
    store.dispatch({ type: "DECREMENT" });
  };
}

doCounter();

```

<mark style="color:red;">applyMiddleware是为了增强dispatch方法</mark>，传参是多个中间件，假设传入中间件分别为m1,m2,m3。

m1 = store=>next=>action=>{ // 返回新store}

m2 = store=>next=>action=>{ // 返回新store}

m3 = store=>next=>action=>{ // 返回新store}

applyMiddleware返回的是一个enhancer，格式是(createStore)=>(reducer,preloadState)=>{}

* applyMiddleware需要给每个中间件的最外层传入store，这个store来自createStore创建的。 store=>{}的目的是为了给中间件传入参数store，从而可以拿到dispatch方法，进行加强dispatch
* 对于中间函数<mark style="color:red;">next=>action=>{}中的入参next</mark>：实际上就是dispatch方法，其中m1的next是原生的store.dispatch，m2的next是经过m1中间件处理过的加强dispatch2，m3的next是经过m2中间件处理过的加强dispatch3。这里利用compose方法实现，当然也可以用其他方式实现，可参考如下简化后的代码：

```javascript
// const dispatch = compose(...chain)(store.dispatch);
// compose方法可以简化成以下代码：
let dispatch = store.dispatch;
middlewares.forEach((middleware) => {
const newDispatchCreator = middleware(middlewareApi);
    dispatch = newDispatchCreator(dispatch);
});
return {
   ...store,
   dispatch,
};
```

## 4. 实现bindActionCreators

它的作用是：

* 将actionCreator函数转化成可以触发action的函数。其中actionCreator函数用来创建action对象的

```javascript
import { bindActionCreators } from 'redux';
import { increment, decrement } from './actions';

const mapDispatchToProps = dispatch => ({
  increment: bindActionCreators(increment, dispatch),
  decrement: bindActionCreators(decrement, dispatch)
});
```

```javascript
// 实现bindActionCreators方法
function bindActionCreators(actionCreators, dispatch) {
    let bindActionCreators = {};
    Object.keys(actionCreators).forEach((key) => {
      bindActionCreators[key] = function () {
        const action = actionCreators[key]();
        console.log("action", action);
        dispatch(action);
      };
    });
    return bindActionCreators;
  }

  // actionCreator函数
  function increment() {
    return { type: "INCREMENT" };
  }
  // actionCreator函数
  function decrement() {
    return { type: "DECREMENT" };
  }

  // actions包含两个action方法，increment和decrement，可以直接调用来触发对应的action执行
  const actions = bindActionCreators({ increment, decrement }, store.dispatch);
  console.log("actions", actions); 
  // actions 等同于{
  //               increment:()=>{store.dispatch(type: "INCREMENT")} , 
  //               decrement:()=>{store.dispatch(type: "DECREMENT")} , 
  //              }

  document.getElementById("btnInc").onclick = () => {
    actions.increment();
  };
  document.getElementById("btnDec").onclick = () => {
    actions.decrement();
  };
```

## 5. 实现combineReducers

combineReducers允许我们将多个小的reducer合并成一个大的reducer。

### combineReducers

```javascript
function combineReducers(reducers) {
  // 1. 获取所有的key (count,count2)
  const reducerKeys = Object.keys(reducers);
  // 2. 返回一个新的reducer函数
  return function combination(state = {}, action) {
    // 3. 创建一个新的state对象
    const nextState = {};
    // 4. 遍历所有的key
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const reducer = reducers[key];
      // 5. 获取当前key的状态
      const previousStateForKey = state[key];
      // 6. 调用对应的reducer函数，更新状态
      const nextStateForKey = reducer(previousStateForKey, action);
      // 7. 将新的状态设置到新的state对象中
      nextState[key] = nextStateForKey;
    }
    // 8. 返回新的state对象
    return nextState;
  };
}
```

### 完整案例

{% code title="index.html" %}
```html
<!--
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-09-17 16:20:39
 * @LastEditors: jiangmengxia jiangmengxia@qq.com
 * @LastEditTime: 2024-09-17 23:20:54
 * @FilePath: /jiangmengxia.github.io/redux/demos/redux/combineReducers/index2.html
 * @Description: Description
-->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>bindActionCreators</h1>
    couter1
    <button id="btnInc">+</button>
    <span id="counter1">0</span>
    <button id="btnDec">-</button><br /><br />
    couter2
    <button id="btnInc2">+</button>
    <span id="counter2">0</span>
    <button id="btnDec2">-</button>
    <script src="./index.js"></script>
  </body>
</html>

```
{% endcode %}

{% code title="index.js" %}
```javascript
/*
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-09-17 16:02:16
 * @LastEditors: jiangmengxia jiangmengxia@qq.com
 * @LastEditTime: 2024-09-17 23:20:59
 * @FilePath: /jiangmengxia.github.io/redux/demos/redux/combineReducers/index.js
 * @Description: Description
 */

// 实现与thunk方法一样的功能，：dispatch允许分发异步action
function enhancer(createStore) {
  return function (reducer, preloadState) {
    // 创建store
    const store = createStore(reducer, preloadState);
    const dispatch = store.dispatch;

    // 增强的dispatch方法,做的事跟实现的thunk方法一样
    function _dispatch(action) {
      // 异步action
      if (typeof action === "function") {
        return action(dispatch);
      }
      // 同步的，调用原本的dispatch方法
      dispatch(action);
    }

    // 返回store
    return {
      ...store,
      dispatch: _dispatch, // 重写dispatch方法
    };
  };
}

function createStore(reducer, preloadState, enhancer) {
  // 约束reducer函数类型
  if (typeof reducer !== "function") {
    throw new Error("reducer必须是一个函数");
  }
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error("enhancer必须是一个函数");
    }
    // 自己去创建自定义的store，实现更强大的store功能
    return enhancer(createStore)(reducer, preloadState);
  }

  // 表示store对象中存储的全局状态
  let state = preloadState;
  // 存储订阅者函数集合
  let listeners = [];

  // 获取状态的
  function getState() {
    return state;
  }

  // 方法用来触发action
  function dispatch(action) {
    // 判断action是否是对象
    if (!isPlainObject(action)) {
      throw new Error("action必须是一个对象");
    }
    if (action.type === undefined) {
      throw new Error("action必须有一个type属性");
    }
    // 调用reducer函数，更新全局状态
    state = reducer(state, action);
    // 触发订阅者函数
    listeners.forEach((listener) => listener());
  }

  // 订阅方法
  function subscribe(listener) {
    listeners.push(listener);
    // 返回一个函数，用来取消订阅
    return function () {
      listeners = listeners.filter((l) => l !== listener);
    };
  }
  return {
    getState,
    dispatch,
    subscribe,
  };
}
function isPlainObject(obj) {
  // 排除基本数据类型和空值
  if (typeof obj !== "object" || obj === null) return false;
  //区分数组和对象
  //   if (Object.getPrototypeOf(obj) === Object.prototype) return true;
  //   return false;
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}

// 1. 创建一个 reducer
// function counter

const countorRedux = {
  preloadState: { count: 0 }, // 初始状态
  reducer: (state = countorRedux.preloadState, action) => {
    switch (action.type) {
      case "INCREMENT":
        return {
          count: state.count + 1,
        };
      case "DECREMENT":
        return {
          count: state.count - 1,
        };
      default:
        return state;
    }
  },
  actionCreators: {
    increment() {
      return { type: "INCREMENT" };
    },
    decrement() {
      return { type: "DECREMENT" };
    },
  },
};

const counter2Redux = {
  preloadState: { count: 100 }, // 初始状态
  reducer: (state = counter2Redux.preloadState, action) => {
    switch (action.type) {
      case "INCREMENT_ASYNC":
        return {
          count: state.count + 1,
        };
      case "DECREMENT_ASYNC":
        return {
          count: state.count - 1,
        };
      default:
        return state;
    }
  },
  actionCreators: {
    incrementAsync() {
      // return { type: "INCREMENT_ASYNC" };
      return (dispatch) => {
        setTimeout(() => {
          dispatch({ type: "INCREMENT_ASYNC" });
        }, 1000);
      };
    },
    decrementAsync() {
      // return { type: "DECREMENT_ASYNC" };
      return (dispatch) => {
        setTimeout(() => {
          dispatch({ type: "DECREMENT_ASYNC" });
        }, 1000);
      };
    },
  },
};

function combineReducers(reducers) {
  // 1. 获取所有的key (count,count2)
  const reducerKeys = Object.keys(reducers);
  // 2. 返回一个新的reducer函数
  return function combination(state = {}, action) {
    // 3. 创建一个新的state对象
    const nextState = {};
    // 4. 遍历所有的key
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const reducer = reducers[key];
      // 5. 获取当前key的状态
      const previousStateForKey = state[key];
      // 6. 调用对应的reducer函数，更新状态
      const nextStateForKey = reducer(previousStateForKey, action);
      // 7. 将新的状态设置到新的state对象中
      nextState[key] = nextStateForKey;
    }
    // 8. 返回新的state对象
    return nextState;
  };
}

function doCounter() {
  // 2. 创建一个 store
  const store = createStore(
    combineReducers({
      counter1: countorRedux.reducer,
      counter2: counter2Redux.reducer,
    }),
    {
      count: 0,
    },
    enhancer
  );

  // 3. 订阅 store 的变化
  store.subscribe(() => {
    console.log(store.getState());
    document.getElementById("counter1").innerText =
      store.getState().counter1.count;
    document.getElementById("counter2").innerText =
      store.getState().counter2.count;
  });

  //
  function bindActionCreators(actionCreators, dispatch) {
    let bindActionCreators = {};
    Object.keys(actionCreators).forEach((key) => {
      bindActionCreators[key] = function () {
        const action = actionCreators[key]();
        dispatch(action);
      };
    });
    return bindActionCreators;
  }

  // actions包含两个action方法，increment和decrement，可以直接调用来触发对应的action执行
  const actions = bindActionCreators(
    {
      increment: countorRedux.actionCreators.increment,
      decrement: countorRedux.actionCreators.decrement,
      incrementAsync: counter2Redux.actionCreators.incrementAsync,
      decrementAsync: counter2Redux.actionCreators.decrementAsync,
    },
    store.dispatch
  );

  document.getElementById("btnInc").onclick = () => {
    actions.increment();
  };
  document.getElementById("btnDec").onclick = () => {
    actions.decrement();
  };
  document.getElementById("btnInc2").onclick = () => {
    actions.incrementAsync();
  };
  document.getElementById("btnDec2").onclick = () => {
    actions.decrementAsync();
  };
}

doCounter();

```
{% endcode %}

## 6. 实现Provider组件\&connect方法

### Provider

其中Provider是利用createContext生成一个全局的上下文，存放store对象，供全局上下文能通过useContext获取到store对象。

**具体实现**：

```javascript
  const { createContext, useContext, useEffect, useState } = React;
      const ReduxProvider = createContext(); // 创建一个上下文对象

      // Provider组件，将store传递给子组件
      function Provider({ store, children }) {
        const [_, forceUpdate] = useState(store.getState());
        // 这里可以通过unsubscribe监听store值的变更
        // useEffect(() => {
        //   // 需要在store变更时，更新store的值（引用值要修改）
        //   const unsubscribe = store.subscribe(() => {
        //     forceUpdate(store.getState());
        //   });

        //   // 移除监听器
        //   return () => {
        //     unsubscribe();
        //   };
        // }, [store]);

        // 虽然store本身没变，引起了本组件的重绘
        // 但是传给子组件的props没有变化，子组件不会重绘
        return (
          <ReduxProvider.Provider value={store}>
            {children}
            ReduxProvider 中测试渲染 {Date.now()}
          </ReduxProvider.Provider>
        );
      }
```

### connect

connect是一个装饰器，用来包装每一个需要用到store中状态的组件，返回一个新的组件。connect方法实现了以下功能：

（1）获取到store，并且将子组件中需要用的状态和actions分发方法（形如：dispatch=>dispatc(action)）传给子组件，便于子组件随时使用

（2）监听全局store的变更，并且引起组件的重绘，从而引起子组件的重绘

（3）通过mapStateToProps和mapDispatchToProps，只将子组件需要的state、actions分发方法传给子组件，并且映射到对应的props

**具体实现**：

```javascript
      // 高阶函数，返回一个函数，这个函数接受一个组件作为参数，返回一个新的组件
      // https://www.programfarmer.com/articles/2023/redux-make-provider-and-connect
      function connect(mapStateToProps, mapDispatchToProps) {
        return function (Component) {
          return function (ownProps) {
            const store = useContext(ReduxProvider);
            const states = store.getState();
            const actionsProps =
              (mapDispatchToProps &&
                mapDispatchToProps(store.dispatch, ownProps)) ||
              {};

            const stateProps =
              (mapStateToProps && mapStateToProps(states, ownProps)) || {};
            // 加上下面这段，实现：更新store时，重新渲染Component组件
            // 由于本组件每次re-render都会重新生成新的stateProps和actionsProps，因此必然会引起子组件的re-render
            const [_, forceUpdate] = useState({});
            useEffect(() => {
              const unsubscribe = store.subscribe(() => {
                forceUpdate({});
              });
              return () => {
                unsubscribe();
              };
            }, [store]);
            return (
              <div>
                <Component
                  {...ownProps}
                  {...stateProps}
                  {...actionsProps}
                  titile="this is a test"
                />
              </div>
            );
          };
        };
      }

```

### 完整案例

```html
<!--
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-09-17 16:20:39
 * @LastEditors: jiangmengxia jiangmengxia@qq.com
 * @LastEditTime: 2024-09-18 21:52:47
 * @FilePath: /jiangmengxia.github.io/redux/demos/redux/Provider&Connect/index2.html
 * @Description: Description
-->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>手写实现redux的Provider&Connect方法</title>
    <!-- 引入Babel编译器，用于将JSX转换为JavaScript -->
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
    <!-- 引入React和React DOM库 -->
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      // 实现与thunk方法一样的功能，：dispatch允许分发异步action
      function enhancer(createStore) {
        return function (reducer, preloadState) {
          // 创建store
          const store = createStore(reducer, preloadState);
          const dispatch = store.dispatch;

          // 增强的dispatch方法,做的事跟实现的thunk方法一样
          function _dispatch(action) {
            // 异步action
            if (typeof action === "function") {
              return action(dispatch);
            }
            // 同步的，调用原本的dispatch方法
            dispatch(action);
          }

          // 返回store
          return {
            ...store,
            dispatch: _dispatch, // 重写dispatch方法
          };
        };
      }

      function createStore(reducer, preloadState, enhancer) {
        // 约束reducer函数类型
        if (typeof reducer !== "function") {
          throw new Error("reducer必须是一个函数");
        }
        if (typeof enhancer !== "undefined") {
          if (typeof enhancer !== "function") {
            throw new Error("enhancer必须是一个函数");
          }
          // 自己去创建自定义的store，实现更强大的store功能
          return enhancer(createStore)(reducer, preloadState);
        }

        // 表示store对象中存储的全局状态
        let state = preloadState;
        // 存储订阅者函数集合
        let listeners = [];

        // 获取状态的
        function getState() {
          return state;
        }

        // 方法用来触发action
        function dispatch(action) {
          // 判断action是否是对象
          if (!isPlainObject(action)) {
            throw new Error("action必须是一个对象");
          }
          if (action.type === undefined) {
            throw new Error("action必须有一个type属性");
          }
          // 调用reducer函数，更新全局状态
          state = reducer(state, action);
          // 触发订阅者函数
          listeners.forEach((listener) => listener());
        }

        // 订阅方法
        function subscribe(listener) {
          listeners.push(listener);
          // 返回一个函数，用来取消订阅
          return function () {
            listeners = listeners.filter((l) => l !== listener);
          };
        }
        return {
          getState,
          dispatch,
          subscribe,
        };
      }
      function isPlainObject(obj) {
        // 排除基本数据类型和空值
        if (typeof obj !== "object" || obj === null) return false;
        //区分数组和对象
        //   if (Object.getPrototypeOf(obj) === Object.prototype) return true;
        //   return false;
        let proto = obj;
        while (Object.getPrototypeOf(proto) !== null) {
          proto = Object.getPrototypeOf(proto);
        }
        return Object.getPrototypeOf(obj) === proto;
      }

      // 1. 创建一个对象，包含reducer、preloadState、actionCreators
      const countorRedux = {
        preloadState: { count: 0 }, // 初始状态
        reducer: (state = countorRedux.preloadState, action) => {
          switch (action.type) {
            case "INCREMENT":
              return {
                count: state.count + 1,
              };
            case "DECREMENT":
              return {
                count: state.count - 1,
              };
            default:
              return state;
          }
        },
        actionCreators: {
          increment() {
            return { type: "INCREMENT" };
          },
          decrement() {
            return { type: "DECREMENT" };
          },
        },
      };
      // 2。 创建一个对象，包含reducer、preloadState、actionCreators
      const counter2Redux = {
        preloadState: { count: 100 }, // 初始状态
        reducer: (state = counter2Redux.preloadState, action) => {
          switch (action.type) {
            case "INCREMENT_ASYNC":
              return {
                count: state.count + 1,
              };
            case "DECREMENT_ASYNC":
              return {
                count: state.count - 1,
              };
            default:
              return state;
          }
        },
        actionCreators: {
          incrementAsync() {
            return (dispatch) => {
              setTimeout(() => {
                dispatch({ type: "INCREMENT_ASYNC" });
              }, 1000);
            };
          },
          decrementAsync() {
            return (dispatch) => {
              setTimeout(() => {
                dispatch({ type: "DECREMENT_ASYNC" });
              }, 1000);
            };
          },
        },
      };

      function combineReducers(reducers) {
        // 1. 获取所有的key (count,count2)
        const reducerKeys = Object.keys(reducers);
        // 2. 返回一个新的reducer函数
        return function combination(state = {}, action) {
          // 3. 创建一个新的state对象
          const nextState = {};
          // 4. 遍历所有的key
          for (let i = 0; i < reducerKeys.length; i++) {
            const key = reducerKeys[i];
            const reducer = reducers[key];
            // 5. 获取当前key的状态
            const previousStateForKey = state[key];
            // 6. 调用对应的reducer函数，更新状态
            const nextStateForKey = reducer(previousStateForKey, action);
            // 7. 将新的状态设置到新的state对象中
            nextState[key] = nextStateForKey;
          }
          // 8. 返回新的state对象
          return nextState;
        };
      }

      const store = createStore(
        combineReducers({
          counter1: countorRedux.reducer,
          counter2: counter2Redux.reducer,
        }),
        {
          count: 0,
        },
        enhancer
      );

      const { createContext, useContext, useEffect, useState } = React;
      const ReduxProvider = createContext(); // 创建一个上下文对象

      // Provider组件，将store传递给子组件
      function Provider({ store, children }) {
        const [_, forceUpdate] = useState(store.getState());
        // useEffect(() => {
        //   // 需要在store变更时，更新store的值（引用值要修改）
        //   const unsubscribe = store.subscribe(() => {
        //     forceUpdate(store.getState());
        //   });

        //   // 移除监听器
        //   return () => {
        //     unsubscribe();
        //   };
        // }, [store]);

        // 虽然store本身没变，引起了本组件的重绘
        // 但是传给子组件的props没有变化，子组件不会重绘
        return (
          <ReduxProvider.Provider value={store}>
            {children}
          </ReduxProvider.Provider>
        );
      }

      // // 高阶函数，返回一个函数，这个函数接受一个组件作为参数，返回一个新的组件
      // https://www.programfarmer.com/articles/2023/redux-make-provider-and-connect
      function connect(mapStateToProps, mapDispatchToProps) {
        return function (Component) {
          return function (ownProps) {
            const store = useContext(ReduxProvider);
            const states = store.getState();
            const actionsProps =
              (mapDispatchToProps &&
                mapDispatchToProps(store.dispatch, ownProps)) ||
              {};

            const stateProps =
              (mapStateToProps && mapStateToProps(states, ownProps)) || {};
            // 加上下面这段，实现：更新store时，重新渲染Component组件
            // 由于本组件每次re-render都会重新生成新的stateProps和actionsProps，因此必然会引起子组件的re-render
            const [_, forceUpdate] = useState({});
            useEffect(() => {
              const unsubscribe = store.subscribe(() => {
                forceUpdate({});
              });
              return () => {
                unsubscribe();
              };
            }, [store]);
            return (
              <Component
                {...ownProps}
                {...stateProps}
                {...actionsProps}
                titile="this is a test"
              />
            );
          };
        };
      }

      function Counter({
        increment,
        decrement,
        incrementAsync,
        decrementAsync,
        count1,
        count2,
        ...otherProps
      }) {
        return (
          <div>
            <h1>Counter1: {count1}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            <hr />
            <h1>Counter2: {count2}</h1>
            <button onClick={incrementAsync}>incrementAsync</button>
            <button onClick={decrementAsync}>decrementAsync</button>
          </div>
        );
      }

      function WrapedCounter(props) {
        const mapStateToProps = (state) => {
          return {
            count1: (state && state.counter1 && state.counter1.count) || 0,
            count2: (state && state.counter2 && state.counter2.count) || 0,
          };
        };
        const mapDispatchToProps = (dispatch) => ({
          increment: () => {
            dispatch(countorRedux.actionCreators.increment());
          },
          decrement: () => {
            dispatch(countorRedux.actionCreators.decrement());
          },
          incrementAsync: () =>
            dispatch(counter2Redux.actionCreators.incrementAsync()),
          decrementAsync: () =>
            dispatch(counter2Redux.actionCreators.decrementAsync()),
        });
        return connect(mapStateToProps, mapDispatchToProps)(Counter)();
      }

      function App() {
        return (
          <Provider store={store}>
            <WrapedCounter />
          </Provider>
        );
      }

      const container = document.getElementById("root");
      ReactDOM.render(<App />, container);
    </script>
  </body>
</html>

```

## 7. UseSelector\&UseDispatch

redux还提供了UseSelector、UseDispatch来代替connect，两者一般配合使用

### useDispatch

就是用来获取dispatch对象

```javascript
 function useDispatch() {
        const store = useContext(ReduxProvider);
        return store.dispatch;
      }
```

### UseSelector

UseSelector是用来获取store中的状态值的hooks，并且在store变更后能直接对组件进行重绘。

```javascript
      function useSelector(mapStateToProps) {
        const store = useContext(ReduxProvider);
        const states = store.getState();
        const stateProps = (mapStateToProps && mapStateToProps(states)) || {};
        // 加上下面这段，实现：更新store时，重新渲染Component组件
        // 由于本组件每次re-render都会重新生成新的stateProps和actionsProps，因此必然会引起子组件的re-render
        const [_, forceUpdate] = useState({});
        useEffect(() => {
          const unsubscribe = store.subscribe(() => {
            forceUpdate({});
          });
          return () => {
            unsubscribe();
          };
        }, [store]);
        return stateProps;
      }
```

### 完整案例

```html
<!--
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-09-17 16:20:39
 * @LastEditors: jiangmengxia jiangmengxia@qq.com
 * @LastEditTime: 2024-09-18 22:21:00
 * @FilePath: /jiangmengxia.github.io/redux/demos/redux/UseDispatch&UseSelector/index2.html
 * @Description: Description
-->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>手写实现redux的Provider&Connect方法</title>
    <!-- 引入Babel编译器，用于将JSX转换为JavaScript -->
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
    <!-- 引入React和React DOM库 -->
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      // 实现与thunk方法一样的功能，：dispatch允许分发异步action
      function enhancer(createStore) {
        return function (reducer, preloadState) {
          // 创建store
          const store = createStore(reducer, preloadState);
          const dispatch = store.dispatch;

          // 增强的dispatch方法,做的事跟实现的thunk方法一样
          function _dispatch(action) {
            // 异步action
            if (typeof action === "function") {
              return action(dispatch);
            }
            // 同步的，调用原本的dispatch方法
            dispatch(action);
          }

          // 返回store
          return {
            ...store,
            dispatch: _dispatch, // 重写dispatch方法
          };
        };
      }

      function createStore(reducer, preloadState, enhancer) {
        // 约束reducer函数类型
        if (typeof reducer !== "function") {
          throw new Error("reducer必须是一个函数");
        }
        if (typeof enhancer !== "undefined") {
          if (typeof enhancer !== "function") {
            throw new Error("enhancer必须是一个函数");
          }
          // 自己去创建自定义的store，实现更强大的store功能
          return enhancer(createStore)(reducer, preloadState);
        }

        // 表示store对象中存储的全局状态
        let state = preloadState;
        // 存储订阅者函数集合
        let listeners = [];

        // 获取状态的
        function getState() {
          return state;
        }

        // 方法用来触发action
        function dispatch(action) {
          // 判断action是否是对象
          if (!isPlainObject(action)) {
            throw new Error("action必须是一个对象");
          }
          if (action.type === undefined) {
            throw new Error("action必须有一个type属性");
          }
          // 调用reducer函数，更新全局状态
          state = reducer(state, action);
          // 触发订阅者函数
          listeners.forEach((listener) => listener());
        }

        // 订阅方法
        function subscribe(listener) {
          listeners.push(listener);
          // 返回一个函数，用来取消订阅
          return function () {
            listeners = listeners.filter((l) => l !== listener);
          };
        }
        return {
          getState,
          dispatch,
          subscribe,
        };
      }
      function isPlainObject(obj) {
        // 排除基本数据类型和空值
        if (typeof obj !== "object" || obj === null) return false;
        //区分数组和对象
        //   if (Object.getPrototypeOf(obj) === Object.prototype) return true;
        //   return false;
        let proto = obj;
        while (Object.getPrototypeOf(proto) !== null) {
          proto = Object.getPrototypeOf(proto);
        }
        return Object.getPrototypeOf(obj) === proto;
      }

      // 1. 创建一个对象，包含reducer、preloadState、actionCreators
      const countorRedux = {
        preloadState: { count: 0 }, // 初始状态
        reducer: (state = countorRedux.preloadState, action) => {
          switch (action.type) {
            case "INCREMENT":
              return {
                count: state.count + 1,
              };
            case "DECREMENT":
              return {
                count: state.count - 1,
              };
            default:
              return state;
          }
        },
        actionCreators: {
          increment() {
            return { type: "INCREMENT" };
          },
          decrement() {
            return { type: "DECREMENT" };
          },
        },
      };
      // 2。 创建一个对象，包含reducer、preloadState、actionCreators
      const counter2Redux = {
        preloadState: { count: 100 }, // 初始状态
        reducer: (state = counter2Redux.preloadState, action) => {
          switch (action.type) {
            case "INCREMENT_ASYNC":
              return {
                count: state.count + 1,
              };
            case "DECREMENT_ASYNC":
              return {
                count: state.count - 1,
              };
            default:
              return state;
          }
        },
        actionCreators: {
          incrementAsync() {
            return (dispatch) => {
              setTimeout(() => {
                dispatch({ type: "INCREMENT_ASYNC" });
              }, 1000);
            };
          },
          decrementAsync() {
            return (dispatch) => {
              setTimeout(() => {
                dispatch({ type: "DECREMENT_ASYNC" });
              }, 1000);
            };
          },
        },
      };

      function combineReducers(reducers) {
        // 1. 获取所有的key (count,count2)
        const reducerKeys = Object.keys(reducers);
        // 2. 返回一个新的reducer函数
        return function combination(state = {}, action) {
          // 3. 创建一个新的state对象
          const nextState = {};
          // 4. 遍历所有的key
          for (let i = 0; i < reducerKeys.length; i++) {
            const key = reducerKeys[i];
            const reducer = reducers[key];
            // 5. 获取当前key的状态
            const previousStateForKey = state[key];
            // 6. 调用对应的reducer函数，更新状态
            const nextStateForKey = reducer(previousStateForKey, action);
            // 7. 将新的状态设置到新的state对象中
            nextState[key] = nextStateForKey;
          }
          // 8. 返回新的state对象
          return nextState;
        };
      }

      const store = createStore(
        combineReducers({
          counter1: countorRedux.reducer,
          counter2: counter2Redux.reducer,
        }),
        {
          count: 0,
        },
        enhancer
      );

      const { createContext, useContext, useEffect, useState } = React;
      const ReduxProvider = createContext(); // 创建一个上下文对象

      // Provider组件，将store传递给子组件
      function Provider({ store, children }) {
        const [_, forceUpdate] = useState(store.getState());
        // useEffect(() => {
        //   // 需要在store变更时，更新store的值（引用值要修改）
        //   const unsubscribe = store.subscribe(() => {
        //     forceUpdate(store.getState());
        //   });

        //   // 移除监听器
        //   return () => {
        //     unsubscribe();
        //   };
        // }, [store]);

        // 虽然store本身没变，引起了本组件的重绘
        // 但是传给子组件的props没有变化，子组件不会重绘
        return (
          <ReduxProvider.Provider value={store}>
            {children}
          </ReduxProvider.Provider>
        );
      }

      function useSelector(mapStateToProps) {
        const store = useContext(ReduxProvider);
        const states = store.getState();
        const stateProps = (mapStateToProps && mapStateToProps(states)) || {};
        // 加上下面这段，实现：更新store时，重新渲染Component组件
        // 由于本组件每次re-render都会重新生成新的stateProps和actionsProps，因此必然会引起子组件的re-render
        const [_, forceUpdate] = useState({});
        useEffect(() => {
          const unsubscribe = store.subscribe(() => {
            forceUpdate({});
          });
          return () => {
            unsubscribe();
          };
        }, [store]);
        return stateProps;
      }

      function useDispatch() {
        const store = useContext(ReduxProvider);
        return store.dispatch;
      }

      function Counter({}) {
        const storeData = useSelector((state) => state);
        const { counter1 = { count: 0 }, counter2 = { count: 100 } } =
          storeData;
        const dispatch = useDispatch();
        const increment = () => {
          dispatch(countorRedux.actionCreators.increment());
        };
        const decrement = () => {
          dispatch(countorRedux.actionCreators.decrement());
        };
        const incrementAsync = () =>
          dispatch(counter2Redux.actionCreators.incrementAsync());
        const decrementAsync = () =>
          dispatch(counter2Redux.actionCreators.decrementAsync());
        return (
          <div>
            <h1>Counter1: {counter1.count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            <hr />
            <h1>Counter2: {counter2.count}</h1>
            <button onClick={incrementAsync}>incrementAsync</button>
            <button onClick={decrementAsync}>decrementAsync</button>
          </div>
        );
      }

      function App() {
        return (
          <Provider store={store}>
            <Counter />
          </Provider>
        );
      }

      const container = document.getElementById("root");
      ReactDOM.render(<App />, container);
    </script>
  </body>
</html>

```



【参考】

[https://www.programfarmer.com/articles/2023/redux-make-provider-and-connect](https://www.programfarmer.com/articles/2023/redux-make-provider-and-connect)

[https://www.bilibili.com/video/BV1tu411a7bN?p=35\&vd\_source=36cd504ec13dd4e9f53ea20a7fadae5f](https://www.bilibili.com/video/BV1tu411a7bN?p=35\&vd\_source=36cd504ec13dd4e9f53ea20a7fadae5f)
