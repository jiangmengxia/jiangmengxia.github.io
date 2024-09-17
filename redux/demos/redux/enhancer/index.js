/*
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-09-17 16:02:16
 * @LastEditors: jiangmengxia jiangmengxia@qq.com
 * @LastEditTime: 2024-09-17 20:38:46
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

import logger from "../../middlewares/logger";
import thunk from "../../middlewares/thunk";

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
