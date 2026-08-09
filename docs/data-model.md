# مدل داده

## قانون طلایی

**Club ≠ Team ≠ Event ≠ Organizer**

تکرار entity ممنوع. ارجاع با `id` / `slug`.

## موجودیت‌ها

| Entity | توضیح |
|--------|--------|
| Organizer | سازمان برگزارکننده (NOVA Sports) |
| Event | رقابت (NOVA CUP 2026) + theme |
| Club | سازمان مستقل (NEXUS) + theme |
| Team | تیم ورزشی/بازی؛ متعلق به یک Club؛ قابل شرکت در چند Event |
| Player | بازیکن متعلق به Team |
| Match | مسابقه بین دو Team در یک Event |
| MatchEvent | گل، کارت، ساب، کیل، و غیره |
| Standing | ردیف جدول |
| BracketNode | گره براکت |
| NewsArticle / Video | محتوا |
| Award / Legend | جوایز و افسانه‌ها |
| Sponsor | حامی |
| Fan | پروفایل فن |
| Mission / Reward / Achievement | گیمیفیکیشن |
| Product / Ticket | فروشگاه / بلیت |

## روابط مفهومی

```text
Organizer
  └── Event
        ├── Teams (via participation)
        ├── Matches
        ├── Content / Awards / Legends / Sponsors

Club
  └── Team
        ├── Players
        └── EventParticipation[]
```

## Sport-specific payload

`Match` و `MatchEvent` فیلد `sport` دارند. آمار football (possession, shots, …) و dota (kills, towers, …) در ساختار typed جدا یا union ذخیره می‌شود؛ UI بر اساس sport رندر می‌کند.

## محل فایل‌ها

```text
src/types/          # تایپ‌ها
src/data/
  organizers.ts
  events.ts
  clubs.ts
  teams.ts
  players.ts
  matches.ts
  news.ts
  videos.ts
  awards.ts
  legends.ts
  sponsors.ts
  fans.ts
  missions.ts
  rewards.ts
  products.ts
  index.ts          # selectors و joinها
```

## حجم حداقل mock

1 Event · 8–16 Club · 16+ تیم فوتبال + تیم‌های NEXUS · 30–50 بازیکن فوتبال · 7+ Dota · 20+ Match · 15+ News · 10+ Video · 6+ Award/Legend · 10+ Mission/Reward/Achievement

## تعاملات شبیه‌سازی

State تعاملی (goal trigger، mission complete) می‌تواند Client Context روی همان داده‌های پایه باشد؛ منبع حقیقت entityها همچنان `src/data` است.
