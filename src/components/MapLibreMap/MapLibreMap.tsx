import React, { useRef, useEffect, useContext, FC } from "react";

// @ts-ignore
import { MapContext } from "@mapcomponents/react-core";
// @ts-ignore
import MapLibreGlWrapper from "./lib/MapLibreGlWrapper";

import "maplibre-gl/dist/maplibre-gl.css";

type MapLibreMapProps = {
  /**
   * Id of the MapLibreGl(Wrapper) instance in mapContext
   */
  mapId?: string;
  /**
   * Config object that is passed to the MapLibreGl constructor as first parameter.
   * See https://maplibre.org/maplibre-gl-js-docs/api/map/ for a formal documentation of al
   * available properties.
   */
  options?: object;
  /**
   * css style definition passed to the map container DOM element
   */
  style?: object;
};

const defaultProps: MapLibreMapProps = {
  mapId: undefined,
  options: {
    center: { lng: 8.607, lat: 53.1409349 },
    zoom: 11,
  },
};

/**
 * Creates a MapLibreGlWrapper instance and registers it in MapContext
 * after the MapLibre-gl load event has fired.
 *
 * MapLibreMap returns the html node that will be used by MapLibre-gl to render the map.
 * This Component must be kept unaware of any related components that interact with the MapLibre-gl
 * instance.
 *
 * @category Map components
 */
const MapLibreMap: FC<MapLibreMapProps> = (props: MapLibreMapProps) => {
  const map: any = useRef(null);
  const mapContainer = useRef(null);

  const mapContext: any = useContext(MapContext);

  const mapIdRef = useRef(props.mapId);
  const mapOptions = props.options;

  useEffect(() => {
    let mapId = mapIdRef.current;

    return () => {
      mapContext.removeMap(mapId);
      map.current?.remove?.();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (mapContainer.current) {
      map.current = new MapLibreGlWrapper({
        // @ts-ignore
        mapOptions: {
          container: mapContainer.current,
          ...mapOptions,
        },
        onReady: (map: any, wrapper: any) => {
          map.once("load", () => {
            if (props.mapId) {
              mapContext.registerMap(props.mapId, wrapper);
            } else {
              mapContext.setMap(wrapper);
            }
          });
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapContainer]);

  return (
    <div ref={mapContainer} className="mapContainer" style={props.style} />
  );
};

MapLibreMap.defaultProps = defaultProps;

export default MapLibreMap;
