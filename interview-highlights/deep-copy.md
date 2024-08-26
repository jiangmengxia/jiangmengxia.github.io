<!--
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-08-25 18:30:54
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-08-26 10:12:23
 * @FilePath: \jiangmengxia.github.io\interview-highlights\deep-copy.md
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
function deepClone(value) {
  if(Array.isArray(value)){
    const cloneArray = new Array(value.length)
    for(let i=0;i<value.length;i++){
      cloneArray[i] = deepClone(value[i])
    }
    return cloneArray
  }
  if(typeof value ==='object' && value!==null){
    const cloneArray = {}
    for(let key in value){
      cloneArray[key] = deepClone(value[key])
    }
    return cloneArray
  }
  return value
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

