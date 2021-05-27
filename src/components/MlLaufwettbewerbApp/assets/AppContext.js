import React, { useCallback, useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { MapContext } from "react-map-components-core";

import * as turf from "@turf/turf";

// https://repo.wheregroup.com/api/v4/users?per_page=100&page=2&exclude_external=true&exclude_internal=true
// https://docs.gitlab.com/ee/api/users.html
// https://docs.gitlab.com/ce/api/#pagination
import user_data from "./users.json";
import route from "./route.json";

const AppContext = React.createContext({});
const AppStateProvider = AppContext.Provider;

const AppContextProvider = ({ children }) => {
  const [displayDate, setDisplayDate] = useState("2021-06-07");
  const [routeProgressInKm, setRouteProgressInKm] = useState(0);
  const [progressDataByDate, setProgressDataByDate] = useState({});
  const [progressDataByUser, setProgressDataByUser] = useState({});
  const [routeProgressFeature, setRouteProgressFeature] = useState();
  const [rawProgressData, setRawProgressData] = useState([]);
  const [routeProgressPosition, setRouteProgressPosition] = useState(false);
  const [users, setUsers] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (rawProgressData.length) {
      let byDate = {};
      let byUser = {};
      let totalKm = 0;
      for (var i = 0, len = rawProgressData.length; i < len; i++) {
        let distance = Math.round(rawProgressData[i].distance * 100) / 100;

        totalKm += distance;

        if (typeof byDate[rawProgressData[i].date] === "undefined") {
          byDate[rawProgressData[i].date] = 0;
        }
        byDate[rawProgressData[i].date] += distance;

        if (typeof byUser[rawProgressData[i].user_id] === "undefined") {
          byUser[rawProgressData[i].user_id] = 0;
        }
        byUser[rawProgressData[i].user_id] += distance;
      }

      for (let key in byUser) {
        byUser[key] = Math.round(byUser[key] * 100) / 100;
      }
      for (let key in byDate) {
        byDate[key] = Math.round(byDate[key] * 100) / 100;
      }

      setRouteProgressInKm(Math.round(totalKm * 100) / 100);
      setProgressDataByDate(byDate);
      setProgressDataByUser(byUser);

      // map mock_user_ids to users
      let user_ids = Object.keys(byUser);
      for (var i = 0, len = user_data.length; i < len; i++) {
        if (user_data[i].avatar_url) {
          user_data[i].id = user_ids.pop();
        } else {
          user_data[i].id = false;
        }
      }
      setUsers(user_data);
    }
  }, [rawProgressData]);

  useEffect(() => {
    if (routeProgressInKm > 0) {
      let tmpRouteProgess = turf.lineChunk(route, routeProgressInKm);
      if (typeof tmpRouteProgess.features[0] !== "undefined") {
        setRouteProgressFeature(tmpRouteProgess.features[0]);
        setRouteProgressPosition({
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                description: "Bonn",
              },
              geometry: {
                type: "Point",
                coordinates:
                  tmpRouteProgess.features[0].geometry.coordinates[
                    tmpRouteProgess.features[0].geometry.coordinates.length - 1
                  ],
              },
            },
          ],
        });
      }
    }
  }, [routeProgressInKm]);

  useEffect(() => {
    fetchProgressData();
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 1500);
    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
    };
  }, []);
  const fetchProgressData = () => {
    fetch("/assets/laufwettbewerb_mock_data.json")
      .then((response) => response.json())
      .then((progressData) => setRawProgressData(progressData));
  };

  const calculateProgressDataByUser = useCallback(
    (_rawProgressData) => {
      let displayDateDateObj = new Date(displayDate);

      let byUser = {};
      for (var i = 0, len = _rawProgressData.length; i < len; i++) {
        if (displayDateDateObj - new Date(_rawProgressData[i].date) >= 0) {
          let distance = Math.round(_rawProgressData[i].distance * 100) / 100;

          if (typeof byUser[_rawProgressData[i].user_id] === "undefined") {
            byUser[_rawProgressData[i].user_id] = 0;
          }
          byUser[_rawProgressData[i].user_id] += distance;
        }
      }

      for (let key in byUser) {
        byUser[key] = Math.round(byUser[key] * 100) / 100;
      }

      return byUser;
    },
    [displayDate]
  );

  useEffect(() => {
    if (progressDataByDate) {
      let displayDateDateObj = new Date(displayDate);
      let totalKm = 0;
      for (var key in progressDataByDate) {
        if (displayDateDateObj - new Date(key) >= 0) {
          totalKm += progressDataByDate[key];
        }
      }

      setRouteProgressInKm(Math.round(totalKm * 100) / 100);

      setProgressDataByUser(calculateProgressDataByUser(rawProgressData));
    }
  }, [
    displayDate,
    calculateProgressDataByUser,
    rawProgressData,
    progressDataByDate,
  ]);

  const value = {
    route,
    displayDate,
    setDisplayDate,
    routeProgressInKm,
    setRouteProgressInKm,
    progressDataByDate,
    setProgressDataByDate,
    progressDataByUser,
    setProgressDataByUser,
    routeProgressFeature,
    setRouteProgressFeature,
    rawProgressData,
    setRawProgressData,
    routeProgressPosition,
    setRouteProgressPosition,
    users,
    setUsers,
    darkMode,
    setDarkMode,
  };

  return <AppStateProvider value={value}>{children}</AppStateProvider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppContextProvider };
