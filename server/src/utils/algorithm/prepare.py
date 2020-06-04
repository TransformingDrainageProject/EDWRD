# -*- coding: utf-8 -*-
"""
Created on Tue Sep 17 14:37:07 2019

@author: brein

Error checks are commented as #--ERROR CHECK--# // #--END OF ERROR CHECK--#
Warnings are commented as #--WARNING--# // #--END OF WARNING--#
"""

import pandas as pd
import numpy as np
import warnings

class EDWRD_Output_Warning(UserWarning):
    pass

def edwrd_input(infile,pfile):
    """Reads in the input and parameter files. Prepares the main pandas dataframe that will be used to track variables and
    calculated values"""

    #READ INPUT FILE AS PANDAS DATAFRAME
    data = pd.read_csv(infile,sep = '\t', header = 0)

    #--ERROR CHECK--#
    if 1 > data['month'].any() > 12:
        raise ValueError('Month values must be an integer between 1 and 12')
    if 1 > data['day'].any() > 31:
        raise ValueError('Day values must be an integer between 1 and 31')
    #--END OF ERROR CHECK--#

    #PARSE DATES, AND SET DATES AS INDEX
    data = pd.read_csv(infile,sep = '\t', header = 0, parse_dates = {'date':[0,1,2]}, index_col = 0)

    #REINDEX PANDAS DATAFRAME TO INCLUDE ALL VARIABLES TO BE CALCULATED
    data = data.reindex(columns = data.columns.tolist() + [
                          'wind', 'rhmin','cht','kcb','kcb_max','fc','few',
                          'zedepl','zeperc','cn','ro','kr','ke','evap','etc',
                          'p','raw','zrdepl','zrperc','ks','etc_a','upflx',
                          'rdep','rvol','rprcp','rdflw','zrsm','rirr','rro',
                          'rovr','rcap','no3l','srpl','no3l_ovr','no3l_cap',
                          'srpl_ovr','srpl_cap',
                          'irr','kc','kc_a','trans','trans_a','fw',
                          'rseep','revap'
                          ])
    #CREATE A DICTIONARY OF CALCULATED VARIABLE NAMES
    data_dic = {'prcp':'Precipitation', 'dflw':'Tile Drain Flow', 'max_upflx':'Potential Upflux',
                'water_evap':'Open Water Evaporation', 'eto':'Reference ET', 'no3c':'Nitrate Concentration',
                'srpc':'SRP Concentration', 'wind':'Monthly Avg. Wind Speed', 'rhmin':'Monthly Avg. Min. Relative Humidity',
                'cht':'Crop Height', 'kcb':'Basal Crop Coefficient', 'kcb_max':'Maximum Potential Crop Coefficient',
                'fc':'Fraction of Vegetative Cover', 'few':'Exposed, Wetted Soil Surface Fraction', 'zedepl':'Evaporation Layer Depletion',
                'zeperc':'Evaporation Layer Excess Drainage', 'cn':'Curve Number', 'ro':'Runoff',
                'kr':'Evaporation Reduction Coefficient', 'ke':'Evaporation Coefficient', 'evap':'Evaporation',
                'etc':'Potential Crop ET', 'p':'Soil Water Depletion Factor', 'raw':'Readily Available Water',
                'zrdepl':'Root Zone Depletion', 'zrperc':'Root Zone Excess Drainage', 'ks':'Water Stress Coefficient',
                'etc_a':'Actual Crop ET', 'upflx':'Actual Upward Flux', 'rdep':'Reservoir Water Depth',
                'rvol':'Reservoir Water Volume', 'rprcp':'Precipitation Contribution to Reservoir',
                'rdflw':'Tile Drain Flow Contribution to Reservoir', 'zrsm':'Root Zone Soil Moisture', 'rirr':'Applied Irrigation Volume',
                'rro':'Runoff to Reservoir', 'rovr':'Reservoir Overflow', 'rcap':'Captured Tile Drain Flow', 'no3l':'Tile Drain Nitrate Load',
                'srpl':'Tile Drain SRP Load', 'no3l_ovr':'Overflow Nitrate Load', 'no3l_cap':'Captured Nitrate Load',
                'srpl_ovr':'Overflow SRP Load', 'srpl_cap':'Captured SRP Load', 'irr':'Applied Irrigation Depth',
                'kc':'Potential Crop Coefficient', 'kc_a':'Actual Crop Coefficient', 'trans':'Potential Transpiration',
                'trans_a':'Actual Transpiration', 'fw':'Wetted Soil Surface Fraction', 'rseep':'Reservoir Seepage',
                'revap':'Reservoir Evaporation'}

    #--ERROR CHECK--#
    for column in data[['prcp','dflw','max_upflx','water_evap','eto','no3c','srpc']].columns:
        if data[column].any() < 0.0:
            raise ValueError(data_dic[column] + ' cannot contain negative values. Check your location and input files to ensure no negative values occur.'
                         ' If the problem persists, you can report this issue to developers at [INSERT URL HERE]')
    #--END OF ERROR CHECK--#

    #CREATE DICTIONARY OF INPUT PARAMETERS
    param = {
            'darea':0,'iarea':1,
            'rarea':2,'rdep':3,'rdep_min':4,'rseep':5,
            'zr':6,'zrfc':7,'zrwp':8,
            'ze':9,'zefc':10,'zewp':11,'rew':12,'cn':13,
            'wind':14,'rhmin':15,
            'cstart':16,'cstage':17,'ngrw_stage':18,
            'cht':19,'kc':20,
            'fw':21,'pfact':22,'irrdep':23,'irrdep_min':24,'resd':25,
            'dareaIncSurfaceRunoff':26
            }

    for i in param:
        param[i] = pd.read_csv(pfile,sep = '\t',header = 0,usecols = [param[i]]).dropna()

    #CONVERT FIELD AND RESERVOIR AREAS TO SQUARE METERS
    param['darea'] = param['darea'] * 10000
    param['iarea'] = param['iarea'] * 10000
    param['rarea'] = param['rarea'] * 10000

    #ADD SECONDARY PARAMETERS TO THE DICTIONARY WHICH ARE CALCULATED FROM INITIAL PARAMETERS
        #Reservoir volume
    param['rvol'] = pd.DataFrame(param['rarea'] * param['rdep'].at[0,'rdep'])
    param['rvol'].columns = ['rvol']

        #Add an extremely large reservoir volume (10,000,000 m3, ~8,100 ac-ft) to the end in order to estimate the irrigation that would be applied when water is not limited (used for calculating ARIS)
        #Add a matching reservoir area.
    param['rvol'].at[len(param['rvol']),'rvol'] = 10000000
    param['rarea'].at[len(param['rarea']),'rarea'] = param['rarea'].at[len(param['rarea'])-1,'rarea']

        #Total evaporable water in the evaporation layer, limited during the non-growing season when surface residue is present
    param['tew'] = pd.DataFrame([1000 * (param['zefc'].at[0,'zefc'] - (0.5 * param['zewp'].at[0,'zewp'])) * param['ze'].at[0,'ze']],columns = ['tew'])
    param['nongr_tew'] = pd.DataFrame([np.maximum(param['tew'].at[0,'tew'] - (param['tew'].at[0,'tew'] * (param['resd'].at[0,'resd'] / 0.1 * 0.05)),param['rew'].at[0,'rew'])],columns = ['nongr_tew'])

        #Total available water in the soil profile
    param['taw'] = pd.DataFrame([1000 * (param['zrfc'].at[0,'zrfc'] - param['zrwp'].at[0,'zrwp']) * param['zr'].at[0,'zr']],columns = ['taw'])

        #Evaporation layer depletion thresholds which determine which curve number to use
    param['zedep3'] = pd.DataFrame([0.5 * param['rew'].at[0,'rew']],columns = ['zedep3'])
    param['zedep1'] = pd.DataFrame([(0.7 * param['rew'].at[0,'rew']) + (0.3 * param['tew'].at[0,'tew'])],columns = ['zedep1'])

        #Curve numbers which are adjusted based on depletion in the evaporation
    param['cn1'] = pd.DataFrame([param['cn'].at[0,'cn'] / (2.281 - 0.01281 * param['cn'].at[0,'cn'])],columns = ['cn1'])
    param['cn3'] = pd.DataFrame([param['cn'].at[0,'cn'] / (0.427 + 0.00573 * param['cn'].at[0,'cn'])],columns = ['cn3'])

        #Basal crop coefficient adjusted for local weather conditions based on July weather conditions and mid-season crop height
    param['kcb'] = pd.DataFrame([param['kc'].at[1,'kc'] + (0.04 * (param['wind'].at[6,'wind'] - 2) - 0.004 * (param['rhmin'].at[6,'rhmin'] - 45)) * (param['cht'].at[1,'cht'] / 3) ** 0.3],columns = ['kcb'])

    #--ERROR CHECK--#
    if param['taw'].at[0,'taw'] <= 0.0:
        raise ValueError('Calculated values of total available water cannot be less than or equal to zero. Check your input selections.'
                         ' If the problem persists, you can report this issue to developers at [INSERT URL HERE]')
    #--END OF ERROR CHECK--#

    #--WARNING--#
    if 6.0 > param['tew'].at[0,'tew'] > 29.0:
        warnings.warn('Calculated values of total evaporable water are outside the range of typical values (6.0-29.0). This may be cause by'
                      ' low field capacity estimates for the evaporation layer, high wilting point capacities, or a very deep/shallow'
                      ' evaporation layer depth. Check your input selections. If the problem persists, you can report this issue to developers at'
                      ' [INSERT URL HERE]', EDWRD_Output_Warning)
    #--END OF WARNING--#

    #CREATE DAILY INPUT RANGES FOR WIND AND RHMIN BY ASSIGNING MONTHLY VALUES

        #Identify the starting and ending months of the growing season
    gs_start = data.loc[data.index.dayofyear > param['cstart'].at[0,'cstart']].index.month[0]
    gs_end = data.loc[data.index.dayofyear == (int(param['cstage'].sum()) + param['cstart'].at[0,'cstart'])].index.month[0]
    gs_mon = range(gs_start,gs_end + 1)
        #Set wind and rhmin based on the month within the growing season...
    for i in range(len(gs_mon)):
        data['wind'].loc[data.index.month == gs_mon[i]] = param['wind'].at[i,'wind']
        data['rhmin'].loc[data.index.month == gs_mon[i]] = param['rhmin'].at[i,'rhmin']
        #...or the average non-growing season values provided by the parameter file (pfile)
    data['wind'].loc[data['wind'].isnull()] = param['wind'].at[len(param['wind']) - 1,'wind']
    data['rhmin'].loc[data['rhmin'].isnull()] = param['rhmin'].at[len(param['rhmin']) - 1,'rhmin']

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

    #CREATE CROP HEIGHT CURVE
        #Assign day of year (DOY) values to the crop heights provided in the parameter file (pfile)
    cht_dates = [
        param['cstart'].at[0,'cstart'] + param['cstage'].at[0,'cstage'], #End of initial crop establishment
        param['cstart'].at[0,'cstart'] + param['cstage'].at[0,'cstage'] + param['cstage'].at[1,'cstage'], #End of crop development
        param['ngrw_stage'].at[0,'ngrw_stage'] #Harvest date
        ]
    param['cht']['cs_doy'] = cht_dates

    for i in range(len(param['cht'])):
        data['cht'].loc[
            data.index.dayofyear == param['cht'].at[i,'cs_doy']
            ] = param['cht'].at[i,'cht']

    # data['cht'].loc[
    #     data.index.dayofyear == (param['ngrw_stage'].at[0,'ngrw_stage'] - 1) #Day before crop harvest
    #     ] = param['cht'].at[1,'cht']

        #Any days outside the growing season are assigned the non-growing season crop height value provided in the parameter file (pfile)...
    data['cht'].loc[np.logical_or(
        data.index.dayofyear<param['cstart'].at[0,'cstart'], #Days prior to the planting date
        data.index.dayofyear>=param['ngrw_stage'].at[0,'ngrw_stage'] #Days after harvest date
        )
        ] = param['cht'].at[2,'cht']

        #Interpolate remaining values
    data['cht'].interpolate(method = 'linear',inplace = True)

    #CREATE KCB CURVE AND KCB,MAX
        #Create a rolling sum of crop stage lengths to reflect the DOY
    param['cstage_doy'] = pd.DataFrame(param['cstage'].rolling(min_periods = 1, window = len(param['cstage'])).sum() + param['cstart'].at[0,'cstart'])
    param['cstage_doy'].columns = ['cstage_doy']
        #Set Kcb values corresponding to the appropriate crop stage and interpolate remaining values. Non-growing season values set to zero.
    data['kcb'].loc[data.index.dayofyear <= param['cstage_doy'].at[0,'cstage_doy']] = param['kc'].at[0,'kc']
    data['kcb'].loc[np.logical_and(data.index.dayofyear <= param['cstage_doy'].at[2,'cstage_doy'],data.index.dayofyear>param['cstage_doy'].at[1,'cstage_doy'])] = param['kcb'].at[0,'kcb']
    data['kcb'].loc[data.index.dayofyear == param['cstage_doy'].at[3,'cstage_doy']] = param['kc'].at[2,'kc']
    data['kcb'].loc[np.logical_or(data.index.dayofyear<param['cstart'].at[0,'cstart'],data.index.dayofyear>param['cstage_doy'].at[3,'cstage_doy'])] = 0
    data['kcb'].interpolate(method = 'linear',inplace = True)
        #Calculate Kcb,max based on local weather
    data['kcb_max'] = np.maximum((1.2 + (0.04 * (data['wind'] - 2) - 0.004 * (data['rhmin'] - 45)) * (data['cht'] / 3) ** 0.3),(data['kcb'] + 0.05))

    #CALCULATE FRACTION OF SOIL SURFACE COVERED BY VEGETATION (FC)
        #Calculated per FAO-56, set to zero during the non-growing season
    data['fc'] = np.maximum(((np.maximum(data['kcb'] - param['kc'].at[0,'kc'],0.01)) / (data['kcb_max'] - param['kc'].at[0,'kc'])) ** (1 + (0.5 * data['cht'])),0)
    data['fc'].loc[np.logical_or(data.index.dayofyear<param['cstart'].at[0,'cstart'],data.index.dayofyear>param['cstage_doy'].at[3,'cstage_doy'])] = 0

    #--ERROR CHECK--#
    if data['cht'].any() <= 0.0:
        raise ValueError('Daily calculated values for crop height must be greater than zero, even during the non-growing season.'
                         ' Check your input selections to ensure no zero or negative values occur.'
                         ' If the problem persists, you can report this issue to developers at [INSERT URL HERE]')
    if data['kcb'].any() < 0.0:
        raise ValueError('Daily calculated values for the basal crop coefficient cannot be negative.'
                         ' Check your input selections to ensure no zero or negative values occur.'
                         ' If the problem persists, you can report this issue to developers at [INSERT URL HERE]')
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

    return param,data,data_dic