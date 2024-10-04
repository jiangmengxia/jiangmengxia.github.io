# 性能面板（Performance）

先录制，后分析，分析网络、CPU、内存、渲染FPS帧率，用于定位、解决页面性能问题。

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2FHKLRA9OW86OuVaN8kQU1%2Fimage.png?alt=media&#x26;token=aed1444d-697a-4e15-90b1-58c3d2ae204b" alt=""><figcaption></figcaption></figure>



> **🚩特别提示**：调试性能建议在**无恒模式**下进行，尽量避浏览器插件的影响。包括其他异常Bug的调试，也要考虑浏览器插件问题，之前就遇到过类似问题，页面上一个Bug怎么也复现不了，几经波折才发现是测试机上的油猴插件的影响。

## **性能监视器**（Performance monitor）

该面板可以**实时**的监控页面性能参数。

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2FWJrX7xiheDOxD6TnkYSI%2F%7B229A1DC2-DD34-42DB-AB26-ED4C4B945547%7D.png?alt=media&#x26;token=23584e34-1a2d-43f7-8886-93843ce6d56e" alt=""><figcaption></figcaption></figure>

## **Lighthouse**

对页面进行综合分析，包括性能、PWA（Progressive WebApp，渐进式Web应用）、SEO、无障碍访问等，分析完后产出报告，给出得分，还给出了页面改进建议。

点击![](<../../../.gitbook/assets/image (57).png>)打开下拉弹窗，选择“Show Console Draw”则打开底部的“控制台抽屉”，可以通过More Tools打开`Light House` Tab。

如下如，light house 的分析涉及：

* 三种<mark style="color:red;">模式</mark>，分别是“Navigation(default)”，“TimeSpan”，“SnapShot”
* 两种设备可选：Mobile、Desktop
* 四种类目：<mark style="color:red;">性能、可用性、最佳实践、SEO</mark>

根据特定模式、设备、类目，可以生成对应分析的报告，点击“Analyze Page load”则会触发自动化分析。

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2FAnatukYPzi0pdTfuHBVq%2F%7B7DCBB127-E176-4A66-8453-A529E9A8DBD4%7D.png?alt=media&#x26;token=2ec793b8-f14c-4e89-9ddb-abc8bfc40d3d" alt=""><figcaption></figcaption></figure>

分析成功后，则会自动生成报告。点击右侧![](<../../../.gitbook/assets/image (58).png>)，可选择导出、打印、open in Viewer 等多种方式处理报告。

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2FqzilULfPRUpyzxb4i1sp%2F%7B05589BEF-06B7-40B6-924B-D4A119E24CFE%7D.png?alt=media&#x26;token=57d779fb-738b-4266-bcc9-531620ccbccf" alt=""><figcaption></figcaption></figure>

下面给出一份完整**Navigation(default)**模式的报告：

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2F5oOL7bbJ0m7YIcjEn90x%2Fgooglechrome.github.io_lighthouse_viewer_.png?alt=media&#x26;token=c2bcce78-5c4c-463e-a580-3eb05893b5b6" alt=""><figcaption></figcaption></figure>



## Light house 之 performance

报告中，我们看到Performance的几个度量指标，其中部分指标也就是[量化指标](../../../qian-duan-xing-neng-you-hua-gong-cheng-hua/zhi-biao-xian-xing-shu-ju-qu-dong/webvitals-liang-hua-zhi-biao.md)所提到的一样。

### Performance度量指标 FCP

First Contentful Paint（首次内容绘制，简称 FCP）是 Lighthouse 性能评估中的一个指标，用于衡量网页内容的可见性达到用户可交互状态的速度。它是一种基于时间的度量，反映了用户在等待网页加载时看到的内容量。

FCP 的值越小，表示网页内容的可见性达到用户可交互状态的速度越快。这意味着用户可以更快地开始与网页交互，从而提高了用户体验。

Lighthouse 使用一种称为 `"First Meaningful Paint`"（首次有效绘制）的方法来计算 FCP。这种方法会跟踪网页内容的变化，并计算从网页开始加载到主要内容开始显示的时间。

在 Lighthouse 报告中，FCP 的值会显示为一个时间，单位为毫秒。时间越短，表示网页的性能越好。Lighthouse 还会提供一些优化建议，帮助开发者改进网页的 FCP 值，从而提高用户体验。



Speed Index 是 Lighthouse 性能评估中的一个指标，用于衡量网页内容的可见性达到用户可交互状态的速度。它是一种基于时间的度量，反映了用户在等待网页加载时看到的内容量。

Speed Index 的值越小，表示网页内容的可见性达到用户可交互状态的速度越快。这意味着用户可以更快地开始与网页交互，从而提高了用户体验。

Lighthouse 使用一种称为 "First Meaningful Paint"（首次有效绘制）的方法来计算 Speed Index。这种方法会跟踪网页内容的变化，并计算从网页开始加载到主要内容开始显示的时间。

在 Lighthouse 报告中，Speed Index 的值会显示为一个分数，范围从 0 到 1000。分数越低，表示网页的性能越好。Lighthouse 还会提供一些优化建议，帮助开发者改进网页的 Speed Index 值，从而提高用户体验。

### Performance度量指标-LCP

Largest Contentful Paint（最大内容绘制，简称 LCP）是 Lighthouse 性能评估中的一个指标，用于衡量网页内容的可见性达到用户可交互状态的速度。它是一种基于时间的度量，反映了用户在等待网页加载时看到的内容量。

LCP 的值越小，表示网页内容的可见性达到用户可交互状态的速度越快。这意味着用户可以更快地开始与网页交互，从而提高了用户体验。

Lighthouse 使用一种称为 "First Meaningful Paint"（首次有效绘制）的方法来计算 LCP。这种方法会跟踪网页内容的变化，并计算从网页开始加载到主要内容开始显示的时间。

在 Lighthouse 报告中，LCP 的值会显示为一个时间，单位为毫秒。时间越短，表示网页的性能越好。Lighthouse 还会提供一些优化建议，帮助开发者改进网页的 LCP 值，从而提高用户体验。

### Performance度量指标-TBT

Total Blocking Time（总阻塞时间，简称 TBT）是 Lighthouse 性能评估中的一个指标，用于衡量网页内容在用户可交互状态之前的等待时间。它是一种基于时间的度量，反映了用户在等待网页加载时看到的内容量。

TBT 的值越小，表示网页内容的可见性达到用户可交互状态的速度越快。这意味着用户可以更快地开始与网页交互，从而提高了用户体验。

Lighthouse 使用一种称为 "First Meaningful Paint"（首次有效绘制）的方法来计算 TBT。这种方法会跟踪网页内容的变化，并计算从网页开始加载到主要内容开始显示的时间。

在 Lighthouse 报告中，TBT 的值会显示为一个时间，单位为毫秒。时间越短，表示网页的性能越好。Lighthouse 还会提供一些优化建议，帮助开发者改进网页的 TBT 值，从而提高用户体验。

### Performance度量指标-CLS

Cumulative Layout Shift（累积布局偏移，简称 CLS）是 Lighthouse 性能评估中的一个指标，用于衡量网页内容在加载过程中发生的布局偏移。它是一种基于时间的度量，反映了用户在等待网页加载时看到的内容量。

CLS 的值越小，表示网页内容的可见性达到用户可交互状态的速度越快。这意味着用户可以更快地开始与网页交互，从而提高了用户体验。

Lighthouse 使用一种称为 "First Meaningful Paint"（首次有效绘制）的方法来计算 CLS。这种方法会跟踪网页内容的变化，并计算从网页开始加载到主要内容开始显示的时间。

在 Lighthouse 报告中，CLS 的值会显示为一个分数，范围从 0 到 1。分数越低，表示网页的性能越好。Lighthouse 还会提供一些优化建议，帮助开发者改进网页的 CLS 值，从而提高用户体验。

## LightHouse 之 Accessibility（无障碍功能）

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2Fh6nrt9AdDCZD7IoMfZwZ%2F%7BFEACC537-378F-42B8-8B30-5189BCD75D03%7D.png?alt=media&#x26;token=5489dc86-8e90-486a-ae1f-20226e9d6301" alt=""><figcaption></figcaption></figure>

## LightHouse 之 Practices

其中“<mark style="color:red;">`Uses deprecated APIs`</mark>”提示使用了弃用的接口

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2FvzhjCJ1M26ZIhmAza2p8%2F%7B0D148A8D-3E70-41C6-8837-1709C083FAF9%7D.png?alt=media&#x26;token=bb884e48-5cd6-43f6-abe4-fa52af7f9a49" alt=""><figcaption></figcaption></figure>

## LightHouse 之 SEO

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzE1TQFEn6QauV49FDUgh%2Fuploads%2Fdcyrq0nuZpuMDMo1LrzG%2F%7B82330897-E570-4D02-8697-852AC7E9E6A8%7D.png?alt=media&#x26;token=5004232d-144b-49a0-82a5-de713ed3b394" alt=""><figcaption></figcaption></figure>



参考：

&#x20;[https://developer.chrome.com/docs/lighthouse/overview?hl=zh-cn](https://developer.chrome.com/docs/lighthouse/overview?hl=zh-cn)
