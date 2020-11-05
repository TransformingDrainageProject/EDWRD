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

import json
import pandas as pd
import numpy as np
import warnings

from convert import convert_input_to_metric, convert_param_to_metric


class EDWRD_Output_Warning(UserWarning):
    pass


def edwrd_input(infile, pfile, convert_input, convert_param):
    """Reads in the input and parameter files. Prepares the main pandas dataframe that will be used to track variables and
    calculated values"""
    print(json.dumps({'msg': 'Preparing inputs...'}))
    # Attempt to detect which delimiter was used (default to tab)
    sep = '\t'
    with open(infile) as f:
        header_row = f.readline()
        if len(header_row.split(',')) == 10:
            sep = r'\,'

    # READ INPUT FILE AS PANDAS DATAFRAME
    data = pd.read_csv(infile, sep=sep, header=0, engine='python')

    #--ERROR CHECK--#
    if 1 > data['month'].any() > 12:
        raise ValueError('Month values must be an integer between 1 and 12')
    if 1 > data['day'].any() > 31:
        raise ValueError('Day values must be an integer between 1 and 31')
    #--END OF ERROR CHECK--#

    # PARSE DATES, AND SET DATES AS INDEX
    data = pd.read_csv(infile, sep=sep, header=0, parse_dates={
                       'date': [0, 1, 2]}, index_col=0)

    # REINDEX PANDAS DATAFRAME TO INCLUDE ALL VARIABLES TO BE CALCULATED
    data = data.reindex(columns=data.columns.tolist() + [
        'wind', 'rhmin', 'cht', 'kcb', 'kcb_max', 'fc', 'few',
        'zedepl', 'zeperc', 'cn', 'ro', 'kr', 'ke', 'evap', 'etc',
        'p', 'raw', 'zrdepl', 'zrperc', 'ks', 'etc_a', 'upflx',
        'rdep', 'rvol', 'rprcp', 'rdflw', 'zrsm', 'rirr', 'rro',
        'rovr', 'rcap', 'no3l', 'srpl', 'no3l_ovr', 'no3l_cap',
        'srpl_ovr', 'srpl_cap',
        'irr', 'kc', 'kc_a', 'trans', 'trans_a', 'fw',
        'rseep', 'revap'
    ])
    # CREATE A DICTIONARY OF CALCULATED VARIABLE NAMES TO PROVIDE DESCRIPTIVE NAMES IN ERROR REPORTING
    data_dic = {'prcp': 'Precipitation', 'irr': 'Applied Irrigation', 'upflx': 'Upward Flux', 'dflw': 'Tile Drain Flow',
                'ro': 'Surface Runoff', 'zrperc': 'Downward Flux', 'etc': 'Potential Crop ET', 'etc_a': 'Evapotranspiration', 'evap': 'Soil Evaporation',
                'trans_a': 'Transpiration', 'zrsm': 'Available Soil Water', 'zrdepl': 'Soil Water Depletion', 'raw': 'Readily Available Water Threshold',
                'ks': 'Water Stress Coefficient', 'rdep': 'Reservoir Water Depth', 'rvol': 'Reservoir Water Volume', 'rprcp': 'Reservoir Precipitation',
                'rdflw': 'Reservoir Drain Flow', 'rro': 'Reservoir Runoff', 'rseep': 'Reservoir Seepage', 'revap': 'Reservoir Evaporation',
                'rirr': 'Irrigation Withdrawal', 'rovr': 'Reservoir Overflow', 'rcap': 'Captured Drain Flow', 'no3l': 'Tile Nitrate Load',
                'no3l_ovr': 'Overflow Nitrate Load (Tile)', 'no3l_cap': 'Captured Nitrate Load (Tile)', 'srpl': 'Tile SRP Load',
                'srpl_ovr': 'Overflow SRP Load (Tile)', 'srpl_cap': 'Captured SRP Load (Tile)',

                'max_upflx': 'Potential Upward Flux', 'water_evap': 'Open Water Evaporation', 'eto': 'Reference ET', 'no3c': 'Tile Nitrate Concentration',
                'srpc': 'Tile SRP Concentration', 'wind': 'Monthly Avg. Wind Speed', 'rhmin': 'Monthly Avg. Min. Relative Humidity', 'cht': 'Crop Height',
                'kcb': 'Basal Crop Coefficient', 'kcb_max': 'Maximum Potential Crop Coefficient', 'fc': 'Fraction of Vegetative Cover',
                'few': 'Exposed, Wetted Soil Surface Fraction', 'zedepl': 'Evaporation Layer Depletion', 'zeperc': 'Evaporation Layer Excess Drainage',
                'cn': 'Curve Number', 'kr': 'Evaporation Reduction Coefficient', 'ke': 'Evaporation Coefficient', 'p': 'Soil Water Depletion Factor',
                'kc': 'Potential Crop Coefficient', 'kc_a': 'Actual Crop Coefficient', 'trans': 'Potential Transpiration', 'fw': 'Wetted Soil Surface Fraction'
                }

    # CREATE A DICTIONARY OF VARIABLE NAMES TO PROVIDE DESCRIPTIVE NAMES IN OUTPUT EXCEL SHEETS
    output_dic = {'Precipitation': 'The daily, monthly, or annual amount of precipitation (millimeters or inches)',
                  'Applied Irrigation': 'The daily, monthly, or annual amount of irrigation applied to the irrigated field area (millimeters or inches)',
                  'Upward Flux': 'The daily, monthly, or annual amount of water contributed to the soil water balance through an upward flux of water from a shallow water table (millimeters or inches)',
                  'Tile Drain Flow': 'The daily, monthly, or annual amount of tile drain flow (millimeters or inches)',
                  'Surface Runoff': 'The daily, monthly, or annual amount of surface runoff from the soil surface (millimeters or inches)',
                  'Downward Flux': 'The daily, monthly, or annual amount of deep percolation or excess drainage from the soil profile. This is estimated as any excess soil water above the total available water following runoff (millimeters or inches)',
                  'Potential Crop ET': 'The daily, monthly, or annual potential crop evapotranspiration (millimeters or inches)',
                  'Evapotranspiration': 'The daily, monthly, or annual crop evapotranspiration, adjusted for any deficit water stress (millimeters or inches)',
                  'Soil Evaporation': 'The daily, monthly, or annual amount of water evaporation from the soil surface (millimeters or inches)',
                  'Transpiration': 'The daily, monthly, or annual amount of water transpired by the crop, adjusted for any deficit water stress (millimeters or inches)',
                  'Available Soil Water': 'The daily, average monthly, or average annual estimated available soil water based on the difference between total available water and soil water depletion (millimeters or inches)',
                  'Soil Water Depletion': 'The daily, average monthly, or average annual amount of soil water depletion from the total available water in the soil profile (millimeters or inches)',
                  'Readily Available Water Threshold': 'The daily, average monthly, or average annual amount of total available water within the soil profile that can be readily used by the crop without any deficit water stress occurring. This value is calculated as the product of the water depletion fraction (default value = 0.55) and total available water (millimeters or inches)',
                  'Water Stress Coefficient': 'The daily, average monthly, or average annual  crop water stress coefficient, defined by the proportional relationship between soil water depletion and the readily available water threshold, which determines the amount of reduction in crop transpiration when deficit water conditions occur (unitless)',
                  'Irrigation Demand': 'The daily, monthly, or annual amount of irrigation demand based on the amount of irrigation that would be applied given an unlimited water supply (millimeters or inches)',
                  'Reservoir Water Depth': 'The daily, average monthly, or average annual depth of the water in the reservoir (meters or feet)',
                  'Reservoir Water Volume': 'The daily volume, average monthly, or average annual volume of water in the reservoir (cubic meters or acre-inches)',
                  'Reservoir Precipitation': 'The daily, monthly, or annual volume of water flowing to the reservoir from precipitation (cubic meters or acre-inches)',
                  'Reservoir Drain Flow': 'The daily, monthly, or annual volume of water flowing to the reservoir from tile drain flow (cubic meters or acre-inches)',
                  'Reservoir Runoff': 'The daily, monthly, or annual volume of water flowing to the reservoir from surface runoff (cubic meters or acre-inches)',
                  'Reservoir Seepage': 'The daily, monthly, or annual volume of water lost from the reservoir through seepage (cubic meters or acre-inches)',
                  'Reservoir Evaporation': 'The daily, monthly, or annual volume of water lost from the reservoir through evaporation (cubic meters or acre-inches)',
                  'Irrigation Withdrawal': 'The daily, monthly, or annual volume of water withdrawn from the reservoir for irrigation (cubic meters or acre-inches)',
                  'Reservoir Overflow': 'The daily, monthly, or annual volume of water exceeding the maximum storage capacity of the reservoir (cubic meters or acre-inches)',
                  'Relative Irrigation Supply': 'The monthly or annual proportion of irrigation demand that can be met by a give reservoir size (unitless)',
                  'Days of Deficit Water Stress': 'The monthly or annual number of days where the water stress coefficient is less than 1 (days)',
                  'Captured Drain Flow': 'The daily, monthly, or annual volume of tile drainage captured by the reservoir (cubic meters or acre-inches)',
                  'Captured Drain Flow (%)': 'The percent of the monthly or annual drain flow that is captured by the reservoir (percent)',
                  'Tile Nitrate Load': 'The daily, monthly, or annual nitrate load represented in the tile drain flow (kilograms/hectare or pounds/acre)',
                  'Overflow Nitrate Load (Tile)': 'The daily, monthly, or annual nitrate load represented in the tile drain flow exceeding the maximum storage capacity of the reservoir  (kilograms/hectare or pounds/acre)',
                  'Captured Nitrate Load (Tile)': 'The daily, monthly, or annual nitrate load represented in the tile drain flow captured by the reservoir (kilograms/hectare or pounds/acre)',
                  'Captured Tile Nitrate Load (%)': 'The percent of the monthly or annual tile nitrate load that is captured by the reservoir (percent)',
                  'Tile SRP Load': 'The daily, monthly, or annual soluble reactive phosphorus load represented in the tile drain flow (kilograms/hectare or pounds/acre)',
                  'Overflow SRP Load (Tile)': 'The daily, monthly, or annual soluble reactive phosphorus load represented in the tile drain flow exceeding the maximum storage capacity of the reservoir (kilograms/hectare or pounds/acre)',
                  'Captured SRP Load (Tile)': 'The daily, monthly, or annual soluble reactive phosphorus load represented in the tile drain flow captured by the reservoir (kilograms/hectare or pounds/acre)',
                  'Captured Tile SRP Load (%)': 'The percent of the monthly or annual tile SRP load that is captured by the reservoir (percent)'
                  }

    #--ERROR CHECK--#
    for column in data[['prcp', 'dflw', 'max_upflx', 'water_evap', 'eto', 'no3c', 'srpc']].columns:
        if data[column].any() < 0.0:
            raise ValueError(data_dic[column] + ' cannot contain negative values. Check your location and input files to ensure no negative values occur.'
                             ' If the problem persists, you can report this issue to developers at http://bit.ly/edwrd-issue')
    #--END OF ERROR CHECK--#

    # convert input to metric if necessary
    if convert_input == 1:
        data = convert_input_to_metric(data)

    print(json.dumps({'msg': 'Preparing parameters...'}))
    # CREATE DICTIONARY OF INPUT PARAMETERS
    param = {
        'darea': 0, 'iarea': 1,
        'rarea': 2, 'rdep': 3, 'rdep_min': 4, 'rseep': 5,
        'zr': 6, 'zrfc': 7, 'zrwp': 8,
        'ze': 9, 'zefc': 10, 'zewp': 11, 'rew': 12, 'cn': 13,
        'wind': 14, 'rhmin': 15,
        'cstart': 16, 'cstage': 17, 'ngrw_stage': 18,
        'cht': 19, 'kc': 20,
        'fw': 21, 'pfact': 22, 'irrdep': 23, 'irrdep_min': 24, 'resd': 25,
        'dareaIncSurfaceRunoff': 26
    }

    # Attempt to detect which delimiter was used (default to tab)
    sep = '\t'
    with open(pfile) as f:
        header_row = f.readline()
        if (len(header_row.split(',')) == len(param.keys())):
            sep = r'\,'

    for i in param:
        param[i] = pd.read_csv(pfile, sep=sep, header=0,
                               usecols=[param[i]], engine='python').dropna()

    if convert_param == 1:
        param = convert_param_to_metric(param)

    # CONVERT FIELD AND RESERVOIR AREAS TO SQUARE METERS
    param['darea'] = param['darea'] * 10000
    param['iarea'] = param['iarea'] * 10000
    param['rarea'] = param['rarea'] * 10000

    # CHECK IF IRRDEP_MIN IS EMPTY, IF SO THEN SET TO ZERO
    if param['irrdep_min'].empty:
        param['irrdep_min'] = pd.DataFrame(
            np.array([0]), columns=param['irrdep_min'].columns)

    # ADD SECONDARY PARAMETERS TO THE DICTIONARY WHICH ARE CALCULATED FROM INITIAL PARAMETERS
        # Reservoir volume
    param['rvol'] = pd.DataFrame(param['rarea'] * param['rdep'].at[0, 'rdep'])
    param['rvol'].columns = ['rvol']

    # Add smaller and larger reservoirs to compare against user specific reservoir size
    r_vols = [(param['rvol'].at[0, 'rvol']*1.5), (param['rvol'].at[0, 'rvol']*2.0),
              (param['rvol'].at[0, 'rvol']*0.5), (param['rvol'].at[0, 'rvol']*0.1)]

    for i in r_vols:
        param['rvol'] = param['rvol'].append({'rvol': i}, ignore_index=True)

    # sort all reservoir volumes in ascending order
    param['rvol'].sort_values(by=['rvol'], inplace=True)
    param['rvol'] = param['rvol'].reset_index(drop=True)  # reset index

    # recalculate reservoir areas, including for smaller and larger reservoir volumes
    param['rarea'] = param['rvol'] / param['rdep'].at[0, 'rdep']
    param['rarea'] = param['rarea'].rename(columns={'rvol': 'rarea'})

    #     #Add an extremely large reservoir volume (10,000,000 m3, ~8,100 ac-ft) to the end in order to estimate the irrigation that would be applied when water is not limited (used for calculating ARIS)
    #     #Add a matching reservoir area.
    param['rvol'].at[len(param['rvol']), 'rvol'] = 10000000
    param['rarea'].at[len(param['rarea']),
                      'rarea'] = param['rarea'].at[0, 'rarea']

    # Total evaporable water in the evaporation layer, limited during the non-growing season when surface residue is present
    param['tew'] = pd.DataFrame([1000 * (param['zefc'].at[0, 'zefc'] - (
        0.5 * param['zewp'].at[0, 'zewp'])) * param['ze'].at[0, 'ze']], columns=['tew'])
    param['nongr_tew'] = pd.DataFrame([np.maximum(param['tew'].at[0, 'tew'] - (param['tew'].at[0, 'tew'] * (
        param['resd'].at[0, 'resd'] / 0.1 * 0.05)), param['rew'].at[0, 'rew'])], columns=['nongr_tew'])

    # Total available water in the soil profile
    param['taw'] = pd.DataFrame([1000 * (param['zrfc'].at[0, 'zrfc'] -
                                         param['zrwp'].at[0, 'zrwp']) * param['zr'].at[0, 'zr']], columns=['taw'])

    # Evaporation layer depletion thresholds which determine which curve number to use
    param['zedep3'] = pd.DataFrame(
        [0.5 * param['rew'].at[0, 'rew']], columns=['zedep3'])
    param['zedep1'] = pd.DataFrame(
        [(0.7 * param['rew'].at[0, 'rew']) + (0.3 * param['tew'].at[0, 'tew'])], columns=['zedep1'])

    # Curve numbers which are adjusted based on depletion in the evaporation
    param['cn1'] = pd.DataFrame(
        [param['cn'].at[0, 'cn'] / (2.281 - 0.01281 * param['cn'].at[0, 'cn'])], columns=['cn1'])
    param['cn3'] = pd.DataFrame(
        [param['cn'].at[0, 'cn'] / (0.427 + 0.00573 * param['cn'].at[0, 'cn'])], columns=['cn3'])

    # Basal crop coefficient adjusted for local weather conditions based on July weather conditions and mid-season crop height
    param['kcb'] = pd.DataFrame([param['kc'].at[1, 'kc'] + (0.04 * (param['wind'].at[6, 'wind'] - 2) - 0.004 * (
        param['rhmin'].at[6, 'rhmin'] - 45)) * (param['cht'].at[1, 'cht'] / 3) ** 0.3], columns=['kcb'])

    #--ERROR CHECK--#
    if param['taw'].at[0, 'taw'] <= 0.0:
        raise ValueError('Calculated values of total available water cannot be less than or equal to zero. Check your input selections.'
                         ' If the problem persists, you can report this issue to developers at http://bit.ly/edwrd-issue')
    #--END OF ERROR CHECK--#

    #--WARNING--#
    if 6.0 > param['tew'].at[0, 'tew'] > 29.0:
        warnings.warn('Calculated values of total evaporable water are outside the range of typical values (6.0-29.0). This may be cause by'
                      ' low field capacity estimates for the evaporation layer, high wilting point capacities, or a very deep/shallow'
                      ' evaporation layer depth. Check your input selections. If the problem persists, you can report this issue to developers at'
                      ' http://bit.ly/edwrd-issue', EDWRD_Output_Warning)
    #--END OF WARNING--#

    # CREATE DAILY INPUT RANGES FOR WIND AND RHMIN BY ASSIGNING MONTHLY VALUES

        # Identify the starting and ending months of the growing season
    gs_start = data.loc[data.index.dayofyear >
                        param['cstart'].at[0, 'cstart']].index.month[0]
    gs_end = data.loc[data.index.dayofyear == (
        int(param['cstage'].sum()) + param['cstart'].at[0, 'cstart'])].index.month[0]
    gs_mon = range(gs_start, gs_end + 1)
    # Set wind and rhmin based on the month within the growing season...
    for i in range(len(gs_mon)):
        data['wind'].loc[data.index.month ==
                         gs_mon[i]] = param['wind'].at[i, 'wind']
        data['rhmin'].loc[data.index.month ==
                          gs_mon[i]] = param['rhmin'].at[i, 'rhmin']
        # ...or the average non-growing season values provided by the parameter file (pfile)
    data['wind'].loc[data['wind'].isnull()] = param['wind'].at[len(
        param['wind']) - 1, 'wind']
    data['rhmin'].loc[data['rhmin'].isnull()] = param['rhmin'].at[len(
        param['rhmin']) - 1, 'rhmin']

    #--WARNING--#
    if 1.0 > data['wind'].any() > 6.0:
        warnings.warn('Monthly average wind values are outside of the typical range (1-6 m/s [2-13 mph]).'
                      ' Low values lead to lower estimates of maximum potential evapotranspiration.'
                      ' High values lead to higher estimates of maximum potential evapotranspiration.', EDWRD_Output_Warning)

    if 20.0 > data['rhmin'].any() > 80.0:
        warnings.warn('Monthly average minimum relative humidity values are outside of the typical range (20%-80%).'
                      ' Low values lead to higher estimates of maximum potential evapotranspiration.'
                      ' High values lead to lower estimates of maximum potential evapotranspiration.', EDWRD_Output_Warning)
    #--END OF WARNING--#

    # CREATE CROP HEIGHT CURVE
        # Assign day of year (DOY) values to the crop heights provided in the parameter file (pfile)
    cht_dates = [
        param['cstart'].at[0, 'cstart'] + param['cstage'].at[0,
                                                             'cstage'],  # End of initial crop establishment
        param['cstart'].at[0, 'cstart'] + param['cstage'].at[0, 'cstage'] + \
        param['cstage'].at[1, 'cstage'],  # End of crop development
        param['ngrw_stage'].at[0, 'ngrw_stage']  # Harvest date
    ]
    param['cht']['cs_doy'] = cht_dates

    for i in range(len(param['cht'])):
        data['cht'].loc[
            data.index.dayofyear == param['cht'].at[i, 'cs_doy']
        ] = param['cht'].at[i, 'cht']

    # data['cht'].loc[
    #     data.index.dayofyear == (param['ngrw_stage'].at[0,'ngrw_stage'] - 1) #Day before crop harvest
    #     ] = param['cht'].at[1,'cht']

        # Any days outside the growing season are assigned the non-growing season crop height value provided in the parameter file (pfile)...
    data['cht'].loc[np.logical_or(
        # Days prior to the planting date
        data.index.dayofyear < param['cstart'].at[0, 'cstart'],
        # Days after harvest date
        data.index.dayofyear >= param['ngrw_stage'].at[0, 'ngrw_stage']
    )
    ] = param['cht'].at[2, 'cht']

    # Interpolate remaining values
    data['cht'].interpolate(method='linear', inplace=True)

    # CREATE KCB CURVE AND KCB,MAX
    # Create a rolling sum of crop stage lengths to reflect the DOY
    param['cstage_doy'] = pd.DataFrame(param['cstage'].rolling(
        min_periods=1, window=len(param['cstage'])).sum() + param['cstart'].at[0, 'cstart'])
    param['cstage_doy'].columns = ['cstage_doy']
    # Set Kcb values corresponding to the appropriate crop stage and interpolate remaining values. Non-growing season values set to zero.
    data['kcb'].loc[data.index.dayofyear <=
                    param['cstage_doy'].at[0, 'cstage_doy']] = param['kc'].at[0, 'kc']
    data['kcb'].loc[np.logical_and(data.index.dayofyear <= param['cstage_doy'].at[2, 'cstage_doy'],
                                   data.index.dayofyear > param['cstage_doy'].at[1, 'cstage_doy'])] = param['kcb'].at[0, 'kcb']
    data['kcb'].loc[data.index.dayofyear ==
                    param['cstage_doy'].at[3, 'cstage_doy']] = param['kc'].at[2, 'kc']
    data['kcb'].loc[np.logical_or(data.index.dayofyear < param['cstart'].at[0, 'cstart'],
                                  data.index.dayofyear > param['cstage_doy'].at[3, 'cstage_doy'])] = 0
    data['kcb'].interpolate(method='linear', inplace=True)
    # Calculate Kcb,max based on local weather
    data['kcb_max'] = np.maximum((1.2 + (0.04 * (data['wind'] - 2) - 0.004 * (
        data['rhmin'] - 45)) * (data['cht'] / 3) ** 0.3), (data['kcb'] + 0.05))

    # CALCULATE FRACTION OF SOIL SURFACE COVERED BY VEGETATION (FC)
    # Calculated per FAO-56, set to zero during the non-growing season
    data['fc'] = np.maximum(((np.maximum(data['kcb'] - param['kc'].at[0, 'kc'], 0.01)) / (
        data['kcb_max'] - param['kc'].at[0, 'kc'])) ** (1 + (0.5 * data['cht'])), 0)
    data['fc'].loc[np.logical_or(data.index.dayofyear < param['cstart'].at[0, 'cstart'],
                                 data.index.dayofyear > param['cstage_doy'].at[3, 'cstage_doy'])] = 0

    #--ERROR CHECK--#
    if data['cht'].any() <= 0.0:
        raise ValueError('Daily calculated values for crop height must be greater than zero, even during the non-growing season.'
                         ' Check your input selections to ensure no zero or negative values occur.'
                         ' If the problem persists, you can report this issue to developers at http://bit.ly/edwrd-issue')
    if data['kcb'].any() < 0.0:
        raise ValueError('Daily calculated values for the basal crop coefficient cannot be negative.'
                         ' Check your input selections to ensure no zero or negative values occur.'
                         ' If the problem persists, you can report this issue to developers at http://bit.ly/edwrd-issue')
    if 0.0 > data['fc'].any() > 1.0:
        raise ValueError('Daily calculated values for the fraction of vegetative cover must be between 0 and 1. You can report this'
                         ' issue to developers at [INSERT URL HERE]')
    #--END OF ERROR CHECK--#

    #--WARNING CHECK--#
    if 1.05 > data['kcb_max'].any() > 1.3:
        warnings.warn('One or more values for the estimated maximum potential crop coefficient fall outside the range of'
                      ' typical values (1.05 - 1.30). This could be caused by higher than normal wind speeds, lower than'
                      ' normal minimum relative humidities, or higher than normal crop coefficient values during portions'
                      ' of the year. Higher estimates of maximum potential crop coefficient allow for greater water use'
                      ' through higher potential rates of evapotranspiration. Double check your input selections.', EDWRD_Output_Warning)

    return param, data, data_dic, output_dic
