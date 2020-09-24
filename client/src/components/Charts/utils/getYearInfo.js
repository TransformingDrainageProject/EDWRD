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

export function getUniqueYears(chartDataValues) {
  const years = chartDataValues.yearly.map((record) => record.year);
  return [...new Set(years)];
}

export function getYearRange(years) {
  if (years.length > 1) {
    return `(${years[0]} - ${years.slice(-1)[0]})`;
  } else {
    return `(${years[0]})`;
  }
}

export default getYearInfo;
