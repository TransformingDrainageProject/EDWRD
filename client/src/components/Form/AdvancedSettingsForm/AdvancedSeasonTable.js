import React from 'react';

import { Col, Row, Table } from 'reactstrap';
import PropTypes from 'prop-types';

import AdvancedSeasonTableHeader from './AdvancedSeasonTableHeader';
import AdvancedSeasonTableBody from './AdvancedSeasonTableBody';
import HelpPopover from '../HelpPopover';

import { advancedSettingsHelp } from './advancedSettingsHelp';
import { STATES } from '../utils/constants';

const AdvancedSeasonTable = (props) => {
  const { fieldState, unitType } = props;

  return (
    <Row className="mb-3" style={{ border: '1px solid #c8ced5' }}>
      <Col>
        <Row>
          <Col>
            <h4>
              <u>Growing and Non-growing Seasons ({STATES[fieldState]})</u>
            </h4>
            <HelpPopover
              key="growNonGrowSeasons"
              helpText={advancedSettingsHelp.growNonGrowSeasons}
              label="Growing and Non-growing Seasons"
              name="growNonGrowSeasons"
              position="top"
              top="5px"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Table responsive>
              <AdvancedSeasonTableHeader unitType={unitType} />
              <AdvancedSeasonTableBody />
            </Table>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

AdvancedSeasonTable.propTypes = {
  fieldState: PropTypes.string,
  unitType: PropTypes.string,
};

export default AdvancedSeasonTable;
