import React, { useCallback, useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";

function DailyProgressChart(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!props.data) return;
    console.log(props.data);

    let dateKeys = Object.keys(props.data);
    let data = [];
    for (var i = 0, len = dateKeys.length; i < len; i++) {
      data.push({
        y: props.data[dateKeys[i]],
        x: dateKeys[i],
      });
    }

    console.log(data);
    data.sort(function (a, b) {
      return new Date(a.x) - new Date(b.x);
    });

    setData([
      {
        id: "Tagesfortschritt",
        color: "hsl(45, 70%, 50%)",
        data: data,
      },
    ]);
  }, [props.data]);

  return (
    <>
      <ResponsiveLine
        onClick={(point) => {
          if (typeof props.onClick === "function") {
            props.onClick(point.data);
          }
        }}
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        xFormat={(data) => {
          return new Date(data).toLocaleDateString("de-DE", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Datum",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Km",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        tooltip={(data) => {
          return (
            data.point.data.xFormatted + ": " + data.point.data.yFormatted + " Km"
          );
        }}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </>
  );
}

export default DailyProgressChart;
