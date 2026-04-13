---
title: "資料遷移"
date: "2026-04-13"
description: "如何透過 CSV 將其他應用程式或試算表中的歷史撲克牌局記錄匯入本應用程式（原生格式 / PBT / AI 轉換）。"
---

你可以透過 CSV 將之前在其他應用程式或試算表中記錄的撲克牌局匯入本應用程式。
開啟 設定 → **匯入資料**，選擇一個 CSV 檔案即可。

不同來源的操作步驟如下。

## 本應用程式（備份與還原）

適用於更換裝置或重新安裝時的完整還原。

1. 在舊裝置上，進入 設定 → **CSV 匯出**，匯出檔案
2. 將檔案傳輸到新裝置（AirDrop / 雲端 / 電子郵件等）
3. 在新裝置上，進入 設定 → **匯入資料**，選擇該檔案
4. 在預覽畫面確認顯示「已偵測到原生格式」，然後點按 **開始匯入**

所有欄位會自動對應，資料將無損還原。

## Poker Bankroll Tracker

可以直接匯入 PBT 的 CSV（CSV 匯出僅限 PBT Pro 版）。

1. 在 PBT 應用程式中進入 Account → CSV Export
2. 在本應用程式中進入 設定 → **匯入資料**，選擇 PBT 的 CSV
3. 點按 **開始匯入**

`Deposit/Payout` / `Costs` 等非撲克列會自動略過，數量會顯示在匯入結果畫面上。

## 其他來源（使用 AI 格式化）

對於從 Pokerbase、Excel / Google Sheets 或其他應用程式匯出的 CSV，可以將下方的 prompt 連同你的 CSV 一起貼到 ChatGPT / Claude / Gemini 中進行轉換。遇到缺少資訊（牌局形式、級別等）時，AI 會向你確認並補全。

### 使用方法

1. 複製下方 prompt 並貼到 AI
2. 將你的 CSV 貼到 prompt 末尾 `### CSV to Convert` 下方，然後執行
3. 將傳回的 CSV 另存為 `.csv`（UTF-8），在應用程式中匯入

### 轉換 Prompt

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

**Respond to the user in Traditional Chinese.**

### CSV to Convert

(Paste your CSV below this line.)
~~~

---

## 參考：原生 CSV 格式

### 欄位定義

| 欄位 | 格式 | 必填 | 備註 |
|---|---|---|---|
| Date | `yyyy-MM-dd` | 是 | |
| Start Time | `HH:mm`（24 小時制） | 是 | |
| End Time | `HH:mm` | | 預設為 Start Time + 1h |
| Duration (min) | 整數 | | 匯入時忽略（會自動重新計算） |
| Format | `CASH GAME` 或 `MTT` | 是 | |
| Stakes | `SB/BB`（例：`2/5`） | 僅 Cash Game | MTT 留空 |
| Currency | ISO 4217 三碼英文 | 是 | `USD`、`JPY` 等 |
| Location | 任意文字 | | |
| Buy-in | 整數（不含千分位） | 是 | |
| Rebuy | 整數 | | 總加碼金額 |
| Cash Out | 整數 | | 預設 `0`（視為 bust） |
| Total Investment / Profit | 整數 | | 匯入時忽略（會自動重新計算） |
| Note | 任意文字 | | 包含 `,` / `"` / 換行時以 `"..."` 包起來 |

### 範例

```
Date,Start Time,End Time,Duration (min),Format,Stakes,Currency,Location,Buy-in,Rebuy,Total Investment,Cash Out,Profit,Note
2026-04-01,19:00,23:30,270,CASH GAME,2/5,USD,Aria,500,0,500,1200,700,"今天狀態不錯"
2026-04-02,20:00,23:00,180,MTT,,USD,Wynn Las Vegas,300,0,300,800,500,
```

### 疑難排解

- **亂碼**：在匯入畫面將編碼切換為 `Shift-JIS`
- **「必填欄位不足」**：在對應畫面確認五個必填欄位（Date / Start Time / Format / Buy-in / Currency）是否被設為 `不匯入`
- **「日期/時間解析失敗」**：支援格式為 `yyyy-MM-dd HH:mm[:ss]`、`yyyy/MM/dd HH:mm`、`MM/dd/yyyy HH:mm`、`dd/MM/yyyy HH:mm`、ISO 8601（`2026-01-01T19:00:00+09:00`）
- **「現金桌需要級別」**：請以 `SB/BB` 格式提供 `Stakes` 欄位，或以 `Small Blind` / `Big Blind` 分為兩個欄位。若都沒有，請使用上方的 AI prompt 補全
- **小數金額（`0.5`、`0,5`）**：由於數值以整數儲存會被截斷。微級別牌局建議將金額乘以 100 管理
