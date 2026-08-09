# CallPro — премиум-лендинг B2B колл-центра

Современный одностраничный лендинг с высокой конверсией для аутсорсингового колл-центра. Построен по конверсионной формуле: Hero → Боли → Услуги → Как работаем → Цены → Кейсы → Гарантии → Отзывы → FAQ → Финальный CTA.

## Технологии

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS 4** с дизайн-токенами в `@theme inline`
- **shadcn/ui** (Accordion, Badge)
- **Lucide React** — иконки
- **Prisma ORM** (SQLite) — опционально

## Структура

```
src/
  app/
    page.tsx          ← ВЕСЬ лендинг (13 секций)
    layout.tsx        ← Мета-теги, SEO, Schema.org JSON-LD
    globals.css       ← Цвета, анимации, дизайн-система
  lib/
    config.ts         ← ВСЕ тексты, телефоны, цены, услуги
  components/ui/      ← shadcn/ui компоненты
```

## Конверсионные особенности

- 7+ кнопок звонка `<a href="tel:+79218904491">` по всей странице
- Никаких форм заявки — только звонок и WhatsApp
- Sticky CTA-бар на мобильных (появляется при скролле > 350px)
- Анимации: pulse-call, float-badge, reveal-on-scroll, AnimatedCounter
- Премиум B2B-дизайн: deep navy + cyan + gold
- Полная мобильная адаптация
- prefers-reduced-motion отключает анимации

## Локальный запуск

```bash
bun install
bun run dev
```

Откройте http://localhost:3000

## Редактирование контента

Все тексты, телефоны, цены, услуги, FAQ вынесены в `src/lib/config.ts`.
Меняете контент за 2 минуты, не трогая вёрстку.

## SEO

- Title, description, keywords на русском
- Schema.org JSON-LD (Organization + FAQPage)
- Open Graph теги
- `lang="ru"`, локаль `ru_RU`

## Лицензия

Proprietary — CallPro © 2026
