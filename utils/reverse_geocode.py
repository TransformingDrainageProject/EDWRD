import argparse
import geopandas as gpd
from shapely.geometry import Point

states = gpd.read_file("./midwest_states.geojson")

def main(args):
    latitude = args.latitude
    longitude = args.longitude
    field = Point(latitude, longitude)

    state = states.loc[states["geometry"].contains(field), "STUSPS"]

    abbr = ""
    if state.values.size > 0:
        abbr = state.values[0]

    print(abbr)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Reverse geocode tool")
    parser.add_argument("latitude", type=float, help="Latitude")
    parser.add_argument("longitude", type=float, help="Longitude")

    args = parser.parse_args()

    main(args)
