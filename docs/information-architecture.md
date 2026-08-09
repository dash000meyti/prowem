# معماری اطلاعات (IA)

## مسیرهای اصلی

### Marketing
- `/` — لندینگ PROWEM با ۴ CTA

### Event — NOVA CUP 2026
- `/events/nova-cup-2026`
- `/events/nova-cup-2026/matches`
- `/events/nova-cup-2026/live`
- `/events/nova-cup-2026/standings`
- `/events/nova-cup-2026/bracket`
- `/events/nova-cup-2026/teams`
- `/events/nova-cup-2026/players`
- `/events/nova-cup-2026/stats`
- `/events/nova-cup-2026/news`
- `/events/nova-cup-2026/videos`
- `/events/nova-cup-2026/history`
- `/events/nova-cup-2026/awards`
- `/events/nova-cup-2026/legends`
- `/events/nova-cup-2026/sponsors` (در صورت نیاز)
- `/events/nova-cup-2026/fan-zone` (در صورت نیاز)

### Club — NEXUS
- `/clubs/nexus`
- `/clubs/nexus/teams`
- `/clubs/nexus/teams/football`
- `/clubs/nexus/teams/socca`
- `/clubs/nexus/teams/dota2`

### Fan
- `/fans`
- `/fans/profile`
- `/fans/missions`
- `/fans/rewards`
- `/fans/passport`
- `/fans/shop`

### Match
- `/matches/live`
- `/matches/nova-cup/nexus-vs-berlin-united`

## ناوبری زمینه‌ای

| زمینه | ناوبری |
|--------|--------|
| Global | PROWEM + لینک به ۴ تجربه |
| Event | Home, Matches, Live, Standings, Bracket, Teams, Players, Stats, News, Videos, History, Awards, Legends |
| Club چندتیمی | Hero + Teams selector + Results/News/... |
| Club تک‌تیمی | بدون nav «Teams» اضافه؛ مستقیم Matches/Players/... |
| Team | Roster, Matches, Stats, News, Videos |
| Fan | Dashboard, Profile, Missions, Rewards, Passport, Shop |

کاربر باید حس کند وارد propertyهای دیجیتال جدا شده که روی یک زیرساخت مشترک اجرا می‌شوند.

## جریان دمو (خلاصه)

1. Homepage → 2. Run Event → NOVA CUP → 3. Teams/Standings/News → 4. NEXUS Club → 5. Dota 2 Team → 6. Fans → 7. Complete Mission → 8. Matchday → 9. Match Center → 10. Trigger Goal (wow moment)

جزئیات: [`demo-flow.md`](./demo-flow.md)

## لینک‌دهی موجودیت‌ها

همهٔ ارجاعات به یک entity از `src/data` بیاید. کلیک روی NEXUS در Event همان Club در `/clubs/nexus` است. بازیکن در Match همان Player در Team است.
