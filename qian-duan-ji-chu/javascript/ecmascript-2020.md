# ECMAScript 2020

* [BigInt](https://www.w3school.com.cn/js/js\_2020.asp#mark\_bigint)
* [字符串方法 matchAll()](https://www.w3school.com.cn/js/js\_2020.asp#mark\_string\_matchall)
* [空值合并运算符 (??)](https://www.w3school.com.cn/js/js\_2020.asp#mark\_nullish\_coalescing)
* [可选链运算符 (?.)](https://www.w3school.com.cn/js/js\_2020.asp#mark\_optional\_chaining)
* [逻辑 AND 赋值运算符 (&&=)](https://www.w3school.com.cn/js/js\_2020.asp#mark\_assign\_logical\_and)
* [逻辑 OR 赋值运算符 (||=)](https://www.w3school.com.cn/js/js\_2020.asp#mark\_assign\_logical\_or)
* [空值合并赋值运算符 (??=)](https://www.w3school.com.cn/js/js\_2020.asp#mark\_assign\_nullish)
* Promise.allSettled()
* 动态导入

## BigInt

BigInt 是ES2020（ECMAScript 2020）引入的一种新的<mark style="background-color:purple;">数据类型</mark>，用于表示大于 `2^53 - 1` 的整数。这是因为JavaScript中的Number类型只能安全地表示 -2^53 + 1 到 2^53 - 1 之间的整数。

以下是一个使用 BigInt 的示例：

```javascript
const bigInt = BigInt("9007199254740991");
console.log(bigInt); // 9007199254740991n
```

在上面的示例中，我们使用 BigInt 构造函数创建了一个 BigInt 对象，它表示一个大于 `2^53 - 1` 的整数。

请注意，BigInt 对象的表示形式是在数字后面加上 `n`，例如 `9007199254740991n`。

BigInt 对象可以与 Number 类型进行混合运算，但结果是一个 BigInt 对象。例如：

```javascript
const bigInt = BigInt("9007199254740991");
const number = 1;

console.log(bigInt + number); // 9007199254740992n
```

在上面的示例中，我们使用 BigInt 对象和 Number 类型进行加法运算，结果是一个 BigInt 对象。

## matchAll

`matchAll()` 是ES2020（ECMAScript 2020）引入的一个新的<mark style="background-color:blue;">字符串方法</mark>，它用于在字符串中执行全局正则表达式搜索，并返回一个包含所有匹配结果的迭代器。

以下是一个使用 `matchAll()` 的示例：

```javascript
const str = 'Hello, world! Hello, everyone!';
const regex = /Hello/g;

const matches = str.matchAll(regex);

for (const match of matches) {
  console.log(match);
}
```

在上面的示例中，我们创建了一个正则表达式 `/Hello/g`，它匹配所有的 "Hello"。然后，我们使用 `matchAll()` 方法在字符串 `str` 中执行全局搜索，并返回一个迭代器 `matches`。最后，我们使用 `for...of` 循环来迭代迭代器，并打印每个匹配结果。

请注意，`matchAll()` 方法返回的是一个<mark style="background-color:purple;">迭代器</mark>，你可以使用 `for...of` 循环、`Array.from()` 方法或扩展运算符 `...` 来获取所有匹配结果。

## 空值合并运算符（?? ）

如果第一个参数不是空值（`null` 或 `undefined`），则 `??` 运算符返回第一个参数。

否则返回第二个

```javascript
let name = null;
let text = "missing";
let result = name ?? text;  // 返回 “missing”
```

### 对比逻辑或运算符（||）

“||"这个运算符用于提供默认值，当操作数为 `false`、`null`、`undefined`、`0`、`NaN` 或空字符串时，返回右侧的操作数。如果操作数不是上述值，则返回左侧的操作数。



## 可选链运算符（?. ）

如果对象为 `undefined` 或 `null`，则_可选链运算符_返回 `undefined`（而不是抛出错误）。

```javascript
const car = {type:"Fiat", model:"500", color:"white"};
let name = car?.name;  // undefined 
```

## 逻辑 AND 赋值运算符（&&= ）

，它用于将左侧的操作数与右侧的操作数进行逻辑与（AND）运算，并将结果赋值给左侧的操作数。

如果第一个值为 `true`，则分配第二个值。

```javascript
let x = 100;
x &&= 5;  // x = 100 && 5 返回第二个数5
```

## 逻辑 OR 赋值运算符（||= ）

如果第一个值为 `false`，则分配第二个值。

```javascript
let x = 10;
x ||= 5;  // x = x||5 返回第二个数5
```

### 空值合并赋值运算符（??= ）

如果第一个值 `undefined` 或为 `null`，则分配第二个值。

```javascript
let x = 10;
x ??= 5;  // x = x ?? 5 , x!==undefined或Null,结果返回第一个值：10
```





请注意，这些特性在所有现代浏览器中可能不被完全支持，你可能需要使用Babel等工具进行转译。
