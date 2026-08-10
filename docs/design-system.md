# سیستم طراحی PROWEM

## اصل هویت‌ها

```text
PROWEM Platform  ≠  Event Property  ≠  Club Property
```

| Scope | مسیرها | هویت |
|-------|--------|------|
| `platform` | `/` · `/events` · `/clubs` · `/matches` layout + live hub | PROWEM orange + charcoal |
| `event` | `/events/[slug]/*` | تم Event از داده (Bundesliga / SAPL / TI) |
| `club` | `/clubs/[slug]/*` | تم Club از داده (Bayern / Dortmund / …) |
| `fan` | `/fans/*` | hybrid platform |
| `match` | Match Center `/matches/[eventSlug]/[matchSlug]` | تم Event میزبان (`matchTheme`) |

پیاده‌سازی: `BrandScope` + `src/lib/theme.ts` → CSS vars `--brand-primary/secondary/accent/tint/glow/surface`.

داخل property صفحات از `text-brand` / `bg-brand` / `Button variant="brand"` استفاده کن — نه hard-code نارنجی/teal.

LIVE سیستم سراسری می‌تواند `--orange` بماند؛ CTA و nav فعال از `--brand-*` می‌آید.

**Match nuance:** hub زنده (`/matches/live`) و layout فهرست مسابقات از `platformTheme` استفاده می‌کنند؛ صفحهٔ Match Center از تم رویداد میزبان.

## اتمسفر سکشن

`SectionShell` با:

- `plain` / `tint` / `contrast` / `mesh` / `band`

ریتم پیشنهادی: Hero عکس → tint → contrast → mesh → band (CTA).

## Marketing homepage (`/`)

ریتم: Hero full-bleed → Audience → Service features متناوب → Platform CTA.

کامپوننت‌ها: `src/components/marketing/*` (`HomeHero`, `ServiceMarquee`, `AudienceIntro`, `ServiceFeature`, `PlatformCtaBand`).

حس بصری: charcoal + PROWEM orange؛ گرادینت‌های رنگی قوی‌تر در `.marketing-canvas` / `.marketing-theme-*`؛ هاله و سایهٔ رنگی پشت/کنار کارت‌ها با `.marketing-card-glow` و `.marketing-card-glow--*` (بدون پالت سبز/بنفش/آبی برند خارجی).

وضعیت فعلی هیرو: `GlassPanel` variant `display` روی عکس استادیوم (console) + ambient orange wash — بدون entity دمو. هدف بلندمدت design docs همچنان هیرو سینمایی بدون کارت است؛ تا redesign جداگانه، glow/shadow polish روی همین ساختار اعمال می‌شود.

## رنگ پایه Platform

| نقش | مقدار |
|------|--------|
| BG 0–2 | `#08090B` / `#0D0F12` / `#121417` |
| PROWEM Orange | `#FF5A1F` |
| Text | `#F5F5F2` / muted `#A7A7A7` |

## Glass + تصویر

`GlassPanel`, `PhotoBackground`, `MediaImage`, `Crest` — مطابق ارتقای قبلی.

Marketing cards: `glass-panel-marketing` + optional glow wrapper utilities در `globals.css`.

## ممنوع

- hard-code رنگ brand داخل event/club pages
- یک پالت واحد برای کل سایت بدون BrandScope
- blur افراطی روی هر باکس
