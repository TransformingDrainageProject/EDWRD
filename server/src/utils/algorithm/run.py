import argparse
import calendar
import json
import os
import sys

import numpy as np
import pandas as pd

from client_output import get_annual_data, get_monthly_data
from create_summary_sheet import create_summary_sheet
from main import edwrd


def main(input_file, param_file, unit_type, convert_input, convert_param, summary_overview):

    param, output_dic, daily_data, daily_data_user, annual_output, monthly_output = edwrd(
        input_file, param_file, convert_input, convert_param)

    # convert rarea from sqm to acre and hectare, rdep from meter to ft
    if unit_type == "us":
        rvol = (param["rvol"] * 264.172)["rvol"].tolist()
        rarea = (param["rarea"] * 0.000247105)["rarea"].tolist()
        rdep = param["rdep"].values[0][0] * 3.28084
    else:
        rvol = (param["rvol"] * 1.0)["rvol"].tolist()
        rarea = (param["rarea"] * 0.0001)["rarea"].tolist()
        rdep = param["rdep"].values[0][0]

    # convert output_dic dictionary to pandas dataframe for easy writing to spreadsheet
    output_df = pd.DataFrame.from_dict(output_dic, orient="index")

    # create spreadsheets for daily, monthly, and annual output
    daily_filepath = os.path.join(
        os.path.dirname(input_file), "daily_output.xlsx")
    with pd.ExcelWriter(daily_filepath) as writer:
        for key in daily_data_user:
            daily_data_user[key].to_excel(
                writer, sheet_name=f"Reservoir Area  {round(rarea[key], 1)}")
        output_df.to_excel(writer, header=[
                           "Description"], index_label="Output", sheet_name=f"Output descriptions")
    # write summary data to sheet
    create_summary_sheet(
        daily_filepath, summary_overview, unit_type)

    monthly_filepath = os.path.join(
        os.path.dirname(input_file), "monthly_output.xlsx")
    with pd.ExcelWriter(monthly_filepath) as writer:
        for key in monthly_output:
            monthly_output[key].to_excel(
                writer, sheet_name=f"Reservoir Area {round(rarea[key], 1)}")
        output_df.to_excel(writer, header=[
                           "Description"], index_label="Output", sheet_name=f"Output descriptions")
    # write summary data to sheet
    create_summary_sheet(
        monthly_filepath, summary_overview, unit_type)

    annual_filepath = os.path.join(
        os.path.dirname(input_file), "annual_output.xlsx")
    with pd.ExcelWriter(annual_filepath) as writer:
        for key in annual_output:
            annual_output[key].to_excel(
                writer, sheet_name=f"Reservoir Area {round(rarea[key], 1)}")
        output_df.to_excel(writer, header=[
                           "Description"], index_label="Output", sheet_name=f"Output descriptions")
    # write summary data to sheet
    create_summary_sheet(
        annual_filepath, summary_overview, unit_type)

    # only use first five items
    rvol = rvol[:5]
    rarea = rarea[:5]

    json_output = {
        "data": {
            "annual": get_annual_data(annual_output, rarea, unit_type),
            "monthly": get_monthly_data(monthly_output, rarea, unit_type),
            "rarea": rarea,
            "rvol": rvol,
            "rdep": rdep,
            "unitType": unit_type
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
    parser.add_argument("convert_input", type=int,
                        help="Input file values need to be converted to metric.")
    parser.add_argument("convert_param", type=int,
                        help="Param file values need to be converted to metric.")
    parser.add_argument("summary_overview", type=str,
                        help="Summary overview of form inputs.")

    # Get passed in arguments
    args = parser.parse_args()
    input_file = args.input_file
    param_file = args.param_file
    unit_type = args.unit_type
    convert_input = args.convert_input
    convert_param = args.convert_param
    print(json.dumps({"msg": args.summary_overview}))
    summary_overview = json.loads(args.summary_overview)
    print(json.dumps({"msg": str(type(summary_overview))}))

    main(input_file, param_file, unit_type,
         convert_input, convert_param, summary_overview)
