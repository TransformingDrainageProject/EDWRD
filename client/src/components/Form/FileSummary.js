import React from 'react';
import { Container, Toast, ToastBody, ToastHeader } from 'reactstrap';

const FileSummary = ({ inputFile, paramFile }) => (
  <Container fluid>
    <Toast>
      <ToastHeader>File summary</ToastHeader>
      <ToastBody>
        <p>
          The values from the following file
          {inputFile && paramFile ? 's' : null} will be used by EDWRD.
        </p>
        {inputFile ? (
          <p>
            <strong>Input file:</strong> {inputFile}
          </p>
        ) : null}
        {paramFile ? (
          <p>
            <strong>Parameter file:</strong> {paramFile}
          </p>
        ) : null}
      </ToastBody>
    </Toast>
  </Container>
);

export default FileSummary;
