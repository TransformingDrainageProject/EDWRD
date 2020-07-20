import React from 'react';
import {
  VictoryAxis,
  VictoryChart,
  VictoryArea,
  VictoryLabel,
  VictoryLine,
  VictoryGroup,
  VictoryScatter,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory';

const ExampleChart = ({ chartData }) => {
  console.log('ExampleChart');
  console.log(chartData);
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      containerComponent={<VictoryVoronoiContainer />}
      domainPadding={15}
      height={300}
      style={{ parent: { border: '1px solid #ccc' } }}
    >
      <VictoryGroup>
        <VictoryArea
          style={{ data: { fill: '#74c476' } }}
          data={chartData.area}
          interpolation="natural"
        />
        <VictoryLine
          style={{ data: { stroke: '#006d2c', strokeWidth: 2 } }}
          data={chartData.area.map((data) => ({ x: data.x, y: data.y0 }))}
          interpolation="natural"
        />
        <VictoryLine
          style={{ data: { stroke: '#006d2c', strokeWidth: 2 } }}
          data={chartData.area.map((data) => ({ x: data.x, y: data.y }))}
          interpolation="natural"
        />
      </VictoryGroup>
      <VictoryLine
        style={{
          data: { stroke: '#006d2c' },
          parent: { border: '1px solid #ccc' },
        }}
        data={chartData.average}
        interpolation="natural"
      />
      {/* <VictoryLabel
        style={{ fill: '#006d2c', fontSize: 8, fontWeight: 'bold' }}
        text={[
          'Values outside the shaded area',
          'have a 1 in 10 chance of occurring',
        ]}
        datum={{ x: '3.5', y: 182 }}
        textAnchor="middle"
      /> */}
      <VictoryGroup>
        <VictoryScatter
          style={{ data: { fill: '#006d2c' } }}
          data={chartData.average}
          labels={({ datum }) => datum.y}
          labelComponent={
            <VictoryTooltip flyoutStyle={{ stroke: '#006d2c' }} />
          }
          size={5}
        />
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
      </VictoryGroup>
      <VictoryAxis
        dependentAxis
        theme={VictoryTheme.material}
        style={{ axisLabel: { padding: 36 } }}
      />
      <VictoryAxis
        style={{ axisLabel: { padding: 30 } }}
        label="Reservoir Area (Depth = 10 ft)"
      />
    </VictoryChart>
  );
};

export default ExampleChart;
