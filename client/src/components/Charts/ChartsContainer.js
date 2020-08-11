import './ChartsContainer.css';
import React, { useState } from 'react';
import { Container } from 'reactstrap';

import ChartNavTabs from './ChartNavTabs';
import ChartsAnnualPerformance from './AnnualPerformance/ChartsAnnualPerformance';
import ChartsFieldWaterBalance from './FieldWaterBalance/ChartsFieldWaterBalance';
import ChartsReservoirWaterBalance from './ReservoirWaterBalance/ChartsReservoirWaterBalance';
import ChartsNutrientCaptureOverflow from './NutrientCaptureOverflow/ChartsNutrientCaptureOverflow';

function showChart(tabIndex, chartData) {
  console.log('tabIndex', tabIndex);
  switch (tabIndex) {
    case 0:
      return <ChartsAnnualPerformance chartData={chartData} />;
    case 1:
      return <ChartsFieldWaterBalance chartData={chartData} />;
    case 2:
      return <ChartsReservoirWaterBalance chartData={chartData} />;
    case 3:
      return <ChartsNutrientCaptureOverflow chartData={chartData} />;
    default:
      return <span>Please select a chart tab.</span>;
  }
}

const ChartsContainer = ({ chartData }) => {
  const [activeNavTab, setActiveNavTab] = useState(0);

  return (
    <Container>
      <ChartNavTabs active={activeNavTab} setActive={setActiveNavTab} />
      {showChart(activeNavTab, chartData)}
    </Container>
  );
};

export default ChartsContainer;
