import React, { useContext, useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MapContext } from "react-map-components-core";

import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";

/**
 * Adds a fill extrusion layer to the MapLibre instance reference by props.mapId
 *
 * @Component
 */
const MlFillExtrusionLayer = (props) => {
  const mapContext = useContext(MapContext);
  const mapRef = useRef(null);

  const [showLayer, setShowLayer] = useState(true);
  const componentId = useRef(
    (props.idPrefix ? props.idPrefix : "MlFillExtrusionLayer-") + uuidv4()
  );
  const initializedRef = useRef(false);
  const layerId = useRef(props.layerId || "MlFillExtrusionLayer-" + uuidv4());

  useEffect(() => {
    let _componentId = componentId.current;

    return () => {
      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);
        mapRef.current = undefined;
      }
      initializedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;
    // the MapLibre-gl instance (mapContext.getMap(props.mapId)) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);

    let lastLabelLayerId = undefined;
    if (mapContext.map.getLayer("waterway-name")) {
      lastLabelLayerId = "waterway-name";
    }

    if (mapContext.map.getLayer("poi_label")) {
      lastLabelLayerId = "poi_label";
    }

    mapContext.map.addLayer(
      {
        id: layerId.current,
        type: "fill-extrusion",
        source: props.sourceId || "openmaptiles",
        "source-layer": props.sourceLayer || "building",
        minzoom: props.minZoom || 14,
        paint: {
          ...props.paint,
        },
      },
      props.insertBeforeLayer || lastLabelLayerId,
      componentId.current
    );
  }, [
    mapContext,
    props.insertBeforeLayer,
    props.mapId,
    props.minZoom,
    props.paint,
    props.sourceId,
    props.sourceLayer,
  ]);

  useEffect(() => {
    if (!initializedRef.current) return;

    // toggle layer visibility by changing the layout object's visibility property
    mapRef.current.setLayoutProperty(layerId.current, "visibility", showLayer ? "visible" : "none");
  }, [showLayer, mapContext]);

  return (
    <Button
      color="primary"
      variant={showLayer ? "contained" : "outlined"}
      onClick={() => setShowLayer(!showLayer)}
    >
      Composite
    </Button>
  );
};

MlFillExtrusionLayer.defaultProps = {
  mapId: undefined,
  paint: {
    "fill-extrusion-color": "hsl(196, 61%, 83%)",
    "fill-extrusion-height": {
      property: "render_height",
      type: "identity",
    },
    "fill-extrusion-base": {
      property: "render_min_height",
      type: "identity",
    },
    "fill-extrusion-opacity": 1,
  },
};

MlFillExtrusionLayer.propTypes = {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId: PropTypes.string,
  /**
   * Id of the layer that will be added by this component
   */
  layerId: PropTypes.string,
  /**
   * Prefix of the component id this component uses when adding elements to the MapLibreGl-instance
   */
  idPrefix: PropTypes.string,
  /**
   * Paint properties of the config object that is passed to the MapLibreGl.addLayer call. All
   * available properties are documented in the MapLibreGl documentation
   * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill-extrusion
   */
  paint: PropTypes.object,
  /**
   * Source id of a vector tile source containing the geometries to use for this fill-extrusion
   * layer.
   * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#source-layer
   */
  sourceId: PropTypes.string,
  /**
   * Layer id from a vector tile source containing the geometries to use for this fill-extrusion
   * layer.
   * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#source-layer
   */
  sourceLayer: PropTypes.string,
  /**
   * This layer will be hidde for zoom levels lower than defined on this property
   * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#minzoom
   */
  minZoom: PropTypes.number,
  /**
   * The layerId of an existing layer this layer should be rendered visually beneath
   * https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer - see "beforeId" property
   */
  insertBeforeLayer: PropTypes.string,
};

export default MlFillExtrusionLayer;
