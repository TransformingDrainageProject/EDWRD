# -*- coding: utf-8 -*-
"""
Copyright 2020, Benjamin Reinhart, Jane Frankenberger, Chris Hay, Benjamin Hancock

This file is part of Evaluating Drainage Water Recycling Decisions (EDWRD).

EDWRD is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

EDWRD is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with EDWRD.  If not, see <https://www.gnu.org/licenses/>.
"""

from seasons import *

def evap_calc(row,param,data,data_dic,fw_init,irr_init,zedepl_init):
    """Performs the water balance calculation within the evaporation layer, row by row within the dataframe, based on the appropriate 
    growing/non-growing season period. Requires the fraction of the soil surface wetted during precip/irrigation (fw_init) and irrigation 
    requirement and depletion in the evaporation layer at the end of the previous day (irr_init,zedepl_init)"""
    #CONDITION: IF THE CURRENT DAY IS OUTSIDE OF THE GROWING SEASON OR > 3 MM OF PRECIP THEN THE FRACTION OF THE SURFACE WETTED IS 1
    if (
         row.Index.dayofyear < param['cstart'].values[0][0] 
         or row.Index.dayofyear > param['cstage_doy'].values[3][0] 
         or data.at[row.Index,'prcp'] > 3
    ):
        data.at[row.Index,'fw'] = 1
    #CONDITION: ELSE IF IRRIGATION OCCURS SET BASED ON THE VALUE IN THE PARAMETER FILE
    elif data.at[row.Index,'rirr'] > 0:
        data.at[row.Index,'fw'] = param['fw'].values[0][0]
    
    #CONDITION: ELSE JUST CARRY FORWARD THE PREVIOUS DAY'S VALUE
    else: 
        data.at[row.Index,'fw'] = fw_init
    
    #CALCULATE THE EXPOSED SOIL SURFACE WHERE EVAPORATION TAKES PLACE BASED ON THE FRACTION OF VEGETATIVE COVER AND WETTED SURFACE
    data.at[row.Index,'few'] = min(1 - data.at[row.Index,'fc'],data.at[row.Index,'fw'])
    
    #--ERROR CHECK--#
    for column in data[['fw','few']]:
        if 0.0 > data.at[row.Index,column] > 1.0:
            raise ValueError('Daily calculated values for the ' + data_dic[column] + ' must be between 0 and 1.'
                             ' Error occurs at index value' + str(row.Index) + '. You can report this issue to developers at'
                             ' http://bit.ly/edwrd-issue')
    #--END OF ERROR CHECK--#
    
    #IDENTIFY THE PERIOD OF THE YEAR (GROWING SEASON, POST-HARVEST, WINTER, POST-FREEZE, PRE-PLANT) AND APPLY THE APPROPRIATE WATER BALANCE 
    #CALCULATIONS            

        #Condition: If the soil freeze date occurs before the end of the calendar year
    if param['ngrw_stage'].values[1][0] > param['ngrw_stage'].values[0][0] and param['ngrw_stage'].values[1][0] <= 365:

            #Condition: If the current day is greater than or equal to the harvest date AND less than the soil freeze date then apply
            #calculations for the post-harvest period
        if (row.Index.dayofyear >= param['ngrw_stage'].values[0][0] and row.Index.dayofyear < param['ngrw_stage'].values[1][0]):
            psthrvst_pstfrz_evap(row,param,data,data_dic,irr_init,zedepl_init)
        
            #Condition: Else if the current day is greater than OR equal to the soil freeze date OR less than the soil thaw date then
            #apply calculations for the winter period
        elif (row.Index.dayofyear >= param['ngrw_stage'].values[1][0] or row.Index.dayofyear < param['ngrw_stage'].values[2][0]):
            winter_evap(row,param,data,data_dic,irr_init,zedepl_init)
        
            #Condition: Else if the current day is greater than or equal to the soil thaw date AND less than 14 days prior to the planting date then
            #apply calculations for the post-freeze period
        elif (row.Index.dayofyear >= param['ngrw_stage'].values[2][0] and row.Index.dayofyear < (param['cstart'].values[0][0] - 14)):
            psthrvst_pstfrz_evap(row,param,data,data_dic,irr_init,zedepl_init)
        
            #Condition: Else the current day is within the preplant period or growing season where evaporation occurs normally
        else:
            evap(row,param,data,data_dic,irr_init,zedepl_init)

        #Condition: Else the soil freeze date occurs after the end of the calendar year
    else:
            #Condition: If the current day is greater than or equal to the harvest date OR less than the soil freeze date then apply
            #calculations for the post-harvest period
        if (row.Index.dayofyear >= param['ngrw_stage'].values[0][0] or row.Index.dayofyear < param['ngrw_stage'].values[1][0]):
            psthrvst_pstfrz_evap(row,param,data,data_dic,irr_init,zedepl_init)
        
            #Condition: Else if the current day is greater than or equal to the soil freeze date AND less than the soil thaw date then
            #apply calculations for the winter period
        elif (row.Index.dayofyear >= param['ngrw_stage'].values[1][0] and row.Index.dayofyear < param['ngrw_stage'].values[2][0]):
            winter_evap(row,param,data,data_dic,irr_init,zedepl_init)
        
            #Condition: Else if the current day is greater than or equal to the soil thaw date AND less than 14 days prior to the planting date then
            #apply calculations for the post-freeze period
        elif (row.Index.dayofyear >= param['ngrw_stage'].values[2][0] and row.Index.dayofyear < (param['cstart'].values[0][0] - 14)):
            psthrvst_pstfrz_evap(row,param,data,data_dic,irr_init,zedepl_init)
        
            #Condition: Else the current day is within the preplant period or growing season where evaporation occurs normally
        else:
            evap(row,param,data,data_dic,irr_init,zedepl_init)
