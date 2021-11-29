import * as turf from "@turf/turf";

const _showNextTransitionSegment = function (
  props,
  layerId,
  map,
  transitionInProgressRef,
  transitionGeojsonDataRef,
  transitionGeojsonCommonDataRef,
  currentTransitionStepRef,
  msPerStep,
  transitionTimeoutRef
) {
  if (
    typeof map.getSource(layerId) === "undefined" ||
    !transitionInProgressRef.current
  ) {
    transitionTimeoutRef.current = setTimeout(() => _showNextTransitionSegment(...arguments), msPerStep);
    return;
  }
  if (
    typeof transitionGeojsonDataRef.current[currentTransitionStepRef.current] !==
    "undefined"
  ) {
    let newData =
      currentTransitionStepRef.current + 1 ===
      transitionGeojsonDataRef.current.length
        ? props.geojson
        : turf.lineString([
            ...transitionGeojsonCommonDataRef.current,
            ...transitionGeojsonDataRef.current[currentTransitionStepRef.current]
              .geometry.coordinates,
          ]);

    if (!map?.getSource?.(layerId)) {
      return;
    }

    map.getSource(layerId).setData(newData);

    if (typeof props.onTransitionFrame === "function") {
      props.onTransitionFrame(newData);
    }

    currentTransitionStepRef.current++;
    if (
      transitionInProgressRef.current &&
      currentTransitionStepRef.current < transitionGeojsonDataRef.current.length
    ) {
      transitionTimeoutRef.current = setTimeout(() => _showNextTransitionSegment(...arguments), msPerStep);
    } else {
      if (typeof props.onTransitionEnd === "function") {
        props.onTransitionEnd(props.geojson);
      }
      transitionInProgressRef.current = false;
    }
  }
};

const _transitionToGeojson = (
  newGeojson,
  props,
  transitionGeojsonCommonDataRef,
  transitionGeojsonDataRef,
  transitionInProgressRef,
  oldGeojsonRef,
  msPerStep,
  currentTransitionStepRef,
  map,
  layerId,
  transitionTimeoutRef
) => {
  // create the transition geojson between oldGeojsonRef.current and props.geojson

  // create a geojson that contains no common point between the two line features
  let transitionCoordinatesShort = [];
  let transitionCoordinatesLong = [];
  let targetCoordinates = [];
  let srcCoordinates = [];
  transitionGeojsonCommonDataRef.current = [];
  let sourceGeojson = oldGeojsonRef.current || {
    geometry: {
      type: "LineString",
      coordinates: [],
    },
    properties: {},
    type: "Feature",
  };

  let targetGeojson = newGeojson;

  let longerGeojson = targetGeojson;
  let shorterGeojson = sourceGeojson;
  let reverseOrder = false;
  // In case one geojson is missing completely use the first two coordinates of the other geojson
  if (
    typeof longerGeojson.geometry === "undefined" &&
    typeof shorterGeojson.geometry !== "undefined" &&
    shorterGeojson.geometry.coordinates.length > 1
  ) {
    longerGeojson = turf.lineString(shorterGeojson.geometry.coordinates.slice(0, 2));
  } else if (
    typeof shorterGeojson.geometry === "undefined" &&
    typeof longerGeojson.geometry !== "undefined" &&
    longerGeojson.geometry.coordinates.length > 1
  ) {
    shorterGeojson = turf.lineString(longerGeojson.geometry.coordinates.slice(0, 2));
  } else if (
    typeof shorterGeojson.geometry === "undefined" &&
    typeof longerGeojson.geometry === "undefined"
  ) {
    return;
  }

  if (
    longerGeojson.geometry.coordinates.length <
    shorterGeojson.geometry.coordinates.length
  ) {
    longerGeojson = sourceGeojson;
    shorterGeojson = targetGeojson;
    reverseOrder = true;
  }

  if (longerGeojson && shorterGeojson) {
    for (var i = 0, len = longerGeojson.geometry.coordinates.length; i < len; i++) {
      if (
        typeof shorterGeojson.geometry.coordinates[i] !== "undefined" &&
        longerGeojson.geometry.coordinates[i][0] ===
          shorterGeojson.geometry.coordinates[i][0] &&
        longerGeojson.geometry.coordinates[i][1] ===
          shorterGeojson.geometry.coordinates[i][1]
      ) {
        // if coordinates are equal
        transitionGeojsonCommonDataRef.current.push(
          longerGeojson.geometry.coordinates[i]
        );
      } else {
        if (typeof longerGeojson.geometry.coordinates[i] !== "undefined") {
          transitionCoordinatesLong.push(longerGeojson.geometry.coordinates[i]);
        }
        if (typeof shorterGeojson.geometry.coordinates[i] !== "undefined") {
          transitionCoordinatesShort.push(shorterGeojson.geometry.coordinates[i]);
        }
      }
    }
  }

  if (reverseOrder) {
    targetCoordinates = transitionCoordinatesShort;
    srcCoordinates = transitionCoordinatesLong;
  } else {
    targetCoordinates = transitionCoordinatesLong;
    srcCoordinates = transitionCoordinatesShort;
  }

  if (targetCoordinates.length < 2 && srcCoordinates < 2) return;
  // create props.transitionTime / msPerStep (=: transitionSteps) Versions of transitionGeojsonCommonDataRef.current + transitionCoordinates making the transitionCoordinates transitionCoordinatesDistance / transitionSteps longer on each step

  let transitionSteps = props.transitionTime / msPerStep;
  let srcCoordinatesDistance =
    srcCoordinates.length > 1
      ? Math.round(turf.length(turf.lineString(srcCoordinates)))
      : 0;
  let targetCoordinatesDistance =
    targetCoordinates.length > 1
      ? Math.round(turf.length(turf.lineString(targetCoordinates)))
      : 0;
  let transitionDistance = targetCoordinatesDistance + srcCoordinatesDistance;

  let srcCoordinatesShare = srcCoordinatesDistance / transitionDistance;
  let srcTransitionSteps = Math.round(transitionSteps * srcCoordinatesShare);
  let srcPerStepDistance =
    Math.round((srcCoordinatesDistance / srcTransitionSteps) * 100) / 100;

  let targetCoordinatesShare = targetCoordinatesDistance / transitionDistance;
  let targetTransitionSteps = Math.round(transitionSteps * targetCoordinatesShare);
  let targetPerStepDistance =
    Math.round((targetCoordinatesDistance / targetTransitionSteps) * 100) / 100;

  transitionGeojsonDataRef.current = [];

  // use srcPerStepDistance as src coordinates are always animated backwards
  let loopStepDistance = srcCoordinatesDistance;
  if (loopStepDistance <= 0) {
    loopStepDistance = 0.1;
  }
  let tmpLinestring = {};
  let tmpChunks = {};

  if (srcCoordinates.length > 1) {
    tmpChunks = turf.lineChunk(
      turf.lineString(srcCoordinates),
      srcPerStepDistance
      //{reverse:true}
    );
    // for some reason turf.lineChunk returns the full lineString as element 0, chunks start at 1
    tmpLinestring = tmpChunks.features[1];
    for (i = 0; i < srcTransitionSteps; i++) {
      transitionGeojsonDataRef.current.push(tmpLinestring);
      if (typeof tmpChunks.features[i] !== "undefined") {
        tmpLinestring = turf.lineString([
          ...tmpLinestring.geometry.coordinates,
          ...tmpChunks.features[i].geometry.coordinates,
        ]);
      } else {
        transitionGeojsonDataRef.current.push(tmpLinestring);
        break;
      }
    }
    transitionGeojsonDataRef.current.reverse();
  }

  if (targetCoordinates.length > 1) {
    loopStepDistance = 0;
    tmpChunks = turf.lineChunk(
      turf.lineString(targetCoordinates),
      targetPerStepDistance
    );
    // for some reason turf.lineChunk returns the full lineString as element 0, chunks start at 1
    tmpLinestring = tmpChunks.features[1];
    for (i = 0; i < targetTransitionSteps; i++) {
      transitionGeojsonDataRef.current.push(tmpLinestring);
      if (typeof tmpChunks.features[i] !== "undefined") {
        tmpLinestring = turf.lineString([
          ...tmpLinestring.geometry.coordinates,
          ...tmpChunks.features[i].geometry.coordinates,
        ]);
      } else {
        transitionGeojsonDataRef.current.push(tmpLinestring);
        break;
      }
    }
  }
  transitionGeojsonDataRef.current.push(props.geojson);

  currentTransitionStepRef.current = 1;
  transitionInProgressRef.current = true;
  transitionTimeoutRef.current = setTimeout(
    () =>
      _showNextTransitionSegment(
        props,
        layerId,
        map,
        transitionInProgressRef,
        transitionGeojsonDataRef,
        transitionGeojsonCommonDataRef,
        currentTransitionStepRef,
        msPerStep,
        transitionTimeoutRef
      ),
    msPerStep
  );
};

export { _showNextTransitionSegment, _transitionToGeojson };
