# css面试题合集

## 1. 水平垂直居中的方式有哪些？

在 CSS 中，有多种方法可以实现元素的水平垂直居中。以下是几种常见的方法：

1.  **使用 Flexbox**

    ```css
    .container {
      display: flex;
      justify-content: center; /* 水平居中 */
      align-items: center; /* 垂直居中 */
      height: 100vh; /* 容器高度为视口高度 */
    }
    ```
2.  **使用 Grid**

    ```css
    .container {
      display: grid;
      place-items: center; /* 水平和垂直居中 */
      height: 100vh; /* 容器高度为视口高度 */
    }
    ```
3.  **使用定位和 transform**

    ```css
    .container {
      position: relative;
      height: 100vh; /* 容器高度为视口高度 */
    }

    .child {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%); /* 向左向上移动自身宽高的 50% */
    }
    ```
4.  **使用定位和负边距**

    ```css
    .container {
      position: relative;
      height: 100vh; /* 容器高度为视口高度 */
    }

    .child {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -50px; /* 向上移动自身高度的一半 */
      margin-left: -50px; /* 向左移动自身宽度的一半 */
    }
    ```
5.  **使用表格布局**

    ```css
    .container {
      display: table;
      height: 100vh; /* 容器高度为视口高度 */
    }

    .child {
      display: table-cell;
      vertical-align: middle; /* 垂直居中 */
      text-align: center; /* 水平居中 */
    }
    ```

## 2. 移动端如何适配不同尺寸屏幕？

在移动端开发中，适配不同尺寸的屏幕是一个重要的问题。以下是一些常用的适配方法：

1. **使用相对单位**：在 CSS 中，可以使用相对单位（如 em、rem、vw、vh 等）来代替绝对单位（如 px）。相对单位可以根据视口大小或父元素的大小来调整大小，从而实现更好的适配。
2. **使用媒体查询**：媒体查询可以根据不同的屏幕尺寸或设备特性来应用不同的 CSS 规则。例如，可以使用媒体查询来为小屏幕设备设置不同的字体大小或布局。
3. **使用响应式布局**：响应式布局是一种设计理念，它可以根据不同的屏幕尺寸或设备特性来调整布局。可以使用 CSS Flexbox、Grid 或 CSS 布局技术来实现响应式布局。
4. **使用视口单位**：视口单位（如 vw、vh、vmin、vmax）可以根据视口的大小来调整大小。例如，可以使用 vw 单位来设置元素的宽度，使其占据视口宽度的百分比。
5. **使用 CSS 预处理器**：CSS 预处理器（如 Sass、Less）可以提供更强大的功能，如变量、嵌套、混合等，从而简化响应式布局的实现。
6. **使用 JavaScript**：在某些情况下，可能需要使用 JavaScript 来动态调整布局或样式。例如，可以使用 JavaScript 来检测屏幕尺寸，并根据尺寸来调整样式。

总的来说，适配不同尺寸的屏幕需要综合考虑设计、布局和代码实现，选择合适的方法来实现更好的适配效果。

## 3. 弹性布局flex:1包含哪三种属性

在 CSS Flexbox 中，`flex` 属性是一个简写属性，用于设置一个弹性项目（flex item）的弹性增长（flex-grow）、弹性收缩（flex-shrink）和基础大小（flex-basis）。

* **flex-grow**：定义项目的放大比例，默认值为 0。如果所有项目的 `flex-grow` 属性都为 1，则它们将等分剩余空间（如果有的话）。如果一个项目的 `flex-grow` 属性为 2，则它将比其他项目占据更多的剩余空间。
* **flex-shrink**：定义项目的缩小比例，默认值为 1。如果所有项目的 `flex-shrink` 属性都为 1，当空间不足时，所有项目都将等比例缩小。如果一个项目的 `flex-shrink` 属性为 0，则该项目将不缩小。
* **flex-basis**：定义在分配多余空间之前，项目占据的主轴空间（main size）。默认值为 auto，即项目的本来大小。它可以是一个长度（如 200px）、一个百分比（如 50%）或 auto。

`flex` 属性的值可以是以下三种形式之一：

1. **一个非负数字**：设置 `flex-grow` 属性的值，`flex-shrink` 属性的值为 1，`flex-basis` 属性的值为 0%。
2. **一个宽度值**：设置 `flex-basis` 属性的值，`flex-grow` 属性的值为 1，`flex-shrink` 属性的值为 1。
3. **两个非负数字和一个宽度值**：分别设置 `flex-grow`、`flex-shrink` 和 `flex-basis` 属性的值。

例如，`flex: 1` 等价于 `flex: 1 1 0%`，表示项目的放大比例为 1，缩小比例为 1，基础大小为 0%。



## 4. css盒子塌陷问题

指垂直方向上的连续两个或多个盒子的接壤的margin实际显示不等于这两个margin的和，而是两个margin中较大的那个。

父子接壤的块盒子也有同样的问题。

* 设置为BFC（block formating context）：浮动元素（float:left|right）、绝对定位元素、如inline-blocks、table-cells、table-captions的非块级盒子的block容器，以及overflow属性不等于visible的block盒子（除了那些值已传播到视口的）会为其内容建立新的块级格式化上下文。
* 设置高度或者宽度





