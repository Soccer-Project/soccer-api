FROM node:14.17-alpine

RUN apk add --no-cache bash

COPY ./ ./

WORKDIR /

CMD npm install && npm build && npm start

EXPOSE 3306
