# container（容器组件模式）

“容器组件就是取数据，然后渲染子组件而已” —— Jason Bonta

容器组件是你的数据或逻辑层并利用 stateful（有状态的） API，使用生命周期事件，你可以连接 state 到\
redux 或者 Flux 的 storage 中，并将数据和回调作为 props 传递给子组件。

```
//容器组件，主要逻辑是处理数据，然后调用展示组件GreetingCard用于展示
class Greeting extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
  }

  componentDidMount() {
    // AJAX 获取用户名称，并赋值
    this.setState(() => {
      return {
        name: "William",
      };
    });
  }

  render() {
    return (
      <div>
       <GreetingCard name={this.state.name} />
      </div>
    );
  }
}
```

## &#x20;<a href="#zqmmk" id="zqmmk"></a>
