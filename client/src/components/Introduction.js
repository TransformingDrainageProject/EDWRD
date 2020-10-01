import React from 'react';
import { Col, Row } from 'reactstrap';

const Introduction = () => (
  <Row>
    <Col>
      <p>
        EDWRD can be used to estimate the potential irrigation and water quality
        benefits that result from drainage water recycling, which is a practice
        where drained agricultural water is captured and stored in a water
        storage reservoir for reuse as supplemental irrigation. This tool can be
        used to evaluate multiple different scenarios and compare the influence
        of different factors, such as reservoir size, crop, soil type, and
        management, on the potential benefits of drainage water recycling. EDWRD
        can be used to answer questions such as
      </p>
      <ul>
        <li>
          How large of a reservoir is needed to irrigate a particular field?
        </li>
        <li>
          If only a certain amount of land is available for a reservoir, how
          many acres can be irrigated?
        </li>
        <li>
          What is the average annual amount of dissolved nutrients (e.g.,
          nitrogen, phosphorus) that I can capture, store, and reuse, which will
          also prevent those nutrients from being discharged downstream?
        </li>
        <li>
          How often will a certain reservoir size fully meet the irrigation
          requirements at a certain site, or provide a certain level of nutrient
          reduction?
        </li>
        <li>
          What impact will a change in irrigation management have on the
          irrigation sufficiency or nutrient load reduction from a given
          reservoir size?
        </li>
      </ul>
      <p>
        EDWRD conducts a daily water balance for a tile-drained field and
        reservoir, and can incorporate water inflows from both surface runoff
        and tile drainage. Crop evapotranspiration (ET) is calculated following
        the FAO-56 dual crop coefficient approach using information about the
        local weather, soils, crop, and drainage patterns. You can find out more
        about methods used by EDWRD in the tool documentation{' '}
        <em>&lt;insert link&gt;</em> and the associated peer-reviewed articles
        (Reinhart et al. 2019, Reinhart et al. 2020{' '}
        <em>&lt;insert links to papers&gt;</em>).
      </p>
    </Col>
  </Row>
);

export default Introduction;
