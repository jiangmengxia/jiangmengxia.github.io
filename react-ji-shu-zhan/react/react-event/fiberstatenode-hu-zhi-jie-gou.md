# Fiber-StateNode互指结构

StateNode就是原生DOM。

ReactDOM.render 遍历虚拟DOM、挂载的过程中，会将原生DOM和FIber互指。

Fiber本身就是一个对象，如下定义了一个简单的Fiber，其中

* Fiber.stateNode指向原生DOM，
* DOM也通过internalInstanceKey属性指向了Fiber，
* DOM通过internalPropsKey绑定了虚拟DOM的属性
* Fiber.return可以拿到父Fiber

```javascript
let fiber = {
    tag: HostComponent, // react定义的组件类型， HostComponent表示原生组件，值等于5
    type: element?.type, // 节点的类型
    stateNode: dom, // 真实DOM
    return: returnFiber, // 返回父fiber
  };
// dom上保存自身的fiber实例
dom[internalInstanceKey] = fiber;
// 保存虚拟DOM属性
dom[internalPropsKey] = element.props;
```

通过以上的Fiber和DOM互指的结构，好处是，在监听到原生事件的时：

* 可以拿到原生DOM，从而可以通过Fiber找到虚拟DOM上面的props（含绑定事件）
* 可以拿到原生DOM，从而拿到Fiber节点，从而可以拿到父Fiber和父DOM，这样就能确定冒泡、捕获的事件的执行顺序

```javascript
// 这里利用递归简单实现挂载
function render(element, container) {
  // 在根节点上监听所有事件
  listenToAllSupportedEvents(container);
  const rootFiber = {
    tag: HostRoot, // react定义的组件类型， HostComponent表示原生组件，值等于5
    return: null, // 返回父fiber
  };
  // rootFiber实例保存到container上
  container[internalInstanceKey] = rootFiber;
  mounted(element, container);
}

function mounted(element, container) {
  // 1. 创建DOM
  // 2. 设置属性
  // 3. 挂载到container上
  let dom;
  if (typeof element === "string") {
    // 文本节点
    dom = document.createTextNode(element);
  } else {
    dom = document.createElement(element.type);
  }

  /************ 2. 设置属性 **************/
  const returnFiber = container[internalInstanceKey];
  let fiber = {
    tag: HostComponent, // react定义的组件类型， HostComponent表示原生组件，值等于5
    type: element?.type, // 节点的类型
    stateNode: dom, // 真实DOM
    return: returnFiber, // 返回父fiber
  };
  // dom上保存自身的fiber实例
  dom[internalInstanceKey] = fiber;
  // 原装属性--直接赋值的
  const originProps = ["className", "id", "style"]; // 保存fiber属性
  if (element?.props) {
    originProps.forEach((key) => {
      if (element.props[key]) {
        dom[key] = element.props[key];
      }
    });
  }
  // 保存fiber属性
  dom[internalPropsKey] = element.props;
  if (element?.props?.children) {
    if (Array.isArray(element.props.children)) {
      element.props.children.forEach((child) => mounted(child, dom));
    } else {
      mounted(element.props.children, dom);
    }
  }
  /************ 3. 挂载到container上 **************/
  container.appendChild(dom);
}

ReactDOM = {
  render,
};

```
