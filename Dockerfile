FROM node:16

WORKDIR /app/src/

COPY package.json ./

RUN yarn install

COPY . .

RUN npx prisma generate

RUN yarn build

EXPOSE 8082

CMD ["yarn","start:dev"]