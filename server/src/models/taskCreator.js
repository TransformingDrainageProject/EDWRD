const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const moment = require('moment');
const path = require('path');

const Task = require('./Task');

module.exports = {
  createTaskObject: async (workspace, paramValues, rhminWnd) => {
    try {
      const data = [
        {
          darea: paramValues.darea,
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
          cn: 65,
          wind: rhminWnd.wnd[0],
          rhmin: rhminWnd.rhmin[0],
          cstart: daysFromJan1(paramValues.plantDateStart),
          cstage: daysBetween(
            paramValues.initDateStart,
            paramValues.initDateEnd
          ),
          ngrw_stage: daysFromJan1(paramValues.harvestDateStart),
          cht: paramValues.initCropHeight,
          kc: paramValues.initKC,
          fw: 1,
          pfact: 0.55,
          irrdep: paramValues.irrdep,
          irrdep_min: paramValues.irrdepMin,
          resd: 0.3,
          dareaIncSurfaceRunoff: paramValues.dareaIncSurfaceRunoff,
        },
        {
          wind: rhminWnd.wnd[1],
          rhmin: rhminWnd.rhmin[1],
          cstage: daysBetween(paramValues.devDateStart, paramValues.devDateEnd),
          ngrw_stage: Math.round(paramValues.freeze),
          cht: paramValues.midCropHeight,
          kc: paramValues.midKC,
        },
        {
          wind: rhminWnd.wnd[2],
          rhmin: rhminWnd.rhmin[2],
          cstage: daysBetween(paramValues.midDateStart, paramValues.midDateEnd),
          ngrw_stage: Math.round(paramValues.thaw),
          cht: paramValues.unitType === 'metric' ? 0.01 : 0.03,
          kc: 0.15,
        },
        {
          wind: rhminWnd.wnd[3],
          rhmin: rhminWnd.rhmin[3],
          cstage: daysBetween(
            paramValues.lateDateStart,
            paramValues.lateDateEnd
          ),
          kc: 0.44,
        },
        {
          wind: rhminWnd.wnd[4],
          rhmin: rhminWnd.rhmin[4],
        },
        {
          wind: rhminWnd.wnd[5],
          rhmin: rhminWnd.rhmin[5],
        },
        {
          wind: rhminWnd.wnd[6],
          rhmin: rhminWnd.rhmin[6],
        },
        {
          wind: rhminWnd.wnd[7],
          rhmin: rhminWnd.rhmin[7],
        },
        {
          wind: rhminWnd.wnd[8],
          rhmin: rhminWnd.rhmin[8],
        },
        {
          wind: rhminWnd.wnd[9],
          rhmin: rhminWnd.rhmin[9],
        },
        {
          wind: rhminWnd.wnd[10],
          rhmin: rhminWnd.rhmin[10],
        },
        {
          wind: rhminWnd.wnd[11],
          rhmin: rhminWnd.rhmin[11],
        },
      ];

      let header = [];
      Object.keys(data[0]).forEach((key) =>
        header.push({ id: key, title: key })
      );

      const csvWriter = createCsvWriter({
        path: path.resolve(workspace, 'params.csv'),
        header: header,
      });

      return csvWriter
        .writeRecords(data)
        .then(() => {
          return path.resolve(workspace, 'params.csv');
        })
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      throw err;
    }
  },
};

const daysFromJan1 = (date) => {
  return moment(date).diff(moment(`${new Date().getFullYear()}-01-01`), 'days');
};

const daysBetween = (startDate, endDate) => {
  return moment(endDate).diff(moment(startDate), 'days') + 1;
};
