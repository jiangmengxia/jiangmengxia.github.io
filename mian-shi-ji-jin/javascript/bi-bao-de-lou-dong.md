# 闭包的漏洞

### 对于以下代码，如何不在改变上面代码的情况下，修改obj对象

```javascript
let o= (function(){
    let obj = {
        a:1,
        b:2
    }
    return {
        get:function(key){
            return obj[key]
        }
    }
})()

```

&#x20;

有人想到了valueOf，对象.valueOf()可以拿到对象本地

```javascript
a= {1:2}
a.valueOf() // 输出本身： {1: 2}
```

但是这里，o.get('valurOf')，拿到的是valueOf的function，这个上下文this不是指向的闭包的上下文，因此不行。

<mark style="color:red;">解决办法</mark>：对Object原型对象，设置读取属性abc时，返回对象本身&#x20;

```javascript
Object.defineProperty(Object.prototype,'abc',{ 
    get:function(){ 
            return this 
    } 
})
```

则`o.get('abc')=`obj\['abc'] = obj,  因此得到的是obj对象本身，因此输出{a: 1, b: 2}

