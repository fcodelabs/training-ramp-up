FROM node:16.14.1 as base

WORKDIR /usr/src/app

RUN npm -v

COPY package.json ./

COPY . .

RUN npm run build

EXPOSE 3001

CMD [ "node", "dist/main.js" ]
