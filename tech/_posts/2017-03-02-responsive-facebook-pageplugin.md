---
layout: post
title: WordPressの記事の下にレスポンシブなFacebookパーツを作成
date: 2017-03-02 16:36:18 +0800
tags: 
image: https://rikson.imgix.net/a7b268519a9eb372bf73737e13f48051-1-e1488472535296.png?w=856
---
今回はFacebookパーツを記事の下に表示する。

## Facebookページを作る

まずはFacebookページを作成する。  
「会社または団体」を選択した。

![](https://rikson.imgix.net/807e4dc309e20665d1da1b5a77138297.png)

細かいジャンルを選択し、ページの名前を決める。  
「スタート」を押せばページの完成。

![](https://rikson.imgix.net/201fa4fab05999f3af1ba9252fe6a714.png)

## Facebook公式のページプラグインを使う場合

まずは、[公式サイト](https://developers.facebook.com/docs/plugins/page-plugin/)へアクセス。  
作成したFacebookページのURLをコピーして「FacebookページのURL」の欄に貼り付ける。

タブの欄にtimeline、event、messagesのいずれかを指定することでパーツに何を表示するかを指定できる。  
複数表示する場合は「,」区切りで「timeline,messages」というように指定する。

設定が完了したらプレビュー画面の下の「コードを取得」というボタンを押す。

![](https://rikson.imgix.net/e51862cb19507b9f25647db4f6af965b.png)

「ステップ２」に表示されているコードをbodyタグの開始タグのすぐ後ろあたりに貼り付ける。

![](https://rikson.imgix.net/3464eda86c2e992e40fab7724df2d77a.png)

「ステップ３」に表示されているコードを表示したい場所に貼り付けて完成。

![](https://rikson.imgix.net/596344579ec08a1c8e201f0ce951af97.png)

## WordPressプラグインを使用する

![](https://rikson.imgix.net/088119fbafc852cc84ec85b1f72462c1.png)

プラグインを使用する場合は「Facebook Page Plugin」が使いやすい。  
スクリプトタグなどをテーマファイルに追加しなくても、ウィジェットやショートコードでパーツを表示可能。

インストールして有効化したら、特に設定は必要ない。  
表示したい場所にショートコードを入力する。  
ただし、テーマファイルの中でショートコードを使うにはdo_shortcode関数を用いなければならない。

 ```php
<?php echo do_shortcode('[facebook-page-plugin href="<FacebookページURL>"]'); ?>
 ```

| 設定項目                         | プロパティ名 | 値               |
| -------------------------------- | ------------ | ---------------- |
| FacebookページのURL              | href         | URL              |
| 幅                               | width        | 180 ~ 500        |
| 高さ                             | height       | 70 ~             |
|                                  | cover        | true / false     |
| いいね！してくれた人の画像の表示 | tabs         | true / false     |
| カスタム表示                     | cta          | true / false     |
| レスポンシブ表示                 | adapt        | true / false     |
| 言語                             | language     | en_USやja_JPなど |

若干CSSの調整をした。

```php
<div class="facebook-page">
  <div class="facebook-page-header">Facebook</div>
  <div class="facebook-page-body"><?php echo do_shortcode('[facebook-page-plugin href="<FacebookページURL>" width="500"]'); ?></div>
</div>
```

```css
.facebook-page{
  text-align: center;
  border: 1px solid #CECECE;
  padding: 5px;
}

.facebook-page-header{
  background: #305097;
  color: #FFF;
  padding: 5px;
}

.facebook-page-body{
  padding: 10px 0;
  overflow: hidden;
}
```

PC表示

![PC表示](https://rikson.imgix.net/a085eab6edaeb1eb9cfd7f27ec3c9fea.png)

スマホ表示

![スマホ表示](https://rikson.imgix.net/14ca8902b25866eecef335079aa0141d.png)

シェアボタンが消えてしまう・・・。
