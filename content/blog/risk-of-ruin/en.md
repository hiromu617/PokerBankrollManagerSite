---
title: "Risk of Ruin — The Math That Tells You If Your Bankroll Is Actually Enough"
date: "2026-04-19"
description: "The Risk of Ruin formula for live poker — how win rate, variance, and bankroll combine into a single number. Stake-by-stake examples from $1/$2 to $5/$10, target RoR thresholds, and the three ways to actually lower it."
thumbnail: "/blog/risk-of-ruin/thumbnail.png"
---

"I think I'm winning, but my bankroll keeps shrinking." "I've heard 30 buy-ins is enough — but is it enough for *me*?" Most bankroll management anxiety comes from one place: **you're not running the numbers**.

That's what **Risk of Ruin (RoR)** exists for. Plug in your win rate, your variance, and your current bankroll, and you get a single number: the probability that you will eventually go broke playing at this stake.

This article walks through the live poker version of the RoR approximation, real examples from $1/$2 up to $5/$10, and the three levers you can actually pull to bring your RoR down.

## What Risk of Ruin Actually Is

RoR is the probability that, if you kept playing indefinitely with your current edge and variance, **your bankroll would hit zero at least once**.

Three things matter up front:

- **A positive win rate doesn't drive RoR to zero.** Short-term downswings can still bust you.
- **A zero or negative win rate means RoR is 100%.** Losing players go broke eventually — it's just a question of when.
- **RoR drops exponentially as your bankroll grows.** Not linearly. That's the key property.

The "30 buy-ins is safe" rule of thumb is really a **rough proxy** for the exponential drop-off. Your actual RoR depends on your win rate and variance, and it can be dramatically better or worse than 30 BI suggests.

## The Three Inputs That Determine RoR

### 1. Win Rate (WR)

Expected value per unit of time. For live cash, the standard unit is **dollars per hour ($/hr)**.

- Beginner to intermediate: $5–$15/hr
- Solid winner: $20–$40/hr
- Pro: $40–$100/hr depending on stake

Crucially, use your **true skill-level win rate**, not a heater. 50 hours of data is not enough — aim for at least 500 hours before trusting a WR estimate.

### 2. Variance (Standard Deviation σ)

How much your hourly result swings around the average. For live NLH, σ is roughly **10× your win rate** as a starting estimate:

- $1/$2 NLH: σ ≈ $100–$150/hr
- $2/$5 NLH: σ ≈ $300–$500/hr
- $5/$10 NLH: σ ≈ $700–$1,000/hr

Online poker shows variance faster because of hand volume, but **live deals only 25–35 hands per hour**, so the per-hour standard deviation is actually smaller than online at the same stake.

### 3. Bankroll (BR)

Your dedicated poker money. Cash that's commingled with rent or groceries **does not count**. Only a separated account or envelope that you will never touch for non-poker expenses goes into the RoR calculation.

## The Live Cash Approximation

For live cash games, the usable approximation is:

> **RoR ≈ exp(−2 × WR × BR / σ²)**

Where:

- WR is hourly win rate in dollars
- σ is hourly standard deviation in dollars
- BR is bankroll in dollars
- exp(x) is the exponential function

### What the Formula Actually Says

The thing to notice: **WR and BR are in the numerator, but σ² is in the denominator**. That means:

- **Double your win rate → new RoR is the old RoR squared** (e.g. 3% → 0.09% — a huge drop)
- **Double your bankroll → new RoR is the old RoR squared** (same quadratic effect)
- **Double your standard deviation → RoR explodes** (σ² is 4× larger)

Three levers: raise your edge, build the roll, cut the variance. All three compound.

### Worked Examples

A $15/hr winner with σ = $150/hr and a $6,000 bankroll:

- RoR ≈ exp(−2 × 15 × 6,000 / 150²) = exp(−8) ≈ **0.03%**

A $5/hr winner with σ = $150/hr and a $4,000 bankroll:

- RoR ≈ exp(−2 × 5 × 4,000 / 150²) = exp(−1.78) ≈ **17%**

Same stake, same variance — but **the combined effect of WR and bankroll swings RoR by more than 500×**. This is why obsessing over both win rate and roll size matters more than most players realize.

## How Much RoR Should You Accept

Your target RoR depends on what you're playing for.

| Player Type | Target RoR | What It Means |
|---|---|---|
| Hobbyist / recreational | 10–20% | Money you can afford to lose; aim to enjoy the game |
| Serious part-time | 5–10% | Downswings will happen; you want to survive them |
| Pro / full-time | 1–5% | Your income depends on it; minimize existential risk |

### A Trap Pros Fall Into

If you play for a living, you **withdraw living expenses from the bankroll**, which shrinks the numerator. Your true RoR is worse than the raw number.

- Table win rate $40/hr + living cost $3,000/month (~$20/hr equivalent) → effective WR $20/hr
- Rerun RoR with the reduced WR

**A clean-looking 1% RoR can quietly become 10% after living expenses.** Always compute with the post-expense win rate if poker is your income.

## RoR Across Stakes

Typical live cash profiles from $1/$2 to $5/$10 (σ estimated as 10× hourly):

| Stake | WR | σ | Bankroll | BI Count | RoR |
|---|---|---|---|---|---|
| $1/$2 NLH | $10/hr | $150/hr | $4,000 | 20 BI | ~3% |
| $1/$2 NLH | $10/hr | $150/hr | $6,000 | 30 BI | ~0.5% |
| $1/$3 NLH | $8/hr | $200/hr | $6,000 | 20 BI | ~9% |
| $1/$3 NLH | $8/hr | $200/hr | $9,000 | 30 BI | ~3% |
| $2/$5 NLH | $40/hr | $400/hr | $10,000 | 20 BI | ~1% |
| $2/$5 NLH | $40/hr | $400/hr | $15,000 | 30 BI | ~0.1% |
| $5/$10 NLH | $80/hr | $800/hr | $20,000 | 20 BI | ~1% |
| $5/$10 NLH | $80/hr | $800/hr | $30,000 | 30 BI | ~0.1% |

### What The Table Reveals

- **At a stake you truly beat, 20 BI can get you under 1% RoR.**
- **$1/$3 is the sneaky one** — an $8/hr win rate with $200/hr variance is not a cushy profile; 30 BI matters here.
- **$5/$10 looks safe on paper at 20 BI**, but that assumes an $80/hr edge holds up under real pressure. The moment your WR dips under stress, RoR balloons.

This is the mathematical backing for "30 BI" as a rule of thumb for serious live players — not a magic number, but a decent proxy for most real profiles.

## Three Ways to Actually Lower Your RoR

The formula only gives you three levers.

### 1. Add to the Bankroll

The most reliable option. Especially if your win rate is unstable month-to-month, **padding the roll is the single most direct way to drop RoR**.

### 2. Raise Your Win Rate — Table Selection

Live poker's biggest advantage is choosing who you play with. At the same $1/$2, a table full of relaxed, drinking, laughing players versus a table of silent regulars can be a **2–3× difference in hourly**.

- Pick tables where people are talking and having fun
- Avoid tables with a heavy regular presence
- Never hesitate to change tables

**Doubling WR drops RoR quadratically.** No other single skill moves the RoR needle that much.

### 3. Cut Variance Where You Can

You can't fully control variance, but you can reduce it:

- **Avoid short-stacking** — it's a variance multiplier
- **Skip the hero-level bluff catches and thin value bets** that don't actually make money
- **End tilted sessions early** — tilt adds variance without adding edge

### Shot-Taking Keeps Your RoR Under Control

When moving up, **never commit the full bankroll at once**:

- Carve out 10 BI of the next stake for shot attempts
- If you lose the carve-out, drop back to your current stake and rebuild
- Move all the way up only after the shot money reaches 30 BI at the new stake

This discipline alone can cut the RoR of the full progression by an order of magnitude.

## Common Misconceptions

### "If my win rate is high, I don't need much bankroll"

Partly true, but **RoR cares about variance, not just EV**. A $40/hr winner with $500/hr variance still has meaningful RoR at 20 BI. Higher-variance styles need more buy-ins regardless of how good the hourly looks.

### "I should aim for 0% RoR"

You can't get there without an infinite bankroll. Chasing sub-1% means staying too long at a low stake and sacrificing hourly growth to opportunity cost. **1–5% is the real pro target.**

### "Live has less variance than online, so I need fewer buy-ins"

Per hour, yes. But **your effective hourly after travel, time charges, and food is much lower than the table hourly**. Plenty of $1/$2 players who claim $15/hr actually clear under $5/hr once expenses are honest. RoR computed on that reduced number looks very different — and 20 BI suddenly isn't enough.

## Getting Your Actual Win Rate and Variance

The formula is simple. The hard part is **knowing your real WR and σ**. Gut feel is almost never right — players consistently overestimate their win rate and underestimate their variance.

[Poker Bankroll Manager](https://apps.apple.com/us/app/poker-bankroll-manager/id6758828195) is built for live cash players. It automatically computes your hourly by stake, session-level variance, and trip-adjusted expense data — the exact inputs you need to run a real RoR calculation on yourself.

The AI coach feature can reason over your actual data to answer things like "Is my current bankroll enough for a $2/$5 shot?" or "How much more do I need to cut my RoR to under 5%?" — grounded in your real numbers instead of generic rules of thumb.

## Summary

| | Details |
|---|---|
| RoR approximation | RoR ≈ exp(−2 × WR × BR / σ²) |
| Target RoR (hobbyist) | 10–20% |
| Target RoR (serious part-time) | 5–10% |
| Target RoR (pro) | 1–5%, computed post-living-expenses |
| Three levers | Build the roll / raise WR / cut variance |
| Biggest mistake | Using a heater WR instead of true-skill WR |

**RoR isn't a piece of trivia — it's a management metric.** Track your sessions, measure your real win rate and variance, and run the number periodically. That's how you stop the quiet bleed of "I'm winning but somehow losing money" and turn bankroll management into something you can actually verify.
