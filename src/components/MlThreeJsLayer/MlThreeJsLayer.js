import React, { useContext, useRef, useEffect, useState } from "react";
import { MapContext } from "react-map-components-core";

import Button from "@material-ui/core/Button";
import maplibregl from "maplibre-gl";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

/**
 * MlThreeJsLayer returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */
const MlThreeJsLayer = () => {
  const mapContext = useContext(MapContext);

  const layerRef = useRef(null);
  const layerName = "3d-model";
  const [showLayer, setShowLayer] = useState(true);
  const showLayerRef = useRef(true);
  const idPostfixRef = useRef(new Date().getTime());

  const componentCleanup = () => {
    if (mapContext.map.getLayer(layerName)) {
      mapContext.map.removeLayer(layerName);
    }
    if (mapContext.map.getSource(layerName + "-source")) {
      mapContext.map.removeSource(layerName + "-source");
    }
  };

  let rotateCamera = (timestamp) => {
    // clamp the rotation between 0 -360 degrees
    // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
    mapContext.map.rotateTo((timestamp / 100) % 360, { duration: 0 });
    // Request the next frame of the animation.
    console.log(showLayer);
    if (showLayerRef.current) {
      requestAnimationFrame(rotateCamera);
    }
  };

  useEffect(() => {
    if (!mapContext.map) return;

    return () => {
      componentCleanup();
    };
  }, []);

  useEffect(() => {
    if (!mapContext.map) return;

    // cleanup fragments left in MapLibre-gl from previous component uses
    componentCleanup();

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
      scale:
        modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() + 0.00000003,
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
          "/assets/3D/posttower.gltf",
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
            new THREE.Vector3(
              modelTransform.scale,
              -modelTransform.scale,
              modelTransform.scale
            )
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

    mapContext.map.addLayer(customLayer);

    if (mapContext.map.getLayer(layerName)) {
      mapContext.map.setLayoutProperty(layerName, "visibility", "visible");
    }
    mapContext.map.setCenter([7.132122000552613, 50.716405378037706]);
    mapContext.map.setZoom(16);
    mapContext.map.setPitch(45);
  }, [mapContext.map]);

  useEffect(() => {
    if (!mapContext.map) return;

    if (mapContext.map.getLayer(layerName)) {
      // toggle layer visibility by changing the layout object's visibility property
      if (showLayer) {
        mapContext.map.setLayoutProperty(layerName, "visibility", "visible");
        rotateCamera(0);
      } else {
        mapContext.map.setLayoutProperty(layerName, "visibility", "none");
      }
    }
    //
  }, [showLayer, mapContext, rotateCamera]);

  return (
    <Button
      color="primary"
      variant={showLayer ? "contained" : "outlined"}
      onClick={() => {
        setShowLayer(!showLayer);
        showLayerRef.current = !showLayer;
      }}
    >
      ThreeJs
    </Button>
  );
};

export default MlThreeJsLayer;
