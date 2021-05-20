import React, { useCallback, useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { MapContext } from "react-map-components-core";

const AppContext = React.createContext({});
const AppStateProvider = AppContext.Provider;

const AppContextProvider = ({ children }) => {
  const mapContext = useContext(MapContext);
  const [displayDate, setDisplayDate] = useState("2021-06-07");

  const value = {
    displayDate,
    setDisplayDate,
  };

  return <AppStateProvider value={value}>{children}</AppStateProvider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppContextProvider };
