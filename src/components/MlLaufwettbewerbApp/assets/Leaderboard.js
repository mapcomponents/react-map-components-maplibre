import React, { useEffect, useState, useContext } from "react";
import MlGeoJsonLayer from "../../MlGeoJsonLayer/MlGeoJsonLayer";
import * as turf from "@turf/turf";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useTheme } from "@material-ui/core/styles";
import { AppContext } from "./AppContext";

import LeaderboardEntry from "./LeaderboardEntry";

const usersPerPage = 6;

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [displayLeaders, setDisplayLeaders] = useState([]);
  const [individualProgress, setIndividualProgress] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedUser, setSelectedUser] = useState(false);
  const appContext = useContext(AppContext);

  const theme = useTheme();

  useEffect(() => {
    let tmpUsers = [...appContext.users];
    for (var i = 0, len = appContext.users.length; i < len; i++) {
      tmpUsers[i].distance = 0;
      if (typeof appContext.progressDataByUser[tmpUsers[i].id] !== "undefined") {
        tmpUsers[i].distance = appContext.progressDataByUser[tmpUsers[i].id];
      }
    }

    tmpUsers.sort((a, b) => {
      if (a.distance > b.distance) {
        return -1;
      }
      if (a.distance < b.distanceon) {
        return 1;
      }
      return 0;
    });

    setLeaders(tmpUsers);
  }, [appContext.users, appContext.progressDataByUser]);

  useEffect(() => {
    console.log(
      currentPage * usersPerPage,
      currentPage * usersPerPage + usersPerPage
    );
    console.log(
      leaders.slice(
        currentPage * usersPerPage,
        currentPage * usersPerPage + usersPerPage
      )
    );

    setDisplayLeaders(
      leaders.slice(
        currentPage * usersPerPage,
        currentPage * usersPerPage + usersPerPage
      )
    );
  }, [leaders, currentPage]);

  const showIndividualProgress = (distance) => {
    if (distance > 0) {
      let tmpRouteProgess = turf.lineChunk(appContext.route, distance);
      if (typeof tmpRouteProgess.features[0] !== "undefined") {
        setIndividualProgress(tmpRouteProgess.features[0]);
      }
    }
  };

  return (
    <>
      <div className="navigation">
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            {"<<"}
          </Button>
          <Button disabled={true}>{currentPage + 1}</Button>
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={(currentPage + 1) * usersPerPage >= leaders.length}
          >
            {">>"}
          </Button>
        </ButtonGroup>
      </div>
      {displayLeaders.map((data) => (
        <LeaderboardEntry
          onMouseOver={() => showIndividualProgress(data.distance)}
          onMouseLeave={() => setIndividualProgress(false)}
          onClick={() => setSelectedUser(data)}
          selectedUser={selectedUser}
          key={"lb_" + data.username}
          data={data}
        />
      ))}
      {individualProgress && (
        <MlGeoJsonLayer
          geojson={individualProgress}
          paint={{
            "line-color": theme.palette.error.dark,
            "line-width": 6,
          }}
          type="line"
        />
      )}
    </>
  );
}

export default Leaderboard;
