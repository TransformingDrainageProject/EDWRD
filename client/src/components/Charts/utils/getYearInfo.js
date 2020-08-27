function getYearInfo(chartData, chart, activeVariables, selectedVol) {
  let uniqueYears = [];
  if (activeVariables.length > 0 && selectedVol) {
    uniqueYears = [
      ...new Set(
        chartData['monthly'][chart][activeVariables[0]].values[
          selectedVol
        ].yearly.map((record) => record.year)
      ),
    ];
  }

  const yearRange =
    uniqueYears.length > 1
      ? ` (${uniqueYears[0]} - ${uniqueYears.slice(-1)[0]})`
      : ` (${uniqueYears[0]})`;

  return { uniqueYears, yearRange };
}

export default getYearInfo;
