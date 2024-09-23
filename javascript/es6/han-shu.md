# 函数

## 1 默认参数

可以给定义的函数接收的参数设置默认的值 在执行这个函数的时候，如果不指定函数的参数的值，就会使用参数的这些默认的值

```
function ajax(url,method='GET',dataType="json"){
  console.log(url);
  console.log(method);
  console.log(dataType);
}
```

## 2 展开操作符

把...放在数组前面可以把一个数组进行展开,可以把一个数组直接传入一个函数而不需要使用apply

```
//传入参数
let print = function(a,b,c){
    console.log(a,b,c);
}
print([1,2,3]);
print(...[1,2,3]);

// 可以替代apply
var m1 = Math.max.apply(null, [8, 9, 4, 1]);
var m2 = Math.max(...[8, 9, 4, 1]);

// 可以替代concat
var arr1 = [1, 3];
var arr2 = [3, 5];
var arr3 = arr1.concat(arr2);
var arr4 = [...arr1, ...arr2];
console.log(arr3,arr4);

//类数组的转数组
function max(a,b,c) {
    console.log(Math.max(...arguments));
}
max(1, 3, 4);
```

## 3 剩余操作符

剩余操作符可以把其余的参数的值都放到一个叫b的数组里面

```
let rest = function(a,...rest){
    console.log(a,rest);
}
rest(1,2,3);
```

## 4 解构参数

```
let destruct = function({name,age}){
    console.log(name,age);
}
destruct({name:'zfpx',age:6});
```

## 5 函数的名字

ECMAScript 6 给函数添加了一个name属性

```
var desc = function descname(){}
console.log(desc.name);
```

## 6 箭头函数

箭头函数简化了函数的的定义方式，一般以 "=>" 操作符左边为输入的参数，而右边则是进行的操作以及返回的值inputs=>output

```
[1,2,3].forEach(val => console.log(val)););
```

输入参数如果多于一个要用()包起来，函数体如果有多条语句需要用{}包起来

箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。 正是因为它没有this，从而避免了this指向的问题。

```
var person = {
    name:'zfpx',
    getName:function(){
-        setTimeout(function(){console.log(this);},1000); //在浏览器执行的话this指向window
+        setTimeout(() => console.log(this),1000);//在浏览器执行的话this指向person
    }
}
person.getName();
```

## 7 数组的新方法

### **7.1 from**

将一个数组或者类数组变成数组,会复制一份

```
let newArr = Array.from(oldArr);
```

### **7.2 Array.of**

of是为了将一组数值,转换为数组

```
console.log(Array(3), Array(3).length);
console.log(Array.of(3), Array.of(3).length);
```

### **7.3 copyWithin**

Array.prototype.copyWithin(target, start = 0, end = this.length) 覆盖目标的下标 开始的下标 结束的后一个的下标

```
[1, 2, 3, 4, 5].copyWithin(0, 1, 2);
```

### **7.4 find**

查到对应的元素和索引

```
let arr = [1, 2 ,3, 3, 4, 5];
    let find = arr.find((item, index, arr) => {
        return item === 3;
    });
    let findIndex = arr.findIndex((item, index, arr) => {
        return item === 3;
    });

    console.log(find, findIndex);
```

### **7.5 fill**

就是填充数组的意思 会更改原数组 Array.prototype.fill(value, start, end = this.length);

```
 let arr = [1, 2, 3, 4, 5, 6];
 arr.fill('a', 1, 2);
 console.log(arr);
```

### **7.5 map**

### **7.6 reduce**

### **7.7 filter**

### **7.8 forEach**
