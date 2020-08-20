import argparse
import calendar
import json
import os
import sys

import numpy as np
import pandas as pd

from main import edwrd

conversion_factors = {
    "Inches": 0.0393701,
    "Feet": 3.28084,
    "Gallons": 264.172,
    "Pounds per acre": 0.892179
}


def convert_dataframe_to_monthly_json(data, rvols, column_name, unit):
    chart_data = {
        0: {},
        1: {},
        2: {},
        3: {},
        4: {},
    }

    conversion_factor = 1.0
    if unit in conversion_factors.keys():
        conversion_factor = conversion_factors[unit]

    # loop through first five volumes
    for vol in range(0, 5):
        chart_data[vol]["average"] = []
        chart_data[vol]["yearly"] = []

        grouped_by_month = data[vol][column_name].groupby(level=1)

        monthly_means = grouped_by_month.aggregate(np.mean).values

        for month in range(0, len(monthly_means)):
            chart_data[vol]["average"].append({
                "x": calendar.month_abbr[month + 1],
                "y": monthly_means[month] * conversion_factor
            })

        # annual records
        unique_years = data[vol][column_name].index.get_level_values(
            0).unique()
        chart_data[vol]["yearly"] = []
        for year in unique_years:
            annual_monthly_values = data[vol][column_name][data[vol]
                                                           [column_name].index.get_level_values(0) == year]

            chart_data[vol]["yearly"] += [{"x": calendar.month_abbr[month + 1],
                                           "y": val * conversion_factor, "year": year, "name": column_name} for month, val in enumerate(annual_monthly_values)]

    return chart_data


def convert_dataframe_to_annual_json(data, rvols, column_name, unit):
    chart_data = {
        "yearly": [],
        "average": [],
        "unit": unit
    }

    conversion_factor = 1.0
    frac_to_perc = 1.0

    if column_name == "Relative Irrigation Supply":
        frac_to_perc = 100.0

    if unit in conversion_factors.keys():
        conversion_factor = conversion_factors[unit]

    # loop through first five volumes
    for vol in range(0, 5):
        temp = json.loads(data[vol].to_json())[column_name]
        # calculate annual average
        chart_data["average"].append({
            "x": str(round(rvols[vol], 2)),
            "y": round(data[vol][column_name].mean() * conversion_factor * frac_to_perc, 2)
        })
        # annual records
        chart_data["yearly"] += [
            {"x": str(round(rvols[vol], 2)), "y": record * conversion_factor * frac_to_perc, "year": int(data[vol][column_name].index[index])} for index, record in enumerate(data[vol][column_name].values)]

    return chart_data


def main(input_file, param_file, unit_type):

    param, data_dic, data, data_user, daily_data, daily_data_user, annual_output, monthly_output = edwrd(
        input_file, param_file)

    # convert rvols from square meters to hectares
    if unit_type == "us":
        rvols = (param["rvol"] * 0.000247105)["rvol"].tolist()
        rdep = param["rdep"].values[0][0] * 3.28084
    else:
        rvols = (param["rvol"] * 0.0001)["rvol"].tolist()
        rdep = param["rdep"].values[0][0]

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

    mm_to_in = "mm"
    m_to_ft = "m"
    m3_to_gal = "m3"
    kgha_to_lbac = "kg/ha"

    if unit_type == "us":
        mm_to_in = "in"
        m_to_ft = "ft"
        m3_to_gal = "gal"
        kgha_to_lbac = "lbs/ac"

    rvols = rvols[:5]
    json_output = {
        "data": {
            "annual": {
                "appliedIrrigation": convert_dataframe_to_annual_json(annual_output, rvols, "Applied Irrigation Depth", mm_to_in),
                "irrigationSupply": convert_dataframe_to_annual_json(annual_output, rvols, "Relative Irrigation Supply", "%"),
                "nitrateLoadReduction": convert_dataframe_to_annual_json(annual_output, rvols, "Captured Nitrate Load (Tile)", kgha_to_lbac),
                "nitrateLoadReductionPerc": convert_dataframe_to_annual_json(annual_output, rvols, "Nitrate Load Reduction (%)", "%"),
                "srpLoadReduction": convert_dataframe_to_annual_json(annual_output, rvols, "Captured SRP Load (Tile)", kgha_to_lbac),
                "srpLoadReductionPerc": convert_dataframe_to_annual_json(annual_output, rvols, "SRP Load Reduction (%)", "%")
            },
            "monthly": {
                "precipitation": convert_dataframe_to_monthly_json(monthly_output, rvols, "Precipitation", mm_to_in),
                "cropTranspiration": convert_dataframe_to_monthly_json(monthly_output, rvols, "Actual Transpiration", mm_to_in),
                "evapotranspiration": convert_dataframe_to_monthly_json(monthly_output, rvols, "Actual Crop ET", mm_to_in),
                "soilEvaporation": convert_dataframe_to_monthly_json(monthly_output, rvols, "Soil Evaporation", mm_to_in),
                "upwardFlux": convert_dataframe_to_monthly_json(monthly_output, rvols, "Actual Upward Flux", mm_to_in),
                "runoff": convert_dataframe_to_monthly_json(monthly_output, rvols, "Runoff", mm_to_in),
                "potentialCropTranspiration": convert_dataframe_to_monthly_json(monthly_output, rvols, "Potential Transpiration", mm_to_in),
                "potentialEvapotranspiration": convert_dataframe_to_monthly_json(monthly_output, rvols, "Potential Crop ET", mm_to_in),
                "readilyAvailableWater": convert_dataframe_to_monthly_json(monthly_output, rvols, "Readily Available Water", mm_to_in),
                "irrigation": convert_dataframe_to_monthly_json(monthly_output, rvols, "Applied Irrigation Depth", mm_to_in),
                "tileDrainFlow": convert_dataframe_to_monthly_json(monthly_output, rvols, "Tile Drain Flow", mm_to_in),
                "soilMoisture": convert_dataframe_to_monthly_json(monthly_output, rvols, "Root Zone Soil Moisture", mm_to_in),
                "reservoirPrecipitation": convert_dataframe_to_monthly_json(monthly_output, rvols, "Precipitation to Reservoir", m3_to_gal),
                "reservoirDrainFlow": convert_dataframe_to_monthly_json(monthly_output, rvols, "Tile Drain Flow to Reservoir", m3_to_gal),
                "reservoirRunoff": convert_dataframe_to_monthly_json(monthly_output, rvols, "Runoff to Reservoir", m3_to_gal),
                "irrigationWithdrawl": convert_dataframe_to_monthly_json(monthly_output, rvols, "Irrigation Withdrawal", m3_to_gal),
                "seepage": convert_dataframe_to_monthly_json(monthly_output, rvols, "Reservoir Seepage", m3_to_gal),
                "reservoirEvaporation": convert_dataframe_to_monthly_json(monthly_output, rvols, "Reservoir Evaporation", m3_to_gal),
                "overflow": convert_dataframe_to_monthly_json(monthly_output, rvols, "Reservoir Overflow", m3_to_gal),
                "capture": convert_dataframe_to_monthly_json(monthly_output, rvols, "Captured Tile Drain Flow", m3_to_gal),
                "reservoirStoredVolume": convert_dataframe_to_monthly_json(monthly_output, rvols, "Reservoir Water Volume", m3_to_gal),
                "reservoirWaterDepth": convert_dataframe_to_monthly_json(monthly_output, rvols, "Reservoir Water Depth", m_to_ft),
                "tileNitrateLoad": convert_dataframe_to_monthly_json(monthly_output, rvols, "Tile Drain Nitrate Load", kgha_to_lbac),
                "tileSRPLoad": convert_dataframe_to_monthly_json(monthly_output, rvols, "Tile Drain SRP Load", kgha_to_lbac),
                "overflowNitrateLoad": convert_dataframe_to_monthly_json(monthly_output, rvols, "Overflow Nitrate Load (Tile)", kgha_to_lbac),
                "capturedNitrateLoad": convert_dataframe_to_monthly_json(monthly_output, rvols, "Captured Nitrate Load (Tile)", kgha_to_lbac),
                "overflowSRPLoad": convert_dataframe_to_monthly_json(monthly_output, rvols, "Overflow SRP Load (Tile)", kgha_to_lbac),
                "capturedSRPLoad": convert_dataframe_to_monthly_json(monthly_output, rvols, "Captured SRP Load (Tile)", kgha_to_lbac),
            },
            "rvol": rvols,
            "rdep": round(rdep, 2),
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
