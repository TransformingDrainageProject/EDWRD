import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';

import ChartDescription from '../ChartDescription';
import DownloadDataButton from '../DownloadDataButton';
import MonthlyChart from '../MonthlyChart';
import MonthlyOptions from '../MonthlyOptions';
import VariableButtons from './VariableButtons';

import updateChartData from '../utils/updateChartData';
import getYearInfo from '../utils/getYearInfo';

// category keys for different variable subsets (inflow, outflow, other)
const variableClasses = {
  inflow: ['overflowNitrateLoad', 'capturedNitrateLoad'],
  outflow: ['overflowSRPLoad', 'capturedSRPLoad'],
  other: ['tileNitrateLoad', 'tileSRPLoad'],
};

const ChartsNutrientCaptureOverflow = ({ chartData }) => {
  const [active, setActive] = useState([]);
  const [annualFilter, setAnnualFilter] = useState('all');
  const [selectedChartData, updateSelectedChartData] = useState(null);
  const [selectedVol, setSelectedVol] = useState(2);

  useEffect(() => {
    const data = updateChartData(
      'nutrientCaptureOverflow',
      chartData,
      active,
      annualFilter,
      selectedVol
    );
    updateSelectedChartData(data);
  }, [active, annualFilter, chartData, selectedVol]);

  const yearInfo = getYearInfo(
    chartData,
    'nutrientCaptureOverflow',
    active,
    selectedVol
  );
  const uniqueYears = yearInfo.uniqueYears;
  const yearRange = yearInfo.yearRange;

  return (
    <>
      <VariableButtons
        active={active}
        annualFilter={annualFilter}
        chart="nutrientCaptureOverflow"
        chartData={chartData}
        selectedVol={selectedVol}
        setActive={setActive}
        updateSelectedChartData={updateSelectedChartData}
      />
      <hr style={{ width: '50%' }} />
      {active.length > 0 && selectedVol ? (
        <>
          <Row className="text-center">
            <Col md={10}>
              <h1>
                {`Reservoir size = ${chartData.rarea[selectedVol].toFixed(1)}${
                  chartData.unitType === 'us' ? 'ac' : 'ha'
                }`}
                {annualFilter !== 'all' ? ` (${annualFilter})` : `${yearRange}`}
              </h1>
              <h2>{`(Average depth = ${chartData.rdep.toFixed(1)}${
                chartData.unitType === 'us' ? 'ft' : 'm'
              })`}</h2>
            </Col>
          </Row>

          <Row className="mb-3 text-center">
            <Col md={10}>
              <MonthlyChart
                active={active}
                annualFilter={annualFilter}
                chartData={selectedChartData}
                datasetNames={chartData['monthly']['nutrientCaptureOverflow']}
                variableClasses={variableClasses}
              />
            </Col>
            <Col md={2}>
              <MonthlyOptions
                chart="nutrientCaptureOverflow"
                chartData={chartData}
                active={active}
                selectedVol={selectedVol}
                setAnnualFilter={setAnnualFilter}
                updateSelectedChartData={updateSelectedChartData}
                uniqueYears={uniqueYears}
                annualFilter={annualFilter}
                setSelectedVol={setSelectedVol}
              />
            </Col>
          </Row>
        </>
      ) : null}
      <Row>
        <Col>
          <ChartDescription
            name="nutrientCaptureOverflow"
            title="Nutrient Capture Overflow"
            text={[
              'This graph shows the monthly amount of nitrate and reactive phosphorus delivered through tile drain flow, and how much is captured and stored for a specific reservoir size across all years. Nitrate loads are shown in blue. Phosphorus loads are shown in yellow. The total loads are shown in gray. Use the buttons at the top right of the graph to view a specific year or reservoir size. Results for individual years are shown as stacked bar graphs allowing you to view what proportion of the load was captured. Users can download all monthly results to get more information.  You can find out more about how these components are calculated in the ',
              <a
                href="https://transformingdrainage.org/tools/edwrd/documentation"
                target="_blank"
                rel="noopener noreferrer"
              >
                tool documentation
              </a>,
              '.',
            ]}
          >
            <DownloadDataButton
              sessionID={chartData.sessionID}
              type="monthly"
            />
          </ChartDescription>
        </Col>
      </Row>
    </>
  );
};

export default ChartsNutrientCaptureOverflow;
