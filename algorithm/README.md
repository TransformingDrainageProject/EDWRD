# How to run the algorithm

## Prerequisites

- [Python 3](https://www.python.org/) is required for running the EDWRD algorithm scripts. EDWRD specifically uses Python 3.7.
- It is recommended you set up a virtual environment using [venv](https://www.python.org/download/releases/3.0/), conda, etc.

## Steps

1. Download the contents of the `algorithm` folder.
2. (Optional) Set up and activate your virtual environment.
3. Run `pip install -r requirements.txt` to install the dependencies.
4. Run `python example.py`.

## Notes

- By default, `example.py` will use `dpac_in_input.txt` for the daily values and `dpac_in_param.txt` for the parameters. Both of these files are located in the `example_datasets` directory.
- `example.py` will create three Excel spreadsheets: `daily_output.xlsx`, `monthly_output.xlsx`, and `annual_output.xlsx`.
- A second example dataset, `serf_ia`, is available in the `example_datasets` folder.


Copyright 2020, Benjamin Reinhart, Jane Frankenberger, Chris Hay, Benjamin Hancock

This file is part of Evaluating Drainage Water Recycling Decisions (EDWRD).

EDWRD is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

EDWRD is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with EDWRD.  If not, see <https://www.gnu.org/licenses/>.
