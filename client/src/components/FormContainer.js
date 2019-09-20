import './FormContainer.css';
import React, { useState } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Row,
  Col
} from 'reactstrap';

import Map from './Map';

const FormContainer = () => {
  const [activeTab, toggleActiveTab] = useState('formTab');

  return (
    <div className="container">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === 'formTab' ? 'active' : null}
            onClick={() => toggleActiveTab('formTab')}
          >
            Inputs and Results
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'mapTab' ? 'active' : null}
            onClick={() => toggleActiveTab('mapTab')}
          >
            Map
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="formTab">
          <div className="row">
            <div className="col-md-12">Form inputs</div>
          </div>
        </TabPane>
        <TabPane tabId="mapTab">
          <div className="row">
            <div className="col-md-12">
              <Map />
            </div>
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default FormContainer;
