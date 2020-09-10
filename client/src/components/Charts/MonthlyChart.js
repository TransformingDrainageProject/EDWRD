import React from 'react';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLegend,
  VictoryLine,
  VictoryGroup,
  VictoryScatter,
  VictoryStack,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory';

const colorScales = {
  blue: ['#bdd7e7', '#6baed6', '#2171b5'],
  grey: ['#cccccc', '#969696', '#525252'],
  yellow: ['#fed98e', '#fe9929', '#cc4c02'],
};

let months = {
  x: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
};

function getMax(data) {
  const max = data.reduce((a, b) => {
    if (b.y > a.y) {
      return b;
    } else {
      return a;
    }
  });

  return max.y;
}

function getVariableColor(variableName, variableClasses) {
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

function prepDataForMonthlyStackedBars(data, variableClasses) {
  let waterInStacks = [];
  let waterOutStacks = [];
  let waterOtherLines = [];
  let waterOtherKeys = [];

  Object.keys(data).forEach((key) => {
    if (variableClasses.inflow.includes(key)) {
      waterInStacks.push({ key: key, values: data[key].values });
    } else if (variableClasses.outflow.includes(key)) {
      waterOutStacks.push({ key: key, values: data[key].values });
    } else {
      waterOtherLines.push({ key: key, values: data[key].values });
      waterOtherKeys.push(key);
    }
  });

  return [waterInStacks, waterOutStacks, waterOtherLines, waterOtherKeys];
}

function roundTick(max, value) {
  if (max < 5) {
    return value;
  } else if (max < 10) {
    return Math.round(value);
  } else {
    return Math.ceil(value / 5) * 5;
  }
}

const MonthlyChart = ({
  active,
  annualFilter,
  chartData,
  datasetNames,
  variableClasses,
}) => {
  const monthlyData = prepDataForMonthlyStackedBars(chartData, variableClasses);

  // find overall maximum for current active datasets
  let maxima = 0;
  for (let i = 0; i < 3; i++) {
    monthlyData[i].forEach((dataset) => {
      const max = getMax(dataset.values);
      if (max > maxima) maxima = max;
    });
  }

  let activeNotDepth = -1;
  if (active.length > 0 && active[0] !== 'reservoirWaterDepth') {
    activeNotDepth = 0;
  } else if (active.length > 1 && active[0] !== 'reservoirWaterDepth') {
    activeNotDepth = 0;
  } else {
    activeNotDepth = 1;
  }

  const styles = {
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

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      containerComponent={
        <VictoryVoronoiContainer
          labels={({ datum }) =>
            `${datum.name}: ${datum.y.toFixed(datum.precision)}`
          }
          labelComponent={
            <VictoryTooltip style={styles.tooltip} flyoutWidth={120} />
          }
          voronoiBlacklist={['lines', 'bars']}
        />
      }
      domainPadding={15}
      height={300}
      padding={{
        left: 50,
        bottom:
          active.length < 4
            ? 80
            : active.length < 7
            ? 90
            : active.length < 10
            ? 100
            : 110,
        right: 45,
        top: 15,
      }}
      style={styles.chart}
    >
      {active.length > 1 || !active.includes('reservoirWaterDepth') ? (
        <VictoryAxis
          dependentAxis
          style={styles.axis}
          label={chartData[active[activeNotDepth]].unit}
          tickValues={[0.25, 0.5, 0.75, 1]}
          tickFormat={(t) =>
            (t * maxima).toFixed(datasetNames[active[activeNotDepth]].precision)
          }
        />
      ) : null}
      <VictoryAxis style={styles.axis} label="Month" />
      {active.includes('reservoirWaterDepth') ? (
        <VictoryAxis
          dependentAxis
          orientation="right"
          standalone={false}
          style={styles.axis}
          label={chartData['reservoirWaterDepth'].unit}
          tickValues={[0.25, 0.5, 0.75, 1]}
          tickFormat={(t) =>
            (t * getMax(chartData['reservoirWaterDepth'].values)).toFixed(
              datasetNames['reservoirWaterDepth'].precision
            )
          }
        />
      ) : null}
      {annualFilter === 'all' ? (
        active.map((key, idx) =>
          key !== 'reservoirWaterDepth' ? (
            <VictoryGroup key={`vg-${key}`} categories={months}>
              <VictoryLine
                name="lines"
                style={styles.line(key)}
                data={chartData[key].values}
                y={(datum) => datum.y / maxima}
                interpolation="monotoneX"
              />
              <VictoryScatter
                style={styles.scatter(key)}
                data={chartData[key].values}
                y={(datum) => datum.y / maxima}
                size={2}
              />
            </VictoryGroup>
          ) : null
        )
      ) : monthlyData[0].length > 0 || monthlyData[1].length > 0 ? ( // inflow stacked bar
        <VictoryGroup offset={10} categories={months}>
          {monthlyData[0].length > 0 ? (
            <VictoryStack colorScale={colorScales.blue}>
              {monthlyData[0].map((data, index) => (
                <VictoryBar
                  name="bars"
                  key={`vb-inflow-${index}`}
                  barWidth={4}
                  data={data.values}
                  y={(datum) => datum.y / maxima}
                  labels={({ datum }) =>
                    `${datasetNames[data.key].label}: ${datum.y.toFixed(
                      datasetNames[data.key].precision
                    )}`
                  }
                  labelComponent={
                    <VictoryTooltip style={styles.tooltip} flyoutWidth={120} />
                  }
                />
              ))}
            </VictoryStack>
          ) : null}
          {monthlyData[1].length > 0 ? ( // outflow stacked bar
            <VictoryStack colorScale={colorScales.yellow}>
              {monthlyData[1].map((data, index) => (
                <VictoryBar
                  name="bars"
                  key={`vb-outflow-${index}`}
                  barWidth={4}
                  data={data.values}
                  y={(datum) => datum.y / maxima}
                  labels={({ datum }) =>
                    `${datasetNames[data.key].label}: ${datum.y.toFixed(
                      datasetNames[data.key].precision
                    )}`
                  }
                  labelComponent={
                    <VictoryTooltip style={styles.tooltip} flyoutWidth={120} />
                  }
                />
              ))}
            </VictoryStack>
          ) : null}
        </VictoryGroup>
      ) : null}
      {annualFilter !== 'all' && monthlyData[2].length > 0
        ? monthlyData[2].map((data, index) =>
            data.key !== 'reservoirWaterDepth' ? (
              <VictoryGroup key={`vg-other-${index}`} categories={months}>
                <VictoryLine
                  name="lines"
                  style={styles.lineMonthly(monthlyData[3][index])}
                  data={data.values}
                  y={(datum) => datum.y / maxima}
                  interpolation="monotoneX"
                />
                <VictoryScatter
                  style={styles.scatter(monthlyData[3][index])}
                  data={data.values}
                  y={(datum) => datum.y / maxima}
                  size={2}
                />
              </VictoryGroup>
            ) : null
          )
        : null}
      {active.includes('reservoirWaterDepth') ? (
        <VictoryLine
          name="lines"
          style={styles.lineMonthly('reservoirWaterDepth')}
          data={chartData['reservoirWaterDepth'].values}
          y={(datum) =>
            datum.y / getMax(chartData['reservoirWaterDepth'].values)
          }
          interpolation="monotoneX"
        />
      ) : null}
      {active.includes('reservoirWaterDepth') ? (
        <VictoryScatter
          style={styles.scatter('reservoirWaterDepth')}
          data={chartData['reservoirWaterDepth'].values}
          y={(datum) =>
            datum.y / getMax(chartData['reservoirWaterDepth'].values)
          }
          // labels={({ datum }) => datum.y.toFixed(datum.precision)}
          // labelComponent={
          //   <VictoryTooltip
          //     style={styles.tooltip}
          //     flyoutStyle={{
          //       stroke: getVariableColor(
          //         'reservoirWaterDepth',
          //         variableClasses
          //       ),
          //     }}
          //   />
          // }
          size={2}
        />
      ) : null}
      <VictoryLegend
        x={50}
        y={
          active.length < 4
            ? 275
            : active.length < 7
            ? 265
            : active.length < 10
            ? 255
            : 245
        }
        orientation="horizontal"
        itemsPerRow={3}
        gutter={20}
        style={styles.legend}
        data={active.map((key) => ({
          name: datasetNames[key].label,
          symbol: {
            type: 'minus',
            fill: getVariableColor(key, variableClasses),
          },
        }))}
      />
    </VictoryChart>
  );
};

export default MonthlyChart;
