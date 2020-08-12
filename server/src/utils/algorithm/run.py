import argparse
import calendar
import json
import os
import sys

import numpy as np
import pandas as pd

from main import edwrd


def convert_dataframe_to_monthly_json(data, rvols, column_name):
    chart_data = {
        0: {},
        1: {},
        2: {},
        3: {},
        4: {}
    }

    # loop through first five volumes
    for vol in range(0, 5):
        chart_data[vol]["average"] = []
        chart_data[vol]["yearly"] = []

        grouped_by_month = data[vol][column_name].groupby(level=1)

        monthly_means = grouped_by_month.aggregate(np.mean).values

        for month in range(0, len(monthly_means)):
            chart_data[vol]["average"].append({
                "x": calendar.month_abbr[month + 1],
                "y": monthly_means[month]
            })

        # annual records
        unique_years = data[vol][column_name].index.get_level_values(
            0).unique()
        chart_data[vol]["yearly"] = []
        for year in unique_years:
            annual_monthly_values = data[vol][column_name][data[vol]
                                                           [column_name].index.get_level_values(0) == year]

            chart_data[vol]["yearly"] += [{"x": calendar.month_abbr[month + 1],
                                           "y": val, "year": year, "name": column_name} for month, val in enumerate(annual_monthly_values)]

    return chart_data


def convert_dataframe_to_annual_json(data, rvols, column_name):
    chart_data = {
        "yearly": [],
        "average": [],
    }
    # loop through first five volumes
    for vol in range(0, 5):
        temp = json.loads(data[vol].to_json())[column_name]

        # calculate annual average
        chart_data["average"].append({
            "x": str(rvols[vol]),
            "y": round(data[vol][column_name].mean(), 2)
        })

        # annual records
        chart_data["yearly"] += [
            {"x": str(rvols[vol]), "y": record, "year": int(data[vol][column_name].index[index])} for index, record in enumerate(data[vol][column_name].values)]

    return chart_data


def main(input_file, param_file, unit_type):

    param, data_dic, data, data_user, daily_data, daily_data_user, annual_output, monthly_output = edwrd(
        input_file, param_file)

    # convert rvols from square meters to hectares
    rvols = (param["rvol"] * 0.0001)['rvol'].tolist()

    with pd.ExcelWriter(os.path.join(os.path.dirname(input_file), "daily_output.xlsx")) as writer:
        for key in daily_data:
            daily_data[key].to_excel(
                writer, sheet_name=f"Vol  {round(rvols[key], 2)}")

    with pd.ExcelWriter(os.path.join(os.path.dirname(input_file), "annual_output.xlsx")) as writer:
        for key in annual_output:
            annual_output[key].to_excel(
                writer, sheet_name=f"Vol {round(rvols[key], 2)}")

    with pd.ExcelWriter(os.path.join(os.path.dirname(input_file), "monthly_output.xlsx")) as writer:
        for key in monthly_output:
            monthly_output[key].to_excel(
                writer, sheet_name=f"Vol {round(rvols[key], 2)}")

    rvols = rvols[:5]
    json_output = {
        "data": {
            "annual": {
                "appliedIrrigation": convert_dataframe_to_annual_json(annual_output, rvols, "Applied Irrigation Depth"),
                "irrigationSupply": convert_dataframe_to_annual_json(annual_output, rvols, "Relative Irrigation Supply"),
                "nitrateLoadReduction": convert_dataframe_to_annual_json(annual_output, rvols, "Captured Nitrate Load (Tile)"),
                "nitrateLoadReductionPerc": convert_dataframe_to_annual_json(annual_output, rvols, "Nitrate Load Reduction (%)"),
                "srpLoadReduction": convert_dataframe_to_annual_json(annual_output, rvols, "Captured SRP Load (Tile)"),
                "srpLoadReductionPerc": convert_dataframe_to_annual_json(annual_output, rvols, "SRP Load Reduction (%)")
            },
            "monthly": {
                "precipitation": convert_dataframe_to_monthly_json(monthly_output, rvols, "Precipitation"),
                "cropTranspiration": convert_dataframe_to_monthly_json(monthly_output, rvols, "Actual Transpiration"),
                "evapotranspiration": convert_dataframe_to_monthly_json(monthly_output, rvols, "Actual Crop ET"),
                "soilEvaporation": convert_dataframe_to_monthly_json(monthly_output, rvols, "Soil Evaporation"),
                "upwardFlux": convert_dataframe_to_monthly_json(monthly_output, rvols, "Actual Upward Flux"),
                "runoff": convert_dataframe_to_monthly_json(monthly_output, rvols, "Runoff"),
                "potentialCropTranspiration": convert_dataframe_to_monthly_json(monthly_output, rvols, "Potential Transpiration"),
                "potentialEvapotranspiration": convert_dataframe_to_monthly_json(monthly_output, rvols, "Potential Crop ET"),
                "readilyAvailableWater": convert_dataframe_to_monthly_json(monthly_output, rvols, "Readily Available Water"),
                "irrigation": convert_dataframe_to_monthly_json(monthly_output, rvols, "Applied Irrigation Depth"),
                "tileDrainFlow": convert_dataframe_to_monthly_json(monthly_output, rvols, "Tile Drain Flow"),
                "soilMoisture": convert_dataframe_to_monthly_json(monthly_output, rvols, "Root Zone Soil Moisture"),
                "reservoirPrecipitation": convert_dataframe_to_monthly_json(monthly_output, rvols, "Precipitation to Reservoir"),
                "reservoirDrainFlow": convert_dataframe_to_monthly_json(monthly_output, rvols, "Tile Drain Flow to Reservoir"),
                "reservoirRunoff": convert_dataframe_to_monthly_json(monthly_output, rvols, "Runoff to Reservoir"),
                "irrigationWithdrawl": convert_dataframe_to_monthly_json(monthly_output, rvols, "Irrigation Withdrawal"),
                "seepage": convert_dataframe_to_monthly_json(monthly_output, rvols, "Reservoir Seepage"),
                "reservoirEvaporation": convert_dataframe_to_monthly_json(monthly_output, rvols, "Reservoir Evaporation"),
                "overflow": convert_dataframe_to_monthly_json(monthly_output, rvols, "Reservoir Overflow"),
                "capture": convert_dataframe_to_monthly_json(monthly_output, rvols, "Captured Tile Drain Flow"),
                "reservoirStoredVolume": convert_dataframe_to_monthly_json(monthly_output, rvols, "Reservoir Water Volume"),
                "reservoirWaterDepth": convert_dataframe_to_monthly_json(monthly_output, rvols, "Reservoir Water Depth"),
                "tileNitrateLoad": convert_dataframe_to_monthly_json(monthly_output, rvols, "Tile Drain Nitrate Load"),
                "tileSRPLoad": convert_dataframe_to_monthly_json(monthly_output, rvols, "Tile Drain SRP Load"),
                "overflowNitrateLoad": convert_dataframe_to_monthly_json(monthly_output, rvols, "Overflow Nitrate Load (Tile)"),
                "capturedNitrateLoad": convert_dataframe_to_monthly_json(monthly_output, rvols, "Captured Nitrate Load (Tile)"),
                "overflowSRPLoad": convert_dataframe_to_monthly_json(monthly_output, rvols, "Overflow SRP Load (Tile)"),
                "capturedSRPLoad": convert_dataframe_to_monthly_json(monthly_output, rvols, "Captured SRP Load (Tile)"),
            },
            "rvol": rvols,
            "rdep": param["rdep"].values[0][0],
            "unit_type": unit_type
        }
    }
    print(json.dumps(json_output))
    sys.stdout.flush()


if __name__ == "__main__":
    # Required arguments when script called from command line
    parser = argparse.ArgumentParser(description="Extract raster value")
    parser.add_argument("input_file", type=str,
                        help="Input file containing daily measurements.")
    parser.add_argument("param_file", type=str,
                        help="Parameter file containing parameters from web form.")
    parser.add_argument("unit_type", type=str,
                        help="Unit type (US or metric).")

    # Get passed in arguments
    args = parser.parse_args()
    input_file = args.input_file
    param_file = args.param_file
    unit_type = args.unit_type

    main(input_file, param_file, unit_type)
