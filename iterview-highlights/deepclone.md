<!--
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-08-25 18:30:54
 * @LastEditors: jiangmengxia jiangmengxia@qq.com
 * @LastEditTime: 2024-08-25 18:39:37
 * @FilePath: /jiangmengxia.github.io/iterview-highlights/deepclone.md
 * @Description: Description
-->

# 深拷贝的循环引用问题

## 最简单的clone函数，无法处理循环引用问题

```js
function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
```

## 使用递归实现深拷贝，可以处理循环引用问题

```js
function deepClone(obj, map = new Map()) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  if (map.has(obj)) {
    return map.get(obj);
  }
  let cloneObj = Array.isArray(obj) ? [] : {};
  map.set(obj, cloneObj);
  for (let key in obj) {
}
```

## 使用MessageChannel实现深拷贝，可以处理循环引用问题

```js
function deepClone(obj) {
  return new Promise((resolve) => {
    const channel = new MessageChannel();
    channel.port1.onmessage = (e) => resolve(e.data);
    channel.port2.postMessage(obj);
  });
}
```

