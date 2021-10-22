import React, { useContext, useRef, useEffect, useState } from "react";
import { MapContext } from "react-map-components-core";

import Button from "@mui/material/Button";
import maplibregl from "maplibre-gl";
import * as THREE from "three";
import GLTFLoader from "./lib/GLTFLoader";
import PropTypes from "prop-types";

/**
 * Renders obj or gltf 3D Models on the MapLibreMap referenced by props.mapId
 *
 * @component
 */
const MlThreeJsLayer = (props) => {
  const mapContext = useContext(MapContext);

  const layerName = "3d-model";
  const [showLayer, setShowLayer] = useState(true);
  const showLayerRef = useRef(true);
  const initializedRef = useRef(false);
  const mapRef = useRef(null);
  const initFuncRef = useRef(props.init);

  const cleanup = () => {
    if (mapRef.current && mapRef.current.style) {
      if (mapRef.current.getLayer(layerName)) {
        mapRef.current.removeLayer(layerName);
      }
      mapRef.current = null;
    }
  };

  useEffect(() => {
    if (typeof initFuncRef.current === "function") {
      initFuncRef.current();
    }

    return cleanup;
  }, []);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;

    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);

    // parameters to ensure the model is georeferenced correctly on the map
    var modelOrigin = [7.1300753566457304, 50.71596191210998];
    var modelAltitude = 0;
    var modelRotate = [Math.PI / 2, 90, 0];

    var modelAsMercatorCoordinate = maplibregl.MercatorCoordinate.fromLngLat(
      modelOrigin,
      modelAltitude
    );

    // transformation parameters to position, rotate and scale the 3D model onto the map
    var modelTransform = {
      translateX: modelAsMercatorCoordinate.x + 0.0000008,
      translateY: modelAsMercatorCoordinate.y + 0.0000018,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      /* Since our 3D model is in real world meters, a scale transform needs to be
       * applied since the CustomLayerInterface expects units in MercatorCoordinates.
       */
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() + 0.00000003,
    };

    //var THREE = window.THREE;

    // configuration of the custom layer for a 3D model per the CustomLayerInterface
    var customLayer = {
      id: "3d-model",
      type: "custom",
      renderingMode: "3d",
      onAdd: function (map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();

        // create two three.js lights to illuminate the model
        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);

        var directionalLight2 = new THREE.DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight2);

        // use the three.js GLTF loader to add the 3D model to the three.js scene
        var loader = new GLTFLoader();
        loader.load(
          //"/assets/3D/posttower_simple.gltf",
          "/assets/3D/godzilla_simple.glb",
          //"https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf",
          function (gltf) {
            this.scene.add(gltf.scene);
            if (typeof props.onDone === "function") {
              props.onDone();
            }
          }.bind(this)
        );
        loader.load(
          "/assets/3D/posttower.gltf",
          //"/assets/3D/posttower_wh.gltf.glb",
          //"https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf",
          function (gltf) {
            this.scene.add(gltf.scene);
          }.bind(this)
        );
        this.map = map;

        // use the Mapbox GL JS map canvas for three.js
        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true,
        });

        this.renderer.autoClear = false;
      },
      render: function (gl, matrix) {
        var rotationX = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(1, 0, 0),
          modelTransform.rotateX
        );
        var rotationY = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 1, 0),
          modelTransform.rotateY
        );
        var rotationZ = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 0, 1),
          modelTransform.rotateZ
        );

        var m = new THREE.Matrix4().fromArray(matrix);
        var l = new THREE.Matrix4()
          .makeTranslation(
            modelTransform.translateX,
            modelTransform.translateY,
            modelTransform.translateZ
          )
          .scale(
            new THREE.Vector3(modelTransform.scale, -modelTransform.scale, modelTransform.scale)
          )
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ);

        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
      },
    };

    mapRef.current.addLayer(customLayer);

    if (mapRef.current.getLayer(layerName)) {
      mapRef.current.setLayoutProperty(layerName, "visibility", "visible");
    }
    mapRef.current.setCenter([7.130255969902919, 50.7143656091998]);
    mapRef.current.setZoom(15);
    mapRef.current.setPitch(45);
  }, [mapContext.mapIds, mapContext, props]);

  useEffect(() => {
    if (!mapRef.current) return;

    if (mapRef.current.getLayer(layerName)) {
      // toggle layer visibility by changing the layout object's visibility property
      if (showLayer) {
        mapRef.current.setLayoutProperty(layerName, "visibility", "visible");
      } else {
        mapRef.current.setLayoutProperty(layerName, "visibility", "none");
      }
    }
    //
  }, [showLayer, mapContext]);

  return (
    <>
      <Button
        color="primary"
        variant={showLayer ? "contained" : "outlined"}
        onClick={() => {
          setShowLayer(!showLayer);
          showLayerRef.current = !showLayer;
        }}
      >
        3D
      </Button>
    </>
  );
};

MlThreeJsLayer.propTypes = {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId: PropTypes.string,
  /**
   * function that gets called when initialized
   */
  init: PropTypes.func,
  /**
   * function that gets called when models are loaded
   */
  onDone: PropTypes.func,
};

export default MlThreeJsLayer;
