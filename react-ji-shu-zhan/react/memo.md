# memo 方法

性能优化，如果本组件中数据没有发生变化，组织当前组件的更新（重新渲染），类似与类组件中的PureComponent和shouldComponentUpdate

## 使用方法

```js
import React, { memo } from 'react';

const MyComponent = memo(function MyComponent(props) {
  /* render using props */
});
```

## 优化原理

1. memo 会将当前组件的 props 和上次渲染的 props 进行浅比较，如果相同，则不更新，否则更新
2. 如果 props 是一个对象，那么比较的是引用，如果引用相同，则不更新，否则更新
3. 如果 props 是一个数组，那么比较的是引用，如果引用相同，则不更新，否则更新
4. 自定义比较函数：可以传入一个自定义的比较函数，比较函数接收两个参数，分别是当前的 props 和上一次的 props，返回一个布尔值，如果为 true，则不更新，否则更新
```js
import React, { memo } from 'react';

const MyComponent = memo(function MyComponent(props) {
  /* render using props */
}, (prevProps, nextProps) => {
  // 自定义比较函数
  return prevProps === nextProps;
});
```

## 注意事项

1. memo 只能优化函数组件，不能优化类组件
2. memo 只能优化顶层组件，不能优化子组件
3. memo 只能优化 props 和 state 的变化，不能优化其他因素的变化，比如父组件的更新
4. memo 只能优化浅比较，不能优化深比较，如果需要深比较，可以使用其他方法，比如使用 lodash 的 isEqual 函数