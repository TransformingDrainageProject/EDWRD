import React, { useState } from 'react';
import { Button, Col, Input, Label, Row } from 'reactstrap';

import AnnualChart from '../AnnualChart';
import ChartDescription from '../ChartDescription';
import DownloadDataButton from '../DownloadDataButton';
import YearlyTable from '../YearlyTable';
import VariableButtons from './VariableButtons';

import { getUniqueYears, getYearRange } from '../utils/getYearInfo';

const AnnualWaterQualityMetrics = ({ chartData }) => {
  const [activeChart, setActiveChart] = useState('');
  const [annualFilter, setAnnualFilter] = useState('all');
  const [avgLineOnly, toggleAvgLineOnly] = useState(false);
  const [showAnnualTable, toggleShowAnnualTable] = useState(false);
  const [showPercentages, toggleShowPercentages] = useState('real');

  let selectedChartData, uniqueYears, yearRange;
  function yearOnChange(event) {
    const year = event.target.value;
    setAnnualFilter(year);
  }

  if (activeChart) {
    selectedChartData = {
      label:
        chartData.annual.waterQualityMetrics[showPercentages][activeChart]
          .label2,
      precision:
        chartData.annual.waterQualityMetrics[showPercentages][activeChart]
          .precision,
      rdep: chartData.rdep,
      unit:
        chartData.annual.waterQualityMetrics[showPercentages][activeChart].unit,
      unitType: chartData.unitType,
      values:
        chartData.annual.waterQualityMetrics[showPercentages][activeChart]
          .values,
    };
    uniqueYears = getUniqueYears(selectedChartData.values);
    yearRange = getYearRange(uniqueYears);
  }

  return (
    <>
      <VariableButtons
        active={activeChart}
        setActive={setActiveChart}
        chartVariables={chartData.annual.waterQualityMetrics[showPercentages]}
      />
      {activeChart ? (
        <>
          <Row className="text-center">
            <Col>
              <h1>
                {selectedChartData.label}{' '}
                {annualFilter !== 'all' ? ` (${annualFilter})` : `${yearRange}`}
              </h1>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={10}>
              <AnnualChart
                annualFilter={annualFilter}
                avgLineOnly={avgLineOnly}
                chartData={selectedChartData}
              />
            </Col>
            <Col md={2}>
              <Row className="mb-1">
                <Col>
                  <Label check for="showPercentages" style={{ marginLeft: 20 }}>
                    <Input
                      type="checkbox"
                      name="showPercentages"
                      checked={showPercentages === 'real' ? false : true}
                      onChange={() => {
                        if (showPercentages === 'real') {
                          setActiveChart(activeChart + 'Perc');
                        } else {
                          setActiveChart(activeChart.slice(0, -4));
                        }
                        toggleShowPercentages(
                          showPercentages === 'real' ? 'percent' : 'real'
                        );
                      }}
                    />
                    View as percent
                  </Label>
                </Col>
              </Row>
              <Row className="mb-1">
                <Col>
                  <Label check for="avgLineOnly" style={{ marginLeft: 20 }}>
                    <Input
                      type="checkbox"
                      name="avgLineOnly"
                      checked={avgLineOnly}
                      onChange={() => toggleAvgLineOnly(!avgLineOnly)}
                    />
                    View average line only
                  </Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Input
                    type="select"
                    name="displaySpecifcYear"
                    onChange={yearOnChange}
                  >
                    <option value="all">View all years</option>
                    {uniqueYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </Input>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      ) : null}
      <>
        {activeChart ? (
          <Button
            className="mb-3"
            style={{ backgroundColor: '#007cb3' }}
            onClick={() => toggleShowAnnualTable(!showAnnualTable)}
          >{`${
            showAnnualTable ? 'Hide' : 'View'
          } Table of Annual Values`}</Button>
        ) : null}
        {activeChart && showAnnualTable ? (
          <YearlyTable data={selectedChartData.values.yearly} />
        ) : null}
        <Row>
          <Col>
            <ChartDescription
              name="annualWaterQualityMetrics"
              title="Annual Irrigation Metrics"
              text={[
                'Annual water quality performance is estimated based on the annual amount of nutrients that can be captured and stored by a given reservoir size, thereby preventing them from being discharged to downstream waters. These results can also be viewed as a percentage of the overall nutrient load that is present in the tile drain flow from the field. Users can view a table of the annual values by clicking the button below the figure, or download all annual results in an Excel file below. You can find out more about how these metrics and others are calculated in the ',
                <a
                  key="annualWaterQualityMetrics"
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
                type="annual"
              />
            </ChartDescription>
          </Col>
        </Row>
      </>
    </>
  );
};

export default AnnualWaterQualityMetrics;
