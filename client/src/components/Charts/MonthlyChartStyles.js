export const colorScales = {
  blue: ['#bdd7e7', '#6baed6', '#2171b5'],
  grey: ['#cccccc', '#969696', '#525252'],
  yellow: ['#fed98e', '#fe9929', '#cc4c02'],
};

export function getVariableColor(active, variableName, variableClasses) {
  let inflow = [];
  let outflow = [];
  let other = [];

  active.forEach((variable) => {
    if (variableClasses.inflow.includes(variable)) {
      inflow.push(variable);
    } else if (variableClasses.outflow.includes(variable)) {
      outflow.push(variable);
    } else {
      other.push(variable);
    }
  });

  let color = '#000000';
  if (inflow.includes(variableName)) {
    color = colorScales.blue[inflow.indexOf(variableName)];
  } else if (outflow.includes(variableName)) {
    color = colorScales.yellow[outflow.indexOf(variableName)];
  } else {
    color = colorScales.grey[other.indexOf(variableName)];
  }

  return color;
}

export function getStyles(active, variableClasses) {
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
      data: { stroke: getVariableColor(active, key, variableClasses) },
      parent: { border: '1px solid #ccc' },
    }),
    lineMonthly: (key) => ({
      data: {
        stroke: getVariableColor(active, key, variableClasses),
      },
      parent: { border: '1px solid #ccc' },
    }),
    scatter: (key) => ({
      data: { fill: getVariableColor(active, key, variableClasses) },
    }),
    tooltip: { fontSize: 6 },
  };
}

export function getLegendYPosition(active) {
  return active.length < 4
    ? 275
    : active.length < 7
    ? 265
    : active.length < 10
    ? 255
    : 245;
}

export function getChartPadding(active) {
  return {
    left: 50,
    bottom: 45,
    right: 45,
    top:
      active.length < 4
        ? 35
        : active.length < 7
        ? 45
        : active.length < 10
        ? 58
        : 73,
  };
}
