FROM node:8.12-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm install -g nodemon

RUN apk add yarn

EXPOSE 8000

CMD yarn run start