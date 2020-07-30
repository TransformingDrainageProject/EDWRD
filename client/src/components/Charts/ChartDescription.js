import React from 'react';
import { Card, CardText, CardTitle } from 'reactstrap';

import HelpPopover from '../Form/HelpPopover';

const ChartDescription = ({ name, text, title }) => (
  <Card
    className="mb-3"
    body
    style={{
      border: '2px solid #edb229',
    }}
  >
    <CardTitle>
      <h1>{title}</h1>
    </CardTitle>
    <HelpPopover
      key={name}
      helpText={<span>help text</span>}
      label={title}
      name={name}
    />
    <CardText>{text}</CardText>
  </Card>
);

export default ChartDescription;
