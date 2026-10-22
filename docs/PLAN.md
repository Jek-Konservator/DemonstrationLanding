# План работы над демо-лендингом

Демо-проект для портфолио (Kwork + резюме). Вымышленная онлайн-школа **AI Practicum**, курс «Нейросети для работы». Два языка: ru / en.

## Как работаем

- Код пишется по `docs/LANDING_GUIDE.md` (гайд Романа по лендингам).
- Работаем маленькими этапами. После каждого этапа: `npm run check` зелёный → Роман смотрит diff → коммит по conventional commits на русском.
- Репозиторий публичный, демо — на Vercel. Даты коммитов не подделываем, история — настоящая.
- Роман должен понимать каждую строчку: на непонятное — объяснять, а не просто писать код.

## Этапы

- [ ] **1. Каркас** — Next.js 15 (App Router), TS strict, next-intl (ru/en), eslint (слои, Mantine только через @ui), prettier, stylelint, vitest (порог 80%), husky, lint-staged, CI.
      Файлы записаны, НЕ проверены: `npm install` и `npm run check` ещё не запускались.
      Нет файлов `.husky/pre-commit`, `.husky/pre-push`, `.github/workflows/ci.yml` — создать (содержимое ниже).
- [ ] **2. Тема и Layout** — theme.scss (брейкпоинты, миксины larger-than / fadeUp / unstyled-list, rem), тема Mantine, next/font, UI Kit (Button, Container, Title, Text), Header (навигация по якорям, переключатель языка, бургер), Footer, ScrollTop.
- [ ] **3. Секции** — первый экран, для кого курс, программа (аккордеон), преподаватель, тарифы, FAQ. По 1–2 секции за этап.
- [ ] **4. Форма заявки** — схема yup, адаптеры полей, стор на createQuery, состояния Loading/Success/Error, route handler `/api/lead` с отправкой в Telegram, honeypot.
- [ ] **5. SEO** — metadata, hreflang, sitemap.ts, robots.ts, OG-картинка, JSON-LD, Lighthouse ≥ 90.
- [ ] **6. Финал** — README со скриншотами и бейджем CI, деплой на Vercel, скриншоты и видео для Kwork.

## Файлы, которые нужно создать на этапе 1

`.husky/pre-commit`

```
npx lint-staged
npm run typecheck
npm run test
```

`.husky/pre-push`

```
npm run build
```

`.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: npm
      - run: npm ci
      - run: npm run check
      - run: npm run build
```

## Известные вопросы

- ESLint 8 + `@vercel/style-guide` 5 взяты из рабочих проектов Романа. На первом прогоне возможны правила, которые надо отключить. ESLint 8 снят с поддержки — можно обсудить переход на 9.
- Prettier схлопывает две пустые строки после импортов в одну — правило «две пустые строки» из гайда с ним несовместимо, предложено убрать из гайда.
