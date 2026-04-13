---
title: "Migración de datos"
date: "2026-04-13"
description: "Cómo importar en la app tus sesiones de póker desde otras aplicaciones u hojas de cálculo mediante CSV (formato nativo / PBT / conversión con IA)."
---

Puedes importar a esta app las sesiones de póker que ya tengas registradas en otras aplicaciones o en hojas de cálculo, mediante un archivo CSV.
Abre Ajustes → **Importar datos** y selecciona un archivo CSV.

Los procedimientos varían según la fuente.

## Esta app (copia de seguridad y restauración)

Úsalo para una restauración completa al cambiar de dispositivo o reinstalar.

1. En el dispositivo antiguo, ve a Ajustes → **Exportar CSV** y genera el archivo
2. Transfiere el archivo al nuevo dispositivo (AirDrop / nube / correo, etc.)
3. En el nuevo dispositivo, ve a Ajustes → **Importar datos** y selecciona el archivo
4. En la vista previa, confirma que aparece «Formato nativo detectado» y toca **Iniciar importación**

Todas las columnas se mapean automáticamente y los datos se restauran sin pérdida.

## Poker Bankroll Tracker

Puedes importar el CSV de PBT directamente (la exportación CSV solo está disponible en PBT Pro).

1. En la app PBT, ve a Account → CSV Export
2. En esta app, ve a Ajustes → **Importar datos** y selecciona el CSV de PBT
3. Toca **Iniciar importación**

Las filas no pertenecientes al póker, como `Deposit/Payout` y `Costs`, se omiten automáticamente. El número se muestra en la pantalla de resultado de importación.

## Otras fuentes (formatear con IA)

Para CSV exportados desde Pokerbase, Excel / Google Sheets u otras apps, puedes convertirlos pegando el prompt de abajo —junto con tu CSV— en ChatGPT / Claude / Gemini. La IA te preguntará por la información faltante (formato de juego, stakes, etc.) cuando sea necesario.

### Cómo usarlo

1. Copia el prompt de abajo y pégalo en la IA
2. Pega tu CSV debajo de la línea `### CSV to Convert` al final del prompt y ejecuta
3. Guarda el CSV devuelto como `.csv` (UTF-8) e impórtalo en la app

### Prompt de conversión

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

**Respond to the user in Spanish.**

### CSV to Convert

(Paste your CSV below this line.)
~~~

---

## Referencia: formato CSV nativo

### Definición de columnas

| Columna | Formato | Obligatoria | Notas |
|---|---|---|---|
| Date | `yyyy-MM-dd` | Sí | |
| Start Time | `HH:mm` (24 h) | Sí | |
| End Time | `HH:mm` | | Por defecto: Start Time + 1h |
| Duration (min) | entero | | Se ignora al importar (se recalcula) |
| Format | `CASH GAME` o `MTT` | Sí | |
| Stakes | `SB/BB` (ej. `2/5`) | Solo Cash Game | Dejar vacío para MTT |
| Currency | Código ISO 4217 de 3 letras | Sí | `USD`, `JPY`, etc. |
| Location | texto libre | | |
| Buy-in | entero (sin separador de miles) | Sí | |
| Rebuy | entero | | Importe total de rebuys |
| Cash Out | entero | | Por defecto `0` (se trata como bust) |
| Total Investment / Profit | entero | | Se ignora al importar (se recalcula) |
| Note | texto libre | | Usar `"..."` si contiene `,`, `"` o salto de línea |

### Ejemplo

```
Date,Start Time,End Time,Duration (min),Format,Stakes,Currency,Location,Buy-in,Rebuy,Total Investment,Cash Out,Profit,Note
2026-04-01,19:00,23:30,270,CASH GAME,2/5,USD,Aria,500,0,500,1200,700,"Buen día"
2026-04-02,20:00,23:00,180,MTT,,USD,Wynn Las Vegas,300,0,300,800,500,
```

### Solución de problemas

- **Caracteres ilegibles**: en la pantalla de importación, cambia la codificación a `Shift-JIS`
- **«Faltan campos obligatorios»**: en la pantalla de mapeo, comprueba que ninguna de las cinco columnas requeridas (Date / Start Time / Format / Buy-in / Currency) esté como `No importar`
- **«Error al interpretar fecha/hora»**: formatos admitidos: `yyyy-MM-dd HH:mm[:ss]`, `yyyy/MM/dd HH:mm`, `MM/dd/yyyy HH:mm`, `dd/MM/yyyy HH:mm`, ISO 8601 (`2026-01-01T19:00:00+09:00`)
- **«Los cash games requieren stakes»**: proporciona una columna `Stakes` con formato `SB/BB`, o columnas `Small Blind` / `Big Blind` separadas. Si no puedes, usa el prompt de IA de arriba
- **Importes decimales (`0.5`, `0,5`)**: se truncan porque los valores se almacenan como enteros. Para micro stakes, recomendamos multiplicar los importes por 100
