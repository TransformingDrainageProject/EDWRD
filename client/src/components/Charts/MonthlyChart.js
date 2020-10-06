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
  VictoryVoronoiContainer,
} from 'victory';

import {
  colorScales,
  getChartPadding,
  getVariableColor,
  getStyles,
} from './MonthlyChartStyles';
import { getMax, getMaxima } from './utils/getMaxima';

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

function prepDataForMonthlyStackedBars(data, variableClasses) {
  let waterInStacks = [];
  let waterOutStacks = [];
  let waterOtherLines = [];
  let waterOtherKeys = [];

  Object.keys(data).forEach((key) => {
    if (variableClasses.inflow.includes(key)) {
      waterInStacks.push({ key: key, values: data[key].values });
    } else if (variableClasses.outflow.includes(key)) {
      waterOutStacks.push({ key: key, values: data[key].values });
    } else {
      waterOtherLines.push({ key: key, values: data[key].values });
      waterOtherKeys.push(key);
    }
  });

  return [waterInStacks, waterOutStacks, waterOtherLines, waterOtherKeys];
}

const MonthlyChart = ({
  active,
  annualFilter,
  chartData,
  datasetNames,
  variableClasses,
}) => {
  const monthlyData = prepDataForMonthlyStackedBars(chartData, variableClasses);
  const maxima = getMaxima(monthlyData);
  const styles = getStyles(active, variableClasses);

  let activeNotDepth = -1;
  if (active.length > 0 && active[0] !== 'reservoirWaterDepth') {
    activeNotDepth = 0;
  } else if (active.length > 1 && active[0] !== 'reservoirWaterDepth') {
    activeNotDepth = 0;
  } else {
    activeNotDepth = 1;
  }

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      containerComponent={
        <VictoryVoronoiContainer
          labels={({ datum }) =>
            `${datum.name}: ${datum.y.toFixed(datum.precision)}`
          }
          labelComponent={
            <VictoryTooltip style={styles.tooltip} flyoutWidth={120} />
          }
          voronoiBlacklist={['lines', 'bars', 'scatter']}
        />
      }
      domainPadding={15}
      height={300}
      padding={getChartPadding(active)}
      style={styles.chart}
    >
      {active.length > 1 || !active.includes('reservoirWaterDepth') ? (
        <VictoryAxis
          dependentAxis
          style={styles.axis}
          label={chartData[active[activeNotDepth]].unit}
          tickValues={[0.25, 0.5, 0.75, 1]}
          tickFormat={(t) =>
            (t * maxima).toFixed(datasetNames[active[activeNotDepth]].precision)
          }
        />
      ) : null}
      <VictoryAxis style={styles.axis} label="Month" />
      {active.includes('reservoirWaterDepth') ? (
        <VictoryAxis
          dependentAxis
          orientation="right"
          standalone={false}
          style={styles.axis}
          label={chartData['reservoirWaterDepth'].unit}
          tickValues={[0.25, 0.5, 0.75, 1]}
          tickFormat={(t) =>
            (t * getMax(chartData['reservoirWaterDepth'].values)).toFixed(
              datasetNames['reservoirWaterDepth'].precision
            )
          }
        />
      ) : null}

      {annualFilter !== 'all' && monthlyData[2].length > 0
        ? monthlyData[2].map((data, index) =>
            data.key !== 'reservoirWaterDepth' ? (
              <VictoryGroup key={`vg-other-${index}`} categories={months}>
                <VictoryLine
                  name="lines"
                  style={styles.lineMonthly(monthlyData[3][index])}
                  interpolation="monotoneX"
                  data={data.values}
                  y={(datum) => datum.y / maxima}
                />
                <VictoryScatter
                  name="scatter"
                  style={styles.scatter(monthlyData[3][index])}
                  size={2}
                  data={data.values}
                  y={(datum) => datum.y / maxima}
                  labels={({ datum }) =>
                    `${datum.name}: ${datum.y.toFixed(datum.precision)}`
                  }
                  labelComponent={
                    <VictoryTooltip style={styles.tooltip} flyoutWidth={120} />
                  }
                />
              </VictoryGroup>
            ) : null
          )
        : null}
      {active.includes('reservoirWaterDepth') ? (
        <VictoryLine
          name="lines"
          style={styles.lineMonthly('reservoirWaterDepth')}
          interpolation="monotoneX"
          data={chartData['reservoirWaterDepth'].values}
          y={(datum) =>
            datum.y / getMax(chartData['reservoirWaterDepth'].values)
          }
        />
      ) : null}
      {active.includes('reservoirWaterDepth') ? (
        <VictoryScatter
          name="scatter"
          style={styles.scatter('reservoirWaterDepth')}
          size={2}
          data={chartData['reservoirWaterDepth'].values}
          y={(datum) =>
            datum.y / getMax(chartData['reservoirWaterDepth'].values)
          }
          labels={({ datum }) =>
            `${datum.name}: ${datum.y.toFixed(datum.precision)}`
          }
          labelComponent={
            <VictoryTooltip style={styles.tooltip} flyoutWidth={120} />
          }
        />
      ) : null}
      {annualFilter === 'all' ? (
        active.map((key, idx) =>
          key !== 'reservoirWaterDepth' ? (
            <VictoryGroup key={`vg-${key}`} categories={months}>
              <VictoryLine
                name="lines"
                style={styles.line(key)}
                interpolation="monotoneX"
                data={chartData[key].values}
                y={(datum) => datum.y / maxima}
              />
              <VictoryScatter
                style={styles.scatter(key)}
                size={2}
                data={chartData[key].values}
                y={(datum) => datum.y / maxima}
              />
            </VictoryGroup>
          ) : null
        )
      ) : monthlyData[0].length > 0 || monthlyData[1].length > 0 ? ( // inflow stacked bar
        <VictoryGroup offset={10} categories={months}>
          {monthlyData.slice(0, 2).map((dataGroup, group) => {
            if (dataGroup.length > 0) {
              const colorScale =
                group === 0 ? colorScales.blue : colorScales.yellow;
              return (
                <VictoryStack key={`vs-${group}`} colorScale={colorScale}>
                  {dataGroup.map((data, index) => (
                    <VictoryBar
                      key={`vb-${index}`}
                      name="bars"
                      data={data.values}
                      y={(datum) => datum.y / maxima}
                      labels={({ datum }) =>
                        `${datasetNames[data.key].label}: ${datum.y.toFixed(
                          datasetNames[data.key].precision
                        )}`
                      }
                      labelComponent={
                        <VictoryTooltip
                          style={styles.tooltip}
                          flyoutWidth={120}
                        />
                      }
                    />
                  ))}
                </VictoryStack>
              );
            } else {
              return null;
            }
          })}
        </VictoryGroup>
      ) : null}
      <VictoryLegend
        x={50}
        y={15}
        orientation="horizontal"
        itemsPerRow={3}
        gutter={20}
        style={styles.legend}
        data={active.map((key) => ({
          name: datasetNames[key].label,
          symbol: {
            type: 'minus',
            fill: getVariableColor(active, key, variableClasses),
          },
        }))}
      />
    </VictoryChart>
  );
};

export default MonthlyChart;
