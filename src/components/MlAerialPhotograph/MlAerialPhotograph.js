import React, { useContext, useEffect, useRef, useState } from "react";
import { MapContext } from "react-map-components-core";
import MlWmsLayer from "../MlWmsLayer/MlWmsLayer";

const MlAerialPhotograph = () => {
  const idPostfixRef = useRef(new Date().getTime());
  const mapContext = useContext(MapContext);
  const [legendData, setLegendData] = useState({
    id: "meep",
    class: "boop",
  });
  let legendDataRef = useRef({});

  useEffect(() => {
    if (!mapContext.map) return;

    mapContext.map.transform._maxZoom = 14.99;

    mapContext.map.addLayer({
      id: "mapData",
      source: "openmaptiles",
      "source-layer": "water",
      type: "fill",
      paint: {
        "fill-opacity": 0,
      },
    });

    mapContext.map.addLayer({
      id: "greenData",
      source: "openmaptiles",
      "source-layer": "landcover",
      type: "fill",
      paint: {
        "fill-opacity": 0,
      },
    });

    mapContext.map.addLayer({
      id: "mountainData",
      source: "openmaptiles",
      "source-layer": "mountain_peak",
      type: "fill",
      paint: {
        "fill-opacity": 0.5,
      },
    });

    mapContext.map.addLayer({
      id: "placeData",
      source: "openmaptiles",
      "source-layer": "place",
      type: "fill",
      paint: {
        "fill-opacity": 0.5,
      },
    });

    mapContext.map.on("mousemove", function (e) {
      let features = mapContext.map.queryRenderedFeatures(e.point, {
        layers: ["mapData", "greenData", "mountainData", "placeData", "building"],
      });
      if (features[0]) {
        if (
          features.length > 1 &&
          features[0].properties.class !== features[1].properties.class
        ) {
          console.log(features);
        }
        console.log(features[0]);
        setLegendData({
          id: features[0].id,
          class: features[0].properties.class,
          layer: features[0].sourceLayer,
          x: features[0]._vectorTileFeature._x,
          y: features[0]._vectorTileFeature._y,
          z: features[0]._vectorTileFeature._z,
        });
      }
    });
  }, [mapContext.map]);

  return (
    <>
      <MlWmsLayer
        url="https://www.wms.nrw.de/geobasis/wms_nw_dop"
        layer="nw_dop_rgb"
        sourceOptions={{ maxzoom: 15 }}
        //belowLayerId="waterway-name"
      />
      <hr
        style={{ width: "100%", color: "black", padding: "none", height: "3px" }}
      />
      <ul style={{ paddingLeft: 0 }}>
        {Object.keys(legendData).map((key) => (
          <li>
            {key}: {legendData[key]}
          </li>
        ))}
      </ul>
    </>
  );
};

export default MlAerialPhotograph;
