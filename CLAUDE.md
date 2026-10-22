# Правила проекта

Демо-лендинг онлайн-школы для портфолио. Перед работой прочитай:

- `docs/LANDING_GUIDE.md` — гайд по коду (обязателен для всего кода в проекте);
- `docs/PLAN.md` — этапы, текущий статус и договорённости.

Главное из гайда:

- Слои: `app` → `screens` → `features` → `entities` → `services` → `shared`. Импорт только «вниз», проверяется eslint.
- Секция = папка `Section<Name>/` с `Section<Name>.tsx`, `index.ts`, `styles.module.scss`, `constants.ts`, `assets/`, тестом.
- Тексты — только в `dictionaries/ru.json` и `en.json`, ключи `Sections.<Name>.*`. Строк в JSX нет.
- Mantine — только через `@ui/*`.
- Стили — mobile-first, миксины и брейкпоинты из `theme.scss`, без хардкода цветов.
- Каждый новый модуль — с тестом. Перед коммитом `npm run check` должен быть зелёным, `--no-verify` запрещён.
- Коммиты — conventional commits на русском: `feat(<секция>): ...`.

После завершения этапа отмечай его в `docs/PLAN.md`.
