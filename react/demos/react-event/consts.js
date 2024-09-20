const randomKey = Math.random().toString(36).slice(2);
const internalPropsKey = "__reactProps$" + randomKey;
const internalInstanceKey = "__reactFiber$" + randomKey;
const HostComponent = "5"; // react定义的组件类型， HostComponent表示原生组件，值等于5
const HostRoot = "3"; // react定义的组件类型， HostRoot表示根节点，值等于3
