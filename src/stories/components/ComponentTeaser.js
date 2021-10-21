import React from "react";

const ComponentTeaser = (props) => {
  return (
    <a className="link-item" href={props.options.url}>
      <img src={"/thumbnails/" + props.options.title + ".png"} alt="repo" />
      <span>
        <strong>{props.options.title}</strong>
        <p>{props.options.description}</p>
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
    },
    {
      title: "MlOsmLayer",
      description: "",
      url: "/?path=/story/mapcomponents-mlosmlayer--example-config",
    },
    {
      title: "MlVectorTileLayer",
      description: "",
      url: "/?path=/story/mapcomponents-mlvectortilelayer--example-config",
    },
    {
      title: "MlWmsLayer",
      description: "",
      url: "/?path=/story/mapcomponents-mlwmslayer--example-config",
    },
    {
      title: "MlCreatePdfButton",
      description: "",
      url: "/?path=/story/mapcomponents-mlcreatepdfbutton--example-config",
    },
    {
      title: "MapLibreMap",
      description: "",
      url: "/?path=/story/core-maplibremap--example-config",
    },
    {
      title: "MlFillExtrusionLayer",
      description: "",
      url: "/?path=/story/mapcomponents-mlcompositelayer--example-config",
    },
    {
      title: "MlHillshadeLayer",
      description: "",
      url: "http://localhost:6006/?path=/story/mapcomponents-mlhillshadelayer--example-config",
    },
  ];

  return screenshots.map(function (el) {
    return <ComponentTeaser options={el}></ComponentTeaser>;
  });
};

export { ComponentTeaser, ComponentTeaserList };
