import { useState } from "react";
import { useSleep } from "../hooks/useSleep";
import { useDailySleep } from "../hooks/useDailySleep";
import { Loader } from "../components/loader";
import DatePicker from "../components/datePicker";
import { LabelToggle } from "../components/labelToggle";
import { TrendChart } from "../components/charts/trends";
import { BarChartData, HeatMapData, Stats } from "../types/sharedTypes";
import { StatCards } from "../components/statCards";
import { Heatmap } from "../components/charts/heatmap";
import { BarChart } from "../components/charts/barChart";

export const Sleep = () => {
  const [dateRange, setDateRange] = useState("last7Days");
  const { dailySleep, dailySleepLoading, dailySleepError } =
    useDailySleep(dateRange);
  const { sleep, sleepLoading } = useSleep(dateRange);
  const [enabled, setEnabled] = useState(false);
  const [activeTrendName, setActiveTrendName] =
    useState<keyof TrendData>("Score");

  const stats: Stats[] = [
    {
      id: 1,
      name: "Score",
      stat: dailySleep?.rangeAverage.score,
      unit: null,
      change: `${dailySleep?.percentChange.score} %`,
      changeType: dailySleep?.percentChange.score > 0 ? "increase" : "decrease",
      dataset: dailySleep?.rangeDataPoints.score,
    },
    {
      id: 2,
      name: "Efficiency",
      stat: sleep?.rangeAverage.efficiency,
      unit: "%",
      change: `${sleep?.percentChange.efficiencyChange} %`,
      changeType:
        sleep?.percentChange.efficiencyChange > 0 ? "increase" : "decrease",
      dataset: sleepLoading ? null : sleep.rangeDataPoints.efficiency,
    },
    {
      id: 3,
      name: "Duration",
      stat: sleepLoading
        ? null
        : `${sleep.rangeAverage.duration} 
         `,
      unit: "hr",
      change: `${sleep?.percentChange.durationChange} %`,
      changeType:
        sleep?.percentChange.durationChange > 0 ? "increase" : "decrease",
      dataset: sleepLoading ? null : sleep.rangeDataPoints.duration,
    },
  ];

  type TrendData = {
    Score: number[];
    Efficiency: number[];
    Duration: number[];
  };

  const trendData: TrendData = {
    Score: stats[0]!.dataset,
    Efficiency: stats[1]!.dataset,
    Duration: stats[2]!.dataset,
  };

  const heatmapData: HeatMapData[] = [
    {
      name: "Deep Sleep",
      data: dailySleep?.rangeDataPoints.deepSleep,
    },
    {
      name: "Rem Sleep",
      data: dailySleep?.rangeDataPoints.remSleep,
    },
    {
      name: "Efficiency",
      data: dailySleep?.rangeDataPoints.efficiency,
    },
    {
      name: "Latency",
      data: dailySleep?.rangeDataPoints.latency,
    },
    {
      name: "Restfulness",
      data: dailySleep?.rangeDataPoints.restfulness,
    },
    {
      name: "Total Sleep",
      data: dailySleep?.rangeDataPoints.totalSleep,
    },
    {
      name: "Overall Score",
      data: dailySleep?.rangeDataPoints.score,
    },
  ];

  const barChartData: BarChartData[] = [
    {
      name: "Deep",
      data: [sleep?.rangeAverage.deepSleep],
    },
    {
      name: "Rem",
      data: [sleep?.rangeAverage.remSleep],
    },
    {
      name: "Light",
      data: [sleep?.rangeAverage.lightSleep],
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
        <div className="grid h-72 min-h-0 grid-cols-3 gap-4 ">
          <div className="col-span-2 min-h-0 overflow-hidden rounded-xl p-4 pb-12 shadow-md dark:bg-slate-700 md:col-span-2 ">
            <p className="text-md">Score Board</p>
            {sleepLoading ? (
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
          <div className=" rounded-xl p-4 shadow-md  dark:bg-slate-700 md:col-span-1">
            <h1>Sleep Stages</h1>
            {sleepLoading ? (
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
};
export default Sleep;
