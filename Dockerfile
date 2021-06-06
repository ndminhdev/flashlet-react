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

RUN chown -R node node_modules

EXPOSE 8080

USER node
ENTRYPOINT [ "npm", "start" ]