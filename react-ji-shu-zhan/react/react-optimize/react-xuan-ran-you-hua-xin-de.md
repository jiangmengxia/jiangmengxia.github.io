# react渲染优化心得

## 1. react渲染优化问题 <a href="#ylymb" id="ylymb"></a>

据个人理解，react影响性能的部分，主要在于reconciliation（diff算法）的计算过程，而不是浏览器的渲染过程。这与浏览器的刷新渲染机制有关。

### 1.1 浏览器刷新渲染机制 <a href="#vdeac" id="vdeac"></a>

现在市面上主流的屏幕刷新频率是60帧，也就是1s刷新60次，1000ms/60=16.6ms，表示16.6ms内需要浏览器刷新一次，才能肉眼感受不到卡顿。也就是说着16.6ms内，浏览器需要完成：

* 执行JS
* 样式布局
* 样式渲染

实际上，浏览器也有自己的工作要做，因此每帧中代码的运行时间需要控制在**10ms**以内。当你超过了这个预算，就会出现丢帧，动画会出现抖动。通常被称为 “jank”，也就是卡顿，严重影响用户的体验。

### 1.2 react渲染问题的必然性 <a href="#sxa0x" id="sxa0x"></a>

由于react是单项数据流，一旦父组件state有变更，会置顶向下的执行render方法，不论子组件的view是否受父组件的state或props的影响，默认都会重新执行render方法，从而引起reconciliation(简单的可以理解为 diff)，而reconciliation又是最为耗时的，造成不必要的重复计算，在计算量过大的情况下，会引起“jank”。也就是说只要使用react，这个问题就会存在。但是react也提供了可选的解决方案：

* 对于class组件，可以通过继承[**PureComponent**](https://zh-hans.reactjs.org/docs/react-api.html#reactpurecomponent)方式来减少重新render，解决由于父组件更新而引起子组件更新的情况，但也只支持浅层比较props。
* 对于函数式组件，每次父组件state变更，子组件会重新执行render，而每次 render都会重新从头开始执行函数调用，由此可见，受影响的组件数量会更多。通常采用[useMemo](https://zh-hans.reactjs.org/docs/hooks-reference.html#usememo)、[React.memo](https://zh-hans.reactjs.org/docs/react-api.html#reactmemo)、[useCallback](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecallback)等方法

## 2. render渲染优化方式 <a href="#iui54" id="iui54"></a>

### 2.1 class组件常见优化方法 <a href="#kjady" id="kjady"></a>

#### 2.1.1 shouldComponentUpdate <a href="#vf8ms" id="vf8ms"></a>

react组件会根据shouldComponentUpdate()这个方法，来决定是否执行该方法之后的生命周期，进而决定是否re-render。默认行为是 state 每次发生变化组件都会重新渲染。大部分情况下，你应该遵循默认行为。

当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用。返回值默认为 true;你也可以通过设置返回值为FALSE，终止后续的周期的执行。另外首次渲染或使用 forceUpdate() 时不会调用该方法。

此方法仅作为性能优化的方式而存在。不要企图依靠此方法来“阻止”渲染，因为这可能会产生 bug。你应该考虑使用内置的 [PureComponent](https://zh-hans.reactjs.org/docs/react-api.html#reactpurecomponent) 组件，而不是手动编写 shouldComponentUpdate()。PureComponent 会对 props 和 state 进行浅层比较，并减少了跳过必要更新的可能性。

#### 2.1.2 PureComponent组件 <a href="#lgkjd" id="lgkjd"></a>

React.PureComponent 与 [React.Component](https://zh-hans.reactjs.org/docs/react-api.html#reactcomponent) 很相似。两者的区别在于 [React.Component](https://zh-hans.reactjs.org/docs/react-api.html#reactcomponent) 并未实现（可手动实现）[shouldComponentUpdate()](https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate)，而 React.PureComponent 中以浅层对比 prop 和 state 的方式来实现了该函数。

也就是说，浅层对比前后两个prop和state，发现一旦有值变动，则进行re-render。

### 2.2 函数组件常见优化方法 <a href="#hdchc" id="hdchc"></a>

#### 2.2.1 React.Memo <a href="#pqxc1" id="pqxc1"></a>

[React.Memo](https://zh-hans.reactjs.org/docs/react-api.html#reactmemo)是一个高阶组件，它是一个函数式组件，而不是类组件。

如果你的组件在相同 props 的情况下渲染相同的结果（纯函数组件），那么你可以通过将其包装在 React.memo 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果，也就是说props不变更，不进行re-render。

React.Memo默认情况下，只对复杂对象做浅层比较，如果你想控制对比过程，请自定义比较函数，通过自定义第二个参数（比较方法isEqual）来实现。第二个参数也就是比较方法isEqual，它与pureComponent中shouldComponentUpdate方法相似，但是返回值与之相反，也就是返回true，不更新，返回false，更新。

```
function MyComponent(props){
  /*组件*/
}

function isEqual(prevProps,nextProps) {
  /*判断props是否有变化的方法
    如果把nextProps传入render方法的返回结果与
    将prevProps传入render方法返回结果一致，返回true，表示不更新
    否则返回false，表示更新
  */
}

export default React.memo(MyComponent,isEqual)
```

适用场景：

* 满足创建纯函数组件的需求

#### 2.2.2 useMemo <a href="#arnkn" id="arnkn"></a>

和React.memo相比，React.memo是针对整个组件的render的优化，useMemo是针对某个函数的优化，当然，这个函数也可以是函数式组件。useMemo主要作用是，减少某个函数(一般是计算量大的函数)的执行次数。

```
function computeExpensiveValue() {
  // 计算量很大的代码
  return xxx
}

const memoizedValue = useMemo(computeExpensiveValue, [a, b]);
```

上述代码中，memoizedValue的计算，仅在a,b中任意一个发生变化的时候，才会重新计算，这是对函数的缓存。

【使用场景】

* 缓存计算量比较大的函数结果，可以避免不必要的重复计算。
* 缓存复杂的函数组件，避免re-render

【小结】

另外注意的点：

（1）官网上提到如果**没有提供依赖项数组，useMemo在每次渲染时都会计算新的值**（像useEffect）。这是在这种形式下,也就参数没有。

```
const memoizedValue = useMemo(computeExpensiveValue);
```

（2）而**如果提供依赖项数组为空，useMemo只在数次渲染时会计算新的值**。这个与（1）要区分一下，关于（1），（2）两点这与useEffect有异曲同工之处。

```
const memoizedValue = useMemo(computeExpensiveValue,[]);
```

（3）计算量如果很小的计算函数，也可以选择不使用 useMemo，因为这点优化并不会作为性能瓶颈的要点，反而可能使用错误还会引起一些性能问题。

（4）useMemo实质上就是利用缓存的方式，空间换时间，因此如果计算量不大的，不建议使用。

#### 2.2.3 useCallback <a href="#t2r5l" id="t2r5l"></a>

useCallback把**内联回调函数**及**依赖项数组**作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用。另外：

* **useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。**

useMemo和useCallback都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；并且这两个hooks都返回缓存的值，**useMemo返回缓存的变量（值），useCallback返回缓存的函数**。

【使用场景】

首先，父子组件都是函数式组件。其中父组件包含子组件，子组件接收一个函数作为props；通常而言，如果父组件更新了，则通过props传递给子组件的函数也会更新，子组件也会执行更新；但是大多数场景下，更新是没有必要的。借助于useCallback可以来返回函数，然后把这个函数作为props传递给子组件；

由于这个函数可以降低了更新频率。参照下面的memoizedCallback，useCallback使得memoizedCallback函数只在a更新或b更新的情况下，才会更新，如果不用useCallback，则父组件每次更新必然会引起源方法doExpensiveThing的更新，从而引起子组件的频繁更新。

由此可见，正确使用useCallback，子组件就能避免不必要的更新或减少。

```
const memoizedCallback = useCallback(
  () => {
    doExpensiveThing(a, b); //非常复杂的工作
  },
  [a, b],
);

//父组件调用子组件,使用场景
function ParentComponent(){
		return <ChildComponent callback = {memoizedCallback}/>
}
```

### 2.2 其他优化技巧 <a href="#nomcw" id="nomcw"></a>

#### 2.2.1 避免使用内联对象 <a href="#rzeg2" id="rzeg2"></a>

父组件中引用子组件时，传递给子组件的值若为内联对象，则每次父组件re-render时，子组件中传入的内联对象都是一个新的对象（react仅进行浅层比较，总是返回false），因此子组件总是会re-render。

针对这种情况，有两种方案：

* 定义组件的时候，props内的属性尽量使用非引用类型对象，减少使用引用类型对象
* 常量可以定义在组件外部，这样引用不变

```
// 错误示范
function ParentComponent(props){
	const style = {margin:0} // 固定常量对象
  const aProp = { someProp: props.someValue } //可变对象
  return <ChildComponent style={style}  aProp={aProp}/>
}
  
//正确示范
 const style = {margin:0}
 function ParentComponent(props){
  const aProp = { someProp: props.someValue } //可变对象
  return <ChildComponent style={style} {...aProp}/>
}
```

#### 2.2.2 避免使用匿名函数 <a href="#cjdel" id="cjdel"></a>

我们知道，在父组件render函数中回调函数如果是匿名函数，每次父组件更新时，子组件的回调函数都是一个全新的函数，需要被重新创建，对于轻量的函数，并没有多少性能问题，但是如果对于比较复杂的函数，函数创建的成本会提高，因此也会产生性能问题。

【解决办法】

* 在函数组件中，采用useCallback这种memoization的策略，将函数保存起来，不需要经常创建和销毁同一功能函数
* 在类组件中，可以将匿名函数提取为与render并列的内部函数

```
// 错误示范
function ParentComponent(props){
  return <ChildComponent onCommit={()=>expensiveCompute(props.id)}/>
}

// 正确示范1
function ParentComponent(props){
  return <ChildComponent onCommit={useCallback(()=>expensiveCompute(props.id),[props.id])}/>
}

// 正确示范2
class ParentComponent extends React.Component{
  callbackFunc = ()=>expensiveCompute(this.props.id)
  render(){
  	return <ChildComponent onCommit={this.callbackFunc.bind(this)}/>
  }
}

```

## 3. 其他 <a href="#ftgvr" id="ftgvr"></a>

### 3.1 memoization <a href="#qgyyl" id="qgyyl"></a>

React.Memo和useMemo方案都是属于[memoization](https://juejin.cn/post/6844903826173100046)方案，memoization方案在《JavaScript模式》和《JavaScript设计模式》都有提到。

根据wiki介绍：

```
In computing, memoization or memoisation is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again. Memoization has also been used in other contexts (and for purposes other than speed gains), such as in simple mutually recursive descent parsing.[1] Although related to caching, memoization refers to a specific case of this optimization, distinguishing it from forms of caching such as buffering or page replacement. In the context of some logic programming languages, memoization is also known as tabling.[2]
```

memoization是一种将函数（一般是计算复杂的函数）执行结果用变量缓存起来的方法，待下一次输入同样的inputs时，可以复用历史的计算结果，通过这种缓存技术可以减少计算的次数。由此可见，memoization适用于纯函数（无副作用的函数）。

当函数进行计算之前，先看缓存对象中是否有这次计算结果，如果有，就直接从缓存对象中获取结果；如果没有，就进行计算，并将结果保存到缓存对象中。

memoization是一种空间换时间的方式，在使用过程中需要注意memoization缓存的内容的多少，过多的缓存会引起内存泄漏。

【参考文献】

* 浏览器的16ms渲染帧 [https://harttle.land/2017/08/15/browser-render-frame.html](https://harttle.land/2017/08/15/browser-render-frame.html)
* react渲染（render）优化问题[https://gitee.com/nainaidexiong/kbs/blob/master/docs/react/react%E6%B8%B2%E6%9F%93%E4%BC%98%E5%8C%96%E9%97%AE%E9%A2%98.md](https://gitee.com/nainaidexiong/kbs/blob/master/docs/react/react%E6%B8%B2%E6%9F%93%E4%BC%98%E5%8C%96%E9%97%AE%E9%A2%98.md)
* memoization [https://juejin.cn/post/6844903832254677006](https://juejin.cn/post/6844903832254677006)
* react的八种优化方式 [https://juejin.cn/post/6844903924302888973](https://juejin.cn/post/6844903924302888973)
