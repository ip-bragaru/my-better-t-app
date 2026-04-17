# Mecenate Mobile — тестовое задание

Мобильное приложение для платформы поддержки авторов (аналог Patreon / Boosty). Реализует экран ленты публикаций с пагинацией, pull-to-refresh, платными постами и real-time обновлениями через WebSocket.

**Стек:** React Native + Expo · TypeScript · MobX + React Query · Expo Router · дизайн-токены

---

## Быстрый старт

```bash
# 1. Установить зависимости
pnpm install

# 2. Скопировать env (необязательно — по умолчанию используется https://k8s.mectest.ru/test-app)
cp apps/native/.env.example apps/native/.env

# 3. Регенерировать типы из OpenAPI-схемы (если схема изменилась)
pnpm --filter @my-better-t-app/mecenate-api run generate

# 4. Запустить dev-сервер
pnpm run dev:native
```

Открыть в **Expo Go**: отсканировать QR-код из терминала или из Expo Dev Tools.

---

## Переменные окружения

| Переменная | По умолчанию | Описание |
| --- | --- | --- |
| `EXPO_PUBLIC_MECENATE_API_URL` | `https://k8s.mectest.ru/test-app` | Базовый URL REST API и WebSocket |
| `EXPO_PUBLIC_MECENATE_WS_DEBUG` | `false` | Включить подробный лог WebSocket в консоль |

`.env.example` находится в `apps/native/.env.example`.

---

## Доступные команды

| Команда | Описание |
| --- | --- |
| `pnpm run dev:native` | Запустить токен-генератор и Expo dev-сервер |
| `pnpm run dev` | Запустить все приложения монорепо |
| `pnpm run build` | Собрать все пакеты |
| `pnpm run check-types` | Проверить типы TypeScript во всём монорепо |
| `pnpm run lint` | Запустить Biome lint |
| `pnpm run lint:fix` | Применить автоматические исправления Biome |
| `pnpm run format` | Форматировать код через Biome |
| `pnpm --filter @my-better-t-app/mecenate-api run generate` | Сгенерировать TypeScript-типы из OpenAPI-схемы |

---

## Что реализовано

### Экран Feed

- Список постов с аватаром автора, именем, обложкой, превью текста, счётчиком лайков и комментариев
- Курсорная пагинация через `useInfiniteQuery` — подгрузка при скролле вниз
- Защита от дублирования запросов: `isFetchingNextPage` + `isFetching` в `handleEndReached`
- Pull-to-refresh с корректным reset через `refetch()` infinite-query
- Фильтр по тиру: «Все» / «Бесплатные» / «Платные»
- Loading skeleton пока данные загружаются первый раз
- Empty state когда постов нет
- Error state с кнопкой «Повторить» когда API недоступен
- Плавающий toast-баннер если ошибка случилась при уже загруженных данных

### Платные посты

- На экране ленты: размытая обложка + иконка замка + skeleton-заглушки вместо текста
- На экране детали: показывается `PaidPostCover` вместо обложки и тела поста; заголовок и статистика остаются доступны
- Текст превью платного поста не раскрывается нигде в приложении

### Экран деталей поста

- Заголовок, обложка, превью / заглушка (для paid), статистика
- Кнопка лайка с оптимистичным обновлением и rollback при ошибке
- Секция комментариев с курсорной пагинацией
- Pull-to-refresh обновляет и пост, и комментарии одновременно
- Форма добавления комментария с ограничением 500 символов

### Real-time

- WebSocket-соединение с экспоненциальным backoff (1–10 секунд)
- Обработка событий: `ping`, `like_updated`, `comment_added`
- Дедупликация событий по id (TTL 45 секунд)
- Синхронизация кешей React Query при получении событий

### Error / Empty / Loading states

- Все состояния вынесены в переиспользуемый `ScreenState` (ts-pattern match)
- Тексты на русском языке

---

## Архитектура

```text
apps/native/src/
  core/
    providers/        # QueryClient, AppStore, SessionBootstrap, RealtimeConnection
    stores/           # AppStore (MobX): session UUID, WebSocket status
  features/
    session/          # UUID bootstrap, SecureStore / localStorage
    feed/             # FeedScreen, useFeedQuery, FeedPostCard, FeedSkeleton
    post-detail/      # PostDetailScreen, usePostDetailQuery, useToggleLikeMutation
    comments/         # CommentList, CommentItem, useCommentsQuery, useCreateCommentMutation
    realtime/         # RealtimeConnection, query-cache-sync
  shared/
    api/              # mecenateApi singleton, QueryClient config
    config/           # design-tokens, app-config
    lib/              # formatters, query-keys, error-mapper, invariant, uuid
    model/            # domain types: Post, Author, Comment, CursorPage
    ui/               # Button, Avatar, ActionChip, SkeletonBlock, ScreenState, ...

packages/
  mecenate-api/       # OpenAPI-клиент + типы (openapi-typescript)
```

### Разделение состояния

- **React Query** — весь серверный стейт: лента, детали поста, лайки, комментарии
- **MobX** — только app-level state: готовность сессионного UUID и статус WebSocket-соединения
- Серверный стейт не дублируется в MobX

### Сессия

- При первом запуске генерируется UUID (`uuid.ts`) и сохраняется в Expo SecureStore (iOS/Android) или localStorage (web)
- Ключ хранилища: `mecenate.session.uuid`
- UUID используется как Bearer token для REST и как query-параметр WebSocket

### API-контракт

- Схема: `packages/mecenate-api/openapi/mecenate.openapi.json`
- Типы генерируются командой: `pnpm --filter @my-better-t-app/mecenate-api run generate`
- Маппинг transport → domain в `apps/native/src/features/*/mappers/`

---

## Известные ограничения

- Аватары в формате `.webm` не рендерятся через `<Image>` в React Native — компонент `Avatar` отображает инициалы как фолбэк
- WebSocket-события `like_updated` не содержат `isLiked` — синхронизируется только счётчик, локальное состояние лайка пользователя сохраняется
- Лайки комментариев — только локальный UI-стейт (анимация + счётчик); API для лайков комментариев в схеме отсутствует
- Комментарии добавляются в кеш после успешного POST, а не оптимистично — чтобы избежать дублирования с WebSocket-событием `comment_added`
