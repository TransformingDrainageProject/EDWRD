import updateChartData from './updateChartData';

function updateActive(
  index,
  active,
  setActive,
  chartData,
  annualFilter,
  selectedVol,
  updateSelectedChartData
) {
  let newActiveVariables = active.slice();
  if (active.includes(index)) {
    newActiveVariables = active.filter((i) => i !== index);
  } else {
    newActiveVariables.push(index);
  }
  setActive(newActiveVariables);
  const data = updateChartData(
    chartData,
    newActiveVariables,
    annualFilter,
    selectedVol
  );
  updateSelectedChartData(data);
}

export default updateActive;
