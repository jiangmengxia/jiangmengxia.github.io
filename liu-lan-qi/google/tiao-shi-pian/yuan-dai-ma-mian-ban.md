# 源代码面板

顾名思义，管理网页所有的源代码文件，包括JS、CSS、图片等资源，经常就是在这里断点调试JS代码

在调试模式下可以查看（鼠标悬浮在变量上）变量值、上下文作用域、函数调用堆栈信息。

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2FLro78SHf7mKFfkX2jyft%2Fimage.png?alt=media&#x26;token=0a0ce563-d989-46f3-b2de-3c01f1270e12" alt=""><figcaption></figcaption></figure>

* **① 页面资源目录**：页面涉及的所有资源（树）。
* **② 源代码**：文件源代码，可以在这里添加断点调试JS代码，如果想编辑在线JS代码，也是可以的，详见后文。
* **③ Debug工具栏**：断点调试的操作工具，可以控制暂停、继续、单步...执行代码。
* **④ 断点调试器**：这里包含多个断点调试器：

> * **监视（Watch）**：可添加对变量的监视。
> * **断点（Breakpoints）**：所有添加的断点，可在这里编辑、删除管理。
> * **作用域（Scope）**：当前代码上下文的作用域，含闭包。
> * **调用堆栈（Call Stack**）：当前函数的调用堆栈，推荐参考《JavaScript函数(2)原理{深入}执行上下文\[3]》。
> * **XHR/提取断点**：可以在这里添加对AJAX请求（XHR、Fetch）的断点，添加URL地址即可。
> * **DOM断点**：在元素页面添加的DOM断点会在这里显示。

## 断点调试

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2FyIX0Dg82JWyTGgUbAwQY%2Fimage.png?alt=media&#x26;token=e656ead6-dc9a-4992-8f80-3cd31c8a4487" alt=""><figcaption></figcaption></figure>

* **添加断点（Add breakpoint）**：添加一个普通断点，最左侧行号处，点击添加断点，或者右键菜单。

&#x20;      也可以在JS代码中设置断点，关键字：`debugger`

* **添加条件断点（Add conditional breakpoint）**：添加一个条件断点，符合条件断点才会生效，条件可使用当前代码上下文中的变量。

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2FNXA0xgJMCyLde7AUM96c%2Fimage.png?alt=media&#x26;token=a0fb3541-06bf-4622-b37f-9c0ed21217b5" alt=""><figcaption></figcaption></figure>

* **添加记录点（Add logpoint）**：添加一个日志打印，打印当前代码环境的变量，非常方便，不用在源码下添加`console`了。

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2F02CyoJ3a2l8Y0ZeT502D%2Fimage.png?alt=media&#x26;token=9dbac89a-e455-44bd-aab7-caff558905bd" alt=""><figcaption></figcaption></figure>

## 调试线上代码：本地工作区

如果是线上的环境，能不能直接修改源代码（JS、CSS）调试呢？—— 可以的。思路就是创建本地的JS副本，页面加载本地的JS文件，就可以在本地JS文件上修改了。

### **创建本地工作目录**

* 如下图，源代码下面找到“覆盖（Override）”。

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2FYHTTQCQP3Kpp7yRZgswY%2Fimage.png?alt=media&#x26;token=50ae8d0d-b96e-456c-be2b-2420e4aac533" alt=""><figcaption></figcaption></figure>

* 然后点击“选择替代文件夹”，添加一个本地空的文件夹，作为本地工作目录。
* 添加后要注意要确认授权。

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2F0RFPqDwUznQ7CuiC0QnM%2Fimage.png?alt=media&#x26;token=1b3cecec-c720-46d6-9fae-cb38db5bb352" alt=""><figcaption></figcaption></figure>

### **创建源代码的本地副本**

选择需要修改的源代码右键“保存以备替代”，就会在本地目录创建副本文件，网页使用本地的JS文件。

* 创建的本地副本，可以在“覆盖”下看到，也可以在本地文件夹下看到。

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2Foxt5skSFRU5rhGFPkPPl%2Fimage.png?alt=media&#x26;token=74dd4061-3168-4a2e-a18c-addb02b6ff4e" alt=""><figcaption></figcaption></figure>

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2FS5KQEt60SsplhBuRQ24O%2Fimage.png?alt=media&#x26;token=f2860fdd-715a-4880-8433-eef8d7d2803c" alt=""><figcaption></figcaption></figure>

### **编辑代码**

该JS文件就可以直接在源代码中编辑修改了，实时生效。

* CSS、HTML、JavaScript都支持。
* 可以在浏览器的源代码中修改，也可以本地其他工具中打开编辑。

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2FsduxSyA6oZXq65H0HbXR%2Fimage.png?alt=media&#x26;token=4b6fe70a-68b9-4abc-83c7-900d595312a4" alt=""><figcaption></figcaption></figure>
