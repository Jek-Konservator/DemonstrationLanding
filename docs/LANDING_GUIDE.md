# Гайд по лендингам — Роман Алексеев

Правила для лендингов, промо-страниц, сайтов-визиток и небольших сайтов без личного кабинета. Для больших проектов (личные кабинеты, админки, продуктовые приложения) — навык `roman-frontend-style`, не этот.

## Приоритеты

1. `CLAUDE.md` и правила в репозитории важнее этого гайда.
2. **Чужой проект** (доработка у заказчика) — сначала изучи его стиль и конфиги; где он расходится с гайдом — следуй проекту и перечисли расхождения пользователю.
3. Правило мешает задаче — не нарушай молча: скажи и предложи вариант.

---

## 0. Рабочий процесс — ОБЯЗАТЕЛЬНО

Лендинг собирается этапами, каждый проверен и закоммичен отдельно.

### Перед началом

1. Прочитай `CLAUDE.md`, `docs/` и `package.json`: версии, скрипты, что уже настроено.
2. Задача больше ~5 файлов — сначала **короткий план по этапам** и согласуй его. Типовой порядок: каркас → тема и Layout → секции (1–2 за этап) → форма и API → SEO → README и деплой.
3. Новый проект — **первый этап всегда каркас**: конфиги, линтеры (в т.ч. stylelint), тесты, husky, lint-staged **и CI** (раздел 16). Без CI каркас не готов.

### Каждый этап

1. Пиши код по гайду.
2. Пиши тесты к нему (раздел 15).
3. Запускай `npm run check`. Упало — **исправляй причину**. Запрещено без согласия пользователя: отключать правило линтера, ставить `eslint-disable` / `stylelint-disable`, `@ts-ignore`, `any`, `skip`/`only` в тестах, снижать порог покрытия.
4. Пройди **чек-лист самопроверки** (раздел 0.1).
5. Коммит: **один этап = один коммит**, conventional commits (раздел 17). Ориентир — до 15–20 файлов. Конфиги — отдельным коммитом от кода.
6. Если пользователь хочет сначала посмотреть diff — покажи и дождись, не коммить сам.

### Если что-то недоступно

- Нет прав записать файл (`.github/`, `.husky/` и т.п.) — не пропускай его: выведи пользователю путь и полное содержимое.
- Нет возможности запустить проверки — прямо скажи, что код не проверен, и перечисли команды для запуска.

### В конце работы

Короткий отчёт: что сделано (по коммитам), что не сделано и почему, известные риски, следующий шаг.

### 0.1. Чек-лист самопроверки перед коммитом

- [ ] `npm run check` зелёный, проверки не ослаблены.
- [ ] Новый код покрыт тестами.
- [ ] Тексты — только в словарях обоих языков (ключи в `ru.json` и `en.json` совпадают), строк в JSX нет.
- [ ] Mobile-first, вёрстка проверена на 360px, планшете и десктопе.
- [ ] Один `h1`, секции с `id`, у картинок `alt`, у кнопок-иконок `aria-label`.
- [ ] Картинки через `next/image`, первая — `priority`, тяжёлые блоки — `dynamic`.
- [ ] Нет `any`, `!`, `@ts-ignore`, `eslint-disable`, `console.log`, хардкода цветов.
- [ ] Форма: загрузка, ошибка, успех, защита от двойной отправки (раздел 8).
- [ ] Версии `@next/eslint-plugin-next` / `eslint-config-next` совпадают с `next`; версия Node одна в `engines`, `.nvmrc` и CI.

---

## 1. Стек

| Задача          | Чем делаем                                                                                                                                                                                                                         |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Фреймворк       | Next.js (App Router), React, TypeScript `strict` + `noUncheckedIndexedAccess`                                                                                                                                                      |
| Рендеринг       | Статика (SSG) + ISR через `revalidate`                                                                                                                                                                                             |
| UI              | Mantine 7 через свой UI Kit (`shared/uikit`) — кнопки, инпуты, модалки, табы, аккордеоны                                                                                                                                           |
| Вёрстка секций  | SCSS-модули + глобальные переменные и миксины `theme.scss`                                                                                                                                                                         |
| Классы          | `clsx`                                                                                                                                                                                                                             |
| Шрифты          | `next/font`                                                                                                                                                                                                                        |
| Картинки        | `next/image`, SVG — через `@svgr/webpack` как React-компоненты                                                                                                                                                                     |
| Мультиязычность | `next-intl` (если сайт на нескольких языках)                                                                                                                                                                                       |
| Состояние       | effector + effector-react — только UI-состояние между секциями (модалка, выбранный таб)                                                                                                                                            |
| Запросы         | `@farfetched/core` — только `createQuery` (отправка формы)                                                                                                                                                                         |
| Формы           | react-hook-form + yup                                                                                                                                                                                                              |
| Защита формы    | Яндекс SmartCaptcha или honeypot                                                                                                                                                                                                   |
| Тесты           | vitest, @testing-library/react, @testing-library/user-event, jsdom, @vitest/coverage-v8                                                                                                                                            |
| Качество        | prettier + sort-imports, eslint 9, flat config (typescript-eslint, react, react-hooks, jsx-a11y, import, @next/next, eslint-config-prettier), stylelint (`stylelint-config-standard-scss` + `stylelint-order`), husky, lint-staged |

**Версии:**

- `@next/eslint-plugin-next` и `eslint-config-next` — той же мажорной и минорной версии, что `next`.
- Версия Node — одна и та же в `engines`, `.nvmrc`, CI и на хостинге (Vercel).
- Мажорные версии не поднимаем «заодно» — только отдельной задачей.

## 2. Структура

```
dictionaries/              # ru.json, en.json — все тексты сайта
src/
├── app/
│   └── [locale]/
│       ├── layout.tsx     # шрифт, провайдеры, Header/Footer
│       ├── page.tsx       # загрузка данных + metadata + <MainPage />
│       ├── not-found.tsx
│       ├── sitemap.ts
│       └── robots.ts
│   └── api/
│       └── lead/route.ts  # приём заявки: валидация, капча, отправка в CRM/Telegram
├── screens/
│   └── Main/
│       ├── index.tsx      # собирает секции по порядку
│       └── ui/
│           ├── index.ts
│           ├── Seo/       # JSON-LD и прочее, если не хватает metadata
│           ├── SectionMain/
│           ├── SectionAdvantages/
│           └── SectionFeedback/
├── features/
│   └── Layout/            # Header, Footer, Navbar, ScrollTop, Logo
├── entities/
│   ├── Lead/              # api/createLead, model/store
│   └── News/              # api/getNews (контент из CMS)
├── services/
│   └── request/           # request (клиент) + serverRequest (с токеном, только сервер)
└── shared/
    ├── uikit/             # components/, hooks/, theme/ (theme.ts, theme.scss, global.scss)
    ├── form/              # adapters/, components/ (Captcha), hooks/, validators/, constants
    ├── hooks/             # useIntersectionObserver
    ├── constants/         # navigation.ts (id секций), internalization.ts
    ├── config/env/        # server-env.ts, client-env.ts
    └── utils/
```

Правила импорта слоёв: `shared` ничего не знает снаружи, сущность не импортирует сущность, фича — фичу, `app` — только роутинг и загрузка данных. Проверяется `import/no-restricted-paths`; Mantine вне `shared/uikit` запрещён через `no-restricted-imports`.

### Папка секции

```
SectionAdvantages/
├── SectionAdvantages.tsx
├── SectionAdvantages.test.tsx
├── index.ts
├── styles.module.scss
├── constants.ts(x)       # списки карточек, иконки, ключи переводов
├── assets/               # картинки и svg только этой секции
└── AdvantagesCard/       # подкомпоненты секции — по той же схеме
```

## 3. Данные

- Контент грузится на сервере в `page.tsx` и передаётся в секции пропсами. Страница статическая, обновляется через ISR:
  ```tsx
  // app/[locale]/page.tsx
  import { NewsApi } from "@entities/News/api";
  import MainPage from "@screens/Main";

  export const revalidate = 60;

  const Page = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
    const { locale } = await params;
    const news = await NewsApi.getNews({ locale });

    return <MainPage news={news} />;
  };

  export default Page;
  ```
- Независимые запросы — параллельно через `Promise.all`.
- Нет данных или запрос упал — секция не рендерится, страница не падает.
- Два HTTP-клиента в `services/request`: `serverRequest` (с токеном, `import "server-only"`, только для загрузки контента) и `request` (браузер, только свои `/api/*`).
- Секреты в браузер не попадают — всё с токеном идёт через route handler.
- React Context для данных — только если клиентский компонент глубоко и пробрасывать пропсы неудобно.

## 4. Секции

```tsx
"use client";

import type { FC } from "react";
import Link from "next/link";
import { Button } from "@ui/Button";
import { Container } from "@ui/Container";
import { Title } from "@ui/Title";
import { clsx } from "clsx";
import { useTranslations } from "next-intl";
import { NAVIGATION_NAMES } from "@shared/constants/navigation";
import { useIntersectionObserver } from "@shared/hooks/useIntersectionObserver";
import { AdvantagesCard } from "./AdvantagesCard";
import { ADVANTAGE_ICONS, ADVANTAGE_NAMES } from "./constants";
import styles from "./styles.module.scss";

interface SectionAdvantagesProps {
  id: string;
}

export const SectionAdvantages: FC<SectionAdvantagesProps> = ({ id }) => {
  const translate = useTranslations("Sections.Advantages");
  const { ref, isVisible } = useIntersectionObserver({ once: true });

  return (
    <section className={styles.sectionAdvantages} id={id}>
      <Container>
        <Title
          className={clsx(styles.title, { [styles.isVisible]: isVisible })}
          order={2}
          ref={ref}
        >
          {translate("title")}
        </Title>
        <ul className={styles.list}>
          {ADVANTAGE_NAMES.map((name) => (
            <li key={name}>
              <AdvantagesCard
                description={translate(`list.${name}.description`)}
                icon={ADVANTAGE_ICONS[name]}
                name={translate(`list.${name}.name`)}
              />
            </li>
          ))}
        </ul>
        <Button
          component={Link}
          href={`#${NAVIGATION_NAMES.feedback}`}
          size="lg"
        >
          {translate("button")}
        </Button>
      </Container>
    </section>
  );
};
```

- Каждая секция — `<section>` с `id` из `NAVIGATION_NAMES`. Навигация и кнопки ведут на `#id`.
- У секций — `scroll-margin-top` под высоту фиксированной шапки.
- `h1` — один на страницу, в первой секции. В остальных — `Title order={2}`, внутри — `order={3}`.
- Контент — внутри `Container`.
- Тексты — только из словаря (`useTranslations("Sections.<Name>")`) или `constants.ts`. Строк в JSX нет.
- Повторяющиеся элементы — массив в `constants.ts` + `.map`.
- Порядок секций — только в `screens/Main/index.tsx`.
- `"use client"` — только у секций с хуками. Статичные секции — серверные компоненты.

## 5. Стили

- Mobile-first: базовые стили — телефон, дальше `@include larger-than(map.get($breakpoints, 'sm'))`. Минимальная ширина — 360px.
- `theme.scss` подключается во все модули через `sassOptions.additionalData` и содержит `$breakpoints` (совпадают с `theme.ts` Mantine), миксины `larger-than`, `unstyled-list`, `fadeUp`, функцию `rem()`, размеры шапки.
- Все стили секции вложены в её корневой класс.
- Цвета, отступы, шрифты — переменные `--mantine-*` и SCSS-переменные. Хардкод цветов — нет.
- `:global(...)` — только для точечных правок Mantine, внутри класса секции.
- Порядок свойств — по `stylelint-order`.
- Импорт модуля: `import styles from "./styles.module.scss"`.

## 6. Анимации

- Появление при скролле — `useIntersectionObserver({ once: true })` + миксин `fadeUp` + класс `.isVisible` через `clsx`.
- Анимируем только `opacity` и `transform`.
- `@media (prefers-reduced-motion: reduce)` — анимации отключаются (в миксине `fadeUp`).
- Текст есть в HTML сразу, анимация только визуальная.
- Счётчики и таймеры (обратный отсчёт до старта курса и т.п.) — от отметки времени (`Date.now()`), а не «минус секунда за тик».

## 7. Картинки и медиа

- Только `next/image`. Фоновые — `fill` + `object-fit: cover` + `sizes`.
- Картинка первого экрана — `priority`, остальные ленивые.
- Исходники — WebP/AVIF/JPG до ~500 КБ, тяжёлые не коммитим.
- Внешние картинки — только из `images.remotePatterns`.
- SVG-иконки — импорт как компонент, как URL — `?url`.
- Видео — `preload="none"` + `poster`.
- Карты, видеоплееры, капча, виджеты — `dynamic(() => import(...))` и рендер по видимости.
- Осмысленный `alt` из словаря.

## 8. Форма заявки

- Схема — yup, ключи ошибок — `ERROR_NAMES`, перевод — `useErrorTranslate`.
- Поля — адаптеры из `shared/form/adapters` (`useController` + компонент UI Kit).
- Отправка — стор в `entities/Lead/model/store` через `createQuery`; компонент берёт `$pending`, `$succeeded`, `$failed`, `start`, `reset` через `useUnit`.
- Кнопка отправки — `loading`/`disabled`, пока запрос идёт (защита от двойной отправки).
- Состояния — компоненты `Loading` / `Success` / `Error` поверх формы, у `Error` — «попробовать снова» (`reset`).
- Защита — капча (лениво, по видимости) или honeypot.
- Route handler `app/api/lead/route.ts`: валидирует тело той же yup-схемой, проверяет капчу на сервере, отправляет в CRM / Telegram / почту (ключи из `SERVER_ENV`), отвечает `{ ok: true }` или ошибкой без деталей.
- Согласие на обработку данных — через `translate.rich`, без `dangerouslySetInnerHTML`.
- Маска телефона, плейсхолдер по локали.
- Переход на «спасибо»-страницу (если есть) — только после `finished.success`.

## 9. SEO

- `metadata` / `generateMetadata`: `title`, `description`, `openGraph` (title, description, image, locale, type), `alternates` (canonical, hreflang).
- `sitemap.ts` и `robots.ts`.
- OG-картинка 1200×630.
- JSON-LD (`Organization` / `LocalBusiness`) — в `Seo`, если есть адрес и контакты.
- Семантика: `header`, `main`, `section`, `footer`, `nav`; один `h1`; заголовки по порядку.

## 10. Мультиязычность

- `next-intl`, сегмент `[locale]`, словари `dictionaries/<locale>.json`.
- Типизированные ключи: `global.d.ts` с `AppConfig` (`Messages` из `ru.json`, `Locale` из констант).
- Неймспейсы: `SEO`, `Layout.Header`, `Sections.<Name>`, `Form`, `Errors`.
- Ключи во всех словарях совпадают — проверяется тестом.
- Разметка в тексте — `translate.rich`.
- Язык по умолчанию — `ru`, локали — в `shared/constants/internalization.ts`.

## 11. Доступность

- `alt` у картинок, `aria-label` у кнопок-иконок.
- Меню и модалки работают с клавиатуры, фокус видимый.
- У полей — `label`, ошибки привязаны к полю.
- Контраст текста на фоновых картинках — затемнение/градиент.

## 12. Производительность

Цель — Lighthouse (мобильный) ≥ 90 по Performance, Accessibility, Best Practices, SEO. Проверяем перед сдачей.

- LCP — картинка первого экрана с `priority` и правильным `sizes`.
- Шрифты — `next/font` с `subsets` и `display: "swap"`, только нужные начертания.
- `experimental.optimizePackageImports` для Mantine и иконок.
- Сторонние скрипты — `next/script` со `strategy="afterInteractive"` или `lazyOnload`.
- `@next/bundle-analyzer` — проверка бандла перед сдачей.

## 13. Аналитика (если нужна)

- Яндекс.Метрика / GA — через `next/script`, ID — из `CLIENT_ENV`.
- Цели: клики по «Оставить заявку», успешная отправка формы (в `sample` на `finished.success`).

## 14. Именование и форматирование

- Компонент — `<Name>.tsx` + `index.ts`, стили — `styles.module.scss`, тесты — рядом `*.test.ts(x)`.
- Секции — `Section<Name>`, подкомпоненты — по смыслу (`AdvantagesCard`, `NumbersList`).
- Константы — `UPPER_SNAKE_CASE`, события — `xxxEv`, сторы — `$xxx`, запросы — `xxxQuery`, объект стора — ключи `event`, `store`, `query`.
- Именованные экспорты, `export default` — только `page.tsx`, `layout.tsx`, экран и конфиги, которые этого требуют (next-intl).
- Prettier: двойные кавычки, точки с запятой, trailing comma; после импортов одна пустая строка. Пропсы JSX по алфавиту, `import type` отдельно.
- `import React from "react"` не пишем — импортируем только используемое.
- Алиасы: `@ui/*`, `@ui/hooks/*`, `@ui/theme`, `@form/*`, `@shared/*`, `@entities/*`, `@features/*`, `@screens/*`, `@services/*`.
- Env — только через `SERVER_ENV` / `CLIENT_ENV` (yup-валидация при старте, `NEXT_PUBLIC_*` — только для браузера, `.env.example` в репозитории).

## 15. Тесты

Каждый новый модуль приходит в коммит со своим тестом.

| Что                  | Как                                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| `utils`, `transform` | Вход → выход, крайние случаи                                                                                 |
| Схема формы          | Валидные и невалидные данные, тексты ошибок                                                                  |
| Стор формы           | `fork` + `allSettled`, API — `vi.mock`                                                                       |
| Форма                | testing-library + user-event: ошибки при пустой отправке, успешная отправка, состояния, нет двойной отправки |
| Route handler        | Валидное тело → `ok`, невалидное → 400, ошибка CRM → 500                                                     |
| Секции               | Рендер: `section` с нужным `id`, заголовок, элементы списка из `constants`                                   |
| Словари              | Набор ключей в `ru.json` и `en.json` совпадает                                                               |
| Хуки                 | `useIntersectionObserver` — с моком `IntersectionObserver`                                                   |

Порог покрытия — 80%.

## 16. Проверки перед коммитом и CI

```json
{
  "scripts": {
    "format:check": "prettier --check .",
    "lint": "eslint . --max-warnings=0",
    "stylelint": "stylelint \"src/**/*.scss\" --allow-empty-input",
    "typecheck": "tsc --noEmit",
    "test": "vitest run --coverage",
    "check": "npm run format:check && npm run lint && npm run stylelint && npm run typecheck && npm run test"
  }
}
```

- husky `pre-commit`: `npx lint-staged`, `npm run typecheck`, `npm run test`.
- lint-staged — только по файлам коммита: `*.{ts,tsx}` → prettier + `eslint --fix --max-warnings=0 --no-warn-ignored` (без флага игнорируемый файл в коммите даёт warning и роняет хук); `*.scss` → prettier + `stylelint --fix`; `*.{json,md}` → prettier. Никаких «обходов», которые прогоняют всю папку: если упираемся в длину командной строки — коммит слишком большой, разбиваем.
- husky `pre-push`: `npm run build`.
- CI — `.github/workflows/ci.yml`, создаётся в этапе каркаса:
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
- Порядок: код → тесты → `npm run check` → чек-лист → коммит. `--no-verify` запрещён.

## 17. Git

Conventional commits на русском: `feat(advantages): секция преимуществ`, `fix(feedback): маска телефона`. Область — имя секции или слайса. Один коммит — один этап, ориентир до 15–20 файлов. Ветки `feature/<кратко>`, `fix/<кратко>`. Даты и авторство коммитов не подделываем.

## 18. Чего не делаем

- Не пишем тексты в JSX — только словарь или `constants`.
- Не используем `<img>` вместо `next/image` и не коммитим тяжёлые исходники.
- Не отдаём токены API в браузер — только через route handler.
- Не используем `dangerouslySetInnerHTML` для текстов.
- Не ставим больше одного `h1`.
- Не грузим карты, видео, капчу и виджеты сразу — только `dynamic` и по видимости.
- Не анимируем `width`, `height`, `top`, `left`.
- Не хардкодим цвета и брейкпоинты.
- Не ставим `"use client"` на статичные секции.
- Не ослабляем проверки ради зелёного `check`.
- Не делаем огромных коммитов и не коммитим без тестов и с упавшими проверками.
