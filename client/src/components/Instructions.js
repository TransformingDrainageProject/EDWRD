import React from 'react';
import { Container, Row } from 'reactstrap';

const Instructions = () => {
  return (
    <Container>
      <Row className="mb-3">EDWRD can be used in two ways:</Row>
      <Row className="mb-3">
        <strong>For a quick analysis,</strong> to learn more about this tool and
        to see a few results describing the potential benefits of drainage water
        recycling, we've{' '}
        <a
          href="https://precision.ag.purdue.edu/edwrd/pdfdocument"
          target="_blank"
          rel="noopener noreferrer"
        >
          preloaded default values
        </a>{' '}
        representing a corn crop grown in silty clay loam soil. Simply drag the
        pin in the map to a location of your choice and click on "Run EDWRD".
        Once the tool finishes running, you can scroll down to view the results.
      </Row>
      <Row className="mb-3">
        <strong>For a more in-depth analysis,</strong> to learn more about
        potential benefits at a particular site, or to upload your own input
        data, click on "Modify Inputs". Additional input fields will appear
        allowing you to describe your field, reservoir, crop, and management
        settings, choose preloaded datasets from different sites across the
        Midwest, or upload your own data. You can always click the ? Icon to
        find out more about a specific input field.
      </Row>
    </Container>
  );
};

export default Instructions;
