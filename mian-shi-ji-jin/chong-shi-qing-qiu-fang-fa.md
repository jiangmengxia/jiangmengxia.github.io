<!--
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-09-09 22:09:07
 * @LastEditors: jiangmengxia jiangmengxia@qq.com
 * @LastEditTime: 2024-09-09 22:14:40
 * @FilePath: /jiangmengxia.github.io/mian-shi-ji-jin/chong-shi-qing-qiu-fang-fa.md
 * @Description: Description
-->
# 可以重试的请求方法

```js
/***
 * @description 发生请求，返回Promise
 * @param {string} url 请求地址
 * @param {} maxCount 最大重试次数
 */

function request(url, maxCount=5){
    fetch(url).catch(err=>{
        maxCount<=0 ? Promise.reject(err):request(url,maxCount-1)
    })
}
```

