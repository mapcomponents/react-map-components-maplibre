"use strict";
/* global mapboxgl */

var syncMove = require("@mapbox/mapbox-gl-sync-move");
var EventEmitter = require("events").EventEmitter;

/**
 * @param {Object} a The first Mapbox GL Map
 * @param {Object} b The second Mapbox GL Map
 * @param {string|HTMLElement} container An HTML Element, or an element selector string for the compare container. It should be a wrapper around the two map Elements.
 * @param {Object} options
 * @param {string} [options.orientation=vertical] The orientation of the compare slider. `vertical` creates a vertical slider bar to compare one map on the left (map A) with another map on the right (map B). `horizontal` creates a horizontal slider bar to compare on mop on the top (map A) and another map on the bottom (map B).
 * @param {boolean} [options.mousemove=false] If `true` the compare slider will move with the cursor, otherwise the slider will need to be dragged to move.
 * @example
 * var compare = new mapboxgl.Compare(beforeMap, afterMap, '#wrapper', {
 *   orientation: 'vertical',
 *   mousemove: true
 * });
 * @see [Swipe between maps](https://www.mapbox.com/mapbox-gl-js/example/mapbox-gl-compare/)
 */
function Compare(a, b, container, options) {
  this.options = options ? options : {};
  this._mapA = a;
  this._mapB = b;
  this._horizontal = this.options.orientation === "horizontal";
  this._onDown = this._onDown.bind(this);
  this._onMove = this._onMove.bind(this);
  this._onMouseUp = this._onMouseUp.bind(this);
  this._onTouchEnd = this._onTouchEnd.bind(this);
  this._ev = new EventEmitter();

  this._bounds = b.getContainer().getBoundingClientRect();
  var swiperPosition =
    (this._horizontal ? this._bounds.height : this._bounds.width) / 2;
  this._setPosition(swiperPosition);

  this._clearSync = syncMove(a, b);
  this._onResize = function () {
    this._bounds = b.getContainer().getBoundingClientRect();
    if (this.currentPosition) this._setPosition(this.currentPosition);
  }.bind(this);

  b.on("resize", this._onResize);

  if (this.options && this.options.mousemove) {
    a.getContainer().addEventListener("mousemove", this._onMove);
    b.getContainer().addEventListener("mousemove", this._onMove);
  }
}

Compare.prototype = {
  _onDown: function (e) {
    if (e.touches) {
      document.addEventListener("touchmove", this._onMove);
      document.addEventListener("touchend", this._onTouchEnd);
    } else {
      document.addEventListener("mousemove", this._onMove);
      document.addEventListener("mouseup", this._onMouseUp);
    }
  },

  _setPosition: function (x) {
    x = Math.min(x, this._horizontal ? this._bounds.height : this._bounds.width);
    var pos = this._horizontal
      ? "translate(0, " + x + "px)"
      : "translate(" + x + "px, 0)";
    var magnifyRadius = parseInt(this._bounds.height - 500);
    var clipB =
      "circle(" +
      magnifyRadius +
      "px at " +
      parseInt((x / this._bounds.width) * 100) +
      "% 55%)";

    //clip-path: circle(60px at 50% 50%);
    this._mapB.getContainer().style.clipPath = clipB;
    this.currentPosition = x;
  },

  _onMove: function (e) {},

  _onMouseUp: function () {
    document.removeEventListener("mousemove", this._onMove);
    document.removeEventListener("mouseup", this._onMouseUp);
    this.fire("slideend", { currentPosition: this.currentPosition });
  },

  _onTouchEnd: function () {
    document.removeEventListener("touchmove", this._onMove);
    document.removeEventListener("touchend", this._onTouchEnd);
  },

  _getX: function (e) {
    e = e.touches ? e.touches[0] : e;
    var x = e.clientX - this._bounds.left;
    if (x < 0) x = 0;
    if (x > this._bounds.width) x = this._bounds.width;
    return x;
  },

  _getY: function (e) {
    e = e.touches ? e.touches[0] : e;
    var y = e.clientY - this._bounds.top;
    if (y < 0) y = 0;
    if (y > this._bounds.height) y = this._bounds.height;
    return y;
  },

  /**
   * Set the position of the slider.
   *
   * @param {number} x Slider position in pixels from left/top.
   */
  setSlider: function (x) {
    this._setPosition(x);
  },

  /**
   * Adds a listener for events of a specified type.
   *
   * @param {string} type The event type to listen for; one of `slideend`.
   * @param {Function} listener The function to be called when the event is fired.
   * @returns {Compare} `this`
   */
  on: function (type, fn) {
    this._ev.on(type, fn);
    return this;
  },

  /**
   * Fire an event of a specified type.
   *
   * @param {string} type The event type to fire; one of `slideend`.
   * @param {Object} data Data passed to the event listener.
   * @returns {Compare} `this`
   */
  fire: function (type, data) {
    this._ev.emit(type, data);
    return this;
  },

  /**
   * Removes an event listener previously added with `Compare#on`.
   *
   * @param {string} type The event type previously used to install the listener.
   * @param {Function} listener The function previously installed as a listener.
   * @returns {Compare} `this`
   */
  off: function (type, fn) {
    this._ev.removeListener(type, fn);
    return this;
  },

  remove: function () {
    this._clearSync();
    this._mapB.off("resize", this._onResize);
    var aContainer = this._mapA.getContainer();

    if (!!aContainer) {
      aContainer.style.clip = null;
      aContainer.removeEventListener("mousemove", this._onMove);
    }

    var bContainer = this._mapB.getContainer();

    if (!!bContainer) {
      bContainer.style.clip = null;
      bContainer.removeEventListener("mousemove", this._onMove);
    }
  },
};

export default Compare;
