import './ChartsContainer.css';
import React, { useState } from 'react';
import { Container } from 'reactstrap';

import ChartNavTabs from './ChartNavTabs';
import ChartsAnnualPerformance from './AnnualPerformance/ChartsAnnualPerformance';
import ChartsDownloadResults from './ChartsDownloadResults';
import ChartsFieldWaterBalance from './FieldWaterBalance/ChartsFieldWaterBalance';
import ChartsReservoirWaterBalance from './ReservoirWaterBalance/ChartsReservoirWaterBalance';
import ChartsNutrientCaptureOverflow from './NutrientCaptureOverflow/ChartsNutrientCaptureOverflow';

function showChart(tabIndex, chartData) {
  switch (tabIndex) {
    case 0:
      return <ChartsAnnualPerformance chartData={chartData} />;
    case 1:
      return <ChartsFieldWaterBalance chartData={chartData} />;
    case 2:
      return <ChartsReservoirWaterBalance chartData={chartData} />;
    case 3:
      return <ChartsNutrientCaptureOverflow chartData={chartData} />;
    case 4:
      return <ChartsDownloadResults sessionID={chartData.sessionID} />;
    default:
      return <span>Please select a chart tab.</span>;
  }
}

const ChartsContainer = ({ chartData }) => {
  const [activeNavTab, setActiveNavTab] = useState(0);

  return (
    <Container>
      <h1>View Results</h1>
      <hr />
      <ChartNavTabs
        active={activeNavTab}
        sessionID={chartData.sessionID}
        setActive={setActiveNavTab}
      />
      {showChart(activeNavTab, chartData)}
    </Container>
  );
};

export default ChartsContainer;
