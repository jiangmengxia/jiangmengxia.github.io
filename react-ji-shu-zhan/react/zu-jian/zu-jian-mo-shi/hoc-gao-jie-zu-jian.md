# HOC（高阶组件）

* 不同组件中抽象出相同的逻辑，可以将行为和UI分离
* 不要修改高阶组件入参组件（及组件原型）
* HOC 应该透传与自身无关的 props
* 不要在render中使用高阶方法。每次render会导致创建新的高阶组件并挂载，会将之前的组件状态全部丢失

缺点：

* 容易遗漏原始props
* 命名空间冲突，多个HOC包裹时，内层的高阶组件有可能会覆盖外层高阶组件的props，从而导致外层高阶组件部分功能或全部功能失效（WithMouse(WithCat(App))）

```
//返回一个全新的组件，传入新的props，不影响原始组件WrappedComponent及原始组件的props；
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentDidUpdate(prevProps) {//覆盖原始组件的同名方法，相当于重载
      console.log('Current props: ', this.props);
      console.log('Previous props: ', prevProps);
    }
    render() {
      // 过滤掉非此 HOC 额外的 props，且不要进行透传
      const { extraProp, ...passThroughProps } = this.props;

      // 将 props 注入到被包装的组件中。
      // 通常为 state 的值或者实例方法。
      const injectedProp = someStateOrInstanceMethod;

      // 将 props 传递给被包装组件
      return (
        <WrappedComponent
          injectedProp={injectedProp}
          {...passThroughProps}
        />
      );
    }
  }
}
```

## &#x20;<a href="#un3nk" id="un3nk"></a>
