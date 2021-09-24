import React, { useEffect, useContext } from "react";
import { MapContext } from "react-map-components-core";

const MlDraggableFeatureLayer = (props) => {
  const mapContext = useContext(MapContext);

  // Event that triggers when the map is loaded
  useEffect(() => {
    if (!mapContext.map) return;

    // adds the Icon
    if (!mapContext.map.getSource("point")) {
      mapContext.map.loadImage(props.iconSrc, function (error, image) {
        if (error) throw error;
        mapContext.map.addImage("draggableIcon", image);
        mapContext.map.addSource("point", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: props.lnglat,
                },
              },
            ],
          },
        });
        mapContext.map.addLayer({
          id: "points",
          type: "symbol",
          source: "point",
          layout: {
            "icon-image": "draggableIcon",
            "icon-size": 0.3,
          },
        });
        createDraggableZone();
        onUp();
      });
    }

    // Visual Effect when the mouse enters the Draggable-Circle
    mapContext.map.on("mouseenter", "DraggableZone", function () {
      mapContext.map.setPaintProperty(
        "DraggableZone",
        "circle-color",
        "rgba(59,178,208,0.5)"
      );
      mapContext.map._canvas.style.cursor = "move";
    });

    // Visual Effect when the mouse leaves the Draggable-Circle
    mapContext.map.on("mouseleave", "DraggableZone", function () {
      mapContext.map.setPaintProperty(
        "DraggableZone",
        "circle-color",
        "rgba(56,135,190,0.5)"
      );
      mapContext.map._canvas.style.cursor = "";
    });

    // activates the mouseEvents
    mapContext.map.on("mousedown", "DraggableZone", function (e) {
      // Prevent the default map drag behavior
      e.preventDefault();

      mapContext.map._canvas.style.cursor = "grab";

      mapContext.map.on("mousemove", onMove);
      mapContext.map.once("mouseup", onUp);
    });

    mapContext.map.off("mousemove", onMove);
    mapContext.map.off("touchmove", onMove);
  }, [mapContext.map]);

  // Event that's triggered when the Circleradius is changed
  useEffect(() => {
    if (!mapContext.map) return;

    createDraggableZone();
    onUp();
    mapContext.map._render();
  }, [props.radius.current]);

  // create the Draggable Zone Around the Icon
  function createDraggableZone() {
    if (!mapContext.map) return;

    if (mapContext.map.getLayer("DraggableZone")) {
      mapContext.map.removeLayer("DraggableZone");
    }

    mapContext.map.addLayer({
      id: "DraggableZone",
      type: "circle",
      source: "point",
      paint: props.paint || {
        "circle-radius": 100,
        "circle-color": "rgb(56,135,190)",
        "circle-opacity": 0.3,
      },
    });
  }

  // Event that triggers, when Mouse drags Icon-Circle
  function onMove(e) {
    if (!mapContext.map.getSource("point")._data) return;
    let coords = e.lngLat;

    mapContext.map._canvas.style.cursor = "grabbing";

    mapContext.map.getSource("point")._data.features[0].geometry.coordinates = [
      coords.lng,
      coords.lat,
    ];
    mapContext.map
      .getSource("point")
      .setData(mapContext.map.getSource("point")._data);
  }

  // event when mouse button
  function onUp() {
    mapContext.map._canvas.style.cursor = "";

    mapContext.map.off("mousemove", onMove);
    mapContext.map.off("touchmove", onMove);

    props.onUpEvent();
  }

  return <></>;
};

export default MlDraggableFeatureLayer;
