FROM node:10.19.0-buster-slim

WORKDIR /app

# install dependencies
ENV PROJ_DIR=/usr/local
RUN apt-get update && apt-get install -y gcc g++ python3 python3-dev gdal-bin gdal-data libgdal-dev libgeos-3.7.1 libgeos-dev proj-bin proj-data libproj-dev
RUN apt-get install -y python3-gdal python3-pyproj python3-rasterio python3-shapely python3-geopandas

# install app and dependencies
COPY package*.json ./
COPY yarn*.lock ./
RUN yarn install

COPY . .

EXPOSE 5000

CMD ["yarn", "start"]