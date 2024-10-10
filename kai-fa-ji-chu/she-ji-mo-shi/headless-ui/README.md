# HeadLess UI

## 什么是 HeadLess UI

Headless UI 是一种用户界面设计模式，它指的是将用户<mark style="color:red;">界面的逻辑</mark>与<mark style="color:orange;">呈现</mark>分离。

在这种模式下，用户界面的逻辑（如事件处理、状态管理等）由JavaScript代码处理，而用户界面的呈现则由CSS和HTML处理

## React中的HeadLess UI

React Hooks 的组件开发设计理念：强调<mark style="color:red;">只负责组件的状态及交互逻辑</mark>，而不管标签和样式。其本质思想其实就是\*\*关注点分离：将组件的“状态及交互逻辑”和“UI 展示层”实现解耦，\*\*这与HeadLess UI的设计理念不谋而合。

也就是对于TOList组件，将ToDo和List分开，List只管UI展示，Todo只管状态的变化（增、删、改）。

React Hooks 本质上就是HeadLess UI，也就是只获得数据+action（行为），不含UI的Hook。它是从普通组件的中抽出组件的行为。从表象上来看，Headless UI 组件其实就是一个什么也不渲染的组件。

<figure><img src="../../../.gitbook/assets/image (30).png" alt=""><figcaption></figcaption></figure>

## 优点

Headless UI 的主要优点是它提供了更高的灵活性和可重用性。

由于用户界面的逻辑和呈现是分离的，因此你可以使用相同的逻辑在不同的平台上呈现用户界面，例如在Web、移动应用程序和桌面应用程序上。

让展示随心所欲，组件行为保持<mark style="background-color:purple;">高可复用性</mark>。

## HeadLess UI 库

[Shadcn-UI](shadcn-ui/)
