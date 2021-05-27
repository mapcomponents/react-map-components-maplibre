import React, { useMemo, useEffect, useState } from "react";
import { Line } from "@nivo/line";
import { useTheme } from "@material-ui/core/styles";
import { AutoSizer } from "react-virtualized";

function DailyProgressChart(props) {
  const [data, setData] = useState([]);

  const theme = useTheme();

  useEffect(() => {
    if (!props.data) return;

    let dateKeys = Object.keys(props.data);
    let dataTmp = [];
    for (var i = 0, len = dateKeys.length; i < len; i++) {
      dataTmp.push({
        y: parseFloat(props.data[dateKeys[i]]),
        x: dateKeys[i],
      });
    }

    dataTmp.sort(function (a, b) {
      return new Date(a.x) - new Date(b.x);
    });

    console.log(dataTmp);
    setData([
      {
        id: "Km/Tag",
        color: "hsl(45, 70%, 50%)",
        data: dataTmp,
      },
    ]);

    if (dataTmp.length && typeof props.onClick === "function") {
      props.onClick(dataTmp[dataTmp.length - 1].x);
    }
  }, [props.data]);

  const chartTheme = useMemo(() => {
    return {
      textColor: theme.palette.text.primary,
      fontFamily: "Muli",
      fontSize: "14px",
      axis: {
        tickColor: "#eee",
      },
      grid: {
        line: {
          stroke: theme.palette.chart.gridColor,
          strokeWidth: 1,
        },
      },
      tooltip: {
        container: {
          fontFamily: "Muli",
          minWidth: "100px",
        },
      },
    };
  }, [theme]);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Line
          height={height}
          width={width}
          theme={chartTheme}
          onClick={(point) => {
            if (typeof props.onClick === "function") {
              props.onClick(point.data.x);
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
            stacked: false,
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
            return theme.palette.primary.main;
          }}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          pointSymbol={(data) => {
            let fill = theme.palette.primary.dark;
            let stroke = theme.palette.primary.dark;

            if (new Date(data.datum.x) - new Date(props.displayDate) < 0) {
              fill = theme.palette.secondary.light;
            }
            if (data.datum.x === props.displayDate) {
              fill = theme.palette.secondary.dark;
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
              <div
                style={{
                  minWidth: "140px",
                  backgroundColor: "rgba(20,20,20,0.7)",
                  border: "2px solid rgba(40,40,40,0.8)",
                  color: "#fcfcfc",
                  padding: "4px",
                  borderRadius: "3px",
                }}
              >
                {data.point.data.xFormatted}
                <br />
                {data.point.data.yFormatted}
                Km
              </div>
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
    </AutoSizer>
  );
}

export default DailyProgressChart;
