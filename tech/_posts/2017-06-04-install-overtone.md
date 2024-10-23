---
layout: post
title: プログラマブルミュージック MacでOvertoneのインストールと曲の再生
date: 2017-06-04 02:35:12 +0800
tags: [clojure, overtone]
image: https://rikson.imgix.net/overtone.jpg
---
今回はプログラミング言語で作曲できる「Overtone」をインストールしてみる。  
同様のソフトは他にもSuperCollider、Sonic Pi、Taktなどがある。

MIDIデータ作成が目的ならTaktが一番適していると思う。  
学習コストが低く、MIDIの作成ならベロシティの設定までカバーしている。  
オシレーターが使え無さそうだったので、僕は選択肢から外した。

SuperColliderはこの中で一番古く、OvertoneもSonic PiもSuperColliderを利用して作られているみたい。  
SuperColliderは独自言語で、OvertoneはClojureで、Sonic PiはRubyで書くことが出来る。  
Sonic Piは、Overtoneに比べて機能が少なそう。

## インストール

OvertoneはClojureで動作するので、まずはClojureをインストール。

```bash
$ brew install leiningen 
```

適当な所に移動してプロジェクトを作成

```bash
$ lein new tutorial 
```

次にプロジェクトの依存をproject.cljに記述。

```bash
$ vim tutorial/project.clj 
(defproject tutorial "1.0"
  :dependencies [ [org.clojure/clojure "1.8.0"]
                  [overtone "0.10.1"] ])
```

ディレクトリの中へ入って、依存ファイルをインストール

```bash
$ cd tutorial
$ lein deps 
```

## ライブコーディング

動作確認のためにライブコーディング的なものをやってみる。
まずはREPLを起動。

```bash
$ lein repl 
```

足し算

```clojure
user=&gt; (+ 1 2)
3 
```

実際に音を鳴らしてみる。
Overtoneを起動。

```clojure
user=&gt;(use 'overtone.live) 
```

以下を入力すると音が鳴るはず。

```clojure
user=>(demo 7 (lpf (mix (saw [50 (line 100 1600 5) 101 100.5]))
                   (lin-lin (lf-tri (line 2 20 5)) -1 1 400 4000)))
```

## 曲を再生してみる

[Chris Ford](https://github.com/ctford)氏が公開している曲をダウンロードして再生してみる。

```bash
$ git clone https://github.com/ctford/whelmed.git
$ cd whelmed
$ lein run
...
Exception in thread "main" java.lang.Exception: Unable to read file - perhaps path is not a valid audio file 
```

WAVファイルが大きすぎてダウンロードがうまくできていないようだ。  
ということで、大きなファイルをcloneできるようにする。

```bash
$ brew install git-lfs
$ git lfs install
Git LFS initialized. 
```

改めてcloneして、再生してみる。

```bash
$ git clone https://github.com/ctford/whelmed.git
$ cd whelmed
$ lein run 
```

## 参考

- [Welcome to the Overtone Wiki](https://github.com/overtone/overtone/wiki)
- [Getting started with Clojure and Overtone \| Simon Owen \| Front-End Developer](http://s10wen.com/blog/2014/07/24/getting-started-with-clojure-and-overtone/)
- [高機能な音楽プログラミング言語Takt - 丸井綜研](http://marui.hatenablog.com/entry/2014/09/14/150337)

