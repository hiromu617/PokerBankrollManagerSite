---
title: "データ移行"
date: "2026-04-13"
description: "他アプリやスプレッドシートで記録していた過去のポーカーセッションを CSV で取り込む方法 (ネイティブ形式 / PBT / AI 変換)。"
---

他アプリやスプレッドシートで記録してきた過去のポーカーセッションを、CSV で本アプリに取り込めます。
設定画面 → **「データをインポート」** から CSV を選択してください。

以下は移行元別の手順です。

## 本アプリ (バックアップ・復元)

機種変更・再インストール時の完全復元に使えます。

1. 旧端末の 設定 → **CSV エクスポート** で CSV を書き出す
2. 新端末にファイルを転送する (AirDrop / クラウド / メール等)
3. 新端末の 設定 → **データをインポート** からファイルを選択
4. プレビュー画面で「ネイティブ形式を検出しました」と表示されることを確認し、**インポート開始**

すべての列が自動マッピングされ、損失なく復元されます。

## Poker Bankroll Tracker

PBT の CSV をそのまま取り込めます (CSV エクスポートは PBT Pro 版のみ対応)。

1. PBT アプリで Account → CSV エクスポート
2. 本アプリの 設定 → **データをインポート** で PBT の CSV を選択
3. **インポート開始**

`Deposit/Payout` / `Costs` などの非ポーカー行は自動でスキップされ、件数はインポート結果画面に表示されます。

## その他 (AI でフォーマット)

Pokerbase、Excel / Google Sheets、その他アプリからエクスポートした CSV は、ChatGPT / Claude / Gemini などに下記プロンプトと一緒に貼り付けることで、本アプリ用に変換できます。不足情報 (ゲーム形式・ステークスなど) は AI がユーザーに確認しながら補完します。

### 使い方

1. 下記プロンプトをコピーして AI に貼り付ける
2. 末尾の `### 変換対象の CSV` の下に自分の CSV を貼り付けて実行
3. 返ってきた CSV を `.csv` (UTF-8) として保存し、アプリでインポート

### 変換プロンプト

~~~
You are a CSV conversion assistant for poker session logs.
Convert the user's arbitrary-format CSV into the "Poker Bankroll Manager native CSV format" defined below.

### Output Specification

- Encoding: UTF-8, delimiter: `,`, line ending: LF
- Quote a field with `"..."` only if it contains `,`, `"`, or a newline. Escape inner `"` as `""`.
- The first line must be exactly this header:

```
Date,Start Time,End Time,Duration (min),Format,Stakes,Currency,Location,Buy-in,Rebuy,Total Investment,Cash Out,Profit,Note
```

### Column Formats

| Column | Format | Required |
|---|---|---|
| Date | `yyyy-MM-dd` | Yes |
| Start Time | `HH:mm` | Yes |
| End Time | `HH:mm` (if unknown, Start + 1h) | |
| Format | `CASH GAME` or `MTT` | Yes |
| Stakes | `SB/BB` (e.g., `2/5`) | Cash Game only |
| Currency | ISO 4217 (`USD`, `JPY`, …) | Yes |
| Location | free text | |
| Buy-in | integer (no thousands separator) | Yes |
| Rebuy | integer (use `0` if none) | |
| Total Investment | `Buy-in + Rebuy` | |
| Cash Out | integer | recommended |
| Profit | `Cash Out - Total Investment` | |
| Note | free text | |

Duration / Total Investment / Profit may be omitted (or set to `0`).

### Conversion Rules

1. **Unknown game format** → if stakes look like `SB/BB`, treat as Cash Game; if there is a `Buy-in` + tournament name, treat as MTT. If still ambiguous, ask the user.
2. **Profit given but no cash out** → `Cash Out = Buy-in + Rebuy + profit`.
3. **ISO 8601 datetime** → split into `Date` and `Start Time` / `End Time`.
4. **Date only, no time** → tentatively use `Start Time = 12:00`, `End Time = 13:00`.
5. **Amounts with currency symbols or thousands separators** (`$1,234.56`, `€500`) → strip symbols and decimals; convert to integer.
6. **Decimal stakes** (e.g., `0.5/1`) → ask the user whether to multiply by 100 (→ `50/100`) or truncate (→ `0/1`).
7. **Non-poker rows** (`Deposit/Payout`, `Costs`, `Jackpot/Bonus`, `Casino Games`, etc.) → exclude from output.
8. **Cash Game rows without a stakes column** → ask the user for a default stakes value.
9. **Cash Game with Buy-in = 0** → if it is a freeroll, ask whether to reclassify as MTT.

### Output

First, list 3–5 assumptions or points of concern. If anything is unclear, ask the user.
Once there are no open questions, output the converted CSV in a code block, followed by a summary of "input rows / output rows / excluded rows".

**Respond to the user in Japanese.**

### CSV to Convert

(Paste your CSV below this line.)
~~~

---

## 参考: ネイティブ CSV 形式

### 列の定義

| 列 | 形式 | 必須 | 備考 |
|---|---|---|---|
| Date | `yyyy-MM-dd` | ○ | |
| Start Time | `HH:mm` (24 時間) | ○ | |
| End Time | `HH:mm` | | 省略時は Start Time + 1h |
| Duration (min) | 整数 | | インポート時は無視 (自動で再計算) |
| Format | `CASH GAME` または `MTT` | ○ | |
| Stakes | `SB/BB` (例: `2/5`) | Cash Game のみ | MTT は空 |
| Currency | ISO 4217 3 文字コード | ○ | `USD`, `JPY` など |
| Location | 任意 | | |
| Buy-in | 整数 (カンマ区切りなし) | ○ | |
| Rebuy | 整数 | | 合計リバイ額 |
| Cash Out | 整数 | | 省略時は `0` (バスト扱い) |
| Total Investment / Profit | 整数 | | インポート時は無視 (自動で再計算) |
| Note | 任意 | | `,` / `"` / 改行 を含む場合は `"..."` で囲む |

### 例

```
Date,Start Time,End Time,Duration (min),Format,Stakes,Currency,Location,Buy-in,Rebuy,Total Investment,Cash Out,Profit,Note
2026-04-01,19:00,23:30,270,CASH GAME,2/5,USD,Aria,500,0,500,1200,700,"良い日だった"
2026-04-02,20:00,23:00,180,MTT,,USD,Wynn Las Vegas,300,0,300,800,500,
```

### トラブルシューティング

- **文字化け**: インポート画面で文字コードを `Shift-JIS` に切り替える
- **「必須項目が不足」**: マッピング画面で 5 つの必須列 (Date / Start Time / Format / Buy-in / Currency) が `取り込まない` になっていないか確認
- **「日時の解釈に失敗」**: 対応形式は `yyyy-MM-dd HH:mm[:ss]` / `yyyy/MM/dd HH:mm` / `MM/dd/yyyy HH:mm` / `dd/MM/yyyy HH:mm` / ISO 8601 (`2026-01-01T19:00:00+09:00`)
- **「キャッシュゲームにはステークスが必要」**: `Stakes` 列を `SB/BB` 形式で用意するか、`Small Blind` / `Big Blind` を別列で用意。用意できない場合は上記 AI プロンプトで補完
- **小数金額 (`0.5`, `0,5`)**: 整数管理のため切り捨てられます。マイクロステークスは金額を 100 倍して管理することを推奨
