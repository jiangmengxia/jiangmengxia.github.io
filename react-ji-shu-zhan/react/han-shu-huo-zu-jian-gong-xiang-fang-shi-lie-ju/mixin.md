# mixin

mixin的优点：分享代码

mixin分享代码的弊端：

* 使用mixin的时候，无法知道state来源和干了什么，不便于本代码的维护，可读性差
* 如果多个mixin都控制了同一个state，引起状态管理冲突/命名冲突（crashing）
* mixin的命名冲突

```
const MouseMixin = {
    getInitialState() {
        return { x: 0, y: 0 }
    },
    handleMouseMove(e) {
        this.setState({
            x: e.clientX,
            y: e.clientY
        })
    }
}

const BadMixin={//两个mixin都控制同一个state
  getInitialState() {
        return { x: 'sss' }
    },
}

const MouseCatcher = createReactClass({
    mixins: [MouseMixin,BadMixin],
    render() {
        const { x, y } = this.state
        return <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
            the mouse position is ({x},{y})
        </div>
    }
})

export default MouseCatcher
```

## &#x20;<a href="#wgxxx" id="wgxxx"></a>
