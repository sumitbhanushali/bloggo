FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build && npm run prisma:generate

##### STAGE 2 #####

FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/.dist ./.dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
