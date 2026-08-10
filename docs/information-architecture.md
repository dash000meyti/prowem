# معماری اطلاعات (IA)

## مسیرهای اصلی

### Marketing
- `/` — لندینگ B2B خدمات PROWEM برای organizers و clubs (چهار ستون خدمات؛ بدون entity دمو در هیرو)

### Event directory
- `/events` — لیست همهٔ Eventها
- `/events/[slug]` — `bundesliga` · `socca-austria-pro` · `the-international`
- زیرمسیرها: matches, standings (با bracket در صورت knockout + stats زیر جدول), teams, news, videos, history/heritage (history + awards + legends), sponsors, fan-zone
- مسیرهای قدیمی live / bracket / stats / players / awards / legends به مقصدهای جدید redirect می‌شوند

### Club directory
- `/clubs` — لیست باشگاه‌های featured
- `/clubs/[slug]` — فقط featured: `bayern-munich` · `borussia-dortmund` · `werder-bremen` · `fc-lorient`
- `/clubs/[slug]/teams` — فقط اگر بیش از یک تیم
- `/clubs/[slug]/teams/[sport]` — football / socca / dota2
- `/clubs/[slug]/players/[playerSlug]`
- زیرمسیرهای باشگاه (مثل event): news, videos, shop, tickets, legends, awards, sponsors, supporters

### Fan
- `/fans`
- `/fans/profile`
- `/fans/missions`
- `/fans/rewards`
- `/fans/passport`
- `/fans/shop`

### Match
- `/matches/live`
- `/matches/bundesliga/bayern-vs-dortmund` — interactive Match Center (Goal demo)
- `/matches/[eventSlug]/[matchSlug]` — sport stage detail (socca / dota / other fixtures)

## ناوبری زمینه‌ای

| زمینه | ناوبری |
|--------|--------|
| Global | PROWEM header فقط روی `/` · `/events` · `/clubs` · `/matches/*` |
| Event property | PropertyNav به‌عنوان هدر اصلی (بدون PROWEM SiteHeader) |
| Club property | ClubNavigation / PropertyNav به‌عنوان هدر اصلی |
| Fan property | FanNavigation به‌عنوان هدر اصلی |
| Event | Home · Matches (live در بالا) · Standings (bracket در بالا در صورت وجود + stats زیر جدول) · Teams · News · Videos · Heritage · Sponsors · Fan Zone |
| Club چندتیمی | Home · Teams (dropdown → All teams + sports) · News · Videos · Shop · Tickets · Legends · Awards · Sponsors · Supporters |
| Club تک‌تیمی (Lorient) | همان بخش‌ها بدون Teams dropdown |
| Fan | Dashboard, Profile, Missions, Rewards, Passport, Shop |

## جریان دمو (خلاصه)

1. Homepage (پیام خدمات) → 2. See platform / هدر → Bundesliga → 3. Teams/Standings/News → 4. Bayern Club → 5. Dota 2 Team → 6. Fans → 7. Complete Mission → 8. Matchday → 9. Match Center → 10. Trigger Goal
