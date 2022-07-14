import React from 'react';
import { Col, Row } from 'reactstrap';

const Introduction = () => (
  <Row>
    <Col>
      <h3>
        How to use this tool:
      </h3>
      
      <p>
        EDWRD requires three primary sets of information:
      </p>
      
      <ol>
        <li>
          <b>Location</b> - Users will select their target field location in the map below. 
        </li>
        
        <li>
          <b>Analysis Type and Field/Reservoir Properties</b> - Users can run EDWRD with U.S. Standard or Metric units. Also, users can choose to conduct a Quick Analysis with preset inputs to conduct a simple baseline analysis to view results and better understand the potential benefits of drainage water recycling, or run a more In-depth Analysis to customize input values describing the field, reservoir, and crop management characteristics. 
        </li>
        
        <li>
          <b>Daily Weather, Drain Flow, and Nutrient Concentrations</b> - Precompiled datasets are available from research sites in east-central Indiana and southeast Iowa. Users can utilize either precompiled dataset or upload their own dataset. 
        </li>
      </ol>
      
      <p>
        After you complete each step, the next step to complete will appear. Once inputs have been entered, users will choose to “Run EDWRD”. Analysis takes approximately 1-2 minutes and results will show up below the input menus. 
      </p>
    </Col>
  </Row>
);

export default Introduction;
