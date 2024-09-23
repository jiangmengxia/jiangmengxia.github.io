# 字符串

## 1. 模板字符串

模板字符串用反引号(数字1左边的那个键)包含，其中的变量用${}括起来

```javascript
var name = 'zfpx',age = 8;
let desc = `${name} is ${age} old!`;
console.log(desc);

//所有模板字符串的空格和换行，都是被保留的
var str = `<ul>
<li>a</li>
<li>b</li>
</ul>`;
console.log(str);

```

```javascript
function replace(desc){
  return desc.replace(/\$\{([^}]+)\}/g,function(matched,key){
    return eval(key);
  });
}

```



## 2. 带标签的模板字符串

可以在模板字符串的前面添加一个标签，这个标签可以去处理模板字符串 标签其实就是一个函数,函数可以接收两个参数,一个是strings,就是模板字符串里的每个部分的字符 还有一个参数可以使用rest的形式values,这个参数里面是模板字符串里的值

```javascript
var name = 'zfpx',age = 8;
function desc(strings,...values){
    console.log(strings,values);
}
desc`${name} is ${age} old!`;

```

## 3. 字符串新方法

● includes()：返回布尔值，表示是否找到了参数字符串。

● startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。

● endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。

```javascript
var s = 'zfpx';
s.startsWith('z') // true
s.endsWith('x') // true
s.includes('p') // true

```

第二个参数，表示开始搜索的位置

```javascript
var s = 'zfpx';
console.log(s.startsWith('p',2)); // true
console.log(s.endsWith('f',2)); // true
console.log(s.includes('f',2)); // false

```

endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束

## 4. repeat

repeat方法返回一个新字符串，表示将原字符串重复n次。

```javascript
'x'.repeat(3);
'x'.repeat(0);
```
