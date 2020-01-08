import React from 'react';

import { Col, Row, Table } from 'reactstrap';
import PropTypes from 'prop-types';

import AdvancedSeasonTableHeader from './AdvancedSeasonTableHeader';
import AdvancedSeasonTableBody from './AdvancedSeasonTableBody';

import { STATES } from '../utils/constants';

const AdvancedSeasonTable = props => {
  const { fieldState, unitType } = props;

  return (
    <Row className="mb-3" style={{ border: '1px solid #c8ced5' }}>
      <Col>
        <Row>
          <Col>
            <h4 className="text-center">
              Growing and Non-growing Seasons - {STATES[fieldState]}
            </h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table>
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
