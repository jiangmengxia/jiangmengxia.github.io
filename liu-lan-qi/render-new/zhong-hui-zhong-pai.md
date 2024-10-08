# 重绘&重排

* 重绘：当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等），浏览器会将新样式赋予元素并重新绘制它，这个过程称为重绘。
* 重排：当渲染树中的一部分（或全部）因为元素的规模尺寸、布局、隐藏等改变而需要重新构建，这就称为回流（回流必定会发生重绘，重绘不一定会引发回流）。回流所需的成本比重绘高的多，因为回流会影响到布局，所以回流必定会引发重绘，重绘不一定会引发回流。
* 重排的触发条件：当页面布局和几何属性发生变化时，如元素的位置、大小、显示/隐藏等，浏览器会重新计算元素的位置和大小，重新构建渲染树，这个过程称为重排。常见的重排触发条件包括：
  * 添加或删除可见的DOM元素
  * 元素尺寸改变（宽度、高度、边距、填充、边框等）
  * 内容变化，如文本变化或图片尺寸改变
  * 浏览器窗口尺寸改变
  * 计算 offsetWidth 和 offsetHeight 等属性
* 重绘和重排的代价：重绘和重排是浏览器性能优化的一个重要方面，因为它们会导致浏览器重新计算布局、重新绘制页面，从而影响页面的性能。因此，我们应该尽量避免频繁的重绘和重排，以提高页面的性能。
