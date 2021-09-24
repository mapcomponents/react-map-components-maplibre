import React, { useEffect, useCallback, useContext, useRef, useMemo } from "react";

import * as turf from "@turf/turf";
import { MapContext } from "react-map-components-core";

const MlCameraFollowPath = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  // without the requirement of adding it to the dependency list (ignore the false eslint exhaustive deps warning)
  const mapContext = useContext(MapContext);
  const initializedRef = useRef(false);
  const clearIntervalRef = useRef(false);

  // default path, for testing default behaviour
  const route = useMemo(
    () =>
      props.path || [
        [7.09222, 50.725055],
        [7.0577, 50.7621],
      ],
    [props.path]
  );

  useEffect(() => {
    return () => {
      clearIntervalRef.current = true;
      // This is the cleanup function, it is called when this react component is removed from react-dom
      // try to remove anything this component has added to the MapLibre-gl instance
      // e.g.: remove the layer
      // mapContext.getMap(props.mapId).removeLayer(layerRef.current);
    };
  }, []);

  const disableInteractivity = useCallback(() => {
    mapContext.map["scrollZoom"].disable();
    mapContext.map["boxZoom"].disable();
    mapContext.map["dragRotate"].disable();
    mapContext.map["dragPan"].disable();
    mapContext.map["keyboard"].disable();
    mapContext.map["doubleClickZoom"].disable();
    mapContext.map["touchZoomRotate"].disable();
  }, [mapContext.map]);
  const enableInteractivity = useCallback(() => {
    mapContext.map["scrollZoom"].enable();
    mapContext.map["boxZoom"].enable();
    mapContext.map["dragRotate"].enable();
    mapContext.map["dragPan"].enable();
    mapContext.map["keyboard"].enable();
    mapContext.map["doubleClickZoom"].enable();
    mapContext.map["touchZoomRotate"].enable();
  }, [mapContext.map]);

  useEffect(() => {
    if (!mapContext.mapExists() || initializedRef.current) return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    initializedRef.current = true;
    var kmPerStep = props.kmPerStep || 0.01;
    var routeDistance = turf.lineDistance(turf.lineString(route));

    var zoomOutTo = props.zoomOutTo || 14;
    var stepDuration = props.stepDuration || 70;
    var step = 1;
    var zoom = props.initialZoom || 18;
    var zoomSteps = 0.04;

    disableInteractivity();
    if (mapContext.map.getZoom() !== zoom) {
      mapContext.map.setZoom(zoom);
    }

    var timer = window.setInterval(function () {
      console.log(mapContext.map);
      if (clearIntervalRef.current) {
        window.clearInterval(timer);
        enableInteractivity();
      }

      var alongRoute = turf.along(turf.lineString(route), step * kmPerStep).geometry
        .coordinates;

      if (step * kmPerStep < routeDistance) {
        mapContext.map.panTo(alongRoute, {
          bearing: turf.bearing(
            turf.point([
              mapContext.map.getCenter().lng,
              mapContext.map.getCenter().lat,
            ]),
            turf.point(alongRoute)
          ),
          duration: stepDuration,
          essential: true,
        });

        step++;

        console.log("PAN MOVE");
      } else if (zoom > zoomOutTo) {
        zoom = zoom - zoomSteps;
        mapContext.map.setZoom(zoom);
        console.log("ZOOM OUT");
      } else {
        window.clearInterval(timer);
        console.log("ENABLE CONTROLS");
        enableInteractivity();
      }
    }, stepDuration);
  }, [
    mapContext.mapIds,
    mapContext,
    props,
    disableInteractivity,
    enableInteractivity,
    route,
  ]);

  return <></>;
};

export default MlCameraFollowPath;
