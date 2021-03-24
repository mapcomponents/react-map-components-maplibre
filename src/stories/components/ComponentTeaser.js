import React from "react";

const ComponentTeaser = (props) => {
  return (
    <a className="link-item" href={props.options.url}>
      <img src={"/__image_snapshots__/" + props.options.imgSrc} alt="repo" />
      <span>
        <strong>{props.options.title}</strong>
        <p>
          Test2 Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich.
          Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich.
          {props.options.description}
        </p>
      </span>
    </a>
  );
};

const ComponentTeaserList = (props) => {
  let screenshots = [
    {
      title: "MlMapDrawTools",
      description: "",
      url: "/?path=/story/mapcomponents-mlmapdrawtools--example-config",
      imgSrc:
        "storyshots-test-js-storyshots-map-components-ml-map-draw-tools-example-config-1-snap.png",
    },
    {
      title: "MlOsmLayer",
      description: "",
      url: "/?path=/story/mapcomponents-mlosmlayer--example-config",
      imgSrc:
        "storyshots-test-js-storyshots-map-components-ml-osm-layer-example-config-1-snap.png",
    },
    {
      title: "MlVectorTileLayer",
      description: "",
      url: "/?path=/story/mapcomponents-mlvectortilelayer--example-config",
      imgSrc:
        "storyshots-test-js-storyshots-map-components-ml-vector-tile-layer-example-config-1-snap.png",
    },
    {
      title: "MlWmsLayer",
      description: "",
      url: "/?path=/story/mapcomponents-mlwmslayer--example-config",
      imgSrc:
        "storyshots-test-js-storyshots-map-components-ml-wms-layer-example-config-1-snap.png",
    },
    {
      title: "MlCreatePdfButton",
      description: "",
      url: "/?path=/story/mapcomponents-mlcreatepdfbutton--example-config",
      imgSrc:
        "storyshots-test-js-storyshots-map-components-ml-create-pdf-button-example-config-1-snap.png",
    },
    {
      title: "MapLibreMap",
      description: "",
      url: "/?path=/story/core-maplibremap--example-config",
      imgSrc:
        "storyshots-test-js-storyshots-core-map-libre-map-example-config-1-snap.png",
    },
    {
      title: "MlCompositeLayer",
      description: "",
      url: "/?path=/story/mapcomponents-mlcompositelayer--example-config",
      imgSrc:
        "storyshots-test-js-storyshots-map-components-ml-composite-layer-example-config-1-snap_.png",
    },
    {
      title: "MlHillshadeLayer",
      description: "",
      url:
        "http://localhost:6006/?path=/story/mapcomponents-mlhillshadelayer--example-config",
      imgSrc:
        "storyshots-test-js-storyshots-map-components-ml-hillshade-layer-example-config-1-snap.png",
    },
  ];

  return screenshots.map(function (el) {
    return <ComponentTeaser options={el}></ComponentTeaser>;
  });
};

export { ComponentTeaser, ComponentTeaserList };
