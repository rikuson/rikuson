---
layout: post
title: WordMoveを使ってFTP経由でWordPressのローカル環境と本番環境を同期させる
date: 2017-02-05 09:56:03 +0800
tags: [wordpress]
image: https://rikson.imgix.net/wordmove.jpg
---
## WordMoveとは

WordMoveとはローカル環境のWordPressと本番サーバー上のWordPressを同期させるためのコマンドラインツールである。  
SSHだけでなくFTP経由でも同期させることができるので、レンタルサーバーをケチっている人でも使える。

WordMoveで同期できるのはデータベースだけではない。  
プラグインや画像やテーマファイルなど、基本的にWordPressをまるごと同期できる。

また、アップロードだけでなく、本番サーバー上のWordPress環境をダウンロードしてくることもできる。

## lftpインストール

WordMoveをFTPで使う場合はlftpというFTPクライアントが必要になる。

```bash
$ brew install lftp
```

Homebrewでlftpは廃止されていて、うまくインストールできない場合がある。  
そんなときは、以下のコマンドでインストールできる。

```bash
$ brew install homebrew/boneyard/lftp
```

## WordMoveのインストール・設定

```bash
$ gem install wordmove
```

インストールが完了したらローカル環境上のブログのディレクトリへ移動して、下記のコマンドを実行する。

```bash
$ wordmove init
```

`Movefile` という名前のyaml形式の設定ファイルが生成されるので、下記のように編集。

```yaml
local: # ローカル環境の設定
  vhost: "http://localhost/wordpress" # テスト環境のブログのURL
  wordpress_path: "/Library/WebServer/Documents/wordpress/" # ブログを設置している場所

  database:
    name: "database_name"
    user: "user"
    password: "password"
    host: "localhost" # IPアドレスで動かない場合はlocalhostに書き換える

production: # 本番環境の設定
  vhost: "http://rikson.net" # ブログのURL
  wordpress_path: "/" # 本番環境でブログを設置する場所

  database:
    name: "database_name"
    user: "user"
    password: "password"
    host: "host"
    # port: "3308" # Use just in case you have exotic server config
    # mysqldump_options: "--max_allowed_packet=1G" # Only available if using SSH

  exclude: # 本番環境と同期したくないファイル
    - ".git/"
    - ".gitignore"
    - ".sass-cache/"
    - "node_modules/"
    - "bin/"
    - "tmp/*"
    - "Gemfile*"
    - "Movefile"
    - "wp-config.php"
    - "wp-content/*.sql"
    - ".htaccess" # 必要に応じて追加

  # paths: # you can customize wordpress internal paths
    #   wp_content: "wp-content"
    #   uploads: "wp-content/uploads"
    #   plugins: "wp-content/plugins"
    #   mu_plugins: "wp-content/mu-plugins"
    #   themes: "wp-content/themes"
    #   languages: "wp-content/languages"

  # ssh:
  #   host: "host"
  #   user: "user"
  #   password: "password" # password is optional, will use public keys if available.
  #   port: 22 # Port is optional
  #   rsync_options: "--verbose" # Additional rsync options, optional
  #   gateway: # Gateway is optional
  #     host: "host"
  #     user: "user"
  #     password: "password" # password is optional, will use public keys if available.

  ftp:
    user: "user"
    password: "password"
    host: "host"
    passive: true
    scheme: "ftp" # ftpsだと動かなかった

# staging: # multiple environments can be specified
#   [...]
```

今回はFTPを利用して同期するので、ftpの項目のコメントアウトを外す。  
yamlはスペースの数が違うだけでエラーになるので、気をつけること。

`scheme` をftpsにすると、何故か動かなかった。

## デプロイ

では、アップロードしてみよう。

```bash
$ wordmove push --all -e production
```

・・・どうですか？
うまくいかなかったでしょう？笑

理由は分からないが、以下のようにバラバラにアップロードすることでうまくいった。

```bash
$ wordmove push -w # WordPressの本体
$ wordmove push -u # メディアファイル
$ wordmove push -t # テーマファイル
$ wordmove push -p # プラグインファイル
$ wordmove push -l # 言語ファイル
$ sudo wordmove push -d # データベース
```


データベースは最後にアップロードしないとプラグイン等の設定が適用されなかったりするので順番に気をけること。

## 参考

- [wordmoveでローカルのWordPressを速攻デプロイ - たんしおどっとねっと](http://tanshio.net/wordmove/)
- [wordmoveのMovefileのエラーを解決してみた in さくらレンタルサーバ - Qiita](http://qiita.com/hiro93n/items/7a23cac716db0a863203)
- [wordmoveのMovefileのエラーを解決してみた in さくらレンタルサーバ - Qiita](http://qiita.com/hiro93n/items/7a23cac716db0a863203)
- [本番環境のWordPressサイトを『VCCW+WordMove』でローカルと同期！ \| vdeep](http://vdeep.net/vccw-wordmove)

