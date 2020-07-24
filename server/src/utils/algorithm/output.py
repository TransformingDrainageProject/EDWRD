# -*- coding: utf-8 -*-
"""
Created on Tue Sep 17 14:52:53 2019

@author: brein
"""

import pandas as pd
import numpy as np


def annual_output_calc(param,data,vol,dic):
    """Aggregates and summarizes output on an annual basis for each variable from a range of reservoir volumes (vol). Writes this output to an Excel file."""
    #CREATE AN EMPTY DATAFRAME FOR THE OUTPUT
    output=pd.DataFrame()
    
    #ANNUAL PRECIP
    output['Precipitation']=data[vol]['Precipitation'].groupby(data[vol].index.year).sum()

    #ANNUAL APPLIED IRRIGATION
    output['Applied Irrigation Depth']=data[vol]['Applied Irrigation Depth'].groupby(data[vol].index.year).sum()

    #ANNUAL UPWARD FLUX
    output['Actual Upward Flux']=data[vol]['Actual Upward Flux'].groupby(data[vol].index.year).sum()

    #ANNUAL RUNOFF
    output['Runoff']=data[vol]['Runoff'].groupby(data[vol].index.year).sum()

    #ANNUAL SOIL EVAPORATION
    output['Soil Evaporation']=data[vol]['Soil Evaporation'].groupby(data[vol].index.year).sum()

    #ANNUAL POTENTIAL (NOT WATER-LIMITED) TRANSPIRATION
    output['Potential Transpiration']=data[vol]['Potential Transpiration'].groupby(data[vol].index.year).sum()

    #ANNUAL ACTUAL TRANSPIRATION
    output['Actual Transpiration']=data[vol]['Actual Transpiration'].groupby(data[vol].index.year).sum()

    #ANNUAL SEASON POTENTIAL (NOT WATER-LIMITED) ET
    output['Potential Crop ET']=data[vol]['Potential Crop ET'].groupby(data[vol].index.year).sum()

    #ANNUAL SEASON ADJUSTED ET
    output['Actual Crop ET']=data[vol]['Actual Crop ET'].groupby(data[vol].index.year).sum()

    #ANNUAL DRAIN FLOW
    output['Tile Drain Flow']=data[vol]['Tile Drain Flow'].groupby(data[vol].index.year).sum()

    #ANNUAL PRECIPATION INTO THE RESERVOIR
    output['Precipitation to Reservoir']=data[vol]['Precipitation to Reservoir'].groupby(data[vol].index.year).sum()

    #ANNUAL DRAIN FLOW INTO THE RESERVOIR
    output['Tile Drain Flow to Reservoir']=data[vol]['Tile Drain Flow to Reservoir'].groupby(data[vol].index.year).sum()

    #ANNUAL RUNOFF INTO THE RESERVOIR
    output['Runoff to Reservoir']=data[vol]['Runoff to Reservoir'].groupby(data[vol].index.year).sum()

    #ANNUAL IRRIGATION WITHDRAWAL FROM THE RESERVOIR
    output['Irrigation Withdrawal']=data[vol]['Irrigation Withdrawal'].groupby(data[vol].index.year).sum()

    #ANNUAL SEEPAGE LOSSES FROM THE RESERVOIR
    output['Reservoir Seepage']=data[vol]['Reservoir Seepage'].groupby(data[vol].index.year).sum()

    #ANNUAL EVAPORATION FROM THE RESERVOIR SURFACE
    output['Reservoir Evaporation']=data[vol]['Reservoir Evaporation'].groupby(data[vol].index.year).sum()
    
    #ANNUAL OVERFLOW FROM THE RESERVOIR
    rovr=data[vol]['Reservoir Overflow'] / param['darea'].values[0][0] * 1000
    output['Reservoir Overflow']=rovr.groupby(rovr.index.year).sum()

    #ANNUAL CAPTURED DRAIN FLOW BY THE RESERVOIR
    rcap=data[vol]['Captured Tile Drain Flow'] / param['darea'].values[0][0] * 1000
    output['Captured Tile Drain Flow']=rcap.groupby(rcap.index.year).sum()

    #ANNUAL PERCENT CAPTURED TILE DRAIN FLOW
    output['Percent Captured Tile Drain Flow'] = output['Captured Tile Drain Flow'] / output['Tile Drain Flow'] * 100

    #ANNUAL NITRATE LOAD
    output['Tile Drain Nitrate Load']=data[vol]['Tile Drain Nitrate Load'].groupby(data[vol].index.year).sum()

    #ANNUAL NITRATE LOAD THAT OVERFLOWED THE RESERVOIR
    output['Overflow Nitrate Load (Tile)']=data[vol]['Overflow Nitrate Load (Tile)'].groupby(data[vol].index.year).sum()
    
    #ANNUAL NITRATE LOAD CAPTURED BY THE RESERVOIR
    output['Captured Nitrate Load (Tile)']=data[vol]['Captured Nitrate Load (Tile)'].groupby(data[vol].index.year).sum()

    #ANNUAL PERCENT NITRATE LOAD REDUCTION
    output['Nitrate Load Reduction (%)'] =  output['Captured Nitrate Load (Tile)'] / output['Tile Drain Nitrate Load'] * 100

    #ANNUAL SOLUBLE REACTIVE PHOSPHORUS LOAD
    output['Tile Drain SRP Load']=data[vol]['Tile Drain SRP Load'].groupby(data[vol].index.year).sum()

    #ANNUAL SOLUBLE REACTIVE PHOSPHORUS LOAD THAT OVERFLOWED THE RESERVOIR
    output['Overflow SRP Load (Tile)']=data[vol]['Overflow SRP Load (Tile)'].groupby(data[vol].index.year).sum()
    
    #ANNUAL SOLUBLE REACTIVE PHOSPHORUS LOAD CAPTURED BY THE RESERVOIR
    output['Captured SRP Load (Tile)']=data[vol]['Captured SRP Load (Tile)'].groupby(data[vol].index.year).sum()

    #ANNUAL PERCENT SOLUBLE REACTIVE PHOSPHORUS LOAD REDUCTION
    output['SRP Load Reduction (%)'] =  output['Captured SRP Load (Tile)'] / output['Tile Drain SRP Load'] * 100

    #ANNUAL IRRIGATION REQUIREMENT BASED ON THE IRRIGATION PROVIDED WHEN WATER IS NOT LIMITED
    output['Irrigation Demand']=data[len(param['rvol'])-1]['Applied Irrigation Depth'].groupby(data[len(param['rvol'])-1].index.year).sum()
    
    #ANNUAL RELATIVE IRRIGATION SUFFICIENCY
    for i in list(output['Irrigation Demand'].index.get_level_values(0)):
        if output.loc[i, 'Irrigation Demand'] == 0.0:
            output.loc[i, 'Relative Irrigation Supply'] = 1.0
        else:
            output.loc[i, 'Relative Irrigation Supply'] = output.loc[i, 'Applied Irrigation Depth'] / output.loc[i, 'Irrigation Demand']

    #Annual NUMBER OF DAYS OF DEFICIT WATER STRESS FOR THE CROP
    output['Days of Deficit Water Stress']=data[vol]['Water Stress Coefficient'].where(data[vol]['Water Stress Coefficient'] < 1.0).groupby(data[vol].index.year).count()

    #COPY ALL OUTPUT FROM A PARTICULAR RESERVOIR VOLUME TO A DICTIONARY AND WRITE TO AN EXCEL SHEET
    dic[vol]=output.copy()

def monthly_output_calc(param,data,vol,dic):
    """Aggregates and summarizes output on an annual basis for each variable from a range of reservoir volumes (vol). Writes this output to an Excel file."""
    #CREATE AN EMPTY DATAFRAME FOR THE OUTPUT
    output=pd.DataFrame()
    
    #MONTHLY PRECIP
    output['Precipitation']=data[vol]['Precipitation'].groupby([(data[vol].index.year), (data[vol].index.month)]).sum()

    #MONTHLY APPLIED IRRIGATION
    output['Applied Irrigation Depth']=data[vol]['Applied Irrigation Depth'].groupby([(data[vol].index.year), (data[vol].index.month)]).sum()

    #MONTHLY UPWARD FLUX
    output['Actual Upward Flux']=data[vol]['Actual Upward Flux'].groupby([(data[vol].index.year), (data[vol].index.month)]).sum()

    #MONTHLY RUNOFF
    output['Runoff']=data[vol]['Runoff'].groupby([(data[vol].index.year), (data[vol].index.month)]).sum()

    #MONTHLY SOIL EVAPORATION
    output['Soil Evaporation']=data[vol]['Soil Evaporation'].groupby([(data[vol].index.year), (data[vol].index.month)]).sum()

    #MONTHLY POTENTIAL (NOT WATER-LIMITED) TRANSPIRATION
    output['Potential Transpiration']=data[vol]['Potential Transpiration'].groupby([(data[vol].index.year), (data[vol].index.month)]).sum()

    #MONTHLY ACTUAL TRANSPIRATION
    output['Actual Transpiration']=data[vol]['Actual Transpiration'].groupby([(data[vol].index.year), (data[vol].index.month)]).sum()

    #MONTHLY SEASON POTENTIAL (NOT WATER-LIMITED) ET
    output['Potential Crop ET']=data[vol]['Potential Crop ET'].groupby([(data[vol].index.year), (data[vol].index.month)]).sum()

    #MONTHLY SEASON ADJUSTED ET
    output['Actual Crop ET']=data[vol]['Actual Crop ET'].groupby([(data[vol].index.year), (data[vol].index.month)]).sum()

    #MONTHLY DRAIN FLOW
    output['Tile Drain Flow']=data[vol]['Tile Drain Flow'].groupby([(data[vol].index.year), (data[vol].index.month)]).sum()

    #MONTHLY AVERAGE SOIL MOISTURE
    output['Root Zone Soil Moisture'] = data[vol]['Root Zone Soil Moisture'].groupby([(data[vol].index.year), (data[vol].index.month)]).mean()

    #MONTHLY AVERAGE READILY AVAILABLE WATER
    output['Readily Available Water'] = data[vol]['Readily Available Water'].groupby([(data[vol].index.year), (data[vol].index.month)]).mean()

    #MONTHLY PRECIPATION INTO THE RESERVOIR
    output['Precipitation to Reservoir']=data[vol]['Precipitation to Reservoir'].groupby([(data[vol].index.year), (data[vol].index.month)]).sum()

    #MONTHLY DRAIN FLOW INTO THE RESERVOIR
    output['Tile Drain Flow to Reservoir']=data[vol]['Tile Drain Flow to Reservoir'].groupby([(data[vol].index.year), (data[vol].index.month)]).sum()

    #MONTHLY RUNOFF INTO THE RESERVOIR
    output['Runoff to Reservoir']=data[vol]['Runoff to Reservoir'].groupby([(data[vol].index.year), (data[vol].index.month)]).sum()

    #MONTHLY IRRIGATION WITHDRAWAL FROM THE RESERVOIR
    output['Irrigation Withdrawal']=data[vol]['Irrigation Withdrawal'].groupby([(data[vol].index.year), (data[vol].index.month)]).sum()

    #MONTHLY SEEPAGE LOSSES FROM THE RESERVOIR
    output['Reservoir Seepage']=data[vol]['Reservoir Seepage'].groupby([(data[vol].index.year), (data[vol].index.month)]).sum()

    #MONTHLY EVAPORATION FROM THE RESERVOIR SURFACE
    output['Reservoir Evaporation']=data[vol]['Reservoir Evaporation'].groupby([(data[vol].index.year), (data[vol].index.month)]).sum()

    #MONTHLY AVERAGE RESERVOIR VOLUME
    output['Reservoir Water Volume'] = data[vol]['Reservoir Water Volume'].groupby([(data[vol].index.year), (data[vol].index.month)]).mean()

    #MONTHLY AVERAGE RESERVOIR DEPTH
    output['Reservoir Water Depth'] = data[vol]['Reservoir Water Depth'].groupby([(data[vol].index.year), (data[vol].index.month)]).mean()
    
    #MONTHLY OVERFLOW FROM THE RESERVOIR
    rovr=data[vol]['Reservoir Overflow'] / param['darea'].values[0][0] * 1000
    output['Reservoir Overflow']=rovr.groupby([(data[vol].index.year), (data[vol].index.month)]).sum()

    #MONTHLY CAPTURED DRAIN FLOW BY THE RESERVOIR
    rcap=data[vol]['Captured Tile Drain Flow'] / param['darea'].values[0][0] * 1000
    output['Captured Tile Drain Flow']=rcap.groupby([(data[vol].index.year), (data[vol].index.month)]).sum()

    #MONTHLY PERCENT CAPTURED TILE DRAIN FLOW
    output['Percent Captured Tile Drain Flow'] = output['Captured Tile Drain Flow'] / output['Tile Drain Flow'] * 100

    #MONTHLY NITRATE LOAD
    output['Tile Drain Nitrate Load']=data[vol]['Tile Drain Nitrate Load'].groupby([(data[vol].index.year), (data[vol].index.month)]).sum()

    #MONTHLY NITRATE LOAD THAT OVERFLOWED THE RESERVOIR
    output['Overflow Nitrate Load (Tile)']=data[vol]['Overflow Nitrate Load (Tile)'].groupby([(data[vol].index.year), (data[vol].index.month)]).sum()
    
    #MONTHLY NITRATE LOAD CAPTURED BY THE RESERVOIR
    output['Captured Nitrate Load (Tile)']=data[vol]['Captured Nitrate Load (Tile)'].groupby([(data[vol].index.year), (data[vol].index.month)]).sum()

    #MONTHLY PERCENT NITRATE LOAD REDUCTION
    output['Nitrate Load Reduction (%)'] =  output['Captured Nitrate Load (Tile)'] / output['Tile Drain Nitrate Load'] * 100

    #MONTHLY SOLUBLE REACTIVE PHOSPHORUS LOAD
    output['Tile Drain SRP Load']=data[vol]['Tile Drain SRP Load'].groupby([(data[vol].index.year), (data[vol].index.month)]).sum()

    #MONTHLY SOLUBLE REACTIVE PHOSPHORUS LOAD THAT OVERFLOWED THE RESERVOIR
    output['Overflow SRP Load (Tile)']=data[vol]['Overflow SRP Load (Tile)'].groupby([(data[vol].index.year), (data[vol].index.month)]).sum()
    
    #MONTHLY SOLUBLE REACTIVE PHOSPHORUS LOAD CAPTURED BY THE RESERVOIR
    output['Captured SRP Load (Tile)']=data[vol]['Captured SRP Load (Tile)'].groupby([(data[vol].index.year), (data[vol].index.month)]).sum()

    #MONTHLY PERCENT SOLUBLE REACTIVE PHOSPHORUS LOAD REDUCTION
    output['SRP Load Reduction (%)'] =  output['Captured SRP Load (Tile)'] / output['Tile Drain SRP Load'] * 100

    #MONTHLY IRRIGATION REQUIREMENT BASED ON THE IRRIGATION PROVIDED WHEN WATER IS NOT LIMITED
    output['Irrigation Demand']=data[len(param['rvol'])-1]['Applied Irrigation Depth'].groupby([(data[len(param['rvol'])-1].index.year), (data[len(param['rvol'])-1].index.month)]).sum()
    
    #MONTHLY RELATIVE IRRIGATION SUFFICIENCY
    for y in list(output['Irrigation Demand'].index.get_level_values(0).unique()):
        for m in list(output['Irrigation Demand'].index.get_level_values(1).unique()):
            if output.loc[(y,m),'Irrigation Demand'] == 0.0:
                output.loc[(y,m),'Relative Irrigation Supply'] = 1.0
            else:
                output.loc[(y,m),'Relative Irrigation Supply'] = output.loc[(y,m),'Applied Irrigation Depth'] /output.loc[(y,m),'Irrigation Demand']

    #MONTHLY NUMBER OF DAYS OF DEFICIT WATER STRESS FOR THE CROP
    output['Days of Deficit Water Stress']=data[vol]['Water Stress Coefficient'].where(data[vol]['Water Stress Coefficient'] < 1.0).groupby([(data[vol]['Water Stress Coefficient'].index.year), (data[vol]['Water Stress Coefficient'].index.month)]).count()

    #COPY ALL OUTPUT FROM A PARTICULAR RESERVOIR VOLUME TO A DICTIONARY AND WRITE TO AN EXCEL SHEET
    dic[vol]=output.copy()
