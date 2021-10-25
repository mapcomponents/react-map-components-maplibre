import React, { useRef, useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";

import { MapContext } from "react-map-components-core";
import { v4 as uuidv4 } from "uuid";

import MlWmsLayer from "../MlWmsLayer/MlWmsLayer";
import MlLayer from "../MlLayer/MlLayer";
import WMSCapabilities from "wms-capabilities";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";

/**
 * Loads a WMS getCapabilities xml document and adds a MlWmsLayer component for each layer that is
 * offered by the WMS.
 *
 * TODO: EaseTo the extend offered by the WMS in a zoom level that is supported
 *
 * @component
 */
const MlWmsLoader = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapContext = useContext(MapContext);

  const initializedRef = useRef(false);
  const mapRef = useRef(undefined);
  const componentId = useRef((props.idPrefix ? props.idPrefix : "MlWmsLoader-") + uuidv4());
  const [capabilities, setCapabilities] = useState(undefined);
  const [layers, setLayers] = useState([]);
  const [wmsUrl, setWmsUrl] = useState("");

  useEffect(() => {
    let _componentId = componentId.current;

    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      // try to remove anything this component has added to the MapLibre-gl instance
      // e.g.: remove the layer
      // mapContext.getMap(props.mapId).removeLayer(layerRef.current);
      // check for the existence of map.style before calling getLayer or getSource

      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);
        mapRef.current = undefined;
      }
    };
  }, []);

  useEffect(() => {
    // extract URL parameters from the given URL
    let _propsUrlParams;
    let _wmsUrl = props.url;
    if (props.url.indexOf("?")) {
      _propsUrlParams = props.url.split("?");
      _wmsUrl = _propsUrlParams[0];
    }
    setWmsUrl(_wmsUrl);
    let _urlParamsFromUrl = new URLSearchParams(_propsUrlParams?.[1]);

    let urlParamsObj = {
      ...Object.fromEntries(_urlParamsFromUrl),
      ...props.urlParameters,
    };
    // create URLSearchParams object to assemble the URL Parameters
    let urlParams = new URLSearchParams(urlParamsObj);

    let urlParamsStr =
      decodeURIComponent(urlParams.toString()) + "".replace(/%2F/g, "/").replace(/%3A/g, ":");

    fetch(props.url + "?" + urlParamsStr)
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.text();
      })
      .then((data) => {
        setCapabilities(new WMSCapabilities(data).toJSON());
      })
      .catch((msg) => {
        setCapabilities(undefined);
        setLayers([]);
        setWmsUrl("");
        console.log("error");
        console.log(msg);
      });
  }, [props.url, props.urlParameters]);

  useEffect(() => {
    if (!capabilities) return;

    if (capabilities?.Capability?.Layer?.SRS?.indexOf?.("EPSG:3857") === -1) {
      console.log(
        "MlWmsLoader (" + capabilities.Service.Title + "): No WGS 84/Pseudo-Mercator support"
      );
    } else {
      console.log(
        "MlWmsLoader (" + capabilities.Service.Title + "): WGS 84/Pseudo-Mercator supported"
      );

      setLayers(
        capabilities?.Capability?.Layer?.Layer.map((layer, idx) => {
          layer.visible = idx > 1;
          return layer;
        })
      );
    }
  }, [capabilities]);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);
  }, [mapContext.mapIds, mapContext, props.mapId]);

  return (
    <>
      <h3>{capabilities?.Service?.Title}</h3>
      {capabilities?.Capability?.Layer?.Layer.map((layer, idx) => (
        <MlLayer
          layerId="Order-"
          key={componentId.current + "-" + idx}
          idSuffix={componentId.current + "-" + idx}
          {...(idx > 0
            ? {
                insertBeforeLayer: "Order-" + componentId.current + "-" + (idx - 1),
              }
            : undefined)}
        />
      ))}
      <List dense>
        {wmsUrl &&
          layers?.map?.((layer, idx) => {
            return (
              <ListItem
                key={layer.Name + idx}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="toggle visibility"
                    onClick={() => {
                      let _layers = [...layers];
                      _layers[idx].visible = !_layers[idx].visible;
                      setLayers([..._layers]);
                    }}
                  >
                    {layers[idx].visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                }
              >
                <ListItemText primary={layer?.Title} secondary={layer?.Abstract} />
                <MlWmsLayer
                  key={layer?.Name + idx}
                  url={wmsUrl}
                  urlParameters={{ ...props.wmsUrlParameters, layers: layer?.Name }}
                  visible={layers[idx].visible}
                  insertBeforeLayer={"Order-" + componentId.current + "-" + idx}
                />
              </ListItem>
            );
          })}
      </List>
      <p style={{ fontSize: ".7em" }}>{capabilities?.Capability?.Layer?.Abstract}</p>
    </>
  );
};

MlWmsLoader.defaultProps = {
  urlParameters: {
    service: "WMS",
    version: "1.1.3",
    request: "getCapabilities",
  },
  wmsUrlParameters: {
    TRANSPARENT: "TRUE",
  },
};

MlWmsLoader.propTypes = {
  /**
   * WMS URL
   */
  url: PropTypes.string.isRequired,
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId: PropTypes.string,
  /**
   * URL parameters that will be used in the getCapabilities request
   */
  urlParameters: PropTypes.object,
  /**
   * URL parameters that will be added when requesting tiles
   */
  layerUrlParameters: PropTypes.object,
};

export default MlWmsLoader;
