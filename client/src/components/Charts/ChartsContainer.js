import './ChartsContainer.css';
import React, { useState } from 'react';
import { Container } from 'reactstrap';

import AnnualIrrigationMetrics from './AnnualIrrigationMetrics';
import ChartsDownloadResults from './ChartsDownloadResults';
import ChartsFieldWaterBalance from './FieldWaterBalance/ChartsFieldWaterBalance';
import ChartsReservoirWaterBalance from './ReservoirWaterBalance/ChartsReservoirWaterBalance';
import ChartsNutrientCaptureOverflow from './NutrientCaptureOverflow/ChartsNutrientCaptureOverflow';
import SimpleNavButtons from './SimpleNavButtons';
import AdvancedNavButtons from './AdvancedNavButtons';

function showChart(tabIndex, chartData) {
  switch (tabIndex) {
    case 0:
      return <AnnualIrrigationMetrics chartData={chartData} />;
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

function showAdvancedChart(tabIndex, chartData) {
  return <div>Adv Chart</div>;
}

const ChartsContainer = ({ chartData }) => {
  const [activeNavTab, setActiveNavTab] = useState(0);
  const [activeAdvNavTab, setActiveAdvNavTab] = useState(0);

  return (
    <Container>
      <h1>View Results</h1>
      <SimpleNavButtons
        active={activeNavTab}
        sessionID={chartData.sessionID}
        setActive={setActiveNavTab}
      />
      {activeNavTab === 2 ? (
        <AdvancedNavButtons
          active={activeAdvNavTab}
          sessionID={chartData.sessionID}
          setActive={setActiveAdvNavTab}
        />
      ) : null}
      {activeNavTab !== 2
        ? showChart(activeNavTab, chartData)
        : showAdvancedChart(activeAdvNavTab, chartData)}
    </Container>
  );
};

export default ChartsContainer;
