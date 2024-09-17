# redux-actions

<mark style="background-color:purple;">redux流程中大量样板代码读写非常痛苦，redux-actions可以简化Action和Reducer的处理。</mark>

`redux-actions` 是一个用于简化 Redux action 创建的库。在 Redux 中，action 是一个普通的对象，它包含了 action 的类型和 payload。然而，有时候我们需要创建多个 action，这些 action 的类型和 payload 可能是相同的。这时，我们可以使用 `redux-actions` 库，将多个 action 定义为一个函数，而不是多个对象。



创建action

{% code title="couter.action.js" %}
```javascript
import {createAction} from 'redux-actions'

// 使用createAction创建action
export const incrementAction = createAction('increment')
export const decrementAction = createAction('decrement')
```
{% endcode %}

创建reducer

```javascript
import {handleAction as createReducer} from 'redux-actions'
import {incrementAction,decrementAction} from './counter.action.js'

const initState = {count:0}
// 使用createReducer创建reducer，等同于自己创建的reducer函数（swich分别处理)。
const counterReducer = createReducer({
    [incrementAction]:(state, action)=> ({count:state.count + action.payload}),
    [decrementAction]:(state, action)=> ({count:state.count - action.payload})
}，initState)


```
