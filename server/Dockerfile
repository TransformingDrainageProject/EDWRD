FROM node:16-bullseye-slim

WORKDIR /app

# install dependencies
RUN apt-get update && apt-get install -y gcc g++ python3 python3-dev gdal-bin gdal-data libgdal-dev libgeos-3.9.0 libgeos-dev proj-bin proj-data libproj-dev
RUN apt-get install -y python3-gdal python3-pyproj python3-rasterio python3-shapely python3-geopandas python3-openpyxl

# install app and dependencies
COPY package*.json ./
COPY yarn*.lock ./
RUN yarn install

COPY . .

EXPOSE 5000

CMD ["yarn", "start"]
