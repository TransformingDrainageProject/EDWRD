const moment = require('moment');

const Task = require('./Task');

module.exports = {
  createTaskObject: (formValues, rhminWnd) => {
    return new Task({
      params: {
        darea: formValues.darea,
        dareaIncSurfaceRunoff: formValues.dareaIncSurfaceRunoff,
        iarea: formValues.iarea,
        rarea: formValues.rarea,
        rdep: formValues.rdep,
        rseep: formValues.rseep,
        zr: formValues.zr,
        zrfc: formValues.zrfc,
        zrwp: formValues.zrwp,
        ze: formValues.ze,
        zefc: formValues.zefc,
        zewp: formValues.zewp,
        rew: formValues.rew,
        wind: rhminWnd.wnd,
        rhmin: rhminWnd.rhmin,
        cstart: daysFromJan1(formValues.plantDateStart),
        cstage: [
          daysBetween(formValues.initDateStart, formValues.initDateEnd),
          daysBetween(formValues.devDateStart, formValues.devDateEnd),
          daysBetween(formValues.midDateStart, formValues.midDateEnd),
          daysBetween(formValues.lateDateStart, formValues.lateDateEnd),
        ],
        ngrw_stage: [
          daysFromJan1(formValues.harvestDateStart),
          Math.round(formValues.freeze),
          Math.round(formValues.thaw),
        ],
        cht: [
          formValues.initCropHeight,
          formValues.midCropHeight,
          formValues.unitType === 'metric' ? 0.01 : 0.03,
        ],
        kc: [formValues.initKC, formValues.midKC, 0.15, 0.44],
        irrdep: formValues.irrdep,
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
