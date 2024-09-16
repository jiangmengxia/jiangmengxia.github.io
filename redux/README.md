---
cover: ../.gitbook/assets/截屏2024-09-15 10.30.33.png
coverY: 0
layout:
  cover:
    visible: true
    size: full
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# Redux

redux是javascript的状态容器，提供可<mark style="background-color:purple;">预测化</mark>的状态管理。

在这里，容器就是一个js的状态对象，如图

```
const state={
    // 新增弹窗的状态
    addModel:{
        open:false
    },
    // 首页列表的page属性存储
    pagination:{
        pageSize,
        paseNum,
        total
    }
}
```

当状态发生变化是，这个状态变得“<mark style="background-color:purple;">可预测</mark>”，可预测的好处是：当发生问题时，可以很容易的定位问题。





## 优势

<table data-view="cards"><thead><tr><th></th><th></th><th data-type="files"></th><th></th><th></th><th></th></tr></thead><tbody><tr><td><h3>可预测</h3></td><td><strong>行为稳定可预测</strong>、可运行在不同环境 （客户端、服务端和原生程序）、且 <strong>易于测试</strong> 的应用。</td><td></td><td></td><td></td><td></td></tr><tr><td><h3>集中管理</h3></td><td>应用状态集中管理，可开发出强大的功能，如 <strong>撤销/重做</strong>、 <strong>状态持久化</strong> 等等</td><td></td><td></td><td></td><td></td></tr><tr><td><h2>可调试</h2></td><td>Redux DevTools 让你轻松追踪到 <strong>应用的状态在何时、何处以及如何改变</strong>。Redux 的架构让你记下每一次改变，借助于 <strong>"时间旅行调试"</strong>，你甚至可以把完整的错误报告发送给服务器。</td><td></td><td></td><td></td><td></td></tr><tr><td><h3>灵活</h3></td><td>Redux <strong>可与任何 UI 层框架搭配使用</strong>，并且有 <strong>庞大的插件生态</strong> 来实现你的需求。</td><td></td><td></td><td></td><td></td></tr></tbody></table>





