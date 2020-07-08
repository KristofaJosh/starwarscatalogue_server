FROM node:12

MAINTAINER Chris Josh "christopherjoshua25@hotmail.com"

WORKDIR /server
COPY package.json ./server
COPY yarn.lock ./server
RUN yarn

COPY . /server

EXPOSE 8080

CMD ['yarn', 'start_dev']

