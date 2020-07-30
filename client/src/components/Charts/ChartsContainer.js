import './ChartsContainer.css';
import React, { useState } from 'react';
import { Container } from 'reactstrap';

import ChartNavTabs from './ChartNavTabs';
import ChartsAnnualPerformance from './ChartsAnnualPerformance';
import ChartsFieldWaterBalance from './ChartsFieldWaterBalance';

function showChart(tabIndex, chartData) {
  console.log('tabIndex', tabIndex);
  switch (tabIndex) {
    case 0:
      return <ChartsAnnualPerformance chartData={chartData} />;
    case 1:
      return <ChartsFieldWaterBalance chartData={chartData} />;
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
