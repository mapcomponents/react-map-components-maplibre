import React, { useCallback, useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";

function DailyProgressChart(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!props.data) return;

    let dateKeys = Object.keys(props.data);
    let data = [];
    for (var i = 0, len = dateKeys.length; i < len; i++) {
      data.push({
        y: parseFloat(props.data[dateKeys[i]]),
        x: dateKeys[i],
      });
    }

    data.sort(function (a, b) {
      return new Date(a.x) - new Date(b.x);
    });

    setData([
      {
        id: "Km/Tag",
        color: "hsl(45, 70%, 50%)",
        data: data,
      },
    ]);

    if (data.length && typeof props.onClick === "function") {
      props.onClick(data[data.length - 1].x);
    }
  }, [props.data]);

  return (
    <>
      {data.length && (
        <ResponsiveLine
          onClick={(point) => {
            if (typeof props.onClick === "function") {
              props.onClick(point.data);
            }
          }}
          data={data}
          margin={{ top: 20, right: 70, bottom: 30, left: 60 }}
          enableCrosshair={false}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=">-.2f"
          xFormat={(data) => {
            return new Date(data).toLocaleDateString("de-DE", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            });
          }}
          axisTop={false}
          onMouseEnter={(_data, event) => {
            event.target.style.cursor = "pointer";
          }}
          onMouseLeave={(_data, event) => {
            event.target.style.cursor = "inherit";
          }}
          axisRight={false}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Datum",
            legendOffset: 36,
            legendPosition: "middle",
            format: (data) => {
              return new Date(data).toLocaleDateString("de-DE", {
                month: "numeric",
                day: "numeric",
              });
            },
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickValues: [15, 30, 45, 60, 75],
            tickPadding: 5,
            tickRotation: 0,
            legend: "Km",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          colors={(data) => {
            return "#64c864";
          }}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          pointSymbol={(data) => {
            let fill = "#64c864";
            let stroke = data.borderColor;

            if (new Date(data.datum.x) - new Date(props.displayDate) < 0) {
              fill = "#9797e6";
            }
            if (data.datum.x === props.displayDate) {
              fill = "#6464c8";
            }
            return (
              <>
                <circle
                  r={6}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={data.borderWidth}
                />
              </>
            );
          }}
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
              translateX: 80,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "top-to-bottom",
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
      )}
    </>
  );
}

export default DailyProgressChart;
