const drawUtils = {
  getMatchingVertices: (vertex, featureId, allFeatures, map) => {
    // number of decimals should probably be dynamic depending on zoom level
    let decimals = 5;
    let matchingVertices = [];

    let v_lng = vertex[0].toFixed(decimals);
    let v_lat = vertex[1].toFixed(decimals);

    for (var i = 0; i < allFeatures.length; i++) {
      if (allFeatures[i].id !== featureId) {
        for (var k = 0; k < allFeatures[i].geometry.coordinates.length; k++) {
          for (
            var m = 0;
            m < allFeatures[i].geometry.coordinates[k].length;
            m++
          ) {
            if (
              v_lng ===
                allFeatures[i].geometry.coordinates[k][m][0].toFixed(
                  decimals
                ) &&
              v_lat ===
                allFeatures[i].geometry.coordinates[k][m][1].toFixed(decimals)
            ) {
              matchingVertices.push({
                featureId: allFeatures[i].id,
                coord_path: k + "." + m,
                //feature: map.getFeature(allFeatures[i].id),
                lng: allFeatures[i].geometry.coordinates[k][m][0],
                lat: allFeatures[i].geometry.coordinates[k][m][1],
              });
            }
          }
        }
      }
    }

    return matchingVertices;
  },
  getDrawInstance: (map) => {
    for (var i = map._controls.length - 1; i >= 0; i--) {
      if (
        map._controls[i].constructor.name === "MapboxDraw" ||
        map._controls[i].constructor.name === "ye"
      ) {
        return map._controls[i];
      }
    }
    return null;
  },
};

export default drawUtils;
