import React from "react";
import {
  MapLibreMap,
  CreatePdfButton,
} from "react-map-components-core";

import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import MapDrawTools from "./components/MapDrawTools/MapDrawTools";

import "./App.css";

const App = (props) => {

  const mapOptions = {
    style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
    center: [8.607, 53.1409349],
    zoom: 10,
    maxBounds: [
      [1.40625, 43.452919],
      [17.797852, 55.973798],
    ],
  };

  return (
    <div className="App">
      <div className="overlay">
        <Nav as="ul" className="glass">
          <Nav.Item as="li">
            <Navbar.Text>React Map Components</Navbar.Text>
          </Nav.Item>
          <Nav.Item as="li">
            <CreatePdfButton />
          </Nav.Item>
          <MapDrawTools></MapDrawTools>
        </Nav>
      </div>

      <MapLibreMap options={mapOptions} />
    </div>
  );
};

export default App;
