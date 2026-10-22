# План работы над демо-лендингом

Демо-проект для портфолио (Kwork + резюме). Вымышленная онлайн-школа **AI Practicum**, курс «Нейросети для работы». Два языка: ru / en.

## Как работаем

- Код пишется по `docs/LANDING_GUIDE.md` (гайд Романа по лендингам).
- Работаем маленькими этапами. После каждого этапа: `npm run check` зелёный → Роман смотрит diff → коммит по conventional commits на русском.
- Репозиторий публичный, демо — на Vercel. Даты коммитов не подделываем, история — настоящая.
- Роман должен понимать каждую строчку: на непонятное — объяснять, а не просто писать код.

## Где остановились (23.10.2026)

**Состояние репозитория**

- Работаем в ветке `dev`, последний коммит — `41d0491 feat(audience): секция «Для кого курс»`. Рабочая копия чистая, `npm run check` и `npm run build` зелёные, покрытие 100%.
- `dev` никуда не запушен и не слит в `main`. На `main` — только каркас (`0e2c2b8`, в нём по ошибке старый `package.json` с ESLint 8 — исправлено в `dev` коммитом `c42940e`, в `main` попадёт при слиянии).
- Готово: каркас, тема и UI Kit, Header / Footer / ScrollTop, первый экран (`SectionMain`), «Для кого курс» (`SectionAudience`), svgr.

**Следующий шаг — этап 3b: «Программа курса» (аккордеон) и «Преподаватель»**

- Открытый вопрос к Роману: откуда фото преподавателя — Unsplash (нейтральный портрет, пометить как стоковое), SVG-аватар или своя картинка. Без ответа секцию «Преподаватель» не начинать.
- Для аккордеона добавить в UI Kit `Accordion` (реэкспорт Mantine, как Button), id секции — `NAVIGATION_NAMES.program`.
- Секции — по образцу `src/screens/Main/ui/SectionAudience/`: папка, `constants.ts`, `styles.module.scss`, тест (`section` с id, заголовок h2, элементы из констант), тексты в `Sections.<Name>` обоих словарей. Порядок секций — в `src/screens/Main/index.tsx` и его тесте.

**Открытые хвосты**

- Гайд (`docs/LANDING_GUIDE.md`) расходится с кодом в двух местах — предложить Роману `docs`-коммит:
  - раздел 4: пример `clsx({ [styles.isVisible]: isVisible })` не компилируется с `noUncheckedIndexedAccess`, пишем `clsx(styles.a, isX && styles.isX)`;
  - раздел 7: SVG-компонент импортируется как `icon.svg?react`, а `?url` даёт `StaticImageData`, а не строку.
- First Load JS — 269 kB (Drawer в шапке). Разобрать на этапе 5 (bundle-analyzer, мобильное меню через `dynamic`).
- `SERVER_ENV` / `CLIENT_ENV` (yup-валидация env, `shared/config/env`) ещё не сделаны; в `.env.example` пока только `NEXT_PUBLIC_SITE_URL`. Нужны на этапе 4 (ключи Telegram) и 5 (адрес сайта).

**Как работаем с git (важно)**

- В индекс сами попадают лишние файлы (похоже, WebStorm добавляет новые файлы в VCS), и WebStorm уже однажды записал старые версии `package.json` и `docs/` поверх новых. Поэтому коммитим только так: `git add <пути> && git commit -- <пути>`, после — `git show --stat HEAD`. Перед коммитом сверять `package.json` и `docs/` с договорённым.
- Перед коммитом Роман смотрит diff; коммиты — после его «ок». Сообщения — conventional commits на русском, конфиги отдельно от кода, до 15–20 файлов.
- Проверка вёрстки: `npm run build && npx next start -p 3123`, скриншоты headless Edge (`--headless=old --screenshot`). Окно уже 492px Windows не даёт — для 360px открывать страницу в `<iframe width="360">`.

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
