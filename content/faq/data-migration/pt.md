---
title: "Migração de dados"
date: "2026-04-13"
description: "Como importar para o app suas sessões de pôquer de outros aplicativos ou planilhas via CSV (formato nativo / PBT / conversão com IA)."
---

Você pode importar para este app as sessões de pôquer que já registrou em outros aplicativos ou planilhas, por meio de um arquivo CSV.
Abra Configurações → **Importar dados** e selecione um arquivo CSV.

Os procedimentos variam conforme a origem.

## Este app (backup e restauração)

Use para uma restauração completa ao trocar de dispositivo ou reinstalar.

1. No dispositivo antigo, vá em Configurações → **Exportar CSV** e gere o arquivo
2. Transfira o arquivo para o novo dispositivo (AirDrop / nuvem / e-mail etc.)
3. No novo dispositivo, vá em Configurações → **Importar dados** e selecione o arquivo
4. Na prévia, confirme que aparece "Formato nativo detectado" e toque em **Iniciar importação**

Todas as colunas são mapeadas automaticamente e os dados são restaurados sem perdas.

## Poker Bankroll Tracker

Você pode importar o CSV do PBT diretamente (a exportação CSV está disponível apenas no PBT Pro).

1. No app PBT, vá em Account → CSV Export
2. Neste app, vá em Configurações → **Importar dados** e selecione o CSV do PBT
3. Toque em **Iniciar importação**

Linhas não-pôquer como `Deposit/Payout` e `Costs` são ignoradas automaticamente. A contagem aparece na tela de resultado da importação.

## Outras origens (formatar com IA)

Para CSVs exportados de Pokerbase, Excel / Google Sheets ou outros apps, você pode convertê-los colando o prompt abaixo — junto com seu CSV — no ChatGPT / Claude / Gemini. A IA vai perguntar sobre informações faltantes (formato do jogo, stakes etc.) quando necessário.

### Como usar

1. Copie o prompt abaixo e cole na IA
2. Cole seu CSV abaixo da linha `### CSV to Convert` no final do prompt e execute
3. Salve o CSV retornado como `.csv` (UTF-8) e importe no app

### Prompt de conversão

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

**Respond to the user in Portuguese.**

### CSV to Convert

(Paste your CSV below this line.)
~~~

---

## Referência: formato CSV nativo

### Definição das colunas

| Coluna | Formato | Obrigatória | Observações |
|---|---|---|---|
| Date | `yyyy-MM-dd` | Sim | |
| Start Time | `HH:mm` (24 h) | Sim | |
| End Time | `HH:mm` | | Padrão: Start Time + 1h |
| Duration (min) | inteiro | | Ignorado na importação (recalculado) |
| Format | `CASH GAME` ou `MTT` | Sim | |
| Stakes | `SB/BB` (ex.: `2/5`) | Somente Cash Game | Deixe vazio para MTT |
| Currency | Código ISO 4217 de 3 letras | Sim | `USD`, `JPY` etc. |
| Location | texto livre | | |
| Buy-in | inteiro (sem separador de milhar) | Sim | |
| Rebuy | inteiro | | Valor total de rebuys |
| Cash Out | inteiro | | Padrão `0` (tratado como bust) |
| Total Investment / Profit | inteiro | | Ignorado na importação (recalculado) |
| Note | texto livre | | Use `"..."` se contiver `,`, `"` ou quebra de linha |

### Exemplo

```
Date,Start Time,End Time,Duration (min),Format,Stakes,Currency,Location,Buy-in,Rebuy,Total Investment,Cash Out,Profit,Note
2026-04-01,19:00,23:30,270,CASH GAME,2/5,USD,Aria,500,0,500,1200,700,"Bom dia"
2026-04-02,20:00,23:00,180,MTT,,USD,Wynn Las Vegas,300,0,300,800,500,
```

### Solução de problemas

- **Caracteres ilegíveis**: na tela de importação, altere a codificação para `Shift-JIS`
- **"Campos obrigatórios ausentes"**: na tela de mapeamento, verifique se nenhuma das cinco colunas obrigatórias (Date / Start Time / Format / Buy-in / Currency) está como `Não importar`
- **"Falha ao interpretar data/hora"**: formatos suportados: `yyyy-MM-dd HH:mm[:ss]`, `yyyy/MM/dd HH:mm`, `MM/dd/yyyy HH:mm`, `dd/MM/yyyy HH:mm`, ISO 8601 (`2026-01-01T19:00:00+09:00`)
- **"Cash games exigem stakes"**: forneça uma coluna `Stakes` no formato `SB/BB`, ou colunas `Small Blind` / `Big Blind` separadas. Se não for possível, use o prompt de IA acima
- **Valores decimais (`0.5`, `0,5`)**: são truncados porque os valores são armazenados como inteiros. Para micro stakes, recomendamos multiplicar os valores por 100
