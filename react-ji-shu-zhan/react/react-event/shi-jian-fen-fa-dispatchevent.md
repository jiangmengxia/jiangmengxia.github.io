# 事件分发-dispatchEvent

事件分发`dispatchEvent`，是根节点注册事件的实际回调方法，它可以很灵活地实现自定义事件。

在这个方法里面，具体干了以下几个事情：

* 当某个事件触发后，找到受该事件影响的DOM的FIber，并拿到左右注册该事件的listener，仿照事件冒泡&捕获，依次执行listener
* 将原生事件优化为合成事件，并作为以上listener的入参

**具体实现**：

```javascript
let isBatchingEventUpdates = false;
function dispatchEvent(nativeEventName, capture, targetContainer, nativeEvent) {
  const target = nativeEvent.target || nativeEvent.srcElement || window; // 获取事件源
  if (!target) {
    return;
  }
  // 获取事件源对应的fiber节点
  const fiber = target[internalInstanceKey];
  if (isBatchingEventUpdates) {
    return;
  }
  // 批量执行事件
  isBatchingEventUpdates = true;
  // 分发事件（根据冒泡、捕获顺序收集事件派发器，然后执行）
  dispatchEventForPluginEventSystem(
    nativeEventName,
    capture,
    nativeEvent,
    fiber,
    targetContainer
  );
  isBatchingEventUpdates = false;
}

function dispatchEventForPluginEventSystem(
  nativeEventName, // 原生事件名称，比如click
  capture, // 是否捕获阶段
  nativeEvent, // 原生事件对象
  targetIns, // fiber
  targetContainer // #root
) {
  const reactName = topLevelEventsToreactNames.get(nativeEventName); // 转换成react事件名称，比如onClick
  // 对于mouseEnter、mouseLeave事件，需要收集多个事件派发器
  const dispatchQueue = [];

  extractEvents({
    domEventName: nativeEventName,
    dispatchQueue,
    reactName,
    reactEventName: `${reactName}${capture ? "Capture" : ""}`,
    nativeEvent,
    nativeEventTarget: targetIns.stateNode,
    inCapturePhase: capture,
  });

  // dispatchQueue的顺序是从子->父的顺序，捕获顺序是从父->子的顺序,冒泡的顺序是从子->父的顺序
  if (dispatchQueue.length > 0) {
    // console.log(dispatchQueue); // 打印事件派发器
    processDispatchQueue(dispatchQueue, capture);
  }
}

// 依次执行事件派发器
function processDispatchQueue(dispatchQueue, isCapture) {
  function processListenerItem(listenerItem, event) {
    const { instance, listener, currentTarget } = listenerItem;
    if (event.isDefaultPrevented()) {
      return; // 阻止捕获了
    }
    event.currentTarget = currentTarget;
    listener.call(instance, event);
    event.currentTarget = null;
  }
  function processQueueItem(dispatchQueueItem) {
    const { event, listeners } = dispatchQueueItem;
    while (listeners.length > 0) {
      processListenerItem(
        isCapture ? listeners.pop() : listeners.shift(),
        event
      );
    }
  }
  while (dispatchQueue.length > 0) {
    processQueueItem(dispatchQueue.shift());
  }
}

// 获取合成后的事件,并且根据捕获、冒泡阶段不同，返回不同执行顺序的listeners
function extractEvents({
  domEventName,
  dispatchQueue,
  reactName,
  reactEventName,
  nativeEvent,
  nativeEventTarget,
}) {
  let SyntheticEventCtor;
  switch (domEventName) {
    case "click":
      // 不同事件的合成事件对象是不一样的
      SyntheticEventCtor = SyntheticMouseEvent;
      break;
    default:
  }
  const targetIns = nativeEventTarget[internalInstanceKey];
  const listeners = accumulateSinglePhaseListeners(
    targetIns, // fiber
    reactEventName // react事件名称 onCl    ick, onClickCapture
  );
  if (listeners.length > 0) {
    const event = new SyntheticEventCtor(
      reactName, // react名称
      reactEventName,
      targetIns,
      nativeEvent,
      nativeEventTarget
    );
    dispatchQueue.push({
      event,
      listeners,
    });
  }
}

/**
 * @description 根据冒泡的顺序收集子节点及其祖先节点的派发器
 * @param {*} targetFiber
 * @param {*} reactName
 * @param {*} nativeType
 * @param {*} inCapturePhase
 * @returns
 */
function accumulateSinglePhaseListeners(targetFiber, reactEventName) {
  const listeners = [];
  let instance = targetFiber;
  let lastHostComponent = null;
  // 从子节点到跟节点
  while (instance) {
    const { stateNode, tag } = instance;
    if (tag === HostComponent && stateNode !== null) {
      lastHostComponent = stateNode; // 当前节点
      // 原生DOM上挂事件,从fiber上找到注册的listener,也就是对应的onClick、onClickCapture事件
      const listener = stateNode[internalPropsKey][reactEventName];
      if (listener) {
        listeners.push({
          instance,
          listener,
          currentTarget: lastHostComponent, // 事件的currentTarget，当处理到当前节点时，currentTarget会设置为当前节点
        });
      }
    }
    instance = instance.return; // 找到实例的父亲
  }
  return listeners;
}

```
