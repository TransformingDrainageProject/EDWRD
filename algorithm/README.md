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
- EDWRD is an open-source tool licensed under the GNU GPL 3.0 (or later) license. A copy of this license is included in the root directory in file called, "COPYING.txt", or users can go to https://www.gnu.org/licenses/.
