---
name: prowem-prototype
description: Guides building and extending the PROWEM 2.0 sports digital infrastructure prototype. Use when working on PROWEM pages, mock data, design system, event/club/fan/match experiences, or demo interactions.
---

# PROWEM Prototype Skill

## شروع هر کار
1. بخوان: `docs/product-architecture.md`, `docs/data-model.md`, `docs/design-system.md`
2. مسیر و entityهای موجود را از `docs/information-architecture.md` چک کن
3. داده را از `src/data` بگیر؛ کپی جدید نساز

## جهان دمو (ثابت)
- Events: Bundesliga · Socca Austria Pro League · The International
- Featured clubs: Bayern Munich (football/socca/dota2) · Borussia Dortmund (football/socca/dota2) · Werder Bremen (football/socca) · FC Lorient (socca)
- Live match: Bayern Munich 2–1 Borussia Dortmund, 72'
- Fan: Alex Morgan, L18, 12840 XP, SUPER FAN
- Media: local only under `public/images/` (`npm run fetch-media`)

## تعاملات اجباری
- **Trigger Goal**: score + timeline + stats + social + notify + fan XP
- **Complete Mission**: XP + progress + achievement/reward در صورت آستانه

## کیفیت
- انگلیسی در UI؛ بدون placeholder ضعیف
- حس sports media premium نه SaaS dashboard
- بعد از تغییر route: لینک‌ها و entity consistency را چک کن

## ارجاع
جزئیات جریان ارائه: `docs/demo-flow.md`
فازها: `docs/implementation-plan.md`
