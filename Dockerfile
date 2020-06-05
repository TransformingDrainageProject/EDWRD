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
RUN apt-get update && apt-get install -y gcc g++ python3 python3-dev gdal-bin gdal-data libgdal-dev libgeos-3.7.1 libgeos-dev proj-bin proj-data libproj-dev
RUN apt-get install -y python3-gdal python3-pyproj python3-rasterio python3-shapely python3-geopandas python3-openpyxl

# working directory
WORKDIR /app/server
COPY ./server/package*.json ./
COPY ./server/yarn*.lock ./
RUN yarn install
COPY ./server/ ./

CMD [ "yarn", "start" ]