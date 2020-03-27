import argparse
import sys

import geopandas as gpd
from shapely.geometry import Point


def main(longitude: float, latitude: float) -> None:
    """Fetches the state name associated with a specified
    point and prints the state's postal abbreviation.

    Parameters:
    longitude (float): Point's longitude
    latitude (float): Point's latitude

    Returns:
    None.
    """
    states = gpd.read_file("./src/utils/midwest_states.geojson")
    field = Point(longitude, latitude)

    state = states.loc[states["geometry"].contains(field), "STUSPS"]

    abbr = ""
    if state.values.size > 0:
        abbr = state.values[0]

    print(abbr)
    sys.stdout.flush()


if __name__ == "__main__":
    # Required arguments when script called from command line
    parser = argparse.ArgumentParser(description="Reverse geocode tool")
    parser.add_argument("longitude", type=float, help="Longitude")
    parser.add_argument("latitude", type=float, help="Latitude")

    # Get passed in arguments
    args = parser.parse_args()
    longitude = args.longitude
    latitude = args.latitude

    main(longitude, latitude)
