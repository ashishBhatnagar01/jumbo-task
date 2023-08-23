FROM node:16

WORKDIR /app/src/

COPY package*.json ./

RUN yarn install

RUN yarn build

RUN npx prisma generate

EXPOSE 8082

CMD ["node","dist","src/main.js"]