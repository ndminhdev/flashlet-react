FROM node:15-alpine
LABEL maintainer="Allan Wu <wuallanx@gmail.com>"
LABEL description="Dockerize Flashlet React client application"
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
RUN npm install --legacy-peer-deps --silent
RUN npm run build

RUN chown -R node node_modules

EXPOSE 8080

USER node
ENTRYPOINT [ "npm", "run", "start:pwa" ]
# ENTRYPOINT ["npm", "start"]
