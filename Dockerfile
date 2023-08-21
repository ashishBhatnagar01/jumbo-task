FROM node:16

WORKDIR /app/src/

COPY . .

RUN yarn install

RUN npx prisma generate

EXPOSE 8080

CMD ["node","dist/src/main.js"]