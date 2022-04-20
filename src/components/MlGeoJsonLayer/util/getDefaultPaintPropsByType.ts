const getDefaultPaintPropsByType:Function = (type:string, defaultPaintOverrides:any):any => {
  switch (type) {
    case "fill":
      if (defaultPaintOverrides?.fill) {
        return defaultPaintOverrides.fill;
      }
      return {
        "fill-color": "rgba(10,240,256,0.6)",
      };
    case "line":
      if (defaultPaintOverrides?.line) {
        return defaultPaintOverrides.line;
      }
      return {
        "line-color": "rgb(203,211,2)",
        "line-width": 5,
      };
    case "circle":
    default:
      if (defaultPaintOverrides?.circle) {
        return defaultPaintOverrides.circle;
      }
      return {
        "circle-color": "rgba(10,240,256)",
        "circle-stroke-color": "#fff",
        "circle-stroke-width": 2,
      };
  }
};

export default getDefaultPaintPropsByType;
