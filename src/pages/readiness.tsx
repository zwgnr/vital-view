import { useState } from "react";

import { useSleep } from "../hooks/useSleep";
import { useReadiness } from "../hooks/useReadiness";

import { Loader } from "../components/loader";
import DatePicker from "../components/datePicker";
import { LabelToggle } from "../components/labelToggle";
import { HeatMapData, Stats } from "../types/sharedTypes";
import { StatCards } from "../components/statCards";
import { TrendChart } from "../components/charts/trends";
import { Heatmap } from "../components/charts/heatmap";

export const Readiness = () => {
  const [dateRange, setDateRange] = useState("last7Days");
  const { sleep, sleepLoading } = useSleep(dateRange);
  const { readiness, readinessLoading } = useReadiness(dateRange);
  const [enabled, setEnabled] = useState(false);
  const [activeTrendName, setActiveTrendName] =
    useState<keyof TrendData>("Score");
  const stats: Stats[] = [
    {
      id: 1,
      name: "Score",
      stat: readiness?.rangeAverage.score,
      unit: null,
      change: `${readiness?.percentChange.score} %`,
      changeType: readiness?.percentChange.score > 0 ? "increase" : "decrease",
      dataset: readiness?.rangeDataPoints.score,
    },
    {
      id: 2,
      name: "RHR",
      stat: sleep?.rangeAverage.restingHeartRate,
      unit: "bpm",
      change: `${sleep?.percentChange.restingHeartRateChange} %`,
      changeType:
        sleep?.percentChange.restingHeartRateChange > 0
          ? "increase"
          : "decrease",
      dataset: sleepLoading ? null : sleep.rangeDataPoints.restingHeartRate,
    },
    {
      id: 3,
      name: "HRV",
      stat: sleepLoading
        ? null
        : `${sleep.rangeAverage.hrv} 
         `,
      unit: "ms",
      change: `${sleep?.percentChange.hrvChange} %`,
      changeType: sleep?.percentChange.hrvChange > 0 ? "increase" : "decrease",
      dataset: sleepLoading ? null : sleep.rangeDataPoints.hrv,
    },
  ];

  type TrendData = {
    Score: number[];
    RHR: number[];
    HRV: number[];
  };

  const trendData: TrendData = {
    Score: stats[0]!.dataset,
    RHR: stats[1]!.dataset,
    HRV: stats[2]!.dataset,
  };

  const heatmapData: HeatMapData[] = [
    {
      name: "sleepBalance",
      data: readiness?.rangeDataPoints.sleepBalance,
    },
    {
      name: "restingHeartRate",
      data: readiness?.rangeDataPoints.restingHeartRate,
    },
    {
      name: "recoveryIndex",
      data: readiness?.rangeDataPoints.recoveryIndex,
    },
    {
      name: "previousNight",
      data: readiness?.rangeDataPoints.previousNight,
    },
    {
      name: "previousDayActivity",
      data: readiness?.rangeDataPoints.previousDayActivity,
    },
    {
      name: "hrvBalance",
      data: readiness?.rangeDataPoints.hrvBalance,
    },
    {
      name: "Body Temperature",
      data: readiness?.rangeDataPoints.bodyTemperature,
    },
    {
      name: "Activity Balance",
      data: readiness?.rangeDataPoints.activityBalance,
    },
    {
      name: "Overall Score",
      data: readiness?.rangeDataPoints.score,
    },
  ];
  return (
    <div className="flex flex-grow flex-col gap-4 overflow-y-auto  bg-white p-4 dark:bg-slate-800 sm:p-6">
      <>
        <div className="flex w-full items-center justify-between">
          <DatePicker dateRange={dateRange} setDateRange={setDateRange} />
          <LabelToggle enabled={enabled} setEnabled={setEnabled} />
        </div>
        {/*StatCards*/}
        <div className="flex w-full flex-col gap-4 py-2 sm:flex-row sm:flex-wrap lg:flex-nowrap">
          <StatCards
            data={stats}
            activeTrendName={activeTrendName}
            setActiveTrendName={setActiveTrendName}
          />
        </div>
        {/*TrendsChart*/}
        <div className="flex-grow rounded-xl p-4 shadow-md dark:bg-slate-700 ">
          {sleepLoading ? (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <TrendChart
              enabled={enabled}
              dateRange={dateRange}
              name={activeTrendName}
              data={trendData[activeTrendName]}
              period={sleep?.timePeriod}
            />
          )}
        </div>
        <div className="grid h-72 min-h-0 gap-4 ">
          <div className=" min-h-0 overflow-hidden rounded-xl p-4 pb-12 shadow-md dark:bg-slate-700 md:col-span-2 ">
            <p className="text-md">Score Board</p>
            {readinessLoading ? (
              <div className="flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <Heatmap
                enabled={enabled}
                dateRange={dateRange}
                period={sleep?.timePeriod}
                data={heatmapData}
              />
            )}
          </div>
        </div>
      </>
    </div>
  );
};
export default Readiness;
