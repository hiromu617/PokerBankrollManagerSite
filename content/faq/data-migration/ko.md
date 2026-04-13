---
title: "데이터 이전"
date: "2026-04-13"
description: "다른 앱이나 스프레드시트에 기록된 기존 포커 세션을 CSV로 본 앱에 불러오는 방법 (네이티브 형식 / PBT / AI 변환)."
---

다른 앱이나 스프레드시트에 기록해 둔 기존 포커 세션을 CSV로 본 앱에 불러올 수 있습니다.
설정 → **데이터 가져오기**에서 CSV 파일을 선택하세요.

이전 경로에 따라 절차가 다릅니다.

## 본 앱 (백업 및 복원)

기기 변경이나 재설치 시 완전 복원에 사용합니다.

1. 이전 기기에서 설정 → **CSV 내보내기**로 파일을 내보냅니다
2. 파일을 새 기기로 전송합니다 (AirDrop / 클라우드 / 이메일 등)
3. 새 기기에서 설정 → **데이터 가져오기**로 들어가 파일을 선택합니다
4. 미리보기에서 "네이티브 형식이 감지되었습니다"가 표시되는지 확인한 뒤 **가져오기 시작**을 탭합니다

모든 열이 자동으로 매핑되며 손실 없이 복원됩니다.

## Poker Bankroll Tracker

PBT의 CSV를 그대로 가져올 수 있습니다 (CSV 내보내기는 PBT Pro 버전에서만 지원).

1. PBT 앱에서 Account → CSV Export
2. 본 앱에서 설정 → **데이터 가져오기**로 들어가 PBT의 CSV를 선택
3. **가져오기 시작** 탭

`Deposit/Payout` / `Costs` 등 비포커 행은 자동으로 건너뛰며, 건수는 가져오기 결과 화면에 표시됩니다.

## 기타 (AI로 포맷)

Pokerbase, Excel / Google Sheets, 기타 앱에서 내보낸 CSV는, 아래 프롬프트와 함께 ChatGPT / Claude / Gemini 등에 붙여넣어 본 앱용으로 변환할 수 있습니다. 부족한 정보 (게임 형식, 스테이크 등)는 AI가 사용자에게 확인하며 보완합니다.

### 사용 방법

1. 아래 프롬프트를 복사해서 AI에 붙여넣습니다
2. 프롬프트 끝의 `### CSV to Convert` 아래에 자신의 CSV를 붙여넣고 실행합니다
3. 반환된 CSV를 `.csv` (UTF-8)로 저장한 뒤 앱에서 가져오기

### 변환 프롬프트

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

**Respond to the user in Korean.**

### CSV to Convert

(Paste your CSV below this line.)
~~~

---

## 참고: 네이티브 CSV 형식

### 열 정의

| 열 | 형식 | 필수 | 비고 |
|---|---|---|---|
| Date | `yyyy-MM-dd` | 예 | |
| Start Time | `HH:mm` (24시간) | 예 | |
| End Time | `HH:mm` | | 기본값: Start Time + 1h |
| Duration (min) | 정수 | | 가져올 때 무시 (자동 재계산) |
| Format | `CASH GAME` 또는 `MTT` | 예 | |
| Stakes | `SB/BB` (예: `2/5`) | Cash Game만 | MTT는 비움 |
| Currency | ISO 4217 3자리 코드 | 예 | `USD`, `JPY` 등 |
| Location | 자유 텍스트 | | |
| Buy-in | 정수 (천 단위 구분 없이) | 예 | |
| Rebuy | 정수 | | 총 리바이 금액 |
| Cash Out | 정수 | | 기본값 `0` (bust 처리) |
| Total Investment / Profit | 정수 | | 가져올 때 무시 (자동 재계산) |
| Note | 자유 텍스트 | | `,` / `"` / 줄바꿈 포함 시 `"..."`로 감쌈 |

### 예시

```
Date,Start Time,End Time,Duration (min),Format,Stakes,Currency,Location,Buy-in,Rebuy,Total Investment,Cash Out,Profit,Note
2026-04-01,19:00,23:30,270,CASH GAME,2/5,USD,Aria,500,0,500,1200,700,"컨디션 좋은 날"
2026-04-02,20:00,23:00,180,MTT,,USD,Wynn Las Vegas,300,0,300,800,500,
```

### 문제 해결

- **글자 깨짐**: 가져오기 화면에서 인코딩을 `Shift-JIS`로 전환
- **"필수 항목 부족"**: 매핑 화면에서 5개의 필수 열 (Date / Start Time / Format / Buy-in / Currency)이 `가져오지 않음`으로 설정되어 있지 않은지 확인
- **"날짜/시간 해석 실패"**: 지원 형식은 `yyyy-MM-dd HH:mm[:ss]`, `yyyy/MM/dd HH:mm`, `MM/dd/yyyy HH:mm`, `dd/MM/yyyy HH:mm`, ISO 8601 (`2026-01-01T19:00:00+09:00`)
- **"캐시 게임에는 스테이크가 필요합니다"**: `Stakes` 열을 `SB/BB` 형식으로 준비하거나 `Small Blind` / `Big Blind`를 별도 열로 준비. 모두 없다면 위의 AI 프롬프트로 보완
- **소수 금액 (`0.5`, `0,5`)**: 정수로 저장되므로 버림 처리됩니다. 마이크로 스테이크는 금액을 100배로 관리하는 것을 권장합니다
