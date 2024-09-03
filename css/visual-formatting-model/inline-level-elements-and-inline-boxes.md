

#  Inline-level elements and inline boxes

[链接]：https://drafts.csswg.org/css2/#atomic-inline-level-boxes


> Inline-level elements are those elements of the source document that do not form new blocks of content; the content is distributed in lines (e.g., emphasized pieces of text within a paragraph, inline images, etc.). The following values of the display property make an element inline-level: inline, inline-table, and inline-block.

内联级元素是源文档中不形成新内容块的元素；内容分布在行中，例如，段落中的强调文本、内联图像（inline images）等。display 属性的以下值使元素内联级：inline、inline-table 和 inline-block。

> Inline-level elements generate inline-level boxes, which are boxes that participate in an inline formatting context.

内联级元素生成内联级框。内联级框是参与内联格式化上下文的框。

> An inline box is one that is both inline-level and whose contents participate in its containing inline formatting context. A non-replaced element with a display value of inline generates an inline box. Inline-level boxes that are not inline boxes (such as replaced inline-level elements, inline-block elements, and inline-table elements) are called atomic inline-level boxes because they participate in their inline formatting context as a single opaque box.

`non-replaced element`是指那些不包含任何内容的元素。这些元素在HTML文档中没有任何内容。

内联框是既是内联级又是其内容参与其包含的内联格式化上下文的框。具有 display 值为 inline 的非替换元素生成内联框。不是内联框的内联级框（如替换的内联级元素、inline-block 元素和 inline-table 元素）被称为原子内联级框，因为它们作为单个不透明的框参与其内联格式化上下文。

