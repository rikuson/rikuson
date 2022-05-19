---
layout: post
title: IFTTTを使って新着記事をSNSに自動告知
date: 2017-03-09 12:53:40 +0800
categories: [category, bloghack]
tags: 
image: https://rikson.imgix.net/N811_chirabattakokkicard_TP_V.jpg
---
今回はIFTTTを利用して新着記事をSNSに自動告知する設定を行う。

## IFTTT

IFTTTとはWEBサービスを連携させるハブのようなWEBサービスである。  
WordPressの新着記事の通知をTwitterで自動で行わせることなどが可能。  
今回はWordPress新着記事RSSフィードが更新されたら、SNSタイムラインに通知するという方法で実装する。

まずはアカウントを作成。  
登録が完了したら、「My Applets」をクリック。

![](https://rikson.imgix.net/59F7FBFF-9277-438C-86DE-530ADC953E1E.png)



## Twitterへ自動投稿

「New Applet」をクリック。

![](https://rikson.imgix.net/42CE1C9C-4782-43C1-9F42-2D66FBF57A75.png)

「this」をクリック。

![](https://rikson.imgix.net/DC757C09-7756-4DB6-BF4B-1ED4B044E431.png)

「Feed」というのを検索窓に打ち込んで、左下に出てくる「Feed」をクリック。

![](https://rikson.imgix.net/EE0D0562-A3B2-44D1-9CAA-A3D481120327.png)

「New feed item」をクリック。

![](https://rikson.imgix.net/DAE3BB04-DBB6-4561-83F6-393DFB4337F6.png)

「Feed URL」にRSS FeedのURLを入力して、「Create trigger」をクリック。

![](https://rikson.imgix.net/1DD402B7-8C57-42DC-B165-DEC7915E518D.png)

「that」をクリック。

![](https://rikson.imgix.net/FA5615BD-3C3E-4CC7-AC52-BFB073FC4550.png)

検索窓に「Twitter」と入力して、下に表示される「Twitter」をクリック。

![](https://rikson.imgix.net/47366D91-45FE-4F63-938A-38F37A0DC0D7.png)

TwitterをIFTTTと連携する。  
アカウント情報を入力して、「連携アプリを認証」をクリック。

![](https://rikson.imgix.net/96722568-5924-40AA-B19C-38101646E2F3.png)

「Post a tweet」をクリック。

![](https://rikson.imgix.net/C94E458F-1A0C-41F1-9785-9AE99B4EDD90.png)

<!-- {% raw  %} -->

このテキストエリアの中がツイートの内容。  
`{{EntryTitle}}` というのは記事のタイトルで、 `{{EntryUrl}}` は記事URL。  
「+ Ingredient」をクリックするとフィードから引用できる値が参照できる。  
告知内容が設定できたら、「Create action」をクリック。

<!-- {% endraw  %} -->

![](https://rikson.imgix.net/92D95EBA-E2F0-46B3-8B86-5B91B4C909C3.png)

これで完成。  
あとは分かりやすいような名前をつける。  
実行される度に通知が欲しい人は「Receive notifications when this Applet runs」をオンにする。

![](https://rikson.imgix.net/5949FC68-819F-4110-B9E3-7B76450A9316.png)

## Facebookページへ自動投稿

「that」をクリックするところまでは先程と同じなので割愛。

検索窓に「Facebook」と入力して、「Facebook Pages」をクリック。  
連携設定画面が出てくるので、アカウント情報を入力して、投稿するFacebookページを選択。

![](https://rikson.imgix.net/8EDE7223-9FEE-4591-B6AB-02005E45CF0D.png)

「Create a status message」をクリック。

![](https://rikson.imgix.net/4CB69EF1-5656-4C90-81A5-C11FF132FDBC.png)

記入できたら「Create action」をクリック。

![](https://rikson.imgix.net/8C1DA7D4-976E-48E3-8F34-A871B8D1875B.png)

これで完成。

![](https://rikson.imgix.net/1C056100-EA66-4926-97D8-A4430242D3C1.png)



