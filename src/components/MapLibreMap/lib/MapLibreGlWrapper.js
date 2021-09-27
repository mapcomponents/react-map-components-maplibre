const MapLibreGlWrapper = function (props) {
  let self = this;
  this.map = props.map;

  // add style prop functions that require map._update to be called afterwards
  let updatingStyleFunctions = [
    "addLayer",
    "moveLayer",
    "removeLayer",
    "addSource",
    "removeSource",
    "setPaintProperty",
    "setLayoutProperty",
  ];
  updatingStyleFunctions.map((item) => {
    this[item] = (...props) => {
      if (self.map && this.map.style && typeof self.map.style[item] === "function") {
        self.map.style[item](...props);
      }
      return self.map._update ? self.map._update(true) : undefined;
    };
  });

  // add style prop functions
  let styleFunctions = ["listImages", "getPaintProperty", "getLayoutProperty"];
  styleFunctions.map((item) => {
    this[item] = (...props) => {
      if (self.map && self.map.style) {
        return self.map.style[item](...props);
      }
      return false;
    };
  });

  //  add MapLibre-gl functions
  Object.keys(this.map.__proto__).forEach((item) => {
    if (typeof this[item] === "undefined") {
      this[item] = (...props) => self.map[item](...props);
    }
  });

  //  add MapLibre-gl properties
  Object.keys(this.map).forEach((item) => {
    if (typeof this[item] === "undefined") {
      this[item] = self.map[item];
    }
  });
};

export default MapLibreGlWrapper;
