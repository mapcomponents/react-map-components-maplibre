import React, { useEffect, useState } from "react";
import MlGeoJsonLayer from "../../MlGeoJsonLayer/MlGeoJsonLayer";
import * as turf from "@turf/turf";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const usersPerPage = 6;

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
      <ul>
        {displayLeaders.map((data) => (
          <li
            onMouseOver={() => showIndividualProgress(data.distance)}
            onMouseLeave={() => setIndividualProgress(false)}
            key={"lb_" + data.id}
            style={{
              height: "80px",
            }}
          >
            <img
              src={
                data.avatar_url ||
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAAAAAAdJSU2AAACNElEQVR4AdXYBa7jMBCA4b3/JZahzIkjp2qt+BWUWnG5ln2XxaJJb2b5F2ukL4wvzK/rP7bUcbf92u6oftLSe1ldk8efsfaVeEjusZZeC6e1RllaCk/yG6ag1lZ4WwPX69uyD6tAe/g2ipAlNMRS37awDLaFrpcMWxXQOi0jnWCWjFkSZomYJWDWKmatYNZyEWkJsvQimoZYah5NgdaLxagCtF6GRy0DshZPkeYwS/KIJWGWYjwYUzDLxCwDtJ54OKglimBLqHWahii2g1pmHLLGBmwVoRjcKlmgOdw65H5qKuGWCVi5Qlhs6m1sENZi4q3AWNvca5UYy2RjT/SAsiZey6CsIvc0wVlV5lJ0ibPMyLUGCmlxQq0IM0hLdWyro7CWEc3sXsqaK4O2zLxOsmtpfW5Q1u68ZrVmepaaNXEewawtI9X5Xl3U3n1qND6+rfPzvqoIWz/fklNCSLY153YV53J/XUxGCJnKZ1lajsn3/Ffegf6Y5pV2LUsSNL2UHzxUfh3TlYpZqqTpXZm0KZk9zJcqaEmaWPHDw0pxe05K7bWOLHFLWXVetqpYmrjle4+1y0aBaF4UOQ1NU+lYezJClkjLUnSEjqhH6zjAW4OjtY39Ibq+sawUb6W2RQfoqG0VeKuwrRJvlba17faRdbe2pTtYq6Nty/S7yAbGsQjWIq41wVoT1+IdZNy1djUcVdu5lklQWC0xHkt1X31qNEE1Pr3qKv/9XiSNj6Aaifj3/69+AYujsR/MvkpZAAAAAElFTkSuQmCC"
              }
              alt=""
              width="80"
              style={{ float: "left" }}
            />
            {data.name} {data.distance} Km
          </li>
        ))}
      </ul>
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
