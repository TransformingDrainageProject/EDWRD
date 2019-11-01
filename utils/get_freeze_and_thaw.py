import argparse
import json
import sys
from typing import Tuple

import pyproj
import rasterio


def extract_value(raster_path: str, point: Tuple) -> float:
    """Finds the raster value at a specified point.

    Parameters:
    raster_path (str): Path to raster.
    point (Tuple): Longitude and latitude of a single point.

    Returns:
    value (float): Raster value found at point.
    """
    with rasterio.open(raster_path) as src:
        crs = pyproj.Proj(src.crs)
        wgs = pyproj.Proj(init="epsg:4326")

        lon, lat = point
        east, north = pyproj.transform(wgs, crs, lon, lat)

        row, col = src.index(east, north)

        raster = src.read(1)

        # check if row, col for point are within raster bounds
        if (row < 0 or row > raster.shape[0] - 1) or \
                (col < 0 or col > raster.shape[1] - 1):
            return None

        try:
            value = raster[row, col]
        except IndexError:
            value = None

        return value


def main(longitude: float, latitude: float) -> None:
    """Fetches the freeze and thaw raster values at a
    specified point and prints the results as a JSON string.

    Parameters:
    longitude (float): Point's longitude.
    latitude (float): Point's latitude.

    Returns:
    None.
    """
    point = (longitude, latitude)

    freeze = extract_value("./utils/frz_date_krig.tif", point)
    thaw = extract_value("./utils/thw_date_krig.tif", point)

    results = {
        "freeze": str(freeze),
        "thaw": str(thaw)
    }

    print(json.dumps(results))

    sys.stdout.flush()


if __name__ == "__main__":
    # Required arguments when script called from command line
    parser = argparse.ArgumentParser(description="Extract raster value")
    parser.add_argument("longitude", type=float, help="Longitude")
    parser.add_argument("latitude", type=float, help="Latitude")

    # Get passed in arguments
    args = parser.parse_args()
    longitude = args.longitude
    latitude = args.latitude

    main(longitude, latitude)
