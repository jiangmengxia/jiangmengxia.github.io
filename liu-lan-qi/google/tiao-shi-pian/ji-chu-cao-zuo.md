# 基础操作

### **基础操作**

| **操作类型**                  | **快捷键/说明**                                                                               |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| 切换浏览器标签                   | 🔸 `Ctrl+1到8`切换到对应序号的浏览器标签 🔸 `Ctrl+PgUp/PgDn`标签页左右切换                                    |
| 浏览器全屏                     | `F11` (`⌘ + shift + F` Mac)                                                              |
| 打开调试模式                    | 🔸 `F12`，`Ctrl + Shift + I` (Windows) 或 `Cmd + Opt + I` (Mac) 🔸 页面右键菜单“检查”，浏览器菜单“开发者工具” |
| 切换调试工具位置（下面、右边）           | `ctrl + shift + D` (`⌘ + shift + D` Mac)                                                 |
| 切换 DevTools 的面板标签         | `ctrl + [` 和 `ctrl + ]`左右切换调试工具面板                                                        |
| 内容搜索查找                    | `Ctrl+F`：元素、控制台、源代码、网络都支持搜索查找                                                            |
| 使用命令Command面板             | `Ctrl] + [Shift] + [P]` （Mac： `[⌘] + [Shift]+ [P]`） 类似VSCode的命令面板，有大量的隐藏功能，可以在这里搜索使用     |
| 复制元素                      | 🔸 元素面板：选中元素》`Ctrl+C` 🔸 元素面板：选中元素》右键菜单》复制元素 🔸 `copy($0)` 控制台中代码复制当前选中元素                |
| 控制台：快速访问当前元素'$0'          | `$0`代表在元素面板中选中元素，`$1`是上一个，支持到`$4`                                                        |
| 控制台：全局`copy`方法            | 复制任何对象到剪切板，`copy(window.location)`                                                       |
| 控制台：queryObjects(Type)    | 查询指定类型（构造器）的对象实例有哪些                                                                      |
| 控制台：保存堆栈信息( Stack trace ) | 报错信息可以右键另存为文件，保存完整堆栈信息                                                                   |
| 控制台：`$`、`$$`查询Dom元素       | - `$` = `document.querySelector` - `$$` = `document.querySelectorAll`                    |
| Store as global（存储为全局变量）  | 🔸 控制台（右键）：把一个对象设置为全局变量，自动命名为`temp*` 🔸 元素面板（右键）：把一个元素设置全局变量，同上                          |
| 元素：`h`快速隐藏、显示该元素          | 选中元素，按下`h`快速隐藏、显示该元素。                                                                    |
| 元素：移动元素                   | 🔸 鼠标拖动到任意位置 🔸 上下移动，`[ctrl] + [⬆]` / `[ctrl] + [⬇]` （`[⌘] + [⬆] / [⌘] + [⬇]`on Mac）     |



### **2.1 Store as global（存储为全局变量）**

类似copy方法，将一个对象保存为全局变量，变量命名依次为`temp1`、`temp2`。

### 2.2 保存堆栈信息( Stack trace )

错误堆栈信息另存为文件，保存完整堆栈信息。

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2FuCJH27VFe0GFp3lo4IeY%2Fimage.png?alt=media&#x26;token=94371a66-0eb7-415f-a7fa-d418513a4f0b" alt=""><figcaption></figcaption></figure>

### **2.3 Command面板**

同VSCode的命令面板，可以找到调试工具的所有的（隐藏）功能。`Ctrl] + [Shift] + [P]`（Mac： `[⌘] + [Shift]+ [P]`）



<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2FbOWmcK0X7V0D1HAIFAIx%2Fimage.png?alt=media&#x26;token=fe3c5e78-d9e4-43be-84c2-ea968bacb251" alt=""><figcaption></figcaption></figure>

### **2.4 设置主题**

打开Command面板，搜索“主题”，可以切换多种主题

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2Fo4nYyFVGOqAAS60EDklK%2Fimage.png?alt=media&#x26;token=62fd4798-6a90-48f9-8551-23a8dfa39db1" alt=""><figcaption></figcaption></figure>

### **2.5 分析代码的覆盖率**

打开Command面板，如下图搜索“覆盖”，分析首次页面加载过程中哪些代码执行了，那些没有执行，输出一个报告。

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2Fa3Jt1BOLHZLsOZ8Pjlzs%2Fimage.png?alt=media&#x26;token=93d57113-ab69-4581-b759-ebe1735f948c" alt=""><figcaption></figcaption></figure>

执行后，在coverage Tab中查看执行结果，最右侧有覆盖率显示。

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2F8Yb4RMXqBl8CFcAcTRdk%2F%7BF3AEFA14-A6C1-479A-AD7E-3CCDEBA58941%7D.png?alt=media&#x26;token=beca5112-d7bc-465b-8c4e-662fc2673d96" alt=""><figcaption></figcaption></figure>

选择文件可进一步查看代码的使用分析，<mark style="color:red;">红色 = 尚未执行，青蓝色 = 至少执行了一次</mark>。

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2FNM5ct0ImL3zFNuwL6rJL%2Fimage.png?alt=media&#x26;token=647295a6-7650-4fc0-ad4d-41a9f705c54a" alt=""><figcaption></figcaption></figure>

通过覆盖率，我们可以分析出哪JS分支可达性为0，哪些css定义多余等。

