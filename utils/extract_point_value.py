import argparse
import json
import pyproj
import rasterio
import sys

def extract_value(raster_path, point):
    with rasterio.open(raster_path) as src:
        crs = pyproj.Proj(src.crs)
        wgs = pyproj.Proj(init="epsg:4326")

        lon, lat = point
        east, north = pyproj.transform(wgs, crs, lon, lat)

        row, col = src.index(east, north)

        raster = src.read(1)

        try:
            value = raster[row, col]
        except IndexError as e:
            value = None

        return value

def main(args):
    point = (args.longitude, args.latitude)

    freeze = extract_value("./utils/frz_date_krig.tif", point)
    thaw = extract_value("./utils/thw_date_krig.tif", point)

    results = {
        "freeze": str(freeze),
        "thaw": str(thaw)
    }

    print(json.dumps(results))

    sys.stdout.flush()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Extract raster value from point")
    parser.add_argument("latitude", type=float, help="Latitude")
    parser.add_argument("longitude", type=float, help="Longitude")

    args = parser.parse_args()

    main(args)
