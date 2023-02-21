import { Fragment, useState } from "react";

import { useSleep } from "../hooks/useSleep";
import { useReadiness } from "../hooks/useReadiness";

import { Loader } from "../components/loader";
import DatePicker from "../components/datePicker";
import { LabelToggle } from "../components/labelToggle";
import { HeatMapData, Stats } from "../types/sharedTypes";
import { StatCards } from "../components/statCards";
import { TrendChart } from "../components/charts/trends";
import { Heatmap } from "../components/charts/heatmap";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import clsx from "clsx";

export const Readiness = () => {
  const { data: session, status } = useSession();
  const [dateRange, setDateRange] = useState("last7Days");
  const { sleep, sleepLoading } = useSleep(dateRange);
  const { readiness, readinessLoading } = useReadiness(dateRange);
  const [enabled, setEnabled] = useState(false);
  const [activeTrendName, setActiveTrendName] =
    useState<keyof TrendData>("Score");

  const [trendDisplayName, setTrendDisplayName] = useState("Readiness Score");

  const loading = sleepLoading;

  const getReadinessChangeType = () => {
    if (readiness?.percentChange.score === 0) {
      return "noChange";
    }
    if (readiness?.percentChange.score > 0) {
      return "increase";
    }
    if (readiness?.percentChange.score < 0) {
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

  if (status === "unauthenticated") {
    useRouter().push("/sign-in");
  }

  const stats: Stats[] = [
    {
      id: 1,
      name: "Score",
      stat: readiness?.rangeAverage.score,
      unit: null,
      change: `${readiness?.percentChange.score} %`,
      changeType: getReadinessChangeType(),
      dataset: readiness?.rangeDataPoints.score,
    },
    {
      id: 2,
      name: "RHR",
      stat: sleep?.rangeAverage.restingHeartRate,
      unit: "bpm",
      change: `${sleep?.percentChange.restingHeartRateChange} %`,
      changeType: getSleepChangeType("restingHeartRateChange"),
      dataset: sleep?.rangeDataPoints.restingHeartRate,
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
      changeType: getSleepChangeType("hrvChange"),
      dataset: sleep?.rangeDataPoints.hrv,
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
  if (status === "authenticated") {
    return (
      <div className="flex flex-grow flex-col gap-6 overflow-y-auto bg-slate-100 p-4 dark:bg-slate-800 sm:px-6 sm:py-8">
        <>
          <div className="flex w-full items-center justify-between">
            <DatePicker dateRange={dateRange} setDateRange={setDateRange} />
            <LabelToggle enabled={enabled} setEnabled={setEnabled} />
          </div>
          {/*StatCards*/}
          <div className="flex h-1/5 w-full flex-col gap-4 lg:flex-row">
            <StatCards data={stats} loading={loading}/>
          </div>
          {/*TrendsChart*/}
          <div className="flex-grow rounded-xl bg-white p-4 dark:bg-slate-700 ">
            <div className="flex items-center justify-between">
              <h1 className="text-md font-bold">Trends</h1>
              <Menu as="div" className="relative">
                <Menu.Button
                  type="button"
                  className="flex items-center rounded-md bg-slate-200 p-2  text-xs text-black  hover:bg-slate-300 dark:bg-slate-700 "
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
                              setTrendDisplayName("Readiness Score");
                            }}
                            className={clsx(
                              "flex w-36",
                              trendDisplayName === "Readiness Score"
                                ? "text-indigo-600"
                                : "text-gray-700 hover:bg-slate-100 dark:text-white",
                              "block px-4 py-2 text-sm "
                            )}
                          >
                            Readiness Score
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {() => (
                          <button
                            onClick={() => {
                              setActiveTrendName("RHR");
                              setTrendDisplayName("RHR");
                            }}
                            className={clsx(
                              "flex w-36",
                              trendDisplayName === "RHR"
                                ? "text-indigo-600"
                                : "text-gray-700 hover:bg-slate-100 dark:text-white",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            RHR
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {() => (
                          <button
                            onClick={() => {
                              setActiveTrendName("HRV");
                              setTrendDisplayName("HRV");
                            }}
                            className={clsx(
                              "flex w-36",
                              trendDisplayName === "HRV"
                                ? "text-indigo-600"
                                : "text-gray-700 hover:bg-slate-100 dark:text-white",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            HRV
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            {readinessLoading ? (
              <div className="flex items-center justify-center">
                <Loader size='h-16 w-16'/>
              </div>
            ) : (
              <TrendChart
                enabled={enabled}
                dateRange={dateRange}
                name={activeTrendName}
                data={trendData[activeTrendName]}
                period={readiness?.timePeriod}
              />
            )}
          </div>
          <div className="grid h-2/5 min-h-0 gap-4 ">
            <div className=" col-span-3 h-72 min-h-0 rounded-xl  bg-white p-4 pb-12 dark:bg-slate-700 lg:h-full xl:col-span-3 ">
              <p className="text-md font-bold">Score Board</p>
              {readinessLoading ? (
                <div className="flex h-full items-center justify-center">
                  <Loader size='h-16 w-16'/>
                </div>
              ) : (
                <Heatmap
                  enabled={enabled}
                  dateRange={dateRange}
                  period={readiness?.timePeriod}
                  data={heatmapData}
                />
              )}
            </div>
          </div>
        </>
      </div>
    );
  }
};
export default Readiness;
