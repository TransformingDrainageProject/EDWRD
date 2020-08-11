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

const colors = [
  '#a6cee3',
  '#1f78b4',
  '#b2df8a',
  '#33a02c',
  '#fb9a99',
  '#e31a1c',
  '#fdbf6f',
  '#ff7f00',
  '#cab2d6',
  '#6a3d9a',
  '#ffff99',
  '#b15928',
];

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

function prepDataForMonthlyStackedBars(data, waterInKeys) {
  let waterInStacks = [];
  let waterOutStacks = [];

  Object.keys(data).forEach((key) => {
    if (waterInKeys.includes(key)) {
      waterInStacks.push(data[key]);
    } else {
      waterOutStacks.push(data[key]);
    }
  });

  return [waterInStacks, waterOutStacks];
}

const MonthlyChart = ({
  active,
  chartData,
  color,
  datasetNames,
  annualFilter,
  unitLabel,
  rdep,
  unit_type,
  waterInputs,
}) => {
  const monthlyData = prepDataForMonthlyStackedBars(chartData, waterInputs);

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={15}
      height={300}
      padding={{
        left: 66,
        bottom:
          active.length < 4
            ? 80
            : active.length < 7
            ? 90
            : active.length < 10
            ? 100
            : 110,
        right: 15,
        top: 15,
      }}
      style={{ parent: { border: '1px solid #ccc' } }}
    >
      {annualFilter === 'all' ? (
        active.map((key, idx) => {
          if (annualFilter === 'all') {
            return (
              <VictoryGroup key={`vg-${key}`} categories={months}>
                <VictoryLine
                  style={{
                    data: { stroke: colors[idx] },
                    parent: { border: '1px solid #ccc' },
                  }}
                  data={chartData[key]}
                  interpolation="monotoneX"
                />
                <VictoryScatter
                  style={{ data: { fill: colors[idx] } }}
                  data={chartData[key]}
                  labels={({ datum }) => datum.y.toFixed(2)}
                  labelComponent={
                    <VictoryTooltip flyoutStyle={{ stroke: colors[idx] }} />
                  }
                  size={3}
                />
              </VictoryGroup>
            );
          }
        })
      ) : (
        <VictoryGroup offset={5}>
          <VictoryStack colorScale={'blue'}>
            {monthlyData[0].map((data, index) => (
              <VictoryBar
                key={`vb-${index}`}
                data={data}
                labels={({ datum }) => `${datum.name}: ${datum.y.toFixed(2)}`}
                labelComponent={
                  <VictoryTooltip style={{ fontSize: 6 }} flyoutWidth={120} />
                }
              />
            ))}
          </VictoryStack>
          <VictoryStack colorScale={'red'}>
            {monthlyData[1].map((data, index) => (
              <VictoryBar
                key={`vb-${index}`}
                data={data}
                labels={({ datum }) => `${datum.name}: ${datum.y.toFixed(2)}`}
                labelComponent={
                  <VictoryTooltip style={{ fontSize: 6 }} flyoutWidth={120} />
                }
              />
            ))}
          </VictoryStack>
        </VictoryGroup>
      )}
      <VictoryAxis
        dependentAxis
        style={{ axisLabel: { padding: 46 } }}
        label={unitLabel}
      />
      <VictoryAxis
        style={{ axisLabel: { padding: 30 }, tickLabels: { angle: 45 } }}
        label="Month"
      />
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
        data={active.map((key, idx) => ({
          name: datasetNames.filter((dataset) => dataset.key === key)[0].title,
          symbol: { type: 'minus', fill: colors[idx] },
        }))}
      />
    </VictoryChart>
  );
};

export default MonthlyChart;
