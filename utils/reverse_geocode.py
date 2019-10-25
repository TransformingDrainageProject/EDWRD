import argparse
import sys

import geopandas as gpd
from shapely.geometry import Point

def main(args):
    states = gpd.read_file("./utils/midwest_states.geojson")
    latitude = args.latitude
    longitude = args.longitude
    field = Point(latitude, longitude)

    state = states.loc[states["geometry"].contains(field), "STUSPS"]

    abbr = ""
    if state.values.size > 0:
        abbr = state.values[0]

    print(abbr)
    sys.stdout.flush()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Reverse geocode tool")
    parser.add_argument("latitude", type=float, help="Latitude")
    parser.add_argument("longitude", type=float, help="Longitude")

    args = parser.parse_args()

    main(args)
