const moment = require('moment');

const Task = require('./Task');

module.exports = {
  createTaskObject: (inputValues, paramValues, rhminWnd) => {
    return new Task({
      inputs: {
        year: inputValues.year,
        month: inputValues.month,
        day: inputValues.day,
        prcp: inputValues.prcp,
        dflw: inputValues.dflw,
        max_upflx: inputValues.max_upflx,
        water_evap: inputValues.water_evap,
        eto: inputValues.eto,
        no3c: inputValues.no3c,
        srpc: inputValues.srpc,
      },
      params: {
        darea: paramValues.darea,
        dareaIncSurfaceRunoff: paramValues.dareaIncSurfaceRunoff,
        iarea: paramValues.iarea,
        rarea: paramValues.rarea,
        rdep: paramValues.rdep,
        rdep_min: paramValues.rdepMin,
        rseep: paramValues.rseep,
        zr: paramValues.zr,
        zrfc: paramValues.zrfc,
        zrwp: paramValues.zrwp,
        ze: paramValues.ze,
        zefc: paramValues.zefc,
        zewp: paramValues.zewp,
        rew: paramValues.rew,
        wind: rhminWnd.wnd,
        rhmin: rhminWnd.rhmin,
        cstart: paramValues.cstart
          ? paramValues.cstart
          : daysFromJan1(paramValues.plantDateStart),
        cstage: paramValues.cstage
          ? paramValues.cstage
          : [
              daysBetween(paramValues.initDateStart, paramValues.initDateEnd),
              daysBetween(paramValues.devDateStart, paramValues.devDateEnd),
              daysBetween(paramValues.midDateStart, paramValues.midDateEnd),
              daysBetween(paramValues.lateDateStart, paramValues.lateDateEnd),
            ],
        ngrw_stage: paramValues.ngrw_stage
          ? paramValues.ngrw_stage
          : [
              daysFromJan1(paramValues.harvestDateStart),
              Math.round(paramValues.freeze),
              Math.round(paramValues.thaw),
            ],
        cht: paramValues.cht
          ? paramValues.cht
          : [
              paramValues.initCropHeight,
              paramValues.midCropHeight,
              paramValues.unitType === 'metric' ? 0.01 : 0.03,
            ],
        kc: paramValues.kc
          ? paramValues.kc
          : [paramValues.initKC, paramValues.midKC, 0.15, 0.44],
        irrdep: paramValues.irrdep,
        irrdep_min: paramValues.irrdepMin,
      },
    });
  },
};

const daysFromJan1 = (date) => {
  return moment(date).diff(moment(`${new Date().getFullYear()}-01-01`), 'days');
};

const daysBetween = (startDate, endDate) => {
  return moment(endDate).diff(moment(startDate), 'days') + 1;
};
