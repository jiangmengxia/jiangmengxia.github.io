# ECMAScript 2016

ES7（ECMAScript 2016）引入了一些新的特性，以下是一些主要的特性：

* JavaScript 求幂 (\*\*)
* JavaScript 求幂赋值 (\*\*=)
* JavaScript Array.prototype.includes

## 指数运算符（求幂）

**Exponentiation Operator（指数运算符）**：这个运算符用于计算一个数的指数幂。

```javascript
2 ** 3; // 8
i **=2   // i = i**2
```

## **Array.prototype.includes()**

这个方法用于判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false。

```javascript
[1, 2, 3].includes(2); // true
[1, 2, 3].includes(4); // false
```

请注意，这些特性在所有现代浏览器中可能不被完全支持，你可能需要使用Babel等工具进行转译。
