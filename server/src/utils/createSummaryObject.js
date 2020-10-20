module.exports = {
  createSummaryObject: (form, session) => {
    const summaryObject = {
      location: `(${form.location.latitude}, ${form.location.longitude})`,
      units: form.unitType === 'us' ? 'U.S. standard' : 'Metric',
      analysisType:
        form.quickAnalysis === 'true' ? 'Quick analysis' : 'In-depth analysis',
      customParameterFile: form.userParam ? session.paramFile : 'None',
      dailyTimeSeries: form.userInput ? session.inputFile : form.stationName,
      soil: soilTypeLookup[form.soilType],
      zr: form.zr,
      darea: form.darea,
      dareaIncSurfaceRunoff: form.dareaIncSurfaceRunoff ? 'Yes' : 'No',
      iarea: form.iarea,
      rarea: form.rarea,
      rdep: form.rdep,
      crop: form.cropSelection,
      irrdep: form.irrdep,
      irrdepMin: form.irrdep === 'deficitOnly' ? form.irrdepMin : 'None',
      zrfc: form.zrfc,
      zrwp: form.zrwp,
      ze: form.ze,
      zefc: form.zefc,
      zewp: form.zewp,
      rew: form.rew,
      rseep: form.rseep,
      rdepMin: form.rdepMin,
      plantDateStart: form.plantDateStart,
      initDateStart: form.initDateStart,
      initDateEnd: form.initDateEnd,
      devDateStart: form.devDateStart,
      devDateEnd: form.devDateEnd,
      midDateStart: form.midDateStart,
      midDateEnd: form.midDateEnd,
      lateDateStart: form.lateDateStart,
      lateDateEnd: form.lateDateEnd,
      harvestDateStart: form.harvestDateStart,
      soilDateStart: form.soilDateStart,
      soilDateEnd: form.soilDateEnd,
      initCropHeight: form.initCropHeight,
      midCropHeight: form.midCropHeight,
      initKC: form.initKC,
      midKC: form.midKC,
    };

    return summaryObject;
  },
};

const soilTypeLookup = {
  loam: 'Loam',
  siltLoam: 'Silt loam',
  silt: 'Silt',
  siltClayLoam: 'Silt Clay Loam',
  siltyClay: 'Silty Clay',
  clay: 'Clay',
};
