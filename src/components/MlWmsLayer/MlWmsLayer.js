import React, { useContext, useRef, useEffect } from "react";
import { MapContext } from "@mapcomponents/react-core";

import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

const defaultProps = {
  visible: true,
  urlParameters: {
    bbox: "{bbox-epsg-3857}",
    format: "image/png",
    service: "WMS",
    version: "1.1.1",
    request: "GetMap",
    srs: "EPSG:3857",
    width: 256,
    height: 256,
    styles: "",
  },
  attribution: "",
  sourceOptions: {
    minZoom: 0,
    maxZoom: 20,
  },
  layerOptions: {
    minZoom: 0,
    maxZoom: 20,
  },
};

/**
 * Adds a WMS raster source & layer to the maplibre-gl instance
 *
 * @param {object} props
 * @param {object} props.urlParameters URL query parameters that will be added to the WMS URL. A layers property (string) is mandatory. Any value defined on this attribute will extend the default object
 * @param {string} props.url WMS URL
 * @param {bool} props.visible Sets layer "visibility" property to "visible" if true or "none" if false
 * @param {string} props.attribution MapLibre attribution shown in the bottom right of the map, if this layer is visible
 * @param {string} props.mapId Id of the target MapLibre instance in mapContext
 * @param {object} props.sourceOptions Object that is passed to the MapLibre.addSource call as config option parameter
 * @param {object} props.layerOptions Object that is passed to the MapLibre.addLayer call as config option parameter
 * @param {string} props.insertBeforeLayer Id of an existing layer in the mapLibre instance to help specify the layer order
                                           This layer will be visually beneath the layer with the "insertBeforeLayer" id
 *
 * @component
 */
const MlWmsLayer = (props) => {
  const mapContext = useContext(MapContext);

  const componentId = useRef(props.layerId || ("MlWmsLayer-" + uuidv4()));
  const mapRef = useRef(null);
  const initializedRef = useRef(false);
  const layerId = useRef(props.layerId || componentId.current);

  useEffect(() => {
    let _componentId = componentId.current;
    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);

        mapRef.current = null;
      }
      initializedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;

    mapRef.current = mapContext.getMap(props.mapId);
    if (!mapRef.current) return;

    initializedRef.current = true;

    let _propsUrlParams;
    let _wmsUrl = props.url;
    if (props.url.indexOf("?") !== -1) {
      _propsUrlParams = props.url.split("?");
      _wmsUrl = _propsUrlParams[0];
    }
    let _urlParamsFromUrl = new URLSearchParams(_propsUrlParams?.[1]);
    // first spread in default props manually to enable overriding a single parameter without replacing the whole default urlParameters object
    let urlParamsObj = {
      ...defaultProps.urlParameters,
      ...Object.fromEntries(_urlParamsFromUrl),
      ...props.urlParameters,
    };
    let urlParams = new URLSearchParams(urlParamsObj);
    let urlParamsStr =
      decodeURIComponent(urlParams.toString()) + "".replace(/%2F/g, "/").replace(/%3A/g, ":");

    mapRef.current.addSource(
      layerId.current,
      {
        type: "raster",
        tiles: [_wmsUrl + "?" + urlParamsStr],
        tileSize: urlParamsObj.width,
        attribution: props.attribution,
        ...props.sourceOptions,
      },
      componentId.current
    );

    mapRef.current.addLayer(
      {
        id: layerId.current,
        type: "raster",
        source: componentId.current,
        ...props.layerOptions,
      },
      props.insertBeforeLayer,
      componentId.current
    );

    if (!props.visible) {
      mapRef.current.setLayoutProperty(componentId.current, "visibility", "none");
    }
  }, [mapContext.mapIds, mapContext, props]);

  useEffect(() => {
    if (!mapRef.current || !initializedRef.current) return;

    // toggle layer visibility by changing the layout object's visibility property
    if (props.visible) {
      mapRef.current.setLayoutProperty(componentId.current, "visibility", "visible");
    } else {
      mapRef.current.setLayoutProperty(componentId.current, "visibility", "none");
    }
  }, [props.visible]);

  return <></>;
};

MlWmsLayer.defaultProps = {
  ...defaultProps,
};

MlWmsLayer.propTypes = {
  /**
   * WMS URL
   */
  url: PropTypes.string.isRequired,
  /**
   * URL query parameters that will be added to the WMS URL. A layers property (string) is mandatory. Any value defined on this attribute will extend the default object.
   */
  urlParameters: PropTypes.shape({
    layers: PropTypes.string.isRequired,
    bbox: PropTypes.string,
    format: PropTypes.string,
    service: PropTypes.string,
    version: PropTypes.string,
    request: PropTypes.string,
    srs: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId: PropTypes.string,
  /**
   * MapLibre attribution shown in the bottom right of the map, if this layer is visible
   */
  attribution: PropTypes.string,
  /**
   * Object that is passed to the MapLibre.addLayer call as config option parameter
   */
  layerOptions: PropTypes.object,
  /**
   * Object that is passed to the MapLibre.addSource call as config option parameter
   */
  sourceOptions: PropTypes.object,
  /**
   * Id of an existing layer in the mapLibre instance to help specify the layer order
   * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
   */
  insertBeforeLayer: PropTypes.string,
  /**
   * Sets layer "visibility" property to "visible" if true or "none" if false
   */
  visible: PropTypes.bool,
};
export default MlWmsLayer;
