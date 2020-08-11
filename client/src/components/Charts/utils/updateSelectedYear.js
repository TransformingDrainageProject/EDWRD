import updateChartData from './updateChartData';

function updateSelectedYear(
  year,
  chartData,
  active,
  selectedVol,
  setAnnualFilter,
  updateSelectedChartData
) {
  setAnnualFilter(year);
  const data = updateChartData(chartData, active, year, selectedVol);
  updateSelectedChartData(data);
}

export default updateSelectedYear;
