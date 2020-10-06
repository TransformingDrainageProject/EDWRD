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
  console.log('active', active);
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
  console.log('newActiveVariables', newActiveVariables);
  setActive(newActiveVariables);

  const data = updateChartData(
    chart,
    chartData,
    newActiveVariables,
    annualFilter,
    selectedVol
  );
  console.log('data', data);
  updateSelectedChartData(data);
}

export default updateActive;
