import argparse
import json
import os
import sys

import numpy as np
import pandas as pd

from main import edwrd


def convert_dataframe_to_monthly_json(data, column_name):
    chart_data = {
        0: {},
        1: {},
        2: {},
        3: {},
        4: {}
    }

    # loop through first five volumes
    for vol in range(0, 5):
        grouped_by_month = data[vol][column_name].groupby(level=1)
        perc10 = grouped_by_month.quantile(0.1)
        perc90 = grouped_by_month.quantile(0.9)

        monthly_means = grouped_by_month.aggregate(np.mean).values

        chart_data[vol]["average"] = []
        chart_data[vol]["area"] = []
        chart_data[vol]["outliers"] = []

        for month in range(0, len(monthly_means)):
            chart_data[vol]["average"].append({
                "x": str(month + 1),
                "y": monthly_means[month]
            })

            chart_data[vol]["area"].append({
                "x": str(month + 1),
                "y": perc10.values[month],
                "y0": perc90.values[month]
            })

    return chart_data


def convert_dataframe_to_annual_json(data, column_name):
    chart_data = {
        "area": [],
        "average": [],
        "outlier": [],
    }
    # loop through first five volumes
    for vol in range(0, 5):
        temp = json.loads(data[vol].to_json())[column_name]
        perc10 = data[vol][column_name].quantile(0.1)
        perc90 = data[vol][column_name].quantile(0.9)

        # calculate annual average
        chart_data["average"].append({
            "x": str(vol),
            "y": round(data[vol][column_name].mean(), 2)
        })

        # calculate area range 10th - 90th percentile
        chart_data["area"].append({
            "x": str(vol),
            "y": perc10,
            "y0": perc90
        })

        # calculate outliers < 10th percentile > 90th percentile
        for key in temp.keys():
            if round(temp[key], 2) < round(perc10, 2) or round(temp[key], 2) > round(perc90, 2):
                chart_data["outlier"].append({
                    "x": str(vol),
                    "y": round(temp[key], 2),
                    "year": key
                })

    return chart_data


def main(input_file, param_file):

    param, data_dic, data, data_user, daily_data, daily_data_user, annual_output, monthly_output = edwrd(
        input_file, param_file)

    with pd.ExcelWriter(os.path.join(os.path.dirname(input_file), "data.xlsx")) as writer:
        for key in daily_data:
            daily_data[key].to_excel(writer, sheet_name=f"Vol {key}")

    with pd.ExcelWriter(os.path.join(os.path.dirname(input_file), "annual_output.xlsx")) as writer:
        for key in annual_output:
            annual_output[key].to_excel(writer, sheet_name=f"Vol {key}")

    json_output = {
        "data": {
            "annual": {
                "appliedIrrigation": convert_dataframe_to_annual_json(annual_output, "Applied Irrigation Depth"),
                "irrigationSupply": convert_dataframe_to_annual_json(annual_output, "Relative Irrigation Supply"),
                "nitrateLoadReduction": convert_dataframe_to_annual_json(annual_output, "Nitrate Load Reduction (%)"),
                "capturedTileDrainFlow": convert_dataframe_to_annual_json(annual_output, "Percent Captured Tile Drain Flow")
            },
            "monthly": {
                "appliedIrrigation": convert_dataframe_to_monthly_json(monthly_output, "Applied Irrigation Depth"),
                # "irrigationSupply": convert_dataframe_to_monthly_json(monthly_output, "Relative Irrigation Supply"),
                # "nitrateLoadReduction": convert_dataframe_to_monthly_json(monthly_output, "Nitrate Load Reduction (%)"),
                # "capturedTileDrainFlow": convert_dataframe_to_monthly_json(monthly_output, "Percent Captured Tile Drain Flow")
            }
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

    # Get passed in arguments
    args = parser.parse_args()
    input_file = args.input_file
    param_file = args.param_file

    main(input_file, param_file)
