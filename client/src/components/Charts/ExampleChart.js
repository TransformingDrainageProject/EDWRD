import React from 'react';
import {
  VictoryChart,
  VictoryArea,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
} from 'victory';

const areaData = [
  { x: 1, y: 105.39, y0: 141.66 },
  { x: 2, y: 103.4, y0: 139.08 },
  { x: 3, y: 116.64, y0: 163.28 },
  { x: 4, y: 104.95, y0: 140.39 },
  { x: 5, y: 104.95, y0: 140.39 },
  { x: 6, y: 116.64, y0: 163.28 },
];
const lineData = [
  { x: 1, y: 124.47 },
  { x: 2, y: 122.46 },
  { x: 3, y: 136.44 },
  { x: 4, y: 124.38 },
  { x: 5, y: 124.38 },
  { x: 6, y: 136.44 },
];
const outlierData = [
  { x: 1, y: 96.86 },
  { x: 1, y: 97.8 },
  { x: 1, y: 104.48 },
  { x: 1, y: 160.43 },
  { x: 1, y: 147.062 },
  { x: 1, y: 147.94 },
  { x: 2, y: 94.2 },
  { x: 2, y: 102.4 },
  { x: 2, y: 102.33 },
  { x: 2, y: 156.44 },
  { x: 2, y: 141.8 },
  { x: 2, y: 141.91 },
  { x: 3, y: 98.8 },
  { x: 3, y: 105.71 },
  { x: 3, y: 112.613 },
  { x: 3, y: 166.77 },
  { x: 3, y: 172.8 },
  { x: 3, y: 172.96 },
  { x: 4, y: 97.13 },
  { x: 4, y: 98.16 },
  { x: 4, y: 104.81 },
  { x: 4, y: 159.42 },
  { x: 4, y: 145.18 },
  { x: 4, y: 148.51 },
  { x: 5, y: 97.13 },
  { x: 5, y: 98.16 },
  { x: 5, y: 104.81 },
  { x: 5, y: 159.42 },
  { x: 5, y: 145.18 },
  { x: 5, y: 148.51 },
  { x: 6, y: 112.61 },
  { x: 6, y: 98.8 },
  { x: 6, y: 105.71 },
  { x: 6, y: 172.95 },
  { x: 6, y: 166.77 },
  { x: 6, y: 172.8 },
];

const ExampleChart = () => {
  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={30}>
      <VictoryArea style={{ data: { fill: '#99d8c9' } }} data={areaData} />
      <VictoryLine
        style={{
          data: { stroke: '#2ca25f' },
          parent: { border: '1px solid #ccc' },
        }}
        data={lineData}
      />
      <VictoryScatter
        data={lineData}
        size={5}
        style={{ data: { fill: '#2ca25f' } }}
      />
      <VictoryScatter
        data={outlierData}
        size={3}
        style={{ data: { fill: '#2ca25f' } }}
      />
    </VictoryChart>
  );
};

export default ExampleChart;
