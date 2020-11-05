import React from 'react';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';

import HelpPopover from '../Form/HelpPopover';

const ChartDescription = ({ children, name, text, title }) => (
  <Card
    className="mb-3"
    body
    style={{
      border: '2px solid #edb229',
    }}
  >
    <CardBody>
      <CardTitle>
        <h1>{title}</h1>
      </CardTitle>
      <HelpPopover
        key={name}
        helpText={
          <span>
            For more information on how these results are calculated, please
            refer to{' '}
            <a
              href="https://transformingdrainage.org/tools/edwrd/documentation"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://transformingdrainage.org/tools/edwrd/documentation
            </a>
            .
          </span>
        }
        label={title}
        name={name}
      />
      <CardText tag="div">{text}</CardText>
      {children}
    </CardBody>
  </Card>
);

export default ChartDescription;
