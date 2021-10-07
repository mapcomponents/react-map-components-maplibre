import React, { useRef, useEffect, useState, useContext } from "react";

import { MapContext } from "react-map-components-core";

import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import beeImg from "./assets/bee.png";

const MlDraggableFeatureLayer = (props) => {
  const mapContext = useContext(MapContext);
  const [flightRangeVisible, setFlightRangeVisible] = useState(true);
  const flightRangeVisible_ = useRef(true);
  const vectorLayerRef = useRef(null);
  const vectorSourceRef = useRef(null);

  const mainFlightRadius = [1, 2, 2.5, 3, 3.5];
  const [selectedMainFlightRadius, setSelectedMainFlightRadius] = useState(2);

  const reachableFlightRadius = [
    4,
    4.5,
    5,
    5.5,
    6,
    6.5,
    7,
    7.5,
    8,
    8.5,
    9,
    9.5,
    10,
    10.5,
    11,
  ];

  const pointFeatureRef = useRef(null);
  const polygonFeatureRef = useRef(null);

  useEffect(() => {
    if (!mapContext.map) return;

    return () => {
      mapContext.map.removeLayer(vectorLayerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!mapContext.map) return;

    //    var center = mapContext.map.getView().getCenter();
    //
    //    var pointFeature = new MlFeature(new Point(center));
    //    var polygonFeature = new MlFeature(
    //      new Circle([center[0], center[1]], 1000)
    //    );
    //    pointFeatureRef.current = pointFeature;
    //    polygonFeatureRef.current = polygonFeature;
    //
    //    var Drag = /*@__PURE__*/ (function (PointerInteraction) {
    //      function Drag() {
    //        PointerInteraction.call(this, {
    //          handleDownEvent: handleDownEvent,
    //          handleDragEvent: handleDragEvent,
    //          handleMoveEvent: handleMoveEvent,
    //          handleUpEvent: handleUpEvent,
    //        });
    //
    //        this.polygonFeature = polygonFeature;
    //        this.pointFeature = pointFeature;
    //
    //        /**
    //         * @type {import("../src/ol/coordinate.js").Coordinate}
    //         * @private
    //         */
    //        this.coordinate_ = null;
    //
    //        /**
    //         * @type {string|undefined}
    //         * @private
    //         */
    //        this.cursor_ = "pointer";
    //
    //        /**
    //         * @type {Feature}
    //         * @private
    //         */
    //        this.feature_ = null;
    //
    //        /**
    //         * @type {string|undefined}
    //         * @private
    //         */
    //        this.previousCursor_ = undefined;
    //      }
    //
    //      if (PointerInteraction) Drag.__proto__ = PointerInteraction;
    //      Drag.prototype = Object.create(
    //        PointerInteraction && PointerInteraction.prototype
    //      );
    //      Drag.prototype.constructor = Drag;
    //
    //      return Drag;
    //})(PointerInteraction);

    /**
     * @param {import("../src/ol/MapBrowserEvent.js").default} evt Map browser event.
     * @return {boolean} `true` to start the drag sequence.
     */
    function handleDownEvent(evt) {
      var map = evt.map;

      var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });

      if (feature) {
        this.coordinate_ = evt.coordinate;
        this.feature_ = feature;
      }

      return !!feature;
    }

    function handleDragEvent(evt) {
      //      if (
      //        !flightRangeVisible_.current &&
      //        //this.feature_.getGeometry() instanceof Circle
      //      )
      //        return;

      var deltaX = evt.coordinate[0] - this.coordinate_[0];
      var deltaY = evt.coordinate[1] - this.coordinate_[1];

      var geometry = this.feature_.getGeometry();
      geometry.translate(deltaX, deltaY);

      // make sure the features always move synchronously
      if (
        //geometry instanceof Point &&
        this.polygonFeature &&
        this.polygonFeature.values_.geometry.flatCoordinates
      ) {
        this.polygonFeature.values_.geometry.translate(deltaX, deltaY);
      } else {
        this.pointFeature.values_.geometry.translate(deltaX, deltaY);
      }

      this.coordinate_[0] = evt.coordinate[0];
      this.coordinate_[1] = evt.coordinate[1];
    }

    function handleMoveEvent(evt) {
      if (this.cursor_) {
        var map = evt.map;
        var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
          return feature;
        });
        var element = evt.map.getTargetElement();
        if (feature) {
          if (element.style.cursor != this.cursor_) {
            this.previousCursor_ = element.style.cursor;
            element.style.cursor = this.cursor_;
          }
        } else if (this.previousCursor_ !== undefined) {
          element.style.cursor = this.previousCursor_;
          this.previousCursor_ = undefined;
        }
      }
    }

    /**
     * @return {boolean} `false` to stop the drag sequence.
     */
    function handleUpEvent() {
      this.coordinate_ = null;
      this.feature_ = null;
      return false;
    }
    //    vectorSourceRef.current = new VectorSource({
    //      features: [polygonFeature, pointFeature],
    //    });
    //    vectorLayerRef.current = new VectorLayer({
    //      source: vectorSourceRef.current,
    //      projection: "EPSG:3857",
    //      //projection: 'EPSG:4326',
    //      zIndex: 10,
    //      style: (feature, resolution) => {
    //        if (feature.values_.geometry instanceof Circle) {
    //          return flightRangeVisible_.current
    //            ? new Style({
    //                stroke: new Stroke({
    //                  width: 3,
    //                  color: [255, 0, 0, 0.3],
    //                }),
    //                fill: new Fill({
    //                  color: [0, 0, 255, 0.3],
    //                }),
    //              })
    //            : null;
    //        } else {
    //          return new Style({
    //            image: new Icon({
    //              opacity: 0.95,
    //              scale: 0.1,
    //              size: [500, 500],
    //              imgSize: [500, 500],
    //              src: beeImg,
    //            }),
    //          });
    //        }
    //      },
    //    });
    //
    //    mapContext.map.addLayer(vectorLayerRef.current);
    //
    //    mapContext.map.addInteraction(new Drag());
  }, [mapContext.map]);

  useEffect(() => {
    if (!polygonFeatureRef.current) return;
    polygonFeatureRef.current.values_.geometry.setRadius(
      selectedMainFlightRadius * 1000
    );
    vectorSourceRef.current.changed();
  }, [selectedMainFlightRadius]);

  return (
    <>
      <Button
        color="primary"
        variant={flightRangeVisible ? "contained" : "outlined"}
        onClick={() => {
          if (vectorSourceRef.current) {
            setFlightRangeVisible(!flightRangeVisible);
            flightRangeVisible_.current = !flightRangeVisible;
            vectorSourceRef.current.changed();
          }
        }}
      >
        Fluggebiet zeigen
      </Button>
      <FormControl>
        <InputLabel id="flightRadiusSelect-label">Hauptfluggebiet</InputLabel>

        <Select
          labelId="flightRadiusSelect-label"
          id="flightRadiusSelect"
          value={selectedMainFlightRadius}
          onChange={(ev) => {
            setSelectedMainFlightRadius(ev.target.value);
          }}
          margin="dense"
        >
          {mainFlightRadius.map((el) => (
            <MenuItem key={el} value={el}>
              {el} Km
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default MlDraggableFeatureLayer;
