import React from 'react';
import { Card, CardText, CardTitle } from 'reactstrap';

const ExampleCard = ({ text, title }) => (
  <Card
    className="mb-3"
    body
    style={{ backgroundColor: '#e2e3e5', minHeight: 200 }}
  >
    <CardTitle>
      <h1>{title}</h1>
    </CardTitle>
    <CardText>{text}</CardText>
  </Card>
);

export default ExampleCard;
