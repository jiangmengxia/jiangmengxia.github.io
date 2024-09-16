# Presentational（展示组件）

## 1. Presentational（展示组件） <a href="#inbz6" id="inbz6"></a>

纯展示的组件，纯函数，展示内容只跟props有关。

```
const GreetingCard = (props) => {
  return (
    <div>
      <h1>Hello! {props.name}</h1>
    </div>
  )
}
```
