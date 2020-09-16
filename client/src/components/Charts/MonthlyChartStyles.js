export const colorScales = {
  blue: ['#bdd7e7', '#6baed6', '#2171b5'],
  grey: ['#cccccc', '#969696', '#525252'],
  yellow: ['#fed98e', '#fe9929', '#cc4c02'],
};

export function getVariableColor(variableName, variableClasses) {
  let color = '#000000';
  if (variableClasses.inflow.includes(variableName)) {
    color = colorScales.blue[variableClasses.inflow.indexOf(variableName)];
  } else if (variableClasses.outflow.includes(variableName)) {
    color = colorScales.yellow[variableClasses.outflow.indexOf(variableName)];
  } else {
    color = colorScales.grey[variableClasses.other.indexOf(variableName)];
  }

  return color;
}

export function getStyles(variableClasses) {
  return {
    axis: {
      axisLabel: { padding: 35, fontSize: 8 },
      tickLabels: { fontSize: 6 },
    },
    chart: {
      parent: {
        border: '1px solid #ccc',
      },
    },
    legend: { border: { stroke: 'black' }, labels: { fontSize: 6 } },
    line: (key) => ({
      data: { stroke: getVariableColor(key, variableClasses) },
      parent: { border: '1px solid #ccc' },
    }),
    lineMonthly: (key) => ({
      data: {
        stroke: getVariableColor(key, variableClasses),
      },
      parent: { border: '1px solid #ccc' },
    }),
    scatter: (key) => ({
      data: { fill: getVariableColor(key, variableClasses) },
    }),
    tooltip: { fontSize: 6 },
  };
}
