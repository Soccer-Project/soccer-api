FROM node:14.17-alpine

RUN apk add --no-cache bash

RUN mkdir -p /soccer-api

WORKDIR /soccer-api
ADD . /soccer-api

RUN yarn && yarn build

CMD [ "yarn", "start" ]
EXPOSE 5000
