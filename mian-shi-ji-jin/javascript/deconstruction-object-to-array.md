<!--
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-08-23 13:45:10
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-08-23 13:46:24
 * @FilePath: \jiangmengxia.github.io\面试集锦\如何让对象以数组格式结构.md
 * @Description: Description
-->
# 如何让 var [a, b] = {a 1, b 2} 解构赋值成功？

能结构成数组形式的对象，是因为该对象的原型对象[Symbol.iterator]实现了迭代器功能，因此只需要为Object也实现相应的功能即可。


```js
Object.prototype[Symbol.iterator] = function(){
    // 使用 Object.values(this) 方法获取对象的所有值，并返回这些值的迭代器对象
    return Object.values(this)[Symbol.iterator]()
}

```