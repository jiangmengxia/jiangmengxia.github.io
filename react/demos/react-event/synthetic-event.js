/*
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-03-05 09:25:15
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-09-19 18:03:11
 * @FilePath: \jiangmengxia.github.io\react\demos\react-event\synthetic-event.js
 * @Description: 定义基础合成事件
 */

function functionThatReturnsTrue() {
  return true;
}
function functionThatReturnsFalse() {
  return false;
}
function createSyntheticEvent(Interface) {
  function SyntheticBaseEvent(
    reactName, // react名称
    reactEventType,
    targetInst, // Fiber
    nativeEvent,
    nativeEventTarget
  ) {
    this._reactName = reactName;
    this._targetInst = targetInst; // react fiber实例
    this.type = reactEventType; // onClick, onClickCapture
    this.nativeEvent = nativeEvent;
    this.target = nativeEventTarget;
    this.currentTarget = null; // 当前事件源

    for (const propName in Interface) {
      if (!Interface.hasOwnProperty) {
        continue;
      }
      const normalize = Interface[propName];
      if (normalize) {
        this[propName] = normalize(nativeEvent); // timeStamp设置，弱原生事件种有这个属性，直接复用，否则重新生成时间戳
      } else {
        this[propName] = nativeEvent[propName]; //  原生属性eventPhase、bubbles、cancelable、defaultPrevented、isTrusted设置
      }
    }
    const defaultPrevented =
      nativeEvent.defaultPrevented != null
        ? nativeEvent.defaultPrevented
        : nativeEvent.returnValue === false;
    if (defaultPrevented) {
      this.isDefaultPrevented = functionThatReturnsTrue; // 阻止默认捕获
    } else {
      this.isDefaultPrevented = functionThatReturnsFalse; // 不阻止默认捕获
    }

    this.isPropagationStopped = functionThatReturnsFalse;
    return this;
  }

  // 做了pollyfill（兼容）
  Object.assign(SyntheticBaseEvent.prototype, {
    // 兼容处理的阻止捕获
    preventDefault() {
      this.defaultPrevented = true;
      const event = this.nativeEvent;
      if (!event) {
        return;
      }
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        // IE
        event.returnValue = false; // 阻止默认事件
      }
      /**
       * processDispatchQueueItemsInOrder中用于阻止捕获
       * dispatcherItem = {event, listners}
       * 当执行了其中一个lisener的时候，设置isDefaultPrevented为functionThatReturnsTrue
       * 则下一个lisener不用执行了。
       */
      this.isDefaultPrevented = functionThatReturnsTrue;
    },
    // 兼容处理的阻止冒泡
    stopPropagation() {
      const event = this.nativeEvent;
      if (!event) {
        return;
      }
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        // IE
        event.cancelBubble = true;
      }
      this.isPropagationStopped = functionThatReturnsTrue;
    },
  });

  return SyntheticBaseEvent;
}

// 鼠标事件接口
const MouseEventInterface = {
  clientX: 0,
  clientY: 0,
  timerStamp: (e) => e.timerStamp || Date.now(),
};

const SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface);
const SyntheticEvent = createSyntheticEvent({});
