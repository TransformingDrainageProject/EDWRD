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
                         ' You can report this issue to developers at http://bit.ly/edwrd-issue')
    
    if data.at[row.Index,'ro'] < 0.0:
        raise ValueError('Daily calculated runoff values may not be negative. Error occurs at index value ' + 
                         str(row.Index) + '. Check your location file and input selections to ensure no negative values occur.'
                         ' If the problem persists, you can report this issue to developers at http://bit.ly/edwrd-issue')
    #--END OF ERROR CHECK--#
