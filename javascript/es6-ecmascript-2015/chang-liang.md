# 常量

使用const我们可以去声明一个常量，常量一旦赋值就不能再修改了

#### 2.1 常量不能重新赋值

```
const MY_NAME = 'zfpx';
MY_NAME = 'zfpx2';//Assignment to constant variable
```

#### 2.2 变量值可改变

注意const限制的是不能给变量重新赋值，而变量的值本身是可以改变的,下面的操作是可以的

```
const names = ['zfpx1'];
names.push('zfpx2');
console.log(names);
```

#### 2.3 不同的块级作用域可以多次定义

```
const A = "0";
{
    const A = "A";
    console.log(A)
}
{
    const A = "B";
    console.log(A)
}
console.log(A)
```

结果 A B 0
