FROM node:15-alpine
RUN mkdir -p app
WORKDIR /usr/src/app

RUN apk add --no-cache \
  autoconf \
  automake \
  bash \
  g++ \
  libc6-compat \
  libjpeg-turbo-dev \
  libpng-dev \
  make \
  nasm
COPY . ./
RUN npm install --silent

EXPOSE 8080

ENTRYPOINT [ "npm", "start" ]