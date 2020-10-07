import updateChartData from './updateChartData';

function updateActive(
  index,
  active,
  setActive,
  chartData,
  annualFilter,
  selectedVol,
  updateSelectedChartData,
  chart
) {
  let newActiveVariables = active.slice();
  if (active.includes(index)) {
    if (index !== 'reservoirVolDep') {
      newActiveVariables = active.filter((i) => i !== index);
    } else {
      newActiveVariables = active.filter((i) => i !== 'reservoirStoredVolume');
      newActiveVariables = active.filter((i) => i !== 'reservoirWaterDepth');
    }
  } else {
    if (index !== 'reservoirVolDep') {
      newActiveVariables.push(index);
    } else {
      newActiveVariables.push('reservoirStoredVolume');
      newActiveVariables.push('reservoirWaterDepth');
    }
  }
  setActive(newActiveVariables);

  const data = updateChartData(
    chart,
    chartData,
    newActiveVariables,
    annualFilter,
    selectedVol
  );
  updateSelectedChartData(data);
}

export default updateActive;
