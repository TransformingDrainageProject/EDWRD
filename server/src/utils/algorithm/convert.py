import json


def convert_input_to_metric(data):
    # convert from inches to millimeters
    data['prcp'] = data['prcp'] * 25.4
    data['dflw'] = data['dflw'] * 25.4
    data['max_upflx'] = data['max_upflx'] * 25.4
    data['water_evap'] = data['water_evap'] * 25.4
    data['eto'] = data['eto'] * 25.4

    return data


def convert_param_to_metric(data):
    data['darea'] = data['darea'] * 0.404686
    data['iarea'] = data['iarea'] * 0.404686
    data['rarea'] = data['rarea'] * 0.404686
    data['rdep'] = data['rdep'] * 0.3048
    data['rdep_min'] = data['rdep_min'] * 0.3048
    data['rseep'] = data['rseep'] * 25.4
    data['zr'] = data['zr'] * 0.3048
    data['ze'] = data['ze'] * 0.3048
    data['rew'] = data['rew'] * 25.4
    data['cht'] = data['cht'] * 0.3048

    if type(data['irrdep'].values[0][0]) != str:
        data['irrdep'] = data['irrdep'] * 25.4

    data['irrdep_min'] = data['irrdep_min'] * 25.4

    return data
