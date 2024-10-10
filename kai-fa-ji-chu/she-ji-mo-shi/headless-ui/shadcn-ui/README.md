# Shadcn UI

随着HeadLess UI设计的兴起，HeadLess UI库\*\*（Headless Component Libraries）\*\* 也腾空而出。Shadcn UI就是这样的无头组件库。

## 传统UI库

传统的UI库，如Element-UI、Antd等，通过npm下载package，从node\_modules中引入对应包，下载下来的package已经经过打包工具（webpack、rollup）等处理过，已经不 具备可读性。也不允许开发直接更改node\_modules中的代码。

<figure><img src="../../../../.gitbook/assets/image (31).png" alt="" width="375"><figcaption></figcaption></figure>

由于前端业务的多样性，原有的组件库中的组件呈现、样式并不一定能够很好的适用于当前业务，很多时候我们采用

（1）组件样式不适用 -> 样式覆盖

（2）组件功能、props不够强大 -> 我们可以给组件库提`issue`，然后等待作者去增加；或者可以通过一些类似`pacth-package`这种工具去给`node_modules`中的源码打补丁，从而达到修改源码的效果

以上虽然能解决一定问题，但是我们知道（1）的样式覆盖不是很好的解决方案，会带来冗余样式，使得样式计算复杂化，（2）更不是好的方法。

如果能直接把组件库中我们用到的组件，变成我们自己的业务组件，想怎么修改，就怎么修改，岂不快哉！

Shadcn UI 就是这种思路，让别人的组件库，成为私有业务组件，只需一行命令，就能下载到指定位置，为我所用。

## Shadcn UI

Shadcn UI 不是 component library，而官方自称为“component collection”，组件集合，原因是它们的组件不会被打包成node\_modules，然后被引入，而是直接下载至项目中组件文件夹中，成为私有组件，可定制化组件样式。

### 一键安装组件

比如你想使用 `Button` 组件，你可以使用命令行

```
npx shadcn-ui@latest add button
```

这样它就会把`Button` 这个组件放到你的项目中去

<figure><img src="../../../../.gitbook/assets/image (32).png" alt=""><figcaption></figcaption></figure>

使用的话可以直接引入使用，你如果对他预设的 CSS 和 功能不满意，你也可以直接去到 `button.tsx` 中去修改

### Shadcn UI = Radix UI + Tailwind CSS <a href="#id-0b62" id="id-0b62"></a>

Shadcn UI组合了HeadLess 组件库 Radix UI + Tailwind CSS样式自定义，实现的一套组件集。

选择[Radix UI](https://github.com/radix-ui/primitives) 的优势：

* 是一個 headless component library，这表示它的组件沒有任何的样式，它提供了可以客观样式自定义的方式。
* Radix UI 的所有组件都符合 [WAI-ARIA](https://www.w3.org/TR/wai-aria-practices-1.2) 的要求，如果你需要建立具有 accessibility 的特殊场景，Radix UI 无疑是最好的选择，当然其他任意场景，Radix UI 也都适用
* Radix UI 的所有元件都可以单独下载，你不用在一开始就安装整包的 component library，而是安装需要的组件即可：

<pre data-full-width="false"><code>npm install @radix-ui/react-dialog
<strong>npm install @radix-ui/react-dropdown-menu
</strong>npm install @radix-ui/react-tooltip
</code></pre>

选择 Tailwind CSS的优势：

* 原子样式的优势，Tailwind CSS提供了全量的原子样式，上手简单
* 如果不喜欢Shadcn UI原有样式，随时可以修改Radix UI组件中的样式，把组件变成适合业务的组件

参考：

[https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/why-shadcn-ui-is-so-popular-in-2023-0f95e66f3ddc](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/why-shadcn-ui-is-so-popular-in-2023-0f95e66f3ddc)

[https://medium.com/@Kelly\_CHI/shadcn-ui-tailwind-components-6fd4f1959147](https://medium.com/@Kelly\_CHI/shadcn-ui-tailwind-components-6fd4f1959147)

[https://mp.weixin.qq.com/s/uZQF3k9yhBkSnVoWD9Ow\_A](https://mp.weixin.qq.com/s/uZQF3k9yhBkSnVoWD9Ow\_A)
