# 进制间的转换

## 十进制转化成其他进制-`toString`

在 JavaScript 中，可以使用 `toString` 方法将十进制数转换为二进制数。`toString` 方法接受一个参数，该参数表示要转换的进制。例如，要将十进制数转换为二进制数，可以将参数设置为 2。

#### 使用示例

```javascript
console.log((5).toString(2)); // 输出 "101"
```

在上面的示例中，`(5).toString(2)` 的结果是 `"101"`。这是因为 5 的二进制表示是 `101`。

#### 注意事项

* `toString` 方法可以用于整数和浮点数，但不能用于字符串和对象。
* `toString` 方法可以用于将十进制数转换为任意进制。例如，要将十进制数转换为八进制数，可以将参数设置为 8；要将十进制数转换为十六进制数，可以将参数设置为 16。
* `toString` 方法返回的是一个字符串，而不是一个数字。如果需要将字符串转换为数字，可以使用 `parseInt` 或 `parseFloat` 方法。

## 其他进制转化成十进制-parseInt

在 JavaScript 中，可以使用 `parseInt` 方法将其他进制数转换为十进制数。`parseInt` 方法接受两个参数：要转换的字符串和要转换的进制。例如，要将八进制数转换为十进制数，可以将第二个参数设置为 8；要将十六进制数转换为十进制数，可以将第二个参数设置为 16。

#### 使用示例

```javascript
console.log(parseInt('101', 2)); // 输出 5
console.log(parseInt('377', 8)); // 输出 255
console.log(parseInt('FF', 16)); // 输出 255
```

在上面的示例中，`parseInt('101', 2)` 的结果是 5，`parseInt('377', 8)` 的结果是 255，`parseInt('FF', 16)` 的结果是 255。这是因为二进制数 `101` 的十进制表示是 5，八进制数 `377` 的十进制表示是 255，十六进制数 `FF` 的十进制表示是 255。

#### 注意事项

* `parseInt` 方法可以用于整数和浮点数，但不能用于字符串和对象。
* `parseInt` 方法可以用于将任意进制转换为十进制。例如，要将八进制数转换为十进制数，可以将第二个参数设置为 8；要将十六进制数转换为十进制数，可以将第二个参数设置为 16。
* `parseInt` 方法返回的是一个整数，而不是一个字符串。如果需要将整数转换为字符串，可以使用 `toString` 方法。

## 进制间互转

进制A（数字num)转化成进制B

方式：

先用`ParseInt(${num},A)`将进制A转化成10进制得到NumB，

再用`（NumB）.toString(B)`的10进制转化成进制B
