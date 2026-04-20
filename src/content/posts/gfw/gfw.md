---
title: GFW和代理工具的发展史（上）
published: 2026-04-16
description: 从石器时代到SS
category: 技术
tags:
  - 长篇
  - 代理协议
  - 开源替代
image: ./gfw.png
---
### 开头

最近，GFW开始了有史以来最强的封锁，几乎所有中国大陆的VPS厂商或多或少都受到了影响。不同与传统的“咱妈来大姨妈了”一年几乎总要来的那几次的敏感期相比，这次从4-8的网信办会议后，开始的打击几乎是GFW建立以来最强影响了所有人。

具体很多手段，但最强的当然就是VPS拔线，最疯狂的行政手段，也是这次网络灾难最重要的原因让几乎主流的依赖国内中转的代理机场几乎全军覆没。![万恶之源 w-30%](https://box.pgntgz.top/gfwhr.jpg)

关于这次封锁的原因和啥时候正常到现在还是众说纷纭。

更让人关注的以后怎么办引发广泛讨论，有人说海外中转，有人说以后是大直连时代。或真或假的资讯充斥整个墙外的简中网络

这让我有兴趣了解GFW和代理协议的对抗历史，不过我好像没有找到较好的可靠详细文章。大量早期的文字在被删除，所以我决定写这一篇文章



---

### 声明
我希望这篇技术为主，他没有#政论，我想要尽量客观。

但我要说

`本人不支持打着任何伟光正旗号但在客观上打击了公民言论自由的行为。`

---
## GFW的诞生

### 当世界还年轻

#### 越过长城，走向世界
[^1]1969年ARPANET（阿帕网）诞生，并在1983年，ARPANET采用TCP/IP协议，标志着现代互联网的雏形形成。此后互联网络的时代来到了。中国最早的联网在京710所的一台IBM-PC机上，通过卫星链接，远程登录到日内瓦欧洲核子研究中心发送了一封电子邮件。 “计算机信息网络直接进行国际联网，必须使用邮电部国家公用电信网提供的国际出入口信道。任何单位和个人**不得自行建立或者使用其他信道进行国际联网**”。

当然出于种种特殊性更广为人知的是在1986年8月25日在德国教授维纳-措恩等人帮助下，由北京计算机应用技术研究所王运丰等人发出了中国第一封电子邮件。

他非常适合作为文章的开始，因为他的内容正是
`Across the Great Wall we can reach every corner in the world.(越过长城，走向世界)`

#### 连接世界
64后的中国的高层虽陷入了对民主运动的恐惧，但总体的政治基调还是在向西方靠拢，起码是要做生意的。1994年接入64k宽带连接国际互联网，1995被称为中国的“互联网年”当然限制当然要有，留下解释空间GoAgent

 1996年，时任总理李鹏签署了国务院令第195号，发布施行《计算机信息网络国际联网管理暂行规定》。其中第六条规定：
 
>  “计算机信息网络直接进行国际联网，必须使用邮电部国家公用电信网提供的国际出入口信道。任何单位和个人**不得自行建立或者使用其他信道进行国际联网**”。
 
 等这类规定，为后来的GFW提供了法律依据

据说GFW在此时已经在立项。当然这些实际上没有太多具体的体现。不影响中国互联网正在进入黄金时间。

---
### 山雨欲来
#### 降世
新的世纪带来中国的互联网的黄金期，1998年金盾工程已经立项，引发了一些比如2002Google这类的骚乱，据说是因为江胡交班。但总体来说，中国的互联网还是相对自由的。

GFW有在封锁一些网站，但基本只有几个手段
- **DNS污染** 自家的DNS拒绝解析目标域名，这也是大多数政府的封锁手段。
- **锁IP** 最原始假如8.9.6.4是目标，ISP拒绝你连接就是了
- **关键词阻断** 早期网络多是HTTP，GFW会检查关键词，会伪造 TCP 重置包掐断连接

依照现有资料，当时被封锁的网站较少，且基本都在政府权力合理范围内。当时并没有啥代理工具。可能轮子的自由门还有无届

但一般手段是换DNS改hosts就是了。关键词阻断的话Linux用户用西厢计划也可以解决，SSH隧道已经出现并且最为救急手段。不过VPN使用还在比较原始的PPTP, L2TP，OPENVPN和SSH加密隧道已经在使用专业代理还没有变成普遍解决办法。

我觉得讲这段时间，最有代表性的是Google，下面的论述主角就让Google当好了。2006年，不做恶的Google进入了中国，2002年的事情貌似就这样各退一步解决了。

google同意调整部分网站SEO权重封锁部分词条，相应的Google要求在中国版主页展示不经审查的HK官网，且在被封锁内容上留“疤”——在页脚展示“根据当地法律法规和政策，部分搜索结果未予显示”。且不要再有2002的事情。google在当年斥资千万抢下国内最短域名“g.cn”一切好像都是那么美好。

---
#### 黑暗降临
以Google为主轴，显然这段时间外国企业在中国的运营并不是一帆风顺。Google在中国一直较有原则，拒绝手动干预，封锁也要走Google的机器流程，使得Google上许多官员的或真或假的传闻广泛传播,并且不能“一个电话就封了”。这深深得罪了许多官员，慢慢的，Google为代表的外国网络企业长期爆出不良传闻。

当年6月绿坝计划破产，变成笑话——GFW觉得在骨干网拦截太累了，干脆要求所有在华销售的电脑出厂预装拦截软件。结果就是引来了全国强烈反弹，[^4]只留下一个绿毛娘给我打手枪。
![咱是全年龄blog还是打个码把 w-30%](https://box.pgntgz.top/lbh1.jpg)

GFW思路转向网络封锁。

2008年的奥运结束后网络封锁和对外国企业开始逐渐失控。3月YT因为西藏问题被墙。09年64推特Flickr开始被大规模封锁，当年6月18日爆发了高也事件，从[^2]《焦点访谈》开始高也和其他嘉宾痛批Google“搞得那段时间**心神不宁**”当晚《新闻联播》也报道此事件。全国媒体铺天盖地的指责Google“涉黄”

#### 非法献花
[^3]虽然真相是这是明显的SEO污染，这种节目纯粹在侮辱中国人的智商。这些低俗的搜索结果的搜索请求全部来自北京，且都在节目发布的几天。
![这些低俗的搜索结果的搜索请求全部来自北京](https://box.pgntgz.top/xhgoogle.jpg)

有人说一定是涛哥的阴谋，有人说就是商战，百度怎么这么坏啊。有人说是为了给老习铺路，轮子还说薄熙来也干了。

不过可以确定的是到2010年中国政府和Google算彻底谈崩了。后来被证实2009年12月61398部队领导**极光行动**开始

[^5]2010年1月12日Google在官方bolg发布《A new approach to China》说：起初看似仅仅是一起安全事件实际上却大相径庭。

文章主要揭露了三点
 1. 这次攻击不仅针对谷歌，还有一堆起码20家美国企业
 2. 攻击者的主要目标是获取中国异议人士的Gmail
 3. 许多活动家的Gmail被频繁第三方访问

> we have evidence to suggest that a primary goal of the attackers was accessing the Gmail accounts of Chinese human rights activists. Based on our investigation to date we believe their attack did not achieve that objective. Only two Gmail accounts appear to have been accessed, and that activity was limited to account information (such as the date the account was created) and subject line, rather than the content of emails themselves.
> 我们有证据表明，攻击者的主要目标是获取中国异议人士的Gmail账户。根据我们迄今为止的调查，我们认为他们的攻击未能实现该目标。似乎只有两个Gmail账户被访问，而且活动仅限于账户信息（例如账户创建日期）和主题行，而不是电子邮件本身的内容。

在末尾Google表示“我们将毫不犹豫重新考虑对华的态度。”“我们决定不再愿意继续审查Google.cn上的结果”

这篇文章发布到3月Google搬迁到香港，Google彻底如它所说的在死前放飞了自我，尽管当时中国政府已经先发治人进行了DNS污染，但GoAgent修改个hosts就好了。而这段时间Google.cn不再维护审查词库，后来干脆直接重定向到了Google.hk

[^6]于此同时北京市民自发前往Google总部献花，促成了知名的非法献花事件
![非法献花](https://box.pgntgz.top/ffxf.jpg)


不得不说Google 2015年股权重构就把“Don't be evil”调到了很后面，毕竟Google本质是一家商业公司，但终Google在中国，Google算坚守了自己的底线。

笔者到北京时，那块被“非法献花”的石碑早就没了。跟着地图走结果只拍到了微软，最后无功而反。

后来才知道Google中国已经不悬挂Google loge了。不免感叹物是人非。
![他大抵是死了](https://box.pgntgz.top/googlesl.png)

到了10年这个时间点google.cn已经死翘翘了，对于我这个00后，到了我上网的年纪我对Google唯一的印象就是Google翻译。不过Google翻译服务也在2022年彻底走入历史舞台，从此Google在中国大陆就再没有面向普通用户且未被封禁的网络服务。
shadowsocks
不过意外的是Google留下的尸体间接开启了下一个时代——GAE和GoAgent

---
## 跨过去！

> 変わらなきゃ　壁壊さなきゃ
> 必须要改变　必须破坏这高墙

### 寄生？钻开？
在SS降临之前的主流模式分别是依赖GAE的GoAgent和直接和GFW打擂台的西厢计划

#### 西厢计划—反击
> *“待月西厢下，迎风户半开，隔墙花影动，疑是玉人来。”*

西厢计划名字来源于《西厢记》西厢计划主要提供一组工具，使得用户在一次设置之后，能够以普通程序直连目标网络，而避免GFW的大部分影响，这些工具由GPLv2+许可开放源代码。

西厢计划的思路是在技术上与GFW打擂台

> [^7]西厢计划要解决GFW造成的两个方面的问题：TCP连接重置和DNS劫持（污染）。为此西厢计划提供了两种特性：
> 
> - TCP连接混淆：在每次连接中，通过对GFW的入侵检测系统进行注入，混淆连接，使得GFW无法正确解析连接和检测关键词，从而在有关键词的情况下也避免连接重置。(更新，2011年7月测试，客户端的TCP连接混淆已经不可用)
> - 反DNS劫持：通过匹配GFW伪包的指纹并将其过滤，让用户以普通的客户端也能获得正确的解析结果。（用户需要设置DNS为没有被污染的DNS，例如178.79.131.110 等）

西厢计划有很多问题，比如高度依赖ROOT权限，需要运行在Linux内核中，使用它类似在Root的手机上刷入模块，在[这篇文章](https://groups.google.com/g/fzlug/c/9C-1fvi1aeg/m/iXUi33drzq4J)就可以看到他的安装流程。所以在GNU/Linux&BSD这类开源系统外可用性很低。这篇[bolg](https://blog.youxu.info/2010/03/14/west-chamber/)就说了这个问题。

> 我猜想，因为开发人员都是黑客，所以自然喜欢用最经得起折腾和高度定制的 Linux 开发。 现在看西厢计划的实现，因为依赖于 Linux 内核模块 netfilter, 在 Linux 上如鱼得水，但往其他平台的移植可能是个亟待解决的问题。 我觉得，在其他平台上，可以通过 libpcap 和 libnet ，在用户态实现相同的功能，就是有点麻烦而已，有兴趣的懂网络的可以照西厢计划原理，在家自行做出此功能；当然，全中国人民都用 Linux 最好 :)

事实证明了这是对的，西厢计划到后期才发布兼容win的版本。

西厢计划的代码托管在Google code。这个平台已经被Google抛弃不过Google依然保持此平台可以被读取。当年的在公共领域的讨论也多被保留了下来。我们仍可以看到生在那个时代的geek们在干啥。

---
#### GoAgent—寄生
Google作为互联网巨头，Google的搜索引擎和youtube这类服务自然死透了。不过GFW当然不可能把Google的IP全部封杀，否则中文互联网多半要崩溃。事实上到今天GCP的VPS IP绝大多数也没有被墙。

被利用的GAE是Google的无服务器的运行环境。有点类似自由度更小的容器，在当时GAE也就是Google提供的PaaS服务就没有受到影响。并且提供1人多个appID每个appID每天1G的慷慨免费额度。一般10个appID是能申请下的，甚至1个Google账户申请25个appID以上都大有人在。

GAE节点在路由中的优先级较高，类似现在GCP VPS的高级流量层级，并且有Google全球的CDN类似现在cloudflare的小黄云。几乎无限流量和一流的速度，简直是代理的首选。GoAgent就这样诞生了。

GoAgent就是利用这个巨人的工具，他使用GPLv2开源在github[^8]GoAgent的流程相比西厢计划简单许多。

> - 申请 [Google Appengine](https://web.archive.org/web/20141021234839mp_/https://appengine.google.com) 并创建 appid。
> - 下载 goagent 最新版 [https://goagent.github.io](https://web.archive.org/web/20141021234839mp_/https://goagent.github.io)
> - 修改 local\proxy.ini 中的 [gae] 下的 appid = 你的appid(多appid请用|隔开)
> - 运行 uploader.bat 或 uploader.py 开始上传, 成功后即可使用了。

> - - Windows 用户推荐使用 goagent.exe 托盘图标设置 IE 代理(对其它浏览器也有效)。
> - Chrome/Opera 请安装 [SwitchySharp](https://web.archive.org/web/20141021234839mp_/https://chrome.google.com/webstore/detail/dpplabbmogkhghncfbfdeeokoefdjegm) 插件(拖放 SwitchySharp.crx 到扩展设置)，然后导入 SwitchyOptions.bak
> - Firefox 请安装 [FoxyProxy](https://web.archive.org/web/20141021234839mp_/https://addons.mozilla.org/zh-cn/firefox/addon/foxyproxy-standard/) ，Firefox需要导入证书，方法请见 FAQ
> - 出现连接不上的情况可以尝试使用 [GoGo Tester](https://web.archive.org/web/20141021234839mp_/https://github.com/azzvx/gogotester/raw/2.3/GoGo%20Tester/bin/Release/GoGo%20Tester.exe) 测速。

可以很明显看到GoAgent的技术方案就和代理的路线更相似了。GoAgent最大的缺点就是你需要信任一个CA证书，这无疑降低了网络的安全性，并且HTTPS以经在普及的路上，所以你需要面对一堆爆红。

GoAgent的路线已在有了加密代理的味，代理加密shadowsocks和特征识别技术在这时也在成熟

### 时代，前进

2014年5月GFW还是对GAE下手了，越来越多的GAE IP被标记。后期几乎IP全灭，GoAgent也在当年停止维护。

至于西厢计划在11年基本就死了——社区根本无法用爱发电对抗世界第二大国。GFW不断加强DPI实装，指纹封锁也在收紧，加上HTTPS到来。

西厢计划主要开发在10年基本停止，最后一个PR在2012年11月22日。12年GFW升级了DPI检测后面基本就不可用了。

后续有人维护西厢计划2阶段和3阶段，不过只是继承名字，连许可证都变成BSD了。

不过特征识别的路线已经在这时候被点亮了——12年4月22日clowwindy发布了影响至今的shadowsocks
![SS发布](https://box.pgntgz.top/SSJL.png)

如果说鸦片战争分割了中国古代和近代，我想shadowsocks就是鸦片战争时刻。从此现在我们熟悉的时代的雏形开始形成了。

（上期完）
编辑时间
26-4-16 ～ 26-4-20
问题：需要补充一些图片

[^1]: 参考[中科院](https://www.acas.ac.cn/byyxc/bydt/202404/t20240422_7174874.html)

[^2]: 当期节目补档[上](https://www.youtube.com/watch?v=8p_fUSfyJeg) [下](https://www.youtube.com/watch?v=9iEGWL15OL8)

[^3]: [来源](https://blog.fivest.one/archives/636)

[^4]: [图片来源](https://www.pixiv.net/artworks/113095569)

[^5]: [原文章](https://googleblog.blogspot.com/2010/01/new-approach-to-china.html)

[^6]: [来源](https://www.chinagfw.org/2010/03/jason-ng.html)

[^7]: [来源](https://code.google.com/archive/p/scholarzhang/wikis/README.wiki)

[^8]: [来源](https://web.archive.org/web/20141021234839/https://goagent.github.io/?/wiki/SimpleGuide.md)
