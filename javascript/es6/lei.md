# 类

## 1 class

使用class这个关键词定义一个类,基于这个类创建实例以后会自动执行constructor方法,此方法可以用来初始化

```
class Person {
    constructor(name){
        this.name = name;
    }
    getName(){
        console.log(this.name);
    }
}
let person = new Person('zfpx');
person.getName();
```

## 2 get与set

getter可以用来得获取属性，setter可以去设置属性

```
class Person {
    constructor(){
        this.hobbies = [];
    }
    set hobby(hobby){
        this.hobbies.push(hobby);
    }
    get hobby(){
        return this.hobbies;
    }
}
let person = new Person();
person.hobby = 'basketball';
person.hobby = 'football';
console.log(person.hobby);
```

## 3 静态方法-static

在类里面添加静态的方法可以使用static这个关键词，静态方法就是不需要实例化类就能使用的方法

```
class Person {
   static add(a,b){
       return a+b;
   }
}
console.log(Person.add(1,2));

```

## 4 继承extends

一个类可以去继承其它的类里的东西

```
class Person {
   constructor(name){
     this.name = name;
   }
}
class Teacher extends Person{
    constructor(name,age){
        super(name);
        this.age = age;
    }
}
var teacher = new Teacher('zfpx',8);
console.log(teacher.name,teacher.age);
```
