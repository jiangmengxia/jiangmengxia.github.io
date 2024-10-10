# flux

简单说，Flux 是一种架构思想，专门解决软件的结构问题。它跟[MVC 架构](https://www.ruanyifeng.com/blog/2007/11/mvc.html)是同一类东西，但是更加[简单和清晰](http://www.infoq.com/news/2014/05/facebook-mvc-flux)。

## 架构

<figure><img src="../../.gitbook/assets/image.jpg" alt=""><figcaption></figcaption></figure>

首先，Flux将一个应用分成四个部分。

● View： 视图层

● Action（动作）：视图层发出的消息（比如mouseClick）

● Dispatcher（派发器）：用来接收Actions、执行回调函数（改变store）

● Store（数据层）：用来存放应用的状态，一旦发生变动，就提醒Views要更新页面

### Action

每个Action都是一个对象，包含一个actionType属性（说明动作的类型）和一些其他属性（用来传递数据）。

在这个Demo里面，ButtonActions对象用于存放所有的Action。

```
// actions/ButtonActions.js
var AppDispatcher = require('../dispatcher/AppDispatcher');

var ButtonActions = {
  addNewItem: function (text) {
    AppDispatcher.dispatch({
      actionType: 'ADD_NEW_ITEM',
      text: text
    });
  },
};

```

### dispatcher

Dispatcher 的作用是将 Action 派发到 Store。你可以把它看作一个路由器，负责在 View 和 Store 之间，建立 Action 的正确传递（分发）路线。注意，Dispatcher 只能有一个，而且是全局的。这个可以看作浏览器的postMessage事件监听处理机制，对与对应类型的action，回调正确handler。AppDispatcher.register就是注册Actions的回调事件

```
// dispatcher/AppDispatcher.js
var ListStore = require('../stores/ListStore');

AppDispatcher.register(function (action) {
  switch(action.actionType) {
    case 'ADD_NEW_ITEM':
      ListStore.addNewItemHandler(action.text);
      ListStore.emitChange();
      break;
    default:
      // no op
  }
})

```

### store

store管理着数据，下面的代码种也包含了修改数据的API，当然这部分可以单独提取出来，与store分离。

```
// stores/ListStore.js
var ListStore = {
  items: [],
  getAll: function() {
    return this.items;
  },
  addNewItemHandler: function (text) {
    this.items.push(text);
  },
  emitChange: function () {
    this.emit('change');
  }
  // 通过此方法注册state状态变更后的处理办法-刷新视图
  addChangeListener: function(callback) {
    this.on('change', callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
};
module.exports = ListStore;
```

### View

```

// components/MyButtonController.jsx
var React = require('react');
var ListStore = require('../stores/ListStore');
var ButtonActions = require('../actions/ButtonActions');
var MyButton = require('./MyButton');

var MyButtonController = React.createClass({
  getInitialState: function () {
    return {
      items: ListStore.getAll()
    };
  },

  componentDidMount: function() {
    ListStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ListStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({
      items: ListStore.getAll()
    });
  },

  createNewItem: function (event) {
    ButtonActions.addNewItem('new item');
  },

  render: function() {
    return <MyButton
      items={this.state.items}
      onClick={this.createNewItem}
    />;
  }
});
```

参考：

[https://www.ruanyifeng.com/blog/2016/01/flux.html](https://www.ruanyifeng.com/blog/2016/01/flux.html)

[https://juejin.cn/post/6844903806644256782?searchId=20240228141540F4C2825DB18AA160C953](https://juejin.cn/post/6844903806644256782?searchId=20240228141540F4C2825DB18AA160C953)
