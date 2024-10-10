# ECMAScript 2018

ES9（ECMAScript 2018）引入了一些新的特性，以下是一些主要的特性：

* 异步迭代
* Promise Finally
* 对象 Rest 属性
* 新的 RegExp 特性

## 1. 异步迭代器

异步迭代器是一种特殊的迭代器，它可以在迭代过程中等待异步操作完成。这通常用于处理异步数据流，如从服务器获取数据。

可迭代对象是一种实现了 `Symbol.iterator` 方法的对象，该方法返回一个迭代器。迭代器是一个对象，它有一个 `next()` 方法，该方法返回一个包含两个属性的对象：`value` 和 `done`。`value` 属性表示迭代器的当前值，`done` 属性是一个布尔值，表示迭代是否完成。

```javascript
async function* asyncGenerator() {
  const data1 = await fetchData1();
  yield data1;

  const data2 = await fetchData2();
  yield data2;

  const data3 = await fetchData3();
  yield data3;
}

const asyncIterator = asyncGenerator();

for await (const data of asyncIterator) {
  console.log(data); // data1, data2, data3
}

```

在上面的示例中，`asyncGenerator` 函数是一个异步生成器函数，它使用 `await` 关键字等待 `fetchData1`、`fetchData2` 和 `fetchData3` 函数的结果，并使用 `yield` 关键字返回结果。

然后，我们创建了一个异步迭代器 `asyncIterator`，并使用 `for await...of` 循环来迭代异步迭代器。由于 `for await...of` 循环是异步的，因此它可以等待异步操作完成。



## **Promise.prototype.finally()**

这个方法在Promise完成后（无论成功还是失败）都会执行。

```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .finally(() => console.log('Request completed'));
```

## **Rest/Spread Properties（剩余/展开属性）**

这个特性允许你将一个对象的所有可枚举属性复制到另一个对象中。

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };
console.log(obj2); // { a: 1, b: 2, c: 3 }
```



请注意，这些特性在所有现代浏览器中可能不被完全支持，你可能需要使用Babel等工具进行转译。
