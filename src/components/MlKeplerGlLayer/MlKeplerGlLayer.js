import React, { useContext, useRef, useEffect, useState } from "react";
import { MapContext } from "react-map-components-core";

import { Provider } from "react-redux";
import MlBasicComponent from "../MlBasicComponent";
import Button from "@material-ui/core/Button";
import maplibregl from "maplibre-gl";

import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";

import KeplerGl from "kepler.gl";

import { createStore, applyMiddleware, compose } from "redux";

import window from "global/window";
import { taskMiddleware } from "react-palm/tasks";
import { routerMiddleware } from "react-router-redux";

import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import keplerGlReducer from "kepler.gl/reducers";

// INITIAL_APP_STATE
const initialAppState = {
  appName: "example",
  loaded: false,
};

const reducers = combineReducers({
  // mount keplerGl reducer
  keplerGl: keplerGlReducer,
  app: handleActions(
    {
      // empty
    },
    initialAppState
  ),
});

const middlewares = [taskMiddleware];

const enhancers = [applyMiddleware(...middlewares)];

const initialState = {};

// add redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, initialState, composeEnhancers(...enhancers));

/**
 * MlKeplerGlLayer adds kepler.gl layer to the maplibre-gl instance.
 */
const MlKeplerGlLayer = () => {
  return (
    <>
      <Provider store={store}>
        <AutoSizer>
          {({ height, width }) => (
            <KeplerGl
              id="maps"
              mapStyles={[
                {
                  id: "osm-bright",
                  url: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
                },
              ]}
              mapboxApiAccessToken="pk.eyJ1IjoibWF4dG9iaSIsImEiOiJjaW1rcWQ5bWMwMDJvd2hrbWZ2ZTBhcnM5In0.NcGt5NmLP5Q1WC7P5u6qUA"
              width={width}
              height={height}
            />
          )}
        </AutoSizer>
      </Provider>
    </>
  );
};

export default MlKeplerGlLayer;
