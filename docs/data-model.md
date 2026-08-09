# مدل داده

## قانون طلایی

**Club ≠ Team ≠ Event ≠ Organizer**

تکرار entity ممنوع. ارجاع با `id` / `slug`.

## موجودیت‌ها

| Entity | توضیح |
|--------|--------|
| Organizer | سازمان برگزارکننده (DFL, Socca Austria, Valve) |
| Event | رقابت/لیگ (Bundesliga, Socca Austria Pro, The International) + theme |
| Club | سازمان مستقل (Bayern, Dortmund, Werder, Lorient + stubs) + theme |
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

3 Event · 4 featured Club (+ stubs) · 9 featured teams + stub teams · 30+ players · 10+ Match · 8+ News · 6+ Video · 6+ Award/Legend · 10+ Mission/Reward/Achievement

## تعاملات شبیه‌سازی

State تعاملی (goal trigger، mission complete) می‌تواند Client Context روی همان داده‌های پایه باشد؛ منبع حقیقت entityها همچنان `src/data` است.
