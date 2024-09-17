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
