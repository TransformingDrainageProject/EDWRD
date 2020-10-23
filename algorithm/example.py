# -*- coding: utf-8 -*-
"""
Created on Tue Sep 17 14:56:57 2019

@author: brein
"""
import os
import pandas as pd
from main import edwrd


infile = os.path.join("example_datasets", "dpac_in_input.txt")
pfile = os.path.join("example_datasets", "dpac_in_param.txt")

param, output_dic, daily_data, daily_data_user, annual_output, monthly_output = edwrd(
    infile, pfile)

rarea = (param["rarea"] * 0.0001)["rarea"].tolist()

# convert output_dic dictionary to pandas dataframe for easy writing to spreadsheet
output_df = pd.DataFrame.from_dict(output_dic, orient="index")

# create spreadsheets for daily, monthly, and annual output
daily_filepath = "daily_output.xlsx"
with pd.ExcelWriter(daily_filepath) as writer:
    for key in daily_data_user:
        daily_data_user[key].to_excel(
            writer, sheet_name=f"Reservoir Area  {round(rarea[key], 1)}")
    output_df.to_excel(writer, header=[
        "Description"], index_label="Output", sheet_name=f"Output descriptions")

monthly_filepath = "monthly_output.xlsx"
with pd.ExcelWriter(monthly_filepath) as writer:
    for key in monthly_output:
        monthly_output[key].to_excel(
            writer, sheet_name=f"Reservoir Area {round(rarea[key], 1)}")
    output_df.to_excel(writer, header=[
        "Description"], index_label="Output", sheet_name=f"Output descriptions")

annual_filepath = "annual_output.xlsx"
with pd.ExcelWriter(annual_filepath) as writer:
    for key in annual_output:
        annual_output[key].to_excel(
            writer, sheet_name=f"Reservoir Area {round(rarea[key], 1)}")
    output_df.to_excel(writer, header=[
        "Description"], index_label="Output", sheet_name=f"Output descriptions")
