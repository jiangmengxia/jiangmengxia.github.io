#  replaced-element & non-replaced-element

## 1. 替换元素（replaced-element）

【MDM doc定义】https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element


> In CSS, a replaced element is an element whose representation is outside the scope of CSS; they're external objects whose representation is independent of the CSS formatting model.

在 css 中，替换元素是指其内容不受当前文档样式（css）影响的元素；它们是独立于 CSS 格式化模型的外部对象。

> Put in simpler terms, they're elements whose contents are not affected by the current document's styles. The position of the replaced element can be affected using CSS, but not the contents of the replaced element itself. Some replaced elements, such as `<iframe>` elements, may have stylesheets of their own, but they don't inherit the styles of the parent document.

简单来说，替换元素的内容不受当前文档的样式影响。可以使用 CSS 控制替换元素的框的位置，但不能控制替换元素本身的内容。一些替换元素，如 `<iframe>` 元素，可能有自己的样式表，但它们不继承父文档的样式。

> The only other impact CSS can have on a replaced element is that there are properties which support controlling the positioning of the element's content within its box. See `Controlling object position within the content box` for further information.

css 可以对替换元素产生的唯一影响是，有一些属性支持控制替换元素的内容在其框内的位置。有关更多信息，请参阅`控制内容框内对象的位置`。

MDM doc 认为，严格意义上的替换元素有：img、video、iframe、embed、fencedframe，特定情况下，被视为替换元素有：option、audio、canvas、object。


> TML spec also says that an `<input>` element can be replaced, because `<input>` elements of the "image" type are replaced elements similar to `<img>`. However, other form controls, including other types of `<input>` elements, are explicitly listed as non-replaced elements (the spec describes their default platform-specific rendering with the term "Widgets").

HTML 标准还指出，`<input>` 元素可以是替换元素，因为 "image" 类型的 `<input>` 元素与 `<img>` 元素类似。然而，其他表单控件，包括其他类型的 `<input>` 元素，明确列为非替换元素（规范使用术语 "Widgets" 描述它们的默认平台特定渲染）。

--- 

【css 官方定义】 https://drafts.csswg.org/css2/#conform

> An element whose content is outside the scope of the CSS formatting model, such as an image, embedded document, or applet. For example, the content of the HTML IMG element is often replaced by the image that its "src" attribute designates. Replaced elements often have intrinsic dimensions: an intrinsic width, an intrinsic height, and an intrinsic ratio. For example, a bitmap image has an intrinsic width and an intrinsic height specified in absolute units (from which the intrinsic ratio can obviously be determined). On the other hand, other documents may not have any intrinsic dimensions (for example, a blank HTML document).

内容不在css格式化模型（CSS formatting model）内的元素，例如image, embedded document, or applet。
例如，HTML IMG 元素的内容通常由其 "src" 属性指定的图像替换。替换元素通常具有内联尺寸（intrinsic dimensions）：固有宽度、固有高度和固有比例。例如，位图图像具有以绝对单位指定的固有宽度和固有高度（从这些固有比例可以明显确定）。另一方面，其他文档可能没有任何内联尺寸（例如，一个空的HTML文档）。


> User agents may consider a replaced element to not have any intrinsic dimensions if it is believed that those dimensions could leak sensitive information to a third party. For example, if an HTML document changed intrinsic size depending on the user’s bank balance, then the UA might want to act as if that resource had no intrinsic dimensions.

用户代理（UA）可能会考虑替换元素没有内联尺寸，如果认为这些尺寸可能会向第三方泄露敏感信息。例如，如果 HTML 文档的内联尺寸会根据用户的银行余额而改变，那么 UA 可能会把该资源当作没有内联尺寸。

> The content of replaced elements is not considered in the CSS rendering model.

替换元素的内容不被考虑在 CSS 渲染模型（CSS rendering model）中。



【总结】

总的来说，这些内嵌式的元素（img、iframe、video、audio、object、embed、canvas、applet等）， 它们的内容来源受指定资源影响，不同的来源则内联尺寸（intrinsic dimensions，如宽度、高度、比例）都不一样，因此UA在设计时考虑到安全性，避免让内联尺寸泄露敏感信息，因此可能会把该资源当作没有内联尺寸。



### 匿名替换元素

> Objects inserted using the CSS content property are anonymous replaced elements. They are "anonymous" because they don't exist in the HTML markup.

在 CSS 中，使用 `content` 属性插入的对象是匿名替换元素。它们是“匿名”的，因为它们不存在于 HTML 标记中。

`content` 属性通常与 `::before` 和 `::after` 伪元素一起使用，用于在元素的内容前后插入内容。插入的内容可以是文本、图片、SVG 等等。

以下是一个示例，展示如何使用 `content` 属性插入文本：

```css
p::before {
  content: "Hello, ";
}
p::after {
  content: "!";
}
```

在这个示例中，`::before` 伪元素在 `<p>` 元素的内容前面插入文本“Hello, ”，`::after` 伪元素在 `<p>` 元素的内容后面插入文本“!”。

请注意，使用 `content` 属性插入的内容是`匿名替换元素`，它们不受 HTML 标记的控制，只能通过 CSS 进行样式设置。


## 2. 非替换元素（non-replaced-element）

除了替换元素，其他元素都是非替换元素。非替换元素的内容直接由 HTML 标记定义，并且它们的内容在 CSS 渲染模型中是可见的，而不是由外部资源（如图片、视频、音频等）提供的。


---
【术语】

* `intrinsic dimensions`:内联尺寸（Intrinsic Dimensions）是指元素内容的自然尺寸，即元素在没有 CSS 样式干预下的默认尺寸。内联尺寸通常由元素的内容和其自身属性决定。
    以下是一些常见的内联尺寸：
    * 图片：内联尺寸由图片的原始尺寸决定。
    * 视频：内联尺寸由视频的原始尺寸决定。
    * 音频：内联尺寸由音频的原始尺寸决定。
    * `<input>`：内联尺寸由输入控件的类型和值决定。
    * `<textarea>`：内联尺寸由文本区域的行数和列数决定。

* `embedded document`：嵌入文档（Embedded Document）是指在网页中嵌入另一个文档或资源，如图片、视频、音频、其他网页等。嵌入文档可以增强网页的交互性和用户体验。场景的嵌入文档类型有：img、video、audio、iframe、object、embed、applet等。

* `applet`：Applet 是一种在网页上运行的 Java 小程序。它们通常嵌入在 HTML 页面中，并通过 Java 虚拟机（JVM）在客户端浏览器中执行。Applet 可以用来创建动态、交互式的网页内容，但它们已经逐渐被淘汰，因为现代浏览器对 Java 的支持已经大大减弱。

