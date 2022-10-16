---
layout: post
title: 【ShellScript】ループの中でユーザーのキー入力を受け付ける
categories: [category, programming]
tags:
---

ShellScriptで対話的なインターフェースを実装することはよくあると思う。  
それだけなら話は難しくない。

```bash
read -r -p "First name: " firstname
read -r -p "Last name: " lastname
read -r -p "Your age: " age

echo
echo "Answers:"
echo "First name: $firstname"
echo "Last name: $lastname"
echo "Your age $age"
```

次に、カレントディレクトリ内のファイルに対して標準入力から何らかの命令を行うことを考える。  
愚直に実装するとこんな感じ。

```bash
ls | while read file; do
  [[ -d $file ]] && continue
  read -r -p "Spread $file? [y/n]" input
  [[ $input == "y" ]] && cat $file
done
```

しかし、実際に実行すると、ユーザーの入力を受け付ける前にタスクが終了してしまう。  
/dev/ttyを入力することで、この問題は解決できる。

```bash
ls | while read file; do
  [[ -d $file ]] && continue
  read -p "Spread $file? [y/n] " input < /dev/tty
  [[ $input == "y" ]] && cat $file
done
```

これで要件は満たせるが、この方法だと`yes`コマンドなどのパイプを使った入力できない。  
そのため、CI/CDスクリプトでの実行や、ユニットテストが出来ない。  
次のようにすることでパイプからの入力も可能になる。（理屈はよく分からん。）

```bash
while read file <&3; do
  [[ -d $file ]] && continue
  read -p "Spread $file? [y/n] " input
  [[ $input == "y" ]] && cat $file
done 3<<< "$(ls)"
```

注意点として、`$(ls)`をダブルクォーテーションで囲んでないと改行が取り除かれて期待通りの動きにならない。  
こうして秘伝のタレが熟成されていくのだった。
