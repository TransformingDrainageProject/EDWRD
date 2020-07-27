import './ChartsContainer.css';
import React, { useState } from 'react';
import { Container } from 'reactstrap';

import ChartNavTabs from './ChartNavTabs';
import ChartsAnnualPerformance from './ChartsAnnualPerformance';

function showChart(tabIndex, chartData) {
  switch (tabIndex) {
    case tabIndex === 0:
      return <ChartsAnnualPerformance chartData={chartData} />;
    default:
      return <ChartsAnnualPerformance chartData={chartData} />;
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
