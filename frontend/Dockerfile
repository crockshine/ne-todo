FROM oven/bun:latest

WORKDIR /frontend

COPY package*.json .
RUN bun i

COPY . .
RUN bun run build

CMD ["bun","run","start"]
