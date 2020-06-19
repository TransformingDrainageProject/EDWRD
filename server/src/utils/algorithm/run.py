import argparse
import json
import os
import sys

from main import edwrd


def main(input_file, param_file):

    param, data, daily_data, annual_output = edwrd(input_file, param_file)

    data.to_excel(os.path.join(os.path.dirname(input_file), "data.xlsx"))

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
