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
      if (key !== 'reservoirVolDep') {
        data[key] = {
          values: chartData['monthly'][chart][key].values[selectedVol].average,
          unit: chartData['monthly'][chart][key].unit,
          label: chartData['monthly'][chart][key].label,
        };
      } else {
        data['reservoirStoredVolume'] = {
          values:
            chartData['monthly'][chart]['reservoirStoredVolume'].values[
              selectedVol
            ].average,
          unit: chartData['monthly'][chart]['reservoirStoredVolume'].unit,
          label: chartData['monthly'][chart]['reservoirStoredVolume'].label,
        };
        data['reservoirWaterDepth'] = {
          values:
            chartData['monthly'][chart]['reservoirWaterDepth'].values[
              selectedVol
            ].average,
          unit: chartData['monthly'][chart]['reservoirWaterDepth'].unit,
          label: chartData['monthly'][chart]['reservoirWaterDepth'].label,
        };
      }
    });
  } else {
    activeVariables.forEach((key) => {
      if (key !== 'reservoirVolDep') {
        data[key] = {
          values: chartData['monthly'][chart][key].values[
            selectedVol
          ].yearly.filter(
            (dataset) => dataset.year.toString() === selectedYear
          ),
          unit: chartData['monthly'][chart][key].unit,
          label: chartData['monthly'][chart][key].label,
        };
      } else {
        data['reservoirStoredVolume'] = {
          values: chartData['monthly'][chart]['reservoirStoredVolume'].values[
            selectedVol
          ].yearly.filter(
            (dataset) => dataset.year.toString() === selectedYear
          ),
          unit: chartData['monthly'][chart]['reservoirStoredVolume'].unit,
          label: chartData['monthly'][chart]['reservoirStoredVolume'].label,
        };
        data['reservoirWaterDepth'] = {
          values: chartData['monthly'][chart]['reservoirWaterDepth'].values[
            selectedVol
          ].yearly.filter(
            (dataset) => dataset.year.toString() === selectedYear
          ),
          unit: chartData['monthly'][chart]['reservoirWaterDepth'].unit,
          label: chartData['monthly'][chart]['reservoirWaterDepth'].label,
        };
      }
    });
  }

  return data;
}

export default updateChartData;
