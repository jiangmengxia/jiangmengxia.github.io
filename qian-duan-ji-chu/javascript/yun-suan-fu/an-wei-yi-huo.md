# 按位异或（^）

在 JavaScript 中，`^` 是一个位运算符，用于执行按位异或（XOR）操作。按位异或操作会对两个数的<mark style="background-color:purple;">二进制</mark>表示进行逐位比较，如果<mark style="background-color:purple;">两个数的对应位不同，则结果为 1，否则结果为 0</mark>。

#### 使用示例

```javascript
console.log(5 ^ 3); // 输出 6
```

在上面的示例中，`5 ^ 3` 的结果是 6。这是因为 5 的二进制表示是 `101`，3 的二进制表示是 `011`，按位异或操作的结果是 `111`，即十进制的 6。

#### 注意事项

* `^` 运算符可以用于整数和浮点数，但不能用于字符串和对象。
* `^` 运算符可以用于位运算，也可以用于逻辑运算。在逻辑运算中，`^` 运算符表示逻辑异或操作，即如果两个操作数不同，则结果为真，否则结果为假。
* `^` 运算符可以用于加密和解密。例如，可以使用 `^` 运算符对字符串进行简单的加密和解密操作。



## 算法题应用

题目1：给你一个 **非空** 整数数组 `nums` ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

```javascript
// 在 JavaScript 中，^ 是一个位运算符，用于执行按位异或（XOR）操作。
// 按位异或操作会对两个数的二进制表示进行逐位比较，如果两个数的对应位不同，
// 则结果为 1，否则结果为 0。
var singleNumber = function (nums) {
  return nums.reduce((a, b) => a ^ b);
};

```

[https://leetcode.cn/problems/single-number/description/?envType=study-plan-v2\&envId=top-100-liked](https://leetcode.cn/problems/single-number/description/?envType=study-plan-v2\&envId=top-100-liked)
