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
        helpText={<span>help text</span>}
        label={title}
        name={name}
      />
      <CardText tag="div">{text}</CardText>
      {children}
    </CardBody>
  </Card>
);

export default ChartDescription;
