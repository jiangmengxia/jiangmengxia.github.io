# 视觉格式化模型（Visual Formatting Model）

## 1. 概述
用户代理如何处理视觉<a href='https://drafts.csswg.org/css2/#media'>媒体</a>的文档树

在视觉格式模型中，文档树中的每个元素根据盒模型生成零个或多个盒子。这些盒子的布局受以下因素控制：

* 盒子的尺寸和类型
* 定位方案（normal flow, float, and absolute positioning）
* 文档树中元素之间的关系
* 外部信息（例如，视口大小、图像的内在尺寸等）
本章和下一章中定义的属性适用于连续媒体和分页媒体。但是，当应用于分页媒体时，边距属性的含义会有所不同（有关详细信息，请参阅页面模型）。
视觉格式化模型没有指定格式化的所有方面（例如，它没有指定字母间距算法）。对于本规范未涵盖的格式问题，合格（confirming）的用户代理可能会有不同的行为。

### 1.1 视口（viewport）

<a href='https://drafts.csswg.org/css2/#continuous-media-group'>连续媒体</a>的用户代理通常为用户提供一个视口（屏幕上的窗口或其他查看区域），用户可以通过该视口查看文档。当调整视口大小时，用户代理可能会更改文档的布局（请参阅<a href='https://drafts.csswg.org/css2/#containing-block-details'>初始包含块</a>）。
当视口小于渲染文档的画布区域时，用户代理应提供滚动机制。
每个<a href='https://drafts.csswg.org/css2/#canvas'>画布</a>最多有一个视口，但用户代理可以渲染到多个画布（即，提供同一文档的不同视图）。



### 1.2 包含块（Containing blocks）

在css2中，许多盒子的位置和大小都是相对于称为包含块的矩形框的边缘计算的。一般把生成的盒子作为后代盒子的包含块，我们称它为其后代“建立”了包含块。短语“一个盒子的包含块”指的是“盒子所在的包含块”，而不是它生成的包含块。

每个盒子在其包含块中给出一个位置，但它没有被这个包含块限制；它可能会溢出。

关于如何计算包含块尺寸的<a href='http://www.ayqy.net/doc/css2-1/visudet.html#containing-block-details'>细节</a>见<a href='http://www.ayqy.net/doc/css2-1/visudet.html'>下一章</a>


## 2. 控制盒子的生成（Controlling box generation）

下面的小节描述了可能在css中生成的盒子的类型。一个盒子的类型会影响它视觉格式模型中的行为。下面的display属性描述了盒子的类型。

### 2.1. 块级元素和块盒（Block-level elements and block boxes）

块级元素是在源文档中被格式化为块的元素（如段落）。块级类型的display属性值为：block、list-item、table。

块级盒子参与<a href='http://www.ayqy.net/doc/css2-1/visuren.html#block-formatting'>块级格式上下文</a>中。每个块级元素生成一个`主块级盒子`（ principal block-level box），该盒子包括后代盒子及生产内容，并且任何定位方案都与该盒子有关。

有些块级元素可能会生成除主盒外的额外的盒：'list-item'元素。这些额外的盒根据主盒来放置。

`block-level box`：块级元素生成的盒子
`block container box`: 块容器盒，是指一个块级元素，它包含其他块级元素或内联元素
`block box`: 块盒，是指一个块级元素生成的盒子。块盒子会占用父元素的全部可用宽度，并可以设置高度和宽度。
`table box`: 表盒，是指一个表格元素生成的盒子。表格盒子可以包含行、列和单元格，并可以设置表格的布局和样式。

除了稍后章节中描述的`表框`(`table boxes`)和`替换的元素`(`replaced elements`)外，块级框也是`块容器盒`(`block container box`)。
块容器框有两种：
* 一种是：只包含`block box`
* 另一种是：建立`inline formatting context`(内联格式上下文)，因此只包含`内联级盒`(inline-level boxes)

因此并非所有`block container boxes`都是`block-level boxes`，比如未替换的内联块和未替换的表单元格（`table cells`）是`block container boxes`，但不是`block-level boxes`。作为`Block-level boxes`的`block containers`称为`block boxes`。

“块级盒（block-level box）”，“块容器盒（block container box）”和“块盒（block box）”这三个术语在没有歧义的时候就简称为“块（block）”


#### 2.1.1 匿名块盒（Anonymous block boxes）

```html
<DIV>
  Some text
  <P>More text
</DIV>
```
例子中，DIV和P元素都是display:block，DIV包括inline content和block content。为了格式简便，我们假设有一个`anonymous block box`（匿名块盒）包裹着文本“Some text”，如图：

![alt text](image.png)

也就是说，如果一个block container box（如上面的DIV）内部有一个block-level box（如上面的P），那么我们强制它只包含block-level boxes。

当`inline box`包含`in-flow block-level box`时，该内联框（及其同一行框内的内联祖先）会围绕块级框（以及任何连续的或仅由可折叠空格和/或流外元素分隔的块级兄弟）被拆分，将内联框分为两个框（即使任一侧为空），块级框的每侧各一个。中断之前和中断之后的行框被封闭在匿名块框中，块级框成为这些匿名框的兄弟。当这种内联框受到相对定位的影响时，任何由此产生的平移也会影响内联框中包含的块级框。

> 在 CSS 中，流（Flow）是指元素在文档中的布局和排列方式。元素可以处于流中（in-flow）或脱离流（out-of-flow）。
>
> in-flow：处于流中的元素会按照其在 HTML 中的顺序进行布局和排列。它们会占据其父元素的全部可用空间，并与其他元素共享同一行。常见的 in-flow 元素包括块级元素和内联元素。
>
> out-of-flow：脱离流的元素不会按照其在 HTML 中的顺序进行布局和排列。它们会脱离其父元素，并可以设置绝对位置或浮动。常见的 out-of-flow 元素包括定位元素（positioned elements）和浮动元素（floating elements）。

```html
<style>
p    { display: inline }
span { display: block }
</style>
<BODY>
<P>
This is anonymous text before the SPAN.
<SPAN>This is the content of SPAN.</SPAN>
This is anonymous text after the SPAN.
</P>
</BODY>
```

P 包含
* 一个匿名块包裹内容 “This is anonymous text before the SPAN.”
* 一个SPAN block，包裹内容“This is the content of SPAN.”
* 一个匿名块包裹内容 “This is anonymous text after the SPAN.”

BODY 包含：
* 一个匿名块， 在P之前，包裹一个空格
* 一个P block， 包含三个匿名块和SPAN block
* 一个匿名块， 在P之后，包裹一个空格

### 2.2 内联元素和内联盒（Inline-level elements and inline boxes）

内联级元素是指源文档中不构成新内容块的元素；内容按行分布（例如，段落中的强调文本、内联图像等）。display属性的以下值构成内联级别的元素：`inline`, `inline-table`, and `inline-block`。

内联级别元素生成内联级别框，这些框参与内联格式上下文。

内联框是一种内联级别的框，其内容参与其包含的内联格式上下文。显示值为inline的未替换元素会生成一个inline框。非内联框的内联级别框（如替换的 `inline-level` elements, `inline-block` elements, and `inline-table` elements）称为原子内联级别框，因为它们作为单个不透明框参与其内联格式上下文。


#### 2.2.1 匿名内联盒（Anonymous inline boxes）

任何直接包含在块容器元素（而不是内联元素）中的文本都必须被视为匿名内联元素。

```html
<p>Some <em>emphasized</em> text</p>
```

P生成一个块级盒子，包含多个内联盒子：
* 一个匿名内联盒子，包裹内容 “Some ”
* 一个EM内联盒子，包裹内容 “emphasized”
* 一个匿名内联盒子，包裹内容 “ text”

### 2.3 Run-in boxes
`display:run in`现在在CSS3中定义（请参阅CSS基本框模型）。
在 CSS 中，运行内盒子（Run-in Box）是一种特殊的块级盒子，它可以在流中或脱离流。运行内盒子通常用于定义标题和内容的关系。

### 2.4 display属性

* block：生成一个块级盒子
* inline-block:生成一个` inline-level block `级别的盒子，其内部被格式化为`block box`，元素本身被格式化为原子内联级别框。
* inline: 为元素生成一个或多个`inline boxes`。
* list-item：为元素生成一个`principal block box`和一个`marker box`，更多详见<a href='https://drafts.csswg.org/css2/#lists'>list</a>章节。
* none:不生成盒子及内容，对布局无影响
* table, inline-table, table-row-group, table-column, table-column-group, table-header-group, table-footer-group, table-row, table-cell, and table-caption：都是表格相关的display。


## 3. position schemes

在CSS 2中，一个盒子可以根据三种定位模式进行布局：

* Normal flow : 包含块级盒子的块级格式、内联盒子的内联格式、块级&内联盒子的相对位置
* Floats: 在浮动模型中，首先根据`Normal flow`布置一个盒子，然后从流量中取出，并尽可能向左或向右移动。内容可能会沿着浮子(`float`)的侧面流动。
* Absolute positioning: 在绝对定位模型中，一个长方体被完全从`Normal flow`中删除（它对后面的兄弟对象没有影响），并被分配了相对于包含块的位置。

当一个元素被浮动、绝对定位或为根元素时，它被称为脱离流（`out-of-flow`）。否则，它被称为 `in-flow` 。元素A的flow是A和所有`in-flow`元素的集合，这些`in-flow`元素的最近一个`out-of-flow`祖先是A。

## 4. Normal flow

常规流（Normal flow）中的盒属于一个格式化上下文，可能是块或是行内（格式化上下文），但不能两者都是。块级盒参与块格式化上下文。行内级盒参与行内格式化上下文

### 4.1 块格式化上下文（Block formatting contexts）

浮动元素（float:left|right）、绝对定位元素、如inline-blocks、table-cells、table-captions的非块级盒子的block容器，以及overflow属性不等于visible的block盒子（除了那些值已传播到视口的）会为其内容建立新的块级格式化上下文。

在一个块格式化上下文中，盒在垂直方向一个接一个地放置，从包含块的顶部开始。两个兄弟盒之间的垂直距离由'margin'属性决定。同一个块格式化上下文中的相邻块级盒之间的垂直外边距会合并

在一个块格式化上下文中，每个盒的左外边界（left outer edge）挨着包含块的左外边界（对于从右向左的格式化，右外边界挨着）。即使存在浮动（尽管一个盒的行框可能会因为浮动而收缩 译注：环绕浮动元素放置的行框比正常的行短一些），这也成立。除非该盒建立了一个新的块格式化上下文（这种情况下，该盒自身可能会因为浮动变窄）

关于分页媒体中分页相关的信息，请查看<a href='http://www.ayqy.net/doc/css2-1/page.html#allowed-page-breaks'>合法的分页</a>章节


更多参考<a href='./block-formatting-context.md'>你不知道的BFC</a>

### 4.2 Inline formatting contexts

在行内格式化上下文中，盒是从包含块的顶部开始一个挨一个水平放置的。这些盒之间的水平外边距，边框和内边距都有效。盒可能会以不同的方式垂直对齐：以它们的底部或者顶部对齐，或者以它们里面的文本的基线对齐。包含来自同一行的盒的矩形区域叫做行框(inline-box)

更多参考<a href='./inline-formatting-contexts.md'>你不知道的IFC</a>


 
### 4.3 Relative positioning

