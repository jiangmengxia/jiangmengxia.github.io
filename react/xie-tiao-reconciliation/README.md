# 协调（Reconciliation）

React 的协调（Reconciliation）是 React 更新过程中的一个关键步骤。当组件的状态（state）或属性（props）发生变化时，React 会创建一个新的虚拟 DOM 树，然后与之前的虚拟 DOM 树进行比较，找出差异，最后将这些差异应用到真实 DOM 上，从而实现高效的更新。

协调的过程可以分为两个主要阶段：调和（Reconciliation）和提交（Commit）。

1. **调和（Reconciliation）**：这是协调过程中的第一个阶段。React 会将新的虚拟 DOM 树与旧的虚拟 DOM 树进行比较，找出差异。这个过程称为调和。React 使用了一种称为 Diff 算法的算法来比较虚拟 DOM 树。Diff 算法会尝试找到最小的更新操作，以减少对真实 DOM 的操作次数。
2. **提交（Commit）**：这是协调过程中的第二个阶段。React 将调和阶段找到的差异应用到真实 DOM 上，从而更新页面。提交阶段包括两个子阶段：渲染阶段和布局阶段。渲染阶段负责创建新的 DOM 节点，布局阶段负责更新 DOM 节点的属性和样式。

React 的协调过程从react16开始是<mark style="color:red;">异步</mark>的，这意味着 React 不会立即更新真实 DOM，而是将更新操作放入一个队列中，然后在合适的时机批量执行这些更新操作。这种异步更新机制可以避免频繁的 DOM 操作，提高应用的性能。

本章节主要用来描述react的协调过程，现在有两个协调的模式。从react16开始引入<mark style="color:green;">Concurrent Mode</mark>（并发模式），在此之前使用的模式现被称为<mark style="color:green;">lagacy Mode</mark>（旧模式）。

Concurrent Mode 是 React 的一个新特性，实现<mark style="color:red;">异步</mark>协调，旨在提高应用的性能和响应速度。Concurrent Mode 允许 React 在处理更新时进行并发，这意味着 React 可以在等待其他任务（如网络请求）完成时暂停更新，并在任务完成后继续更新。

**Concurrent Mode迭代的时间线**

在 <mark style="color:red;">React 16</mark> 中，Concurrent Mode 还是一个<mark style="color:red;">实验性</mark>的特性，需要通过 `ReactDOM.unstable_createRoot` 和 `ReactDOM.unstable_concurrentUpdatesEnabled` 等不稳定 API 来使用。

在 <mark style="color:red;">React 16.6</mark> 中，React 引入了一个新的 API `ReactDOM.unstable_createBlockingRoot`，它允许你在某些情况下使用并发模式，但默认情况下仍然是同步模式。

在 <mark style="color:red;">React 16.9</mark> 中，React 引入了一个新的 API `ReactDOM.unstable_scheduleCallback`，它允许你在并发模式下调度更新。

从 <mark style="color:red;">React 17</mark> 开始，Concurrent Mode 成为了 React 的<mark style="color:red;">默认模式</mark>，所有的更新都会自动进行并发处理。这意味着你不再需要手动启用 Concurrent Mode，React 会根据你的设备和网络状况自动选择最佳的更新策略。

在 <mark style="color:red;">React 18</mark> 中，React 进一步优化了 Concurrent Mode，引入了新的 API `startTransition` 和 `useDeferredValue`，可以用来优化交互密集型应用的性能。



需要注意的是，虽然 Concurrent Mode 提高了 React 的性能和响应速度，但在某些情况下（如首次渲染和某些生命周期方法中），React 仍然会同步执行更新操作。这是为了确保某些关键操作（如首次渲染和组件挂载）能够立即完成。
