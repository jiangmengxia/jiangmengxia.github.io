
# Object.freeze

`Object.freeze`是JavaScript中的一个方法，用于冻结一个对象，使其不可修改。冻结后的对象不能添加新的属性、删除属性、修改属性的值，也不能修改属性的属性描述符。

以下是一个使用`Object.freeze`的例子：

```javascript
// 创建一个对象
const obj = {
  name: 'Alice',
  age: 25
};

// 冻结对象
Object.freeze(obj);

// 修改本身
obj={} // 修改本身无效
console.log(obj); // 输出 { name: 'Alice', age: 25 }

// 修改属性无效
obj.name = 'Bob'; // 修改属性无效
console.log(obj.name); // 输出 'Alice'

// 添加属性无效
obj.gender = 'female'; // 添加属性无效
console.log(obj.gender); // undefined

// 删除属性无效
delete obj.age; // 删除属性无效
console.log(obj.age); // 25
```

在这个例子中，我们首先创建了一个对象`obj`，然后使用`Object.freeze`方法冻结了对象`obj`。我们可以看到，属性的值不能被修改，因为对象被冻结了。

需要注意的是，`Object.freeze`只能冻结对象本身，不能冻结对象的属性。如果对象的属性也是对象，那么这些属性仍然可以被修改。同时，`Object.freeze`只能冻结对象的可枚举属性，不能冻结对象的不可枚举属性。在使用`Object.freeze`时，需要考虑这些限制，并注意错误处理。


另外，`Object.freeze`返回的是被冻结的对象本身，而不是一个新的对象。因此，我们在实际使用场景中，可以将原始对象clone一个新对象，对新对象进行冻结，而不会影响原始对象。


【应用】
```js
class Good{
  constructor(9){
      g={...g}
      Object.freeze(g)
      Object.defineProperty(this,'data',{
          get(){},
          set(){}
      })
      Object.freeze(this) // 冻结整个实例对象，不能往对象上加属性
  }
}

Object.freeze(Good.prototype) // 冻结原型对象,不能往原型上加属性
```

`Object.isFrozen` 用于检查一个对象是否被冻结。如果对象被冻结，那么它的属性不能被修改、删除或添加，它的属性描述符的configurable属性为false。