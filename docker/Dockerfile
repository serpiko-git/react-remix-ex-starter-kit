# define nodejs builder

FROM node:22-alpine3.20 AS builder

COPY . .
RUN npm install -g pnpm
RUN echo "pnpm version"
RUN pnpm install
RUN pnpm run build
CMD pnpm run dev

# FROM node:22-alpine3.20 AS runner# run sleep 10000  
