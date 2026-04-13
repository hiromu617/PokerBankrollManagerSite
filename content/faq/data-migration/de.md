---
title: "Datenmigration"
date: "2026-04-13"
description: "So importierst du bestehende Poker-Sessions aus anderen Apps oder Tabellen per CSV in die App (natives Format / PBT / KI-Konvertierung)."
---

Du kannst Poker-Sessions, die du bisher in anderen Apps oder Tabellenkalkulationen erfasst hast, per CSV in diese App importieren.
Öffne Einstellungen → **Daten importieren** und wähle eine CSV-Datei.

Das Vorgehen hängt von der Quelle ab.

## Diese App (Sicherung & Wiederherstellung)

Zum vollständigen Wiederherstellen bei Gerätewechsel oder Neuinstallation.

1. Auf dem alten Gerät Einstellungen → **CSV-Export** öffnen und die Datei exportieren
2. Datei auf das neue Gerät übertragen (AirDrop / Cloud / E-Mail usw.)
3. Auf dem neuen Gerät Einstellungen → **Daten importieren** öffnen und die Datei auswählen
4. In der Vorschau bestätigen, dass „Natives Format erkannt" angezeigt wird, dann **Import starten**

Alle Spalten werden automatisch zugeordnet und die Daten verlustfrei wiederhergestellt.

## Poker Bankroll Tracker

Du kannst die CSV von PBT direkt importieren (der CSV-Export ist nur in PBT Pro verfügbar).

1. In der PBT-App zu Account → CSV Export gehen
2. In dieser App Einstellungen → **Daten importieren** öffnen und die PBT-CSV auswählen
3. **Import starten** antippen

Nicht-Poker-Zeilen wie `Deposit/Payout` und `Costs` werden automatisch übersprungen. Die Anzahl wird auf dem Ergebnisbildschirm des Imports angezeigt.

## Andere Quellen (mit KI formatieren)

CSVs aus Pokerbase, Excel / Google Sheets oder anderen Apps kannst du konvertieren, indem du den unten stehenden Prompt – zusammen mit deinem CSV – in ChatGPT / Claude / Gemini einfügst. Bei fehlenden Angaben (Spielformat, Stakes usw.) fragt die KI bei dir nach.

### Anleitung

1. Prompt unten kopieren und in die KI einfügen
2. Dein CSV unter der Zeile `### CSV to Convert` am Ende des Prompts einfügen und ausführen
3. Das zurückgegebene CSV als `.csv` (UTF-8) speichern und in der App importieren

### Konvertierungs-Prompt

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

**Respond to the user in German.**

### CSV to Convert

(Paste your CSV below this line.)
~~~

---

## Referenz: Natives CSV-Format

### Spaltendefinitionen

| Spalte | Format | Pflicht | Hinweise |
|---|---|---|---|
| Date | `yyyy-MM-dd` | Ja | |
| Start Time | `HH:mm` (24 h) | Ja | |
| End Time | `HH:mm` | | Standard: Start Time + 1h |
| Duration (min) | Ganzzahl | | Beim Import ignoriert (neu berechnet) |
| Format | `CASH GAME` oder `MTT` | Ja | |
| Stakes | `SB/BB` (z. B. `2/5`) | Nur Cash Game | Bei MTT leer lassen |
| Currency | ISO 4217 (3 Buchstaben) | Ja | `USD`, `JPY` usw. |
| Location | Freitext | | |
| Buy-in | Ganzzahl (ohne Tausendertrennzeichen) | Ja | |
| Rebuy | Ganzzahl | | Gesamter Rebuy-Betrag |
| Cash Out | Ganzzahl | | Standard `0` (wird als Bust behandelt) |
| Total Investment / Profit | Ganzzahl | | Beim Import ignoriert (neu berechnet) |
| Note | Freitext | | Mit `"..."` umschließen, wenn `,`, `"` oder Zeilenumbruch enthalten |

### Beispiel

```
Date,Start Time,End Time,Duration (min),Format,Stakes,Currency,Location,Buy-in,Rebuy,Total Investment,Cash Out,Profit,Note
2026-04-01,19:00,23:30,270,CASH GAME,2/5,USD,Aria,500,0,500,1200,700,"Guter Tag"
2026-04-02,20:00,23:00,180,MTT,,USD,Wynn Las Vegas,300,0,300,800,500,
```

### Fehlerbehebung

- **Zeichensalat**: Im Import-Bildschirm die Kodierung auf `Shift-JIS` umstellen
- **„Pflichtfelder fehlen"**: Im Mapping-Bildschirm prüfen, dass keine der fünf Pflichtspalten (Date / Start Time / Format / Buy-in / Currency) auf `Nicht importieren` gesetzt ist
- **„Datum/Uhrzeit konnte nicht interpretiert werden"**: Unterstützte Formate: `yyyy-MM-dd HH:mm[:ss]`, `yyyy/MM/dd HH:mm`, `MM/dd/yyyy HH:mm`, `dd/MM/yyyy HH:mm`, ISO 8601 (`2026-01-01T19:00:00+09:00`)
- **„Cash Games benötigen Stakes"**: Eine `Stakes`-Spalte im Format `SB/BB` angeben oder `Small Blind` / `Big Blind` als separate Spalten. Falls nicht verfügbar, den KI-Prompt oben nutzen
- **Dezimalbeträge (`0.5`, `0,5`)**: Werden abgeschnitten, da die Werte als Ganzzahlen gespeichert werden. Für Micro-Stakes empfehlen wir, die Beträge mit 100 zu multiplizieren
