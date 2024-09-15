# Table of contents

* [Welcome](README.md)
* [Redux](readme-1.md)
* [个人简历](jianli.md)

## css

* [替换元素&非替换元素](css/replaced-element-and-non-replaced-element/index.md)
* [分配属性值、层叠和继承](css/fen-pei-shu-xing-zhi-ceng-die-he-ji-cheng/index.md)
* [css处理模型](css/CSS-processing-model/index.md)
* [视觉格式化模型](css/visual-formatting-model/index.md)
* [你不知道的 CSS 之包含块](css/visual-formatting-model/containing-block.md)
* [盒模型](css/box-model/index.md)
* [你不知道的 CSS 之 BFC](css/visual-formatting-model/block-formatting-context.md)

## js

* [术语](js/terms/index.md)
* [属性描述符](js/property-descriptor.md)
* [Object.freeze](js/object-freeze.md)
* [Object.seal](js/object-seal.md)
* [Object.preventExtensions](js/object.preventextensions.md)
* [你不知道的console](js/ni-bu-zhi-dao-de-console.md)
* [对象中的this指向问题](js/dui-xiang-zhong-de-this-zhi-xiang-wen-ti.md)

## 浏览器

* [浏览器渲染](liu-lan-qi/render.md)
* [浏览器渲染原理](liu-lan-qi/render-new/README.md)
  * [重绘&重排](liu-lan-qi/render-new/zhong-hui-zhong-pai.md)
  * [浏览器渲染优化思路](liu-lan-qi/render-new/liu-lan-qi-xuan-ran-you-hua-si-lu.md)
  * [优化资源加载的策略](liu-lan-qi/render-new/you-hua-zi-yuan-jia-zai-de-ce-le.md)
  * [页面首屏留白问题](liu-lan-qi/render-new/ye-mian-shou-ping-liu-bai-wen-ti.md)
  * [浏览器性能指标](liu-lan-qi/render-new/liu-lan-qi-xing-neng-zhi-biao.md)
  * [js|css的不同加载方式](liu-lan-qi/render-new/jscss-de-bu-tong-jia-zai-fang-shi.md)
* [浏览器安全问题](liu-lan-qi/security/an-quan-wen-ti.md)
  * [安全沙箱](liu-lan-qi/security/an-quan-sha-xiang.md)
  * [XSS 跨站脚本攻击](liu-lan-qi/security/xss-kua-zhan-jiao-ben-gong-ji.md)
* [浏览器跨域方案](liu-lan-qi/cross-domain.md)
* [浏览器进程线程](liu-lan-qi/process-thread.md)
* [浏览器缓存](liu-lan-qi/cache.md)
* [浏览器垃圾回收](liu-lan-qi/garbage-collect/index.md)
  * [三色标记算法](liu-lan-qi/index/san-se-biao-ji-suan-fa.md)
* [浏览器事件循环机制](liu-lan-qi/event-loop.md)

## react

* [react hooks](react/hooks.md)
* [react 事件机制](react/react-event.md)
* [react fiber](react/react-fiber.md)
* [react memo](react/memo.md)
* [react 优化](react/react-optimize.md)
* [协调（Reconciliation）](react/xie-tiao-reconciliation/README.md)
  * [Legacy](react/xie-tiao-reconciliation/legacy.md)
  * [concurrent](react/xie-tiao-reconciliation/concurrent.md)

## 网络

* [http](wang-luo/http/README.md)
  * [发展历程](wang-luo/http/fa-zhan-li-cheng.md)
  * [HTTP常见状态码](wang-luo/http/http-chang-jian-zhuang-tai-ma.md)
* [cdn](wang-luo/cdn/README.md)
  * [CDN](wang-luo/cdn/cdn.md)

## 工具集合

* [性能指标工具](tools/performance-index.md)
* [console-importer插件](tools/console-importer.md)
* [depcheck插件](tools/depcheck.md)

## 实用方法

* [加解密隐藏](utilities/encode-decode.md)
* [监听localstorage变化](utilities/localstorage-change.md)
* [js设置css变量的方法](utilities/js-set-css-variable.md)
* [字符串截取问题](utilities/string-slice-bug.md)

## 面试集锦

* [css面试题合集](mian-shi-ji-jin/css-mian-shi-ti-he-ji.md)
* [假如有几十个请求，如何去控制并发？](mian-shi-ji-jin/interface-concurrency.md)
* [如何让 var \[a, b\] = {a 1, b 2} 解构赋值成功？](mian-shi-ji-jin/deconstruction-object-to-array.md)
* [深拷贝的循环引用问题](mian-shi-ji-jin/deep-copy.md)
* [大整数相加](mian-shi-ji-jin/big-number-add.md)
* [css权重比较问题](mian-shi-ji-jin/css-selector-weight.md)
* [如何不借助第三方变量完成上面的交换](mian-shi-ji-jin/exchange-variable.md)
* [符号&&](mian-shi-ji-jin/symbol-&&.md)
* [闭包的漏洞](mian-shi-ji-jin/bi-bao-de-lou-dong.md)
* [Promise相关面试题](promise-xiang-guan-mian-shi-ti.md)
* [可以重试的请求方法](mian-shi-ji-jin/chong-shi-qing-qiu-fang-fa.md)
* [css实现瀑布流](mian-shi-ji-jin/css-pu-bu-liu.md)
* [奇怪表达式](mian-shi-ji-jin/express-value.md)
* [印象中最深刻的bug](mian-shi-ji-jin/yin-xiang-zhong-zui-shen-ke-de-bug.md)
* [华为网上搜罗](mian-shi-ji-jin/hua-wei-wang-shang-sou-luo/README.md)
  * [秒杀活动防止后台崩溃](mian-shi-ji-jin/hua-wei-wang-shang-sou-luo/miao-sha-huo-dong-fang-zhi-hou-tai-beng-kui.md)
  * [订单分页，查看详情后返回，有新增订单了，改订单的位置可能不同，前后端交互](mian-shi-ji-jin/hua-wei-wang-shang-sou-luo/ding-dan-fen-ye-cha-kan-xiang-qing-hou-fan-hui-you-xin-zeng-ding-dan-le-gai-ding-dan-de-wei-zhi-ke-n.md)
  * [Page 1](mian-shi-ji-jin/hua-wei-wang-shang-sou-luo/page-1.md)
