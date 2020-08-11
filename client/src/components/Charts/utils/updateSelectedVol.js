import updateChartData from './updateChartData';

function updateSelectedVol(
  vol,
  chartData,
  active,
  annualFilter,
  setSelectedVol,
  updateSelectedChartData
) {
  setSelectedVol(vol);
  const data = updateChartData(chartData, active, annualFilter, vol);
  updateSelectedChartData(data);
}

export default updateSelectedVol;
