"use client";
import React, { useState, useEffect } from "react";
import { XYPlot, VerticalGridLines, AreaSeries, Hint } from "react-vis";
import { Crosshair } from "react-vis";
import { Sheet } from "@mui/joy";

import { getDate } from "@/lib/time";
export function AreaLine({ dailyClicks, todaysClicks }) {
  const [points, setPoints] = useState([]);
  let count = 0;
  const dataPoints = dailyClicks.map((record, i) => {
    count++;
    return { x: i, y: record.clicks, date: getDate(record.createdAt) };
  });
  dataPoints.push({ x: count, y: todaysClicks, date: "Today" });


  return (
    <XYPlot
      height={200}
      width={400}
      margin={{ bottom: 0, left: 10, top: 0, right: 10 }}
      onMouseLeave={() => setPoints([])}
      className="relative"
    >
      <AreaSeries
        padding={0}
        style={{ opacity: 0.5, fill: "#496a81" }}
        stroke="#2B3A67"
        data={dataPoints}
        onNearestX={(value) => {
          setPoints([value]);
        }}
      />
      {Object.keys(points).length > 0 && (
        <Crosshair values={points} className="transition-all duration-100">
          <div className="flex h-full w-[100px] ">
            <Sheet
              sx={{ bgcolor: "white", color: "black" }}
              className="flex flex-col h-[60px] w-full ml-2 shadow-md rounded-md overflow-hidden "
            >
              <div className="px-2 w-full h-[24px] bg-gray-300 text-gray-800 text-[.8em] flex items-center">{points[0].date}</div>
              <div className="flex items-center px-2 text-gray-800 text-[.75em]">{points[0].y} Clicks</div>
            </Sheet>
          </div>
        </Crosshair>
      )}
    </XYPlot>
  );
}
