import React, { useContext } from "react";

import { AppContext } from "./AppContext";

function StatsSidebar() {
  const appContext = useContext(AppContext);

  return (
    <>
      <p>Anzeigedatum:</p>
      <h2>
        {new Date(appContext.displayDate).toLocaleDateString("de-DE", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </h2>
      <p>Gelaufene Kilometer:</p>
      <h3>{appContext.routeProgressInKm} Km</h3>
    </>
  );
}

export default StatsSidebar;
