import openpyxl
from openpyxl.styles import Font


def format_summary(summary_data):
    summary = {
        "overview": [
            {
                "a": "Location",
                "b": summary_data["location"]
            },
            {
                "a": "Units",
                "b": summary_data["units"]
            },
            {
                "a": "Analysis type",
                "b": summary_data["analysisType"]
            },
            {
                "a": "Custom Parameter file",
                "b": summary_data["customParameterFile"]
            },
            {
                "a": "Daily time-series",
                "b": summary_data["dailyTimeSeries"]
            },
        ],
        "fieldSettings": [
            {
                "a": "Soil type",
                "b": summary_data["soil"]
            },
            {
                "a": "Average tile drain depth",
                "b": summary_data["zr"],
                "c": {
                    "unit": {
                        "us": "feet",
                        "metric": "meters"
                    }
                }
            },
            {
                "a": "Drained area",
                "b": summary_data["darea"],
                "c": {
                    "unit": {
                        "us": "acres",
                        "metric": "hectares"
                    }
                }
            },
            {
                "a": "Surface runoff",
                "b": summary_data["dareaIncSurfaceRunoff"]
            },
            {
                "a": "Irrigated area",
                "b": summary_data["iarea"],
                "c": {
                    "unit": {
                        "us": "acres",
                        "metric": "hectares"
                    }
                }
            },
            {
                "a": "Reservoir area",
                "b": summary_data["rarea"],
                "c": {
                    "unit": {
                        "us": "acres",
                        "metric": "hectares"
                    }
                }
            },
            {
                "a": "Average reservoir depth",
                "b": summary_data["rdep"],
                "c": {
                    "unit": {
                        "us": "feet",
                        "metric": "meters"
                    }
                }
            }
        ],
        "cropMgmtSettings": [
            {
                "a": "Crop",
                "b": summary_data["crop"]
            },
            {
                "a": "Irrigation depth",
                "b": summary_data["irrdep"],
                "c": {
                    "unit": {
                        "us": "inches",
                        "metric": "millimeters"
                    }
                }
            },
            {
                "a": "Minimum irrigation depth",
                "b": summary_data["irrdepMin"]
            }
        ],
        "soilProfileSettings": [
            {
                "a": "Soil profile field capacity",
                "b": summary_data["zrfc"],
                "c": "fraction"
            },
            {
                "a": "Soil profile wilting point",
                "b": summary_data["zrwp"],
                "c": "fraction"
            },
            {
                "a": "Depth of evaporation layer",
                "b": summary_data["ze"],
                "c": {
                    "unit": {
                        "us": "feet",
                        "metric": "meters"
                    }
                }
            },
            {
                "a": "Evaporation layer field capacity",
                "b": summary_data["zefc"],
                "c": "fraction"
            },
            {
                "a": "Evaporation layer wilting point",
                "b": summary_data["zewp"],
                "c": "fraction"
            },
            {
                "a": "Readily evaporable water",
                "b": summary_data["rew"],
                "c": {
                    "unit": {
                        "us": "inches",
                        "metric": "millimeters"
                    }
                }
            }
        ],
        "reservoirSettings": [
            {
                "a": "Seepage rate",
                "b": summary_data["rseep"],
                "c": {
                    "unit": {
                        "us": "inches per day",
                        "metric": "millimeters per day"
                    }
                }
            },
            {
                "a": "Minimum depth for irrigation",
                "b": summary_data["rdepMin"],
                "c": {
                    "unit": {
                        "us": "feet",
                        "metric": "meters"
                    }
                }
            },
        ],
        "growingNongrowingSeasons": [
            {
                "a": "Planting Date",
                "b": summary_data["plantDateStart"].split("T")[0]
            },
            {
                "a": "Initial establishment",
                "b": summary_data["initDateStart"].split("T")[0],
                "c": summary_data["initDateEnd"].split("T")[0]
            },
            {
                "a": "Development",
                "b": summary_data["devDateStart"].split("T")[0],
                "c": summary_data["devDateEnd"].split("T")[0]
            },
            {
                "a": "Mid-season",
                "b": summary_data["midDateStart"].split("T")[0],
                "c": summary_data["midDateEnd"].split("T")[0]
            },
            {
                "a": "Late season",
                "b": summary_data["lateDateStart"].split("T")[0],
                "c": summary_data["lateDateEnd"].split("T")[0]
            },
            {
                "a": "Harvest date",
                "b": summary_data["harvestDateStart"].split("T")[0],
            },
            {
                "a": "Soil freeze",
                "b": summary_data["soilDateStart"].split("T")[0],
                "c": summary_data["soilDateEnd"].split("T")[0]
            }
        ],
        "cropCoefficientAndHeight": [
            {
                "a": "Crop coefficient, Initial",
                "b": summary_data["initKC"]
            },
            {
                "a": "Crop coefficient, Mid-season",
                "b": summary_data["midKC"]
            },
            {
                "a": "Crop height, Initial",
                "b": summary_data["initCropHeight"]
            },
            {
                "a": "Crop height, Mid-season",
                "b": summary_data["midCropHeight"]
            }
        ],
    }

    return summary


def create_summary_sheet(spreadsheet, summary_overview, unit_type):
    # open the existing workbook
    workbook = openpyxl.load_workbook(filename=spreadsheet)

    # create and activate new worksheet
    workbook.create_sheet(title="Summary")
    worksheet = workbook["Summary"]

    summary_data = format_summary(summary_overview)

    header_font = Font(bold=True, size=13)

    # write overview
    for index, item in enumerate(summary_data["overview"]):
        worksheet["A" + str(1 + index)] = item["a"]
        worksheet["B" + str(1 + index)] = item["b"]
        if "c" in item.keys():
            if type(item["c"]) is dict:
                worksheet["C" + str(1 + index)] = item["c"]["unit"][unit_type]
            else:
                worksheet["C" + str(1 + index)] = item["c"]

    # write field settings
    worksheet["A7"].font = header_font
    worksheet["A7"] = "Field Settings"
    for index, item in enumerate(summary_data["fieldSettings"]):
        worksheet["A" + str(8 + index)] = item["a"]
        worksheet["B" + str(8 + index)] = item["b"]
        if "c" in item.keys():
            if type(item["c"]) is dict:
                worksheet["C" + str(8 + index)] = item["c"]["unit"][unit_type]
            else:
                worksheet["C" + str(8 + index)] = item["c"]

    # write crop and management settings
    worksheet["A16"].font = header_font
    worksheet["A16"] = "Crop and Management Settings"
    for index, item in enumerate(summary_data["cropMgmtSettings"]):
        worksheet["A" + str(17 + index)] = item["a"]
        worksheet["B" + str(17 + index)] = item["b"]
        if "c" in item.keys():
            if type(item["c"]) is dict:
                worksheet["C" + str(17 + index)] = item["c"]["unit"][unit_type]
            else:
                worksheet["C" + str(17 + index)] = item["c"]

    # write soil profile settings (advanced)
    worksheet["A21"].font = header_font
    worksheet["A21"] = "Soil Profile Settings (Advanced)"
    for index, item in enumerate(summary_data["soilProfileSettings"]):
        worksheet["A" + str(22 + index)] = item["a"]
        worksheet["B" + str(22 + index)] = item["b"]
        if "c" in item.keys():
            if type(item["c"]) is dict:
                worksheet["C" + str(22 + index)] = item["c"]["unit"][unit_type]
            else:
                worksheet["C" + str(22 + index)] = item["c"]

    # write reservoir settings (advanced)
    worksheet["A29"].font = header_font
    worksheet["A29"] = "Reservoir Settings (Advanced)"
    for index, item in enumerate(summary_data["reservoirSettings"]):
        worksheet["A" + str(30 + index)] = item["a"]
        worksheet["B" + str(30 + index)] = item["b"]
        if "c" in item.keys():
            if type(item["c"]) is dict:
                worksheet["C" + str(30 + index)] = item["c"]["unit"][unit_type]
            else:
                worksheet["C" + str(30 + index)] = item["c"]

    # write growing and non-growing seasons (advanced)
    worksheet["A33"].font = header_font
    worksheet["A33"] = "Growing and Non-Growing Seasons (Advanced)"
    for index, item in enumerate(summary_data["growingNongrowingSeasons"]):
        worksheet["A" + str(34 + index)] = item["a"]
        worksheet["B" + str(34 + index)] = item["b"]
        if "c" in item.keys():
            if type(item["c"]) is dict:
                worksheet["C" + str(34 + index)] = item["c"]["unit"][unit_type]
            else:
                worksheet["C" + str(34 + index)] = item["c"]

    # write crop coefficient and height (advanced)
    worksheet["A42"].font = header_font
    worksheet["A42"] = "Crop Coefficient and Height (Advanced)"
    for index, item in enumerate(summary_data["cropCoefficientAndHeight"]):
        worksheet["A" + str(43 + index)] = item["a"]
        worksheet["B" + str(43 + index)] = item["b"]
        if "c" in item.keys():
            if type(item["c"]) is dict:
                worksheet["C" + str(43 + index)] = item["c"]["unit"][unit_type]
            else:
                worksheet["C" + str(43 + index)] = item["c"]

    workbook.save(spreadsheet)
