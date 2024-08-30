# CSS进程模型（CSS processing model）

【css2官网】https://drafts.csswg.org/css2/#processing-model

这个CSS进程模型将描述UA（用户代理）如何支持CSS工作。这仅仅是一个概念模型，实际的实现可能会有所不同。
这个模型中，UA处理一个资源将进行以下过程：

> 1. Parse the source document and create a document tree.

  解析源文档并创建DOM树

> 2. Identify the target media type.

  识别目标媒体类型( @media 类型，用于确定对应css的)

> 3. Retrieve all style sheets associated with the document that are specified for the target media type.

  获取与文档关联的所有样式表，这些样式表是为目标媒体类型指定的

> 4. Annotate every element of the document tree by assigning a single value to every property that is applicable to the target media type. Properties are assigned values according to the mechanisms described in the section on cascading and inheritance. <br/>
  Part of the calculation of values depends on the formatting algorithm appropriate for the target media type. For example, if the target medium is the screen, user agents apply the visual formatting model.

  为每个元素的每个属性赋值（属性值适用于目标媒体类型）。这些属性值的是根据`级联`和`继承`结合的某种机制共同确定的。
  
  部分值的计算依赖于目标媒体类型的格式化算法。例如，如果目标媒体是屏幕，则 UA 应用 `视觉格式化模型`。

> 5. From the annotated document tree, generate a formatting structure. Often, the formatting structure closely resembles the document tree, but it may also differ significantly, notably when authors make use of pseudo-elements and generated content. First, the formatting structure need not be "tree-shaped" at all -- the nature of the structure depends on the implementation. Second, the formatting structure may contain more or less information than the document tree. For instance, if an element in the document tree has a value of none for the display property, that element will generate nothing in the formatting structure. A list element, on the other hand, may generate more information in the formatting structure: the list element’s content and list style information (e.g., a bullet image).<br/>
Note that the CSS user agent does not alter the document tree during this phase. In particular, content generated due to style sheets is not fed back to the document language processor (e.g., for reparsing).

基于注释的DOM树（annotated document tree），生成一个格式化结构（formatting structure）。通常，格式化结构非常类似于文档树（DOM Tree），但它也可能显著不同，特别是当作者使用伪元素（pseudo-elements）并生成内容（应该是指伪类的content属性）时。首先，格式化结构不必是“树状”的——结构的性质取决于实现。其次，格式化结构可能包含比文档树更多或更少的结构。例如，如果文档树中的元素对于display属性值为none，则该元素在格式化结构中不会生成任何内容。另一方面，列表元素在格式化结构中可能会生成更多信息：列表元素的内容和列表样式信息（例如，一个子弹图像）。

注意css  UA 在当前阶段不会改变DOM树。特别是，由样式表生成的内容不会反馈给文档语言处理器（document language processor）（例如，用于重新解析）。

> 6. Transfer the formatting structure to the target medium (e.g., print the results, display them on the screen, render them as speech, etc.).

将格式化结构传递到目标媒体（例如，打印结果，在屏幕上显示，作为语音渲染等）。
     

## canvas
> For all media, the term canvas describes "the space where the formatting structure is rendered." The canvas is infinite for each dimension of the space, but rendering generally occurs within a finite region of the canvas, established by the user agent according to the target medium. For instance, user agents rendering to a screen generally impose a minimum width and choose an initial width based on the dimensions of the viewport. User agents rendering to a page generally impose width and height constraints. Aural user agents may impose limits in audio space, but not in time.

对于所有媒体，术语canvas描述了“格式化结构被渲染（formatting structure）的位置”。画布对于空间的每个维度都是无限的，但渲染通常发生在画布的有限区域内，由 UA 根据目标媒体建立。例如，UA 当渲染屏幕时，通常会设定一个最小宽度，并根据视口的尺寸选择初始宽度。UA 当渲染页面时，通常会设定宽度和高度限制。听觉 UA 可能会在音频空间中设定限制，但不会在时间上施加限制。



##  css addressing model

CSS 地址模型（CSS Addressing Model）是指 CSS 如何选择和操作 HTML 元素的方式。CSS 地址模型包括选择器和伪类。

CSS选择器和属性允许样式表引用文档或 UA 的以下部分：

* 文档树中的元素和它们之间的一些关系（参见选择器部分），如兄弟选择器、元素选择器。
* 文档树中元素的属性和这些属性的值（参见属性选择器部分），如[type='text']。
* 元素内容的一些部分（参见:first-line和:first-letter伪元素）。
* 文档树中的元素在某种状态时（参见伪类部分）。
* 文档将渲染的画布的一些方面。
* 一些系统信息（参见用户界面部分）。

---

【媒体类型】

https://drafts.csswg.org/css2/#media

在 CSS 中，媒体类型（Media Type）用于指定样式表适用于哪些设备或媒体。媒体类型是 CSS 媒体查询（Media Queries）的一部分，用于根据设备的特性（如屏幕尺寸、分辨率、颜色能力等）来应用不同的样式。

以下是一些常见的媒体类型：

1. `all`：适用于所有设备。
2. `braille`：适用于盲文触觉反馈设备。
3. `embossed`：适用于分页盲文打印机。
4. `handheld`：适用于手持设备（通常是小屏幕、带宽有限），如智能手机和平板电脑。
5. `print`：用于分页材料和在打印预览模式下在屏幕上查看的文档。有关分页媒体特有的格式问题的信息，请参阅分页媒体部分。
6. `projection`:用于投影演示，例如投影仪。有关分页媒体特有的格式问题的信息，请参阅分页媒体部分。
屏幕
7. `screen`：适用于彩色电脑屏幕。
8. `speech`：适用于语音合成器。注：CSS2（1998）有一种类似的媒体类型，称为听觉媒体。
tty
9. `tty`:适用于使用固定间距字符网格的媒体（如电传打字机、终端或显示能力有限的便携式设备）。作者不应使用具有“tty”媒体类型的像素单位。
10. `tv`:适用于电视类设备（低分辨率、彩色、有限滚动屏幕、声音可用）。

以下是一个示例，展示如何使用媒体类型来应用不同的样式：

```css
/* 默认样式 */
body {
  background-color: white;
  color: black;
}

/* 打印样式 */
@media print {
  body {
    background-color: #fff;
    color: #000;
  }
}

/* 屏幕样式 */
@media screen {
  body {
    background-color: #f0f0f0;
    color: #333;
  }
}
```

在这个示例中，默认样式适用于所有设备，打印样式适用于打印预览和打印，屏幕样式适用于计算机屏幕。

请注意，媒体类型是 CSS 媒体查询的一部分，完整的 CSS 媒体查询还包括媒体特性（Media Features），用于更精确地指定样式表适用于哪些设备或媒体。