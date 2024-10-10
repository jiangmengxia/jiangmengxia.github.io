# WAI-ARIA规范

WAI-ARIA（Web Accessibility Initiative - Accessible Rich Internet Applications），译为：“网络无障碍倡议-可访问的富互联网应用程序”，是一个由W3C（万维网联盟）维护的规范，用于提高网页的可访问性。它提供了一组属性，可以用来描述网页元素的状态和角色，以便屏幕阅读器和其他辅助技术能够更好地理解网页内容。

以下是一些WAI-ARIA属性：

* `aria-label`：用于为元素提供替代文本，以便屏幕阅读器能够读取。
* `aria-hidden`：用于指示元素是否对屏幕阅读器可见。
* `aria-disabled`：用于指示元素是否可用。
* `aria-required`：用于指示表单元素是否为必填项。
* `aria-expanded`：用于指示可折叠元素是否展开。
* `aria-selected`：用于指示选项是否被选中。

使用WAI-ARIA属性，你可以提高网页的可访问性，使更多的用户能够使用你的网站。例如，你可以使用 `aria-label` 属性为按钮提供替代文本，以便屏幕阅读器能够读取按钮上的文本。

请注意，WAI-ARIA属性应该与语义HTML元素一起使用，以提供最佳的可访问性。例如，你应该使用 `<button>` 元素来创建一个按钮，并使用 `aria-label` 属性为按钮提供替代文本，而不是使用一个 `<div>` 元素，并使用 `aria-label` 属性为 `<div>` 提供替代文本。
