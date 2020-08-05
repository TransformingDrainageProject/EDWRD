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
    <VictoryGroup
      offset={10}
      categories={{
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
      }}
    >
      {active.map((key, idx) => {
        if (annualFilter === 'all') {
          console.log('all');
          return (
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
          );
        } else {
          console.log(chartData[key]);
          return (
            // <VictoryGroup key={`vb-${key}`}>
            <VictoryBar data={chartData[key]} />
            // </VictoryGroup>
          );
        }
      })}
    </VictoryGroup>
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
  // <VictoryChart>
  //   <VictoryGroup offset={25} categories={{ x: ['apples', 'oranges'] }}>
  //     <VictoryBar
  //       data={
  //         {
  //           usa: [
  //             { x: 'apples', y: 30 },
  //             { x: 'oranges', y: 8 },
  //           ],
  //           canada: [
  //             { x: 'apples', y: 40 },
  //             { x: 'oranges', y: 10 },
  //           ],
  //           mexico: [
  //             { x: 'apples', y: 30 },
  //             { x: 'oranges', y: 8 },
  //           ],
  //         }.usa
  //       }
  //       style={{ data: { fill: '#803E75' } }}
  //       labels={['usa', 'usa']}
  //     />
  //     <VictoryBar
  //       data={
  //         {
  //           usa: [
  //             { x: 'apples', y: 30 },
  //             { x: 'oranges', y: 8 },
  //           ],
  //           canada: [
  //             { x: 'apples', y: 40 },
  //             { x: 'oranges', y: 10 },
  //           ],
  //           mexico: [
  //             { x: 'apples', y: 30 },
  //             { x: 'oranges', y: 8 },
  //           ],
  //         }.canada
  //       }
  //       style={{ data: { fill: '#F3C300' } }}
  //       labels={['canada', 'canada']}
  //     />
  //     <VictoryBar
  //       data={
  //         {
  //           usa: [
  //             { x: 'apples', y: 30 },
  //             { x: 'oranges', y: 8 },
  //           ],
  //           canada: [
  //             { x: 'apples', y: 40 },
  //             { x: 'oranges', y: 10 },
  //           ],
  //           mexico: [
  //             { x: 'apples', y: 30 },
  //             { x: 'oranges', y: 8 },
  //           ],
  //         }.mexico
  //       }
  //       style={{ data: { fill: '#A1CAF1' } }}
  //       labels={['mexico', 'mexico']}
  //     />
  //   </VictoryGroup>
  // </VictoryChart>
);

export default MonthlyChart;
