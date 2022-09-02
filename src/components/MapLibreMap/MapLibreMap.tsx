import React, { useRef, useEffect, useContext, FC,  RefObject } from "react";

import MapContext from "../../contexts/MapContext";
import MapLibreGlWrapper from "./lib/MapLibreGlWrapper";

import { MapOptions as MapOptionsType } from "maplibre-gl";
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
  options?: Partial<MapOptionsType>;
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
    container: '',
    style: {
      version: 8,
      name: "blank",
      center: [0, 0],
      zoom: 0,
      sources: {},
      layers: [
        {
          id: "background",
          type: "background",
          paint: {
            "background-color": "rgba(0,0,0,0)",
          },
        },
      ],
    },
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
  const map: any = useRef<MapLibreGlWrapper>(null);
  const mapContainer = useRef<HTMLDivElement>();

  const mapContext: any = useContext<MapContextType>(MapContext);

  const mapIdRef = useRef(props.mapId);
  const initializedRef = useRef(false);
  const currentStyle = useRef(props.options?.style);

  useEffect(() => {
    let mapId = mapIdRef.current;

    return () => {
      mapContext.removeMap(mapId);
      map.current?.remove?.();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (initializedRef.current) return;

    if (mapContainer.current) {
      initializedRef.current = true;
      map.current = new MapLibreGlWrapper({
        mapOptions: {
          style: '',
          container: mapContainer.current,
          ...props.options,
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
  }, [props.options, props.mapId]);

  useEffect(() => {
    if (map.current?.map && props?.options?.style && currentStyle.current !== props.options.style) {
      console.log("set style");
      currentStyle.current = props.options.style;
      map.current.map.setStyle(props.options.style);
    }
    // @ts-ignore: props.options is either passed or populated with default values
  }, [props.options.style])

  return <div ref={mapContainer as RefObject<HTMLDivElement>} className="mapContainer" style={props.style} />;
};

MapLibreMap.defaultProps = defaultProps;

export default MapLibreMap;
