/*
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-09-17 15:18:04
 * @LastEditors: jiangmengxia jiangmengxia@qq.com
 * @LastEditTime: 2024-09-17 15:23:28
 * @FilePath: /jiangmengxia.github.io/redux/demos/sugas/counter.sug.js
 * @Description: Description
 */
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
