FROM node:16-bullseye-slim

WORKDIR /app

# install app and dependencies
COPY package*.json ./
COPY yarn*.lock ./
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
