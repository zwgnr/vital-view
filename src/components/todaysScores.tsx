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
    <div className="h-2/3 w-full rounded-xl bg-white dark:bg-slate-800  sm:h-1/3">
      <h1 className="text-md ml-4 mt-4 font-bold">Todays Scores</h1>
      <div className=" flex h-[90%] min-h-0 w-full flex-col rounded-xl sm:flex-row">
        <div className="flex h-full w-full justify-center overflow-hidden rounded-xl md:w-1/3 ">
          <div className="flex h-full min-h-0 w-full flex-col items-center justify-center rounded-xl ">
            {dailySleepLoading ? (
              <Loader size='h-12 w-12'/>
            ) : (
              <RadialScoreChart label={["Sleep"]} data={todaysSleep} />
            )}
          </div>
        </div>
        <div className="flex h-full w-full justify-center overflow-hidden  rounded-xl md:w-1/3 ">
          <div className="flex h-full min-h-0 w-full flex-col items-center justify-center rounded-xl ">
            {readinessLoading ? (
              <Loader size='h-12 w-12'/>
            ) : (
              <RadialScoreChart label={["Readiness"]} data={todaysReadiness} />
            )}
          </div>
        </div>
        <div className="flex h-full w-full justify-center overflow-hidden  rounded-xl md:w-1/3 ">
          <div className="flex h-full min-h-0 w-full flex-col items-center justify-center rounded-xl ">
            {activityLoading ? (
              <Loader size='h-12 w-12'/>
            ) : (
              <RadialScoreChart label={["Activity"]} data={todaysActivity} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
