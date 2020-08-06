const { setGlobalCssModule } = require('reactstrap/lib/utils');

module.exports = function updateChartData(
  chartData,
  activeVariables,
  selectedYear,
  selectedVol
) {
  let data = {};

  if (selectedYear === 'all') {
    activeVariables.forEach((key) => {
      data[key] = chartData['monthly'][key][selectedVol].average;
    });
  } else {
    activeVariables.forEach((key) => {
      data[key] = chartData['monthly'][key][selectedVol].yearly.filter(
        (dataset) => dataset.year.toString() === selectedYear
      );
    });
  }

  return data;
};
