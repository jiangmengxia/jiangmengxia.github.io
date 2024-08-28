# 属性描述符

在JavaScript中，属性描述符（Property Descriptor）是一种用于描述对象属性的对象。它包含了属性的各种信息，如属性的值、可写性、可枚举性、可配置性等。

以下是一些常见的属性描述符：

1. **value**：属性的值，可以是任何JavaScript值。

2. **writable**：属性的值是否可以被重写，默认为`true`。

3. **enumerable**：属性是否可以被枚举，默认为`true`。

4. **configurable**：属性是否可以被修改、删除，默认为`true`，属性描述符本身也不能被修改。

5. **get**：属性的getter函数，当访问属性时调用。

6. **set**：属性的setter函数，当修改属性时调用。

以下是一个使用属性描述符的例子：

```javascript
// 创建一个对象
const obj = {
    a:1
};

// 定义一个属性描述符
const descriptor = {
  value: 42,
  writable: false,
  enumerable: true,
  configurable: true
};

// 获取属性描述符
const existingDescriptor = Object.getOwnPropertyDescriptor(obj, 'a');
console.log(existingDescriptor); // 输出 { value: 1, writable: true, enumerable: true, configurable: true }

// 使用属性描述符定义属性
Object.defineProperty(obj, 'my-property', descriptor);

console.log(obj.myProperty); // 输出 42
obj.myProperty = 43; // 修改属性无效
console.log(obj.myProperty); // 输出 42
```

在这个例子中，我们首先创建了一个对象`obj`，然后定义了一个属性描述符`descriptor`，最后使用`Object.defineProperty`方法将属性描述符应用到对象`obj`上。我们可以看到，属性的值不能被修改，因为`writable`属性为`false`。

需要注意的是，属性描述符是一种高级特性，它可以帮助我们更精细地控制对象属性的行为。然而，属性描述符的使用需要谨慎，因为它可能会影响代码的可读性和可维护性。在使用属性描述符时，需要考虑代码的复杂性和错误处理。


【应用场景】

```js

class UIGoods{
    // 语法糖
    set data(g){
       // 当外部要修改data属性时，报错提示
                throw new Error(`不能修改data`)
    }
    constructor(g){
        this.data = g
        // 不允许外部修改data值
        Object.defineProperty(this, 'data',{
            value:9,
            writable: false,
            configurable: false,
            // set:()=>{
            //     // 当外部要修改data属性时，报错提示
            //     throw new Error(`不能修改data`)
            // },
        })
    }
}

const good =  new UIGoods({
    id: 1,
    name: 'good1',
    price: 100
})

// 不生效, 最好的做法是报错哦，告诉使用者是不能赋值的
good.data = {
    id: 2,
    name: 'good2',
    price: 200
}
console.log(good.data) // { id: 1, name: 'good1', price: 100 }

// 防不住以下情况，这种需求用冻结Object.freeze()冻结整个对象
good.data.name = 'haha'
```