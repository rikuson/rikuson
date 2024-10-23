---
layout: post
title: Expressをインストールしてプロジェクト作成
date: 2017-06-11 04:05:21 +0800
tags: [javascript, node-js]
image: https://rikson.imgix.net/express.jpg
---
ExpressとはNode.js向けに作られたシンプルなフレームワークである。  
今回はExpressでプロジェクトを作成してみる。

## インストール

```bash
$ mkdir tutorial
$ cd tutorial
$ npm init
... 
```

いろいろ聞かれますが、全部EnterでOK。

```bash
$ npm install --save express 
```

これでインストールは完了。

## WEBサーバーを立ち上げてみる

Expressを使ってWEBサーバーを立ち上げ、「Hello World!」を表示する。  
`app.js`を以下のように書き換える。

```javascript
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

実行して、WEBサーバーを起動。  
`http://localhost:3000`を開いて、「Hello World!」が表示されていたらOK。

```bash
$ node app.js 
```

## Expressのメソッド

Expressの基本的な形式は`app.[method]([path], function(req, res){ });`という形になっている。

主に使うのは下記のメソッド。

- get
- post
- put
- delete

## Express Generator

Express Generatorを使うと素早くプロジェクトの雛形を作成することができる。

```bash
$ npm install -g express-generator 
```

プロジェクトを作成。

```bash
$ express tutorial
$ cd tutorial
$ npm install 
```

こんな感じの構成になっている。

下記のコマンドを実行して、`http://localhost:3000`を開いて表示を確認。

```bash
$ npm start 
```

![](https://rikson.imgix.net/cfa4af82a898b512f4e3ab9c7b90367d-e1496920669796.png)

## 参考

- [Express - Node.js Web アプリケーション・フレームワーク](http://expressjs.com/ja/)
- [JavaScriptエンジニアのためのNode.js入門](http://amzn.to/2sGoTUS)

