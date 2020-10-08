# -*- coding: utf-8 -*-
"""
Created on Tue Sep 17 14:56:57 2019

@author: brein
"""

from main import edwrd


infile = r'...\input_data.txt'
pfile = r'...\param.txt'

param, output_dic, daily_data, daily_data_user, annual_output, monthly_output = edwrd(infile,pfile)

