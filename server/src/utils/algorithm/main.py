#  - * -  coding: utf - 8  - * -
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

from prepare import edwrd_input
from runoff import runoff_calc
from reservoir import reservoir_calc, wq_calc
from evaporation import evap_calc
from field import soilwater_calc
from output import annual_output_calc, monthly_output_calc


def edwrd(infile, pfile, convert_input, convert_param):
    """Reads in the input and parameter files and conducts field and reservoir water balances for a drainage water recycling system."""
    # READ IN THE INPUT AND PARAMETER FILES
    param, data, data_dic, output_dic = edwrd_input(
        infile, pfile, convert_input, convert_param)

    # CREATE EMPTY DICTIONARIES TO STORE THE DAILY DATA AND OUTPUT FROM VARIOUS RESERVOIR VOLUMES
    daily_data = {}
    daily_data_user = {}
    annual_output = {}
    monthly_output = {}

    # LOOP THROUGH EACH VOLUME PROVIDED IN THE PARAMETER FILE TO CALCULATE THE DAILY VALUES
    for vol in range(len(param['rvol'])):
        print(json.dumps({'msg': 'Calculating daily values for volume ' +
                          str(vol + 1) + ' of ' + str(len(param['rvol'])) + '...'}))
        rmax = param['rvol'].at[vol, 'rvol']
        rarea = param['rarea'].at[vol, 'rarea']

        # SET INITIAL AND BOUNDARY CONDITIONS FOR THE RESERVOIR AND FIELD
        # The soil water balance assumes a full soil profile up to field capacity, no irrigation requirement.
        # The reservoir water balance assumes a full reservoir
        zedepl_init = param['tew'].values[0][0]
        upflx_init = 0
        zrdepl_init = 0
        rvol_init = param['rvol'].at[vol, 'rvol']
        irr_init = 0
        fw_init = 1

        # SET THE MINIMUM IRRIGATION DEPTH TO BE APPLIED AND LOAD CONVERSION FACTOR
        # Minimum allowed irrigation to be applied in a single application
        irrdep_min = param['irrdep_min'].values[0][0]
        # Minimum allowed reservoir depth before irrigation is limited
        rdep_min = param['rdep_min'].values[0][0]

        # (0.000001 kg / 1 mg) / (0.001 mL / 1 m3)
        load_conv = 0.000001 / 0.001

        # CALCULATE ALL VARIABLES THAT DON'T RELY ON THE FIELD/RESERVOIR WATER BALANCE BUT RATHER SERVE AS INPUT/OUTPUT FLOWS OR VOLUMES
        data['rprcp'] = data['prcp'] / 1000 * param['rarea'].at[vol, 'rarea']
        data['rdflw'] = data['dflw'] / 1000 * param['darea'].values[0][0]
        data['rseep'] = param['rseep'].values[0][0] / \
            1000 * param['rarea'].at[vol, 'rarea']
        data['revap'] = data['water_evap'] / \
            1000 * param['rarea'].at[vol, 'rarea']
        data['no3l'] = data['rdflw'] * data['no3c'] * load_conv
        data['srpl'] = data['rdflw'] * data['srpc'] * load_conv

        #--ERROR CHECK--#
        for column in data[['rprcp', 'rdflw', 'rseep', 'revap', 'no3l', 'srpl']].columns:
            if data[column].any() < 0.0:
                raise ValueError(data_dic[column] + ' cannot contain negative values. Check your location file and input selections to ensure no negative values occur.'
                                 ' If the problem persists, you can report this issue to developers at http://bit.ly/edwrd-issue')
        #--END OF ERROR CHECK--#

        # CALCULATE DAILY WATER BALANCES
        """ Order of calculations:
            assumes precip / runoff / drainage / seepage / evaporation / ET occurs on day i, required irrigations and upflux applied the 
            following day
            
                1.) RUNOFF
                cn > ro
                    
                2.) RESERVOIR WATER BALANCE(irrigations based on prior day irrigation requirement)
                rprcp > rdflw > rirr > rseep > revap > rvol > rdep > rovr > rcap
                
                3.) WATER QUALITY
                no3l > no3l_cap > no3l_ovr > srpl > srpl_cap > srpl_ovr
                
                4.) EVAPORATION LAYER WATER BALANCE (irrigations based on prior day irrigation requirement) 
                fw > few > kr > ke > evap > trans > zeperc > zedepl > irr > kc > etc 
                
                5.) SOIL PROFILE WATER BALANCE (defines the irrigation requirement for the following day)
                p > raw > zrperc > zrdepl > zrsm > irr_req > irr > upflx > ks > kc_a > trans_a> etc_a
        """
        # Iterate over dataframe rows as named tuples
        for row in data.itertuples():

            # Calculate runoff (cn > ro)
            runoff_calc(row, param, data, zedepl_init)

            # Calculate reservoir water balance (rprcp > rdflw > rirr > rseep > revap > rvol > rdep > rovr > rcap)
            reservoir_calc(row, param, data, data_dic,
                           irr_init, rvol_init, rmax, rarea)

            # Calculate water quality volumes (no3l > no3l_cap > no3l_ovr > srpl > srpl_cap > srpl_ovr)
            wq_calc(row, param, data, data_dic, load_conv)

            # Calculate evaporation layer water balance (fw > few > kr > ke > evap > trans > zeperc > zedepl > irr > kc > etc )
            evap_calc(row, param, data, data_dic,
                      fw_init, irr_init, zedepl_init)

            # Calculate soil profile water balance (p > raw > zrperc > zrdepl > zrsm > irr_req > irr > upflx > ks > kc_a > trans_a> etc_a)
            soilwater_calc(row, param, data, data_dic, irrdep_min,
                           rdep_min, rarea, irr_init, upflx_init, zrdepl_init)

            # Redefine "_init" values to be applied the following day
            zedepl_init = data.at[row.Index, 'zedepl']
            upflx_init = data.at[row.Index, 'upflx']
            zrdepl_init = data.at[row.Index, 'zrdepl']
            rvol_init = data.at[row.Index, 'rvol']
            irr_init = data.at[row.Index, 'irr']
            fw_init = data.at[row.Index, 'fw']

        # CREATE CONDENSED OUTPUT FILE FOR USER
        var_drop = ['max_upflx', 'water_evap', 'eto', 'no3c', 'srpc', 'wind', 'rhmin', 'cht', 'kcb', 'kcb_max', 'fc', 'few', 'zedepl',
                    'zeperc', 'cn', 'kr', 'ke', 'p', 'kc', 'kc_a', 'trans', 'fw']
        data_user = data.drop(columns=var_drop)

        # REORGANIZE COLUMNS AND RENAME TO MORE DESCRIPTIVE TITLE
        data_user = data_user.copy()
        data_user = data_user[['prcp', 'irr', 'upflx', 'dflw', 'ro', 'zrperc', 'etc', 'etc_a', 'evap', 'trans_a', 'zrsm', 'zrdepl', 'raw', 'ks',
                               'rdep', 'rvol', 'rprcp', 'rdflw', 'rro', 'rseep', 'revap', 'rirr', 'rovr', 'rcap', 'no3l', 'no3l_ovr',
                               'no3l_cap', 'srpl', 'srpl_ovr', 'srpl_cap']]
        data_user = data_user.rename(columns=data_dic)

        # COPY ALL DAILY DATA AND OUTPUT FOR A GIVEN RESERVOIR VOLUME TO THE DICTIONARY AND WRITE IT TO AN EXCEL WORKSHEET
        daily_data[vol] = data.copy()  # Comprehensive copy, all data
        daily_data_user[vol] = data_user.copy()  # User copy, condensed dataset

    # #LOOP THROUGH THE DAILY DATA FOR EACH VOLUME TO CALCULATE THE OUTPUT
    # #This second loop is needed here in order to calculate the ARIS values...need to know how much irrigation would be applied given an unlimited supply of water
    for vol in range(len(param['rvol'])):
        print(json.dumps(
            {'msg': f'Calculating output values for volume {vol + 1} of {len(param["rvol"])}...'}))
        annual_output_calc(param, daily_data_user, vol, annual_output)
        monthly_output_calc(param, daily_data_user, vol, monthly_output)

    return param, output_dic, daily_data, daily_data_user, annual_output, monthly_output
