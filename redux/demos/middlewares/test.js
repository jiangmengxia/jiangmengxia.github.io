/*
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-09-17 13:09:51
 * @LastEditors: jiangmengxia jiangmengxia@qq.com
 * @LastEditTime: 2024-09-17 13:17:01
 * @FilePath: /jiangmengxia.github.io/redux/demos/middlewares/test.js
 * @Description: Description
 */
export default (store) => (next) => (action) => {
  console.log("test中间件被执行了");
  let result = next(action); // next(action)执行完之后，返回的结果
  return result;
};
