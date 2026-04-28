# Manuscript Studio

求人原稿作成ツール（ジョブメドレー・エアワーク・Indeed対応）

## 機能

- **ジョブメドレー**：原稿作成・スカウトメール・通勤圏抽出・画像プロンプト
- **エアワーク**：原稿作成（4パターン×4トーン）・タグ自動推奨
- **Indeed**：直接投稿用原稿作成（4ステップ構造）

## デプロイ方法

### 1. Anthropic API キーを取得

[Anthropic Console](https://console.anthropic.com/) でAPIキーを発行してください。

### 2. Vercel にデプロイ

このフォルダ全体（ZIP）を Vercel の「Deploy」画面にドラッグ&ドロップしてください。

### 3. 環境変数を設定

Vercel の Settings > Environment Variables で以下を追加：

| Key | Value |
|-----|-------|
| `ANTHROPIC_API_KEY` | 取得したAPIキー |

### 4. 完了

Vercelが発行する URL（例：`xxxxx.vercel.app`）でアプリにアクセスできます。

## 注意

- API キーは絶対に公開リポジトリにコミットしないでください
- `.env` ファイルは `.gitignore` で除外されています
- API使用料金はAnthropicに従量課金されます

## ローカルで動かす（開発者向け）

```bash
npm install
cp .env.example .env.local
# .env.local の ANTHROPIC_API_KEY を編集
npm run dev
```
