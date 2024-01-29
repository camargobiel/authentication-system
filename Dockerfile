FROM node:latest

WORKDIR /usr/src/app

COPY package.json ./

RUN npm i -g pnpm
RUN pnpm i

COPY . .

EXPOSE 5000

CMD [ "pnpm", "dev" ]
