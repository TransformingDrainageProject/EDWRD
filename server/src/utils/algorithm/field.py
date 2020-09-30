# -*- coding: utf-8 -*-
"""
Created on Tue Sep 17 14:51:26 2019

@author: brein

Error checks are commented as #--ERROR CHECK--# // #--END OF ERROR CHECK--#
Warnings are commented as #--WARNING--# // #--END OF WARNING--#
"""
import warnings

class EDWRD_Output_Warning(UserWarning):
    pass

def soilwater_calc(row,param,data,data_dic,irrdep_min,rdep_min,rarea,irr_init,upflx_init,zrdepl_init):
    """Performs the daily soil water balance for the whole soil profile, row by row within the dataframe. Requires the minimim irrigation depth, 
    which is set to 8.0 mm, and irrigation requirement, upward flux, and depletion in the soil profile at the end of the previous day 
    (irrdep_min,irr_init,upflx_init,zrdepl_init)"""
    
    #CALCULATE THE DAILY SOIL DEPLETION FACTOR (P) BASED ON WHAT IS IN THE PARAMETER FILE AND DAILY CROP ET. READILY AVAILABLE WATER IS ESTIMATED FROM THIS
    data.at[row.Index,'p'] = param['pfact'].values[0][0] + 0.04 * (5 - data.at[row.Index,'etc'])
    
    ##--WARNING--#
    if 0.1 > data.at[row.Index,'p'] > 0.8:
        warnings.warn('Daily calculated values for the soil water depletion factor fall outside of the typical range (0.1 to 0.8).'
                      ' This could be caused by unusually high/low input selections for the base value or extremely high estimates'
                      ' of potential crop ET. Check your location file and input selections, as well as daily calculated estimates'
                      ' of potential crop ET. Error occurs at index value' + str(row.Index) + '. If the problem persists, you can report'
                      ' this issue to developers at [INSERT URL HERE]', EDWRD_Output_Warning)
    ##--END OF WARNING--#
    
    data.at[row.Index,'raw'] = data.at[row.Index,'p'] * param['taw'].values[0][0]
    
    #CONDUCT THE SOIL WATER BALANCE TO DETERMINE DEPLETION
    data.at[row.Index,'zrperc'] = max((data.at[row.Index,'prcp'] - data.at[row.Index,'ro']) + irr_init - data.at[row.Index,'etc'] - zrdepl_init,0)
    data.at[row.Index,'zrdepl'] = max(zrdepl_init - (data.at[row.Index,'prcp'] - data.at[row.Index,'ro']) - irr_init - upflx_init + data.at[row.Index,'etc'] + data.at[row.Index,'zrperc'],0)
    
    #IF DEPLETION EXCEEDS RAW THEN AN IRRIGATION REQUIREMENT, TAKEN WITHIN THE CONSTRAINTS OF THE RESERVOIR, AND UPWARD FLUX IS CALCULATED
    #TO BE APPLIED THE FOLLOWING DAY
    if data.at[row.Index,'zrdepl'] > data.at[row.Index,'raw']:

        #Calculate the boundary conditions for irrigation
        min_irr_vol = irrdep_min / 1000 * param['iarea'].values[0][0] #Convert the minimum irrigation depth to a volume
        min_rvol_irr = rdep_min * rarea #Convert the minimum reservoir depth to a volume
        avail_rvol_irr = data.at[row.Index,'rvol'] - min_rvol_irr #Calculate the available volume of water in the reservoir for irrigation


        #Calculate the irrigation requirements and volumes
        if param['irrdep'].values[0][0] == 'deficitOnly': #Then use a deficit-based irrigation approach only applying irrigation equal to the deficit when above a minimum threshold
            irr_req = data.at[row.Index,'zrdepl'] - data.at[row.Index,'raw']
            irr_vol = irr_req / 1000 * param['iarea'].values[0][0] #volume in m3

        elif param['irrdep'].values[0][0] == 'capacity70': #Then use an irrigation approach to refill the soil water holding capacity to 70%
            irr_req = (param['taw'].at[0,'taw'] * 0.7) - (param['taw'].at[0,'taw'] - data.at[row.Index,'zrdepl']) #Set irrigation requirement equal to the difference between 70% water holding capacity and current depletion level, depth in mm
            irr_vol = irr_req / 1000 * param['iarea'].values[0][0] #volume in m3

        elif param['irrdep'].values[0][0] == 'capacity80': #Then use an irrigation approach to refill the soil water holding capacity to 80%
            irr_req = (param['taw'].at[0,'taw'] * 0.8) - (param['taw'].at[0,'taw'] - data.at[row.Index,'zrdepl']) #Set irrigation requirement equal to the difference between 80% water holding capacity and current depletion level, depth in mm
            irr_vol = irr_req / 1000 * param['iarea'].values[0][0] #volume

        elif param['irrdep'].values[0][0] == 'capacity90': #Then use an irrigation approach to refill the soil water holding capacity to 90%
            irr_req = (param['taw'].at[0,'taw'] * 0.9) - (param['taw'].at[0,'taw'] - data.at[row.Index,'zrdepl']) #Set irrigation requirement equal to the difference between 90% water holding capacity and current depletion level, depth in mm
            irr_vol = irr_req / 1000 * param['iarea'].values[0][0] #volume

        else: #Irrigate based on the fixed amount given by user based on availability in the reservoir
            irr_req = param['irrdep'].values[0][0] #depth
            irr_vol = irr_req / 1000 * param['iarea'].values[0][0] #volume
            min_irr_vol = irr_vol #Set the minimum irrigation to the fixed amount supplied by the user

        #Determine the applied irrigation amount, within the bounds of minimum irrigation depth and minimum reservoir depth
        #If the available reservoir volume and the irrigation requirement >= the minimum irrigation volume/depth, then irrigation is calculated as the
        #minimum of the irrigation requirement or what is available in the reservoir. Otherwise irrigation is set to zero.
        if avail_rvol_irr >= min_irr_vol:
            if irr_vol >= min_irr_vol:
                data.at[row.Index,'irr'] = min(irr_req, avail_rvol_irr / param['iarea'].values[0][0]*1000)

                #--ERROR CHECK--#
                if data.at[row.Index,'irr'] < irrdep_min:
                    raise ValueError('Daily calculated values of applied irrigation depth fall below the minimum threshold for irrigation, despite'
                                     ' water likely being available in the reservoir. Check to ensure water is available in the reservoir.'
                                     ' Error occurs at index value ' + str(row.Index) + '. If this problem persists, you can report this issue to'
                                     ' developers at [INSERT URL HERE]')
                #--END OF ERROR CHECK--#

            else:
                data.at[row.Index,'irr'] = 0
                
        else:
            data.at[row.Index,'irr'] = 0

        #Calculate the upward flux of water based on the soil water deficit and potential upward flux
        #If the current day is within the growing season then upward flux is calculated as the minimum of the irrigation requirement or
        #the full potential for upward flux based provided in the input file (infile). Otherwise upward flux is set to zero.
        if param['cstart'].values[0][0] > row.Index.dayofyear > param['cstage_doy'].values[3][0]:
            data.at[row.Index,'upflx'] = 0 
        else:
            data.at[row.Index,'upflx'] = min(data.at[row.Index,'zrdepl'] - data.at[row.Index,'raw'], data.at[row.Index,'max_upflx'])
    
    #DEPLETION <= RAW AND IRRIGATION REQUIREMENT AND UPWARD FLUX IS SET TO ZERO
    else:
        data.at[row.Index,'irr'] = 0
        data.at[row.Index,'upflx'] = 0
        
    #CALCULATE THE CROP STRESS COEFFICIENT DUE TO DEFICIT WATER AND ADJUST THE CROP COEFFICIENT, TRANSPIRATION, AND CROP ET
    data.at[row.Index,'ks'] = min((param['taw'].values[0][0] - data.at[row.Index,'zrdepl']) / (param['taw'].values[0][0] - data.at[row.Index,'raw']),1)
    data.at[row.Index,'kc_a'] = data.at[row.Index,'ks'] * data.at[row.Index,'kcb'] + data.at[row.Index,'ke']
    data.at[row.Index,'trans_a'] = data.at[row.Index,'ks'] * data.at[row.Index,'kcb'] * data.at[row.Index,'eto']
    data.at[row.Index,'etc_a'] = data.at[row.Index,'kc_a'] * data.at[row.Index,'eto']
    
    #UPDATE THE SOIL WATER BALANCE TO REFLECT REDUCTIONS IN CROP ET DUE TO DEFICIT WATER
    data.at[row.Index,'zrperc'] = max((data.at[row.Index,'prcp'] - data.at[row.Index,'ro']) + irr_init - data.at[row.Index,'etc_a'] - zrdepl_init,0)
    data.at[row.Index,'zrdepl'] = max(zrdepl_init - (data.at[row.Index,'prcp'] - data.at[row.Index,'ro']) - irr_init - upflx_init + data.at[row.Index,'etc_a'] + data.at[row.Index,'zrperc'],0)
    
    #CONVERT DEPLETION TO TERMS OF SOIL MOISTURE
    data.at[row.Index,'zrsm'] = param['taw'].values[0][0] - data.at[row.Index,'zrdepl']
    
    #--ERROR CHECK--#
    if data.at[row.Index,'raw'] <= 0.0:
        raise ValueError('Daily calculated readily available water cannot be less than or equal to 0. Error occurs at index value ' + 
                         str(row.Index) + '. You can report this issue to developers at [INSERT URL HERE]')
    for column in data[['irr','zrperc']]:
        if data.at[row.Index,column] < 0.0:
            raise ValueError(data_dic[column] + ' cannot contain negative values. Error occurs at index value ' + 
                             str(row.Index) + '. You can report this issue to developers at [INSERT URL HERE]')
    if 0.0 > data.at[row.Index,'upflx'] > data.at[row.Index,'max_upflx']:
        raise ValueError('Daily calculated upward flux must be between 0 and maximum potential upward flux for that specific day'
                         ' Error occurs at index value ' + str(row.Index) + '. If this problem persists, you can report this issue to'
                         ' developers at [INSERT URL HERE]')
    if 0.0 > data.at[row.Index,'ks'] > 1.0:
        raise ValueError('Daily calculated values for the water stress coefficient must be between 0 and 1. Error occurs at index value ' + 
                         str(row.Index) + '. You can report this issue to developers at [INSERT URL HERE]')
    if data.at[row.Index,'ks'] < 1 and data.at[row.Index,'zrdepl'] < data.at[row.Index,'raw']:
        raise ValueError('Daily calculated values for the water stress coefficient should be 1 when water depletion in the root zone'
                         ' is less than readily available water. Error occurs at index value ' + str(row.Index) + '. You can report this'
                         ' issue to developers at [INSERT URL HERE]')
    if data.at[row.Index,'kc_a'] > data.at[row.Index,'kc']:
        raise ValueError('Daily calculated values for actual crop coefficient cannot exceed values of the potential crop coefficient.'
                         ' Error occurs at index value ' + str(row.Index) + '. If this problem persists, you can report this issue to'
                         ' developers at [INSERT URL HERE]')
    if data.at[row.Index,'trans_a'] > data.at[row.Index,'trans']:
        raise ValueError('Daily calculated values for actual transpiration cannot exceed values of the potential transpiration.'
                         ' Error occurs at index value ' + str(row.Index) + '. If this problem persists, you can report this issue to'
                         ' developers at [INSERT URL HERE]')
    if data.at[row.Index,'etc_a'] > data.at[row.Index,'etc']:
        raise ValueError('Daily calculated values for actual crop ET cannot exceed values of the potential crop ET.'
                         ' Error occurs at index value ' + str(row.Index) + '. If this problem persists, you can report this issue to'
                         ' developers at [INSERT URL HERE]')
    for column in data[['zrdepl','zrsm']]:
        if 0.0 > data.at[row.Index,column] > param['taw'].at[0,'taw']:
            raise ValueError('Daily calculated values for ' + data_dic[column] + ' must be between 0 and the estimated'
                             ' total available water in the root zone. Error occurs at index value ' + str(row.Index) + '. You can report this issue to'
                             ' developers at [INSERT URL HERE]')
    if data.at[row.Index,'zrperc'] > 0 and data.at[row.Index,'zrdepl'] > 0.1:
        raise ValueError('Excess drainage from the root zone cannot occur along with notable water depletion from the root zone.'
                         ' Error occurs at index value ' + str(row.Index) + '.'
                         ' You can report this issue to developers at [INSERT URL HERE]')
    #--END OF ERROR CHECK--#
    
    
    
