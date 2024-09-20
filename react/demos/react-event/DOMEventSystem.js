// 不需要监听冒泡的原生事件
const nonDelegtedEvents = new Set(["scroll"]);
// const randomKey = Math.random().toString(36).slice(2); // 定义在const中
const interalEventHandlerKey = "__reactEvents$" + randomKey;

// 监听所有原生事件
function listenToAllSupportedEvents(container) {
  // 1. 注册事件
  // 事件插件注册完了之后，会再次进行循环绑定事件处理函数到容器container上面
  allNativeEvents.forEach((nativeEventName) => {
    // 绑定事件
    if (!nonDelegtedEvents.has(nativeEventName)) {
      listenToNativeEvent(nativeEventName, false, container); // 监听冒泡
    }
    listenToNativeEvent(nativeEventName, true, container); // 监听捕获
  });
  // 2. 事件触发  target.addEventListener事件监听
  // 3. 事件合成  事件派发中实现事件合成，兼容不同浏览器
  // 4. 事件派发  listener = dispatchEvent.bind（....）中添加事件派发
}

function listenToNativeEvent(nativeEventName, capture, targetContainer) {
  const listenSet = getEventListenerSet(targetContainer);
  const listenerSetKey = getEventListenerSetKey(nativeEventName, capture);
  // 避免重复监听同一事件
  if (!listenSet.has(listenerSetKey)) {
    // 侦听器实现的是：事件合成，然后派发到对应的组件上？？？？？
    const listener = dispatchEvent.bind(
      null,
      nativeEventName,
      capture,
      targetContainer
    ); // 绑定事件处理函数
    if (capture) {
      targetContainer.addEventListener(nativeEventName, listener, true); // 捕获阶段注册事件侦听器listener
    } else {
      targetContainer.addEventListener(nativeEventName, listener, false); // 冒泡阶段注册事件侦听器listener
    }
    listenSet.add(listenerSetKey);
  }
}

function getEventListenerSet(node) {
  let elementListenerSet = node[interalEventHandlerKey];
  if (elementListenerSet === undefined) {
    elementListenerSet = node[interalEventHandlerKey] = new Set();
  }
  return elementListenerSet;
}

function getEventListenerSetKey(nativeEventName, isCapturePhaseListener) {
  return `${nativeEventName}__${isCapturePhaseListener ? "capture" : "bubble"}`;
}
