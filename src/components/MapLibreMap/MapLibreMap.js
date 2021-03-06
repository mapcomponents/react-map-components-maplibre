import React, { useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { MapContext } from "react-map-components-core";

import maplibregl from "maplibre-gl";
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
    mapContext.setLoading(true);

    // TODO: adjust defaults
    let defaultOptions = {
      lng: 8.607,
      lat: 53.1409349,
      zoom: 10,
      container: mapContainer.current,
    };

    map.current = new maplibregl.Map({ ...defaultOptions, ...mapOptions });

    map.current.on("load", () => {
      mapContext.setMap(map.current);
    });

    window.map = map.current;

    return () => {
      map.current.remove();
    };
  }, []);

  return <div ref={mapContainer} className="mapContainer" />;
};

MapLibreMap.propTypes = {
  options: PropTypes.object,
};

export default MapLibreMap;
