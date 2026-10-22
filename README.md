# AI Practicum — демо-лендинг онлайн-школы

> Демо-проект для портфолио. Школа и курс вымышленные.

Лендинг онлайн-курса «Нейросети для работы» на двух языках (ru / en).

## Стек

- Next.js (App Router), React, TypeScript
- Mantine через собственный UI Kit, SCSS-модули
- next-intl — мультиязычность
- effector + farfetched — состояние и отправка формы
- react-hook-form + yup — форма заявки
- Vitest + Testing Library — тесты
- ESLint, Prettier, Stylelint, Husky, lint-staged, GitHub Actions

## Запуск

```bash
npm install
cp .env.example .env.local
npm run dev
```

Сайт откроется на http://localhost:3000.

## Скрипты

| Команда          | Что делает                                        |
| ---------------- | ------------------------------------------------- |
| `npm run dev`    | Режим разработки                                  |
| `npm run build`  | Продакшен-сборка                                  |
| `npm run check`  | Форматирование, линтеры, типы и тесты — всё сразу |
| `npm run test`   | Тесты с покрытием                                 |
| `npm run format` | Отформатировать код                               |

## Архитектура

```
src/
├── app/         # роутинг: layout, page, metadata
├── screens/     # экран главной страницы и его секции
├── features/    # шапка, подвал, навигация
├── entities/    # сущности: заявка
├── services/    # HTTP-клиенты
└── shared/      # UI Kit, форма, хуки, константы, конфиги
```

Импорты между слоями проверяются линтером.
