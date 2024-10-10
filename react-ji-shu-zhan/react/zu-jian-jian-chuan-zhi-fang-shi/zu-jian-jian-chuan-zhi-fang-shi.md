# 组件间传值方式

## 1. 【props】适用于父子组件的 <a href="#bq3co" id="bq3co"></a>

父组件通过props传值给子组件，当props的值发生变更时，

## 2. 【context】适用于组件树 <a href="#rawrw" id="rawrw"></a>

Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，在组件树最外层包裹一个context，这样整个组件树内的组件都可以共享context的数据。

```
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');
class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}
//这是Toolbar组件中的主题按钮
class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

Context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据。存在以下缺陷：

* 请谨慎使用，这会使得组件的复用性变差
* context相当于全局变量， 难以追溯数据源
* 耦合度高，即不利于组件复用也不利于测试；（整棵组件树具有数据相关性）
* 当 props 改变或者 setState 被调用，生成新的 context，但是 shouldComponentUpdate 返回的 false 会 block 住 context，导致没有更新。

## 3. 组件组合，适用于多层级 <a href="#rm2kk" id="rm2kk"></a>

* 将组件当做props传递，可以减少组件的props的传递
* slots方式，props合力拆分
* props传递render方法，定制化render

【参考文献】

1. react context的优缺点 [https://github.com/careteenL/react/issues/5](https://github.com/careteenL/react/issues/5)
2. react官网对context和组件组合的描述 [https://zh-hans.reactjs.org/docs/context.html](https://zh-hans.reactjs.org/docs/context.html)
3. 类似slots方式 [https://zh-hans.reactjs.org/docs/composition-vs-inheritance.html#containment](https://zh-hans.reactjs.org/docs/composition-vs-inheritance.html#containment)
4. 消费多个context [https://zh-hans.reactjs.org/docs/context.html#consuming-multiple-contexts](https://zh-hans.reactjs.org/docs/context.html#consuming-multiple-contexts)
