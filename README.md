# TIU Campus App

Toshofu International University の学生向けスマホアプリ風 PWA です。今回はバックエンドや DB 連携を行わず、仮データのみで実装しています。

## 技術構成

- Vite + React
- 通常 CSS
- PWA 対応
- 仮データのみ

## 起動方法

```bash
npm install
npm run dev
```

ローカル表示:

```text
http://localhost:5173
```

## ビルド

```bash
npm run build
```

ビルド成果物は `dist/` に出力されます。

## ログイン情報

```text
学籍番号: TIU001
パスワード: 0001
```

## Azure Static Web Apps への公開手順

1. GitHub にこのリポジトリを push します。
2. Azure Portal で Static Web Apps を作成します。
3. デプロイ元に GitHub リポジトリを選択します。
4. Build Details を以下に設定します。

```text
App location: /
Api location: 空欄
Output location: dist
Build command: npm run build
```

5. 作成後に GitHub Actions が自動生成され、main ブランチへの push で公開されます。
