# ECMAScript 2017

ES8（ECMAScript 2017）引入了一些新的特性，以下是一些主要的特性：

* JavaScript 字符串填充
* JavaScript Object.entries | Object.values
* JavaScript 异步函数
* JavaScript 共享内存

## 1. JavaScript 字符串填充

**String.prototype.padStart() 和 String.prototype.padEnd()**：这两个方法用于在字符串的开始或结束处填充指定的字符，直到达到指定的长度。

```javascript
'5'.padStart(3, '0'); // '005'
'5'.padEnd(3, '0'); // '500'
```

## 2. Object方法

**Object.values() 和 Object.entries()**：这两个方法分别返回一个给定对象自身的所有可枚举属性值的数组，和所有可枚举属性的键值对数组。

```javascript
const obj = { a: 1, b: 2, c: 3 };
Object.values(obj); // [1, 2, 3]
Object.entries(obj); // [['a', 1], ['b', 2], ['c', 3]]
```

## 3. 异步**Async/Await**

**Async/Await**：这是对Promise的语法糖，使得异步代码的编写更加简洁和易于理解。

```javascript
async function asyncFunction() {
  const result = await someAsyncOperation();
  console.log(result);
}
```

## 4. 共享内存

### **4.1 SharedArrayBuffer**

这是一个新的JavaScript类型，用于表示通用的、固定长度的原始二进制数据缓冲区。

### **4.2 Atomics**

这是一个新的JavaScript对象，提供了一组静态方法，用于在SharedArrayBuffer上执行原子操作。

## **5. 对象字面量的尾逗号 Trailing Commas in Object Literals**

在对象字面量的最后一个属性后面允许有一个尾逗号。

```javascript
const obj = {
  key1: 'value1',
  key2: 'value2',
};
```

请注意，这些特性在所有现代浏览器中可能不被完全支持，你可能需要使用Babel等工具进行转译。
