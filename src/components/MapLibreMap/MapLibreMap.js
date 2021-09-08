import React, { useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { MapContext } from "react-map-components-core";

import maplibregl from "maplibre-gl/dist/maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

/**
 * The MapLibreMap component will create the MapLibre-gl instance and set the reference at MapContext.map after the MapLibre-gl load event has fired. That way (since the map refence is created using the useState hook) you can use the react useEffect hook in depending components to access the MapLibre-gl instance like ```useEffect(() => { \/** code *\/ }, [mapContext.map])``` and be sure the code is executed once the MapLibre-gl instance has fired the load event.
 *
 * MapLibreMap returns the html node that will be used by MapLibre-gl to render the map.
 * This Component must be kept unaware of any related components that interact with the MapLibre-gl instance.
 */
const MapLibreMap = (props) => {
  const map = useRef(null);
  const mapContainer = useRef(null);

  const mapContext = useContext(MapContext);

  const mapOptions = props.options;

  useEffect(() => {
    return () => {
      mapContext.removeMap(props.mapId);
      map.current.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (mapContainer.current) {
      // TODO: adjust defaults
      let defaultOptions = {
        lng: 8.607,
        lat: 53.1409349,
        zoom: 10,
        container: mapContainer.current,
        accessToken:
          "pk.eyJ1IjoibWF4dG9iaSIsImEiOiJjaW1rcWQ5bWMwMDJvd2hrbWZ2ZTBhcnM5In0.NcGt5NmLP5Q1WC7P5u6qUA",
      };

      map.current = new maplibregl.Map({ ...defaultOptions, ...mapOptions });

      map.current.once("load", () => {
        if (props.mapId) {
          mapContext.registerMap(props.mapId, map.current);
        } else {
          mapContext.setMap(map.current);
        }
      });

      // TODO: remove this line
      window.map = map.current;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapContainer]);

  return <div ref={mapContainer} className="mapContainer" />;
};

MapLibreMap.propTypes = {
  options: PropTypes.object,
};

export default MapLibreMap;
