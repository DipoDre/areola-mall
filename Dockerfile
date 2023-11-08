FROM node:16-alpine as BUILD_IMAGE

WORKDIR /usr/app

COPY package*.json ./
COPY tsconfig*.json ./

RUN apk update && apk add openssh git && rm -rf /var/cache/apk/*
RUN mkdir /root/.ssh/
ADD id_rsa /root/.ssh/id_rsa
RUN touch /root/.ssh/known_hosts
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

RUN npm install

COPY . .

RUN npm build

# remove development dependencies
RUN npm prune --production

# run node prune
# RUN /usr/local/bin/node-prune

FROM node:16-alpine

WORKDIR /usr/app

# copy from build image
COPY --from=BUILD_IMAGE /usr/app/build ./build
COPY --from=BUILD_IMAGE /usr/app/node_modules ./node_modules

COPY package.json ./
COPY .env .env

CMD [ "npm", "start" ]
