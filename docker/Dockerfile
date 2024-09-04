FROM node:22-alpine3.20 AS builder

WORKDIR /app

COPY . .

EXPOSE 4000

RUN npm install -g pnpm
RUN echo "pnpm version"
RUN pnpm install
CMD pnpm run dev
