# سیستم طراحی PROWEM

## اصل هویت‌ها

```text
PROWEM Platform  ≠  Event Property  ≠  Club Property
```

| Scope | مسیرها | هویت |
|-------|--------|------|
| `platform` | `/` | PROWEM orange + charcoal |
| `event` | `/events/*` | تم Event از داده (NOVA CUP) |
| `club` | `/clubs/*` | تم Club از داده (NEXUS teal) |
| `fan` | `/fans/*` | hybrid platform |
| `match` | `/matches/*` | تم Event میزبان |

پیاده‌سازی: `BrandScope` + `src/lib/theme.ts` → CSS vars `--brand-primary/secondary/accent/tint/glow/surface`.

داخل property صفحات از `text-brand` / `bg-brand` / `Button variant="brand"` استفاده کن — نه hard-code نارنجی/teal.

LIVE سیستم سراسری می‌تواند `--orange` بماند؛ CTA و nav فعال از `--brand-*` می‌آید.

## اتمسفر سکشن

`SectionShell` با:

- `plain` / `tint` / `contrast` / `mesh` / `band`

ریتم پیشنهادی: Hero عکس → tint → contrast → mesh → band (CTA).

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
