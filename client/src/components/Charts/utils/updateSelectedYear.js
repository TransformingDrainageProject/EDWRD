import updateChartData from './updateChartData';

function updateSelectedYear(
  year,
  chart,
  chartData,
  active,
  selectedVol,
  setAnnualFilter,
  updateSelectedChartData
) {
  setAnnualFilter(year);
  const data = updateChartData(chart, chartData, active, year, selectedVol);
  updateSelectedChartData(data);
}

export default updateSelectedYear;
