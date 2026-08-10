# معماری محصول PROWEM 2.0

## چشم‌انداز

**PROWEM is the digital infrastructure for modern sports.**

پلتفرم دیگر فقط مدیریت رویداد نیست؛ لایهٔ عملیاتی و دیجیتال برای سازمان‌های ورزشی است.

شعارها:

- **Run Sports. Build Communities. Create Experiences.**
- **One Data Source. Many Experiences.**

## Marketing homepage (`/`)

صفحهٔ اصلی **لندینگ B2B مارکتینگی** است — نه hub چهار تجربهٔ دمو.

مخاطبان: **برگزارکننده رویداد** و **باشگاه**.

چهار ستون خدمات:

| خدمت | مخاطب | نقش |
|--------|--------|------|
| Event infrastructure | Organizer | برگزاری رویداد ورزشی و ورزش دیجیتال، اطلاع‌رسانی، نمایش داده |
| Club infrastructure | Club | نمایش داده، اطلاع‌رسانی، کلاب طرفداری، تیم‌های داخل باشگاه |
| Matchday infrastructure | Organizer + Club | فیلم‌برداری/استریم، داده زنده، گزارش خودکار، استوری اجتماعی پس از بازی |
| Consulting & design | Organizer | مشاوره، طراحی و بهبود رویدادهای ورزشی |

روی `/` هیچ entity دمو (Bundesliga، Bayern، فن، اسکور زنده) نمایش داده نمی‌شود. ورود به دمو از هدر/فوتر یا CTA پایانی «See the platform».

## چهار تجربهٔ عملیاتی (دمو)

این تجربه‌ها زیر مسیرهای غیر از `/` زندگی می‌کنند:

| تجربه | مخاطب | نقش | مسیر نمونه |
|--------|--------|------|-------------|
| Run an Event | Organizer | ساخت و اجرای رقابت، هویت برند، محتوا، جدول، براکت | `/events/*` |
| Build a Club | Club | خانهٔ دیجیتال باشگاه، چند تیم/چند ورزش، تاریخچه، فروشگاه | `/clubs/*` |
| Engage Your Fans | Fan | fan home (هویت/XP)، مأموریت، پاداش، پاسپورت، جامعه | `/fans/*` |
| Experience the Match | همه | Matchday چندبازی + Match Center جزئیات کامل | `/matches/*` |

## هویت بصری جدا (Brand Scopes)

هر لایه هویت مستقل دارد و نباید کل محصول یک پالت واحد به نظر برسد:

- **Platform (PROWEM):** marketing و chrome پایه
- **Event:** property برنددار (مثلاً Bundesliga)
- **Club:** property برنددار (مثلاً Bayern Munich)

ورود به Event/Club باید حس ورود به digital property جدا روی همان زیرساخت را بدهد. پیاده‌سازی: `BrandScope` + تم از داده.

## اصل داده‌ای

یک رویداد زندهٔ مسابقه (مثلاً گل) باید از یک هسته داده به خروجی‌های متعدد برود:

Score → Standings → Player Stats → Timeline → Website → Social → Video → Notification → Fan XP

## موجودیت‌های حیاتی

**Club ≠ Team ≠ Event ≠ Organizer**

- Organizer رویداد می‌سازد.
- Club تیم دارد و مستقل از Event است.
- Team می‌تواند در چند Event شرکت کند.
- Player به Team وصل است و از طریق Participation در Event دیده می‌شود.

## Sport-Agnostic

معماری از چند ورزش پشتیبانی می‌کند (Football, Socca, Basketball, Dota 2, …). در این پروتوتایپ تمرکز روی **Football**، **Socca** و **Dota 2** است؛ UI باید بتواند آمار ورزش‌محور نشان دهد.

## جهان دمو

- Organizers: **DFL** · **Socca Austria** · **Valve**
- Events: **Bundesliga** (football) · **Socca Austria Pro League** (socca) · **The International** (dota2)
- Featured clubs: **Bayern Munich** · **Borussia Dortmund** · **Werder Bremen** · **FC Lorient**
- Live match: **Bayern Munich 2–1 Borussia Dortmund**, 72' (Der Klassiker)
- Fan: **Alex Morgan**, Level 18, SUPER FAN

## محدودهٔ پروتوتایپ

بدون backend واقعی، auth، پرداخت، CMS، streaming API. تعاملات شبیه‌سازی‌شده و باورپذیر کافی است.

## معیار موفقیت اجرایی

رهبری شرکت باید فوراً بفهمد: PROWEM زیرساخت دیجیتال برای organizers و clubs است؛ چهار خدمت اصلی روشن‌اند؛ Event و Club هویت مستقل دارند؛ داده زنده چند خروجی می‌سازد؛ معماری چندورزشی و چندبرندی معتبر به نظر می‌رسد.
