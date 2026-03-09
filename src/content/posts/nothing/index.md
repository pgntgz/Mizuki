---
title: nothing ROOT教程and ROOT使用者的软件谈
published: 2026-03-09
description: 做为nothing使用者对我的设备的想法和教程
category: 工具
tags:
  - root
  - nothing
  - android
  - AOSP
  - 教程
image: ./py.jpg
---





这篇文章聚焦nothing的软件与root等问题
硬件评测推荐[阿哲](https://www.youtube.com/@linzin)系列评测
### 前言
nothing，在国内一个可以说是小众中的小众品牌，如果你听过他，大概可能是以下三个原因

1. ==裴宇==瑞典籍华人，nothing的创始人，同时亦是1+联合创始人，为了[^1]*通过翻开新篇章，我才可以花更多的时间来实现更多的创意*离开1+。只是留下西北苦行英伦三岛的传说
2. nothing并不在中国大陆发售，但nothing的geek感和独特的设计确实足够特立独行
3. 各种可==ROOT==榜

现在是个各家厂商都在收紧BL解锁的时代，**不管国内外** 在2026年的今天，如果想要不留下任何个人和设备信息解锁一个
在售机器BL,**Google和nothing可能是你唯二的选择**

##### 个人认为的主流手机可解锁解锁甜度表

| 品牌             | 综合评价       | 流程复杂吗                               | 资源丰富吗？         | 后果                  | 私货                      |
| -------------- | ---------- | ----------------------------------- | -------------- | ------------------- | ----------------------- |
| 🏅Google pixel | ✨️✨️✨️✨️✨️ | 无限制，原生解锁，一条命令就可以                    | 100%           | 不刷第三方ROM就有保修,刷了也能蒸蒸 | 最完美的                    |
| 🥇Nothing      | ✨️✨️✨️✨️   | 限制是nothing，原生解锁，一条命令就可以             | 拉点，不过在好转       | 暧昧，条款没明白说，看情况       | 第三方ROM适配并不乐观            |
| 🥈1+           | ✨️✨️✨️     | 绑定大陆号码申请，30天限制一次，不过据说很好过，而且高考好      | 有望成为最大国产root社区 | 保修政策收紧，完整三包没了       | 《1+—裴宇的遗产》，是否继续加码我不是很乐观 |
| 🥈sony         | ✨️✨️✨️     | 不用账号用IMEI 1&IDID                    | 不错             | 失去原厂照相算法            |                         |
| 🥈3星           | ✨️✨️✨️     | 类似sony                              | 不错             | 熔断Knox,失去pay和隐私功能   | 感觉熔断Knox挺没性价比           |
| 🥉小米           | ✨️         | 小米高考臭名远扬，都出体育特长了，KernelSU作者都过不了的含金量 | 目前国内最大root社区   | 有权利拒保               | 及其差劲的示范，当婊子立牌坊          |
| 🥉摩托罗拉         | ✨️✨️       | 硬件ID+账号                             | 有些积累           | 申请就拒绝               |                         |

#### Nothing在软件上适合谁？
geek是一个绕不过的标签，事实上nothing OS的设计语言的确独具一格，点阵字体和简洁冷感的UI语言加上。原版nothing OS就已经是一个不错的类原生系统，界面流畅，完整的GMS。可惜就是还是有点简陋

当然重头戏肯定还是ROOT

### ROOT教程
其实没什么好教的非常简单：
1. 解开BL
2. 刷入修补后的init_boot.img
3. 完事
一步步来吧，当然我选择的是线刷，我说的当然是我的方案：

#### 手机端准备
1. 打开开发者模式
2. 备份数据，开BL会消除所有数据
3. 找稳固的USB—C线连接PC和手机（比如手柄线，中途别掉了）    

#### ADB和进入
⚠️除了Arch我都没亲自尝试,仅供参考
###### win：去 Google 官网下载 [SDK Platform-Tools](https://developer.android.com/studio/releases/platform-tools)。解压后最好把文件夹路径加到系统的 **环境变量 (PATH)** 里，不然你每次都要切换到那个文件夹才能运行。Nothing 官方没有专门的 ADB 驱动，直接用 Google 提供的 [USB Driver](https://developer.android.com/studio/run/win-usb) 即可。如果识别不到，去“设备管理器”里手动更新驱动，选择“从计算机上的设备驱动程序列表中选择” -> “Google USB” -> “Android ADB Interface”喵。

##### GNU/Linux
**Arch系**：通常需要`sudo pacman -S android-tools` 和管理权限的`sudo pacman -S android-udev`

**Debian系**：`sudo apt update && sudo apt install android-sdk-platform-tools`

**Redhat系**：`sudo dnf install android-tools

**NIX OS**：在 `configuration.nix` 里加上：

```
programs.adb.enable = true;
users.users.<你的用户名>.extraGroups = [ "adbusers" ];
```

然后执行 `sudo nixos-rebuild switch`。

**gentoo**：`sudo emerge -a dev-util/android-tools
##### MAC&BSD
 **MAC**：装了 Homebrew 的话 `brew install --cask android-platform-tools`

 **FreeBSD:**``sudo pkg install android-tools
 
 **OpenBSD:** `sudo pkg_add android-tools
 
注意：BSD 下可能需要以 root 身份运行 `adb start-server` 才能识别硬件。

##### Bootloader解锁
⚠️解锁最好用软路由,热点之类的搭建一个可以访问google的环境，解开BL通常要验证此前的google号也就是FRP这里简单介绍一下
跳过 Google 验证 (FRP Lock)的一些方式（未亲测）
1. 似乎从不登录任何google账号不会触发
2. 运行`fastboot erase config` 或`fastboot erase frp`据说往往前者更有效
首先检查连接并确保[[#手机端准备]]已经完成
连接PC一般会出现一个ADB授权弹窗，允许你的设备调试
![ADB授权弹窗](./ADB1.jpg)
然后测试连接`adb device
返回设备信息就可以下一步重启`adb reboot bootloader 
正常就会进fastboot
运行解锁命令`fastboot flashing unlock
这时候会出现下面的画面
![BL](./bl.jpg)
⚠️解锁会清除数据，请确定重要内容的备份
接下来
- 使用 **音量键** 切换选项。
    
- 选择 **"UNLOCK THE BOOTLOADER"**。
    
- 按下 **电源键** 确认。 

就是这么简单

### ROOT
[nothing档案馆](https://github.com/spike0en/nothing_archive)
接下来是ROOT
（明天再更新喵，真有幸运儿记住看清版本号和要刷init_boot.img不是boot.img就是了）

[^1]: 来源;[环球网 2021-01-27](https://m.huanqiu.com/article/41ge6BOWV5y)
