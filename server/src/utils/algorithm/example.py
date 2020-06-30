# -*- coding: utf-8 -*-
"""
Created on Tue Sep 17 14:56:57 2019

@author: brein
"""

from main import edwrd


infile = r'Z:\private\MyFiles\OBJ4_TOOLS\EDWRD\EDWRDv2\EDWRD_online\input_data.txt'
pfile = r'Z:\private\MyFiles\OBJ4_TOOLS\EDWRD\EDWRDv2\EDWRD_online\param.txt'

param, data_dic, data, data_user, daily_data, daily_data_user, annual_output, monthly_output = edwrd(infile,pfile)

