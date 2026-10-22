# План работы над демо-лендингом

Демо-проект для портфолио (Kwork + резюме). Вымышленная онлайн-школа **AI Practicum**, курс «Нейросети для работы». Два языка: ru / en.

## Как работаем

- Код пишется по `docs/LANDING_GUIDE.md` (гайд Романа по лендингам).
- Работаем маленькими этапами. После каждого этапа: `npm run check` зелёный → Роман смотрит diff → коммит по conventional commits на русском.
- Репозиторий публичный, демо — на Vercel. Даты коммитов не подделываем, история — настоящая.
- Роман должен понимать каждую строчку: на непонятное — объяснять, а не просто писать код.

## Этапы

- [x] **1. Каркас** — Next.js 15 (App Router), TS strict, next-intl (ru/en), eslint (слои, Mantine только через @ui), prettier, stylelint, vitest (порог 80%), husky, lint-staged, CI.
- [x] **2. Тема и Layout** — разбит на два коммита:
  - [x] **2a. Тема и UI Kit** — theme.scss (брейкпоинты, rem, larger-than, unstyled-list, fadeUp, высота шапки), global.scss, тема Mantine (violet, Manrope, светлая), next/font, UiProvider, Button / Container / Title / Text.
  - [x] **2b. Layout** — Header (навигация по якорям, переключатель языка, бургер с Drawer), Footer, ScrollTop; тест совпадения ключей словарей.
- [ ] **3. Секции** — первый экран, для кого курс, программа (аккордеон), преподаватель, тарифы, FAQ. По 1–2 секции за этап.
  - [x] **3a.** Первый экран (SectionMain), «Для кого курс» (SectionAudience), svgr, `useIntersectionObserver`.
  - [ ] **3b.** Программа (аккордеон), преподаватель.
  - [ ] **3c.** Тарифы, FAQ.
- [ ] **4. Форма заявки** — схема yup, адаптеры полей, стор на createQuery, состояния Loading/Success/Error, route handler `/api/lead` с отправкой в Telegram, honeypot.
- [ ] **5. SEO** — metadata, hreflang, sitemap.ts, robots.ts, OG-картинка, JSON-LD, Lighthouse ≥ 90.
      После Header First Load JS — 268 kB (было 104): Drawer тянет Modal/FocusTrap/Portal. Проверить bundle-analyzer, при необходимости — мобильное меню через `dynamic`.
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
- Шапка `position: sticky` — контенту не нужен отступ сверху; `scroll-margin-top` у `section[id]` — в `global.scss`.
- Условные классы — `clsx(styles.a, isX && styles.isX)`, а не `{ [styles.isX]: isX }`: с `noUncheckedIndexedAccess` класс модуля — `string | undefined` и не может быть ключом объекта (пример в разделе 4 гайда так не компилируется).
- Стрелка ScrollTop — CSS-уголок; svgr подключим в этапе 3, когда понадобятся иконки секций.
- `NAVIGATION_ITEMS` — `as const satisfies readonly NavigationName[]`: тип пропускает только пункты, у которых есть подпись в словаре.
- SVG-компонент импортируется с суффиксом: `icon.svg?react` (тип `*.svg` Next объявил как `any`, перекрыть нельзя). `icon.svg?url` — `StaticImageData` для `next/image`. Типы — в `svg.d.ts` без импортов верхнего уровня.
- Первый экран без фото и без анимации появления (LCP не ждёт JS), фон — CSS-градиент.
