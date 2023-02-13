import { useActivity } from "../hooks/useActivity";
import { useDailySleep } from "../hooks/useDailySleep";
import { useReadiness } from "../hooks/useReadiness";
import { Loader } from "./loader";
import { RadialScoreChart } from "./charts/radialScoreChart";

export const TodaysScores = () => {
  const { dailySleep, dailySleepLoading, dailySleepError } =
    useDailySleep("today");
  const { readiness, readinessLoading, readinessError } = useReadiness("today");
  const { activity, activityLoading, activityError } = useActivity("today");
  const todaysSleep = dailySleep?.rangeDataPoints.score;
  const todaysReadiness = readiness?.rangeDataPoints.score;
  const todaysActivity = activity?.rangeDataPoints.score;

  return (
    <div className="h-1/3 w-full rounded-xl bg-slate-700">
      <h1 className="ml-4 mt-4 text-lg">Todays Scores</h1>
      <div className=" flex h-full  min-h-0 w-full flex-row  rounded-xl bg-slate-700">
        <div className="flex h-full w-1/3 justify-center  overflow-hidden rounded-xl ">
          <div className="flex h-full min-h-0 w-full flex-col items-center justify-center rounded-xl ">
            {dailySleepLoading ? (
              <Loader />
            ) : (
              <RadialScoreChart label={["Sleep"]} data={todaysSleep} />
            )}
          </div>
        </div>
        <div className="flex h-full w-1/3 justify-center  overflow-hidden rounded-xl ">
          <div className="flex h-full min-h-0 w-full flex-col items-center justify-center rounded-xl ">
            {readinessLoading ? (
              <Loader />
            ) : (
              <RadialScoreChart label={["Readiness"]} data={todaysReadiness} />
            )}
          </div>
        </div>
        <div className="flex h-full w-1/3 justify-center  overflow-hidden rounded-xl ">
          <div className="flex h-full min-h-0 w-full flex-col items-center justify-center rounded-xl ">
            {activityLoading ? (
              <Loader />
            ) : (
              <RadialScoreChart label={["Activity"]} data={todaysActivity} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
