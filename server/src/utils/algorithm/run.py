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


def convert_dataframe_to_annual_json(data, rvols, column_name):
    chart_data = {
        "annual": [],
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
        chart_data["annual"] += [
            {"x": str(rvols[vol]), "y": record, "year": int(data[vol][column_name].index[index])} for index, record in enumerate(data[vol][column_name].values)]

    return chart_data


def main(input_file, param_file, unit_type):

    param, data_dic, data, data_user, daily_data, daily_data_user, annual_output, monthly_output = edwrd(
        input_file, param_file)

    with pd.ExcelWriter(os.path.join(os.path.dirname(input_file), "data.xlsx")) as writer:
        for key in daily_data:
            daily_data[key].to_excel(writer, sheet_name=f"Vol {key}")

    with pd.ExcelWriter(os.path.join(os.path.dirname(input_file), "annual_output.xlsx")) as writer:
        for key in annual_output:
            annual_output[key].to_excel(writer, sheet_name=f"Vol {key}")

    # convert rvols from square meters to hectares
    rvols = (param["rvol"] * 0.0001)['rvol'].tolist()[:5]

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
                # "appliedIrrigation": convert_dataframe_to_monthly_json(monthly_output, "Applied Irrigation Depth"),
                # "irrigationSupply": convert_dataframe_to_monthly_json(monthly_output, "Relative Irrigation Supply"),
                # "nitrateLoadReduction": convert_dataframe_to_monthly_json(monthly_output, "Nitrate Load Reduction (%)"),
                # "capturedTileDrainFlow": convert_dataframe_to_monthly_json(monthly_output, "Percent Captured Tile Drain Flow")
            },
            "rdep": param['rdep'].values[0][0],
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
