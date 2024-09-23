# 作用域变量

作用域就是一个变量的作用范围。也就是你声明一个变量以后,这个变量可以在什么场合下使用 以前的JavaScript只有全局作用域，还有一个函数作用域

## 1 var的问题

1\.  var没有块级作用域，定义后在当前闭包中都可以访问，如果变量名重复，就会覆盖前面定义的变量，并且也有可能被其他人更改。

```
if (true) {
     var a = "a"; // 期望a是某一个值
 }
console.log(a);
```

2\.  var在for循环标记变量共享，一般在循环中使用的i会被共享，其本质上也是由于没有块级作用域造成的

```
for (var i = 0; i < 3; i++) {
     setTimeout(function () {
         alert(i);
     }, 0);
 }
```

结果：弹窗三次 3

## 2 块级作用域

在用var定义变量的时候，变量是通过闭包进行隔离的，现在用了let，不仅仅可以通过闭包隔离，还增加了一些块级作用域隔离。 块级作用用一组大括号定义一个块,使用 let 定义的变量在大括号的外面是访问不到的

### **2.1 实现块级作用域**

```
if(true){
    let name = 'zfpx';
}
console.log(name);// ReferenceError: name is not defined
```

### **2.2 不会污染全局对象**

```
if(true){
    let name = 'zfpx';
}
console.log(window.name);
```

结果 undefined

### **2.3 for循环中也可以使用i**

```
// 嵌套循环不会相互影响
    for (let i = 0; i < 3; i++) {
        console.log("out", i);
        for (let i = 0; i < 2; i++) {
            console.log("in", i);
        }
    }
```

结果 out 0 in 0 in 1 out 1 in 0 in 1 out 2 in 0 in 1

### **2.4 重复定义会报错**

```
if(true){
    let a = 1;
    let a = 2; //Identifier 'a' has already been declared
}
```

### **2.5 不存在变量的预解释**

```
for (let i = 0; i < 2; i ++){
    console.log('inner',i);
    let i = 100;
}
```

结果 i is not defined

### **2.6 闭包的新写法**

以前

```
;(function () {

})();
```

现在

```
{
}
```
