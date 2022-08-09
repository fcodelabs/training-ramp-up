FROM node:16

WORKDIR /usr/src/app

RUN npm install

RUN npm -v

COPY package.json ./

COPY . .

RUN npm run build

EXPOSE 4500

CMD [ "node", "dist/main.js" ]
