# 虚拟DOM

基于5W（what、why、who、when、where）

**Snabbdom**是一个实现虚拟DOM的库，vue2.0开始使用了这个库

## 1.概述（what） <a href="#u5oah" id="u5oah"></a>

虚拟DOM是一种并不是真实渲染的DOM，是一种DOM的抽象技术，通过虚拟DOM可以抽象出比真实DOM有更多属性的DOM，有几个比较直观的作用：

* 抽象出的虚拟DOM，可以按属性渲染成真实DOM
* 可以控制将部分虚拟DOM渲染成真实DOM
* 可以控制渲染乘真实DOM的时机

## 2.为什么引入虚拟DOM（why） <a href="#cgvku" id="cgvku"></a>

虚拟DOM引入是为了解决浏览器频繁操作DOM引起性能问题。具体说明：

比如在没有引入虚拟DOM的时候，通过原生接口或者Jquery的接口，去操作，经常会引起页面的回流（牵一发动全身），一动就更新，频繁地渲染，从这个路径看，DOM频繁更新性能低。为了减少DOM频繁更新，因此引入虚拟DOM技术，想要做到

* 控制变更内容，计算出最小变更，然后按最小变更去绘制（真实DOM）
* 控制渲染频率，几次变更合并成一次变更去更新，虚拟DOM不用每次操作之后立即执行真实DOM渲染，而可以将多次的变更积累之后用patch的方式，一次性更新。

补充知识点：回流和重绘

* 回流：一个div的位置/大小等变更，会影响到其他div的重新绘制，会牵一发动全身，所以性能损耗大
* 重绘：只更改某个框的背景、字体、边框样式等，不会影响到其他div的位置，因此不会影响到其他div的重新绘制

## 3.哪些技术采用虚拟DOM技术（who） <a href="#bd62j" id="bd62j"></a>

常见的react、vue都在使用。

## 4.怎么实现虚拟DOM技术（how） <a href="#mskoh" id="mskoh"></a>

### 4.1 react如何虚拟DOM <a href="#mrnah" id="mrnah"></a>

#### 4.1.1 构建虚拟DOM <a href="#zrvkr" id="zrvkr"></a>

将一个真实的DOM用js对象描述出来，就是一个react Element对象。

通过createElement创建，返回的就是一个React Element，它可以描述一个真实DOM，就是传说中的虚拟DOM，主要描述DOM的几个属性：

* props（属性）:含有children属性，样式属性和其他属性。
* type（类型）
* key（用于减少更新频率）
* ref（对应真实DOM的哪个节点）
* \_owner(创建该元素的component)
* 其他

构建虚拟DOM的函数

* createElement：入参分别是
*
  * 第一个参数可以是（1）字符串类型，代表的是标签元素, 如div, span，（2）组件，classComponent或者是functional Component,（3）symbol，原生提供的Fragment,AsyncMode等, 会被特殊处理
  * 第二个参数是一个对象类型, 代表标签的属性, id, class
  * 其余的参数代表的是children,不涉及grand-children,当子节点中有孙节点的时候, 再递归使用React.createElement方法
* ReactElement:根据入参，返回一个对象，也就是react element,这个react Element就是传说中的虚拟节点，可以直接根据这个渲染出一个真实DOM（树状结构）

**【入参是字符串类型——构建虚拟DOM】**

```
//这是创建单个虚拟节点
const element = React.createElement(
  'div', 
  {id: 'login-btn'},
  'Login'
)

//这是上面的元素创建函数返回的一个react element,就是一个标识组件的对象
{
  type: 'div',
  props: {
    children: 'Login',
    id: 'login-btn'
  }
}
```

**【入参是组件——构建虚拟DOM元素】**

```
//createElement入参是User组件(component)或函数(也就是一个构建组件的方法，相当于组件)
const element = React.createElement(
  User,
  {name: 'Tyler McGinnis'},
  null
)
//User组件定义如下,包含子元素P,子组件Button
function User({ name, addFriend }) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "p",
      null,
      name
    ),
    React.createElement(Button, { addFriend })
  )
}
//User下的子组件Button组件的定义
function Button ({ addFriend }) {
  return React.createElement(
    "button",
    { onClick: addFriend },
    "Add Friend"
  )
}
//最终生成的react Element： Button
function Button ({ addFriend }) {
  return {
    type: 'button',
    props: {
      onClick: addFriend,
      children: 'Add Friend'
    }
  }
}
//最终生成的react Element： User
function User ({ name, addFriend }) {
  return {
    type: 'div',
    props: {
      children: [
        {
          type: 'p',
          props: {
            children: name
          }
        },
        {
          type: Button,
          props: {
            addFriend
          }
        }
      ]
    }
  }
}
```

#### 4.1.2 组件化思维（component） <a href="#v3czy" id="v3czy"></a>

函数组件/Component组件，该函数是一个有效的 React 组件，因为它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素(等效于react element)。

对于Component组件实例，需要维护自己内部状态；有几个重要组成部分：

* 视图（VIew）：Render方法返回的React元素，可以看做一个虚拟DOM，通过JSX使用AST技术转化成createElement方法，最终就是一个react Element
* 数据（data）：state，维护所有子组件或虚拟dom的数据
* 函数（controller）：控制数据的变化，可分为
*
  * 生命周期钩子：各个生命周期上要执行的操作
  * render函数，包含diff算法
  * 其他函数，也就是被生命周期或render函数调用的函数

### 4.2 DIFF算法 <a href="#sb1wc" id="sb1wc"></a>

【snabbdom的diff算法参考】

[https://gitee.com/nainaidexiong/kbs/blob/master/docs/Snabbdom/Snabbdom%E8%AE%B2%E8%A7%A3diff%E7%AE%97%E6%B3%95.md](https://gitee.com/nainaidexiong/kbs/blob/master/docs/Snabbdom/Snabbdom%E8%AE%B2%E8%A7%A3diff%E7%AE%97%E6%B3%95.md)

传统 diff 算法的复杂度为 O(n^3)，显然这是无法满足性能要求的。React 通过制定大胆的策略，将 O(n^3) 复杂度的问题转换成 O(n) 复杂度的问题。前提假设以下几点：

* 只能同层节点比较
* 同一个节点判定：
*
  * 节点类型相同
  * 节点选择器相同
  * 节点key相同
* key的作用
*
  * 是判断是否同一节点的条件之一
  * 节点复用

【用index作为key的问题】

[https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318](https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318)

【Input（Key为index）列表在受控和非受控下的问题】

* 非受控下的input输入内容变化，UI不更新
* 如果我们要渲染的内容是完全受数据所控制的（受控组件），那用索引做 **key** 也是没问题的；但如果做不到这一点，就会出现我们意想不到的结果；

[https://juejin.cn/post/6990159289251790885](https://juejin.cn/post/6990159289251790885)

### 4.3 render函数 <a href="#frals" id="frals"></a>

## 参考 <a href="#drvpa" id="drvpa"></a>

1.[react elements和component elements的关系](https://ui.dev/react-elements-vs-react-components/)
