const getDefaultPaintPropsByType = (type) => {
  switch (type) {
    case "fill":
      return {
        "fill-color": "rgba(10,240,256,0.6)",
      };
    case "line":
      return {
        "line-color": "rgb(100,200,100)",
        "line-width": 5,
      };
    case "circle":
    default:
      return {
        "circle-color": "#44aaaa",
        "circle-stroke-color": "#fff",
        "circle-stroke-width": 2,
      };
  }
};

export default getDefaultPaintPropsByType;
