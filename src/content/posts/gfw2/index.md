---
title: GFW和代理工具的发展史（下）
published: 2026-07-31
description: 上期的下篇，从ss开始吵出来的我们的时代的基石，构筑我们的理所当然的代理项目——V2ray，Clash，sing-box的发展史和6月GFW严打的回顾。
category: 技术
tags:
  - 长篇
  - 代理协议
  - 开源替代
image: https://box.pgntgz.top/posts/gfw/gfw.webp
---
### 引言
事实上这期更新不是在一个好时机，我以为还是回到常态的，但是这种状态一直维持到了现在依然没有回到以前的感觉，不过一直拖着也不是改事情我不打算鸽了。OK，不啰唆了。

这一篇是[上篇](https://pgntgz.top/posts/gfw/gfw/) 的延续，如果没有看上篇估计会一头雾水的。

## 普通和理所当然
>ふつう”とか“あたりまえ”ってなんだろう

虽然我不看MYGO和邦的一堆企划，但这句话用在这里确实再合适不过了。

SS后的岁月大概就是我最熟悉的“理所当然”的时间，这段时间和理所当然的记忆也定会写入我们这代人的DNA之中。同样离开了远古时期，这个时期的资料好找的程度直线上升，这一篇的写作比写上一篇简单太多了。

### 特化
这里我就不当史官了，有的是文章写的比我好[比如这一篇](https://shadowsockshelp.github.io/Shadowsocks/Shadowsocks-wiki.html) 就比我高到不知道哪里去了。
现在大家都知道翻墙用的是特化的抗审查协议，和一般商业公司推出的为了正常国家网民匿名性的VPN协议是有区别的，商业VPN通常在国内不生效（比如NordVPN啊mullvad啊）

而简单概括一下就是SS前的代理手段比如OPENVPN啊或者直接SSH都是比较原始的，这篇GAE暴死后的[^1]文章提到的PPTP / L2TP / SSTP / OpenVPN都是普通的企业 VPN 协议。而占据推荐C位的就是主角shadowsocks。

![Pasted image 20260801152907](https://box.pgntgz.top/posts/gfw2/Pasted%20image%2020260801152907.webp)
SS相比一般的代理协议主要有这些区别：
- 协议头完全随机：传统的 VPN 连接，握手时依然会主动报告协议等信息，SS则改成了客户端把目标地址加密到服务端解密
- 拆分架构：相比传统协议直接修改系统的全局网卡配置，SS是工作在应用层级的
- 加强加密属性：SS大量采用了`AES-256-CFB` 或 `RC4-MD5` 这类对称流加密算法。比非对称高效和轻量的同时保留了加密的抗审查能力。
- 支持 UDP：UDP支持的加入极大提升了用户体验

当然我关键的是传统的协议大都是企业维护的（比如SSTP和L2TP都是微软的），而SS直接用开源了。使得优秀的特性可以得到合并。而带来的效果就是**审查的收益变小**
#### 无懈可击
GFW的维护需要政府实打实的雇佣专业的网络安全团队盯着识别特征。而开源的SS维护者都是用爱发电。而除非GFW拆掉或者干脆切断所有对外连接的光缆，永远都会有这个需求并且产生实现者。而乐观来说计算机和衍生的一切都是0和1。计科是有极限的学科，所以总有一天会面临的就是代理协议到达一个完美的点。GFW的的识别和封锁则变得极其没有性价比。

[^2]事实也的确如此，这一切的开始clowwindy本人在GAE被封SS高歌猛进的2015年8月22日被相关部门约谈，随后其锁推并且停止了SS的维护工作。不过正如文泉驿的标语“ **开彼源兮，斯流永继**”。SS带来的时代已经到来了，不会也不可能会因为一次抓捕行动就回去。

### 争议
首先就是clowwindy本人的一些争议，clowwindy的时代和西厢计划那个时代不同，互联网普及使得网民人均数码素养降低，clowwindy发布SS导致了一轮"github热"，一堆毫无数码素养的伸手党搞得clowwindy很😅，[^13]

这使得clowwindy神友人格大爆发，发了不少暴论比如：

> 从这些提问可以看出，大部分人的自理能力都很差，只是等着别人帮他。特别是那些从 App Store 下载了 App 用着公共服务器的人，经常发来一封只有四个字的邮件：“不能用了？”
> 
> Windows 版加上 GFWList 功能以来，**我反复呼吁给 GFWList 提交规则，但是一个月过去了竟然一个提交都没有**。如果没有人做一点什么，它自己是不会更新的啊，没有人会义务地帮你打理这些。
> 
> 那是自然的咯。这边加了什么功能，它马上扒过去合并了。它那边加了什么却不会贡献出来给其他人用，久而久之，不就是它那边功能更多了吗........不尊重 GPL 就算了，把作者名字换成自己的，还在主页上加上官方的字样。为什么我们这边反而不说官方呢？（指SSR）
> 
> **最适合这个民族的其实是一群小白围着大大转**，大大通过小白的夸奖获得自我满足，然后小白的吃喝拉撒都包给大大解决的模式。
> 
> 这是一个造了几千年墙的保守的农耕民族，缺乏对别人的基本尊重，不愿意分享，喜欢遮遮掩掩，喜欢小圈子抱团，大概这些传统是改不掉了吧。

![Pasted image 20260801163028](https://box.pgntgz.top/posts/gfw2/Pasted%20image%2020260801163028.webp)
不过我是觉得表达政治的权利的，更何况情形是自己辛辛苦苦搞得SS被SSR用了还被无视许可证不开源，我是觉得我要是clowwindy估计骂的比他脏。

其实“翻墙娱乐圈”后来的种种不好的事情可以说也算是被clowwindy预言了原因

上文提到的SS和SSR的撕逼则更知名一点，简单来说就是

SS逐渐被GFW识别，开发者breakwa11主张通过复杂的“混淆（OBFS）”来对抗 GFW，clowwindy不同意他坚持SS要轻量。结果就是breakwa11 fork了ShadowsocksR。
![Pasted image 20260801162235](https://box.pgntgz.top/posts/gfw2/Pasted%20image%2020260801162235.webp)
<center>*breakwa11的推特*</center>
fork是开源常事，本来没啥，不过幽默的是breakwa11直接无视了Shadowsocks是GPLv3授权的，SSR用了SS就必须也用GPLv3公开源代码，开始早期breakwa11只发布SSR的二进制。到后面被指责是偷窃代码才开源。

SSR的技术上一样争议不断——SSR 引入了混淆功能，试图将流量伪装成普通网页访问被很多人认为是画蛇添足，反而更容易被GFW通过机器学习识别。反倒是大量被用于欺骗运营商免流量这种不道德的用途。

2015年8月22日clowwindy喝茶后，SSR哪怕失去了对手依然日子不好过，因为project V带着VLESS无缝衔接了，SSR还是没法占据市场。

结果到了2017年，breakwa11整了个大活——2017 年 7 月，breakwa11 发布了一个闭源的“SS 被动检测程序”，声称可以探测 SS 服务器，引发了大伙对于她投靠GFW和对SSR投毒的猜忌和恐慌。结果求仁得仁，恶俗TV对breakwa11使用了盒打击。

至于SS和SSR到底谁更先进这个问题？我是站Shadowsocks的——Shadowsocks在clowwindy喝茶后还是有开发者接盘搞了Shadowsocks2022，SS2022到了今年的大洪水还可用了很长时间。至于SSR？啥都要支持下的全能王sing-box甚至拒绝支持SSR。

## 何以理所当然

SS而后各种的代理协议和客户端涌现，基本有了现在的雏形。比如把代理服务的提供商叫作机场这个习惯就是来自shadowsocks的客户端LOGO是一个飞机，嫌弃shadowsocks太长，慢慢有人叫飞机，代理服务的提供商也就顺理成章的被叫作了机场。不过SS和SSR掐架属实开了个坏头。



![Pasted image 20260727213633 w-30%](https://box.pgntgz.top/posts/gfw2/Pasted%20image%2020260727213633.webp)
<center>*SS客户端LOGO*</center>

[^3]周恩来曾说：“中央政治局的中央政治就是处理好毛主席、林副主席、江青同志的关系”

我个人的体感是SS后的代理主要就是这V2ray,clash,sing-box3个项目和其衍生的历史。无数前赴后继的开源贡献者构筑了我们所熟悉的理所当然的现在。

### V2ray
SS之后各种优秀的代理客服端层出不穷。

2015年的发起的project V带来了大名鼎鼎的V2Ray和VMess系列协议。
![Pasted image 20260727214323](https://box.pgntgz.top/posts/gfw2/Pasted%20image%2020260727214323.webp)
<center>*V2ray*</center>
V2ray有两次重要的转折，[^5]分别是2019年创始人Victoria Raymond失联导致主仓库因为权限问题无法正常维护，创建了**V2Fly** 承担项目维护。（改名的只有github仓库，所以以下仍叫V2ray）
#### 开源肥皂剧
更著名是2020 年，开发者 **RPRX** 在 V2Ray 中推出了革命性的增强版传输协议 **XTLS**。XTLS的问题是RPRX因为讨厌自己的软件被魔改坑钱自己写了个协议分发XTLS也就是**XTLS-1.0 许可证**。该许可证带有“禁止用于商业滥用/限制某些行为”和“”的附加条款，而无论[^6]FSF和OSI都禁止这么做。
![Pasted image 20260801142419](https://box.pgntgz.top/posts/gfw2/Pasted%20image%2020260801142419.webp)
<center>*OSI的标准*</center>
[^7]这导致V2ray负责Debian维护的rogers0不干了，请求RPRX更换符合OSI标准的许可证，因为这会导致Debian拒绝接着合并有不自由的XTLS的V2ray到自己的主仓库——Debian仓库有软件必须符合开源标准的原则：

> Dear maintainer, 尊敬的维护者，
> 
> Since this library is the new dependency for v2ray, which is already in debian/ubuntu.  
> 因为这个库是v2ray的新依赖，而v2ray已经存在于debian/ubuntu中。  
> If we cannot upload this xtls library, we have to discontinue supporting v2ray in debian/ubuntu, and this is a big loss to the community.  
> 如果我们无法上传这个 XTLS 库，就必须停止支持 Debian/Ubuntu 中的 v2ray，这对社区来说是个巨大的损失。
> 
> I'm sorry to hear the appended part of this library is not licensed under BSD, or other open source license.  
> 很遗憾听说该库附录部分未受BSD或其他开源许可。  
> I hope you can reconsider this sometime ahead.  
> 希望你能在未来某个时候重新考虑这件事。
> 
> Cheers, 谢谢，  
Roger 收到

对此RPRX则觉得“至少任何人都还是可以审计 XTLS 的代码，所以这里没有风险。”“下游的开源协议对上游的确没有约束能力”“主项目已经从MIT欢了更严格的BSD”甚至为气血上头说“**Debian 的人都这么流氓吗？** 不好意思，**我本来就更喜欢 Red Hat 系**”有旁人提醒说“作爲一個 Fedora/openSUSE 使用者，我認爲你的這則回覆是在給 RPM 系發行版抹黑”结果RPRX暴脾气上来直接引用回复“我认为你哪凉快待哪去。”

暴论一出，本来只是关于许可证的讨论引发了由此的一连串争论彻底**上纲上线**，最后在issue 9爆发了这场肥皂剧。

反对的维护者觉得RPRX这是意识形态幼稚病，因为V2ray是自由软件，你换啥许可证上什么发行版都无所谓，但是是不允许修改它的源代码并二次分发这**一条款使得V2ray项目不是开源软件**了。现在已经导致了有相关规定的仓库无法合并后续版本，难受无辜一般使用者。

再说了改许可证不能达到你想要的效果，——开源协议是君子协定，只在法制下有强制力。没有道德到用你到软件恰烂钱的人还会在意你的许可证？

而且哪怕从功利主义上讲。V2ray已经失去了前任维护者而被迫把仓库改叫V2Fly，这次可以合法的转生在于整个项目都是MIT协议授权的，现在**万一你没了那么甚至没有第三方能在合法的情况下接手V2ray的开发**、因为你写的协议禁止了修改和二次开发。

[^8]RPRX则因为气血上头发表了一些很败坏路人缘的反驳，表示自己辛辛苦苦写的软件爱用什么许可证用啥，况且自己都不用GNU/Linux，不在意你们因为这些B事情要拒绝合并。


#### 分裂
结果就是RPRX一时的嘴快犯了社区的众怒，虽然大多数看热闹的人无所谓普遍更支持RPRX。甚至已经有人奇异搞笑的要把Debian的人打为间谍了。

![Pasted image 20260731203254](https://box.pgntgz.top/posts/gfw2/Pasted%20image%2020260731203254.webp)
<center>*按5%的指标抓间谍！*</center>
但是说到底客观上**模糊不清的许可证问题对于V2ray的开发工作是颗大雷**，最终V2ray维护者们还是经过投票确认XTLS不符合V2ray承诺遵守的MIT协议，并在V2ray-core 4.33.0版本移除了XTLS。RPRX则带着XTLS自己建立了project X。
![Pasted image 20260801142627 w-30%](https://box.pgntgz.top/posts/gfw2/Pasted%20image%2020260801142627.webp)
<center>*project X*</center>
不过幽默的是RPRX后续还是妥协了，还是在project X把许可证换成了符合OSI标准的MPL-2.0。大批GUI客户端这才开始放心的把内核换成更优秀的X-core，XTLS的优秀特性至此才真正面向大众。X-core逐渐取代V2ray成为V2ray系主流。

不过这场肥皂剧的的确确导致了开源社群的无法弥合的撕裂，比如说至今Debian主仓库只有V2ray没有X-core——至今无人愿意担任X-core在debian的维护者。且分家之后无论V2ray还是Xray都在逐渐式微，作为后起之秀的Clash凭借简单的特性逐渐取代其在客户端的地位，V2ray和Xray主要面向服务端，在sing-box之后两者的服务端也在收缩。


### Clash
而大家熟悉的GO写成的“小猫咪”Clash于 2018 年前后在 GitHub 上开源。在V2ray的分裂中Clash依靠简单稳定的特性迅速崛起，一路高歌猛进长期是最受欢迎的代理核心。
![Pasted image 20260727214354 w-30%](https://box.pgntgz.top/posts/gfw2/Pasted%20image%2020260727214354.webp)
<center>*clash*</center>
Clash的开发中没有发生许可证的闹剧，早期Clash是MIT后面换了GPL。不过Clash同样遭遇过这样的悲剧——Clash删库

相比V2ray分裂Clash经历的删库时间更加著名。不过相对V2ray，Clash删库事件更加简单，是一出**三人成虎的闹剧**

[^9]根据当时还是民小区的太监区的讨论，起因是2023 年 11 月 2 日Clash一个客户端Clash For Windows（以下简称CFW）的维护者因为自己个人信息保护意识（据说发车牌生活照甚至收款码）不足挨了铁拳。

本来其实伤害不是很大，毕竟Clash核心正常维护就好，CFW本来就是完成状态的，开源软件嘛，库没了代码有人备份就没事，只要后续有人接手继续合并新特性就没事，而且就是没人接手CFW也就是少了个客户端。
![Pasted image 20260801143322](https://box.pgntgz.top/posts/gfw2/Pasted%20image%2020260801143322.webp)
<center>*CFW*</center>

不过幽默的是大伙分不清GUI客户端和核心开始疯狂的恐慌。笔者亲历了哪一个时期，基本就是一群炒作狗在墙内疯狂散布Clash完蛋的消息，不明觉厉的人根本分不清CFW和clash,墙内还是数码文盲的墙外社区（推特）开始疯狂的焦虑。

结果就是Clash被推到风口浪尖，搞代理最忌讳出名。但一堆炒作狗不管疯狂在微博、抖音、B站疯狂发布Clash跑路啦！Clash作者被抓！开源社区遭到毁灭性打击！一度成为了微博热搜和抖音热门。

结果好了——Clash的维护者**Dreamacro** 起床一看：我操，搞毛啊，我成明星了！当即立断的立马删库了。这下好了，Clash真跑路了。

下游的维护者一看核心都跑了自己也只能跑了。当时墙内一度是绝望状态——clash是最新手友好的客户端，突然一夜之间全都跑路了。加上炒作狗煽风点火，当时的情况堪称魔幻。

不过后来大家还是冷静了下来发现其实影响没有炒作的那么大，clash只是贡献者跑路，代码又不会跑，而且V2ray，Xray，sing-box都好好的。Clash.meta（现在叫Mihomo）也迅速在Clash的尸体上重建。

到了今天Clash的继承者Mihomo已经接过了CLash的王座，其诞生了FLclash，Clash Verge Rev，clash Meta等等优秀项目，可以说Clash系列就是现在最受欢迎的客户端。只能说炒作狗真该死，Clash的大洪水这群炒作狗要付主要责任。


### sing-box
最后一位就是sing-box了。

sing-box的作者nekohasekai曾做过大名鼎鼎的SagerNet，可能是觉得做GUI救不了中国人，他转让SagerNet后转头写了sing-box。

sing-box有优秀的节点兼容性，在服务端大火了一把。sing-box普及是在Clash遭遇大洪水后的事情。
![Pasted image 20260727214425 w-20%](https://box.pgntgz.top/posts/gfw2/Pasted%20image%2020260727214425.webp)
<center>*sing-box*</center>

nekohasekai本人简直就是劳模,他的github绿墙简直是在cos地铁的马赛克墙。加上来自著名的艺术家アボガド6的头像其主页的感觉强烈的克制感。事实上这种风格延续在了其开发的项目中。
![Pasted image 20260801115253](https://box.pgntgz.top/posts/gfw2/Pasted%20image%2020260801115253.webp)
sing-box采用了严格的GPLv3，这导致使用的客户端必须自己也用GPLv3开源。nekohasekai本人很看不惯以纯粹商业动机写GUI的，sing-box的文档中推荐GUI客户端的页面称[^12]“此处没有列出一些声称使用或以 sing-box 为卖点的第三方项目。此类此类项目维护者的动机是获得更多用户，即使它们提供友好的商业 VPN 客户端功能， 但代码质量很差且包含广告。”所以很少用sing-box的GUI客户端。而nekohasekai的解决方法十分**简单粗暴**——**我全做了**

他一人维护了原生的Android，IOS，MAC，[^10]就在最近7月14号他还搞定了Windows客户端。而且nekohasekai的前端水平一样无可挑剔的完美。就拿Android版本说，sing-box-for-android不但是极其现代的MD3应用，还支持了ROOT增强抗检测能力，成功上架了最开源洁癖的f-droid的主仓库，市面仅此一家属于是。
![Pasted image 20260801150000 w-30%](https://box.pgntgz.top/posts/gfw2/Pasted%20image%2020260801150000.webp)
<center>*Sing-box安卓客户端*</center>

nekohasekai一样无法免俗的有争议——他对代码貌似有近乎偏执的执着，sing-box最受争议的就是sing-box一直在优化性能和追求新的功能但没有考虑用户体验。sing-box对配置文件JOSN的语法偏执的严格，并且语法规范变化极快，很少机场愿意维护适用于sing-box最新版本的配置文件，使用sing-box需要用户自己改JOSN，这大概也是sing-box客户端那么完美还是不流行的原因。

nekohasekai引发最大的吵架是[^11]Xray呼吁不要用sing-box，因为nekohasekai对V2ray Xray这群老东西很不屑。还嘲讽很多客户端接机场广告（参见上文）说不过结果是这篇AI写的大字报哪怕发在/Xray-core的讨论组，同温层里结果还是146赞61倒赞。可见又是争议话题

不过令人感叹的是SagerNet项目被nekohasekai交给MatsuriDayo和其他维护者组成Matsuri，Matsuri后来有衍生出nekoray和nekobox，慢慢的neoray停止维护......nekohasekai意外又不意外的促成了sing-box目前最受欢迎的客户端——nekobox。
![Pasted image 20260801145457](https://box.pgntgz.top/posts/gfw2/Pasted%20image%2020260801145457.webp)
<center>*NEKOBOX*</center>

nekobox的配置比sing-box好写点，nekobox兼容旧的sing-box语法，同时有sing-box内核强大的支持使得其的表现优于Clash和V2ray系的软件。nekobox目前是sing-box最受欢迎的客户端。

##### 题外话
唉说实话，这里的篇幅本来没这么多，结果一查资料人人有架吵，我已经尽量少写一点了......还是有一堆绕不开的争议。还有外号“翻墙娱乐圈”。不得不说，圈化真的是中文时间一大毒瘤。

## 要咋翻墙
我个人经历了代理翻墙最普及的一段时期。从疫情到26年严打，层出不穷的代理协议，GUI软件，VPN服务提供商.......

再此中间也有很多小插曲，比如V2ray分裂Xray，和大名鼎鼎的clash分裂，不过这些事情都没有阻挡这个时代

从不知道什么时候代理翻墙的手段逐渐可以简单概括成三个：
1. 商业VPN
2. 机场
3. 自建

### 商业VPN
商业VPN可以说是很值得说道的一点。

随着VPN普及和全球化导致大伙的欲望增强，特别是疫情后，涌现了一大批面向小白的一键使用的商业VPN客户端。

这类VPN提供商和一般国家以防监控为目的的VPN公司（NordVPN，mullvad之类）这类VPN提供商一般会打“擦边球”比如“XXX加速器”或者叫“XXXVPN”。他们常常不提供下载节点配置，客户端一般是直接集成了简单的代理协议。用户只需要获得额度然后链接就可以了。当然相应的就是用户可以选择的自定义极少。而且客服端不开源，完全无法保证数据案安全性。

这类软件在商业化上比较奇特，有的卖的死贵，往往很烂的线路和更低的自由度可以卖的比中端机场贵，比如大名鼎鼎的快连。本质是在打信息差。
![Pasted image 20260728142946 w-30%](https://box.pgntgz.top/posts/gfw2/Pasted%20image%2020260728142946.webp)
<center>*快连LOGO*</center>
而有的额度又很慷慨，当然表面的理由是广告收入——不过大家都知道的就是**广告那点收入怎么可能可以覆盖运营成本**，很明显的他们是在卖用户的资讯,也就是钓鱼VPN，其中最著名的就是老王VPN。也就X上的傻逼会在这种原则性问题上吵，[^4]全中国团队运营，没有交流组，不可以导出配置，看NSFW没事，翻墙爱党没事，上敏感网站秒抓。**不是厂商把你的日志卖了还能怎么回事啊？**

![Pasted image 20260728144808 w-50%](https://box.pgntgz.top/posts/gfw2/Pasted%20image%2020260728144808.webp)
<center>*操你妈，我翻墙是看黄的*</center>
我在我之前做的[隐私卡](https://yinsi.pgntgz.top/create) 中总结为类快连和类老王。

不过其实谁也别笑话说，大多数中国人的的一步大概都是这一类。这类提供商往往“贴心”的做了BING甚至百度的SEO笔者买的第一次为VPN付款也是。当时是30多一个月不限量（但其实节点限速严重，不过笔者那时候也不懂就是了）

一直到后面youtube给我推荐了功德无量的[不良林](https://www.youtube.com/@bulianglin)，直接激发了我的折腾DNA，我很快理解了这一切，然后跟着教程配置了clash verge随便买了改10块的机场。可以说是钱塘江上潮信起，今日方知我是我。从IP质量稳定性速度吊打卖信息差的商业VPN，而所谓的复杂点其实就是copy下节点URL。

### 机场
机场可以说是大多数人的选择了。至今也占据了主流的地位。

机场这是个俗称，机场鱼龙混杂没有统一标准，面板一般是开源的Xboard和SSPanel-UIM改的，我认为一个代理服务商被认定为是机场的核心要素就是其售卖的是可拉取的配置文件
![Pasted image 20260731120118](https://box.pgntgz.top/posts/gfw2/Pasted%20image%2020260731120118.webp)
<center>*SSPanel-Uim*</center>
机场一般售卖配置文件，提供下载配置的URL，一般还会提供QRcode和分应用特化配置链接方便导入。当然有的也会做一个简易的一键使用客户端。不过配置是URL分发才是机场的特点，因为这给用户有很大的自由度，比如选择自己喜欢的代理客服端，比如魔改配置。所以机场和商业VPN有着本质的区别。

因为用户的代理应用是来自第三方的开源软件。机场服务商没法监控用户的具体行为，服务商只能拿到自己经手的链接日志由此大大保障了用户的隐私。不过既然用了人家的机器产生的链接日志肯定是有的。不过风险比商业VPN小多了就是
一来 链接日志信息量低，而且翻到了关键记录也只是链接状态，分析不出具体内容。且极易混淆，毕竟中国的IP全是NAT，而且机场也没法管多人公用混淆日志。
二来 世上没有不漏风的墙万一被同行或者用户发现卖日志损害形象，和类老王VPN不同一般机场都有稳定的盈利逻辑和渠道，人做生意是为了钱，得不偿失的风险每人愿意付。
三来 很多机场运营就是草台班子甚至个人，就是意识形态控制大脑卖也没渠道卖。
四来 日志越详细占用磁盘越多，一个大型机场几千人记录详细日志VPS会爆掉
总上所述，一般也就出问题了拿来看看分析一下问题方便debug，大多时候直接sudo rm算了，省的占VPS空间。不过既然用他人的服务，风险总是存在的。

机场因为便利和相对隐私至今仍是最主流的选择。况且机场也有不同的赛道，从奶昔那种高端的专线到一般用的中转到便宜量大的直连，套CloudFront的防失联........卷线路数量，卷AI解锁.......直到大洪水.....其实也只是刷掉了一批，机场仍旧是主流中的主流。



### 自建
与此同时自建的门槛正在大大降低，SS开始到V2Ray普及，到Xcode和XUI面板，到兼容王sing-box横空出世，一人兼容的几乎所有协议类型。自建的趋势就是是越来越方便。到了今天哪怕是真的啥都不会，补上一天的基础知识，大不了当个脚本小子总是能用成功的。

自建的最核心的就是性价比和隐私还有一个IP独享。要极端省钱GCP免费的E2不自备域名也不是不能用。宽裕一点买个一年几美元的垃圾域名加上便宜racknerd啥的VPS，要高级上个CN2的搬瓦工。还有邪修献祭UDP套cloudflare的CDN加速和优选IP

相应的自建的VPS的高自主性是又一大优点，你可以自由的选择代理的组合。

当然没精力纯使用自建是件很坐牢的事情,比如封IP啥的要自己修理。而且如果你需要更多国家的IP比如解锁更多流媒体这类，增设VPS的成本就很不划算。不过大洪水之后主流的中转机场普遍天天挨打，反而是自建在稳定性上第一次有了优势。


## 现在
回顾完一圈到了2026年，这一切好像都变了，好像又1️没变
![万恶之源 w-30%](https://box.pgntgz.top/posts/gfw/gfwhr.avif)
关于这次打击的来龙去脉也差不多出来整理了，我觉得比较合理的是是泄密事件导致小学生对VPN警惕，促使了GFW的严打。

封禁主要针对国内VPS的中转机场——大多数机场都是在国内中转以统一用户体验的，直接拔线还不退款大大打击了机场的资金流，而不计成本的特征识别增强先是废掉了hysteria2,然后是vless和SS2022。

不过大伙发现打击都是针对特征识别，所以理所当然的个人搭建的独享节因为没啥特征不会被识别，这也是很多人觉得马上要到“自建时代”的原因。

不过大伙很快发现GFW拿AnyTLS没辙，现在机场基本上也的换了AnyTLS。三个月过去了，现在猫鼠游戏又向着平衡出走了。




[^1]: [来源](https://www.chinagfw.org/2015/01/ghost-assassin_27.html)

[^2]: [来源](https://chinadigitaltimes.net/chinese/403524.html)

[^3]: [具体的时间我也忘了](https://www.youtube.com/watch?v=uLuQ0Gb2jog)

[^4]: [这来源文章真一般说实话，不过确实这种明显的问题都不值得吵](https://lifebuddies.hk/wangvpn-review/)

[^5]: [来源](https://ggame.gledos.science/anti-censorship/VPN/V2Ray.html)

[^6]: [来源](https://www.gnu.org/philosophy/selling.html)

[^7]: [来源](https://github.com/XTLS/Go/issues/9)

[^8]: 这里直接针对其本人所以有立场问题所有放下原话比较好，不过原文太长就放这里了
	
	
	之前过于生气，把整个 issue 区关了，现在重新开放。
	
	但现在想到还是很生气。
	
	我花时间、冒着众所周知的风险写软件，一群自以为是的人挑随手写的 LICENSE 的刺，比如什么“不给复制“、”不给运行”。
	
	是都吃得太饱了是吧？
	
	而这个项目本身，它涵盖了一些技术突破，我不要钱，但也不希望很快就有人拿它魔改、不当获利，然后这也成了问题。
	
	回到这个争执本身，老子他妈的本来就是刷新个仓库：全部删掉，重新上传，没改协议。
	
	之前协议唯一一次修改还是放宽，没有意外的话，就是逐渐放宽的。
	
	然后就有个人过来，非说我改了协议。
	
	**这个项目中有 Go 的 BSD 只是按要求附带，LICENSE 文件才是本项目的协议，从一开始就不是 BSD............（省略）
	
	**先说我的认知**：我是 windows 用户，对 linux 的使用几乎仅限于服务器，从不用 linux 当桌面，**用包管理器也只是拉取编译好的二进制**
	
	关于我是 windows 用户，这个教程可以佐证：[v2ray/discussion#756](https://github.com/v2ray/discussion/issues/756)
	
	当然，**我更不知道 debian 具体是什么规则了，更别说我作为 v2 开发者之一还不知道需要兼顾 debian 源**
	
	所以，**我并不清楚这些发行版的条条框框，以为二进制自由就 ok，然后就很不能理解为什么非要拆开，即每个依赖都打包上去**
	
	事实上第一个 issue [#6](https://github.com/XTLS/Go/issues/6) 已经让我觉得很莫名其妙了，**作为一个不能独立跑的库，为什么非要打包到 debian？**.......(省略)

[^9]: [讨论](https://www.reddit.com/r/China_irl/comments/17nh1i8/clash_for_windows%E5%88%A0%E5%BA%93%E5%81%9C%E6%9B%B4%E6%98%AF%E4%B8%8D%E6%98%AF%E4%B8%AD%E5%85%B1%E6%9C%89%E5%8A%A8%E4%BD%9C%E4%BA%86/)

[^10]: [来源](https://xcancel.com/nek0hasekai/status/2076962869942296913)

[^11]: [来源](https://github.com/XTLS/Xray-core/discussions/4753)

[^12]: [来源](https://sing-box.sagernet.org/zh/clients/)

[^13]: [来源](https://www.reddit.com/r/KanagawaWave/comments/1oqj2ox/%E7%BB%8F%E5%85%B8%E5%9B%9E%E9%A1%BE%E4%B9%8Bshadowsocks%E4%BD%9C%E8%80%85%E5%B7%B2%E9%BB%91%E5%8C%96/)
