# -*- coding: utf-8 -*-
"""
Created on Tue Sep 17 14:47:29 2019

@author: brein

Error checks are commented as #--ERROR CHECK--# // #--END OF ERROR CHECK--#
"""

def psthrvst_pstfrz_evap(row,param,data,data_dic,irr_init,zedepl_init):
    """Defines the water balance calculation within the evaporation layer, row by row within the dataframe, during the post-harvest and 
    post-freeze periods defined in the parameter file. Requires the irrigation requirement and depletion in the evaporation layer at the 
    end of the previous day (irr_init,zedepl_init)"""
    #CONDITION: IF DEPLETION IN THE EVAPORATION LAYER > REW THEN A EVAPORATION REDUCTION COEFFICIENT (KR) IS CALCULATED
    if zedepl_init > param['rew'].values[0][0]:
        data.at[row.Index,'kr'] = max((param['nongr_tew'].values[0][0] - zedepl_init) / (param['nongr_tew'].values[0][0] - param['rew'].values[0][0]),0)
    else: 
        data.at[row.Index,'kr'] = 1
    
    #CALCULATE THE EVAPORATION COEFFICIENT (KE, per FAO-56)
    data.at[row.Index,'ke'] = min(data.at[row.Index,'kr'] * (data.at[row.Index,'kcb_max'] - data.at[row.Index,'kcb']),data.at[row.Index,'few'] * data.at[row.Index,'kcb_max'])
    
    #CALCULATE THE EVAPORATION AND TRANSPIRATION COMPONENTS OF ET
    data.at[row.Index,'evap'] = data.at[row.Index,'ke'] * data.at[row.Index,'eto']
    data.at[row.Index,'trans'] = data.at[row.Index,'kcb'] * data.at[row.Index,'eto']
    
    #CONDUCT THE WATER BALANCE IN THE EVAPORATION LAYER
    data.at[row.Index,'zeperc'] = max((data.at[row.Index,'prcp'] - data.at[row.Index,'ro']) + (irr_init / data.at[row.Index,'fw']) - zedepl_init,0)
    data.at[row.Index,'zedepl'] = min(max(zedepl_init - (data.at[row.Index,'prcp'] - data.at[row.Index,'ro']) - (irr_init / data.at[row.Index,'fw']) + (data.at[row.Index,'evap'] / data.at[row.Index,'few']) + data.at[row.Index,'zeperc'],0),param['nongr_tew'].values[0][0])
    
    #POPULATE THE IRRIGATION AMOUNT BASED ON THE IRRIGATION REQUIREMENT FROM THE PREVIOUS DAY
    data.at[row.Index,'irr'] = irr_init
    
    #POPULATE THE CROP COEFFICIENT AND CROP ET
    data.at[row.Index,'kc'] = data.at[row.Index,'kcb'] + data.at[row.Index,'ke']
    data.at[row.Index,'etc'] = data.at[row.Index,'kc'] * data.at[row.Index,'eto']
    
    #--ERROR CHECK--#
    for column in data[['evap','trans','etc','zeperc']]:
        if data.at[row.Index,column] < 0.0:
            raise ValueError(data_dic[column] + ' cannot contain negative values. Error occurs at index value ' + str(row.Index) + '.'
                             ' Check your location file and input selections to ensure no negative values occur.'
                             ' If the problem persists, you can report this issue to developers at [INSERT URL HERE]')
    if 0.0 > data.at[row.Index,'kr'] > 1.0:
        raise ValueError('Daily calculated values for the evaporation reduction coefficient must be between 0 and 1.'
                         ' Error occurs at index value ' + str(row.Index) + '.'
                         ' You can report this issue to developers at [INSERT URL HERE]')
    if data.at[row.Index,'ke'] > (data.at[row.Index,'kcb_max'] - data.at[row.Index,'kcb']):
        raise ValueError('Daily calculated values for the evaporation coefficient cannot exceed the available energy for evaporation.'
                         ' Error occurs at index value ' + str(row.Index) + '.'
                         ' You can report this issue to developers at [INSERT URL HERE]')
    if data.at[row.Index,'kc'] > data.at[row.Index,'kcb_max']:
        raise ValueError('Daily calculated values for the crop coefficient cannot exceed the maximum potential crop coefficient.'
                         ' Error occurs at index value ' + str(row.Index) + '.'
                         ' You can report this issue to developers at [INSERT URL HERE]')
    if data.at[row.Index,'kcb'] > data.at[row.Index,'kc']:
        raise ValueError('Daily calculated basal crop coefficient values cannot exceed the combined dual crop coefficient value.'
                         ' Error occurs at index value ' + str(row.Index) + '.'
                         ' You can report this issue to developers at [INSERT URL HERE]')
    if 0.0 > data.at[row.Index,'zedepl'] > param['tew'].at[0,'tew']:
        raise ValueError('Daily calculated values for water depletion in the evaporation layer must be between 0 and total evaporable water.'
                         ' Error occurs at index value ' + str(row.Index) + '.'
                         ' You can report this issue to developers at [INSERT URL HERE]')
    #--END OF ERROR CHECK--#
    
def winter_evap(row,param,data,data_dic,irr_init,zedepl_init):
    """Defines the water balance calculation within the evaporation layer, row by row within the dataframe, during the winter period defined in 
    the parameter file. Requires the irrigation requirement and depletion in the evaporation layer at the end of the previous day 
    (irr_init,zedepl_init)"""
    #IGNORE THE EVAPORATION REDUCTION COEFFICENT BY SETTING TO 1, ASSUME AN OVERALL AVERAGE COEFFICIENT VALUE FOR THE EVAPORATION COEFFICIENT
    data.at[row.Index,'kr'] = 1
    data.at[row.Index,'ke'] = param['kc'].values[3][0]
    
    #CALCULATE THE EVAPORATION AND TRANSPIRATION COMPONENTS OF ET
    data.at[row.Index,'evap'] = data.at[row.Index,'ke'] * data.at[row.Index,'eto']
    data.at[row.Index,'trans'] = data.at[row.Index,'kcb'] * data.at[row.Index,'eto']
    
    #CONDUCT THE WATER BALANCE IN THE EVAPORATION LAYER
    data.at[row.Index,'zeperc'] = max((data.at[row.Index,'prcp'] - data.at[row.Index,'ro']) + (irr_init / data.at[row.Index,'fw']) - zedepl_init,0)
    data.at[row.Index,'zedepl'] = min(max(zedepl_init - (data.at[row.Index,'prcp'] - data.at[row.Index,'ro']) - (irr_init / data.at[row.Index,'fw']) + (data.at[row.Index,'evap'] / data.at[row.Index,'few']) + data.at[row.Index,'zeperc'],0),param['tew'].values[0][0])
    
    #POPULATE THE IRRIGATION AMOUNT BASED ON THE IRRIGATION REQUIREMENT FROM THE PREVIOUS DAY
    data.at[row.Index,'irr'] = irr_init
    
    #POPULATE THE CROP COEFFICIENT AND CROP ET
    data.at[row.Index,'kc'] = data.at[row.Index,'kcb'] + data.at[row.Index,'ke']
    data.at[row.Index,'etc'] = data.at[row.Index,'kc'] * data.at[row.Index,'eto']

    #--ERROR CHECK--#
    for column in data[['evap','trans','etc','zeperc']]:
        if data.at[row.Index,column] < 0.0:
            raise ValueError(data_dic[column] + ' cannot contain negative values. Error occurs at index value ' + str(row.Index) + '.'
                             ' Check your location file and input selections to ensure no negative values occur.'
                             ' If the problem persists, you can report this issue to developers at [INSERT URL HERE]')
    if 0.0 > data.at[row.Index,'kr'] > 1.0:
        raise ValueError('Daily calculated values for the evaporation reduction coefficient must be between 0 and 1.'
                         ' Error occurs at index value ' + str(row.Index) + '.'
                         ' You can report this issue to developers at [INSERT URL HERE]')
    if data.at[row.Index,'ke'] > (data.at[row.Index,'kcb_max'] - data.at[row.Index,'kcb']):
        raise ValueError('Daily calculated values for the evaporation coefficient cannot exceed the available energy for evaporation.'
                         ' Error occurs at index value ' + str(row.Index) + '.'
                         ' You can report this issue to developers at [INSERT URL HERE]')
    if data.at[row.Index,'kc'] > data.at[row.Index,'kcb_max']:
        raise ValueError('Daily calculated values for the crop coefficient cannot exceed the maximum potential crop coefficient.'
                         ' Error occurs at index value ' + str(row.Index) + '.'
                         ' You can report this issue to developers at [INSERT URL HERE]')
    if data.at[row.Index,'kcb'] > data.at[row.Index,'kc']:
        raise ValueError('Daily calculated basal crop coefficient values cannot exceed the combined dual crop coefficient value.'
                         ' Error occurs at index value ' + str(row.Index) + '.'
                         ' You can report this issue to developers at [INSERT URL HERE]')
    if 0.0 > data.at[row.Index,'zedepl'] > param['tew'].at[0,'tew']:
        raise ValueError('Daily calculated values for water depletion in the evaporation layer must be between 0 and total evaporable water.'
                         ' Error occurs at index value ' + str(row.Index) + '.'
                         ' You can report this issue to developers at [INSERT URL HERE]')
    #--END OF ERROR CHECK--#
                
def evap(row,param,data,data_dic,irr_init,zedepl_init):
    """Defines the water balance calculation within the evaporation layer, row by row within the dataframe, during the pre-plant and growing season 
    periods defined in the parameter file. Requires the irrigation requirement and depletion in the evaporation layer at the end of the previous 
    day (irr_init,zedepl_init)"""
    #CONDITION: IF DEPLETION IN THE EVAPORATION LAYER > REW THEN A EVAPORATION REDUCTION COEFFICIENT (KR) IS CALCULATED
    if zedepl_init>param['rew'].values[0][0]:
        data.at[row.Index,'kr'] = max((param['tew'].values[0][0] - zedepl_init) / (param['tew'].values[0][0] - param['rew'].values[0][0]),0)
    else: 
        data.at[row.Index,'kr'] = 1
    
    #CALCULATE THE EVAPORATION COEFFICIENT (KE, per FAO-56)
    data.at[row.Index,'ke'] = min(data.at[row.Index,'kr'] * (data.at[row.Index,'kcb_max'] - data.at[row.Index,'kcb']),data.at[row.Index,'few'] * data.at[row.Index,'kcb_max'])
    
    #CALCULATE THE EVAPORATION AND TRANSPIRATION COMPONENTS OF ET
    data.at[row.Index,'evap'] = data.at[row.Index,'ke'] * data.at[row.Index,'eto']
    data.at[row.Index,'trans'] = data.at[row.Index,'kcb'] * data.at[row.Index,'eto']
    
    #CONDUCT THE WATER BALANCE IN THE EVAPORATION LAYER
    data.at[row.Index,'zeperc'] = max((data.at[row.Index,'prcp'] - data.at[row.Index,'ro']) + (irr_init / data.at[row.Index,'fw']) - zedepl_init,0)
    data.at[row.Index,'zedepl'] = min(max(zedepl_init - (data.at[row.Index,'prcp'] - data.at[row.Index,'ro']) - (irr_init / data.at[row.Index,'fw']) + (data.at[row.Index,'evap'] / data.at[row.Index,'few']) + data.at[row.Index,'zeperc'],0),param['tew'].values[0][0])
    
    #POPULATE THE IRRIGATION AMOUNT BASED ON THE IRRIGATION REQUIREMENT FROM THE PREVIOUS DAY
    data.at[row.Index,'irr'] = irr_init
    
    #POPULATE THE CROP COEFFICIENT AND CROP ET
    data.at[row.Index,'kc'] = data.at[row.Index,'kcb'] + data.at[row.Index,'ke']
    data.at[row.Index,'etc'] = data.at[row.Index,'kc'] * data.at[row.Index,'eto']
    
    #--ERROR CHECK--#
    for column in data[['evap','trans','etc','zeperc']]:
        if data.at[row.Index,column] < 0.0:
            raise ValueError(data_dic[column] + ' cannot contain negative values. Error occurs at index value ' + str(row.Index) + '.'
                             ' Check your location file and input selections to ensure no negative values occur.'
                             ' If the problem persists, you can report this issue to developers at [INSERT URL HERE]')
    if 0.0 > data.at[row.Index,'kr'] > 1.0:
        raise ValueError('Daily calculated values for the evaporation reduction coefficient must be between 0 and 1.'
                         ' Error occurs at index value ' + str(row.Index) + '.'
                         ' You can report this issue to developers at [INSERT URL HERE]')
    if data.at[row.Index,'ke'] > (data.at[row.Index,'kcb_max'] - data.at[row.Index,'kcb']):
        raise ValueError('Daily calculated values for the evaporation coefficient cannot exceed the available energy for evaporation.'
                         ' Error occurs at index value ' + str(row.Index) + '.'
                         ' You can report this issue to developers at [INSERT URL HERE]')
    if data.at[row.Index,'kc'] > data.at[row.Index,'kcb_max']:
        raise ValueError('Daily calculated values for the crop coefficient cannot exceed the maximum potential crop coefficient.'
                         ' Error occurs at index value ' + str(row.Index) + '.'
                         ' You can report this issue to developers at [INSERT URL HERE]')
    if data.at[row.Index,'kcb'] > data.at[row.Index,'kc']:
        raise ValueError('Daily calculated basal crop coefficient values cannot exceed the combined dual crop coefficient value.'
                         ' Error occurs at index value ' + str(row.Index) + '.'
                         ' You can report this issue to developers at [INSERT URL HERE]')
    if 0.0 > data.at[row.Index,'zedepl'] > param['tew'].at[0,'tew']:
        raise ValueError('Daily calculated values for water depletion in the evaporation layer must be between 0 and total evaporable water.'
                         ' Error occurs at index value ' + str(row.Index) + '.'
                         ' You can report this issue to developers at [INSERT URL HERE]')
    #--END OF ERROR CHECK--#
    