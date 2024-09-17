# redux-thunk中间件

redux-thunk的用法和作用和父章节[redux中间件](./)中的自定义开发的thunk中间件是一样的：允许redux工作流中加入异步操作，实现dispatch可以分发异步action。



```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// 注册中间件
const store = createStore(rootReducer, applyMiddleware(thunk));

// 定义一个异步 action
const fetchUser = userId => {
  return dispatch => {
    // 发起 API 请求
    fetch(`/api/users/${userId}`)
      .then(response => response.json())
      .then(user => {
        // 分发同步 action
        dispatch({ type: 'FETCH_USER_SUCCESS', payload: user });
      });
  };
};

// 分发异步 action
store.dispatch(fetchUser(1));

```

