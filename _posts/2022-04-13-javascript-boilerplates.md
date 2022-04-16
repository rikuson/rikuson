---
layout: post
title: JavaScriptの定型処理
categories: [category, programming]
tags:
---

JavaScriptでよく書く処理の備忘録。

## ユーティリティ

### 配列から重複した値を削除

```javascript
function uniq(ary) {
  return [...new Set(ary)];
}
```

## Date

### UTC文字列からローカルタイムゾーンに合わせてDateオブジェクトの作成

```javascript
function createLocalDate(str) {
  const date = new Date();
  const [, year, month, day, hour, minute, second, milliseconds] = str.match(
    /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2}).(\d{3})/
  );
  date.setUTCFullYear(Number(year));
  date.setUTCMonth(Number(month) - 1);
  date.setUTCDate(Number(day));
  date.setUTCHours(Number(hour));
  date.setUTCMinutes(Number(minute));
  date.setUTCSeconds(Number(second));
  date.setUTCMilliseconds(Number(milliseconds));
  return date;
}
```

## History

### URLパラメーターの取得

```javascript
const url = new URL(window.location);
const val = url.searchParams.get('key');
```

### URLパラメーターの全取得

```javascript
const params = window.location.search.slice(1).split('&').reduce((acc, cur) => {
    const [key, value] = cur.split('=');
    return { ...acc, [key]: decodeURIComponent(value) };
}, {});
```