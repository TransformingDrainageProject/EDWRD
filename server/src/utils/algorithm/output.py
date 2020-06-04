# -*- coding: utf-8 -*-
"""
Created on Tue Sep 17 14:52:53 2019

@author: brein
"""

import pandas as pd
import numpy as np


def output_calc(param,data,vol,dic):
    """Aggregates and summarizes output for each variable from a range of reservoir volumes (vol). Writes this output to an Excel file."""
    #CREATE AN EMPTY DATAFRAME FOR THE OUTPUT
    output=pd.DataFrame()
    
    #ANNUAL PRECIP
    output['prcp']=data[vol]['prcp'].groupby(data[vol].index.year).sum()
    
    #ANNUAL EVAPORATION FROM THE RESERVOIR SURFACE
    output['water_evap']=data[vol]['water_evap'].groupby(data[vol].index.year).sum()
    
    #ANNUAL DRAIN FLOW
    output['dflw']=data[vol]['dflw'].groupby(data[vol].index.year).sum()
    
    #ANNUAL RUNOFF
    output['ro']=data[vol]['ro'].groupby(data[vol].index.year).sum()
    
    #GROWING SEASON PRECIPITATION
    grw_prcp=data[vol]['prcp'].loc[np.logical_and(data[vol].index.dayofyear>=param['cstart'].values[0][0],data[vol].index.dayofyear<=param['cstage_doy'].values[3][0])]
    output['grw_prcp']=grw_prcp.groupby(grw_prcp.index.year).sum()
    
    #GROWING SEASON RUNOFF
    grw_ro=data[vol]['ro'].loc[np.logical_and(data[vol].index.dayofyear>=param['cstart'].values[0][0],data[vol].index.dayofyear<=param['cstage_doy'].values[3][0])]
    output['grw_ro']=grw_ro.groupby(grw_ro.index.year).sum()
    
    #GROWING SEASON DRAIN FLOW
    grw_dflw=data[vol]['dflw'].loc[np.logical_and(data[vol].index.dayofyear>=param['cstart'].values[0][0],data[vol].index.dayofyear<=param['cstage_doy'].values[3][0])]
    output['grw_dflw']=grw_dflw.groupby(grw_dflw.index.year).sum()
    
    #GROWING SEASON ADJUSTED CROP ET
    grw_etc_a=data[vol]['etc_a'].loc[np.logical_and(data[vol].index.dayofyear>=param['cstart'].values[0][0],data[vol].index.dayofyear<=param['cstage_doy'].values[3][0])]
    output['grw_etc_a']=grw_etc_a.groupby(grw_etc_a.index.year).sum()
    
    #GROWING SEASON UPWARD FLUX
    grw_upflx=data[vol]['upflx'].loc[np.logical_and(data[vol].index.dayofyear>=param['cstart'].values[0][0],data[vol].index.dayofyear<=param['cstage_doy'].values[3][0])]
    output['grw_upflx']=grw_upflx.groupby(grw_upflx.index.year).sum()
    
    #GROWING SEASON POTENTIAL (NOT WATER-LIMITED) CROP ET
    grw_etc=data[vol]['etc'].loc[np.logical_and(data[vol].index.dayofyear>=param['cstart'].values[0][0],data[vol].index.dayofyear<=param['cstage_doy'].values[3][0])]
    output['grw_etc']=grw_etc.groupby(grw_etc.index.year).sum()
    
    #ANNUAL APPLIED IRRIGATION
    output['irr']=data[vol]['irr'].groupby(data[vol].index.year).sum()
    
    #ANNUAL IRRIGATION REQUIREMENT BASED ON THE IRRIGATION PROVIDED WHEN WATER IS NOT LIMITED
    irr_req=data[len(param['rvol'])-1]['irr'].loc[np.logical_and(data[len(param['rvol'])-1].index.dayofyear>=param['cstart'].values[0][0],data[len(param['rvol'])-1].index.dayofyear<=param['cstage_doy'].values[3][0])]
    output['irr_req']=irr_req.groupby(irr_req.index.year).sum()
    
    #ANNUAL RELATIVE IRRIGATION SUFFICIENCY
    output['aris']=output['irr']/output['irr_req']
    
    #ANNUAL POTENTIAL (NOT WATER-LIMITED) TRANSPIRATION
    trans_p = data[vol]['trans'].loc[np.logical_and(data[vol].index.dayofyear>=param['cstart'].values[0][0],data[vol].index.dayofyear<=param['cstage_doy'].values[3][0])]
    trans_p = trans_p.groupby(trans_p.index.year).sum()
    
    #ANNUAL ACTUAL TRANSPIRATION
    trans_a = data[vol]['trans_a'].loc[np.logical_and(data[vol].index.dayofyear>=param['cstart'].values[0][0],data[vol].index.dayofyear<=param['cstage_doy'].values[3][0])]
    trans_a = trans_a.groupby(trans_a.index.year).sum()
    
    # #ANNUAL RELATIVE YIELD
    # output['ryld'] = 1 - (param['ky'].values[0][0] * (1 - trans_a / trans_p))

    #ANNUAL OVERFLOW FROM THE RESERVOIR
    rovr=data[vol]['rovr'] / param['darea'].values[0][0] * 1000
    output['rovr']=rovr.groupby(rovr.index.year).sum()
    
    #GROWING SEASON OVERFLOW FROM THE RESERVOIR
    grw_rovr=data[vol]['rovr'].loc[np.logical_and(data[vol].index.dayofyear>=param['cstart'].values[0][0],data[vol].index.dayofyear<=param['cstage_doy'].values[3][0])] / param['darea'].values[0][0] * 1000
    output['grw_rovr']=grw_rovr.groupby(grw_rovr.index.year).sum()
    
    #ANNUAL CAPTURED DRAIN FLOW BY THE RESERVOIR
    rcap=data[vol]['rcap'] / param['darea'].values[0][0] * 1000
    output['rcap']=rcap.groupby(rcap.index.year).sum()
    
    #GROWING SEASON CAPTURED DRAIN FLOW BY THE RESERVOIR
    grw_rcap=data[vol]['rcap'].loc[np.logical_and(data[vol].index.dayofyear>=param['cstart'].values[0][0],data[vol].index.dayofyear<=param['cstage_doy'].values[3][0])] / param['darea'].values[0][0] * 1000
    output['grw_rcap']=grw_rcap.groupby(grw_rcap.index.year).sum()
    
    #NUMBER OF DAYS OF DEFICIT WATER STRESS FOR THE CROP
    grw_ks_day=data[vol]['ks'].loc[np.logical_and(data[vol]['ks'] < 1,np.logical_and(data[vol].index.month>5,data[vol].index.month<9))]
    output['grw_ks_day']=grw_ks_day.groupby(grw_ks_day.index.year).count()
    
    #ANNUAL NITRATE LOAD
    output['no3l']=data[vol]['no3l'].groupby(data[vol].index.year).sum()
    
    #ANNUAL NITRATE LOAD THAT OVERFLOWED THE RESERVOIR
    output['no3l_ovr']=data[vol]['no3l_ovr'].groupby(data[vol].index.year).sum()
    
    #ANNUAL NITRATE LOAD CAPTURED BY THE RESERVOIR
    output['no3l_cap']=data[vol]['no3l_cap'].groupby(data[vol].index.year).sum()
    
    #GROWING SEASON NITRATE LOAD
    grw_no3l=data[vol]['no3l'].loc[np.logical_and(data[vol].index.dayofyear>=param['cstart'].values[0][0],data[vol].index.dayofyear<=param['cstage_doy'].values[3][0])]
    output['grw_no3l']=grw_no3l.groupby(grw_no3l.index.year).sum()
    
    #GROWING SEASON NITRATE LOAD THAT OVERFLOWED THE RESERVOIR
    grw_no3l_ovr=data[vol]['no3l_ovr'].loc[np.logical_and(data[vol].index.dayofyear>=param['cstart'].values[0][0],data[vol].index.dayofyear<=param['cstage_doy'].values[3][0])]
    output['grw_no3l_ovr']=grw_no3l_ovr.groupby(grw_no3l_ovr.index.year).sum()
    
    #GROWING SEASON NITRATE LOAD CAPTURED BY THE RESERVOIR
    grw_no3l_cap=data[vol]['no3l_cap'].loc[np.logical_and(data[vol].index.dayofyear>=param['cstart'].values[0][0],data[vol].index.dayofyear<=param['cstage_doy'].values[3][0])]
    output['grw_no3l_cap']=grw_no3l_cap.groupby(grw_no3l_cap.index.year).sum()
    
    #ANNUAL SOLUBLE REACTIVE PHOSPHORUS LOAD
    output['srpl']=data[vol]['srpl'].groupby(data[vol].index.year).sum()
    
    #ANNUAL SOLUBLE REACTIVE PHOSPHORUS LOAD THAT OVERFLOWED THE RESERVOIR
    output['srpl_ovr']=data[vol]['srpl_ovr'].groupby(data[vol].index.year).sum()
    
    #ANNUAL SOLUBLE REACTIVE PHOSPHORUS LOAD CAPTURED BY THE RESERVOIR
    output['srpl_cap']=data[vol]['srpl_cap'].groupby(data[vol].index.year).sum()
    
    #GROWING SEASON SOLUBLE REACTIVE PHOSPHORUS LOAD
    grw_srpl=data[vol]['srpl'].loc[np.logical_and(data[vol].index.dayofyear>=param['cstart'].values[0][0],data[vol].index.dayofyear<=param['cstage_doy'].values[3][0])]
    output['grw_srpl']=grw_srpl.groupby(grw_srpl.index.year).sum()
    
    #GROWING SEASON SOLUBLE REACTIVE PHOSPHORUS LOAD THAT OVERFLOWED THE RESERVOIR
    grw_srpl_ovr=data[vol]['srpl_ovr'].loc[np.logical_and(data[vol].index.dayofyear>=param['cstart'].values[0][0],data[vol].index.dayofyear<=param['cstage_doy'].values[3][0])]
    output['grw_srpl_ovr']=grw_srpl_ovr.groupby(grw_srpl_ovr.index.year).sum()
    
    #GROWING SEASON SOLUBLE REACTIVE PHOSPHORUS LOAD CAPTURED BY THE RESERVOIR
    grw_srpl_cap=data[vol]['srpl_cap'].loc[np.logical_and(data[vol].index.dayofyear>=param['cstart'].values[0][0],data[vol].index.dayofyear<=param['cstage_doy'].values[3][0])]
    output['grw_srpl_cap']=grw_srpl_cap.groupby(grw_srpl_cap.index.year).sum()
    
    #COPY ALL OUTPUT FROM A PARTICULAR RESERVOIR VOLUME TO A DICTIONARY AND WRITE TO AN EXCEL SHEET
    dic[vol]=output.copy()