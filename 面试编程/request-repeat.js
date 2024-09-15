/*
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-09-12 21:14:42
 * @LastEditors: jiangmengxia jiangmengxia@qq.com
 * @LastEditTime: 2024-09-12 21:25:03
 * @FilePath: /jiangmengxia.github.io/面试题/request-repeat.js
 * @Description: Description
 */
function requestRepeat(url, times) {
  return fetch(url).catch((err) => {
    if (times > 0) {
      return requestRepeat(url, times - 1);
    } else {
      throw err;
    }
  });
}

requestRepeat("https://www.baidu.com", 3).catch((err) => {
  console.error("======", err);
});
