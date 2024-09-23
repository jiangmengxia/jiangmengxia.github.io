# 对象

## 1 对象字面量

如果你想在对象里添加跟变量名一样的属性，并且属性的值就是变量表示的值就可以直接在对象里加上这些属性

```
let name = 'zfpx';
let age = 8;
let getName = function(){
    console.log(this.name);
}
let person = {
    name,
    age,
    getName
}
person.getName();
```

## 2 Object.is

对比两个值是否相等

```
console.log(Object.is(NaN,NaN));

```

## 3 Object.assign

把多个对象的属性复制到一个对象中,第一个参数是复制的对象,从第二个参数开始往后,都是复制的源对象

```
var nameObj = {name:'zfpx'};
var ageObj = {age:8};
var obj = {};
Object.assign(obj,nameObj,ageObj);
console.log(obj);

//克隆对象
function clone (obj) {
  return Object.assign({}, obj);
}
```

## 4 Object.setPrototypeOf

将一个指定的对象的原型设置为另一个对象或者null

```
var obj1  = {name:'zfpx1'};
var obj2 =  {name:'zfpx2'};
var obj = {};
Object.setPrototypeOf(obj,obj1);
console.log(obj.name);
console.log(Object.getPrototypeOf(obj));
Object.setPrototypeOf(obj,obj2);
console.log(obj.name);
console.log(Object.getPrototypeOf(obj));
```

## 5 proto

直接在对象表达式中设置prototype

```
var obj1  = {name:'zfpx1'};
var obj3 = {
    __proto__:obj1
}
console.log(obj3.name);
console.log(Object.getPrototypeOf(obj3));
```

## 6 super

通过super可以调用prototype上的属性或方法

```
let person ={
    eat(){
        return 'milk';
    }
}
let student = {
    __proto__:person,
    eat(){
        return super.eat()+' bread'
    }
}
console.log(student.eat());
```
