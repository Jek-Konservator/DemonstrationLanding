# План работы над демо-лендингом

Демо-проект для портфолио (Kwork + резюме). Вымышленная онлайн-школа **AI Practicum**, курс «Нейросети для работы». Два языка: ru / en.

## Как работаем

- Код пишется по `docs/LANDING_GUIDE.md` (гайд Романа по лендингам).
- Работаем маленькими этапами. После каждого этапа: `npm run check` зелёный → Роман смотрит diff → коммит по conventional commits на русском.
- Репозиторий публичный, демо — на Vercel. Даты коммитов не подделываем, история — настоящая.
- Роман должен понимать каждую строчку: на непонятное — объяснять, а не просто писать код.

## Этапы

- [x] **1. Каркас** — Next.js 15 (App Router), TS strict, next-intl (ru/en), eslint (слои, Mantine только через @ui), prettier, stylelint, vitest (порог 80%), husky, lint-staged, CI.
- [ ] **2. Тема и Layout** — разбит на два коммита:
  - [x] **2a. Тема и UI Kit** — theme.scss (брейкпоинты, rem, larger-than, unstyled-list, fadeUp, высота шапки), global.scss, тема Mantine (violet, Manrope, светлая), next/font, UiProvider, Button / Container / Title / Text.
  - [ ] **2b. Layout** — Header (навигация по якорям, переключатель языка, бургер), Footer, ScrollTop.
- [ ] **3. Секции** — первый экран, для кого курс, программа (аккордеон), преподаватель, тарифы, FAQ. По 1–2 секции за этап.
- [ ] **4. Форма заявки** — схема yup, адаптеры полей, стор на createQuery, состояния Loading/Success/Error, route handler `/api/lead` с отправкой в Telegram, honeypot.
- [ ] **5. SEO** — metadata, hreflang, sitemap.ts, robots.ts, OG-картинка, JSON-LD, Lighthouse ≥ 90.
- [ ] **6. Финал** — README со скриншотами и бейджем CI, деплой на Vercel, скриншоты и видео для Kwork.

## Принятые решения

- ESLint 9 с flat config (`eslint.config.mjs`) вместо ESLint 8 + `@vercel/style-guide`: style-guide 5 конфликтует с `@next/eslint-plugin-next` 15 и больше не развивается.
- `eslint.config.mjs` не игнорируется линтером: по нему `next build` проверяет, подключён ли плагин `@next/next`.
- В lint-staged у eslint флаг `--no-warn-ignored`: иначе игнорируемый файл в коммите (`next.config.ts`) даёт warning и роняет хук.
- В `vitest.setup.ts` — `cleanup()` после каждого теста: без `globals: true` RTL сам DOM не чистит.
- После импортов — одна пустая строка (prettier схлопывает две).
- Версия Node — из `.nvmrc` (22): `engines`, CI (`node-version-file`), Vercel.
- `UiProvider` — клиентский компонент: тема собирается через `Component.extend`, а на сервере компоненты Mantine — ссылки без методов. `UiColorSchemeScript` и `uiHtmlProps` — в отдельном серверном файле.
- Шрифт (`@ui/theme/fonts`) не реэкспортируется из `@ui/theme`: `next/font` работает только в компиляторе Next, в vitest — нет. Файл исключён из покрытия.
- UI Kit — реэкспорты Mantine (сохраняется полиморфизм `component={Link}`), умолчания — в `theme.ts` через `Component.extend`.
