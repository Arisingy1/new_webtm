# syntax=docker/dockerfile:1

# ---- Stage 1: deps — установка зависимостей ----
FROM node:24.15.0-alpine3.22 AS deps
WORKDIR /app

# Копируем только манифесты, чтобы слой с зависимостями кешировался
COPY package.json package-lock.json ./
# npm ci — детерминированная установка строго по lock-файлу
RUN npm ci

# ---- Stage 2: builder — сборка приложения ----
FROM node:24.15.0-alpine3.22 AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Отключаем телеметрию Next.js на этапе сборки
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- Stage 3: runner — минимальный рантайм ----
FROM node:24.15.0-alpine3.22 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Непривилегированный пользователь (в alpine-образе node он уже есть: uid/gid 1000)
USER node

# Копируем только то, что нужно для запуска standalone-сервера.
# Папки public и .next/static в standalone не попадают автоматически — копируем вручную.
COPY --chown=node:node --from=builder /app/public ./public
COPY --chown=node:node --from=builder /app/.next/standalone ./
COPY --chown=node:node --from=builder /app/.next/static ./.next/static

EXPOSE 3000

# server.js генерируется standalone-сборкой Next.js
CMD ["node", "server.js"]
