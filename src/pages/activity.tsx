/* eslint-disable react-hooks/rules-of-hooks */
import { Fragment, useState } from "react";

import { useActivity } from "../hooks/useActivity";
import { Loader } from "../components/loader";
import DatePicker from "../components/datePicker";
import { LabelToggle } from "../components/labelToggle";
import { TrendChart } from "../components/charts/trends";
import { StatCards } from "../components/statCards";

import { type Stats, type HeatMapData } from "../types/sharedTypes";

import { Heatmap } from "../components/charts/heatmap";
import { DonutChart } from "../components/charts/donutChart";
import { useSession } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useRouter } from "next/router";

export const Activity = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/");
  }

  if (status === "authenticated") {
    const [dateRange, setDateRange] = useState("last7Days");
    const { activity, activityLoading } = useActivity(dateRange);
    const [enabled, setEnabled] = useState(false);
    const [activeTrendName, setActiveTrendName] =
      useState<keyof TrendData>("Score");
    const [trendDisplayName, setTrendDisplayName] = useState("Activity Score");
    const loading = activityLoading;

    const getActivityChangeType = (param: string) => {
      if (activity?.percentChange[param] === 0) {
        return "noChange";
      }
      if (activity?.percentChange[param] > 0) {
        return "increase";
      }
      if (activity?.percentChange[param] < 0) {
        return "decrease";
      }
    };

    const stats: Stats[] = [
      {
        id: 1,
        name: "Score",
        stat: activity?.rangeAverage.score,
        unit: null,
        change: `${activity?.percentChange.score} %`,
        changeType: getActivityChangeType("score"),
        dataset: activity?.rangeDataPoints.score,
      },
      {
        id: 2,
        name: "Active Burn",
        stat: activity?.rangeAverage.activeCalories,
        unit: "cals",
        change: `${activity?.percentChange.activeCalories} %`,
        changeType: getActivityChangeType("activeCalories"),
        dataset: activity?.rangeDataPoints.activeCalories,
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
        changeType: getActivityChangeType("steps"),
        dataset: activity?.rangeDataPoints.steps,
      },
    ];

    type TrendData = {
      Score: number[];
      "Active Burn": number[];
      Steps: number[];
    };

    const trendData: TrendData = {
      Score: stats[0]?.dataset ?? [],
      "Active Burn": stats[1]?.dataset ?? [],
      Steps: stats[2]?.dataset ?? [],
    };

    const heatmapData: HeatMapData[] = [
      {
        name: "Training Volume",
        data: activity?.rangeDataPoints.trainingVolume,
      },
      {
        name: "Training Frequency",
        data: activity?.rangeDataPoints.trainingFrequency,
      },
      {
        name: "Stay Active",
        data: activity?.rangeDataPoints.stayActive,
      },
      {
        name: "Recovery Time",
        data: activity?.rangeDataPoints.recoveryTime,
      },
      {
        name: "Move Every Hour",
        data: activity?.rangeDataPoints.moveEveryHour,
      },
      {
        name: "Meet Daily Targets",
        data: activity?.rangeDataPoints.meetDailyTargets,
      },
      {
        name: "Overall Score",
        data: activity?.rangeDataPoints.score,
      },
    ];

    const donutChartData: number[] = [
      activity?.rangeAverage.lowActiveTime,
      activity?.rangeAverage.medActiveTime,
      activity?.rangeAverage.highActiveTime === null
        ? 0
        : activity?.rangeAverage.highActiveTime,
    ];

    const donutChartLabels = ["Low", "Med", "High"];

    return (
      <div className="flex flex-grow flex-col gap-6 overflow-y-auto bg-slate-100 p-4 dark:bg-slate-900 sm:px-6 sm:pt-2 sm:pb-12">
        <>
          {/*DatePicker*/}
          <div className="flex w-full items-center justify-between">
            <DatePicker dateRange={dateRange} setDateRange={setDateRange} />
            <LabelToggle enabled={enabled} setEnabled={setEnabled} />
          </div>
          {/*StatCards*/}
          <div className="flex h-1/5 w-full flex-col gap-4 lg:flex-row">
            <StatCards data={stats} loading={loading} />
          </div>
          {/*TrendsChart*/}
          <div className="flex-grow rounded-2xl bg-white p-4 dark:bg-slate-800 ">
            <div className="flex items-center justify-between">
              <h1 className="text-md font-bold">Trends</h1>
              <Menu as="div" className="relative">
                <Menu.Button
                  type="button"
                  className="flex items-center rounded-md bg-slate-200 p-2  text-xs text-black hover:bg-slate-300  dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
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
                              setTrendDisplayName("Activity Score");
                            }}
                            className={clsx(
                              "flex w-36",
                              trendDisplayName === "Activity Score"
                                ? "text-indigo-600"
                                : "text-gray-700 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700",
                              "block px-4 py-2 text-sm "
                            )}
                          >
                            Activity Score
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {() => (
                          <button
                            onClick={() => {
                              setActiveTrendName("Active Burn");
                              setTrendDisplayName("Active Burn");
                            }}
                            className={clsx(
                              "flex w-36",
                              trendDisplayName === "Active Burn"
                                ? "text-indigo-600"
                                : "text-gray-700 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Active Burn
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {() => (
                          <button
                            onClick={() => {
                              setActiveTrendName("Steps");
                              setTrendDisplayName("Steps");
                            }}
                            className={clsx(
                              "flex w-36",
                              trendDisplayName === "Steps"
                                ? "text-indigo-600"
                                : "text-gray-700 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Steps
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            {activityLoading ? (
              <div className="flex items-center justify-center">
                <Loader size="h-16 w-16" />
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
          <div className="grid h-2/5 min-h-0 grid-cols-3 gap-6">
            <div className="col-span-3 h-72 min-h-0 rounded-2xl bg-white p-4 pb-12 dark:bg-slate-800 lg:col-span-2 lg:h-full">
              <p className="text-md font-bold">Score Board</p>
              {activityLoading ? (
                <div className="flex h-full items-center justify-center">
                  <Loader size="h-16 w-16" />
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
            <div className="col-span-3 rounded-2xl bg-white p-6 dark:bg-slate-800 lg:col-span-1">
              <h1 className="text-md font-bold">Movement</h1>
              {activityLoading ? (
                <div className="flex h-full items-center justify-center">
                  <Loader size="h-16 w-16" />
                </div>
              ) : (
                <DonutChart
                  enabled={enabled}
                  data={donutChartData}
                  labels={donutChartLabels}
                />
              )}
            </div>
          </div>
        </>
      </div>
    );
  }
};
export default Activity;
