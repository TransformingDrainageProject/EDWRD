# -*- coding: utf-8 -*-
"""
Created on Tue Sep 17 14:41:20 2019

@author: brein

Error checks are commented as #--ERROR CHECK--# // #--END OF ERROR CHECK--#
"""

def runoff_calc(row,param,data,zedepl_init):
    """Performs the daily runoff calculations (CN and RO), row by row within the dataframe. Requires the depletion in the evaporation layer
    at the end of the previous day (zedepl_init)"""
    #CONDITION: IF DEPLETION IN THE EVAPORATION LAYER IS <= 0.5*REW (ZEDEP3) THEN CN3
    if zedepl_init <= param['zedep3'].values[0][0]:
        data.at[row.Index,'cn'] = param['cn3'].values[0][0]
    
    #CONDITION: ELSE IF >= 0.7*REW + 0.3*TEW (ZEDEP1) THEN CN1
    elif zedepl_init >= param['zedep1'].values[0][0]:
        data.at[row.Index,'cn'] = param['cn1'].values[0][0]
    
    #CONDITION: ELSE INTERPOLATE BETWEEN CN1 AND CN3
    else:
        data.at[row.Index,'cn'] = (
                (zedepl_init - 0.5 * param['rew'].values[0][0]) * param['cn1'].values[0][0] + 
                (0.7 * param['rew'].values[0][0] + 0.3 * param['tew'].values[0][0] - zedepl_init) * param['cn3'].values[0][0]
                ) / (0.2 * param['rew'].values[0][0] + 0.3 * param['tew'].values[0][0])
    
    #CONDITION: IF PRECIP IS > WHAT CAN BE INTERCEPTED OR INFILTRATED (i.e. ABSTRACTION) THEN RUNOFF OCCURS
    abstraction = (250 * (100 / data.at[row.Index,'cn'] - 1))
    if data.at[row.Index,'prcp'] > 0.2 * abstraction:
        data.at[row.Index,'ro'] = (data.at[row.Index,'prcp'] - 0.2 * abstraction) ** 2 / (data.at[row.Index,'prcp'] + 0.8 * abstraction)
    else:
        data.at[row.Index,'ro'] = 0
    
    #--ERROR CHECK--#
    if param['cn1'].values[0][0] > data.at[row.Index,'cn'] > param['cn3'].values[0][0]:
        raise ValueError('Daily calculated curve number values should be between values representing dry and wet'
                         ' soil conditions. Error occurs at index value ' + str(row.Index) + '.' 
                         ' You can report this issue to developers at [INSERT URL HERE]')
    
    if data.at[row.Index,'ro'] < 0.0:
        raise ValueError('Daily calculated runoff values may not be negative. Error occurs at index value ' + 
                         str(row.Index) + '. Check your location file and input selections to ensure no negative values occur.'
                         ' If the problem persists, you can report this issue to developers at [INSERT URL HERE]')
    #--END OF ERROR CHECK--#