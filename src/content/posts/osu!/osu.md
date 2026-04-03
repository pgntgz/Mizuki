---
title: 解决osu！在linux下的vulkan渲染bug
published: 2026-03-11
description: vulkan在我的linux上出现了图像撕裂bug,我解决了它
category: 问题
tags:
  - GNU/Linux
  - osu！
  - vulkan
  - 短篇
  - 水
image: ./osu.png
---
## 问题
最近在Linux最棒的开源音乐播放器osu！打铺总感觉不顺，人嘛，失误了，第一想法肯定是找设备问题。然后我发现我用的竟然是比我大的openGL！于是火速换了vulkan，结果就是画面撕裂了，移动鼠标部分画面就闪烁+撕裂。没截屏，借用一下别人的吧

[情况](https://private-user-images.githubusercontent.com/89219595/525014060-761e9e3a-b1be-436b-8bab-e89a5c699517.mp4?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzUxOTYxODQsIm5iZiI6MTc3NTE5NTg4NCwicGF0aCI6Ii84OTIxOTU5NS81MjUwMTQwNjAtNzYxZTllM2EtYjFiZS00MzZiLThiYWItZTg5YTVjNjk5NTE3Lm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjA0MDMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwNDAzVDA1NTgwNFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWY4YTIzMWU5ZTc2Zjk0OGQ1ZGU5OThhMzE4ZTAzNDUzNTkwYzgyMTBiZmYwYzQzMTMyNmU0M2EzOTA0YmRkOGQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.-GDJeytfI_Wo3rP8H2GB1MBZKXAa1-Rijy1dqL1GtQE)

我想不应该啊，我是AMD独显，vulkan相关包也是正常的。于是当场懒狗上身了直接问了gemini,结果告诉我是着色器问题`AMD_VULKAN_ICD=RADV RADV_PERFTEST=aco osu-lazer` 结果没用。


## 为啥
得嘞，自己查吧。osu！仓库果然有相同情况的[议题](https://github.com/ppy/osu/discussions/35961) 

看了下解答
![github的解决方法](https://box.pgntgz.top/解决.png)
果然`vk_wsi_disable_unordered_submits=true` 有用，看来是高负载场景下vulkan乱序提交的锅。照理说到这里就没事了，没必要水一篇。

可是我编辑了`~/.drirc` 和`/etc/drirc` 都没用，貌似是vulkan驱动踢开drirc闹革命导致的，vulkan优先读取系统变量，留下drirc不管了

### 解决

不过问题已经找到了，剩下就简单了，我干脆编辑了`/etc/environment` 加入`vk_wsi_disable_unordered_submits=true` 就解决了。

同理
`cp /usr/share/applications/osu-lazer.desktop ~/.local/share/applications/`

编辑`~/.local/share/applications/osu-lazer.desktop`  

加上`Exec=env vk_wsi_disable_unordered_submits=true osu-lazer %u` 一样的效果




2026/03/04当场水完