import React, { useContext, useEffect, useState } from "react";
import { MapContext } from "react-map-components-core";
import MlWmsLayer from "../../components/MlWmsLayer/MlWmsLayer";
import * as turf from "@turf/turf";

const MlAerialPhotograph = () => {
  const mapContext = useContext(MapContext);
  const [legendData, setLegendData] = useState({
    name: "",
    class: "",
    x: "",
    y: "",
    z: "",
  });

  useEffect(() => {
    if (!mapContext.map) return;

    mapContext.map.transform._maxZoom = 19.99;

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
      id: "placeData",
      source: "openmaptiles",
      "source-layer": "poi",
      type: "circle",
      filter: ["has", "name"],
      paint: {
        "circle-opacity": 0,
        "circle-radius": {
          stops: [
            [0, 0],
            [20, 500],
          ],
          base: 2,
        },
      },
    });

    mapContext.map.addLayer({
      id: "riverData",
      source: "openmaptiles",
      type: "line",
      "source-layer": "waterway",
      filter: ["==", "class", "river"],
      paint: {
        "line-opacity": 0,
        "line-width": 150,
      },
    });

    mapContext.map.on("mousemove", function (e) {
      let features = mapContext.map.queryRenderedFeatures(e.point, {
        layers: ["mapData", "greenData", "placeData", "riverData"],
      });
      //let bigFeatures = mapContext.map.queryRenderedFeatures(e.point, {layers: ["cityData"]})
      //let cityName = bigFeatures.find(element => element.properties.class === "city") || {properties: {name: ""}}
      let closestFeature = getClosestFeature(features, Object.values(e.point));
      if (features[0]) {
        setLegendData({
          name: closestFeature.properties.name,
          class: closestFeature.properties.class,
          x: closestFeature._vectorTileFeature._x,
          y: closestFeature._vectorTileFeature._y,
          z: closestFeature._vectorTileFeature._z,
        });
      }
    });
  }, [mapContext.map]);

  function getClosestFeature(featureCollection, mousePoint, identifier) {
    identifier = identifier || true;
    let closestFeature = featureCollection[0];
    for (let i in featureCollection) {
      if (featureCollection[i].layer["source-layer"] === identifier) {
        if (
          turf.distance(turf.center(featureCollection[i]), mousePoint) >
          turf.distance(turf.center(closestFeature), mousePoint)
        ) {
          closestFeature = featureCollection[i];
        }
      }
    }
    return closestFeature;
  }

  return (
    <>
      <MlWmsLayer
        url="https://www.wms.nrw.de/geobasis/wms_nw_dop"
        layer="nw_dop_rgb"
        sourceOptions={{ maxzoom: 20 }}
        belowLayerId="waterway-name"
      />
      <hr
        style={{ width: "100%", color: "black", padding: "none", height: "3px" }}
      />
      <ul style={{ paddingLeft: 0 }}>
        {Object.keys(legendData).map((key) => (
          <li> {`${key}: ${legendData[key] || ""}`} </li>
        ))}
      </ul>
    </>
  );
};

export default MlAerialPhotograph;
