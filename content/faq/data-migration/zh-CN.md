---
title: "数据迁移"
date: "2026-04-13"
description: "如何通过 CSV 将其他应用或电子表格中的历史扑克牌局记录导入本应用（原生格式 / PBT / AI 转换）。"
---

你可以通过 CSV 将之前在其他应用或电子表格中记录的扑克牌局导入本应用。
打开 设置 → **数据导入**，选择一个 CSV 文件即可。

不同来源的操作步骤如下。

## 本应用（备份与恢复）

适用于更换设备或重新安装时的完整恢复。

1. 在旧设备上，进入 设置 → **CSV 导出**，导出文件
2. 将文件传输到新设备（AirDrop / 云盘 / 邮件等）
3. 在新设备上，进入 设置 → **数据导入**，选择该文件
4. 在预览界面确认显示"已检测到原生格式"，然后点击 **开始导入**

所有列会自动映射，数据将无损恢复。

## Poker Bankroll Tracker

可以直接导入 PBT 的 CSV（CSV 导出仅在 PBT Pro 版可用）。

1. 在 PBT 应用中进入 Account → CSV Export
2. 在本应用中进入 设置 → **数据导入**，选择 PBT 的 CSV
3. 点击 **开始导入**

`Deposit/Payout` / `Costs` 等非扑克行会被自动跳过，数量会显示在导入结果页。

## 其他来源（使用 AI 格式化）

对于从 Pokerbase、Excel / Google Sheets 或其他应用导出的 CSV，可以将下面的 prompt 和你的 CSV 一起粘贴到 ChatGPT / Claude / Gemini 中进行转换。遇到缺失信息（牌局形式、级别等）时，AI 会向你确认并补全。

### 使用方法

1. 复制下方 prompt 并粘贴到 AI
2. 将你的 CSV 粘贴到 prompt 末尾 `### CSV to Convert` 下方，然后运行
3. 将返回的 CSV 保存为 `.csv`（UTF-8），在应用中导入

### 转换 Prompt

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

**Respond to the user in Simplified Chinese.**

### CSV to Convert

(Paste your CSV below this line.)
~~~

---

## 参考：原生 CSV 格式

### 列定义

| 列 | 格式 | 必填 | 备注 |
|---|---|---|---|
| Date | `yyyy-MM-dd` | 是 | |
| Start Time | `HH:mm`（24 小时制） | 是 | |
| End Time | `HH:mm` | | 默认 Start Time + 1h |
| Duration (min) | 整数 | | 导入时忽略（会自动重新计算） |
| Format | `CASH GAME` 或 `MTT` | 是 | |
| Stakes | `SB/BB`（如 `2/5`） | 仅 Cash Game | MTT 留空 |
| Currency | ISO 4217 三位字母代码 | 是 | `USD`、`JPY` 等 |
| Location | 任意文本 | | |
| Buy-in | 整数（无千位分隔符） | 是 | |
| Rebuy | 整数 | | 合计补码金额 |
| Cash Out | 整数 | | 默认 `0`（按 bust 处理） |
| Total Investment / Profit | 整数 | | 导入时忽略（会自动重新计算） |
| Note | 任意文本 | | 包含 `,` / `"` / 换行时用 `"..."` 包裹 |

### 示例

```
Date,Start Time,End Time,Duration (min),Format,Stakes,Currency,Location,Buy-in,Rebuy,Total Investment,Cash Out,Profit,Note
2026-04-01,19:00,23:30,270,CASH GAME,2/5,USD,Aria,500,0,500,1200,700,"今天状态不错"
2026-04-02,20:00,23:00,180,MTT,,USD,Wynn Las Vegas,300,0,300,800,500,
```

### 常见问题

- **乱码**：在导入界面将编码切换为 `Shift-JIS`
- **"必填项缺失"**：在映射界面检查五个必填列（Date / Start Time / Format / Buy-in / Currency）是否被设为 `不导入`
- **"日期/时间解析失败"**：支持的格式包括 `yyyy-MM-dd HH:mm[:ss]`、`yyyy/MM/dd HH:mm`、`MM/dd/yyyy HH:mm`、`dd/MM/yyyy HH:mm`、ISO 8601（`2026-01-01T19:00:00+09:00`）
- **"现金桌需要级别"**：请以 `SB/BB` 格式提供 `Stakes` 列，或者使用 `Small Blind` / `Big Blind` 两个单独的列。如果都没有，请使用上方的 AI prompt 补全
- **小数金额（`0.5`、`0,5`）**：由于数值以整数存储，会被截断。微级别牌局建议将金额乘以 100 管理
