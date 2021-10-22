import React, { useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { MapContext } from "react-map-components-core";
import MapLibreGlWrapper from "./lib/MapLibreGlWrapper";

import "maplibre-gl/dist/maplibre-gl.css";

/**
 * Creates a MapLibreGlWrapper instance and registers it in MapContext
 * after the MapLibre-gl load event has fired.
 *
 * MapLibreMap returns the html node that will be used by MapLibre-gl to render the map.
 * This Component must be kept unaware of any related components that interact with the MapLibre-gl
 * instance.
 *
 * @component
 */
const MapLibreMap = (props) => {
  const map = useRef(null);
  const mapContainer = useRef(null);

  const mapContext = useContext(MapContext);
  const mapContextRef = useRef(mapContext);

  const mapIdRef = useRef(props.mapId);
  const mapOptions = props.options;

  useEffect(() => {
    let mapId = mapIdRef.current;
    let _mapContext = mapContextRef.current;

    return () => {
      _mapContext.removeMap(mapId);
      map.current?.remove?.();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (mapContainer.current) {
      map.current = new MapLibreGlWrapper({
        mapOptions: {
          container: mapContainer.current,
          ...mapOptions,
        },
        onReady: (map, wrapper) => {
          map.once("load", () => {
            if (props.mapId) {
              mapContext.registerMap(props.mapId, wrapper);
            } else {
              mapContext.setMap(wrapper);
            }
          });

          // TODO: remove this line
          window.map = wrapper;
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapContainer]);

  return <div ref={mapContainer} className="mapContainer" />;
};

MapLibreMap.defaultProps = {
  mapId: undefined,
  options: {
    lng: 8.607,
    lat: 53.1409349,
    zoom: 10,
    accessToken:
      "pk.eyJ1IjoibWF4dG9iaSIsImEiOiJjaW1rcWQ5bWMwMDJvd2hrbWZ2ZTBhcnM5In0.NcGt5NmLP5Q1WC7P5u6qUA",
  },
};

MapLibreMap.propTypes = {
  /**
   * Id of the MapLibreGl(Wrapper) instance in mapContext
   */
  mapId: PropTypes.string,
  /**
   * Config object that is passed to the MapLibreGl constructor as first parameter.
   * See https://maplibre.org/maplibre-gl-js-docs/api/map/ for a formal documentation of al
   * available properties.
   */
  options: PropTypes.object,
};

export default MapLibreMap;
