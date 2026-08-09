# معماری محصول PROWEM 2.0

## چشم‌انداز

**PROWEM is the digital infrastructure for modern sports.**

پلتفرم دیگر فقط مدیریت رویداد نیست؛ لایهٔ عملیاتی و دیجیتال برای سازمان‌های ورزشی است.

شعارها:

- **Run Sports. Build Communities. Create Experiences.**
- **One Data Source. Many Experiences.**

## چهار تجربهٔ اصلی

| تجربه | مخاطب | نقش |
|--------|--------|------|
| Run an Event | Organizer | ساخت و اجرای رقابت، هویت برند، محتوا، جدول، براکت |
| Build a Club | Club | خانهٔ دیجیتال باشگاه، چند تیم/چند ورزش، تاریخچه، فروشگاه |
| Engage Your Fans | Fan | پروفایل، XP، مأموریت، پاداش، پاسپورت، جامعه |
| Experience the Match | همه | Matchday چندبازی + Match Center جزئیات کامل |

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

معماری از چند ورزش پشتیبانی می‌کند (Football, Socca, Basketball, Dota 2, …). در این پروتوتایپ تمرکز روی **Football** و **Dota 2** است؛ UI باید بتواند آمار ورزش‌محور نشان دهد.

## جهان دمو

- Organizer: **NOVA Sports**
- Event: **NOVA CUP 2026** (Berlin, 18–21 June, 16 teams)
- Club: **NEXUS** (Football + Socca + Dota 2)
- Match زنده: **NEXUS FC 2–1 Berlin United**, 72'
- Fan: **Alex Morgan**, Level 18, SUPER FAN

## محدودهٔ پروتوتایپ

بدون backend واقعی، auth، پرداخت، CMS، streaming API. تعاملات شبیه‌سازی‌شده و باورپذیر کافی است.

## معیار موفقیت اجرایی

رهبری شرکت باید فوراً بفهمد: PROWEM پلتفرم دیجیتال ورزش است؛ Event و Club هویت مستقل دارند؛ داده زنده چند خروجی می‌سازد؛ فن‌ها و درآمد چندگانه ممکن است؛ معماری چندورزشی و چندبرندی معتبر به نظر می‌رسد.
