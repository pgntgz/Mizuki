---
title: nothing ROOT 后编—软件推荐&简单隐藏
published: 2026-03-19
description: 属于nothing的ROOT后的软件和玩法推荐&基础root隐藏
category: 工具
tags:
  - root
  - nothing
  - android
  - AOSP
  - 教程
image: ./lsp.jpg
---

[google希望让android变成封闭系统！了解他并做些什么](https://keepandroidopen.org/zh-CN/)

⚠️作者也是小白，多是经验谈，如果你希望看一点硬核内容就算了

本文是nothing本位的教程向杂谈，会简单介绍本人ROOT后觉得不错的模块一些简单的隐藏和一点碎碎念


从开[上期](https://pgntgz.top/posts/nothing/)结束始吧，建议也看看喵
![上期](https://box.pgntgz.top/上期.png)



## 爽了再说（先推荐点东西再bb）
首先最好刷个lsp建议这个版本的[构建版](https://github.com/JingMatrix/LSPosed/actions) 当然记得打Zygisk 可以参考上期
### Iconify
GPL-3.0开源[github](https://github.com/Mahmud0808/Iconify?tab=readme-ov-file)
⚠️*部分功能尚未适配android16系统*

**ui太无聊了？Iconify适合你！**

最棒的自定义ui， 软件同时需要root授权和lsp授权，自定义几乎你能想到的所有东西，界面简单的上手就会，我就使用它给nothing原本的纯圆改成为oneui的弧度。
不过在nothing OS4+(android16)下,可能需要回退ksu版本,否则只能使用lsp功能,而且回退版本也会有失效问题


### AdAway
GPL-3.0开源[f-droid.](https://f-droid.org/packages/org.adaway/)

**无感去除广告**

 root 设备，会使用授权更新系统主机文件，该文件包含主机名和 IP 地址之间的映射列表。如果是使用非 root 设备， VPN 模式，阻止到广告和跟踪器的传出连接。
 
 不过相比uBlock Origin那种能力是要弱的，AdAway是DNS/Hosts 级别的拦截，它只能拦截域名。uBlock Origin是 内容过滤，可以写 CSS 选择器
 
 可以在社区找更多更规则订阅稍微解决这个问题，但不改动也有不少可用性，比如可以拦截pixiv广告

### Neo Backup
GPL-3.0开源[f-droid](https://f-droid.org/packages/com.machiav3lli.backup/)

**最棒的备份软件**

如果你希望换第三方OS但不想格式化后重新折腾？安装Neo Backup授予root,然后选择要备份的路径，Neo Backup可以同时备份应用和数据。在新设备还原就可以了，一次性还原资料甚至登录状态。



### 雹
GPL-3.0[f-droid.](https://f-droid.org/zh_Hans/packages/com.aistra.hail/)

**省电神器，臃肿软件最严厉的父亲**

授权root，然后把闹得欢的软件拉清单，就这么简单。[ivon](https://ivonblog.com/posts/hail-freeze-android-apps/#4-%E9%9B%B9app%E4%BD%BF%E7%94%A8%E6%95%99%E5%AD%B8) 这篇文章的很好，就不重复一遍了,我讲了也是复述一遍。雹确实是神器，我是喜欢常年把国产软件冻结用的时候解冻就是了，十分方便


### LSP模块们
LSP模块仓库是金矿，不过有很多逆向破解模块很容易被DMCA，很多是是闭源而且是禁止宣传的。这里挑选几个没有这样规定且真心不错的开源模块，当然找好模块要多看

⚠️破解类模块很可能导致封号

[Qfun](https://github.com/oneQAQone/QFun) GPL-3.0 QQ/TIM 功能增强模块，且可扩展

[galqq](https://github.com/yiyihuohuo/GalQQ) Apache-2.0 为QQ增加gal选项,调用llm api生成

[知了](https://github.com/shatyuka/Zhiliao) GPL-3.0 针对知乎的去广告和功能增强

[词幕](https://github.com/tomakino/lyricon) Apache-2.0 状态栏歌词显示增强工具


---


![我的root软件](https://box.pgntgz.top/qc.jpg)


---



## 反叛的代价

### 代价呢？

先来说说root后要丢掉的东西
1. google play 保护机制会报完整性损坏，google不会拒绝为你提供软件，但有的应用是会拒绝访问的，影响最大的可能就是ChatGPT和Twitter
2. 游戏，是我的知识盲区了，pjsk是不拦截，毕竟谁会开挂打音gema。但联机竞技游戏就不好说了，据说腾家检测最严就是了，主要防
3. 银行类，实测招商中国这类不检测，招商甚至在没做隐藏下会问你要su。不过其他家就不好说喽，而且google卡包100%也会废掉。



---

### 猫鼠游戏
首先这里来点常见的检测软件

这是酷安大佬的[分享](https://yun.139.com/shareweb/#/w/i/**2sUfBUq9He97n**) 包括大多数国内主流检测软件

下面简单介绍我在用的
1. momo
2. Tricky Minotaur
3. [Play Integrity API Checker](https://play.google.com/store/apps/details?id=gr.nikolasspyr.integritycheck) 看你的play完整性
4. Google paly自身        
打开play商店右上角，拉到最后设置拉到版本号多次点击，打开paly商店开发者模式。然后就可以在设置里的开发者选项就可以选择检查商店完整性
5. [国军mdm](https://www.milmdm.com/),虽然但可用且挺不错就是了
6. Duck Detector  见过最详细严谨的检测软件


不过毕竟猫鼠游戏，全过了也不可保证不可能被橄榄

我本人不是行家，就简单说一下个人**思路**吧


---

### 思路
首先

#### keybox
**最难的一关是keybox** nothing的tee不会熔断那一套，理论是有解的，难点是要keybox伪装,就看本事了，本人有幸在bilbil拣到过一个可以用的，Evolution X集成了相关模块，导入Evolution X就过了，原厂系统要打tricky store+play integrity fix，keybox因为难取得且google一直在封，我个人觉得是最难的一环。tg貌似有不少公开的搜索#Keybox

![keybox](https://box.pgntgz.top/keybox.png)

，不过公开的后果就是滥用导致容易过一段时间就容易挂.如果在检查完整性后看到了这样的图片，那恭喜你，keybox可用。依赖play完整性的应用是可用状态了

![恭喜你](https://box.pgntgz.top/gx.jpg)


#### 剩下的
剩下就好办了，兵来将挡，水来土掩。Zygisk Assistant消除注入痕迹，ksu本身就有隐藏再来个应用列表隐藏，keybox可用的话这就可以过google钱包了，其他检查看着办基本就没事了




## 尾巴
### 我是怎么做的？
我本人一开始是典中典刷了一大堆东西，玩momo消消乐，最后的进度是代码注入死活消除不掉，但最影响的是google play完整性认证，因为我不玩网游，这些东西所有对我就想鱼失去了自行车。毕竟nothing就不是游戏取向买7SG3我也就没想要她打游戏就是了。

后来的改善是刷了开源安卓Evolution X，自己也摸清楚一点点门道了，用了Evolution X带的欺骗（可过依赖play完整性的第三方GPT这种，但骗不了google钱包就是了）是没有做多少隐藏的.

直到走狗屎运拿到keybox，达成了🟢🟢🔴算是我的最终版本了，钱包能过了。🟢🟢🟢也见过，不过鉴于大佬不舍得分享keybox看来.....我就不奢求了。目前博主的环境是三项错误是ca证书错误（AdAway） rom和linux内核版本不对劲（大概因为开源rom） play隐藏问题，不过基本上正常使用是没问题，为此我特意装了个据说很严的三角洲，能玩。不过友友说藤是人工审核为主我就不知道了


我的建议是旧手机不丢，或者上500淘个二手备用性能取向机器，比如iqoo redmi这类。



### 完成
2026/03/13——03/19 
03/21
定型&加图&核查&上传