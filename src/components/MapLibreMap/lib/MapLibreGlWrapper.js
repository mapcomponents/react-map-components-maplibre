const MapLibreGlWrapper = function (props) {
  let self = this;
  this.map = props.map;

  // element registration and cleanup on a component level is experimental
  this.registeredElements = {};

  this.initRegisteredElements = (componentId) => {
    if (typeof self.registeredElements[componentId] === "undefined") {
      self.registeredElements[componentId] = {
        layers: [],
        sources: [],
        images: [],
        events: [],
      };
    }
  };

  this.on = (type, layerId, listener, componentId) => {
    if (typeof listener === "string" && typeof layerId === "function") {
      return self.on.call(self, type, undefined, layerId, listener);
    }
    if (componentId && typeof componentId === "string") {
      self.initRegisteredElements(componentId);
      self.registeredElements[componentId].events.push([type, layerId, listener]);
    }

    self.map.on(type, layerId, listener);
  };

  this.cleanup = (componentId) => {
    if (typeof self.registeredElements[componentId] !== "undefined") {
      // cleanup layers
      self.registeredElements[componentId].layers.forEach((item) => {
        if (self.getLayer(item)) {
          self.removeLayer(item);
        }
      });

      // cleanup sources
      self.registeredElements[componentId].sources.forEach((item) => {
        if (self.getSource(item)) {
          self.removeSource(item);
        }
      });

      // cleanup images
      self.registeredElements[componentId].images.forEach((item) => {
        if (self.hasImage(item)) {
          self.removeImage(item);
        }
      });

      // cleanup events
      self.registeredElements[componentId].events.forEach((item) => {
        self.off(...item);
      });
    }
  };

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
  let styleFunctions = [
    "getLayer",
    "getSource",
    "listImages",
    "getPaintProperty",
    "getLayoutProperty",
  ];
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
