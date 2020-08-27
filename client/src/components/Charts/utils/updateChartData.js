function updateChartData(
  chart,
  chartData,
  activeVariables,
  selectedYear,
  selectedVol
) {
  let data = {};

  if (selectedYear === 'all') {
    activeVariables.forEach((key) => {
      data[key] = {
        values: chartData['monthly'][chart][key].values[selectedVol].average,
        unit: chartData['monthly'][chart][key].unit,
        label: chartData['monthly'][chart][key].label,
      };
    });
  } else {
    activeVariables.forEach((key) => {
      data[key] = {
        values: chartData['monthly'][chart][key].values[
          selectedVol
        ].yearly.filter((dataset) => dataset.year.toString() === selectedYear),
        unit: chartData['monthly'][chart][key].unit,
        label: chartData['monthly'][chart][key].label,
      };
    });
  }

  return data;
}

export default updateChartData;
