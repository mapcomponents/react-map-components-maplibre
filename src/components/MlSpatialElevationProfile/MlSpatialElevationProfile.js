import React, { useCallback, useRef, useContext, useEffect } from "react";
import { MapContext } from "@mapcomponents/react-core";
import GeoJsonContext from "../MlGPXViewer/util/GeoJsonContext";
import { polygon, lineString } from "@turf/helpers";
import { distance, lineOffset } from "@turf/turf";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

/**
 * MlSpatialElevationProfile returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 *
 * @component
 */
const MlSpatialElevationProfile = (props) => {
  const mapContext = useContext(MapContext);

  const componentId = useRef(
    (props.idPrefix ? props.idPrefix : "MlSpatialElevationProfile-") + uuidv4()
  );
  const mapRef = useRef(null);
  const initializedRef = useRef(false);

  const dataSource = useContext(GeoJsonContext);
  const sourceName = useRef("elevationprofile-" + uuidv4());
  const layerName = useRef("elevationprofile-layer-" + uuidv4());

  const createStep = useCallback(
    (x, y, z, x2, y2) => {
      //const summand = 0.0002;
      const line = lineString([
        [x, y],
        [x2, y2],
      ]);
      const offsetLine = lineOffset(line, 5, { units: "meters" });
      const x3 = offsetLine.geometry.coordinates[0][0];
      const y3 = offsetLine.geometry.coordinates[0][1];
      const x4 = offsetLine.geometry.coordinates[1][0];
      const y4 = offsetLine.geometry.coordinates[1][1];

      return polygon(
        [
          [
            [x, y],
            [x2, y2],

            [x4, y4],
            [x3, y3],
            [x, y],
          ],
        ],
        { height: z * props.elevationFactor }
      );
    },
    [props.elevationFactor]
  );

  useEffect(() => {
    let _componentId = componentId.current;
    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);

        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;

    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);

    mapRef.current.addSource(
      sourceName.current,
      {
        type: "geojson",
        data: dataSource.data,
      },
      componentId.current
    );
    mapRef.current.addLayer(
      {
        id: layerName.current,
        source: sourceName.current,
        type: "fill-extrusion",
        paint: {
          "fill-extrusion-height": ["get", "height"],
          "fill-extrusion-opacity": 0.9,
          "fill-extrusion-color": [
            "interpolate",
            ["linear"],
            ["get", "height"],
            0,
            "rgba(0, 0, 255, 0)",
            0.1,
            "royalblue",
            0.3,
            "cyan",
            0.5,
            "lime",
            0.7,
            "yellow",
            1,
            "yellow",
          ],
        },
      },
      props.insertBeforeLayer,
      componentId.current
    );
  }, [
    mapContext.mapIds,
    props.insertBeforeLayer,
    props.mapId,
    dataSource,
    mapContext,
  ]);

  useEffect(() => {
    if (!mapRef.current || !mapRef.current.getLayer(layerName.current)) return;
    const { data } = dataSource;
    if (!data || !data.features) return;

    const line = data.features.find((element) => {
      return element.geometry.type === "LineString";
    });
    if (!line || !line.geometry) return;
    const heights = line.geometry.coordinates.map((coordinate, index) => {
      return coordinate[2];
    });

    const min = Math.min(...heights);

    let max = Math.max(...heights) - min;

    max = max === 0 ? 1 : max;

    mapRef.current.setPaintProperty(layerName.current, "fill-extrusion-color", [
      "interpolate",
      ["linear"],
      ["get", "height"],
      0,
      "rgb(0,255,55)",
      max * props.elevationFactor,
      "rgb(255,0,0)",
    ]);
    const lerp = (x, y, a) => x * (1 - a) + y * a;
    const points = [];

    line.geometry.coordinates.forEach((coordinate, index) => {
      //const point = createPoint(coordinate[0],coordinate[1],coordinate[2]-min);
      //points.push(point);
      if (line.geometry.coordinates[index + 1]) {
        const wayLength = distance(
          [coordinate[0], coordinate[1]],
          [
            line.geometry.coordinates[index + 1][0],
            line.geometry.coordinates[index + 1][1],
          ],
          { units: "kilometers" }
        );
        let listLength = ~~((wayLength * 1000) / 10);
        listLength = listLength < 1 ? 1 : listLength;
        for (let i = 0; i < listLength; i++) {
          const x = lerp(
            line.geometry.coordinates[index][0],
            line.geometry.coordinates[index + 1][0],
            i / listLength
          );
          const y = lerp(
            line.geometry.coordinates[index][1],
            line.geometry.coordinates[index + 1][1],
            i / listLength
          );
          const z = lerp(
            line.geometry.coordinates[index][2] - min,
            line.geometry.coordinates[index + 1][2] - min,
            i / listLength
          );

          const x2 = lerp(
            line.geometry.coordinates[index][0],
            line.geometry.coordinates[index + 1][0],
            (i + 1) / listLength
          );
          const y2 = lerp(
            line.geometry.coordinates[index][1],
            line.geometry.coordinates[index + 1][1],
            (i + 1) / listLength
          );

          const point = createStep(x, y, z, x2, y2);
          points.push(point);
        }
      }
    });

    const newData = dataSource.getEmptyFeatureCollection();
    newData.features = points;

    mapRef.current.getSource(sourceName.current)?.setData(newData);
  }, [dataSource.data, createStep, dataSource, props.elevationFactor, mapContext]);

  return <></>;
};

MlSpatialElevationProfile.defaultProps = {
  elevationFactor: 1,
};

MlSpatialElevationProfile.propTypes = {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId: PropTypes.string,
  /**
   * Prefix of the component id this component uses when adding elements to the MapLibreGl-instance
   */
  idPrefix: PropTypes.string,
  /**
   * Number describes the factor of the height of the elevation
   */
  elevationFactor: PropTypes.number,
  /**
   * The layerId of an existing layer this layer should be rendered visually beneath
   * https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer - see "beforeId" property
   */
  insertBeforeLayer: PropTypes.string,
}

export default MlSpatialElevationProfile;
