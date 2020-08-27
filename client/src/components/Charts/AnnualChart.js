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

import numberWithCommas from './utils/numberWithCommas';

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

const AnnualChart = ({
  annualFilter,
  avgLineOnly,
  chartData,
  rdep,
  unitType,
}) => (
  <VictoryChart
    theme={VictoryTheme.material}
    domainPadding={15}
    height={300}
    padding={{ left: 50, bottom: 50, right: 15, top: 15 }}
    style={{ parent: { border: '1px solid #ccc' } }}
  >
    <VictoryAxis
      dependentAxis
      style={{
        axisLabel: { padding: 36, fontSize: 8 },
        tickLabels: { fontSize: 6 },
      }}
      label={chartData.unit}
    />
    <VictoryAxis
      style={{
        axisLabel: { padding: 30, fontSize: 8 },
        tickLabels: { fontSize: 6 },
      }}
      label={
        unitType === 'us'
          ? `Reservoir Area (ac), depth = ${rdep.toFixed(1)}ft`
          : `Reservoir Area (ha), depth = ${rdep.toFixed(1)}m`
      }
      tickFormat={(t) => numberWithCommas(t)}
    />
    {annualFilter === 'all' ? (
      <VictoryGroup>
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
          labels={({ datum }) =>
            numberWithCommas(datum.y.toFixed(chartData.precision))
          }
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
            data={chartData.values.yearly}
            size={2}
          />
        ) : null}
      </VictoryGroup>
    ) : (
      <VictoryBar
        style={{ data: { fill: colorSchemes[color].areaFill } }}
        data={chartData.values.yearly.filter(
          (data) => data.year === parseInt(annualFilter)
        )}
        labels={({ datum }) =>
          numberWithCommas(datum.y.toFixed(chartData.precision))
        }
        labelComponent={
          <VictoryTooltip
            flyoutStyle={{ stroke: colorSchemes[color].lineStroke }}
          />
        }
      />
    )}
  </VictoryChart>
);

export default AnnualChart;
