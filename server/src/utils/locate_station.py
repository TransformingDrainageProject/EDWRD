import argparse
import json
import logging
import sys

import geopandas as gpd
import numpy as np
import pandas as pd
import shapely
from shapely.geometry import Point
from shapely.ops import nearest_points


logging.basicConfig(filename='/tmp/location_station.log',
                    filemode='w', level=logging.DEBUG)


def convert_to_geopandas_dataframe(df, lat_colname, lon_colname):
    df["geometry"] = df["geometry"] = df.apply(
        lambda z: Point(z[lat_colname], z[lon_colname]),
        axis=1)
    return gpd.GeoDataFrame(df)


def find_nearest_station(point, stations):
    station_points = stations.geometry.unary_union
    nearest_station = stations.geometry == nearest_points(point, station_points)[
        1]
    return stations[nearest_station]


def format_for_edwrd(station):
    data = {
        "rhmin": [
            station["Jan_rhmin"].values[0].item(),
            station["Feb_rhmin"].values[0].item(),
            station["Mar_rhmin"].values[0].item(),
            station["Apr_rhmin"].values[0].item(),
            station["May_rhmin"].values[0].item(),
            station["Jun_rhmin"].values[0].item(),
            station["Jul_rhmin"].values[0].item(),
            station["Aug_rhmin"].values[0].item(),
            station["Sep_rhmin"].values[0].item(),
            station["Oct_rhmin"].values[0].item(),
            station["Nov_rhmin"].values[0].item(),
            station["Dec_rhmin"].values[0].item(),
        ],
        "wnd": [
            station["Jan_wnd"].values[0].item(),
            station["Feb_wnd"].values[0].item(),
            station["Mar_wnd"].values[0].item(),
            station["Apr_wnd"].values[0].item(),
            station["May_wnd"].values[0].item(),
            station["Jun_wnd"].values[0].item(),
            station["Jul_wnd"].values[0].item(),
            station["Aug_wnd"].values[0].item(),
            station["Sep_wnd"].values[0].item(),
            station["Oct_wnd"].values[0].item(),
            station["Nov_wnd"].values[0].item(),
            station["Dec_wnd"].values[0].item(),
        ]
    }

    return data


def main(args):
    latitude = args.latitude
    longitude = args.longitude
    point = Point(latitude, longitude)

    df = pd.read_csv("./src/utils/edwrd_wnd_rhmin.txt", sep="\t")
    gdf = convert_to_geopandas_dataframe(df, "Latitude", "Longitude")

    nearest_station = find_nearest_station(point, gdf)
    station_records = format_for_edwrd(nearest_station)

    print(json.dumps(station_records))
    sys.stdout.flush()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Find nearest weather station to a provided point.")
    parser.add_argument("latitude", type=float, help="Latitude")
    parser.add_argument("longitude", type=float, help="Longitude")

    args = parser.parse_args()

    main(args)
