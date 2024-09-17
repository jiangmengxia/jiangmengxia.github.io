/*
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-09-17 13:09:51
 * @LastEditors: jiangmengxia jiangmengxia@qq.com
 * @LastEditTime: 2024-09-17 20:44:41
 * @FilePath: /jiangmengxia.github.io/redux/demos/middlewares/logger.js
 * @Description: Description
 */
export default (store) => (next) => (action) => {
  console.log("store", store);
  console.log("action", action);
  let result = next(action); // next(action)执行完之后，返回的结果, next方法实际就是dispatch方法
  console.log("next Store", store.getState()); // 打印执行完action后的store
  return result;
};
