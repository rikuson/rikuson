---
layout: post
title: MacでCSVファイルをコマンドラインからSQLで編集
date: 2017-04-23 03:10:33 +0800
tags: 
image: https://rikson.imgix.net/alexandru-tugui-185047.jpg?w=856
---
CSVの編集にはOfficeのAccessが便利だけど、MacにはAccessがない。  
そこで、ターミナルからサクッとCSV編集する方法を2通り考えた。

## qコマンド

シンプルなコマンドでSQL文が実行できる。  
SELECT文しかないので、複雑な処理には向かない。  
また、出力のときにダブルクォーテーションのエスケープができない。

### インストール

MacならHomebrewでインストールできる。

```bash
$ brew install q 
```

### よく使うオプション

詳しい使い方は[こちら](http://harelba.github.io/q/usage.html)で確認できる。

| オプション | 挙動                           |
| ---------- | ------------------------------ |
| H          | ヘッダーを含めてインプット。   |
| d          | デリミタ指定。                 |
| O          | ヘッダーを含めてアウトプット。 |
| W          | エスケープ。                   |


### 例

Shift-JISで読み込んだらうまくいかなかったので、nkfで予めUTF-8に変換してから実行。

```bash
$ nkf -w --overwrite dl.csv
$ q -H -d , -O -W all "SELECT * FROM './dl.csv'" 
```

## SQLite3

SQLiteはCSV編集ツールではなくデータベースだが、CSV編集などの用途でも便利。  
インポートしても `.exit` したらテーブルが消えるので、こういう用途にはちょうどいい。  
SELECT文だけでなく、UPDATE文も対応している。

### インストール

MacならHomebrewでインストールできる。

```bash
$ brew install sqlite3 
```

### よく使うコマンド

| コマンド    | 動作                           |
| ----------- | ------------------------------ |
| .tables     | テーブル一覧。                 |
| .separator  | デリミタ指定。                 |
| .import     | テーブルインポート。           |
| .headers on | ヘッダーを含めてアウトプット。 |
| .mode csv   | CSV形式でアウトプット。        |
| .output     | 出力ファイル指定。             |
| .exit       | 終了。                         |


### 例

事前に文字コードをUTF-8に変換しないと、カラム名を指定しても「no such column」となる。  
ワイルドカード（曖昧検索）は `%` を使って表現する。  
各コマンドの先頭には「.」を付けるが、SQL文には付けない。  
SQL文の末尾には「;」が必要。

```bash
$ nkf -w --overwrite dl.csv
$ sqlite3
sqlite> .separator ,
sqlite> .import dl.csv item
sqlite> SELECT * FROM item;
sqlite> UPDATE item SET カラム名='値';
sqlite> .mode csv
sqlite> .headers on
sqlite> .output item.csv
sqlite> SELECT * FROM item WHERE カラム名 LIKE '%値%';
sqlite> .exit
```

