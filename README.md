# Mecenate Mobile

Тестовое мобильное приложение для Mecenate: экран ленты публикаций авторов с курсорной пагинацией, pull-to-refresh, обработкой закрытых постов и ошибочных состояний API.

Стек: React Native + Expo + TypeScript + Expo Router + React Query + MobX + дизайн-токены.

## Что внутри

- `FeedScreen` с карточками публикаций: аватар, имя автора, превью, обложка, лайки, комментарии
- Курсорная пагинация на `useInfiniteQuery`
- Защита от лишних `onEndReached` вызовов и дублирования элементов
- Pull-to-refresh с reset-сценарием без смешивания старых и новых страниц
- Закрытые `paid` посты без раскрытия превью
- Error state с сообщением `Не удалось загрузить публикации` и рабочим retry
- Совместимость с Expo Go, без `custom dev client` и без native changes

## Запуск

```bash
pnpm install
cp apps/native/.env.example apps/native/.env
pnpm run dev:native
```

После старта откройте приложение через Expo Go:

1. Установите Expo Go на iOS или Android.
2. Запустите `pnpm run dev:native`.
3. Отсканируйте QR-код из терминала.

## Env

`.env.example` лежит в `apps/native/.env.example`.

| Переменная | По умолчанию | Описание |
| --- | --- | --- |
| `EXPO_PUBLIC_MECENATE_API_URL` | `https://k8s.mectest.ru/test-app` | Базовый URL REST API и WebSocket |
| `EXPO_PUBLIC_MECENATE_WS_DEBUG` | `false` | Подробный лог WebSocket |

## Команды

| Команда | Что делает |
| --- | --- |
| `pnpm run dev:native` | Генерирует токены и запускает Expo dev server |
| `pnpm run dev` | Запускает монорепо через Turbo |
| `pnpm run build` | Запускает сборку пакетов |
| `pnpm run check-types` | Проверяет TypeScript в `native`, `env`, `mecenate-api` |
| `pnpm run lint` | Запускает Biome lint |
| `pnpm run lint:fix` | Применяет автопочинку Biome |
| `pnpm run check:biome` | Полная проверка форматирования и стиля |
| `pnpm --filter @my-better-t-app/mecenate-api run generate` | Перегенерирует типы из OpenAPI |

## Архитектура

```text
apps/native/src/
  core/
    providers/        # QueryClient, MobX store, session bootstrap, realtime
    stores/           # app-level state
  features/
    feed/
      api/            # transport layer для /posts
      hooks/          # useFeedQuery + useFeedController
      lib/            # dedupe/reset helpers для infinite query
      screens/        # FeedScreen container
      ui/             # FeedPostCard, FeedErrorState, FeedEmptyState, ...
    post-detail/
    comments/
    session/
    realtime/
  shared/
    api/              # API client и QueryClient
    config/           # app config, fonts, design tokens
    lib/              # query keys, formatters, utils
    model/            # domain types
    ui/               # shared UI kit

packages/
  mecenate-api/       # OpenAPI schema + generated TS types
  env/                # typed env access
```

### Разделение ответственности

- React Query хранит весь серверный state: feed, post detail, comments.
- MobX оставлен только для app-level state: session token и состояние realtime-соединения.
- `useFeedController` управляет пагинацией, refresh/reset сценарием и защитой от лишних вызовов.
- Маппинг transport DTO -> domain types изолирован в `mappers/`.
- Контракт API берётся из `packages/mecenate-api/openapi/mecenate.openapi.json`.

## Что реализовано по заданию

### Feed

- Лента публикаций с карточками авторов
- Стабильные `keyExtractor` по `post.id`
- Переиспользуемые feed-компоненты:
  - `FeedPostCard`
  - `FeedAuthorHeader`
  - `FeedPostStats`
  - `FeedPaidStub`
  - `FeedErrorState`
  - `FeedEmptyState`

### Pagination

- Cursor pagination через `useInfiniteQuery`
- Подгрузка при скролле вниз
- Передан `AbortSignal` до fetch layer, чтобы отмена запросов работала корректно
- Защита от повторных `onEndReached` вызовов
- Дедупликация постов между страницами

### Pull-to-refresh

- Refresh отменяет активные feed-запросы
- Infinite cache обрезается до первой страницы перед новым запросом
- После refresh не смешиваются старые и новые страницы

### Paid posts

- Для `tier === "paid"` в ленте не показывается текст превью
- Вместо текста отображается отдельная заглушка
- Счётчики лайков и комментариев сохраняются

### API error / retry

- При пустом списке и ошибке показывается `Не удалось загрузить публикации`
- Кнопка `Повторить` запускает загрузку заново
- При уже загруженных карточках показывается неразрушающий retry-баннер

## OpenAPI и типизация

- Источник истины по контракту: `packages/mecenate-api/openapi/mecenate.openapi.json`
- Типы генерируются в `packages/mecenate-api/src/__generated__/mecenate-api.types.ts`
- Feed и comments используют cursor-based контракт API, offset pagination не используется

## Проверка перед сдачей

Минимальный набор:

```bash
pnpm run check-types
pnpm run dev:native
```

Если менялся OpenAPI контракт:

```bash
pnpm --filter @my-better-t-app/mecenate-api run generate
pnpm run check-types
```
