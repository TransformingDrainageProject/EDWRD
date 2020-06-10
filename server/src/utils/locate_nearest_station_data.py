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


logging.basicConfig(filename="/tmp/location_nearest_weather_station.log",
                    filemode="w", level=logging.DEBUG)


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


def main(longitude: float, latitude: float, user_data_flag: int) -> None:
    point = Point(latitude, longitude)

    # find nearest weather station
    weather_df = pd.read_csv("./src/utils/edwrd_wnd_rhmin.txt", sep="\t")
    weather_gdf = convert_to_geopandas_dataframe(
        weather_df, "Latitude", "Longitude")

    nearest_weather_station = find_nearest_station(point, weather_gdf)
    weather_station_data = format_for_edwrd(nearest_weather_station)

    data = {
        "param": weather_station_data
    }

    # find nearest daily input station
    if user_data_flag == 0:
        daily_df = pd.read_csv("./src/utils/edwrd_daily_stations.txt")
        daily_gdf = convert_to_geopandas_dataframe(
            daily_df, "LATITUDE", "LONGITUDE")

        nearest_daily_station = find_nearest_station(point, daily_gdf)
        daily_station = nearest_daily_station["FILE"].values[0]

        data["input"] = daily_station

    print(json.dumps(data))
    sys.stdout.flush()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Find nearest weather station to a provided point.")
    parser.add_argument("latitude", type=float,
                        help="Latitude of the map marker")
    parser.add_argument("longitude", type=float,
                        help="Longitude of the map marker")
    parser.add_argument("user_data_flag", type=int,
                        help="Boolean flag indicating if the user provided their own daily data")

    args = parser.parse_args()
    latitude = args.latitude
    longitude = args.longitude
    user_data_flag = args.user_data_flag

    main(longitude, latitude, user_data_flag)
