# برنامهٔ پیاده‌سازی

## پیش‌نیاز

1. خواندن docs و رعایت `.cursor/rules`
2. UI انگلیسی · docs/توضیحات فارسی
3. بدون نابود کردن کار مفید موجود (پروتوتایپ ساخته‌شده؛ فازها تکمیل‌اند)

## فازها

### Phase 1 — Foundation
Next.js App Router + TS strict + Tailwind + Space Grotesk + theme CSS vars + layout/footer + types + data skeleton

### Phase 2 — Design system
کامپوننت‌های reusable در `src/components/{ui,match,club,event,fan,marketing}`

### Phase 3 — Marketing homepage
`/` لندینگ B2B خدمات برای organizers و clubs (چهار ستون خدمات؛ بدون hub چهار تجربهٔ دمو)

### Phase 4 — Event
تمام مسیرهای Event (`/events/[slug]`) با تم اختصاصی و داده مشترک

### Phase 5 — Club
Featured clubs + تیم‌ها؛ single-team mode (مثلاً Lorient) در معماری پشتیبانی شود

### Phase 6 — Fan
Fan home (پروفایل در `/fans` ادغام شد؛ `/fans/profile` redirect)، missions (Global / Personalised / Discover)، rewards، passport، shop + Complete Mission

### Phase 7 — Match
Matchday + Match Center

### Phase 8 — Interactions
Trigger Goal و یکپارچگی لینک entityها

### Phase 9 — Polish
موشن، responsive، a11y، performance، consistency

## اولویت

**انسجام محصول > پولیش بصری > تعداد فیچر** — بدون قربانی کیفیت بصری presentation.

## چک‌لیست نهایی

- [x] همهٔ routeها کار می‌کنند
- [x] لینک شکسته نیست (مسیرهای دمو)
- [x] تصویر شکسته نیست (VisualPanel محلی)
- [x] خطای console/TS نیست (build پاس)
- [x] ناوبری زمینه‌ای درست است
- [x] mock interactionها کار می‌کنند (Trigger Goal / Complete Mission)
- [x] entityها مشترک‌اند (`src/data`)
- [x] حس یک محصول واحد وجود دارد

## Tech notes

- Server Components پیش‌فرض؛ Client فقط برای تعامل
- بدون `any` غیرضروری
- بدون وابستگی سنگین اضافه
- Framer Motion سبک؛ Lucide برای آیکون
