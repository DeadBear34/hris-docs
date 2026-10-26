# Situs statis: dibangun dengan Node, disajikan nginx tanpa root.
# Versi Node mengikuti backend (Security Release 21 Okt 2026)
ARG NODE_IMAGE=node:22.23.4-bookworm-slim

FROM ${NODE_IMAGE} AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine AS runtime

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/security-headers.conf /etc/nginx/security-headers.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1
