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
  inflow: ['reservoirPrecipitation', 'reservoirDrainFlow', 'reservoirRunoff'],
  outflow: [
    'irrigationWithdrawl',
    'seepage',
    'reservoirEvaporation',
    'overflow',
  ],
  other: ['capture', 'reservoirStoredVolume', 'reservoirWaterDepth'],
};

const ChartsFieldWaterBalance = ({ chartData }) => {
  const [active, setActive] = useState([]);
  const [annualFilter, setAnnualFilter] = useState('all');
  const [selectedChartData, updateSelectedChartData] = useState(null);
  const [selectedVol, setSelectedVol] = useState(2);

  useEffect(() => {
    const data = updateChartData(
      'reservoirWaterBalance',
      chartData,
      active,
      annualFilter,
      selectedVol
    );
    updateSelectedChartData(data);
  }, [active, selectedVol]);

  const yearInfo = getYearInfo(
    chartData,
    'reservoirWaterBalance',
    active,
    selectedVol
  );
  const uniqueYears = yearInfo.uniqueYears;
  const yearRange = yearInfo.yearRange;

  return (
    <>
      <Row>
        <Col>
          Click on the buttons below to see results for each reservoir water
          balance metric across multiple reservoir sizes.
        </Col>
      </Row>
      <VariableButtons
        active={active}
        annualFilter={annualFilter}
        chart="reservoirWaterBalance"
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
                  chartData.unit_type === 'us' ? 'ac' : 'ha'
                }`}
                {annualFilter !== 'all' ? ` (${annualFilter})` : `${yearRange}`}
              </h1>
              <h2>{`(depth = ${chartData.rdep.toFixed(2)}${
                chartData.unit_type === 'us' ? 'ft' : 'm'
              })`}</h2>
            </Col>
          </Row>

          <Row className="mb-3 text-center">
            <Col md={10}>
              <MonthlyChart
                active={active}
                annualFilter={annualFilter}
                chartData={selectedChartData}
                datasetNames={chartData['monthly']['reservoirWaterBalance']}
                variableClasses={variableClasses}
              />
            </Col>
            <Col md={2}>
              <MonthlyOptions
                chart="reservoirWaterBalance"
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
            name="reservoirWaterBalance"
            title="Reservoir Water Balance"
            text="This graph shows the monthly amount of water for each
                  component of the reservoir water balance for a specific
                  reservoir size across all years. Use the buttons at the top
                  right of the graph to view a specific year or reservoir
                  size. Click on the question mark to learn more about how
                  this water balance is calculated."
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

export default ChartsFieldWaterBalance;
