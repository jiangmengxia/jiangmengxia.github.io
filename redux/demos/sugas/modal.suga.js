/*
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-09-17 15:16:07
 * @LastEditors: jiangmengxia jiangmengxia@qq.com
 * @LastEditTime: 2024-09-17 15:19:04
 * @FilePath: /jiangmengxia.github.io/redux/demos/sugas/modal.suga.js
 * @Description: Description
 */
export default function* ModalSuga(state = {}, action) {
  yield takeEvery(actionTypes.MODAL_OPEN, function* (action) {
    // ...
  });
}
