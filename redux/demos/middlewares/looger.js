/*
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-09-17 13:09:51
 * @LastEditors: jiangmengxia jiangmengxia@qq.com
 * @LastEditTime: 2024-09-17 13:12:48
 * @FilePath: /jiangmengxia.github.io/redux/demos/middlewares/looger.js
 * @Description: Description
 */
export default (store) => (next) => (action) => {
  console.log("store", store);
  console.log("action", action);
  let result = next(action); // next(action)执行完之后，返回的结果
  console.log("next Store", store.getState()); // 打印执行完action后的store
  return result;
};
