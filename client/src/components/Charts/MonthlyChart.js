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
} from 'victory';

import numberWithCommas from './utils/numberWithCommas';

const colorScales = {
  blue: ['#bdd7e7', '#6baed6', '#2171b5'],
  grey: ['#cccccc', '#969696', '#525252'],
  yellow: [
    '#fee391',
    '#fec44f',
    '#fe9929',
    '#ec7014',
    '#cc4c02',
    '#993404',
    '#662506',
  ],
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
      waterInStacks.push(data[key].values);
    } else if (variableClasses.outflow.includes(key)) {
      waterOutStacks.push(data[key].values);
    } else {
      waterOtherLines.push(data[key].values);
      waterOtherKeys.push(key);
    }
  });

  return [waterInStacks, waterOutStacks, waterOtherLines, waterOtherKeys];
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
      const max = getMax(dataset);
      if (max > maxima) maxima = max;
    });
  }

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={15}
      height={300}
      padding={{
        left: 53,
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
      style={{ parent: { border: '1px solid #ccc' } }}
    >
      {active.length > 1 || !active.includes('reservoirWaterDepth') ? (
        <VictoryAxis
          dependentAxis
          style={{
            axisLabel: { padding: 40, fontSize: 8 },
            tickLabels: { fontSize: 6 },
          }}
          label={
            chartData[active[0]].unit === 'gal'
              ? `${chartData[active[0]].unit} per 1,000,000`
              : chartData[active[0]].unit === 'm3'
              ? `${chartData[active[0]].unit} per 1,000`
              : chartData[active[0]].unit
          }
          tickValues={[0.25, 0.5, 0.75, 1]}
          tickFormat={(t) =>
            numberWithCommas(
              (t * maxima).toFixed(datasetNames[active[0]].precision)
            )
          }
        />
      ) : null}
      <VictoryAxis
        style={{
          axisLabel: { padding: 30, fontSize: 8 },
          tickLabels: { fontSize: 6 },
        }}
        label="Month"
      />
      {active.includes('reservoirWaterDepth') ? (
        <VictoryAxis
          dependentAxis
          orientation="right"
          standalone={false}
          style={{
            axisLabel: { padding: 30, fontSize: 8 },
            tickLabels: { fontSize: 6 },
          }}
          label={chartData['reservoirWaterDepth'].unit}
          tickValues={[0.25, 0.5, 0.75, 1]}
          tickFormat={(t) =>
            numberWithCommas(
              t *
                getMax(chartData['reservoirWaterDepth'].values).toFixed(
                  chartData['reservoirWaterDepth'].precision
                )
            )
          }
        />
      ) : null}
      {annualFilter === 'all' ? (
        active.map((key, idx) =>
          key !== 'reservoirWaterDepth' ? (
            <VictoryGroup key={`vg-${key}`} categories={months}>
              <VictoryLine
                style={{
                  data: { stroke: getVariableColor(key, variableClasses) },
                  parent: { border: '1px solid #ccc' },
                }}
                data={chartData[key].values}
                y={(datum) => datum.y / maxima}
                interpolation="monotoneX"
              />
              <VictoryScatter
                style={{
                  data: { fill: getVariableColor(key, variableClasses) },
                }}
                data={chartData[key].values}
                y={(datum) => datum.y / maxima}
                labels={({ datum }) => numberWithCommas(datum.y.toFixed(2))}
                labelComponent={
                  <VictoryTooltip
                    style={{ fontSize: 6 }}
                    flyoutStyle={{
                      stroke: getVariableColor(key, variableClasses),
                    }}
                  />
                }
                size={2}
              />
            </VictoryGroup>
          ) : null
        )
      ) : monthlyData[0].length > 0 || monthlyData[1].length > 1 ? (
        <VictoryGroup offset={10} categories={months}>
          {monthlyData[0].length > 0 ? (
            <VictoryStack colorScale={colorScales.blue}>
              {monthlyData[0].map((data, index) => (
                <VictoryBar
                  key={`vb-inflow-${index}`}
                  barWidth={4}
                  data={data}
                  y={(datum) => datum.y / maxima}
                  labels={({ datum }) =>
                    `${datum.name}: ${numberWithCommas(datum.y.toFixed(2))}`
                  }
                  labelComponent={
                    <VictoryTooltip style={{ fontSize: 6 }} flyoutWidth={120} />
                  }
                />
              ))}
            </VictoryStack>
          ) : null}
          {monthlyData[1].length > 0 ? (
            <VictoryStack colorScale={colorScales.yellow}>
              {monthlyData[1].map((data, index) => (
                <VictoryBar
                  key={`vb-outflow-${index}`}
                  barWidth={4}
                  data={data}
                  y={(datum) => datum.y / maxima}
                  labels={({ datum }) =>
                    `${datum.name}: ${numberWithCommas(datum.y.toFixed(2))}`
                  }
                  labelComponent={
                    <VictoryTooltip style={{ fontSize: 6 }} flyoutWidth={120} />
                  }
                />
              ))}
            </VictoryStack>
          ) : null}
        </VictoryGroup>
      ) : null}
      {annualFilter !== 'all' &&
      monthlyData[2].length > 0 &&
      monthlyData[2].length !== 1 &&
      active.includes('reservoirWaterDepth')
        ? monthlyData[2].map((data, index) => (
            <VictoryGroup key={`vg-other-${index}`} categories={months}>
              <VictoryLine
                style={{
                  data: {
                    stroke: getVariableColor(
                      monthlyData[3][index],
                      variableClasses
                    ),
                  },
                  parent: { border: '1px solid #ccc' },
                }}
                data={data}
                y={(datum) => datum.y / maxima}
                interpolation="monotoneX"
              />
              <VictoryScatter
                style={{
                  data: {
                    fill: getVariableColor(
                      monthlyData[3][index],
                      variableClasses
                    ),
                  },
                }}
                data={data}
                y={(datum) => datum.y / maxima}
                labels={({ datum }) => numberWithCommas(datum.y.toFixed(2))}
                labelComponent={
                  <VictoryTooltip
                    style={{ fontSize: 6 }}
                    flyoutStyle={{
                      stroke: getVariableColor(
                        monthlyData[3][index],
                        variableClasses
                      ),
                    }}
                  />
                }
                size={2}
              />
            </VictoryGroup>
          ))
        : null}
      {active.includes('reservoirWaterDepth') ? (
        <VictoryLine
          style={{
            data: {
              stroke: getVariableColor('reservoirWaterDepth', variableClasses),
            },
            parent: { border: '1px solid #ccc' },
          }}
          data={chartData['reservoirWaterDepth'].values}
          y={(datum) =>
            datum.y / getMax(chartData['reservoirWaterDepth'].values)
          }
          interpolation="monotoneX"
        />
      ) : null}
      {active.includes('reservoirWaterDepth') ? (
        <VictoryScatter
          style={{
            data: {
              fill: getVariableColor('reservoirWaterDepth', variableClasses),
            },
          }}
          data={chartData['reservoirWaterDepth'].values}
          y={(datum) =>
            datum.y / getMax(chartData['reservoirWaterDepth'].values)
          }
          labels={({ datum }) => numberWithCommas(datum.y.toFixed(2))}
          labelComponent={
            <VictoryTooltip
              style={{ fontSize: 6 }}
              flyoutStyle={{
                stroke: getVariableColor(
                  'reservoirWaterDepth',
                  variableClasses
                ),
              }}
            />
          }
          size={2}
        />
      ) : null}
      <VictoryLegend
        x={33}
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
        style={{ border: { stroke: 'black' }, labels: { fontSize: 6 } }}
        data={active.map((key, idx) => {
          const color = getVariableColor(key, variableClasses);

          return {
            name: datasetNames[key].label,
            symbol: { type: 'minus', fill: color },
          };
        })}
      />
    </VictoryChart>
  );
};

export default MonthlyChart;
