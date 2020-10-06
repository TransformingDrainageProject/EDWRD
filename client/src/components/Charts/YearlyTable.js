import React from 'react';
import { Table } from 'reactstrap';

const YearlyTable = ({ data }) => {
  let uniqueAreas = [];
  let uniqueYears = [];
  for (let i = 0; i < data.length; i++) {
    if (!uniqueAreas.includes(data[i].x)) {
      uniqueAreas.push(data[i].x);
    }
    if (!uniqueYears.includes(data[i].year)) {
      uniqueYears.push(data[i].year);
    }
  }
  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th>Reservoir Area</th>
          {uniqueYears.map((year) => (
            <th key={`th-${year}`}>{year}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {uniqueAreas.map((area) => (
          <tr key={`tr-${area}`}>
            <th scope="row">{area.toFixed(1)}</th>
            {data
              .filter((record) => record.x === area)
              .map((record, index) => (
                <td key={`td-${index}`}>{record.y.toFixed(2)}</td>
              ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default YearlyTable;
