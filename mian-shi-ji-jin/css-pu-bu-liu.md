<!--
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-09-09 22:17:24
 * @LastEditors: jiangmengxia jiangmengxia@qq.com
 * @LastEditTime: 2024-09-09 22:24:21
 * @FilePath: /jiangmengxia.github.io/mian-shi-ji-jin/css-pu-bu-liu.md
 * @Description: Description
-->
# css实现瀑布流

```css
    .container{
        display:grid;
        grid-template-columns:repeat(1, 1fr);
        grid-gap:10px;
        grid-template-rows:masonry;
    }
    img{
        width:100%; 
        display:block;
    }

```

【缺陷】
兼容性，少部分浏览器支持

https://www.axui.cn/v3/modules/2024-08-09/233.php
