# سیستم طراحی PROWEM

## هویت بصری

ترکیب: **premium sports media + modern product + esports energy + editorial storytelling**

نه داشبورد SaaS معمولی، نه تمپلیت کارت‌محور.

## رنگ

| نقش | مقدار |
|------|--------|
| BG 0 | `#08090B` |
| BG 1 | `#0D0F12` |
| BG 2 | `#121417` |
| Primary (Orange) | `#FF5A1F` |
| Text | `#F5F5F2` |
| Text muted | `#A7A7A7` |
| Border | خاکستری تیرهٔ ظریف |

قانون: **۹۰٪ dark / ۱۰٪ orange**. نارنجی فقط برای CTA، LIVE، هایلایت، nav فعال، دادهٔ مهم.

## تایپوگرافی

- فونت اصلی: **Space Grotesk**
- سلسله‌مراتب قوی؛ تیترها editorial و athletic
- کپی کوتاه و مطمئن؛ بدون متن بازاریابی طولانی

## هیرو

- یک ترکیب در viewport اول
- برند قوی + یک headline + یک جمله + گروه CTA + یک visual غالب
- بدون کارت در هیرو، بدون badge شناور، بدون آمار چندگانه در first viewport (مگر ترکیب بصری زندهٔ ورزشی)

## کارت‌ها و سطوح

- کارت فقط وقتی تعامل یا فهم را کمک کند
- سطوح لایه‌ای تیره، border ظریف، glass محدود
- هر کارت ظاهر یکسان نداشته باشد؛ تنوع editorial مجاز است

## تم Event / Club

```ts
eventTheme = { primary, secondary, accent, heroImage, logo, font?, componentStyle? }
clubTheme = { primary, secondary, logo, coverImage }
```

UI از CSS variables مصرف کند تا «One Platform. Infinite Sports Identities» اثبات شود.

NOVA CUP: charcoal عمیق + electric orange + warm white + dark gradients + metallic/glass ظریف.

NEXUS: هویت جدا، با انرژی esports روی تیم Dota 2 بدون خروج از اکوسیستم PROWEM.

## موشن

هدفمند و کم:

- ورود هیرو
- پالس LIVE
- تغییر اسکور
- پیشرفت XP
- timeline مسابقه
- hover و tab

بدون over-animation.

## تصاویر

عکس استوک شکسته ممنوع. در صورت نبود دارایی: ترکیب gradient، silhouette، و mock image محلی منسجم.

## دسترسی‌پذیری

HTML معنایی، focus state، contrast کافی، aria در جاهای لازم، کیبورد.

## Responsive

موبایل intentional — به‌خصوص Match Center، Matchday، Club، Event، Fan Dashboard.
