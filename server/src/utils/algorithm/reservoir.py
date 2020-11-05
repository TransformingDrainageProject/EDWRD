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

def reservoir_calc(row,param,data,data_dic,irr_init,rvol_init,rmax,rarea):
    """Performs the daily reservoir water balance, row by row within the dataframe. Requires the irrigation requirement and reservoir volume 
    at the end of the previous day (irr_init,rvol_init) and reservoir dimensions (rmax,rarea)"""
    #CONVERT IRRIGATION REQUIREMENT INTO A VOLUME
    data.at[row.Index,'rirr'] = irr_init / 1000 * param['iarea'].values[0][0]

    #DETERMINE IF RUNOFF SHOULD BE INCLUDED IN RESERVOIR WATER BALANCE
    if param['dareaIncSurfaceRunoff'].bool() == True:
        data.at[row.Index,'rro'] = data.at[row.Index,'ro'] / 1000 * param['darea'].values[0][0]
    else:
        data.at[row.Index,'rro'] = 0

    #CALCULATE RESERVOIR WATER BALANCE
    data.at[row.Index,'rvol'] = max(rvol_init + data.at[row.Index,'rprcp'] + data.at[row.Index,'rdflw'] + data.at[row.Index,'rro'] - data.at[row.Index,'rirr'] - data.at[row.Index,'rseep'] - data.at[row.Index,'revap'],0)
    
    #CONDITION: IF THE RESERVOIR VOLUME EXCEEDS IT'S CAPACITY THE OVERFLOW OCCURS AND RESERVOIR VOLUME IS SET TO IT'S MAX CAPACITY
    if data.at[row.Index,'rvol'] > rmax:
        data.at[row.Index,'rovr'] = data.at[row.Index,'rvol'] - rmax
        data.at[row.Index,'rvol'] = rmax
    else:
        data.at[row.Index,'rovr'] = 0
    
    #RESERVOIR DEPTH AND AMOUNT OF DRAIN FLOW CAPTURED IS CALCULATED
    data.at[row.Index,'rdep'] = data.at[row.Index,'rvol'] / rarea
    data.at[row.Index,'rcap'] = min(data.at[row.Index,'rdflw'],rmax - data.at[row.Index,'rvol'])
    
    #--ERROR CHECK--#
    for column in data[['rirr','rvol','rovr','rdep','rcap']]:
        if data.at[row.Index,column] < 0.0:
            raise ValueError(data_dic[column] + ' cannot contain negative values. Error occurs at index value ' + 
                         str(row.Index) + '. Check your location file and input selections to ensure no negative values occur.'
                         'If the problem persists, you can report this issue to developers at [INSERT URL HERE]')
    
    if data.at[row.Index,'rcap'] > data.at[row.Index,'rdflw']:
        raise ValueError(data_dic['rcap'] + ' cannot be greater than the amount of tile drain flow entering the'
                         ' reservoir. Error occurs at index value' + str(row.Index) + '. You can report this issue to'
                         ' developers at [INSERT URL HERE]')
    #--END OF ERROR CHECK--#
    
def wq_calc(row,param,data,data_dic,load_conv):
    """Calculates the amount of nutrients (load) that is captured by, or overflows from, the reservoir based on the quantity of water tracked
    within the reservoir water balance. Requires a value to convert nutrient concentration to load (load_conv)"""
    data.at[row.Index,'no3l_cap'] = data.at[row.Index,'rcap'] * data.at[row.Index,'no3c'] * load_conv
    data.at[row.Index,'no3l_ovr'] = data.at[row.Index,'rovr'] * data.at[row.Index,'no3c'] * load_conv
    data.at[row.Index,'srpl_cap'] = data.at[row.Index,'rcap'] * data.at[row.Index,'srpc'] * load_conv
    data.at[row.Index,'srpl_ovr'] = data.at[row.Index,'rovr'] * data.at[row.Index,'srpc'] * load_conv
    
    #--ERROR CHECK--#
    for column in data[['no3l_cap','no3l_ovr','srpl_cap','srpl_ovr']]:
        if data.at[row.Index,column] < 0.0:
            raise ValueError(data_dic[column] + ' cannot contain negative values. Error occurs at index value ' + 
                         str(row.Index) + '. Check your location file and input selections to ensure no negative values occur.'
                         ' If the problem persists, you can report this issue to developers at [INSERT URL HERE]') 
    #--END OF ERROR CHECK--#
