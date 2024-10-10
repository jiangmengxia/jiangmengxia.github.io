# HOC （高阶组件）

## HOC （高阶组件） <a href="#wgxxx" id="wgxxx"></a>

优点：

* 高阶组件共享了组件的行为，分离了行为/数据和UI

问题：

* 容易遗漏原始props
* 命名空间冲突，多个HOC包裹时，内层的高阶组件有可能会覆盖外层高阶组件的props，从而导致外层高阶组件部分功能或全部功能失效
* 高阶组件使用时，被多层包裹，层级过深，很难知道props来自于哪里，不方便维护

```
const withMouse = (WrappedComponent) => {
    return class extends React.Component {
        state = { x: 0, y: 0 }

        handleMouseMove(e) {
            this.setState({
                x: e.clientX,
                y: e.clientY
            })
        }

        render() {
            return <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove.bind(this)}>
                <WrappedComponent {...this.props} mouse={this.state} />
            </div>
        }
    }
}

const MouseCatcher = withMouse(createReactClass({
    // 纯展示组件，将展示组件和容器组件（提供数据）分离
    render() {
        const { mouse } = this.props
        return <div>
            the mouse position is ({mouse.x},{mouse.y})
        </div>
    }
}))
```

## &#x20;<a href="#byahu" id="byahu"></a>
