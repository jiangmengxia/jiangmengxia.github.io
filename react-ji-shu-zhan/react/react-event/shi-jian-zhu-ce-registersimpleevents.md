# 事件注册 - registerSimpleEvents

入口函数是<mark style="color:red;">registerSimpleEvents</mark>。

该函数的目的是读取系统中所有支持的原生事件（如click、dblclick），最终将这些事件转化为React的事件，并将两者的映射关系，保存在一个对象(<mark style="color:red;">topLevelEventsToreactNames</mark>)中。

**具体实现**：

```javascript
/*
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-09-19 10:26:17
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-09-20 13:43:08
 * @FilePath: \jiangmengxia.github.io\react\demos\react-event\regist-events.js
 * @Description: 注册原生事件，并且将原生事件与合成事件名称映射关系保存起来。
 *               这里更像是初始化两个对象，allNativeEvents和topLevelEventsToreactNames
 */

// 注册的原生事件，最终保存所有支持的原生事件的名称
const allNativeEvents = new Set();

// 常量，定义所有离散事件成对(将原生事件 - react合成事件映射关系保存此处，如click-onClick)
const discretEventPairsForSimpleEventPlugin = [
  "click",
  "click", // 单击
  "dblclick",
  "dblclick", // 双击
  "mousedown",
  "mousedown", // 按下
  "mouseup",
  "mouseup", // 松开
  "mousemove",
  "mousemove", // 移动
  "mouseover",
  "mouseover", // 移入
  "mouseout",
  "mouseout", // 移出
];

// 顶级事件映射react名称
const topLevelEventsToreactNames = new Map();

// 将原生事件名和react合成事件名称的映射关系完整保存在Map中
function registerSimpleEvents() {
  for (let i = 0; i < discretEventPairsForSimpleEventPlugin.length; i += 2) {
    let topEvent = discretEventPairsForSimpleEventPlugin[i];
    const event = discretEventPairsForSimpleEventPlugin[i + 1];
    const capitalizedEvent = event[0].toUpperCase() + event.slice(1);
    // click->Click, doubleClick=>DoubleClick
    const reactName = "on" + capitalizedEvent;
    topLevelEventsToreactNames.set(topEvent, reactName);
    // 注册两个阶段事件
    registerTwoPhaseEvent(reactName, [topEvent]);
  }
  console.log(`事件注册成功`);
  console.log(
    "所有支持的原生事件",
    "allNativeEvents", // 所有的原生事件
    allNativeEvents
  );
  console.log(
    "原生事件名称与合成事件名称的映射关系",
    "topLevelEventsToreactNames",
    topLevelEventsToreactNames
  );
}

/**
 * input keydown change  => change 多个事件合成为一个事件
 * 注册两个阶段事件
 *
 * @param registrationName  注册的react事件名称
 * @param dependencies 最终映射到react事件的原生事件名称
 * */
function registerTwoPhaseEvent(registrationName, dependencies) {
  registerDirectEvents(registrationName, dependencies);
  registerDirectEvents(registrationName + "Capture", dependencies);
}

function registerDirectEvents(registrationName, dependencies) {
  for (let i = 0; i < dependencies.length; i++) {
    allNativeEvents.add(dependencies[i]);
  }
}

// 将原生事件的捕获阶段、冒泡阶段的
registerSimpleEvents();

```
