# معماری اطلاعات (IA)

## مسیرهای اصلی

### Marketing
- `/` — لندینگ B2B خدمات PROWEM برای organizers و clubs (چهار ستون خدمات؛ بدون entity دمو در هیرو)

### Event directory
- `/events` — لیست همهٔ Eventها
- `/events/[slug]` — `bundesliga` · `socca-austria-pro` · `the-international`
- زیرمسیرها: matches, live, standings, bracket, teams, players, stats, news, videos, history, awards, legends, sponsors, fan-zone

### Club directory
- `/clubs` — لیست باشگاه‌های featured
- `/clubs/[slug]` — فقط featured: `bayern-munich` · `borussia-dortmund` · `werder-bremen` · `fc-lorient`
- `/clubs/[slug]/teams` — فقط اگر بیش از یک تیم
- `/clubs/[slug]/teams/[sport]` — football / socca / dota2
- `/clubs/[slug]/players/[playerSlug]`

### Fan
- `/fans`
- `/fans/profile`
- `/fans/missions`
- `/fans/rewards`
- `/fans/passport`
- `/fans/shop`

### Match
- `/matches/live`
- `/matches/bundesliga/bayern-vs-dortmund`

## ناوبری زمینه‌ای

| زمینه | ناوبری |
|--------|--------|
| Global | PROWEM + Events / Clubs / Fans / Match (دسترسی دمو؛ محتوای `/` مارکتینگ است) |
| Event | Home, Matches, Live, Standings, Bracket, Teams, Players, Stats, News, Videos, History, Awards, Legends, Sponsors, Fan Zone |
| Club چندتیمی | Home + Teams + per-sport |
| Club تک‌تیمی (Lorient) | بدون nav «Teams» |
| Fan | Dashboard, Profile, Missions, Rewards, Passport, Shop |

## جریان دمو (خلاصه)

1. Homepage (پیام خدمات) → 2. See platform / هدر → Bundesliga → 3. Teams/Standings/News → 4. Bayern Club → 5. Dota 2 Team → 6. Fans → 7. Complete Mission → 8. Matchday → 9. Match Center → 10. Trigger Goal
