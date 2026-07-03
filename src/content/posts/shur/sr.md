---
title: 拒绝输入法泄漏—在android配置Fcitx5+雾凇拼音+本地语音输入
published: 2026-05-30
description: 介绍android端纯粹开源的输入法方案Fcitx5+中州韵插件+雾凇拼音+本地语音输入联动（说点啥+SenseVoice）
category: 技术
tags:
  - android
  - 教程向
  - 长篇
  - 开源替代
image: https://box.pgntgz.top/posts/shur/icon_oJHkpx5GsjyrG5_nxTfEs2FmP6g7_hmnbE6rKQjLRoI=.webp
---
### 老问题
首先当然就是老问题——为啥要换？

输入法的特点就是惯性极大，因为输入法本身差别就不大，内卷就是卷卷词库啥的，各家基本上几经同质化了。大多数人都是出厂默认啥就用啥就是了，厂商也都很识趣收一笔广告费用搞个定制版本就是了。

根据[^1][MobTech研究院](https://www.mob.com/mobdata/report)在2025年的报告:

>第三方输入法行业“马太效应”愈发明显
>截至统计周期内,第三方输入法行业呈寡占格局,搜狗、讯飞、百度等头部输入法市场占有率逾八成,充分印证了头部厂商在技术、产品和服务全方位的综合实力

搜狗、讯飞、百度、微信 4家占据了84.4%的市场份额。

然后还有另一篇通报——早在[^2]2021年工信部发布的《# 关于输入法等33款App违法违规收集使用个人信息情况的通报》：
![gxb w-40%](https://box.pgntgz.top/1621370239178608-1621370251815832.png)
属实是卷卷有爷名了。唯一没有上榜的微信输入法是因为他2022年12月才公测。

当然或许Gboard不错——Goolge在隐私权选项中可以选择关闭分享数据（虽然是默认开启的）。不过抛开Google也不是啥好东西不说，这又涉及到了又一个问题——使用体验。

事实上搜狗、讯飞、百度、微信尤其是搜狗和百度UI体验是真的垃圾广告，臃肿的皮肤商城，多余功能，还有没人想用的AI功能.......Gboard真的不知道高到哪里去了。但是Gboard有个致命伤——Google早早滚蛋，中文词库很垃。更不要说语音输入更垃圾中的垃圾——网络延迟和准确率都是。

### 计划
简单理清一下思路：

![思路w-50%](https://box.pgntgz.top/screenshot-2026-05-31_17.51.33.png)

首先开源的本地化的开源输入法框架，其次是更好的词库和其依赖，然后是运行在本地的ASR模型并且联动到前端方便调用。

所有要用到的东西的地址：
[Ficitx5改版](https://github.com/BryceWG/fcitx5-android-bibi-keyboard/releases)
Ficitx5增加说点啥联动的版本

[说点啥](https://github.com/BryceWG/BiBi-Keyboard/releases)
Google play的pro是非开源的版本

[中州韵插件](https://f-droid.org/zh_Hans/packages/org.fcitx.fcitx5.android.plugin.rime/)
为Ficitx5增加中州韵输入引擎的支持

[雾凇拼音](https://github.com/iDvel/rime-ice/releases)
推荐下载`full`包
#### 语音输入解决
[说点啥](https://github.com/BryceWG/BiBi-Keyboard/releases)无疑提供了极佳的解决方案，说点啥的安装使用极其方便，安装然后选择服务商就可以了。
说点啥提供了一堆[方案，其开发者做了如下推荐](https://brycewg.notion.site/bibi-keyboard-providers-guide) 

我个人的体感下最好的还是Sensevoice，他的int8版本轻量且快捷，最让人担心的精确问题我的体感完全够用，当然问题是有的：
- 我不说方言，实测带了口音后的精确度就直线下降了。
- 还有就是如果你的英文和我一样糟糕的话，Sensevoice的识别常有问题。

云服务我就不做推荐，不过提醒一下，不同于美国的宪法第四修正案或者欧盟丧心病狂的GDPR，中国政府可以随便调阅所有大陆所有云厂商的日志。还有就是Google ais的免费层级是要被拿去训练的，要隐私就老老实实花钱买不要贪便宜。

挑选完适合自己的ASR模型后，就是联动Ficitx5了，在说点啥的主页点击输入设置>音频与联动>允许外部输入法联动（aidl）开启就可以了
![效果](https://box.pgntgz.top/photo_2026-05-31_21-48-07.jpg)
Ficitx5就不用我介绍了，然后安装[Ficitx5改版](https://github.com/BryceWG/fcitx5-android-bibi-keyboard/releases) 点击虚拟键盘选项，下拉找到空格键长按行为，选择语音输入就可以了。 
![效果](https://box.pgntgz.top/photo_2026-05-31_21-48-08.jpg)
#### 雾凇拼音
首先雾凇拼音依赖中州韵输入引擎的支持。为了在Ficitx5使用，我们需要安装[中州韵插件](https://f-droid.org/zh_Hans/packages/org.fcitx.fcitx5.android.plugin.rime/) 

安装雾凇拼音的方法就是用[雾凇拼音](https://github.com/iDvel/rime-ice/releases) 的数据包替换原本的数据目录，也就是在/storage/emulated/0/Android/data/org.fcitx.fcitx5.android/files/data/rime/

下载[雾凇拼音](https://github.com/iDvel/rime-ice/releases) 的包，用任意一个不管本地外部你喜欢的文件管理器，在本机目录点击android文件夹，然后是data找到org.fcitx.fcitx5.android。打开files/data/rime/

然后删掉！一定要删掉原来的所有数据！不然会报错！

然后把雾凇拼音的包解压到此地，效果这样就好了
![效果](https://box.pgntgz.top/screenshot-2026-05-31_21.53.27.png)
接着在小企鹅输入法的输入法选项中添加中州韵，随便测试一下已经可以选择雾凇拼音了（没有的话点一下重载配置）


### 效果
这样全过程就好了。小企鹅支持动态色彩主题稍微配置一下，效果媲美Gboard。愿意折腾[Ficitx5支持第三方皮肤](https://github.com/tankb52/fcitx5-andoird-themes)

![效果](https://box.pgntgz.top/photo_2026-05-31_21-42-08.jpg)
语言效果
![效果](https://box.pgntgz.top/photo_2026-05-31_21-46-14.jpg)

在功能性是雾凇的词库吊打Gboard，Sensevoice的速度和准确度完全强于Gboard，而且不怕网络问题。隐私上杜绝任何环节的输入法泄露。


[^1]: [MobTech研究院-2025年中国第三方输入法行业洞察](https://www.mob.com/mobdata/report/200)

[^2]: [来源](https://www.cac.gov.cn/2021-04/30/c_1621370239178608.htm)
