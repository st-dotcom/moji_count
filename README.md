# LexiScan

**LexiScan** は、研究者や学生が執筆活動を効率化するために設計された、モダンで洗練された英文単語カウントツールです。
単なるカウント機能にとどまらず、論文執筆に役立つ「語彙の重複チェック」や「読了時間の予測」を備えています。



## 特徴

- **マルチファイル対応**: `.txt` だけでなく、Microsoft Word (`.docx`) ファイルの直接読み込みに対応。
- **インテリジェント・カウント**: リアルタイムで単語数、文字数をカウント。
- **読了時間予測**: 1分間に200単語のペースと仮定した読了目安時間を算出。
  $$\text{Reading Time} = \left\lceil \frac{\text{Total Words}}{200} \right\rceil$$
- **重複単語チェック (Redundancy Check)**: 文章内で3回以上出現する単語を抽出し、語彙の多様性をサポート。
- **洗練されたUI**: Tailwind CSS v4 を使用した、目に優しく直感的なデザイン。

## テックスタック

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Parsing**: [Mammoth.js](https://github.com/mwilliamson/mammoth.js) (for .docx files)
- **Deployment**: [Vercel](https://vercel.com/)
