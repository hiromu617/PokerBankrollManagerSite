---
title: "Data Migration"
date: "2026-04-13"
description: "How to import existing poker session data from other apps or spreadsheets via CSV (native format / PBT / AI conversion)."
---

You can import poker sessions you previously recorded in other apps or spreadsheets into this app via CSV.
Open Settings → **Import Data** and select a CSV file.

Procedures vary by the source.

## This App (Backup & Restore)

Use this for a full restore when switching devices or reinstalling.

1. On the old device, go to Settings → **CSV Export** and export the file
2. Transfer the file to the new device (AirDrop / cloud storage / email, etc.)
3. On the new device, go to Settings → **Import Data** and select the file
4. In the preview, confirm that "Native format detected" is shown, then tap **Start Import**

All columns are mapped automatically and data is restored without loss.

## Poker Bankroll Tracker

You can import PBT's CSV directly (CSV export is only available on PBT Pro).

1. In the PBT app, go to Account → CSV Export
2. In this app, go to Settings → **Import Data** and select the PBT CSV
3. Tap **Start Import**

Non-poker rows such as `Deposit/Payout` and `Costs` are skipped automatically. The count is displayed on the import result screen.

## Other Sources (Format with AI)

For CSVs exported from Pokerbase, Excel / Google Sheets, or other apps, you can convert them for this app by pasting the prompt below — together with your CSV — into ChatGPT / Claude / Gemini. The AI will ask you about missing information (game format, stakes, etc.) as needed.

### How to Use

1. Copy the prompt below and paste it into the AI
2. Paste your own CSV below the `### CSV to Convert` line at the bottom of the prompt, then run it
3. Save the returned CSV as `.csv` (UTF-8) and import it into the app

### Conversion Prompt

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

**Respond to the user in English.**

### CSV to Convert

(Paste your CSV below this line.)
~~~

---

## Reference: Native CSV Format

### Column Definitions

| Column | Format | Required | Notes |
|---|---|---|---|
| Date | `yyyy-MM-dd` | Yes | |
| Start Time | `HH:mm` (24-hour) | Yes | |
| End Time | `HH:mm` | | Defaults to Start Time + 1h |
| Duration (min) | integer | | Ignored on import (recalculated) |
| Format | `CASH GAME` or `MTT` | Yes | |
| Stakes | `SB/BB` (e.g., `2/5`) | Cash Game only | Leave empty for MTT |
| Currency | ISO 4217 3-letter code | Yes | `USD`, `JPY`, etc. |
| Location | free text | | |
| Buy-in | integer (no thousands separator) | Yes | |
| Rebuy | integer | | Total rebuy amount |
| Cash Out | integer | | Defaults to `0` (treated as a bust) |
| Total Investment / Profit | integer | | Ignored on import (recalculated) |
| Note | free text | | Wrap with `"..."` if it contains `,`, `"`, or a newline |

### Example

```
Date,Start Time,End Time,Duration (min),Format,Stakes,Currency,Location,Buy-in,Rebuy,Total Investment,Cash Out,Profit,Note
2026-04-01,19:00,23:30,270,CASH GAME,2/5,USD,Aria,500,0,500,1200,700,"Good day"
2026-04-02,20:00,23:00,180,MTT,,USD,Wynn Las Vegas,300,0,300,800,500,
```

### Troubleshooting

- **Garbled characters**: On the import screen, switch the encoding to `Shift-JIS`
- **"Missing required fields"**: On the mapping screen, check that none of the five required columns (Date / Start Time / Format / Buy-in / Currency) are set to `Do not import`
- **"Failed to parse date/time"**: Supported formats are `yyyy-MM-dd HH:mm[:ss]`, `yyyy/MM/dd HH:mm`, `MM/dd/yyyy HH:mm`, `dd/MM/yyyy HH:mm`, and ISO 8601 (`2026-01-01T19:00:00+09:00`)
- **"Cash games require stakes"**: Provide a `Stakes` column in `SB/BB` format, or provide `Small Blind` / `Big Blind` as separate columns. If neither is available, use the AI prompt above to fill it in
- **Decimal amounts (`0.5`, `0,5`)**: These are truncated because values are stored as integers. For micro stakes, we recommend multiplying amounts by 100
