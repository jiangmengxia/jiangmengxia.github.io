# Web Component

概要

webComponent标准的一个关键特性是能够创建功能封装在HTML页面上的自定义元素，这个元素可作为组件来复用，而不必在实现某项特定功能的时候码一些重复的长嵌套代码元素，也就是说webComponent重在组件复用性，而这种组件相比于react、vue等各种框架开发的**框架组件**，可看作是原生HTML封装的**原生组件**，它不依赖与任何JS的前端框架，是WEB提供的组件开发的标准。

## 0. 背景 <a href="#xangt" id="xangt"></a>

在各种各样的前端框架盛行的年代，组件贯穿着我们日常开发过程中，不管是针对业务封装的业务组件还是项目中依赖基础组件库（antd、ivew、Element...)，亦或是依赖的前端框架（Angular、Preact、vue、React...），都离不开「组件化」的概念，「组件化」开发已然成为前端主流开发方式。这都离不开组件化的核心思想：代码复用性，在提升团队开发效率上有着不可比拟的优势。不能否定，组件化是前端的发展方向。

最早在 2011 年的时候 Google 就推出了 Web Components 的概念。那时候前端还处于百废待兴的一个状态，前端甚至都没有「组件化」的概念，但是就是这个时候 Google 就已经凭明锐的嗅觉察觉到「组件化」是未来发展的趋势，所以 Google 一直在推动浏览器的原生组件的发展，即 Web Components API。

相比第三方框架，原生组件简单直接，符合直觉，不用加载任何外部模块，不依赖任何框架，代码量小。目前已经发展成熟，已经可应用于生产环境。

近年来，Web组件 -- Custom Elements 已成为多个浏览器的标准API，允许开发人员将 HTML、CSS和JavaScript进行封装成为可重用组件，这也将是未来的趋势。

## 1. 优势 <a href="#joo33" id="joo33"></a>

### 1.1 组件本身的一些优势 <a href="#w1eiq" id="w1eiq"></a>

#### 1.1.1 安全&节能 <a href="#wd6uu" id="wd6uu"></a>

现代JavaScript框架充满了最佳实践、脚手架工具、基本模型和行业标准。它让我们可以在短时间内构建和发布应用程序。最重要的是，它允许开发人员专注于真正的开发，而不是工具和架构。

#### 1.1.2 代码复用性 <a href="#uxhxv" id="uxhxv"></a>

使用JavaScript框架构建的组件是可复用的，无需二次开发

#### 1.1.3 可维护性 <a href="#vbk9v" id="vbk9v"></a>

无需每次都修改很多代码片段，只需更新一次相关组件即可。

#### 1.1.4 可扩展性 <a href="#iao1p" id="iao1p"></a>

好的组件，遵循单一职责原则，具有较好得可扩展性

### 1.2 JS库(或框架）所没有的优势 <a href="#qtqaz" id="qtqaz"></a>

#### 1.2.1 原生支持 <a href="#s2ukx" id="s2ukx"></a>

原生支持意味着可以不需要任何框架即可完成开发，同时也意味着这将有更好的用户体验，更低的网络请求，以及更稳定的迭代前景。

我们自定义的webComponent就如同input,video，select元素一样，都是标准的原生组件，只是我们通过webComponent的标准去创造自定义的元素组件。

#### 1.2.2 可读性 <a href="#vdknl" id="vdknl"></a>

在调试模式的元素Tab下，可以看到组件的内部结构，而无需借助于任何插件。

#### 1.2.3 可移植性/互通性 <a href="#jenp1" id="jenp1"></a>

Angular、React和VueJs等JavaScript框架都很不错，提供了最佳实践、脚手架工具、模型和行业标准，并让我们在短时间内构建和发布应用程序。但它们的移植性不好，这是因为它们都有各种不可互换的组件模型

webComponent组件完全基于Web标准，并且与任何JavaScript库或JavaScript框架兼容，webComponent组件可以在任一JS库或框架下工作。因此，它们可以在框架和应用程序之间完全互操作，不依赖任何一种JS库或框架

#### 1.2.4 性能优势-组件隔离 <a href="#kxdic" id="kxdic"></a>

有了Shadow DOM的支持，为自定义的webComponent增加了隔离性，如CSS、事件的有效隔离，不再担心不同的组件之间的样式、事件污染了。

而对 CSS 的隔离也将加快选择器的匹配速度，即便可能是微秒级的提升，但是在极端的性能情况下，依然是有效的手段。

#### 1.2.5 性能优势-Tagged Template VS jsx <a href="#hcwdo" id="hcwdo"></a>

ES6 中的 template + tagged template 也是 Web Components 的标准特性之一，作为浏览器的原生支持，相比于 JSX 不仅无需预编译预处理，并且还有这更强的扩展能力。在性能上原生支持有着更优的处理性能。而 JSX 在每次 render 时，都需要完整的构造一个虚拟DOM，并且它还需要 JSS 将 CSS-in-JS 转换为样式表。因此同样功能的 JSX 将占用更多的 CPU 运算。

与 React 页面相比，具有较低 CPU 成本的 Web 组件页面将更快地具有交互性，并且可以更快地响应使用操作。

由于使用了 Template 技术，模版节点操作的对象是一个 DocumentFragement，而并非是真实 DOM 的一部分，相比 JSX 产生的 JS 堆栈其内存占用更小。

尤其当 VDOM 较大时，性能边界就尤其明显，大体积的 VDOM 与 tagged template 相比或差 1-2 个量级水平。

### 1.3 趋势数据 <a href="#hs9gy" id="hs9gy"></a>

图标展示了，2017/01至2023/01之间，统计每个月所有页面中使用了WeComponent组件的页面的占比（数据跨越所有渠道和平台），是依次递增的。

<figure><img src="../.gitbook/assets/image (33).png" alt=""><figcaption></figcaption></figure>

以下是对URL级别的采集，统计每个月使用了WeComponent组件的域名数占总的域名数的比例。

<figure><img src="../.gitbook/assets/image (34).png" alt=""><figcaption></figcaption></figure>

## 2. 要素

### **2.1 CustomElements** <a href="#df1px" id="df1px"></a>

Web Components 标准非常重要的一个特性是，它使开发者能够将 HTMLDOM簇的功能封装为自定义组件。CustomElements 是网页组件化的基础，也是其核心。

使用方式：

```
class MyCard extends HTMLElement {
  constructor() {
    super();
    // 
  }
  // 当自定义元素第一次被连接到文档 DOM 时调用（类似组件 Mounted）
  assertNotDisposed(d) {
    // console.log(d);
  }

  // 自定义的属性
  static get observedAttributes() {
    return ["text"];
  }

  // 改组件的渲染
  render() {
    console.log("this.$button", this.$button);
    if (this.$button) this.$button.innerHTML = this.text;
  }

  // 属性变更的回调
  attributeChangedCallback(name, oldVal, newVal) {
    this[name] = newVal;
    this.render();
  }
}

window.customElements.define('my-card', MyCard);
```

```
<my-card id='card' text='this is my-card'  {...props}/>
```

### 2.2 **Shadow DOM** <a href="#mqar0" id="mqar0"></a>

#### 2.2.1 **Shadow DOM结构** <a href="#qbcef" id="qbcef"></a>

Web components 的一个重要属性是封装——可以将标记结构、样式和行为隐藏起来，并与页面上的其他代码相隔离，保证不同的部分不会混在一起，可使代码更加干净、整洁。其中，Shadow DOM接口是关键所在，它可以将一个隐藏的、独立的 DOM 附加到一个元素上。

<figure><img src="../.gitbook/assets/image (35).png" alt=""><figcaption></figcaption></figure>

这里，有一些 Shadow DOM 特有的术语了解一下：

* Shadow host：一个常规 DOM 节点，Shadow DOM 会被附加到这个节点上。
* Shadow tree：Shadow DOM 内部的 DOM 树。
* Shadow boundary：Shadow DOM 结束的地方，也是常规 DOM 开始的地方。
* Shadow root: Shadow tree 的根节点。

#### 2.2.2 **Shadow DOM样式** <a href="#glqfl" id="glqfl"></a>

对于ShadowTree内部的样式的设置，可以由自身的style标签或样式指定，例如在 [\<style>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/style) 元素内添加样式，甚至也可以通过\<link/>外联样式。

**【样式隔离性】**

* 原则上，在Shadow Boundary外的样式，无法影响Shadow DOM的样式；
* 不同的ShadowTree元素样式之间，也不会相互影响。

对于需要影响的、以ShadowBoundary分离的样式，需要由特殊的方案显示指定，如：:host选择器，:host-context()选择器、::content()选择器等等。

#### 2.2.3 shadowDOM支持的操作 <a href="#x8ubz" id="x8ubz"></a>

常规DOM支持的操作，Shadow DOM都支持，如添加节点、设置属性以及为节点添加自己的样式（例如通过 element.style 属性）。

#### 2.2.4 为DOM添加shadowDOM <a href="#pqdz2" id="pqdz2"></a>

可以通过attachShadow方法为某个DOM（假设Element)节点添加shadowDOM，当设置mode可以设置：

* open：open 表示可以通过页面内的 JavaScript 方法来获取 Shadow DOM，例如使用 [Element.shadowRoot](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/shadowRoot) 属性，也就是说shadowRoot对外可见。
* closed：shadowHost不能通过[Element.shadowRoot](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/shadowRoot) 获取到shadowRoot，也就是说这个shadowRoot（以及内部的shadowDOM）对外是隐藏不可见的。

```
const node = document.queryElementById('container')
node.attachShadow({mode: 'open'});
node.shadowRoot.innerHTML = `<div>
<b>Name:</b> <slot name="username"></slot>
</div>`;
```

[webComponent案例 - CodeSandbox](https://codesandbox.io/s/webcomponentan-li-3ide40?file=/src/webcomponents/the-button/the-button.js)

#### 2.2.5 外部DOM如何获取shadowDOM <a href="#nq285" id="nq285"></a>

外部DOM无法直接拿到ShadowDOM，并且只带attachShadow模式为open的情况下，才能获取ShadowDOM。

需要先获取外部的ShadowHost，然后借助于ShadowHost.[shadowRoot](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/shadowRoot)拿到ShadowRoot，最后借助于ShadowRoot去拿到其他内部shadowDOM。

#### 2.2.6 支持挂载shadowDOM的元素 <a href="#pnsiy" id="pnsiy"></a>

这里需要注意的是并非所有html元素都可以挂载shadow dom，只有以下这些元素可以充当shadow dom的 shadow host。

| article     | aside      | blockquote            | body   |
| ----------- | ---------- | --------------------- | ------ |
| **div**     | **footer** | **h1**                | **h2** |
| **h3**      | **h4**     | **h5**                | **h6** |
| **header**  | **main**   | **nav**               | **p**  |
| **section** | **span**   | 任何带有有效的名称且可独立存在的自定义元素 |        |

当我们尝试在其它元素挂在shadow dom时，浏览器则会抛出异常，如下：

```
const input = document.querySelector('input')
const inputRoot = input.attachShadow({mode: 'open'})
```

<figure><img src="../.gitbook/assets/image (36).png" alt=""><figcaption></figcaption></figure>

#### 2.2.7 shadowDOM事件机制 <a href="#hgiup" id="hgiup"></a>

传统的JavaScript事件捕获与冒泡，由于Shadow Boundary的存在，与一般的事件模型有一定的差异。

当渲染引擎接收到一个事件的时候，它会通过**HitTest**（Webkit中的一种检查触发事件在哪个区域的算法）检查哪个元素是直接的事件目标（也就是addEventListen回调事件的入参event.target）。这样，事件会经过自顶向下和自底向上两个过程，也就是事件捕获和实际冒泡。

事件捕获：是自上向下的，也就是说事件从document一路向下，直到找到事件目标，通过event.stopPropagation可以阻止捕获，后面的冒泡就不会发生；该事件是否支持捕获，

事件冒泡：是自下而上的，当实际目标索引到后，它注册的回调事件会执行，同时渲染引擎会将事件向上冒泡，也就是传递给父节点，以此类推。通过event.preventDefault可以阻止冒泡，假设在A节点回调事件中设置了event.preventDefault（），则在A节点之上的父节点和所有祖先节点就不会捕获到冒泡来的事件，因此它们注册的回调函数就不会触发和执行。

如下图，当点击了某个ShadowDOM，HIT Test开始执行，自上向下的捕获开始，直到达到**事件目标ShadowDOM**，执行对应的回调函数，继续向上冒泡，每一次冒泡都会将target传给下一个父节点并执行一次对应的回调函数。

* 当在ShadowBoundary内部冒泡时，target都是这个**事件目标ShadowDOM**
* 而当冒泡到shadowHost的时候，会经过一次事件重定向，将target缓存自己，也就是**shadowHost**
* 因此继续冒泡到上面，上面所有的节点拿到的target都是它子节点传来**shadowHost**

【补充】：<mark style="color:red;">如果点击事件发生在shadowBoundray内部的某个Slot（插槽）内的某个节点，则中间的事件重定向不会发生，也就是shadowBoundray的冒泡过程中，传递的target都是真实的事件目标节点</mark>

演示地址：

[https://plnkr.co/edit/?p=preview\&preview](https://plnkr.co/edit/?p=preview\&preview)

```
<!doctype html>
<body>
<user-card id='card'></user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<p>
     <div id='wrap' style='border:1px solid #000; padding:5px;'>
        <button>Click me</button>
     </div>
    </p>`;
    // useCard BUTTON
    this.shadowRoot.querySelector('button').onclick = e => {
      alert("Inner target: " + e.target.tagName)
    }
    // useCard BUTTON
    this.shadowRoot.querySelector('#wrap').onclick = e => {
      alert("Inner target: " + e.target.tagName + 'in wrap')
    }
  }
});

document.querySelector('#card').onclick = e => {
     // useCard
      alert("Inner target: " + e.target.tagName + 'in card')
    }

// useCard
document.onclick =
  e => alert("Outer target: " + e.target.tagName);
</script>
</body>
```

**2.2.6.1 shadowDOM事件的特性**

* 当shadowDOM的mode设置为closed隐藏模式，不会影响shadowBoundray内的事件冒泡到ShadowHost
* ShadowDOM的触发的事件（含自定义事件）有以下几个重要属性：
*
  * bubbles： 是否允许【shadowBoundray内部】向上冒泡，默认是false。
  * composed：是否冒泡到shadowBoundray外部。默认情况下值是false，事件不会传播到shadowBoundray之外。
  * cancelable：冒泡允许被取消，默认是false。
  * detail：事件传的消息，也就是事件回调函数执行时的入参
* shadowRoot默认支持的原生事件跟普通DOM一样的，如onClick事件

```
<the-shadowdomhost  id='node' 
  onClick = {onClickHandler} 
  onMouseEnter = {onMouseEnterHandler} 
/>
```

* 可以通过CustomEvent来生成一个自定义事件，通过dispatchEvent方法分发事件

```
<!-- <the-shadowdomhost  id='node'> -->
<user-card id="userCard"></user-card>

<script>
  customElements.define('user-card', class extends HTMLElement {
    connectedCallback() {
     this.$shadowRoot =  this.attachShadow({mode: 'open'});
     this.$shadowRoot.innerHTML = `<div>
         <span id='demo'>demo</span>
      </div>`;
  
      const newEvent = new CustomEvent('newEvent', {
        bubbles:true, // 
        composed:true, // 是否对外
        cancelable:true, // 是否允许被取消
        detail: e  // 传事件回调函数执行时的入参
      }
    	const demoNode = this.$shadowRoot.querySelector('#demo') 
      demoNode.dispatchEvent(newEvent)
    }
  });

// userCard.onclick = e => alert(`Outer target: ${e.target.tagName}`);
  userCard.addEventListener('newEvent',(e)=>{
      console.log('get event newEvent', e)
  })
	
  document.addEventListener('newEvent',(e)=>{
      console.log('get event newEvent', e)
  })
</script>
```

### 2.3 **HTML templates** <a href="#bv12z" id="bv12z"></a>

＜template＞和＜slot＞元素允许您编写未显示在渲染页面中的标记模板。然后，可以多次重用这些元素作为自定义元素结构的基础。

#### 2.3.1 ＜template＞ <a href="#r1r3n" id="r1r3n"></a>

HTML 内容模板（\<template>）元素是一种用于保存客户端内容机制，该内容在加载页面时不会呈现，但随后可以 根据需要在运行时使用 JavaScript 实例化。因此可以将模板视为一个可存储在文档中以便后续使用的内容片段。

以下是一个模板的定义，一个html文档中，可以用id为每个模板设置唯一id。可以通过document常规的一些查找元素的方法来获取对应的template节点

```
<tamplate id='template'>
	<style>
		/*   ...   */
  </style>
  <script>
    // ...
  </script>
</tamplate>

<script>
  document.getElementsByTagName('tamplate')
  document.querySelector('#my-button')
</script>
```

**【属性】**

除了包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global\_attributes)

[HTMLTemplateElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLTemplateElement) 有个属性： [content](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLTemplateElement/content) , 这个属性是只读的[DocumentFragment](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment) 包含了模板所表示的 DOM 树，如下：通过templateNode.content拿到#document-fragment对应的节点

<figure><img src="../.gitbook/assets/image (37).png" alt=""><figcaption></figcaption></figure>

#### 2.3.2 \<slot> <a href="#gqwux" id="gqwux"></a>

插槽，跟vue的插槽同一个概念，用来自定义template内的内容部分，使之更具灵活性和可扩展性。slot只能在template内部使用。

## 3. \<template>的引入方式 <a href="#tg36r" id="tg36r"></a>

### 3.1 在index.html中写入template <a href="#whgib" id="whgib"></a>

这是最原始的方式。

```
<template id="template1">
  <!-- 定义template  -->
</template>
<template id="template2">
  <!-- 定义template  -->
</template>
...
```

### 3.2 使用.xml文件写入template <a href="#bnu62" id="bnu62"></a>

用单独的.xml定义一个template，便于索引到和维护。

借助于DOMParser方法将.xml文件中的内容，转化HTMLDocument对象

```
<template id="the-button">
  <!-- 注释 -->
  <style type='text/css'>
    .container {
      padding: 8px;
      border:1px solid #000;
    }
    button {
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      margin: 0;
      transition: .1s;
      font-weight: 500;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      padding: 12px 20px;
      font-size: 14px;
      border-radius: 4px;
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
    }
  </style>
  <div class="container">
    <button>SSS</button>
  </div>
</template>
```

```
function loadHtmDoc(str) {
  const parser = new DOMParser();
  return parser.parseFromString(str, "text/html");
}
function loadFileString(dname) {
  let xhttp;
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
  } else {
    xhttp = new window.ActiveXObject("Microsoft.XMLHTTP");
  }
  xhttp.open("GET", dname, false);
  xhttp.send();
  return xhttp.responseText;
}

const fileString = loadFileString(require("./the-input.html"));
const htmlDocObj = loadHtmDoc(fileString);

const templateNode = htmlDocObj.querySelector("#the-input");
console.log("templateNode ", templateNode);

templateNode.id = "my-tag";
document.body.appendChild(templateNode);
```

通过这种方式得到的htmlDocObj长这样，可以通过querySelector获取对应的templateNode。

<figure><img src="../.gitbook/assets/image (38).png" alt=""><figcaption></figcaption></figure>

最后被插入到document中，长这样：

<figure><img src="../.gitbook/assets/image (39).png" alt=""><figcaption></figcaption></figure>

### 3.2 使用引入template <a href="#ygedo" id="ygedo"></a>

借助于DOMParser方法将.xml文件中的内容，转化成Document对象。

发现这个document对象底下的template少了一层#document-fragment对象，因此需要另外转化一层。

**该方法比较复杂，可能有其他的坑，不作为首选。**

```
<template id="the-button">
  <!-- 注释 -->
  <style type='text/css'>
    .container {
      padding: 8px;
      border:1px solid #000;
    }
    button {
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      margin: 0;
      transition: .1s;
      font-weight: 500;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      padding: 12px 20px;
      font-size: 14px;
      border-radius: 4px;
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
    }
  </style>
  <div class="container">
    <button>SSS</button>
  </div>
</template>
```

```
function loadXMLDoc(dname) {
  let xhttp;
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
  } else {
    xhttp = new window.ActiveXObject("Microsoft.XMLHTTP");
  }
  xhttp.open("GET", dname, false);
  xhttp.send();
  return xhttp.responseXML;
}

const xmlDoc = loadXMLDoc(require("./the-button.xml"));
export function appendTheButtonTemplate() {
  const templateNode = document.createElement("template");
  Array.from(xmlDoc.documentElement.children).forEach((childNode) => {
    if (childNode.tagName === "style" && childNode instanceof Element) {
      // console.log("解析后的style变成了Element， 需转化成HTMLStyleElement");
      const styleNode = document.createElement("style");
      styleNode.innerHTML = childNode.innerHTML;
      templateNode.content.appendChild(styleNode);
    } else {
      templateNode.content.appendChild(childNode.cloneNode(true));
    }
  });
  templateNode.id = "the-button";
  document.body.appendChild(templateNode);
  return { templateNode };
}
const { templateNode } = appendTheButtonTemplate();
templateNode.id = "my-button";
document.body.appendChild(templateNode);
```

<figure><img src="../.gitbook/assets/image (40).png" alt=""><figcaption></figcaption></figure>

引入到document中长这样

<figure><img src="../.gitbook/assets/image (41).png" alt=""><figcaption></figcaption></figure>

## 4. 自定义WebComponent <a href="#le69a" id="le69a"></a>

我们可以结合**HTML templates、ShadowDOM、CustomElement技术，**自定义WebComponent。

**案例：**

```
<template id='the-tag'>
  <link href='./the-tag.css'></link>
  <style>
    #tag{
    padding:5px;
    margin: 10px;
    }
    #container #close{
    display:none;
    font-size:8px;
    color:#aaa;
    margin-right:5px;
    cursor:pointer;
    }
    #container.closable #close{
    display:inline-block;

    }
    #container{
    display:inline-block;
    }
  </style>
  <div id='container'>
    <label id='tag'></label>
    <div id='close'>X</div>
  </div>
</template>
```

```
import styleUtils from "../../utils/styleUtils";
import xmlUtils from "../../utils/xmlUtils";

const createTemplate = () => {
  const fileString = xmlUtils.loadFileString(require("./the-tag.xml"));
  console.log("fileString", fileString);
  const htmlDocObj = xmlUtils.loadHtmDoc(fileString);
  console.log("htmlDocObj", htmlDocObj);
  const templateNode = htmlDocObj.querySelector("#the-tag");
  console.log("tag组件templateNode ", templateNode);
  return { templateNode };
};

class theTag extends HTMLElement {
  constructor() {
    super();
    const { templateNode } = createTemplate();
    const template = templateNode;
    // 仅用文本形式展示
    this.$shadowRoot = this.attachShadow({ mode: "closed" });
    this.$shadowRoot.appendChild(template.content.cloneNode(true));
    this.$tag = this.$shadowRoot.querySelector("#tag");
    this.$container = this.$shadowRoot.querySelector("#container");
    this.$close = this.$shadowRoot.querySelector("#close");
  }
  assertNotDisposed(d) {
    // console.log(d);
  }

  static get observedAttributes() {
    return [
      "text", // 内容
      "closable", // 是否可删除
      "color" // 颜色
      // "onClose", // 点击删除的回调
    ];
  }
  // 当自定义元素第一次被连接到文档 DOM 时调用（类似组件 Mounted）；
  connectedCallback() {
    if (!this.closable) {
      return;
    }
    console.log("the-tag");
    this.$close.addEventListener("click", (e) => {
      // console.log(e.composed)
      // console.log(e.composedPath())
      console.log("webConponent内部触发click事件");
      const closeEvent = new CustomEvent("close", {
        // bubbles: true,
        // composed: true,
        // cancelable: true,
        detail: e.target.value // 传参
      });
      this.$close.dispatchEvent(closeEvent);
      // this.addEventListener('on-close', () => { console.log('on-close') })
    });
    this.$close.parentNode.addEventListener("close", (e) => {
      console.log("我监听到了我儿子的发送的事件了", e);
    });
  }

  render() {
    // console.log("this", this.text, this.closable, this.color, this.onClose, this.onclick);
    if (this.closable) {
      if (!styleUtils.existClass(this.$container, "closable")) {
        styleUtils.addClass(this.$container, "closable");
        console.log(this.$container);
      }
    }
    if (this.color) {
      this.$container.style.border = `1px solid ${this.color}`;
      this.$container.style.color = `${this.color}`;
    }
    if (this.$tag) this.$tag.innerHTML = this.text;
  }

  // 当自定义元素的一个属性被增加、移除或更改时被调用，需要配合静态方法 observedAttributes 来使用，设置只有注册在 observedAttributes 中的属性才被监听；
  attributeChangedCallback(name, oldVal, newVal) {
    console.log("attributeChangedCallback", name, oldVal, newVal);
    this[name] = newVal;
    this.render();
  }
  // 当自定元素与文档 DOM 断开连接时调用（类似 Unmount）；
  disconnectedCallback() {}
  // 当自定义元素被移动到新文档时被调用；
  adoptedCallback() {}

  clickToRemove() {
    // 从DOM中移除自身
    // this.parentNode.removeChild(this);
  }
}

customElements.define("the-tag", theTag);

function testXml() {
  function loadHtmDoc(str) {
    const parser = new DOMParser();
      return parser.parseFromString(str, "text/xml");
      }
      function loadFileString(dname) {
      let xhttp;
      if (window.XMLHttpRequest) {
      xhttp = new XMLHttpRequest();
      } else {
      xhttp = new window.ActiveXObject("Microsoft.XMLHTTP");
      }
      xhttp.open("GET", dname, false);
      xhttp.send();
      return xhttp.responseText;
      }

      const fileString = loadFileString(require("./the-tag.xml"));
      console.log("--testXml fileString", fileString);
      const htmlDocObj = loadHtmDoc(fileString);
      console.log("--testXml htmlDocObj", htmlDocObj);
      const templateNode = htmlDocObj.querySelector("#the-tag");
      console.log("--testXml tag组件templateNode ", templateNode);
      }
      testXml();
```

```
import { useEffect, useState } from "react";
function App() {
  const [tagList, setTagList] = useState([
    { text: "我是tag1", color: "red" },
    { text: "我是tag2", color: "green", closable: true },
    { text: "我是tag3", color: "#f80", closable: true }
  ]);

  const [inputValue, setInputValue] = useState("init");

  // function onClose(e, index) {
  //   console.log("onClose111", index, e);
  //   setTagList(tagList.filter((item, idx) => index !== idx));
  // }
  return (
    <div className="">
      {tagList.map(({ text, color, closable }, index) => (
        <>
          <the-tag
            text={text}
            color={color}
            closable={closable}
            app="app11"
            // onClick={(e) => onClose(e, index)}
            // onClose={() => {
            //   console.log("onClose222", index);
            // }}
          />
        </>
      ))}
    </div>
  );
}

export default App;
```

## 5. 各大浏览器的支持性 <a href="#ft2wi" id="ft2wi"></a>

[https://www.webcomponents.org/](https://www.webcomponents.org/)

<figure><img src="../.gitbook/assets/image (43).png" alt=""><figcaption></figcaption></figure>

例外情况是Internet Explorer 11和Safari。2021 8月17日，微软停止支持IE11，同时，可以使用polyfill尽可能模拟缺少的浏览器功能。不幸的是，Safari也落后了，不支持Web组件，苹果也不打算在未来完全支持它。Polyfills也必须用于此浏览器。

## 参考资料 <a href="#zdy21" id="zdy21"></a>

[https://developer.mozilla.org/en-US/docs/Web/Web\_Components](https://developer.mozilla.org/en-US/docs/Web/Web\_Components)[https://developer.mozilla.org/zh-CN/docs/Web/Web\_Components/Using\_shadow\_DOM](https://developer.mozilla.org/zh-CN/docs/Web/Web\_Components/Using\_shadow\_DOM)[https://zh.javascript.info/shadow-dom-events](https://zh.javascript.info/shadow-dom-events)[https://developer.mozilla.org/en-US/docs/Web/Web\_Components/Using\_shadow\_DOM](https://developer.mozilla.org/en-US/docs/Web/Web\_Components/Using\_shadow\_DOM)[https://cloud.tencent.com/developer/article/1524601](https://cloud.tencent.com/developer/article/1524601)[https://pm.dartus.fr/blog/a-complete-guide-on-shadow-dom-and-event-propagation/](https://pm.dartus.fr/blog/a-complete-guide-on-shadow-dom-and-event-propagation/)[https://developer.mozilla.org/en-US/docs/Web/API/DOMParser](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser)[https://nhswd.com/blog/web-components-101-why-use-web-components/](https://nhswd.com/blog/web-components-101-why-use-web-components/)[https://chromestatus.com/metrics/feature/timeline/popularity/1689](https://chromestatus.com/metrics/feature/timeline/popularity/1689)[https://www.51cto.com/article/702559.html](https://www.51cto.com/article/702559.html)

## 我的案例 <a href="#h5f72" id="h5f72"></a>

[https://codesandbox.io/s/webcomponentan-li-3ide40?file=/src/webcomponents/the-button/the-button.js:120-130](https://codesandbox.io/s/webcomponentan-li-3ide40?file=/src/webcomponents/the-button/the-button.js:120-130)
