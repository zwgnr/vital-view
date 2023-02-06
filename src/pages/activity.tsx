import { useState } from "react";

import { useActivity } from "../hooks/useActivity";
import { Loader } from "../components/loader";
import DatePicker from "../components/datePicker";
import { LabelToggle } from "../components/labelToggle";
import { TrendChart } from "../components/charts/trends";
import { StatCards } from "../components/statCards";

import {
  type Stats,
  type HeatMapData,
  type BarChartData,
} from "../types/sharedTypes";

import { Heatmap } from "../components/charts/heatmap";
import { BarChart } from "../components/charts/barChart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const Activity = () => {
  const { data: session, status } = useSession();
  const [dateRange, setDateRange] = useState("last7Days");
  const { activity, activityLoading } = useActivity(dateRange);
  const [enabled, setEnabled] = useState(false);
  const [activeTrendName, setActiveTrendName] =
    useState<keyof TrendData>("Score");

  if (status === "unauthenticated") {
    useRouter().push("/sign-in");
  }

  const stats: Stats[] = [
    {
      id: 1,
      name: "Score",
      stat: activity?.rangeAverage.score,
      unit: null,
      change: `${activity?.percentChange.score} %`,
      changeType: activity?.percentChange.score > 0 ? "increase" : "decrease",
      dataset: activity?.rangeDataPoints.score,
    },
    {
      id: 2,
      name: "Active Burn",
      stat: activity?.rangeAverage.activeCalories,
      unit: "cals",
      change: `${activity?.percentChange.activeCalories} %`,
      changeType:
        activity?.percentChange.activeCalories > 0 ? "increase" : "decrease",
      dataset: activityLoading ? null : activity.rangeDataPoints.activeCalories,
    },
    {
      id: 3,
      name: "Steps",
      stat: activityLoading
        ? null
        : `${activity.rangeAverage.steps} 
         `,
      unit: "steps",
      change: `${activity?.percentChange.steps} %`,
      changeType:
        activity?.percentChange.durationChange > 0 ? "increase" : "decrease",
      dataset: activityLoading ? null : activity.rangeDataPoints.steps,
    },
  ];

  type TrendData = {
    Score: number[];
    "Active Burn": number[];
    Steps: number[];
  };

  const trendData: TrendData = {
    Score: stats[0]!.dataset,
    "Active Burn": stats[1]!.dataset,
    Steps: stats[2]!.dataset,
  };

  const heatmapData: HeatMapData[] = [
    {
      name: "trainingVolume",
      data: activity?.rangeDataPoints.trainingVolume,
    },
    {
      name: "trainingFrequency",
      data: activity?.rangeDataPoints.trainingFrequency,
    },
    {
      name: "stayActive",
      data: activity?.rangeDataPoints.stayActive,
    },
    {
      name: "recoveryTime",
      data: activity?.rangeDataPoints.recoveryTime,
    },
    {
      name: "moveEveryHour",
      data: activity?.rangeDataPoints.moveEveryHour,
    },
    {
      name: "meetDailyTargets",
      data: activity?.rangeDataPoints.meetDailyTargets,
    },
    {
      name: "Overall Score",
      data: activity?.rangeDataPoints.score,
    },
  ];

  const barChartData: BarChartData[] = [
    {
      name: "Low",
      data: [activity?.rangeAverage.lowActiveTime],
    },
    {
      name: "Med",
      data: [activity?.rangeAverage.medActiveTime],
    },
    {
      name: "High",
      data: [activity?.rangeAverage.highActiveTime],
    },
  ];
  if (status === "authenticated") {
    return (
      <div className="flex flex-grow flex-col gap-4 overflow-y-auto  bg-white p-4 dark:bg-slate-800 sm:p-6">
        <>
          {/*DatePicker*/}
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
            {activityLoading ? (
              <div className="flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <TrendChart
                enabled={enabled}
                dateRange={dateRange}
                name={activeTrendName}
                data={trendData[activeTrendName]}
                period={activity?.timePeriod}
              />
            )}
          </div>
          <div className="grid h-72 min-h-0 grid-cols-3 gap-4 ">
            <div className="col-span-2 min-h-0 overflow-hidden rounded-xl p-4 pb-12 shadow-md dark:bg-slate-700 md:col-span-2 ">
              <p className="text-md">Score Board</p>
              {activityLoading ? (
                <div className="flex items-center justify-center">
                  <Loader />
                </div>
              ) : (
                <Heatmap
                  enabled={enabled}
                  dateRange={dateRange}
                  period={activity?.timePeriod}
                  data={heatmapData}
                />
              )}
            </div>
            <div className=" rounded-xl p-4 shadow-md  dark:bg-slate-700 md:col-span-1">
              <h1>Movement</h1>
              {activityLoading ? (
                <div className="flex items-center justify-center">
                  <Loader />
                </div>
              ) : (
                <BarChart enabled={enabled} data={barChartData} />
              )}
            </div>
          </div>
        </>
      </div>
    );
  }
};
export default Activity;
