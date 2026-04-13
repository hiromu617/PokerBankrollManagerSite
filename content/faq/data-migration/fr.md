---
title: "Migration des données"
date: "2026-04-13"
description: "Comment importer dans l'app vos sessions de poker depuis d'autres applications ou tableurs via CSV (format natif / PBT / conversion par IA)."
---

Vous pouvez importer dans cette application les sessions de poker que vous avez déjà enregistrées dans d'autres apps ou des tableurs, via un fichier CSV.
Ouvrez Réglages → **Importer des données** et sélectionnez un fichier CSV.

Les procédures varient selon la source.

## Cette app (sauvegarde & restauration)

À utiliser pour une restauration complète lors d'un changement d'appareil ou d'une réinstallation.

1. Sur l'ancien appareil, allez dans Réglages → **Exporter CSV** pour générer le fichier
2. Transférez le fichier sur le nouvel appareil (AirDrop / cloud / e-mail, etc.)
3. Sur le nouvel appareil, allez dans Réglages → **Importer des données** et sélectionnez le fichier
4. Dans l'aperçu, vérifiez que « Format natif détecté » s'affiche, puis appuyez sur **Démarrer l'import**

Toutes les colonnes sont mappées automatiquement et les données sont restaurées sans perte.

## Poker Bankroll Tracker

Vous pouvez importer directement le CSV de PBT (l'export CSV n'est disponible que sur PBT Pro).

1. Dans l'app PBT, allez dans Account → CSV Export
2. Dans cette app, allez dans Réglages → **Importer des données** et sélectionnez le CSV PBT
3. Appuyez sur **Démarrer l'import**

Les lignes non-poker telles que `Deposit/Payout` et `Costs` sont automatiquement ignorées. Le nombre est affiché sur l'écran de résultat de l'import.

## Autres sources (formater avec une IA)

Pour les CSV exportés depuis Pokerbase, Excel / Google Sheets ou d'autres applications, vous pouvez les convertir au format attendu en collant le prompt ci-dessous — avec votre CSV — dans ChatGPT / Claude / Gemini. L'IA vous demandera au besoin les informations manquantes (format de jeu, enjeux, etc.).

### Utilisation

1. Copiez le prompt ci-dessous et collez-le dans l'IA
2. Collez votre CSV sous la ligne `### CSV to Convert` à la fin du prompt, puis lancez l'exécution
3. Enregistrez le CSV renvoyé en `.csv` (UTF-8) et importez-le dans l'app

### Prompt de conversion

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

**Respond to the user in French.**

### CSV to Convert

(Paste your CSV below this line.)
~~~

---

## Référence : format CSV natif

### Définition des colonnes

| Colonne | Format | Obligatoire | Remarques |
|---|---|---|---|
| Date | `yyyy-MM-dd` | Oui | |
| Start Time | `HH:mm` (24 h) | Oui | |
| End Time | `HH:mm` | | Par défaut : Start Time + 1h |
| Duration (min) | entier | | Ignoré à l'import (recalculé) |
| Format | `CASH GAME` ou `MTT` | Oui | |
| Stakes | `SB/BB` (ex. `2/5`) | Cash Game uniquement | Laisser vide pour MTT |
| Currency | Code ISO 4217 à 3 lettres | Oui | `USD`, `JPY`, etc. |
| Location | texte libre | | |
| Buy-in | entier (sans séparateur de milliers) | Oui | |
| Rebuy | entier | | Montant total des rebuys |
| Cash Out | entier | | Par défaut `0` (considéré comme un bust) |
| Total Investment / Profit | entier | | Ignoré à l'import (recalculé) |
| Note | texte libre | | Entourer de `"..."` si contient `,`, `"` ou saut de ligne |

### Exemple

```
Date,Start Time,End Time,Duration (min),Format,Stakes,Currency,Location,Buy-in,Rebuy,Total Investment,Cash Out,Profit,Note
2026-04-01,19:00,23:30,270,CASH GAME,2/5,USD,Aria,500,0,500,1200,700,"Bonne journée"
2026-04-02,20:00,23:00,180,MTT,,USD,Wynn Las Vegas,300,0,300,800,500,
```

### Dépannage

- **Caractères illisibles** : sur l'écran d'import, changez l'encodage pour `Shift-JIS`
- **« Champs obligatoires manquants »** : sur l'écran de mapping, vérifiez qu'aucune des cinq colonnes requises (Date / Start Time / Format / Buy-in / Currency) n'est définie sur `Ne pas importer`
- **« Échec d'interprétation de la date/heure »** : formats pris en charge : `yyyy-MM-dd HH:mm[:ss]`, `yyyy/MM/dd HH:mm`, `MM/dd/yyyy HH:mm`, `dd/MM/yyyy HH:mm`, ISO 8601 (`2026-01-01T19:00:00+09:00`)
- **« Les cash games nécessitent des enjeux »** : fournissez une colonne `Stakes` au format `SB/BB`, ou des colonnes `Small Blind` / `Big Blind` séparées. Si aucun n'est disponible, utilisez le prompt IA ci-dessus
- **Montants décimaux (`0.5`, `0,5`)** : ils sont tronqués car les valeurs sont stockées en entiers. Pour les micro-enjeux, nous recommandons de multiplier les montants par 100
