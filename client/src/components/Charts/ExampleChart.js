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
} from 'victory';

const areaData = [
  { x: '1', y: 105.39, y0: 141.66 },
  { x: '2', y: 103.4, y0: 139.08 },
  { x: '3', y: 116.64, y0: 163.28 },
  { x: '4', y: 104.95, y0: 140.39 },
  { x: '5', y: 104.95, y0: 140.39 },
  { x: '6', y: 116.64, y0: 163.28 },
];
const lineData = [
  { x: '1', y: 124.47 },
  { x: '2', y: 122.46 },
  { x: '3', y: 136.44 },
  { x: '4', y: 124.38 },
  { x: '5', y: 124.38 },
  { x: '6', y: 136.44 },
];
const outlierData = [
  { x: '1', y: 96.86, label: '1990' },
  { x: '1', y: 97.8, label: '2006' },
  { x: '1', y: 104.48, label: '2008' },
  { x: '1', y: 160.43, label: '1993' },
  { x: '1', y: 147.062, label: '1995' },
  { x: '1', y: 147.94, label: '1996' },
  { x: '2', y: 94.2, label: '1990' },
  { x: '2', y: 102.4, label: '2006' },
  { x: '2', y: 102.33, label: '2008' },
  { x: '2', y: 156.44, label: '1993' },
  { x: '2', y: 141.8, label: '1995' },
  { x: '2', y: 141.91, label: '1996' },
  { x: '3', y: 98.8, label: '2002' },
  { x: '3', y: 105.71, label: '2006' },
  { x: '3', y: 112.613, label: '2007' },
  { x: '3', y: 166.77, label: '1987' },
  { x: '3', y: 172.8, label: '2010' },
  { x: '3', y: 172.96, label: '2011' },
  { x: '4', y: 97.13, label: '1990' },
  { x: '4', y: 98.16, label: '2006' },
  { x: '4', y: 104.81, label: '2008' },
  { x: '4', y: 159.42, label: '1993' },
  { x: '4', y: 145.18, label: '1995' },
  { x: '4', y: 148.51, label: '1996' },
  { x: '5', y: 97.13, label: '1990' },
  { x: '5', y: 98.16, label: '2006' },
  { x: '5', y: 104.81, label: '2008' },
  { x: '5', y: 159.42, label: '1993' },
  { x: '5', y: 145.18, label: '1995' },
  { x: '5', y: 148.51, label: '1996' },
  { x: '6', y: 112.61, label: '2002' },
  { x: '6', y: 98.8, label: '2006' },
  { x: '6', y: 105.71, label: '2007' },
  { x: '6', y: 172.95, label: '1987' },
  { x: '6', y: 166.77, label: '2010' },
  { x: '6', y: 172.8, label: '2011' },
];

const ExampleChart = () => {
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={15}
      height={300}
      style={{ parent: { border: '1px solid #ccc' } }}
    >
      <VictoryGroup>
        <VictoryArea style={{ data: { fill: '#74c476' } }} data={areaData} />
        <VictoryLine
          style={{ data: { stroke: '#006d2c', strokeWidth: 2 } }}
          data={areaData.map((data) => ({ x: data.x, y: data.y0 }))}
        />
        <VictoryLine
          style={{ data: { stroke: '#006d2c', strokeWidth: 2 } }}
          data={areaData.map((data) => ({ x: data.x, y: data.y }))}
        />
      </VictoryGroup>
      <VictoryLine
        style={{
          data: { stroke: '#006d2c' },
          parent: { border: '1px solid #ccc' },
        }}
        data={lineData}
      />
      <VictoryGroup>
        <VictoryScatter
          style={{ data: { fill: '#006d2c' } }}
          data={lineData}
          labels={({ datum }) => datum.y}
          labelComponent={
            <VictoryTooltip flyoutStyle={{ stroke: '#006d2c' }} />
          }
          size={5}
        />
        <VictoryScatter
          style={{ data: { fill: '#bdbdbd' } }}
          data={outlierData}
          labels={({ datum }) => datum.y}
          labelComponent={
            <VictoryTooltip flyoutStyle={{ stroke: '#bdbdbd' }} />
          }
          size={3}
        />
      </VictoryGroup>
      <VictoryAxis dependentAxis theme={VictoryTheme.material} />
      <VictoryAxis
        style={{ axisLabel: { padding: 30 } }}
        label="Reservoir Area (Depth = 10 ft)"
      />
    </VictoryChart>
  );
};

export default ExampleChart;
