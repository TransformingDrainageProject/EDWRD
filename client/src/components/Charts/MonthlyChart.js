import React from 'react';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLegend,
  VictoryLine,
  VictoryGroup,
  VictoryScatter,
  VictoryTheme,
  VictoryTooltip,
} from 'victory';

const colorScale = [
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

const MonthlyChart = ({
  active,
  chartData,
  color,
  datasetNames,
  annualFilter,
  unitLabel,
  rdep,
  unit_type,
}) => (
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
    {active.map((key, idx) => (
      <VictoryGroup key={`vg-${key}`}>
        <VictoryLine
          style={{
            data: { stroke: colorScale[idx] },
            parent: { border: '1px solid #ccc' },
          }}
          data={chartData[key]}
          interpolation="natural"
        />
        <VictoryScatter
          style={{ data: { fill: colorScale[idx] } }}
          data={chartData[key]}
          labels={({ datum }) => datum.y.toFixed(2)}
          labelComponent={
            <VictoryTooltip flyoutStyle={{ stroke: colorScale[idx] }} />
          }
          size={3}
        />
      </VictoryGroup>
    ))}
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
        symbol: { type: 'minus', fill: colorScale[idx] },
      }))}
    />
  </VictoryChart>
);

export default MonthlyChart;
