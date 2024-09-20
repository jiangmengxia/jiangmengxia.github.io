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
