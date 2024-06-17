FROM oven/bun:1 AS build

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile

RUN bun build ./src/index.ts --compile --outfile server

FROM ubuntu:22.04

WORKDIR /app

COPY integrations/ ./integrations
COPY icons/ ./icons

COPY --from=build /app/server /app/server

CMD ["/app/server"]