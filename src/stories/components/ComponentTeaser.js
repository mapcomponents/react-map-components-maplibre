import React from "react";

const ComponentTeaser = (props) => {
  return (
    <a className="link-item" href="https://storybook.js.org/docs">
      <img src={"/__image_snapshots__/" + props.options.imgSrc} alt="repo" />
      <span>
        <strong>{props.options.title}</strong>
        {props.options.description}
      </span>
    </a>
  );
};

const ComponentTeaserList = (props) => {
  let screenshots = [
    {
      title: "MlMapDrawTools",
      description: "",
      imgSrc:
        "storyshots-test-js-storyshots-map-components-ml-map-draw-tools-example-config-1-snap.png",
    },
    {
      title: "MlOsmLayer",
      description: "",
      imgSrc:
        "storyshots-test-js-storyshots-map-components-ml-osm-layer-example-config-1-snap.png",
    },
    {
      title: "MlVectorTileLayer",
      description: "",
      imgSrc:
        "storyshots-test-js-storyshots-map-components-ml-vector-tile-layer-example-config-1-snap.png",
    },
    {
      title: "MlWmsLayer",
      description: "",
      imgSrc:
        "storyshots-test-js-storyshots-map-components-ml-wms-layer-example-config-1-snap.png",
    },
    {
      title: "MlCreatePdfButton",
      description: "",
      imgSrc:
        "storyshots-test-js-storyshots-map-components-ml-create-pdf-button-example-config-1-snap.png",
    },
    {
      title: "MapLibreMap",
      description: "",
      imgSrc:
        "storyshots-test-js-storyshots-core-map-libre-map-example-config-1-snap.png",
    },
    {
      title: "MlCompositeLayer",
      description: "",
      imgSrc:
        "storyshots-test-js-storyshots-map-components-ml-composite-layer-example-config-1-snap_.png",
    },
    {
      title: "MlHillshadeLayer",
      description: "",
      imgSrc:
        "storyshots-test-js-storyshots-map-components-ml-hillshade-layer-example-config-1-snap.png",
    },
  ];

  return screenshots.map(function (el) {
    return <ComponentTeaser options={el}></ComponentTeaser>;
  });
};

export { ComponentTeaser, ComponentTeaserList };
