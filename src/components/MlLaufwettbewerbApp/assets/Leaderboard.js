import React, { useEffect, useState } from "react";
import MlGeoJsonLayer from "../../MlGeoJsonLayer/MlGeoJsonLayer";
import * as turf from "@turf/turf";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import LeaderboardEntry from "./LeaderboardEntry";

const usersPerPage = 5;

function Leaderboard({ users, progressDataByUser, route }) {
  const [leaders, setLeaders] = useState([]);
  const [displayLeaders, setDisplayLeaders] = useState([]);
  const [individualProgress, setIndividualProgress] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    let tmpUsers = [...users];
    for (var i = 0, len = users.length; i < len; i++) {
      if (typeof progressDataByUser[tmpUsers[i].id] !== "undefined") {
        tmpUsers[i].distance = progressDataByUser[tmpUsers[i].id];
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
  }, [users, progressDataByUser]);

  useEffect(() => {
    setDisplayLeaders(
      leaders.slice(
        currentPage * usersPerPage,
        currentPage * usersPerPage + usersPerPage
      )
    );
  }, [leaders, currentPage]);

  const showIndividualProgress = (distance) => {
    if (distance > 0) {
      let tmpRouteProgess = turf.lineChunk(route, distance);
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
            disabled={(currentPage + 1) * usersPerPage >= users.length}
          >
            {">>"}
          </Button>
        </ButtonGroup>
      </div>
      {displayLeaders.map((data) => (
        <LeaderboardEntry
          onMouseOver={() => showIndividualProgress(data.distance)}
          onMouseLeave={() => setIndividualProgress(false)}
          key={"lb_" + data.id}
          data={data}
        />
      ))}
      {individualProgress && (
        <MlGeoJsonLayer
          geojson={individualProgress}
          paint={{
            "line-color": "rgb(200,100,100)",
            "line-width": 10,
          }}
          type="line"
        />
      )}
    </>
  );
}

export default Leaderboard;
