FROM node:21.4.0

WORKDIR /app
COPY . .

RUN yarn