<!--
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-09-12 09:39:29
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-09-12 09:39:51
 * @FilePath: \jiangmengxia.github.io\wang-luo\cdn\cnd.md
 * @Description: Description
-->
CND（内容分发网络）
浏览器已经有了本地缓存的功能，为什么还需要CDN呢？CDN的意义又是什么呢？
1. 为什么需要CND？
由于浏览器的本地存储的方案（Local Storage、Session Storage、IndexedDB等）及缓存策略（强缓存、弱缓存等），都是需要首次获取到资源后才能将资源存储起来的，对于后续的资源获取会有很大的性能提升；而对于首次获取资源的性能并未有任何作用。而CDN却可以做到。
