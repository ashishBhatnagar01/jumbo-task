FROM node:16

WORKDIR /app/src/

ADD package.json /app/src/package.json

RUN npm install

ADD . /app/src/

RUN npx prisma generate

RUN npm run build

EXPOSE 8082

CMD ["npm","run","start:dev"]