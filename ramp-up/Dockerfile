FROM node:current-alpine

WORKDIR /app

RUN npm -v

COPY package.json ./

RUN npm install

COPY . .

CMD [ "npm", "start"]