/*
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-09-17 13:24:01
 * @LastEditors: jiangmengxia jiangmengxia@qq.com
 * @LastEditTime: 2024-09-17 13:52:54
 * @FilePath: /jiangmengxia.github.io/redux/demos/middlewares/thunk.js
 * @Description: Description
 */
// 实现异步操作的中间件
// 异步传函数，同步传action对象
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
