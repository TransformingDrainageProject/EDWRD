import argparse
import json
import sys

from get_freeze_and_thaw import main as get_freeze_and_thaw
from reverse_geocode import main as get_state_abbreviation


def main(longitude: float, latitude: float) -> None:
    """ 
    Fetches the state name associated with a specified
    point and prints the state's postal abbreviation.

    Parameters:
    longitude (float): Point's longitude
    latitude (float): Point's latitude

    Returns:
    None.
    """
    site_info = {
        "state": get_state_abbreviation(longitude, latitude),
        "soil": get_freeze_and_thaw(longitude, latitude),
    }

    print(json.dumps(site_info))
    sys.stdout.flush()


if __name__ == "__main__":
    # Required arguments when script called from command line
    parser = argparse.ArgumentParser(description="Reverse geocode tool")
    parser.add_argument("longitude", type=float, help="Longitude")
    parser.add_argument("latitude", type=float, help="Latitude")

    # Get passed in arguments
    args = parser.parse_args()
    longitude = args.longitude
    latitude = args.latitude

    main(longitude, latitude)
