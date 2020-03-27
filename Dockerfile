# client
# base image
FROM node:10.19.0-buster-slim as client

# set working directory
WORKDIR /app/client

# install and cache app dependencies
COPY ./client/package*.json ./
COPY ./client/yarn*.lock ./
RUN yarn install
COPY ./client/ ./
RUN yarn run build

# server
# base image
FROM node:10.19.0-buster-slim

# set working directory
WORKDIR /app/
COPY --from=client /app/client/build/ ./client/build/

# install dependencies
RUN apk add gcc g++ python3 python3-dev gdal gdal-dev
RUN pip3 install pyproj rasterio shapely geopandas

# working directory
WORKDIR /app/server
COPY ./server/package*.json ./
COPY ./server/yarn*.lock ./
RUN yarn install
COPY ./server/ ./

CMD [ "yarn", "start" ]