# План работы над демо-лендингом

Демо-проект для портфолио (Kwork + резюме). Вымышленная онлайн-школа **AI Practicum**, курс «Нейросети для работы». Два языка: ru / en.

## Как работаем

- Код пишется по `docs/LANDING_GUIDE.md` (гайд Романа по лендингам).
- Работаем маленькими этапами. После каждого этапа: `npm run check` зелёный → Роман смотрит diff → коммит по conventional commits на русском.
- Репозиторий публичный, демо — на Vercel. Даты коммитов не подделываем, история — настоящая.
- Роман должен понимать каждую строчку: на непонятное — объяснять, а не просто писать код.

## Где остановились (23.10.2026)

**Состояние репозитория**

- Работаем в ветке `dev`, последний коммит — `d641a59 test(feedback): таймаут на ленивую загрузку формы`. Рабочая копия чистая, `npm run check` и `npm run build` зелёные, покрытие 100% (изредка v8 показывает 99.9% на `FeedbackForm.tsx` — артефакт двойной загрузки модуля, порог 80%).
- Для `npm run build` локально нужен `.env.local` (`cp .env.example .env.local`): без `NEXT_PUBLIC_SITE_URL` сборка падает — так и задумано.
- `dev` никуда не запушен и не слит в `main`. На `main` — только каркас (`0e2c2b8`, в нём по ошибке старый `package.json` с ESLint 8 — исправлено в `dev` коммитом `c42940e`, в `main` попадёт при слиянии).
- Готово: этапы 1–5 — каркас, тема и UI Kit, Layout, все секции, форма заявки с `/api/lead` и Telegram (демо-режим без ключей), SEO (canonical, hreflang, Open Graph, OG-картинки, sitemap, robots, JSON-LD, иконка), облегчение бандла: First Load JS главной — 148 kB.

**Следующий шаг — этап 6: финал**

- Отправить форму руками в браузере (`npm run dev`): ошибки пустых полей, выбор тарифа кнопкой в «Тарифах», «Заявка отправлена» в демо-режиме. До сих пор — только тесты и `curl` по `/api/lead`.
- Деплой на Vercel: `NEXT_PUBLIC_SITE_URL` = адрес деплоя (иначе сборка упадёт); ключи Telegram — по желанию. Node — из `.nvmrc`.
- Lighthouse (мобильный) — перемерить на Vercel. Локально мешает Kaspersky (встраивает скрипт по HTTP и снимает gzip): Performance 89–90, Accessibility 100, Best Practices 82, SEO 92 (canonical на тестовый домен). Если на Vercel Performance < 90 — подключать CSS Mantine по компонентам вместо `styles.css` (30 КБ блокирующего CSS).
- README со скриншотами и бейджем CI, материалы для Kwork.

**Открытые хвосты**

- Гайд (`docs/LANDING_GUIDE.md`) расходится с кодом в двух местах — предложить Роману `docs`-коммит:
  - раздел 4: пример `clsx({ [styles.isVisible]: isVisible })` не компилируется с `noUncheckedIndexedAccess`, пишем `clsx(styles.a, isX && styles.isX)`;
  - раздел 7: SVG-компонент импортируется как `icon.svg?react`, а `?url` даёт `StaticImageData`, а не строку.

**Как работаем с git (важно)**

- В индекс сами попадают лишние файлы (похоже, WebStorm добавляет новые файлы в VCS), и WebStorm уже однажды записал старые версии `package.json` и `docs/` поверх новых. Поэтому коммитим только так: `git add <пути> && git commit -- <пути>`, после — `git show --stat HEAD`. Перед коммитом сверять `package.json` и `docs/` с договорённым.
- Перед коммитом Роман смотрит diff; коммиты — после его «ок». Сообщения — conventional commits на русском, конфиги отдельно от кода, до 15–20 файлов.
- Проверка вёрстки: `npm run build && npx next start -p 3123`, скриншоты headless Edge (`--headless=old --screenshot`). Окно уже 492px Windows не даёт — для 360px открывать страницу в `<iframe width="360">`.

## Этапы

- [x] **1. Каркас** — Next.js 15 (App Router), TS strict, next-intl (ru/en), eslint (слои, Mantine только через @ui), prettier, stylelint, vitest (порог 80%), husky, lint-staged, CI.
- [x] **2. Тема и Layout** — разбит на два коммита:
  - [x] **2a. Тема и UI Kit** — theme.scss (брейкпоинты, rem, larger-than, unstyled-list, fadeUp, высота шапки), global.scss, тема Mantine (violet, Manrope, светлая), next/font, UiProvider, Button / Container / Title / Text.
  - [x] **2b. Layout** — Header (навигация по якорям, переключатель языка, бургер с Drawer), Footer, ScrollTop; тест совпадения ключей словарей.
- [x] **3. Секции** — первый экран, для кого курс, программа (аккордеон), преподаватель, тарифы, FAQ. По 1–2 секции за этап.
  - [x] **3a.** Первый экран (SectionMain), «Для кого курс» (SectionAudience), svgr, `useIntersectionObserver`.
  - [x] **3b.** Программа (аккордеон), преподаватель, `Accordion` в UI Kit.
  - [x] **3c.** Тарифы (`PricingCard`), FAQ.
- [x] **4. Форма заявки** — схема yup, адаптеры полей, стор на createQuery, состояния Loading/Success/Error, route handler `/api/lead` с отправкой в Telegram, honeypot.
- [x] **5. SEO** — metadata, hreflang, sitemap.ts, robots.ts, OG-картинка, JSON-LD, Lighthouse ≥ 90.
      Плюс вес страницы: 347 → 148 kB (реэкспорты UI Kit, ленивая форма). Lighthouse перемерить на Vercel.
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
- Accordion: `order={3}` оборачивает кнопки пунктов в `h3` (заголовок внутри `<button>` — невалидный HTML). Accordion не принимает `ref` — `useIntersectionObserver` вешаем на обёртку `div`.
- Преподаватель — вымышленный, вместо фото SVG-иллюстрация (`currentColor`, цвет из SCSS, `role="img"` + `aria-label` из словаря). Секция статичная — серверный компонент без анимации появления.
- Состав тарифов — в `constants.ts` (`PRICING_FEATURES`), тексты пунктов в словаре один раз (`Sections.Pricing.features`). Тарифы — серверный компонент, FAQ — клиентский (появление при скролле). У FAQ серый фон, пункты аккордеона белые через `classNames.item`.
- Env — `validateEnv(schema, env)` (yup, падает при старте, лишнее отбрасывает). Ключи Telegram необязательны: без них демо-режим — `/api/lead` проверяет заявку и отвечает успехом, ничего не отправляя. Задан только один ключ — ошибка. `NEXT_PUBLIC_*` передаются в `CLIENT_ENV` поимённо (иначе Next не подставит их в браузер).
- `server-only` в vitest подменён на пустой модуль (`resolve.alias`): у пакета пустой экспорт только под условием `react-server`.
- Одна `leadSchema` для формы и `/api/lead`. Тарифы — `PLAN_NAMES` в `shared/constants/plans.ts` (нужны и `screens`, и `entities`). Ответы API без деталей: 400 / 502 / `{ ok: true }`; заполненный honeypot — тоже `{ ok: true }`, чтобы бот не понял, что пойман.
- Сообщение в Telegram — всегда на русском, подписи полей в коде (`formatLeadMessage`): это служебный текст владельцу, не текст сайта. Без `parse_mode` — разметка из заявки не интерпретируется.
- Кнопка тарифа → событие effector `planSelected` → форма подставляет тариф (`watch` в `useEffect` с отпиской). `PlanButton` — клиентская, `PricingCard` получает её через `action`, секция тарифов остаётся серверной.
- Состояния формы — поверх неё: `LoadingOverlay` и `FeedbackResult` (успех — `role="status"`, ошибка — `role="alert"`, «Попробовать снова» сохраняет введённое). `onSubmit={(event) => void handleSubmit(onSubmit)(event)}` — из-за `no-misused-promises`.
- Метаданные: `metadataBase` из `CLIENT_ENV`, canonical и hreflang (`x-default` → `/ru`) через `shared/config/seo`. Sitemap и robots — функции там же, `app/sitemap.ts` и `app/robots.ts` — обёртки. В CI адрес сайта задан в шаге сборки.
- OG-картинка — `next/og` для каждого языка, статически (`generateStaticParams`). Шрифт — Manrope `.woff` из `@fontsource/manrope` в `OgImage/assets` (OFL): дефолтный шрифт `next/og` без кириллицы. Латиница и кириллица — разные имена шрифта: с одним именем Satori берёт только первый файл. Цвета — `THEME_COLORS` из палитры Mantine; `@ui/theme/colors` импортируется напрямую, потому что `theme.ts` (Component.extend) на сервере не работает.
- JSON-LD — `Course` с провайдером `Organization` (адреса и контактов нет). `siteUrl` передаётся в `MainPage` из `page.tsx`: env читает только `app`. Без `offers` — цены в словаре строками.
- UI Kit: `import { X } from "@mantine/core"; export { X };`, а не `export { X } from` — иначе `optimizePackageImports` не срабатывает и в бандл попадает весь Mantine (было +136 kB).
- Форма грузится `next/dynamic` (`ssr: false`) по видимости секции (`rootMargin: 600px`), место под неё держит `min-height`. Тариф до загрузки формы — в `$selectedPlan`. `PlanButton` импортирует `@entities/Lead/model/plan`, а не индекс сущности. Ленивый Drawer в шапке пробовали — выигрыша нет, откатили.
- `--mantine-color-dimmed` — `gray.7` через `cssVariablesResolver` (у `gray.6` контраст 3.3). У ссылок языков `aria-label` начинается с видимого текста: «RU — Русский».
