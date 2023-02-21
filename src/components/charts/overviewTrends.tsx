import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

import { useActivity } from "../../hooks/useActivity";
import { useDailySleep } from "../../hooks/useDailySleep";
import { useReadiness } from "../../hooks/useReadiness";
import { Loader } from "../loader";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const Trends = () => {
  const { dailySleep, dailySleepLoading, dailySleepError } =
    useDailySleep("last7Days");
  const { readiness, readinessLoading, readinessError } =
    useReadiness("last7Days");
  const { activity, activityLoading, activityError } = useActivity("last7Days");

  const { theme, setTheme } = useTheme();
  return (
    <div className="flex h-1/2 min-h-0 w-full flex-grow flex-col rounded-2xl bg-white dark:bg-slate-800  sm:h-full ">
      <>
        <div className="flex items-center justify-around px-8"></div>
        <div className="h-full  min-h-0  w-full min-w-0 overflow-hidden rounded-2xl p-4">
          <h1 className="text-md font-bold">Trends (last 7 days)</h1>
          <div className="h-full">
            <div className="bg-slate-00 h-full">
              {dailySleepLoading ? (
                <div className="flex h-full items-center justify-center">
                  <Loader size="h-24 w-24" />
                </div>
              ) : (
                <ApexChart
                  width={"100%"}
                  height={"95%"}
                  options={{
                    stroke: {
                      curve: "smooth",
                    },
                    xaxis: {
                      categories: dailySleep?.timePeriod,
                      axisTicks: { show: false },
                    },
                    colors: ["#7dd3fc", "#d8b4fe", "#5eead4"],
                    chart: {
                      id: "trends",
                      sparkline: {
                        enabled: false,
                      },
                      foreColor: theme === "dark" ? "white" : "black",
                      zoom: {
                        enabled: false,
                      },
                      toolbar: { show: false },
                    },
                    tooltip: {
                      theme: "dark",
                      fixed: {
                        enabled: true,
                        position: "bottomLeft",
                        offsetX: 0,
                        offsetY: 0,
                      },
                    },
                    grid: {
                      yaxis: { lines: { show: false } },
                      xaxis: { lines: { show: false } },
                    },
                  }}
                  series={[
                    {
                      name: "sleep",
                      data: dailySleep?.rangeDataPoints.score,
                    },
                    {
                      name: "readiness",
                      data: readiness?.rangeDataPoints.score,
                    },
                    {
                      name: "activity",
                      data: activity?.rangeDataPoints.score,
                    },
                  ]}
                  type="line"
                />
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};
