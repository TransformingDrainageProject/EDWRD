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

const color = 'green';

const colorSchemes = {
  blue: {
    areaFill: '#acc1d7',
    lineStroke: '#5983b0',
  },
  green: {
    areaFill: '#9fd7a2',
    lineStroke: '#3faf46',
  },
  yellow: {
    areaFill: '#ffe993',
    lineStroke: '#ffd428',
  },
};

const AnnualChart = ({ annualFilter, avgLineOnly, chartData }) => (
  <VictoryChart
    theme={VictoryTheme.material}
    domainPadding={15}
    height={300}
    padding={{ left: 50, bottom: 45, right: 15, top: 35 }}
    style={{ parent: { border: '1px solid #ccc' } }}
  >
    <VictoryAxis
      dependentAxis
      style={{
        axisLabel: { padding: 36, fontSize: 8 },
        tickLabels: { fontSize: 6 },
      }}
      label={`${chartData.label} (${chartData.unit})`}
    />
    <VictoryAxis
      style={{
        axisLabel: { padding: 30, fontSize: 8 },
        tickLabels: { fontSize: 6 },
      }}
      label={
        chartData.unitType === 'us'
          ? `Reservoir Area (ac), depth = ${chartData.rdep.toFixed(1)}ft`
          : `Reservoir Area (ha), depth = ${chartData.rdep.toFixed(1)}m`
      }
      tickFormat={(t) => t}
    />
    {annualFilter === 'all' ? (
      <VictoryGroup>
        {!avgLineOnly ? (
          <VictoryScatter
            style={{
              data: {
                fill: '#636363',
                fillOpacity: 0.4,
              },
            }}
            symbol={'circle'}
            data={chartData.values.yearly}
            size={2}
          />
        ) : null}
        <VictoryLine
          style={{
            data: { stroke: colorSchemes[color].lineStroke },
            parent: { border: '1px solid #ccc' },
          }}
          data={chartData.values.average}
          interpolation="monotoneX"
        />
        <VictoryScatter
          style={{ data: { fill: colorSchemes[color].lineStroke } }}
          data={chartData.values.average}
          labels={({ datum }) => datum.y.toFixed(chartData.precision)}
          labelComponent={<VictoryTooltip style={{ fontSize: 6 }} />}
          size={3}
        />
      </VictoryGroup>
    ) : (
      <VictoryBar
        style={{ data: { fill: colorSchemes[color].areaFill } }}
        data={chartData.values.yearly.filter(
          (data) => data.year === parseInt(annualFilter)
        )}
        labels={({ datum }) => datum.y.toFixed(chartData.precision)}
        labelComponent={<VictoryTooltip style={{ fontSize: 6 }} />}
      />
    )}
    <VictoryLegend
      x={65}
      y={15}
      orientation="horizontal"
      itemsPerRow={3}
      gutter={20}
      style={{ border: { stroke: 'black' }, labels: { fontSize: 6 } }}
      data={[
        {
          name: 'Annual value',
          symbol: { type: 'circle', fill: '#636363', fillOpacity: 0.7 },
        },
        {
          name: 'Average',
          symbol: { fill: '#3faf46' },
        },
      ]}
    />
  </VictoryChart>
);

export default AnnualChart;
