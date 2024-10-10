<!--
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-08-28 11:16:31
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-08-28 11:27:40
 * @FilePath: \jiangmengxia.github.io\js\object-seal.md
 * @Description: Description
-->
# Object.seal

`Object.seal`是JavaScript中的一个方法，用于密封一个对象，使其不可扩展。密封后的对象不能添加新的属性，但可以修改和删除已有的属性。同时，密封后的对象的属性描述符的`configurable`属性会被设置为`false`，这意味着不能修改和删除属性。

以下是一个使用`Object.seal`的例子：

```javascript
// 创建一个对象
const obj = {
  name: 'Alice',
  age: 25
};

// 密封对象
Object.seal(obj);

// 不能修改本身
obj = {}; // 报错 TypeError: Cannot assign to read only property 'name' of object '#<Object>'

// 修改属性有效
obj.name = 'Bob'; // 修改属性有效
console.log(obj.name); // 输出 'Bob'

// 添加属性无效
obj.gender = 'female'; // 添加属性无效
console.log(obj.gender); // undefined

// 删除属性无效
delete obj.age; // 删除属性无效
console.log(obj.age); // 25
```

在这个例子中，我们首先创建了一个对象`obj`，然后使用`Object.seal`方法密封了对象`obj`。我们可以看到，属性的值可以被修改，因为对象被密封了。但是，添加属性和删除属性无效，因为对象被密封了。

【注意事项】

需要注意的是，`Object.seal`只能密封对象本身，不能密封对象的属性。如果对象的属性也是对象，那么这些属性仍然可以被修改。同时，`Object.seal`只能密封对象的可枚举属性，不能密封对象的不可枚举属性。在使用`Object.seal`时，需要考虑这些限制，并注意错误处理。

【使用场景】
`Object.seal`方法在以下场景中非常有用：

1. 防止对象被扩展：当你不希望对象被扩展时，可以使用`Object.seal`方法来密封对象，防止添加新的属性。
2. 保护对象：当你需要保护对象不被修改时，可以使用`Object.seal`方法来密封对象，防止修改和删除属性。
3. 优化性能：当你需要优化性能时，可以使用`Object.seal`方法来密封对象，因为密封后的对象不能添加新的属性，所以可以减少内存占用和性能开销。



【Object.isSealed】
`Object.isSealed`方法用于检查一个对象是否被密封。如果对象被密封，则返回`true`，否则返回`false`。