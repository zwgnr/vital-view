import { Fragment, useState } from "react";
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
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Icon } from "@iconify/react";

export const Sleep = () => {
  const { data: session, status } = useSession();
  const [dateRange, setDateRange] = useState("last7Days");
  const { dailySleep, dailySleepLoading, dailySleepError } =
    useDailySleep(dateRange);
  const { sleep, sleepLoading } = useSleep(dateRange);
  const [enabled, setEnabled] = useState(false);
  const [activeTrendName, setActiveTrendName] =
    useState<keyof TrendData>("Score");
  const [trendDisplayName, setTrendDisplayName] = useState("Sleep Score");

  const loading = sleepLoading;

  if (status === "unauthenticated") {
    useRouter().push("/sign-in");
  }

  const getDailySleepChangeType = () => {
    if (dailySleep?.percentChange.score === 0) {
      return "noChange";
    }
    if (dailySleep?.percentChange.score > 0) {
      return "increase";
    }
    if (dailySleep?.percentChange.score < 0) {
      return "decrease";
    }
  };

  const getSleepChangeType = (param: string) => {
    if (sleep?.percentChange[param] === 0) {
      return "noChange";
    }
    if (sleep?.percentChange[param] > 0) {
      return "increase";
    }
    if (sleep?.percentChange[param] < 0) {
      return "decrease";
    }
  };

  const stats: Stats[] = [
    {
      id: 1,
      name: "Sleep Score",
      stat: dailySleep?.rangeAverage.score,
      unit: null,
      change: `${dailySleep?.percentChange.score} %`,
      changeType: getDailySleepChangeType(),
      dataset: dailySleep?.rangeDataPoints.score,
    },
    {
      id: 2,
      name: "Efficiency",
      stat: sleep?.rangeAverage.efficiency,
      unit: "%",
      change: `${sleep?.percentChange.efficiencyChange} %`,
      changeType: getSleepChangeType("efficiencyChange"),
      dataset: sleep?.rangeDataPoints.efficiency,
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
      changeType: getSleepChangeType("durationChange"),
      dataset: sleep?.rangeDataPoints.duration,
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

  if (status === "authenticated") {
    return (
      <div className="flex flex-grow flex-col gap-6 overflow-y-auto bg-slate-100 p-4 dark:bg-slate-900 sm:px-6 sm:py-8 sm:pb-12">
        <>
          <div className="flex w-full items-center justify-between">
            <DatePicker dateRange={dateRange} setDateRange={setDateRange} />
            <LabelToggle enabled={enabled} setEnabled={setEnabled} />
          </div>
          {/*StatCards*/}
          <div className="flex h-1/5 w-full flex-col gap-4 lg:flex-row">
            <StatCards data={stats} loading={loading} />
          </div>
          {/*TrendsChart   */}
          <div className="flex-grow rounded-xl bg-white p-4 dark:bg-slate-800 ">
            <div className="flex items-center justify-between">
              <h1 className="text-md font-bold">Trends</h1>
              <Menu as="div" className="relative">
                <Menu.Button
                  type="button"
                  className="flex items-center rounded-md bg-slate-200 p-2  text-xs text-black hover:bg-slate-300 dark:bg-slate-700  dark:text-white dark:hover:bg-slate-600 "
                >
                  <h1 className="font-bold">{trendDisplayName}</h1>
                  <Icon
                    icon="carbon:chevron-down"
                    width={24}
                    height={24}
                    aria-hidden="true"
                    className="ml-2"
                  />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className=" dark:text-whit absolute right-0 z-50 mt-3 w-36 origin-top-right  overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-800">
                    <div className="py-1">
                      <Menu.Item>
                        {() => (
                          <button
                            onClick={() => {
                              setActiveTrendName("Score");
                              setTrendDisplayName("Sleep Score");
                            }}
                            className={clsx(
                              "flex w-36",
                              trendDisplayName === "Sleep Score"
                                ? "text-indigo-600"
                                : "text-gray-700 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700",
                              "block px-4 py-2 text-sm "
                            )}
                          >
                            Sleep Score
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {() => (
                          <button
                            onClick={() => {
                              setActiveTrendName("Efficiency");
                              setTrendDisplayName("Efficiency");
                            }}
                            className={clsx(
                              "flex w-36",
                              trendDisplayName === "Efficiency"
                                ? "text-indigo-600"
                                : "text-gray-700 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Efficiency
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {() => (
                          <button
                            onClick={() => {
                              setActiveTrendName("Duration");
                              setTrendDisplayName("Duration");
                            }}
                            className={clsx(
                              "flex w-36",
                              trendDisplayName === "Duration"
                                ? "text-indigo-600"
                                : "text-gray-700 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Duration
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

            {sleepLoading ? (
              <div className="flex items-center justify-center">
                <Loader size="h-16 w-16" />
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

          <div className="grid h-2/5 min-h-0 grid-cols-3 gap-4 ">
            <div className="col-span-3 h-72 min-h-0 rounded-xl  bg-white p-4 pb-12 dark:bg-slate-800 lg:col-span-2 lg:h-full">
              <p className="text-md font-bold">Score Board</p>
              {dailySleepLoading ? (
                <div className="flex h-full items-center justify-center">
                  <Loader size="h-16 w-16" />
                </div>
              ) : (
                <Heatmap
                  enabled={enabled}
                  dateRange={dateRange}
                  period={dailySleep?.timePeriod}
                  data={heatmapData}
                />
              )}
            </div>
            <div className=" col-span-3 rounded-xl bg-white p-4 dark:bg-slate-800 lg:col-span-1">
              <h1 className="font-semibold">Sleep Stages</h1>
              {sleepLoading ? (
                <div className="flex h-full items-center justify-center">
                  <Loader size="h-16 w-16" />
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
export default Sleep;
