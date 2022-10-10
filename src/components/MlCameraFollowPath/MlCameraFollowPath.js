import React, { useEffect, useCallback, useRef, useState } from "react";

import * as turf from "@turf/turf";
import { useMap } from "@mapcomponents/react-maplibre/";

const MlCameraFollowPath = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  // without the requirement of adding it to the dependency list (ignore the false eslint exhaustive deps warning)
  const initializedRef = useRef(false);
  const clearIntervalRef = useRef(false);
  const pause = useRef(true);
  const zoom = useRef(60);
  const pitch = useRef(60);
  const step = useRef(1);
  const speed = useRef(1);

  var kmPerStep = props.kmPerStep || 0.01;
  var routeDistance = turf.lineDistance(props.route);
  var stepDuration = props.stepDuration || 70;

  const mapHook = useMap({
    mapId: props.mapId,
    waitForLayer: props.insertBeforeLayer,
  });

  useEffect(() => {
    pause.current = props.pause;
  }, [props.pause]);
  useEffect(() => {
    zoom.current = props.zoom;
  }, [props.zoom]);
  useEffect(() => {
    pitch.current = props.pitch;
  }, [props.pitch]);
  useEffect(() => {
    speed.current = props.speed;
  }, [props.speed]);

  const disableInteractivity = useCallback(() => {
    if (!mapHook.map) return;
    mapHook.map.map["scrollZoom"].disable();
    mapHook.map.map["boxZoom"].disable();
    mapHook.map.map["dragRotate"].disable();
    mapHook.map.map["dragPan"].disable();
    mapHook.map.map["keyboard"].disable();
    mapHook.map.map["doubleClickZoom"].disable();
    mapHook.map.map["touchZoomRotate"].disable();
  }, [mapHook.map]);
  const enableInteractivity = useCallback(() => {
    if (!mapHook.map) return;
    mapHook.map.map["scrollZoom"].enable();
    mapHook.map.map["boxZoom"].enable();
    mapHook.map.map["dragRotate"].enable();
    mapHook.map.map["dragPan"].enable();
    mapHook.map.map["keyboard"].enable();
    mapHook.map.map["doubleClickZoom"].enable();
    mapHook.map.map["touchZoomRotate"].enable();
  }, [mapHook.map]);

  function centerRoute() {
    if (!mapHook.map || !props.route) return;
    var bbox = turf.bbox(props.route);
    var bounds;
    if (bbox && bbox.length > 3) {
      bounds = [
        [bbox[0], bbox[1]],
        [bbox[2], bbox[3]],
      ];
      mapHook.map.map.fitBounds(bounds, { padding: 100 });
    }
  }
  function play() {
    if (!mapHook.map) return;

    if (!pause.current) {
      disableInteractivity();
      if (mapHook.map.map.getZoom() !== zoom.current) {
        mapHook.map.map.setZoom(zoom.current);
      }
      if (pitch.current === "3D") {
        mapHook.map.map.setPitch(60);
      } else {
        mapHook.map.map.setPitch(0);
      }

      var alongRoute = turf.along(props.route, step.current * kmPerStep).geometry
        .coordinates;

      if (step.current * kmPerStep < routeDistance) {
        mapHook.map.map.panTo(alongRoute, {
          bearing: turf.bearing(
            turf.point([
              mapHook.map.map.getCenter().lng,
              mapHook.map.map.getCenter().lat,
            ]),
            turf.point(alongRoute)
          ),
          duration: stepDuration,
          essential: true,
        });
        step.current = step.current + speed.current;
        console.log("PAN MOVE");
        setTimeout(() => {
          play();
        }, 100);
      } else {
        mapHook.map.map.setPitch(0);
        centerRoute();
        enableInteractivity();
        console.log("ENABLE CONTROLS");
        step.current = 1;
      }
    } else {
      enableInteractivity();
    }
  }

  function reset() {
    if (!mapHook.map) return;
    mapHook.map.map.setPitch(0);
    centerRoute();
    enableInteractivity();
    step.current = 1;
  }

  useEffect(() => {
    if (!mapHook.map || initializedRef.current) return;
    initializedRef.current = true;
    centerRoute();
    return () => {
      clearIntervalRef.current = true;
      // This is the cleanup function, it is called when this react component is removed from react-dom
      // try to remove anything this component has added to the MapLibre-gl instance
      // e.g.: remove the layer
      // mapHook.map.getMap(props.mapId).removeLayer(layerRef.current);
    };
  }, [mapHook.map]);

  return {
    play: play,
    reset: reset,
  };
};

export default MlCameraFollowPath;