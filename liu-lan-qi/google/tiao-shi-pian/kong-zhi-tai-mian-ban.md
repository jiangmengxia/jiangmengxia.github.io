# 控制台面板

## 1. Console

其他console接口参考 [不一样的console](../../../qian-duan-ji-chu/javascript/fang-fa/ni-bu-zhi-dao-de-console.md)

* 自定义log样式：占位符

`console`函数支持的占位符：

| 占位符          | 描述                                                                    |
| ------------ | --------------------------------------------------------------------- |
| `%c`         | CSS样式占位符，值就是CSS样式，如下示例，可用来自定义log的样式                                   |
| `%o` or `%O` | 打印 JavaScript 对象。在审阅器点击对象名字可展开更多对象的信息。                                |
| `%d` or `%i` | 打印整数。支持数字格式化。例如，console.log("Foo %.2d", 1.1) 会输出有先导 0 的两位有效数字：Foo 01。 |
| `%s`         | 打印字符串。                                                                |
| `%f`         | 打印浮点数。支持格式化，比如 console.log("Foo %.2f", 1.1) 会输出两位小数：Foo 1.10          |

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2F5y5Qf6FX2Kb1R1kghdnr%2Fimage.png?alt=media&#x26;token=a7e12dd2-7453-4468-92d8-bbf30c8f4e92" alt=""><figcaption></figcaption></figure>

## 2.  监听函数**monitor\&monitorEvents**

通过如下（调试工具）的全局函数可监听一个函数、事件的执行。

| 函数                          | 说明                          |
| --------------------------- | --------------------------- |
| **monitor**( function )     | 监听一个函数，当被监听函数执行的时候，会打印被调用信息 |
| **monitorEvents** ( event ) | 监听一个事件，当事件被触发时打印触发事件日志      |

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2FQmvGzKyTEERdx5nYKfJh%2Fimage.png?alt=media&#x26;token=94ca2f49-3938-4e86-9046-d06b6b31d8ea" alt=""><figcaption></figcaption></figure>

## 3.  监听变量：活动表达式

点击下图中的眼睛图标，打开了创建活动表达式输入框。通过这个输入框，你可以输入你要监听的表达式。这个功能允许开发者在控制台顶部固定一个或多个JavaScript表达式，以便实时跟踪它们的值。

这对于监测变量或表达式的变化特别有用，尤其是当你发现自己需要反复输入同一个表达式来查看其值时。

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2FQmvGzKyTEERdx5nYKfJh%2Fimage.png?alt=media&#x26;token=94ca2f49-3938-4e86-9046-d06b6b31d8ea" alt=""><figcaption></figcaption></figure>

例如，你可以输入`document.activeElement`来实时跟踪当前文档中获得焦点的元素。输入完毕后，按`Enter`键或点击文本框外部即可保存表达式。

一旦表达式被保存，它的值就会显示在固定表达式下方，并且这个值会每250毫秒更新一次，让你能够近乎实时地观察到值的变化。如果你需要同时监视多个表达式，可以重复点击“创建实时表达式”按钮来添加更多表达式。虽然一次只能查看几个固定的表达式，但你可以滚动表达式列表来查看所有固定的表达式。

## 4. $0,$1,$2,$3 引用节点

$0：引用当前选中节点

$1,：引用的节点是：从当前选中节点往前数，第一个选中节点（上一个记忆节点）

$2：引用的节点是：从当前选中节点往前数，第二个选中节点（上上个记忆节点）

$3：引用的节点是：从当前选中节点往前数，第三个选中节点（上上上个记忆节点）

$4：引用的节点是：从当前选中节点往前数，第四个选中节点（上上上上个记忆节点）

最大支持$4，$5开始报错

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2Fk1wR3rMEIuOxHEf4dqJ9%2F%7B99965EF5-1964-4AD0-99D2-D9E801879811%7D.png?alt=media&#x26;token=f4936671-65b8-48d8-b74b-ef5a8491d0cf" alt=""><figcaption></figcaption></figure>

## 5. 存储为全局变量

略

## 6. 复制 JS 路径

需要在脚本或自动化测试中精确定位元素时特别有用。右键点击你想要操作的元素，选择“复制”然后是“复制 JS 路径”，这会将一个 document.querySelector() 表达式复制到你的剪贴板，该表达式是一个精确到该元素的选择器。你可以直接在控制台中粘贴并执行它，或者在你的JavaScript代码中使用它。

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2FflzjMtQYydO1ndD8klXg%2Fimage.png?alt=media&#x26;token=85500b87-373c-446a-940c-0316619c96c8" alt=""><figcaption></figcaption></figure>

