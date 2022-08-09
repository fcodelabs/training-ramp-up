FROM node:16

WORKDIR /usr/src/app

RUN npm -v

COPY . .

RUN npm run build

EXPOSE 5000

CMD [ "node", "dist/main.js"]
