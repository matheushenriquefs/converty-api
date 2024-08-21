FROM node:20.12.2-alpine3.18

WORKDIR /app

COPY package*.json .

RUN npm install

RUN mv node_modules /node_modules

COPY . .

RUN node ace build

RUN chmod +x ./entrypoint.sh

EXPOSE 3333 8080

ENTRYPOINT ["./entrypoint.sh"]
