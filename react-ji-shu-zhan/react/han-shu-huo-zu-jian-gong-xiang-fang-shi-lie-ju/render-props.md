# Render Props

## Render Props (渲染props或渲染回调) <a href="#byahu" id="byahu"></a>

两种情况都属于render Props:

* 组件上面render方法告诉要渲染的内容，形如

```
<Mouse render={mouse => (
   <Component {...this.props} mouse={mouse} />
)}/>
```

* 通过props children传递状态，children是一个render方法，形如

```
//形式1
<Mouse children={mouse => (
  <p>鼠标的位置是 {mouse.x}，{mouse.y}</p>
)}/>

//形式2
<Mouse>
  { mouse => (
      <p>鼠标的位置是 {mouse.x}，{mouse.y}</p>
    )  
  }
</Mouse>
```

解决了高阶组件存在的问题

* 命名冲突
* 不知道state来源于哪个组件
* props会被遗漏

存在问题：

* render中出现了方法，代码可读性差；可以将方法提取出来
* 不能在HOC中使用render Props，那样子原来HOC的问题又重新暴露了

```
//Props render方式
class Mouse extends React.Component {
    state = { x: 0, y: 0 }

    handleMouseMove(e) {
        this.setState({
            x: e.clientX,
            y: e.clientY
        })
    }

    render() {
        return <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove.bind(this)}>
            {this.props.children(this.state)}
            {/* 将state以props的方式传递给子组件,方式props render */}
        </div>
    }
}

class MouseCatcher extends React.Component {
    render() {
        return <Mouse>
            {
                (mouse) => (
                    <div>
                        the mouse position is ({mouse.x},{mouse.y}),
                        message is {this.props.message}
                    </div>
                )
            }
        </Mouse>
    }
}
```



参考文献】

1. render Props [https://zh-hans.reactjs.org/docs/render-props.html#use-render-props-for-cross-cutting-concerns](https://zh-hans.reactjs.org/docs/render-props.html#use-render-props-for-cross-cutting-concerns)
2. 永不使用高阶组件 [https://www.youtube.com/watch?v=BcVAq3YFiuc](https://www.youtube.com/watch?v=BcVAq3YFiuc)
