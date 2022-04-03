import React from "react";

import { v4 as uuidv4 } from "uuid";
import useLayer from "../../hooks/useLayer";

interface MlFillExtrusionLayerProps {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId?: string;
  /**
   * The layerId of an existing layer this layer should be rendered visually beneath
   * https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer - see "beforeId" property
   */
  insertBeforeLayer?: string;
  /**
   * Id of the layer that will be added by this component
   */
  layerId?: string;
  /**
   * Paint properties of the config object that is passed to the MapLibreGl.addLayer call. All
   * available properties are documented in the MapLibreGl documentation
   * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill-extrusion
   */
  paint?: object;
  /**
   * Source id of a vector tile source containing the geometries to use for this fill-extrusion
   * layer.
   * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#source-layer
   */
  sourceId?: string;
  /**
   * Layer id from a vector tile source containing the geometries to use for this fill-extrusion
   * layer.
   * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#source-layer
   */
  sourceLayer?: string;
  /**
   * This layer will be hidden for zoom levels lower than defined on this property
   * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#minzoom
   */
  minZoom?: number;
}

/**
 * Adds a fill extrusion layer to the MapLibre instance reference by props.mapId
 *
 */
const MlFillExtrusionLayer = (props: MlFillExtrusionLayerProps) => {
  useLayer({
    mapId: props.mapId,
    layerId: props.layerId || "MlFillExtrusionLayer-" + uuidv4(),
    options: {
      id: "",
      type: "fill-extrusion",
      source: props.sourceId || "openmaptiles",
      "source-layer": props.sourceLayer || "building",
      minzoom: props.minZoom || 14,
      paint: {
        ...props.paint,
      },
    },
    insertBeforeFirstSymbolLayer: true,
  });

  return <></>;
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

export default MlFillExtrusionLayer;
