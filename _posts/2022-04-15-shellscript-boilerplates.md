---
layout: post
title: Shellscriptの定型処理
categories: [category, programming]
tags:
---

Shellscriptの備忘録。

<!--
## 入出力
-->
## ファイル

### ファイルが作成されたら実行

```bash
inotifywait -e CREATE -mq /your/dir --format "%f" | while read LINE; do
  echo $LINE
done
```

## 文字列

### 末尾から切り取り

```bash
file=foo.mp4
echo ${file%.mp4} # foo
```

### 先頭から切り取り

```bash
file=foo.mp4
echo ${file##foo} # .mp4
```

## ネットワーク

### TCP疎通確認

```bash
nc -w 1 -v -z example.com 80
```

## メディア

### RTSPストリームの録画

```bash
ffmpeg -i rtsp://example.com -vcodec copy -acodec copy -f mp4 -movflags faststart output.mp4
```

### RTSPストリームの分割録画

```bash
ffmpeg -i rtsp://example.com -vcodec copy -acodec copy -f segment -segment_time 1800 -reset_timestamps 1 -segment_format_options movflags=+faststart output-%03d.mp4
```

### mp4からdurationの取得

```bash
ffprobe -i input.mp4 -show_entries format=duration -v quiet -of csv="p=0" | awk '{printf("%d\n",$1)}'
```

### mp4からサムネイルの生成

動画尺の1%の位置で画像を抽出。

```bash
duration=`ffprobe -i input.mp4 -show_entries format=duration -v quiet -of csv="p=0" | awk '{printf("%d\n",$1)}'`
ffmpeg -i input.mp4 -frames:v 1 -ss $((duration/10)) -t $duration -r 1 -f image2 output.jpg
```

## Docker

### Dockerfileをビルド

```bash
docker build -t <IMAGE_NAME>:<TAG> <PATH_TO_DOCKERFILE>
```

### コンテナイメージのエクスポート

```bash
docker save <IMAGE_NAME> -o archive.tar
```

### コンテナイメージのインポート

```bash
docker load -i archive.tar
```

### コンテナイメージにタグを付ける

```bash
docker tag <IMAGE_NAME>:<TAG> <IMAGE_NAME>:<NEW_TAG>
```
### コンテナ内からDockerのログに出力

Docker内のフォアグラウンドで動作しているプロセスの標準出力はDockerのログに出力される。  
バックグラウンドで動作しているプロセスの場合はリダイレクトする必要がある。

```bash
echo Hello > /proc/1/fd/1
```