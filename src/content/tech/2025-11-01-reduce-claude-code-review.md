---
layout: post
title: Claude Codeレビューを自動保存する方法
date: 2025-11-01 19:10:00 +0900
tags: [GitHub Actions, Claude, AI, Code Review]
---

Claude Codeを使ったコードレビューの結果を、GitHubのPRコメントとして自動的に保存する方法を紹介します。

## 背景

Claude Codeは強力なAIアシスタントですが、レビュー結果をそのままにしておくと、後で見返すことが難しくなります。

さらに重要なのは、**無料のGitHubアカウントではCI実行時間に制限がある**という点です。そのため、レビュー結果を一度実行したら確実に保存しておく必要があります。実行時間の制限内で効率的にClaude Codeレビューを活用するため、GitHub Actionsを使ってレビュー結果をPRコメントとして自動保存する仕組みを構築しました。

## 実装方法

### 基本的なワークフロー設定

GitHub Actionsワークフローを使用して、以下の2つの方法でClaude Codeレビューを実行できます:

1. **自動実行**: PRがオープンされたとき、またはドラフトから準備完了になったときに自動的に実行
2. **手動実行**: GitHub Actions UIから任意のブランチに対して手動で実行

### ワークフローのトリガー設定

```yaml
on:
  pull_request:
    types: [opened, ready_for_review]
  workflow_dispatch:
```

- `pull_request`: PR関連のイベントで自動実行
- `workflow_dispatch`: GitHub Actions UIから手動実行を可能にする

### 動的なPR番号の取得

手動実行時の最大の課題は、選択したブランチに対応するPR番号を自動的に取得することでした。これは以下のステップで実現します:

```yaml
- name: Get PR number from branch
  if: github.event_name == 'workflow_dispatch'
  id: get-pr
  run: |
    PR_NUMBER=$(gh pr list --head ${{ github.ref_name }} --base main --json number --jq '.[0].number')
    if [ -z "$PR_NUMBER" ]; then
      echo "Error: No PR found for branch ${{ github.ref_name }} targeting main"
      exit 1
    fi
    echo "pr_number=$PR_NUMBER" >> $GITHUB_OUTPUT
```

このステップでは:
1. GitHub CLIを使用して、選択したブランチのPRを検索
2. mainブランチをターゲットとするPRを見つける
3. PR番号を環境変数として保存
4. PRが見つからない場合はエラーを返す

### レビュー結果の投稿

レビュー結果は常にPRコメントとして投稿されます:

```yaml
- name: Post review comment
  run: |
    gh pr comment ${{ steps.get-pr.outputs.pr_number || github.event.pull_request.number }} \
      --body "$(cat review.md)"
```

## 改善の歴史

### 第1バージョン (PR #70)

最初の実装では、手動実行時に以下の入力パラメータを要求していました:
- `branch`: レビュー対象のブランチ名(必須)
- `pr_number`: PR番号(オプション)

しかし、この方法には以下の問題がありました:
- ユーザーがブランチ名とPR番号の両方を手動で入力する必要がある
- PR番号を間違えるリスクがある
- 使い勝手が悪い

### 第2バージョン (PR #71)

改善版では、入力パラメータを完全に削除し、以下の機能を実装しました:
- ブランチ選択のみでPR番号を自動検出
- GitHub CLIを使用した動的なPR番号取得
- ゼロコンフィグレーションでの実行
- エラーハンドリングの改善

## 使い方

### 自動実行

PRをオープンするか、ドラフトPRを準備完了にするだけで、自動的にClaude Codeレビューが実行され、結果がPRコメントとして投稿されます。

### 手動実行

1. GitHubリポジトリの**Actions**タブに移動
2. **Claude Code Review**ワークフローを選択
3. **Run workflow**をクリック
4. "Use workflow from"ドロップダウンからブランチを選択
5. **Run workflow**をクリック

ワークフローが自動的にそのブランチに対応するPRを見つけ、レビュー結果をコメントとして投稿します。

## メリット

1. **CI実行時間の節約**: 無料アカウントの制限内で効率的に運用可能
2. **レビュー履歴の保存**: すべてのレビュー結果がPRコメントとして記録される
3. **チーム共有**: チームメンバー全員がレビュー結果を確認できる
4. **柔軟な実行方法**: 自動実行と手動実行の両方に対応
5. **シンプルな操作**: ブランチを選択するだけで実行可能
6. **エラー防止**: PR番号の自動検出により、手動入力ミスを防止

## 今後の展望

現在の実装でも十分に機能しますが、**Claude Codeをレビュワーに指定・再レビュー依頼できればもっとエレガントなんだけど、やり方ないかなー**と考えています。

理想的には:
- PRのレビュワーとしてClaude Code(ボット)を追加
- 通常のレビュワーと同じように再レビューをリクエスト
- コード変更時に自動的に再レビューが実行される

このようなネイティブな統合ができれば、より自然なワークフローになりそうです。もし良い方法をご存知の方がいたら、ぜひ教えてください!

### 代替案: Ready for Reviewの活用

**Ready for Reviewをオン・オフするのもありだな**と思っています。

現在のワークフローは `ready_for_review` イベントをトリガーにしているため:
1. コード修正後、PRをドラフトに戻す
2. 再度「Ready for review」にする
3. 自動的にClaude Codeレビューが再実行される

この方法なら、追加のワークフロー実行やUIでの手動実行なしに、GitHub標準の機能だけで再レビューを依頼できます。レビューが必要なタイミングを明示的にコントロールできるのも良いですね。

## まとめ

GitHub ActionsとGitHub CLIを組み合わせることで、Claude Codeレビューの結果を自動的にPRコメントとして保存し、チーム全体で共有できる仕組みを構築できました。

この実装により、AIによるコードレビューの価値を最大限に活用し、開発プロセスの品質向上に貢献できます。

ワークフローの改善を重ねることで、より使いやすく、エラーの少ない仕組みになりました。皆さんもぜひ試してみてください!

🤖 Generated with [Claude Code](https://claude.com/claude-code)
