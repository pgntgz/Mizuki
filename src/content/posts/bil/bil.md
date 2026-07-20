---
title: android哔哩哔哩版本评测&推荐
published: 2026-05-24
description: bilibili包括官方支持和第三方的全面评测
category: 推荐
tags:
  - 教程向
  - 开源替代
  - 长篇
  - android
image: https://box.pgntgz.top/posts/bil/-9lddQkk6-ewcxK10T3cSr0-k8.avif
---
首先，如果SEO恢复正常(*本站的Google SEO权重尚未超越我的osu！账号，很明显Google觉得相比技术问题，看我的osu！又[[v3]]拿了几个D更棒*)的话，这篇的看客不少应该只想看答案，我就先结果后测评吧

免责声明：
以下打分完全凭本人喜好，图一乐
设备基准只在android手机上的情况，基准时间是发布时间

| 版本   | 官方版         | 旧外版             | pilpala            | piliplus   | bilimiao         | BiliPai   |
| ---- | ----------- | --------------- | ------------------ | ---------- | ---------------- | --------- |
| 综合   | 4           | 6               | 5                  | 8          | 6                | 8         |
| 维护   | 良好          | 死了              | 稳健                 | 积极         | 稳健               | 积极        |
| 自由度  | 想啥呢         | 想啥呢             | 新版不开源              | 开源（GPLv3）  | 开源（GPLv3）        | 开源（GPLv3） |
| 致命缺点 | 性能最差劲软件极度臃肿 | 无新版本推送CDN速度经常抽风 | 维护放缓，cdn抽风，弹幕缓存bug | ——         | 特别的UI逻辑          | ——        |
| 特点   | 官维，最佳cdn    | 可开启无审查弹幕        | 没啥，但该有都有           | pilpala激进版 | 特别的UI逻辑，时光机（原功能） | 独立，完善     |
## 选择之道
下面到正文了，就又可以开扯了。

### 为何选择
1. **广告**，其实要盈利是很正常的事情，BUT**这不是无休止广告的理由**[duckduck这类企业说明了不收集用户隐私卖广告不冲突，甚至更有效](https://duckduckgo.com/duckduckgo-help-pages/company/how-duckduckgo-makes-money)，再看看B站的呢？*哦，对了，如果你看习惯了YT湾友视频，把系统语言调整为中文繁体，广告基本就全没了。*
2. **内广**，[^1]叔叔把钱全拿去投资傻卵二次元手游了，B服游戏靠用户体量疯狂增值的同时，B站的创作收入降到主流平台最低。只导致不想饿死只能商业化，现在随便找一个10m分钟以上的视频，必有商单。我喜欢的UP做的长视频就算了，**完全不认识甚至做短视频的ylg都打内广——一堆不到一分钟的AI农场也打内广属实幽默了**
3. **算法**，web和app不是一套推荐算法，我感觉app推荐明显更弱智，网页端几乎找不到音乐之外的3分钟下视频。还有b站在某版本后就彻底砍掉了完全无审查弹幕。诚然，B站的垃圾弹幕越来越多，但在很多政治向视频中这是需要的。
4. **UI** 说实话，B站的UI在国内的软件里算是比较好的了，不过在一次次更新中真的越来越烂，特别是首页，长视频只打了一个小小竖屏tag的短视频，还有剧集直播基本没有任何区别，简直反人类。而且我是MD3控，B站到现在还没有兼容动态色彩。
### 如何选择
我觉得对我自己使用体验影响最大的是以下几点，也是我的侧重点
1. 去广告——起码去除牛皮藓
2. 去内广——接入[空降助手](https://www.bsbsb.top) 
3. web算法——少来点AI农场
4. 更好的UI（⚠️很大程度只是我的个人喜好）

## 开始评测！
原版B就不介绍了，从白B开始
### 白B
![白B](https://box.pgntgz.top/posts/bil/photo_2026-05-23_19-18-32.avif)
#### 介绍

包名：com.bilibili.app.in

白标B是早年B站上架Google play面向海外的版本，已经下架了。
连接：
鉴于获取有点麻烦，我放个资源链接吧，不过防止滥用，所以在直链我把后缀改了，且R2账单爆了我就删掉了，反正咱小博客。推荐还是用Google硬盘吧
[R2直链](https://box.pgntgz.top/%E7%99%BDB) [Google硬盘](https://drive.google.com/file/d/1F0L6w8kgtcaRo9_ctdQ9MZ9YzKc3tH3d/view?usp=drive_link)

#### 评测
1. 良好，基本去除广告
2. 无
3. 没有，且有短视频模式
4. 原版UI
负面：
 - CDN抽风
 
额外：白B拥有无审查弹幕，虽然也被藏在很深层的菜单里面（设置>播放设置>弹幕/字幕设置>弹幕优选）

#### 总结
白B是我用的最长时间的版本，一直到停止维护后，我明显感觉到了CDN经常抽风，经常在网络环境质量都没有问题的情况下缓冲半天。白B依然有很强的可用性，使用逻辑和原版几乎一模一样，适合不想改变太多来提升使用体验的使用者。但没有防内广是一个硬伤。

### pilpala
![pilpala](https://box.pgntgz.top/posts/bil/photo_2026-05-23_19-18-58.avif)
#### 介绍

使用 Flutter 开发的 BiliBili 第三方客户端

包名com.guozhigq.pilipala
链接：
[github发布](https://github.com/guozhigq/pilipala/releases/tag/v1.0.27.**0402**)
[网站](https://pilipala.life/)
#### 评测
1. 无广告
2. 接入但有BUG
3. 有
4. MD3 UI

负面
- CDN抽风
- “继承弹幕”——上个视频的弹幕继续显示
- 版本混乱——f-d google play github各上各的
- **[SponsorBlock](https://github.com/hanydd/BilibiliSponsorBlock)** 接入有问题，提前跳转。甚至插件贡献榜第一叫这个。不过piliplus貌似已经修好了但pilpala貌似还是这样
![pilpala](https://box.pgntgz.top/posts/bil/screenshot-2026-05-24_16.25.51.webp)
#### 总结 
pilipala是我逃离B站原版后的第一个版本，Flutter使得它具有MD3动态色彩，颜值功能性啥的都比正主强，我觉得是简单好用感觉是最适合无脑冲的版本。事实上大概也是从主站抢走最多的。以至于25年7月被叔叔哈气[^2]律师函。开发受到影响实际导致也有不少问题。其中版本混乱是最严重的。现在最新版已经停止开源。分发平台上F-D更新于 2024-12-21，google paly2025年1月24日。所以链接我只放github

### piliplus
![piliplus](https://box.pgntgz.top/posts/bil/photo_2026-05-23_19-20-10.avif)
#### 介绍
使用 Flutter 开发的 BiliBili 第三方客户端，“pilpala plus”
链接：[piliplus](https://github.com/bggRGjQaUbCoE/PiliPlus/releases/tag/2.0.7.2)
#### 评测
1. 无广告
2. 良好
3. 有
4. MD3 UI

负面：
还真没啥明显问题
#### 总结
piliplus给人的感觉是经典的“激进版”是我现在在用的方案，piliplus加了免责声明防律师函，Flutter开发UI类似pilpala事实上贡献者也是有不少重合。事实上在我打稿的现在piliplus star已经超越了pilipala。piliplus也已经成熟到配的上第三方B站一哥的地位。追加的许多功能超棒，比如切换匿名，自定义CDN等等，我个人觉得，如果有人叫我推荐一个第三方B，我会毫不犹豫的推荐他。
### bilimiao
![bilimiao](https://box.pgntgz.top/posts/bil/photo_2026-05-23_19-18-31.avif)
#### 介绍
原为哔哩哔哩时光机，随着功能加来加去，事实上已经是了第三方B站
[github](https://github.com/10miaomiao/bilimiao2/releases/tag/2.4.8.1)
[F-D](https://f-droid.org/packages/com.a10miaomiao.bilimiao/)
[开发者bolg](https://10miaomiao.cn/project/bilimiao)
#### 评测
1. 无广告
2. 无
3. 真—自定义推荐流
4. MD3独特UI

负面：
本来作为时光机所以在功能上还是有些欠缺。

#### 总结
不过绝对是可用而且很不错的那一档就是了。bilimiao的UI看上去有些奇怪，但上手体验意外的直觉和舒适.作者也承认后经不断改进，功能不断完善，形成了一款安卓上的哔哩哔哩的第三方APP。
### BiliPai
![BiliPai](https://box.pgntgz.top/posts/bil/photo_2026-05-24_15-40-43.avif)
#### 介绍
**原生、纯净、可扩展的第三方 Bilibili Android 客户端**
链接[github](https://github.com/jay3-yy/BiliPai/releases/tag/8.3.9)
#### 评测
1. 无广告
2. 良好
3. 有
4. MD3+Liquid Glass

负面：
还真没啥明显问题
#### 总结
BiliPai大刀阔斧的没有沿用pilpala的设计，是一个生命力堪称旺盛的项目，更新激进到甚至一天一更。不过说实话BiliPai的Liquid Glass设计我不是很喜欢。哪怕可以在外观设置上改成安卓原生的MD3他的UI我还是不太喜欢。不过萝卜青菜各有所爱。我还是给了piliplus一样的8分。
后：
更新快到什么程度？我偷懒后打截图结果发现UI大改了。。。。

## 私货
bilibili可以说是对我影响最大的网络平台，时间上我在小学时期就开始用了，2022见证封了我的5级号。作为不喜欢投币的人到3年就能回到5级，可见我的使用频率是真的超重度。

我自己本身经历了一堆改款。我刚用时候的样子已经有点模糊，只是记得评论很有趣，比西瓜有幽默感多了。还有就是b站评论没有图片，我一开始觉得不好用，这样我没法在评论发我的mc大战迷你世界表情包（feta.暴走p图）。对了，B站是大孩子玩的，所以他们视频没法刷（虽然当时西瓜，好看，优酷一览子平台其实也都对短视频不感冒）

后来嘛？记得初中某一天放学，然后发现b站有的视频多了一个**竖屏标签**

B站一开始的竖屏视频是必须在首页找到带有竖屏标签的视频进入后才是刷视频的UI。这个模式好像坚持了一段时间就变成现在这样左上角有一个统一入口了。

后来吗？一天突然在评论区发现一个打了笔记tag的图片——B站可以在评论区发图片了。一开始是说这是笔记功能的附加，只有买了大会员可以让图片外显，不然必须进入二级菜单才能看到图。现在已经大大方方承认自己是图片评论了。评论区一堆一堆垃圾表情包和见证b传统手艺大字报泛滥，现在我十分理解当年B站不让我发HIM暴打古振兴的原因了——真的具烦人，真的没人喜欢你们的幽默感。

我很喜欢MHYYYY的一个观点：
任何一个拥有1亿以上用户的社交平台，他就只能代表主流价值观。

B站在更多吸引用户成为主流平台，的同时用户大众化和核心用户流失是几乎必然的结果。

大众化？中国的城乡差和“ipad kids（中国更多是phone kids）”有多严重咱也不要装外宾了。冲击的必然结果就是来点友邦惊诧be like：


<iframe width="100%" height="468" src="//player.bilibili.com/player.html?bvid=BV1wZ9ZBME13&autoplay=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" &autoplay=0> </iframe>



以至于老资历这种典中典神曲梗竟然成了神曲被偷的心梗中最出名的一个。表情包引入直接导致文字描述变得苍白。图片传播的情绪远远强于文字，而且B站不允许二级评论加图片。直接有效降低我的辩论欲望，而且长篇的辩论难以审查关键词，更容易莫名其妙被删除。

至于叔叔呢，B站是知乎后国内最佳的创作者平台，靠优秀创作者狠狠引流给傻卵子二次元手游一面把创作激励砍的。甚至在不走YT模式下盈利了都。另一面，不走yt模式，结果就是平台不走作者走，在随便找一个10m分钟以上的视频，必有商单。甚至短视频差不多了，闲鱼，得物，爱回收，神奇小鹿，按摩枕，鱼油..........总有一款是适合你的。以至于SponsorBlock唯一外平台的分支就是SponsorBlock for Bilibili。

另一面B站的技术迭代也是堪忧，APP没有MD3啥的兼容就算了，你能想象“最强年轻人平台”web端的黑夜模式甚至今年才出而且写稿子时还是“内测”有钱搞什么ai总结和同声字幕没钱加点码率&多发激励。
![yt w-50%](https://box.pgntgz.top/posts/bil/screenshot-2026-05-26_21.40.17.webp)
![b w-50%](https://box.pgntgz.top/posts/bil/screenshot-2026-05-26_21.41.40.webp)
令人感叹

完。

注：
编辑完成：05/24
图片不足
私货不足
会大更一次
5/26
可能要更多图片

[^1]: https://zh.wikipedia.org/wiki/%E5%93%94%E5%93%A9%E5%93%94%E5%93%A9%E6%8A%95%E8%B5%84%E5%88%97%E8%A1%A8

[^2]: [新闻](https://finance.sina.com.cn/tech/discovery/2025-07-18/doc-inffwynk4031785.shtml)
