import argparse
import json
import logging
import os
import sys

import pandas as pd
from shapely.geometry import Point

from locate_nearest_station_data import convert_to_geopandas_dataframe, find_nearest_station

logging.basicConfig(filename="/tmp/find_nearest_station.log",
                    filemode="w", level=logging.DEBUG)


def get_init_values(param_file: str) -> dict:
    df = pd.read_csv(param_file, sep="\t")
    form_fields = ["darea", "iarea", "rarea", "rdep", "rdep_min", "rseep", "zr", "zrfc", "zrwp",
                   "ze", "zefc", "zewp", "rew", "pfact", "irrdep", "irrdep_min", "dareaIncSurfaceRunoff"]
    init = {}

    for field in form_fields:
        if field == "rdep_min":
            init["rdepMin"] = df[field].values[0]
        elif field == "irrdep_min":
            init["irrdepMin"] = df[field].values[0]
        else:
            init[field] = df[field].values[0]

    return init


def main(longitude: float, latitude: float, unit: str) -> None:
    point = Point(latitude, longitude)

    daily_json = json.load(open("./src/utils/daily_stations.json"))
    daily_df = pd.DataFrame(daily_json["stations"])
    daily_gdf = convert_to_geopandas_dataframe(
        daily_df, "lat", "lon")

    nearest_station = find_nearest_station(point, daily_gdf)

    pfile = "./src/utils/daily_stations/" + \
        nearest_station["file"].values[0]["param"]
    if unit == "us":
        pfile = pfile[:-4] + "_us.txt"

    init_values = get_init_values(pfile)
    init_values["stationId"] = int(
        nearest_station["file"].values[0]["param"][0])
    for station in daily_json["stations"]:
        if station["id"] == int(nearest_station["file"].values[0]["param"][0]):
            init_values["stationName"] = station["name"]

    print(json.dumps(init_values))

    sys.stdout.flush()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Find nearest weather station to a provided point.")
    parser.add_argument("latitude", type=float,
                        help="Latitude of the map marker")
    parser.add_argument("longitude", type=float,
                        help="Longitude of the map marker")
    parser.add_argument("unit", type=str, help="Type of unit (us or metric)")

    args = parser.parse_args()
    latitude = args.latitude
    longitude = args.longitude
    unit = args.unit

    main(longitude, latitude, unit)
