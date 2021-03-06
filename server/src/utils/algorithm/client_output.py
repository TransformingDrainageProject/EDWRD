import calendar
import json
import numpy as np

variable_data = json.load(open("./src/utils/algorithm/variables.json"))

annual_variables = variable_data["annual"]
monthly_variables = variable_data["monthly"]

conversion_factors = {
    "in": 0.0393701,
    "ft": 3.28084,
    "gal": 264.172,
    "ac-in": 0.0097,
    "lb/ac": 0.89218,
    "lb": 2.20462
}


def convert_dataframe_to_annual_json(data, rarea, unit_type, variable):
    key = variable["key"]
    column_name = variable["column"]
    description = variable["description"]
    label = variable["label"]
    label2 = variable["label2"]
    unit = variable["unit"][unit_type]
    precision = variable["precision"]

    chart_data = {
        "values": {
            "average": [],
            "yearly": []
        },
        "key": key,
        "label": label,
        "label2": label2,
        "description": description,
        "unit": unit,
        "precision": precision
    }

    conversion_factor = 1.0

    if unit in conversion_factors.keys():
        conversion_factor = conversion_factors[unit]

    # loop through first five volumes
    for area in range(0, 5):
        temp = json.loads(data[area].to_json())[column_name]

        # calculate annual average
        chart_data["values"]["average"].append({
            "x": rarea[area],
            "y": round(data[area][column_name].mean() * conversion_factor, precision)
        })

        # annual records
        chart_data["values"]["yearly"] += [
            {
                "x": rarea[area],
                "y": round(record * conversion_factor, precision),
                "year": int(data[area][column_name].index[index])
            } for index, record in enumerate(data[area][column_name].values)
        ]

    return chart_data


def convert_dataframe_to_monthly_json(data, unit_type, variable, scale):
    key = variable["key"]
    column_name = variable["column"]
    description = variable["description"]
    label = variable["label"]
    unit = variable["unit"][unit_type]
    precision = variable["precision"]

    if key == "reservoirWaterDepth":
        scale = 1

    chart_data = {
        "values": {
            0: {},
            1: {},
            2: {},
            3: {},
            4: {},
        },
        "key": key,
        "label": label,
        "description": description,
        "unit": unit,
        "precision": precision
    }

    if unit == "ac-ft":
        chart_data["unit"] = "acre-feet"

    if unit == "m3":
        chart_data["unit"] = "cubic meters (thousands)"

    conversion_factor = 1.0
    if unit in conversion_factors.keys():
        conversion_factor = conversion_factors[unit]

    # loop through first five volumes
    for vol in range(0, 5):
        chart_data["values"][vol]["average"] = []
        chart_data["values"][vol]["yearly"] = []

        grouped_by_month = data[vol][column_name].groupby(level=1)

        monthly_means = grouped_by_month.aggregate(np.mean).values

        for month in range(0, len(monthly_means)):
            chart_data["values"][vol]["average"].append({
                "x": calendar.month_abbr[month + 1],
                "y": (monthly_means[month] * conversion_factor) / scale,
                "precision": precision,
                "name": label
            })

        # annual records
        unique_years = data[vol][column_name].index.get_level_values(
            0).unique()
        chart_data["values"][vol]["yearly"] = []
        for year in unique_years:
            annual_monthly_values = data[vol][column_name][data[vol]
                                                           [column_name].index.get_level_values(0) == year]

            chart_data["values"][vol]["yearly"] += [{"x": calendar.month_abbr[month + 1],
                                                     "y": (val * conversion_factor) / scale, "year": year, "precision": precision,
                                                     "name": label} for month, val in enumerate(annual_monthly_values)]

    return chart_data


def get_annual_data(annual_output, reservoir_area, unit_type):
    annual_data = {
        "irrigationMetrics": {},
        "waterQualityMetrics": {
            "real": {},
            "percent": {}
        }
    }

    for category in annual_data.keys():
        if category == "waterQualityMetrics":
            for variable in annual_variables[category]["real"]:
                annual_data[category]["real"][variable["key"]] = convert_dataframe_to_annual_json(
                    annual_output,
                    reservoir_area,
                    unit_type,
                    variable
                )
            for variable in annual_variables[category]["percent"]:
                annual_data[category]["percent"][variable["key"]] = convert_dataframe_to_annual_json(
                    annual_output,
                    reservoir_area,
                    unit_type,
                    variable
                )
        else:
            for variable in annual_variables[category]:
                annual_data[category][variable["key"]] = convert_dataframe_to_annual_json(
                    annual_output,
                    reservoir_area,
                    unit_type,
                    variable,
                )

    return annual_data


def get_monthly_data(monthly_output, reservoir_area, unit_type):
    monthly_data = {
        "fieldWaterBalance": {},
        "nutrientCaptureOverflow": {},
        "reservoirWaterBalance": {}
    }

    for category in monthly_data.keys():
        for variable in monthly_variables[category]:
            scale = 1.0
            if category == "reservoirWaterBalance":
                # if unit_type == "us":
                #     scale = 1000000.0
                # else:
                #     scale = 1000.0
                if unit_type == "metric":
                    scale = 1000.0
            monthly_data[category][variable["key"]] = convert_dataframe_to_monthly_json(
                monthly_output,
                unit_type,
                variable,
                scale
            )

    return monthly_data
