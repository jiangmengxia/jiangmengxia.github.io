# google 插件 console-importer

## 介绍

console-importer 是一个 Chrome 插件，用于在浏览器的控制台中导入模块。

## 安装

1. 打开 Chrome 浏览器，进入扩展程序页面（chrome://extensions/）。
2. 在右上角开启开发者模式。
3. 点击左上角的 "加载已解压的扩展程序" 按钮，选择 console-importer 的文件夹。

## 使用

1. 打开一个网页，进入控制台。（按 F12 键或右键点击页面选择 "检查"）
2. 在控制台中输入 `import` 命令，后跟模块名。例如，`import('https://example.com/module.js')`。
3. 模块将被导入到控制台中，可以使用 `module` 变量访问它。

## 注意事项

1. 请确保模块的 URL 是可访问的，否则导入将失败。
2. 模块将被导入到控制台中，但不会影响页面的其他部分。

参考：
https://www.showapi.com/news/article/66adaca04ddd79f11a00e7ee