import "./globals.css";

export const metadata = {
  title: "Manuscript Studio - 求人原稿作成ツール",
  description: "ジョブメドレー・エアワーク・Indeed対応の求人原稿作成ツール",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
