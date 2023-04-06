import { useActivity } from "../hooks/useActivity";
import { useDailySleep } from "../hooks/useDailySleep";
import { useReadiness } from "../hooks/useReadiness";
import { Loader } from "./loader";
import { RadialScoreChart } from "./charts/radialScoreChart";

export const TodaysScores = () => {
  const { dailySleep, dailySleepLoading } = useDailySleep("today");
  const { readiness, readinessLoading } = useReadiness("today");
  const { activity, activityLoading } = useActivity("today");
  const todaysSleep = dailySleep?.rangeDataPoints.score;
  const todaysReadiness = readiness?.rangeDataPoints.score;
  const todaysActivity = activity?.rangeDataPoints.score;

  return (
    <div className="h-2/3 w-full rounded-2xl bg-white pb-6  dark:bg-slate-800 sm:h-1/3">
      <h1 className="text-md ml-4 mt-4 font-bold">Todays Scores</h1>
      <div className=" flex h-[90%] min-h-0 w-full flex-col rounded-2xl sm:flex-row">
        <div className="flex h-full w-full justify-center overflow-hidden rounded-2xl md:w-1/3 ">
          <div className="flex h-full min-h-0 w-full flex-col items-center justify-center rounded-2xl ">
            {dailySleepLoading ? (
              <Loader size="h-12 w-12" />
            ) : (
              <RadialScoreChart label={["Sleep"]} data={todaysSleep} />
            )}
          </div>
        </div>
        <div className="flex h-full w-full justify-center overflow-hidden  rounded-2xl md:w-1/3 ">
          <div className="flex h-full min-h-0 w-full flex-col items-center justify-center rounded-2xl ">
            {readinessLoading ? (
              <Loader size="h-12 w-12" />
            ) : (
              <RadialScoreChart label={["Readiness"]} data={todaysReadiness} />
            )}
          </div>
        </div>
        <div className="flex h-full w-full justify-center overflow-hidden  rounded-2xl md:w-1/3 ">
          <div className="flex h-full min-h-0 w-full flex-col items-center justify-center rounded-2xl ">
            {activityLoading ? (
              <Loader size="h-12 w-12" />
            ) : (
              <RadialScoreChart label={["Activity"]} data={todaysActivity} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
