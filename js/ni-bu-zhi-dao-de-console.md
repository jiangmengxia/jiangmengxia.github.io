# 你不知道的console

<div align="left">

<figure><img src="../.gitbook/assets/image (16).png" alt=""><figcaption></figcaption></figure>

</div>

<div align="left">

<figure><img src="../.gitbook/assets/image (17).png" alt=""><figcaption></figcaption></figure>

</div>

常用的的info|warn|log|info|clear|debug就不加赘述了，依次看下剩下的方法吧

### 1. assert（断言）

`console.assert()` 是 JavaScript 中用于调试的函数。它接受两个参数：

* 一个表达式
* 一个可选的消息。

**如果表达式为 `false`，则 `console.assert()` 会输出消息并抛出一个错误**。**如果表达式为 `true`，则 `console.assert()` 不会输出任何内容。**

例如：

```javascript
console.assert(1 === 2, "1 is not equal to 2");
```

这段代码会输出 "1 is not equal to 2" 并抛出一个错误，因为 `1 === 2` 的结果是 `false`。

<div align="left">

<figure><img src="../.gitbook/assets/image (18).png" alt=""><figcaption></figcaption></figure>

</div>

### 2. context

获取console的上下文信息

<div align="left">

<figure><img src="../.gitbook/assets/image (19).png" alt="" width="401"><figcaption></figcaption></figure>

</div>

### 3. count|CountReset

`console.count()` 是 JavaScript 中用于调试的函数。它接受一个可选的字符串参数，用于<mark style="background-color:purple;">标识</mark>计数器。每次调用 `console.count()` 时，计数器会增加，并在控制台中输出当前计数器的值。

例如：

```javascript
for (let i = 0; i < 5; i++) {  
    console.count("count");
}
// 输出为
count: 1
count: 2
count: 3
count: 4
count: 5
```

当需要清除当前标识的count时，使用CountReset()即可，入参为计数器的标识。

```javascript
console.count("count");
// 6
console.CountReset("count");
// 清除计数器count, 输出 undefind 
console.count("count");
// 0
```

### 4. createTask

console.createTask(name)

[https://developer.chrome.com/docs/devtools/console/api#createtask](https://developer.chrome.com/docs/devtools/console/api#createtask)

{% code overflow="wrap" %}
```
返回一个Task实例，该实例将当前堆栈跟踪与创建的任务对象相关联。稍后，您可以使用此任务对象运行函数（以下示例中的f）。task.run（f）执行任意有效payload，并将返回值转发回调用者。
```
{% endcode %}

```
// Task creation
const task = console.createTask(name);

// Task execution
task.run(f); // instead of f();
```

{% code overflow="wrap" %}
```
该任务在创建上下文和异步函数的上下文之间形成链接。此链接允许DevTools为异步操作显示更好的堆栈跟踪。有关详细信息，请参见链接堆栈跟踪。
```
{% endcode %}



### 5. dir|dirxml

`console.dir(object)` 打印指定对象的JSON表示形式。

```javascript
console.dir(document.head);
```

<div align="left">

<figure><img src="../.gitbook/assets/image (20).png" alt="" width="563"><figcaption></figcaption></figure>

</div>

`console.dirxml(node)`打印节点子代的XML表示。

```javascript
console.dirxml(document);
```

<div align="left">

<figure><img src="../.gitbook/assets/image (21).png" alt="" width="563"><figcaption></figcaption></figure>

</div>

### 6. group|groupCollapsed|groupEnd

`console.group()` 是 JavaScript 中用于在控制台中创建一个新的分组的方法。分组可以用于将相关的日志输出到一起，以便更好地组织和查看。

```javascript
const label = 'Adolescent Irradiated Espionage Tortoises';
console.group(label);
console.info('Leo');
console.info('Mike');
console.info('Don');
console.info('Raph');
console.groupEnd(label); // 结束当前分组
```

还可以使用嵌套形式

```javascript
const timeline1 = 'New York 2012';
const timeline2 = 'Camp Lehigh 1970';
console.group(timeline1);
console.info('Mind');
console.info('Time');
console.group(timeline2);
console.info('Space');
console.info('Extra Pym Particles');
console.groupEnd(timeline2);
console.groupEnd(timeline1);
```

<div align="left">

<figure><img src="../.gitbook/assets/image (22).png" alt="" width="563"><figcaption></figcaption></figure>

</div>

使用 `console.groupCollapsed(label)`用来设置默认将输出的console内容折叠起来，如下：

<div align="left">

<figure><img src="../.gitbook/assets/image (23).png" alt=""><figcaption></figcaption></figure>

</div>

### 7. memory属性

如果你发现性能问题很难分析，可能还要考虑是否有内存泄露，你可以使用`console.memory`（注意 memory 是 console 的属性，不是函数），来查看当前的堆的使用情况。

<div align="left">

<figure><img src="../.gitbook/assets/image (24).png" alt="" width="497"><figcaption></figcaption></figure>

</div>

### 8. profile|profileEnd

`console.profile()` 是 JavaScript 中用于启动性能分析（profiling）的方法。它接受一个可选的字符串参数，用于标识性能分析的任务。

例如：

```javascript
console.profile("myTask");
// 执行一些代码
console.profileEnd("myTask");
```

这段代码会启动一个名为 "myTask" 的性能分析任务，并在执行一些代码后结束这个任务。在控制台中，您可以查看 "myTask" 的性能分析结果，包括函数调用次数、函数执行时间等。

需要注意的是，`console.profile()` 方法在不同的浏览器和环境中可能会有不同的行为。因此，在使用 `console.profile()` 方法时，应该考虑到兼容性问题。

Perfomance或Javascript profile面板中能看到record的profiling。

<div align="left">

<figure><img src="../.gitbook/assets/image (25).png" alt="" width="563"><figcaption></figcaption></figure>

</div>

### 9.Table

你可以使用`console.table()`将对象以表格的形式打印出来。

<div align="left">

<figure><img src="../.gitbook/assets/image (26).png" alt="" width="563"><figcaption></figcaption></figure>

</div>

### 10. time|timeEnd|timeLog

`console.time()` 是 用于<mark style="background-color:purple;">启动计时器</mark>的方法。它接受一个字符串参数，用于标识计时器的名称。

`console.timeLog()` 是 用于<mark style="background-color:purple;">输出计时器结果</mark>的方法。它接受一个字符串参数，表示计时器名称的标识。

`console.timeEnd()`是用于<mark style="background-color:purple;">终止计时器</mark>的方法，它接受一个字符串参数，表示计时器名称的标识。

例如：

```javascript
console.time("myTimer");
// 执行一些代码
console.timeEnd("myTimer");
```

<figure><img src="../.gitbook/assets/image (27).png" alt=""><figcaption></figcaption></figure>

### 11.trace

将堆栈跟踪打印到Console，如下显示了四个方法的调用关系：

<div align="left">

<figure><img src="../.gitbook/assets/image (28).png" alt="" width="333"><figcaption></figcaption></figure>

</div>



