import argparse
import geopandas as gpd
import pandas as pd
import shapely
from shapely.geometry import Point
from shapely.ops import nearest_points

def convert_to_geopandas_dataframe(df, lat_colname, lon_colname):
    df["geometry"] = df["geometry"] = df.apply(
        lambda z: Point(z[lat_colname], z[lon_colname]),
        axis=1)
    return gpd.GeoDataFrame(df)


def find_nearest_station(point, stations):
    station_points = stations.geometry.unary_union
    nearest_station = stations.geometry == nearest_points(point, station_points)[1]
    return stations[nearest_station]


def main(args):
    latitude = args.latitude
    longitude = args.longitude
    point = Point(latitude, longitude)

    df = pd.read_csv("./edwrd_wnd_rhmin.txt", sep="\t")
    gdf = convert_to_geopandas_dataframe(df, "Latitude", "Longitude")

    nearest_station = find_nearest_station(point, gdf)
    print(f"Nearest station: {nearest_station['GHCND ID'].values[0]}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Find nearest weather station to a provided point.")
    parser.add_argument("latitude", type=float, help="Latitude")
    parser.add_argument("longitude", type=float, help="Longitude")

    args = parser.parse_args()

    main(args)
