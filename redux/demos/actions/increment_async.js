/*
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-09-17 13:54:50
 * @LastEditors: jiangmengxia jiangmengxia@qq.com
 * @LastEditTime: 2024-09-17 13:57:11
 * @FilePath: /jiangmengxia.github.io/redux/demos/actions/increment_async.js
 * @Description: Description
 */
export const increment_async = () => (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: "increment", // 计数器递增的action
    });
  }, 2000);
};
