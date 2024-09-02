# Promise相关面试题

## **状态有哪些？**

Promise 有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。

## **then 方法的返回值是什么？**

`then` 方法返回一个新的 Promise。如果 `then` 方法中的回调函数返回一个值，这个值会被 `Promise.resolve` 包装成一个新的 Promise 对象。如果 `then` 方法中的回调函数抛出一个错误，这个错误会被 `Promise.reject` 包装成一个新的 Promise 对象。

例如：

```
let promise = new Promise((resolve, reject) => {
  resolve('ok');
});

promise.then((okdata) => {
  console.log(okdata); // 'okdata'
  throw new Error('error');
}).catch((value) => {
  console.log(value); // 'error'
});
```

在这个示例中，`then` 方法中的回调函数抛出了一个异常，这个值被 `Promise.reject` 包装成一个新的 Promise 对象，然后这个新的 Promise 对象被 `catch`方法处理，打印出新的值。

## **Promise 的 catch 方法的返回值是什么？**

答案跟Promise.then基本一致

`catch` 方法返回一个新的 Promise。如果 `catch` 方法中的回调函数返回一个值，这个值会被 `Promise.resolve` 包装成一个新的 Promise 对象。如果 `catch` 方法中的回调函数抛出一个错误，这个错误会被 `Promise.reject` 包装成一个新的 Promise 对象。

例如：

```javascript
let promise = new Promise((resolve, reject) => {
  reject('error');
});

promise.catch((error) => {
  console.log(error); // 'error'
  return 'new value';
}).then((value) => {
  console.log(value); // 'new value'
});
```

在这个示例中，`catch` 方法中的回调函数返回了一个新的值，这个值被 `Promise.resolve` 包装成一个新的 Promise 对象，然后这个新的 Promise 对象被 `then` 方法处理，打印出新的值。

## **finally 方法的返回值是什么？**

`finally` 方法返回一个新的 Promise。无论 Promise 的状态是 fulfilled 还是 rejected，`finally` 方法中的回调函数都会被执行。`finally` 方法中的回调函数返回的值会被 `Promise.resolve` 包装成一个新的 Promise 对象。

### **finally 在then异步结果未返回之前就已经执行**

`finally` 方法在 Promise 的状态变为 fulfilled 或 rejected 之前就已经执行了。无论 Promise 的状态是 fulfilled 还是 rejected，`finally` 方法中的回调函数都会被执行。

`finally` 方法通常用于执行一些清理工作，如关闭网络连接、取消定时器等。因为 `finally` 方法中的回调函数会在 Promise 的状态变为 fulfilled 或 rejected 之前执行，所以它可以在 Promise 的结果可用之前执行。

例如：

```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 1000);
});

promise.finally(() => {
  console.log('Promise is settled');
}).then((value) => {
  console.log(value); // 'success'
});
```

在这个示例中，`finally` 方法中的回调函数在 Promise 的状态变为 fulfilled 之前就已经执行了，然后 `then` 方法处理 Promise 的结果，打印出结果。

## **all 方法的返回值是什么？**

`all` 方法返回一个新的 Promise。当所有的 Promise 都变为 fulfilled 状态时，`all` 方法返回的 Promise 会变为 fulfilled 状态，并且所有的 Promise 的值会作为一个数组传递给 `all` 方法返回的 Promise 的回调函数。如果任何一个 Promise 变为 rejected 状态，`all` 方法返回的 Promise 会立即变为 rejected 状态，并且第一个变为 rejected 状态的 Promise 的值会传递给 `all` 方法返回的 Promise 的回调函数。

```javascript
let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});
let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 2000);
});
let promise3  = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 3000);
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values); // [1, 2, 3]
})
```

```javascript
let promise1 = Promise.resolve(1);
let promise2 = Promise.reject('error');
let promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3]).catch((error) => {
  console.log(error); // 'error'
});
```

在这个示例中，`promise2` 变为 rejected 状态，新的 Promise 实例立即变为 rejected 状态，并且 `promise2` 的值传递给 `catch` 方法。

## **race 方法的返回值是什么？**

`Promise.race` 方法用于将多个 Promise 实例包装成一个新的 Promise 实例。新的 Promise 实例在任何一个传入的 Promise 实例变为 fulfilled 状态或 rejected 状态时变为相同的状态，并且相应的 Promise 实例的值会传递给新的 Promise 实例的回调函数。

以下是一个示例：

```javascript
let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});
let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 2000);
});
let promise3  = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 3000);
});

Promise.race([promise1, promise2, promise3]).then((value) => {
  console.log(value); // 1
});
```

在这个示例中，`Promise.race` 方法将 `promise1`、`promise2` 和 `promise3` 包装成一个新的 Promise 实例。新的 Promise 实例在 `promise1` 变为 fulfilled 状态时变为 fulfilled 状态，并且 `promise1` 的值传递给 `then` 方法。

<mark style="color:orange;">如果任何一个 Promise 实例变为 rejected 状态，新的 Promise 实例会立即变为 rejected 状态</mark>，并且第一个变为 rejected 状态的 Promise 实例的值会传递给 `then` 方法。例如：

```javascript
let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('error');
  }, 1000);
});
let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 2000);
});
let promise3  = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 3000);
});

Promise.race([promise1, promise2, promise3]).catch((error) => {
  console.log(error); // 'error'
});
```

在这个示例中，`promise1` 变为 rejected 状态，新的 Promise 实例立即变为 rejected 状态，并且 `promise1` 的值传递给 `catch` 方法。

## **如何使用 Promise 实现一个异步函数？**

可以使用 `async` 和 `await` 关键字来定义一个异步函数。在异步函数中，可以使用 `await` 关键字来等待一个 Promise 的结果。例如：

```javascript
async function asyncFunction() {
  let result = await somePromise();
  console.log(result);
}
```

在这个示例中，`asyncFunction` 是一个异步函数，它使用 `await` 关键字等待 `somePromise` 的结果，并在结果可用时打印结果。



## 写一个Promise的cancel方法

JavaScript 的 Promise 对象本身并没有提供 `cancel` 方法。这是因为 Promise 的设计理念是异步操作一旦开始，就无法取消。一旦 Promise 被创建，它就会执行其操作，无论这个操作是成功还是失败。

然而，有一些方法可以模拟取消 Promise 的行为：

1.  **使用 `Promise.race` 和 `setTimeout`**：你可以创建一个超时的 Promise，然后使用 `Promise.race` 将这个超时的 Promise 和原始的 Promise 包装在一起。当超时的 Promise 被触发时，原始的 Promise 就会被取消。

    ```javascript
    let promise = new Promise((resolve, reject) => {
      // 异步操作
    });

    let timeout = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('timeout');
      }, 5000);
    });

    Promise.race([promise, timeout]).then((value) => {
      // 处理结果
    }).catch((error) => {
      console.log(error); // 'timeout'
    });
    ```
2.  **使用 `AbortController`**：`AbortController` 是一个 Web API，可以用来取消 Fetch 请求。虽然它不能直接取消 Promise，但你可以使用它来取消 Fetch 请求，从而间接取消 Promise。

    ```javascript
    let controller = new AbortController();
    let signal = controller.signal;

    let promise = fetch(url, { signal });

    promise.then((response) => {
      // 处理响应
    }).catch((error) => {
      console.log(error); // 'AbortError'
    });

    // 取消请求
    controller.abort();
    ```

需要注意的是，这些方法并不能真正取消 Promise，它们只是通过抛出错误或超时来阻止 Promise 的结果被处理。因此，在使用这些方法时，你需要确保你的代码能够正确处理这些错误或超时。

3. 自定义cancelPromise类

```javascript
class CancelPromise{
  constructor(func){
    this.cancel =false
      const newFuc = (resolve)=>{
        if(!this.cancel){
          func(resolve)
        }
      }
    this.promise = new Promise(newFuc)
  }
  then(thenFunc){
    this.promise.then((res)=>{
        if(!this.cancel){
          thenFunc(res)
        }
      })
    return this
  }
  catch(catchFunc){
    this.promise.catch((err)=>{
        catchFunc(err)
    })
    return this
  }
  stop(){
    this.cancel = true
    throw new Error('cancel ok')
  }
}
const ss = new CancelPromise((resolve)=>{
  setTimeout(()=>{
    resolve('okk')
  },10000)
})
.then(res=>{
  console.log('res', res)
}).catch(err=>{
  console.log('err', err)
})


ss.stop()


```

## promise解决三种问题

* 链式回调
* 同时发起多个异步请求，race方法将最先执行完成的结果返回
* 同时发起多个异步请求，all方法将所有请求结果完成后返回

