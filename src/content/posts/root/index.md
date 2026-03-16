---
title: 站位
published: 2026-03-13
description: nothing为啥要ROOT？属于nothing的ROOT后的软件和玩法推荐
category: 工具
tags:
  - root
  - nothing
  - android
  - AOSP
  - 教程
image: ./images.png
---
======敲累了，明天再更新======

⚠️作者也是小白，如果你希望看一点深度内容就算了

本文会简单介绍本人ROOT后觉得不错的模块和一点碎碎念


从开[上期](https://pgntgz.top/posts/nothing/)结束始吧，建议也看看喵




## 爽了再说（先推荐点东西再bb）
首先最好刷个LSP
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
 不过相比uBlock Origin那种能力是有所不足的，可以在社区找更多更规则订阅，但不改动也有不少可用性，比如可以拦截pixiv广告

### Neo Backup
GPL-3.0开源[f-droid](https://f-droid.org/packages/com.machiav3lli.backup/)

**最棒的备份软件**

如果你希望换第三方OS但不想格式化后重新折腾？安装Neo Backup授予root,然后选择要备份的路径，Neo Backup可以同时备份应用和数据。在新设备还原就可以了，一次性还原资料甚至登录状态。



### 雹(Hail)
GPL-3.0[f-droid.](https://f-droid.org/zh_Hans/packages/com.aistra.hail/)

**省电神器，臃肿软件最严厉的父亲**

授权root，然后把闹得欢的软件拉清单。[ivon](https://ivonblog.com/posts/hail-freeze-android-apps/#4-%E9%9B%B9app%E4%BD%BF%E7%94%A8%E6%95%99%E5%AD%B8)的很好，我就不重复一遍了,讲了也是复述


### LSP模块们
LSP是金矿，因为有很多逆向破解模块很容易被DMCA，多是禁止宣传的。这里挑选几个没有规定且真心不错的，当然找好模块要多看

⚠️此类模块很可能导致封号

[Qfun](https://github.com/oneQAQone/QFun) GPL-3.0 QQ/TIM 功能增强模块，且可扩展

[galqq](https://github.com/yiyihuohuo/GalQQ) Apache-2.0 为QQ增加gal选项,调用llm api生成

[知了](https://github.com/shatyuka/Zhiliao) GPL-3.0 知乎去广告和功能增强




## 反叛的代价

### 代价呢？

先来说说root后要丢掉的东西
1. google play 保护机制会报完整性损坏，google不会拒绝为你提供软件，但有的应用是会的，影响最大的可能就是ChatGPT和Twitter
2. 游戏，是我的知识盲区了，pjsk是不拦截，毕竟谁会开挂打音gema。但联机游戏就不好说了，据说腾家检测最严就是了
3. 银行类，实测招商不检测，甚至在没做隐藏下会问你要su。不过google卡包也会废掉，有点肉疼。

我本人是没有做隐藏的，因为我不玩游戏不上X，而且nothing就不是游戏取向。

我的选择上500淘个二手备用性能取向机器，比如iqoo redmi这类。





### 猫鼠游戏
这里来点常见的检测软件
1. momo
2. Tricky Minotaur（GNU吉祥物是角马（gnus）！！不要叫它牛头）
3. Google paly自身
打开play商店右上角，拉到最后设置拉到版本号多次点击，打开paly商店开发者模式。然后就可以在设置里的开发者选项就可以选择检查商店完整性

这是nothing 3A在无任何隐藏下的情况表现