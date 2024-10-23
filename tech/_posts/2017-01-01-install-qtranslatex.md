---
layout: post
title: qTranslate Xを使ったWordPressの多言語化設定
date: 2017-01-01 00:29:21 +0800
tags: [wordpress]
image: https://rikson.imgix.net/qt.jpg
---
今回は「qTranslate X」というプラグインを用いて、ブログを日本語と英語の多言語化する。

## 「qTranslate X」をインストール

まずは「qTranslate X」をインストール。

![search plugin](https://rikson.imgix.net/AF8E7AEC-D815-4BC6-AC1B-BE18DB36C00E-1024x644.png)

apacheの設定を確認。
`/etc/apache2/httpd.conf` を開いて`mod_rewrite`が無効になっている場合、有効にする。

```diff
- LoadModule rewrite_module modules/mod_rewrite.so
+ LoadModule rewrite_module modules/mod_rewrite.so
```

## パーマリンクの設定

次にパーマリンク設定を確認。
URLをどういう形式で表示するかという設定だ。
矢印の部分を変更する。

![permalink settings](https://rikson.imgix.net/F1563202-A615-4CB6-9241-E88FB1404D57-1024x594.png)

SEO的には`/%category%/%postname%`として、URLにカテゴリ名と記事名を英語で表示するのがいいらしい。

しかし、これだとカテゴリ名を変更するとURLも変わってしまう。
カテゴリの整理がしづらくなってしまうので、`/%postname%`とした。

## 投稿するときの操作

この状態で、投稿画面にいくと言語選択のタブが出現している。
日本語版を書くときは日本語タブを選択して記事を書いて、英語版のときはEnglishタブに切り替えて書く。

![edit post](https://rikson.imgix.net/16DE5DB9-1F76-4F30-A489-8FF709FFE5B2-1024x560.png)

`http://localhost/wordpress/` 。

![top page](https://rikson.imgix.net/E8330FB1-649E-413C-A2B0-983DE5D9706A-1024x688.png)

`http://localhost/wordpress/en/` へアクセスすると、トップページが英語化されている。

![](https://rikson.imgix.net/48D18809-AD51-4EE9-8177-277AD3D8F414-1024x661.png)

## 言語切り替えボタンの設置

最後に言語の切り替えボタンを設置する。

![edit widget](https://rikson.imgix.net/2EF8707F-4797-429B-9A1E-FE1AB1CB97A7-1024x582.png)

サイドバーに言語切り替えボタンが出現した。

![language switch](https://rikson.imgix.net/6E6DFD5C-1E66-46DA-AA2B-87DB67BAE0A4-1024x562.png)

## 参考

- [WordPressプラグイン「qTranslate」でブログを多言語化する \| Webクリエイターボックス](http://www.webcreatorbox.com/tech/qtranslate-multilingual-wordpress-plugin/)
- [パーマリンク設定で404。mod_rewriteが有効じゃないと発覚した時。](https://cquery.net/modrewrite_parmlink_404.html)
- [qTranslate Xの使い方ーWordPressプラグイン \| TechAcademyマガジン](https://techacademy.jp/magazine/8034)
- [mod rewrite - How do you enable mod_rewrite? - Stack Overflow](http://stackoverflow.com/questions/3131236/how-do-you-enable-mod-rewrite)
- [ブログ初心者が最低限覚えておくべきブログの書き方10ヶ条](https://naifix.com/blog-beginner/#URL)

