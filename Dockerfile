# client
# base image
FROM node:10.15.3-alpine as client

# set working directory
WORKDIR /app/client

# install and cache app dependencies
COPY client/package.json ./
COPY client/yarn.lock ./
RUN yarn install
COPY client/ ./
RUN yarn run build

# server
# base image
FROM node:10.15.3-alpine

# set working directory
WORKDIR /app/
COPY --from=client /app/client/build/ ./client/build/

# working directory
COPY package*.json ./
COPY yarn*.lock ./
RUN yarn install
COPY . ./

CMD [ "yarn", "start" ]
