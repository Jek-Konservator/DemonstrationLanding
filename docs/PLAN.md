# План работы над демо-лендингом

Демо-проект для портфолио (Kwork + резюме). Вымышленная онлайн-школа **AI Practicum**, курс «Нейросети для работы». Два языка: ru / en.

## Как работаем

- Код пишется по `docs/LANDING_GUIDE.md` (гайд Романа по лендингам).
- Работаем маленькими этапами. После каждого этапа: `npm run check` зелёный → Роман смотрит diff → коммит по conventional commits на русском.
- Репозиторий публичный, демо — на Vercel. Даты коммитов не подделываем, история — настоящая.
- Роман должен понимать каждую строчку: на непонятное — объяснять, а не просто писать код.

## Где остановились (25.10.2026)

**Состояние репозитория**

- GitHub: https://github.com/Jek-Konservator/DemonstrationLanding (публичный, `gh` залогинен с правом `workflow`). `dev` сливается в `main` через PR (#1–#3, merge-коммиты, история сохраняется). Работаем в `dev`, в `main` — через PR.
- Vercel: https://demonstration-landing.vercel.app, проект `demonstration-landing` в команде `romans-projects-ab5e729c`, Git-интеграция подключена: `main` → прод, остальные ветки и PR → preview. `NEXT_PUBLIC_SITE_URL` задан для Production и Preview (адрес прода — canonical у превью смотрит на прод). Node — 22 из `engines`.
- `npm run check` и `npm run build` зелёные, CI на GitHub зелёный, покрытие 100%, First Load JS главной — 151 kB. Не запускать `build` при работающем `npm run dev` — оба пишут в `.next` (изредка v8 показывает 99.9% на `FeedbackForm.tsx` — артефакт двойной загрузки модуля, порог 80%).
- Для `npm run build` локально нужен `.env.local` (`cp .env.example .env.local`): без `NEXT_PUBLIC_SITE_URL` сборка падает — так и задумано. `vercel link` дописал туда `VERCEL_OIDC_TOKEN` — не коммитить.
- Lock-файл: локально npm 11 (Node 24), в CI и на Vercel — npm 10 (Node 22). npm 11 не пишет в lock необязательную peer-зависимость `@swc/helpers`, и `npm ci` в npm 10 падает. После изменения зависимостей — `npx npm@10 install --package-lock-only`.
- Готово: все этапы 1–6. Форма проверена руками в браузере (демо-режим).

**Итоги этапа 6d**

- Lighthouse на проде (25.10, локально, скрипт Kaspersky заблокирован через `--blocked-url-patterns`, gzip он всё равно снимает — цифры чуть занижены): мобильный 94 / 100 / 100 / 100 (LCP 2,6 с, CLS 0), десктоп 99 / 100 / 100 / 100. CSS Mantine по компонентам не нужен. PageSpeed Insights без API-ключа упирается в общую дневную квоту.
- README: бейдж CI, ссылка на демо, скриншоты (`docs/screenshots/`, сняты puppeteer-core + Edge с прода), Lighthouse, переменные окружения, деплой.
- Материалы для Kwork — в `kwork/` (в `.gitignore`, только локально): обложка и коллажи 1320×880, страница целиком, видео-проход 41 с, текст карточки в `kwork/description.md`. Загрузить на Kwork — Роман. Скрипты съёмки (puppeteer-core + Edge, ffmpeg из winget) — во временной папке сессии; видео — из кадров CDP `Page.startScreencast` с метками времени через concat ffmpeg: встроенный `page.screencast` puppeteer теряет или дублирует кадры (`round(fps × Δt)`).

**Открытые хвосты**

- Гайд (`docs/LANDING_GUIDE.md`) расходится с кодом в двух местах — предложить Роману `docs`-коммит:
  - раздел 4: пример `clsx({ [styles.isVisible]: isVisible })` не компилируется с `noUncheckedIndexedAccess`, пишем `clsx(styles.a, isX && styles.isX)`;
  - раздел 7: SVG-компонент импортируется как `icon.svg?react`, а `?url` даёт `StaticImageData`, а не строку.

**Как работаем с git (важно)**

- В индекс сами попадают лишние файлы (похоже, WebStorm добавляет новые файлы в VCS), и WebStorm уже однажды записал старые версии `package.json` и `docs/` поверх новых. Поэтому коммитим только так: `git add <пути> && git commit -- <пути>`, после — `git show --stat HEAD`. Перед коммитом сверять `package.json` и `docs/` с договорённым.
- Перед коммитом Роман смотрит diff; коммиты — после его «ок». Сообщения — conventional commits на русском, конфиги отдельно от кода, до 15–20 файлов.
- `gh` — `"C:\Program Files\GitHub CLI\gh.exe"` (в PATH старых сессий его нет). `curl` по HTTPS локально — с `--ssl-no-revoke` (Kaspersky ломает проверку отзыва сертификата). В Git Bash пути `vercel api /v9/...` — с `MSYS_NO_PATHCONV=1`.
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
- [x] **6. Финал** — сначала «уровень» визуала, потом README со скриншотами и бейджем CI, деплой на Vercel, скриншоты и видео для Kwork.
  - [x] **6a.** Первый экран: иллюстрация-чат с ассистентом справа (`HeroChat`).
  - [x] **6b.** Отзывы со слайдером на `scroll-snap` (`SectionReviews`, хук `useScrollCarousel`), пункт «Отзывы» в меню.
  - [x] **6c.** Микровзаимодействия: подъём карточек при наведении, тень шапки при скролле, счёт цифр первого экрана.
  - [x] **6e.** Полировка после ревью прода: карточки «Формат обучения» у программы и «Не нашли ответ?» у FAQ (на десктопе справа, программа — sticky), строки карточек тарифов и отзывов на `subgrid`, новая иллюстрация преподавателя.
  - [x] **6d.** Деплой, Lighthouse на Vercel, README, материалы для Kwork.

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
- Микровзаимодействия: `hoverLift` в `theme.scss` (подъём через `transform`, тень — у `::after`, анимируется её `opacity`; только `@media (hover: hover)`) — на карточках «Для кого» и тарифов; на отзывах нет — `overflow-x` ленты обрезал бы подъём и тень. Тень шапки — тот же приём, флаг из `useIsScrolled` (в состоянии только boolean — рендер при переходе через порог, а не на каждый пиксель).
- Счёт цифр первого экрана — `CountUp` (клиентский лист в серверной секции) + `useCountUp` (от времени старта кадра, `easeOutCubic`, при reduced motion — сразу итог). С сервера приходит итоговое число. Ширину держит невидимая копия итога в той же ячейке сетки — соседние цифры не сдвигаются (CLS 0). Формат (разделитель разрядов, «+») берётся из строки словаря.
- Слайдер отзывов — нативная прокрутка (`scroll-snap`), без библиотек. `@mantine/carousel` 7 требует Embla 7, а у неё в peer-зависимостях React до 18 — ставить можно только с `--legacy-peer-deps`, а Mantine 8 — мажорное обновление. Свайп и тачпад работают без JS, `useScrollCarousel` нужен только стрелкам (листают на ширину ленты, `smooth` выключается при reduced motion). На телефоне стрелок нет — видно край следующей карточки. Отзывы целиком в HTML.
- Секция отзывов — между «Преподавателем» и «Тарифами» (социальное доказательство перед ценой), фон `violet-0`, чтобы не было двух белых секций подряд. Проп карточки — `position`, а не `role`: `role` jsx-a11y проверяет как ARIA-роль.
- Меню из шести пунктов на 992px: отступ 18px (24px с `lg`) и `white-space: nowrap` у ссылок.
- `HeroChat` — серверный, анимация только CSS (`@keyframes` в модуле, `opacity`/`transform`, сценарий задержками), при `prefers-reduced-motion` всё видно сразу. Для скринридера — `role="img"` с подписью. Ответ разбит на короткие строки, чтобы LCP оставался на тексте первого экрана, а не на блоке, который появляется через 2 с.
- Mantine подключён через `styles.layer.css` (`@layer mantine`): стили вне слоя всегда сильнее, поэтому CSS-модули перекрывают Mantine при любом порядке CSS. С `styles.css` в dev стили Mantine шли после модулей, и `position: relative` ActionIcon ломал `fixed` у ScrollTop — под футером появлялась пустая полоса.
- `NEXT_PUBLIC_SITE_URL` без значения по умолчанию: забытый адрес должен ронять сборку, а не тихо ставить `localhost` в canonical и sitemap. Шаг с `.env.local` — в README. Адрес проверяется через `new URL()` (http/https), а не `string().url()`: тот не пускает `localhost`.
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
- Строки карточек тарифов и отзывов — CSS `subgrid`: цены, списки, кнопки и подписи авторов на одной линии, даже если у одной карточки текст в две строки. Лента отзывов — grid с `grid-auto-flow: column` (у flex нет subgrid). Плашки внутри общих строк — `place-self: start`, иначе тянутся по высоте строки.
- Иллюстрация преподавателя — одним цветом (`currentColor`) с прозрачностью: лицо и шея — один контур (иначе на стыке двойная прозрачность), у волос вырез под лицо.
