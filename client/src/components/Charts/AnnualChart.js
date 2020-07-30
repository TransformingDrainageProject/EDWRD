import React from 'react';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryGroup,
  VictoryScatter,
  VictoryTheme,
  VictoryTooltip,
} from 'victory';

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

const AnnualChart = ({
  avgLineOnly,
  chartData,
  color,
  annualFilter,
  unitLabel,
  rdep,
  unit_type,
}) => (
  <VictoryChart
    theme={VictoryTheme.material}
    domainPadding={15}
    height={300}
    padding={{ left: 66, bottom: 50, right: 15, top: 15 }}
    style={{ parent: { border: '1px solid #ccc' } }}
  >
    {annualFilter === 'all' ? (
      <VictoryGroup>
        <VictoryLine
          style={{
            data: { stroke: colorSchemes[color].lineStroke },
            parent: { border: '1px solid #ccc' },
          }}
          data={chartData.average}
          interpolation="natural"
        />
        <VictoryScatter
          style={{ data: { fill: colorSchemes[color].lineStroke } }}
          data={chartData.average}
          labels={({ datum }) => datum.y}
          labelComponent={
            <VictoryTooltip
              flyoutStyle={{ stroke: colorSchemes[color].lineStroke }}
            />
          }
          size={3}
        />
        {!avgLineOnly ? (
          <VictoryScatter
            style={{
              data: {
                fill: '#636363',
                fillOpacity: 0.7,
              },
            }}
            symbol={'minus'}
            data={chartData.yearly}
            size={2}
          />
        ) : null}
      </VictoryGroup>
    ) : (
      <VictoryBar
        style={{ data: { fill: colorSchemes[color].areaFill } }}
        data={chartData.yearly.filter(
          (data) => data.year === parseInt(annualFilter)
        )}
        labels={({ datum }) => datum.y.toFixed(2)}
        labelComponent={
          <VictoryTooltip
            flyoutStyle={{ stroke: colorSchemes[color].lineStroke }}
          />
        }
      />
    )}
    <VictoryAxis
      dependentAxis
      style={{ axisLabel: { padding: 46 } }}
      label={unitLabel}
    />
    <VictoryAxis
      style={{ axisLabel: { padding: 30 } }}
      label={
        unit_type === 'us'
          ? `Reservoir Area (ac), depth = ${rdep}ft`
          : `Reservoir Area (ha), depth = ${rdep}m`
      }
    />
  </VictoryChart>
);

export default AnnualChart;
