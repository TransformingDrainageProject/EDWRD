import updateChartData from './updateChartData';

function updateSelectedVol(
  vol,
  chart,
  chartData,
  active,
  annualFilter,
  setSelectedVol,
  updateSelectedChartData
) {
  setSelectedVol(vol);
  const data = updateChartData(chart, chartData, active, annualFilter, vol);
  updateSelectedChartData(data);
}

export default updateSelectedVol;
