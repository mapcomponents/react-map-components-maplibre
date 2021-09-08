import React, { useContext } from "react";
import "jest-enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { mount, configure } from "enzyme";

jest.mock("maplibre-gl/dist/maplibre-gl", () => {
    const originalModule = jest.requireActual("maplibre-gl/dist/maplibre-gl");

    return {
        ...originalModule,
        GeolocateControl: jest.fn(),
        Map: function () {
            var self = this;
            this.layers = [];
            this.sources = [];

            return {
                addControl: jest.fn(),
                on: jest.fn(),
                once: (eventName, callback) => {
                    callback();
                },
                remove: jest.fn(),
                addSource: (id, source) => {
                    self.sources.push(id);
                },
                getSource: (id) => {
                    if (self.sources.indexOf(id) !== -1) {
                        return { setData: jest.fn() };
                    }
                    return false;
                },
                removeSource: (id) =>{
                    const sourcePosition = self.sources.indexOf(id);
                    if(sourcePosition !== -1) {
                        self.sources.splice(sourcePosition, 1);
                    }
                },
                addLayer: (id) =>{
                    self.layers.push(id);
                },
                getLayer: (id) =>{
                    if (self.layers.indexOf(id) !== -1) {
                        return { setData: jest.fn() };
                    }
                    return false;
                },
                removeLayer: (id) =>{
                    const layerPosition = self.layers.indexOf(id);
                    if(layerPosition !== -1) {
                        self.layers.splice(layerPosition, 1);
                    }
                },
                off: jest.fn(),
                setLayerZoomRange: jest.fn(),
                addImage: jest.fn(),
                loadImage: jest.fn(),
                removeImage: jest.fn(),
                hasImage: jest.fn(),
                project: jest.fn(),
            };
        },
        NavigationControl: jest.fn(),
    };
});

configure({ adapter: new Adapter() });

window.URL.createObjectURL = function () {};
window.HTMLCanvasElement.prototype.getContext = () => {};
