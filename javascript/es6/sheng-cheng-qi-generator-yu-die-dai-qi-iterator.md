# 生成器(Generator)与迭代器(Iterator)

Generator是一个特殊的函数，执行它会返回一个Iterator对象。 通过遍历迭代器， Generator函数运行后会返回一个遍历器对象，而不是普通函数的返回值。



## 1 Iterators模拟

迭代器有一个next方法，每次执行的时候会返回一个对象 对象里面有两个属性，一个是value表示返回的值，还有就是布尔值done,表示是否迭代完成

```
function buy(books) {
    let i = 0;
    return {
        next(){
            let done = i == books.length;
            let value = !done ? books[i++] : undefined;
            return {
                value: value,
                done: done
            }
        }
    }
}

let iterators = buy(['js', 'html']);
var curr;
do {
    curr = iterators.next();
    console.log(curr);
} while (!curr.done);
```

## 2 Generators

生成器用于创建迭代器

```
function* buy(books){
    for(var i=0;i<books.length;i++){
        yield books[i];
    }
}
let buying = buy(['js','html']);
var curr;
do {
    curr = buying.next();
    console.log(curr);
} while (!curr.done);
```
