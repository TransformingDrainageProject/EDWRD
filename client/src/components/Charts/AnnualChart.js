import React from 'react';
import {
  VictoryAxis,
  VictoryChart,
  VictoryArea,
  VictoryLine,
  VictoryGroup,
  VictoryScatter,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
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
  chartData,
  color,
  showOutliers,
  showPercentiles,
  unitLabel,
}) => (
  <VictoryChart
    theme={VictoryTheme.material}
    containerComponent={<VictoryVoronoiContainer />}
    domainPadding={15}
    height={300}
    padding={{ left: 66, bottom: 50, right: 15, top: 15 }}
    style={{ parent: { border: '1px solid #ccc' } }}
  >
    {showPercentiles ? (
      <VictoryGroup>
        <VictoryArea
          style={{ data: { fill: colorSchemes[color].areaFill } }}
          data={chartData.area}
          interpolation="natural"
        />
        <VictoryLine
          style={{
            data: { stroke: colorSchemes[color].lineStroke, strokeWidth: 2 },
          }}
          data={chartData.area.map((data) => ({ x: data.x, y: data.y0 }))}
          interpolation="natural"
        />
        <VictoryLine
          style={{
            data: { stroke: colorSchemes[color].lineStroke, strokeWidth: 2 },
          }}
          data={chartData.area.map((data) => ({ x: data.x, y: data.y }))}
          interpolation="natural"
        />
      </VictoryGroup>
    ) : null}
    <VictoryLine
      style={{
        data: { stroke: colorSchemes[color].lineStroke },
        parent: { border: '1px solid #ccc' },
      }}
      data={chartData.average}
      interpolation="natural"
    />
    <VictoryGroup>
      <VictoryScatter
        style={{ data: { fill: colorSchemes[color].lineStroke } }}
        data={chartData.average}
        labels={({ datum }) => datum.y}
        labelComponent={
          <VictoryTooltip
            flyoutStyle={{ stroke: colorSchemes[color].lineStroke }}
          />
        }
        size={5}
      />
      {showOutliers ? (
        <VictoryScatter
          style={{
            data: {
              fill: '#bdbdbd',
              fillOpacity: 0.7,
              stroke: '#343434',
              strokeWidth: 0.5,
            },
          }}
          data={chartData.outlier}
          labels={({ datum }) => `Year: ${datum.year}\nValue: ${datum.y}`}
          labelComponent={
            <VictoryTooltip
              flyoutPadding={{ left: 10, right: 10, top: 5, bottom: 5 }}
              flyoutStyle={{ stroke: '#bdbdbd' }}
            />
          }
          size={2}
        />
      ) : null}
    </VictoryGroup>
    <VictoryAxis
      dependentAxis
      style={{ axisLabel: { padding: 46 } }}
      label={unitLabel}
    />
    <VictoryAxis
      style={{ axisLabel: { padding: 30 } }}
      label="Reservoir Area (Depth = 10 ft)"
    />
  </VictoryChart>
);

export default AnnualChart;
