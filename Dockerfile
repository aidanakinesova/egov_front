FROM node:18-alpine
WORKDIR /front

COPY . /front

RUN npm install