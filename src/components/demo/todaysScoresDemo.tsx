import { useState } from "react";
import { RadialScoreChartDemo } from "../../components/demo/radialScoreChartDemo";

export const TodaysScoresDemo = () => {
  return (
    <div className="h-1/3 w-full rounded-xl bg-slate-700">
      <h1 className="ml-4 mt-4 text-lg">Todays Scores</h1>
      <div className=" flex h-full  min-h-0 w-full flex-row  rounded-xl bg-slate-700">
        <div className="flex h-full w-1/3 justify-center  overflow-hidden rounded-xl ">
          <div className="flex h-full min-h-0 w-full flex-col items-center justify-center rounded-xl ">
            <RadialScoreChartDemo label={["Sleep"]} data={[77]} />
          </div>
        </div>
        <div className="flex h-full w-1/3 justify-center  overflow-hidden rounded-xl ">
          <div className="flex h-full min-h-0 w-full flex-col items-center justify-center rounded-xl ">
            <RadialScoreChartDemo label={["Readiness"]} data={[95]} />
          </div>
        </div>
        <div className="flex h-full w-1/3 justify-center  overflow-hidden rounded-xl ">
          <div className="flex h-full min-h-0 w-full flex-col items-center justify-center rounded-xl ">
            <RadialScoreChartDemo label={["Activity"]} data={[44]} />
          </div>
        </div>
      </div>
    </div>
  );
};
