# -*- coding: utf-8 -*-
"""
Created on Tue Sep 17 14:52:53 2019

@author: brein
"""

import pandas as pd
import numpy as np


def annual_output_calc(param, daily_data, vol, results_dic):
    """Aggregates and summarizes output on an annual basis for each variable from a range of reservoir volumes (vol). Writes this output to an Excel file."""
    # CREATE AN EMPTY DATAFRAME FOR THE OUTPUT
    output = pd.DataFrame()

    # ANNUAL PRECIP
    output['Precipitation'] = daily_data[vol]['Precipitation'].groupby(
        daily_data[vol].index.year).sum()

    # ANNUAL APPLIED IRRIGATION
    output['Applied Irrigation'] = daily_data[vol]['Applied Irrigation'].groupby(
        daily_data[vol].index.year).sum()

    # ANNUAL UPWARD FLUX
    output['Upward Flux'] = daily_data[vol]['Upward Flux'].groupby(
        daily_data[vol].index.year).sum()

    # ANNUAL DRAIN FLOW
    output['Tile Drain Flow'] = daily_data[vol]['Tile Drain Flow'].groupby(
        daily_data[vol].index.year).sum()

    # ANNUAL RUNOFF
    output['Surface Runoff'] = daily_data[vol]['Surface Runoff'].groupby(
        daily_data[vol].index.year).sum()

    # ANNUAL DOWNWARD FLUX
    output['Downward Flux'] = daily_data[vol]['Downward Flux'].groupby(
        daily_data[vol].index.year).sum()

    # ANNUAL SEASON POTENTIAL (NOT WATER-LIMITED) ET
    output['Potential Crop ET'] = daily_data[vol]['Potential Crop ET'].groupby(
        daily_data[vol].index.year).sum()

    # ANNUAL SEASON ADJUSTED ET
    output['Evapotranspiration'] = daily_data[vol]['Evapotranspiration'].groupby(
        daily_data[vol].index.year).sum()

    # ANNUAL SOIL EVAPORATION
    output['Soil Evaporation'] = daily_data[vol]['Soil Evaporation'].groupby(
        daily_data[vol].index.year).sum()

    # ANNUAL ACTUAL TRANSPIRATION
    output['Transpiration'] = daily_data[vol]['Transpiration'].groupby(
        daily_data[vol].index.year).sum()

    # AVERAGE ANNUAL AVAILABLE SOIL WATER
    output['Available Soil Water'] = daily_data[vol]['Available Soil Water'].groupby(
        daily_data[vol].index.year).mean()

    # AVERAGE ANNUAL SOIL WATER DEPLETION
    output['Soil Water Depletion'] = daily_data[vol]['Soil Water Depletion'].groupby(
        daily_data[vol].index.year).mean()

    # AVERAGE ANNUAL READILY AVAILABLE WATER THRESHOLD
    output['Readily Available Water Threshold'] = daily_data[vol]['Readily Available Water Threshold'].groupby(
        daily_data[vol].index.year).mean()

    # AVERAGE ANNUAL WATER STRESS COEFFICIENT
    output['Water Stress Coefficient'] = daily_data[vol]['Water Stress Coefficient'].groupby(
        daily_data[vol].index.year).mean()

    # ANNUAL IRRIGATION REQUIREMENT BASED ON THE IRRIGATION PROVIDED WHEN WATER IS NOT LIMITED
    output['Irrigation Demand'] = daily_data[len(
        param['rvol'])-1]['Applied Irrigation'].groupby(daily_data[len(param['rvol'])-1].index.year).sum()

    # AVERAGE ANNUAL RESERVOIR DEPTH
    output['Reservoir Water Depth'] = daily_data[vol]['Reservoir Water Depth'].groupby(
        daily_data[vol].index.year).mean()

    # AVERAGE ANNUAL RESERVOIR VOLUME
    output['Reservoir Water Volume'] = daily_data[vol]['Reservoir Water Volume'].groupby(
        daily_data[vol].index.year).mean()

    # ANNUAL PRECIPATION INTO THE RESERVOIR
    output['Reservoir Precipitation'] = daily_data[vol]['Reservoir Precipitation'].groupby(
        daily_data[vol].index.year).sum()

    # ANNUAL DRAIN FLOW INTO THE RESERVOIR
    output['Reservoir Drain Flow'] = daily_data[vol]['Reservoir Drain Flow'].groupby(
        daily_data[vol].index.year).sum()

    # ANNUAL RUNOFF INTO THE RESERVOIR
    output['Reservoir Runoff'] = daily_data[vol]['Reservoir Runoff'].groupby(
        daily_data[vol].index.year).sum()

    # ANNUAL SEEPAGE LOSSES FROM THE RESERVOIR
    output['Reservoir Seepage'] = daily_data[vol]['Reservoir Seepage'].groupby(
        daily_data[vol].index.year).sum()

    # ANNUAL EVAPORATION FROM THE RESERVOIR SURFACE
    output['Reservoir Evaporation'] = daily_data[vol]['Reservoir Evaporation'].groupby(
        daily_data[vol].index.year).sum()

    # ANNUAL IRRIGATION WITHDRAWAL FROM THE RESERVOIR
    output['Irrigation Withdrawal'] = daily_data[vol]['Irrigation Withdrawal'].groupby(
        daily_data[vol].index.year).sum()

    # ANNUAL OVERFLOW FROM THE RESERVOIR
    rovr = daily_data[vol]['Reservoir Overflow'] / param['darea'].values[0][0] * 1000
    output['Reservoir Overflow'] = rovr.groupby(rovr.index.year).sum()

    # ANNUAL RELATIVE IRRIGATION SUFFICIENCY
    for i in list(output['Irrigation Demand'].index.get_level_values(0)):
        if output.loc[i, 'Irrigation Demand'] == 0.0:
            output.loc[i, 'Relative Irrigation Supply'] = 1.0
        else:
            output.loc[i, 'Relative Irrigation Supply'] = output.loc[i,
                                                                     'Applied Irrigation'] / output.loc[i, 'Irrigation Demand']

    # Annual NUMBER OF DAYS OF DEFICIT WATER STRESS FOR THE CROP
    output['Days of Deficit Water Stress'] = daily_data[vol]['Water Stress Coefficient'].where(
        daily_data[vol]['Water Stress Coefficient'] < 1.0).groupby(daily_data[vol].index.year).count()

    # ANNUAL CAPTURED DRAIN FLOW BY THE RESERVOIR
    rcap = daily_data[vol]['Captured Drain Flow'] / \
        param['darea'].values[0][0] * 1000
    output['Captured Drain Flow'] = rcap.groupby(rcap.index.year).sum()

    # ANNUAL PERCENT CAPTURED TILE DRAIN FLOW
    output['Captured Drain Flow (%)'] = output['Captured Drain Flow'] / \
        output['Tile Drain Flow'] * 100

    # ANNUAL NITRATE LOAD
    output['Tile Nitrate Load'] = daily_data[vol]['Tile Nitrate Load'].groupby(
        daily_data[vol].index.year).sum() / (param['darea'].values[0][0] / 10000)

    # ANNUAL NITRATE LOAD THAT OVERFLOWED THE RESERVOIR
    output['Overflow Nitrate Load (Tile)'] = daily_data[vol]['Overflow Nitrate Load (Tile)'].groupby(
        daily_data[vol].index.year).sum() / (param['darea'].values[0][0] / 10000)

    # ANNUAL NITRATE LOAD CAPTURED BY THE RESERVOIR
    output['Captured Nitrate Load (Tile)'] = daily_data[vol]['Captured Nitrate Load (Tile)'].groupby(
        daily_data[vol].index.year).sum() / (param['darea'].values[0][0] / 10000)

    # ANNUAL PERCENT NITRATE LOAD REDUCTION
    output['Captured Tile Nitrate Load (%)'] = output['Captured Nitrate Load (Tile)'] / \
        output['Tile Nitrate Load'] * 100

    # ANNUAL SOLUBLE REACTIVE PHOSPHORUS LOAD
    output['Tile SRP Load'] = daily_data[vol]['Tile SRP Load'].groupby(
        daily_data[vol].index.year).sum() / (param['darea'].values[0][0] / 10000)

    # ANNUAL SOLUBLE REACTIVE PHOSPHORUS LOAD THAT OVERFLOWED THE RESERVOIR
    output['Overflow SRP Load (Tile)'] = daily_data[vol]['Overflow SRP Load (Tile)'].groupby(
        daily_data[vol].index.year).sum() / (param['darea'].values[0][0] / 10000)

    # ANNUAL SOLUBLE REACTIVE PHOSPHORUS LOAD CAPTURED BY THE RESERVOIR
    output['Captured SRP Load (Tile)'] = daily_data[vol]['Captured SRP Load (Tile)'].groupby(
        daily_data[vol].index.year).sum() / (param['darea'].values[0][0] / 10000)

    # ANNUAL PERCENT SOLUBLE REACTIVE PHOSPHORUS LOAD REDUCTION
    output['Captured Tile SRP Load (%)'] = output['Captured SRP Load (Tile)'] / \
        output['Tile SRP Load'] * 100

    # COPY ALL OUTPUT FROM A PARTICULAR RESERVOIR VOLUME TO A DICTIONARY AND WRITE TO AN EXCEL SHEET
    results_dic[vol] = output.copy()


def monthly_output_calc(param, daily_data, vol, results_dic):
    """Aggregates and summarizes output on an annual basis for each variable from a range of reservoir volumes (vol). Writes this output to an Excel file."""
    # CREATE AN EMPTY DATAFRAME FOR THE OUTPUT
    output = pd.DataFrame()

    # MONTHLY PRECIP
    output['Precipitation'] = daily_data[vol]['Precipitation'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum()

    # MONTHLY APPLIED IRRIGATION
    output['Applied Irrigation'] = daily_data[vol]['Applied Irrigation'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum()

    # MONTHLY UPWARD FLUX
    output['Upward Flux'] = daily_data[vol]['Upward Flux'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum()

    # MONTHLY DRAIN FLOW
    output['Tile Drain Flow'] = daily_data[vol]['Tile Drain Flow'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum()

    # MONTHLY RUNOFF
    output['Surface Runoff'] = daily_data[vol]['Surface Runoff'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum()

    # MONTHLY DOWNWARD FLUX
    output['Downward Flux'] = daily_data[vol]['Downward Flux'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum()

    # MONTHLY SEASON POTENTIAL (NOT WATER-LIMITED) ET
    output['Potential Crop ET'] = daily_data[vol]['Potential Crop ET'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum()

    # MONTHLY SEASON ADJUSTED ET
    output['Evapotranspiration'] = daily_data[vol]['Evapotranspiration'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum()

    # MONTHLY SOIL EVAPORATION
    output['Soil Evaporation'] = daily_data[vol]['Soil Evaporation'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum()

    # MONTHLY ACTUAL TRANSPIRATION
    output['Transpiration'] = daily_data[vol]['Transpiration'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum()

    # AVERAGE MONTHLY SOIL MOISTURE
    output['Available Soil Water'] = daily_data[vol]['Available Soil Water'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).mean()

    # AVERAGE MONTHLY SOIL WATER DEPLETION
    output['Soil Water Depletion'] = daily_data[vol]['Soil Water Depletion'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).mean()

    # AVERAGE MONTHLY READILY AVAILABLE WATER
    output['Readily Available Water Threshold'] = daily_data[vol]['Readily Available Water Threshold'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).mean()

    # AVERAGE MONTHLY WATER STRESS COEFFICIENT
    output['Water Stress Coefficient'] = daily_data[vol]['Water Stress Coefficient'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).mean()

    # MONTHLY IRRIGATION REQUIREMENT BASED ON THE IRRIGATION PROVIDED WHEN WATER IS NOT LIMITED
    output['Irrigation Demand'] = daily_data[len(param['rvol'])-1]['Applied Irrigation'].groupby(
        [(daily_data[len(param['rvol'])-1].index.year), (daily_data[len(param['rvol'])-1].index.month)]).sum()

    # MONTHLY AVERAGE RESERVOIR DEPTH
    output['Reservoir Water Depth'] = daily_data[vol]['Reservoir Water Depth'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).mean()

    # MONTHLY AVERAGE RESERVOIR VOLUME
    output['Reservoir Water Volume'] = daily_data[vol]['Reservoir Water Volume'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).mean()

    # MONTHLY PRECIPATION INTO THE RESERVOIR
    output['Reservoir Precipitation'] = daily_data[vol]['Reservoir Precipitation'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum()

    # MONTHLY DRAIN FLOW INTO THE RESERVOIR
    output['Reservoir Drain Flow'] = daily_data[vol]['Reservoir Drain Flow'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum()

    # MONTHLY RUNOFF INTO THE RESERVOIR
    output['Reservoir Runoff'] = daily_data[vol]['Reservoir Runoff'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum()

    # MONTHLY SEEPAGE LOSSES FROM THE RESERVOIR
    output['Reservoir Seepage'] = daily_data[vol]['Reservoir Seepage'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum()

    # MONTHLY EVAPORATION FROM THE RESERVOIR SURFACE
    output['Reservoir Evaporation'] = daily_data[vol]['Reservoir Evaporation'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum()

    # MONTHLY IRRIGATION WITHDRAWAL FROM THE RESERVOIR
    output['Irrigation Withdrawal'] = daily_data[vol]['Irrigation Withdrawal'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum()

    # MONTHLY OVERFLOW FROM THE RESERVOIR
    output['Reservoir Overflow'] = daily_data[vol]['Reservoir Overflow'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum()

    # MONTHLY RELATIVE IRRIGATION SUFFICIENCY
    for y in list(output['Irrigation Demand'].index.get_level_values(0).unique()):
        for m in list(output['Irrigation Demand'].index.get_level_values(1).unique()):
            if output.loc[(y, m), 'Irrigation Demand'] == 0.0:
                output.loc[(y, m), 'Relative Irrigation Supply'] = 1.0
            else:
                output.loc[(y, m), 'Relative Irrigation Supply'] = output.loc[(
                    y, m), 'Applied Irrigation'] / output.loc[(y, m), 'Irrigation Demand']

    # MONTHLY NUMBER OF DAYS OF DEFICIT WATER STRESS FOR THE CROP
    output['Days of Deficit Water Stress'] = daily_data[vol]['Water Stress Coefficient'].where(daily_data[vol]['Water Stress Coefficient'] < 1.0).groupby(
        [(daily_data[vol]['Water Stress Coefficient'].index.year), (daily_data[vol]['Water Stress Coefficient'].index.month)]).count()

    # MONTHLY CAPTURED DRAIN FLOW BY THE RESERVOIR
    output['Captured Drain Flow'] = daily_data[vol]['Captured Drain Flow'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum()

    # MONTHLY PERCENT CAPTURED TILE DRAIN FLOW
    output['Captured Drain Flow (%)'] = output['Captured Drain Flow'] / \
        output['Reservoir Drain Flow'] * 100

    # MONTHLY NITRATE LOAD
    output['Tile Nitrate Load'] = daily_data[vol]['Tile Nitrate Load'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum() / (param['darea'].values[0][0] / 10000)

    # MONTHLY NITRATE LOAD THAT OVERFLOWED THE RESERVOIR
    output['Overflow Nitrate Load (Tile)'] = daily_data[vol]['Overflow Nitrate Load (Tile)'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum() / (param['darea'].values[0][0] / 10000)

    # MONTHLY NITRATE LOAD CAPTURED BY THE RESERVOIR
    output['Captured Nitrate Load (Tile)'] = daily_data[vol]['Captured Nitrate Load (Tile)'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum() / (param['darea'].values[0][0] / 10000)

    # MONTHLY PERCENT NITRATE LOAD REDUCTION
    output['Captured Tile Nitrate Load (%)'] = output['Captured Nitrate Load (Tile)'] / \
        output['Tile Nitrate Load'] * 100

    # MONTHLY SOLUBLE REACTIVE PHOSPHORUS LOAD
    output['Tile SRP Load'] = daily_data[vol]['Tile SRP Load'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum() / (param['darea'].values[0][0] / 10000)

    # MONTHLY SOLUBLE REACTIVE PHOSPHORUS LOAD THAT OVERFLOWED THE RESERVOIR
    output['Overflow SRP Load (Tile)'] = daily_data[vol]['Overflow SRP Load (Tile)'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum() / (param['darea'].values[0][0] / 10000)

    # MONTHLY SOLUBLE REACTIVE PHOSPHORUS LOAD CAPTURED BY THE RESERVOIR
    output['Captured SRP Load (Tile)'] = daily_data[vol]['Captured SRP Load (Tile)'].groupby(
        [(daily_data[vol].index.year), (daily_data[vol].index.month)]).sum() / (param['darea'].values[0][0] / 10000)

    # MONTHLY PERCENT SOLUBLE REACTIVE PHOSPHORUS LOAD REDUCTION
    output['Captured Tile SRP Load (%)'] = output['Captured SRP Load (Tile)'] / \
        output['Tile SRP Load'] * 100

    # COPY ALL OUTPUT FROM A PARTICULAR RESERVOIR VOLUME TO A DICTIONARY AND WRITE TO AN EXCEL SHEET
    results_dic[vol] = output.copy()
