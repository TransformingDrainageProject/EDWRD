import argparse
import json
import os
import sys

import pandas as pd

from main import edwrd


def main(input_file, param_file):

    param, data_dic, data, data_user, daily_data, daily_data_user, annual_output, monthly_output = edwrd(
        input_file, param_file)

    with pd.ExcelWriter(os.path.join(os.path.dirname(input_file), "data.xlsx")) as writer:
        for key in daily_data:
            daily_data[key].to_excel(writer, sheet_name=f"Vol {key}")

    print(json.dumps({'file': os.path.join(
        os.path.dirname(input_file), "data.xlsx")}))
    sys.stdout.flush()


if __name__ == "__main__":
    # Required arguments when script called from command line
    parser = argparse.ArgumentParser(description="Extract raster value")
    parser.add_argument("input_file", type=str,
                        help="Input file containing daily measurements.")
    parser.add_argument("param_file", type=str,
                        help="Parameter file containing parameters from web form.")

    # Get passed in arguments
    args = parser.parse_args()
    input_file = args.input_file
    param_file = args.param_file

    main(input_file, param_file)
