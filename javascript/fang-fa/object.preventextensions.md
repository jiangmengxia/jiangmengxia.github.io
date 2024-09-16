<!--
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-08-28 11:28:35
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-08-28 11:30:46
 * @FilePath: \jiangmengxia.github.io\js\Object.preventExtensions.md
 * @Description: Description
-->
# Object.preventExtensions

`Object.preventExtensions`用于防止对象添加新的属性。但是，它不能修改或删除已有的属性，也不能修改或删除已有的属性描述符。

以下是一个使用`Object.preventExtensions`的例子：

```javascript
// 创建一个对象
const obj = {
  name: 'Alice',
  age: 25
};

// 防止对象添加新的属性
Object.preventExtensions(obj);

// 添加属性无效
obj.gender = 'female'; // 添加属性无效
console.log(obj.gender); // undefined

// 修改属性有效
obj.name = 'Bob'; // 修改属性有效
console.log(obj.name); // 输出 'Bob'

// 删除属性有效
delete obj.age; // 删除属性有效
console.log(obj.age); // undefined
```

在这个例子中，我们首先创建了一个对象`obj`，然后使用`Object.preventExtensions`方法防止对象`obj`添加新的属性。我们可以看到，添加属性无效，但是修改属性和删除属性有效。

【注意事项】
* `Object.preventExtensions`只能防止对象添加新的属性，不能防止对象的属性被修改或删除。
* `Object.preventExtensions`只能防止对象的可枚举属性被添加，不能防止对象的不可枚举属性被添加。
* 在使用`Object.preventExtensions`时，需要考虑这些限制，并注意错误处理。


【使用场景】
`Object.preventExtensions`方法可以用于防止对象被扩展，从而保护对象的属性不被修改或删除。例如，在开发中，如果需要创建一个不可变的对象，可以使用`Object.preventExtensions`方法来防止对象被修改。


【Object.isExtensible】
`Object.isExtensible`方法用于判断一个对象是否可以被扩展，即是否可以添加新的属性。如果对象可以被扩展，则返回`true`，否则返回`false`。