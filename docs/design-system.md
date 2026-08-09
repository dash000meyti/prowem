# سیستم طراحی PROWEM

## اصل هویت‌ها

```text
PROWEM Platform  ≠  Event Property  ≠  Club Property
```

| Scope | مسیرها | هویت |
|-------|--------|------|
| `platform` | `/` | PROWEM orange + charcoal |
| `event` | `/events/*` | تم Event از داده (Bundesliga / SAPL / TI) |
| `club` | `/clubs/*` | تم Club از داده (Bayern / Dortmund / …) |
| `fan` | `/fans/*` | hybrid platform |
| `match` | `/matches/*` | تم Event میزبان |

پیاده‌سازی: `BrandScope` + `src/lib/theme.ts` → CSS vars `--brand-primary/secondary/accent/tint/glow/surface`.

داخل property صفحات از `text-brand` / `bg-brand` / `Button variant="brand"` استفاده کن — نه hard-code نارنجی/teal.

LIVE سیستم سراسری می‌تواند `--orange` بماند؛ CTA و nav فعال از `--brand-*` می‌آید.

## اتمسفر سکشن

`SectionShell` با:

- `plain` / `tint` / `contrast` / `mesh` / `band`

ریتم پیشنهادی: Hero عکس → tint → contrast → mesh → band (CTA).

## Marketing homepage (`/`)

ریتم: Hero full-bleed → Audience (tint) → Service features متناوب (contrast / mesh / tint) → Platform CTA (band).

قوانین هیرو:

- فقط برند PROWEM + یک headline + یک جمله + گروه CTA + تصویر غالب edge-to-edge
- بدون کارت، بدون glass panel، بدون badge/overlay شناور روی رسانه
- بدون entity دمو (اسکور زنده، باشگاه، فن)

کامپوننت‌ها: `src/components/marketing/*` (`HomeHero`, `ServiceMarquee`, `AudienceIntro`, `ServiceFeature`, `PlatformCtaBand`).

حس بصری: سینمایی و editorial (Ken Burns هیرو، line-reveal تایپوگرافی، پنل‌های full-bleed مخاطب، watermark شماره خدمات، CTA با عکس زمینه) — بدون کارت هیرو و بدون badge شناور.

## رنگ پایه Platform

| نقش | مقدار |
|------|--------|
| BG 0–2 | `#08090B` / `#0D0F12` / `#121417` |
| PROWEM Orange | `#FF5A1F` |
| Text | `#F5F5F2` / muted `#A7A7A7` |

## Glass + تصویر

`GlassPanel`, `PhotoBackground`, `MediaImage`, `Crest` — مطابق ارتقای قبلی.

## ممنوع

- hard-code رنگ brand داخل event/club pages
- یک پالت واحد برای کل سایت بدون BrandScope
- blur افراطی روی هر باکس
