FROM node:10.19.0-buster-slim

WORKDIR /app

# install app and dependencies
COPY package*.json ./
COPY yarn*.lock ./
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]