import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useState } from "react";
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
  const [sleepTrend, setSleepTrend] = useState(
    dailySleep?.rangeDataPoints.score
  );
  const { theme, setTheme } = useTheme();
  return (
    <div className="mt-12 flex min-h-0 w-full flex-grow  flex-col rounded-xl bg-slate-700 ">
      <>
        <div className="flex items-center justify-around px-8"></div>
        <div className="h-full  min-h-0  w-full min-w-0 overflow-hidden rounded-xl p-4">
          <h1 className="text-lg">Trends (last 7 days)</h1>
          <div className="h-full">
            <div className="bg-slate-00 h-full">
              {dailySleepLoading ? (
                <Loader />
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
                    },
                    chart: {
                      id: "trends",
                      sparkline: {
                        enabled: false,
                      },
                      foreColor: theme === "dark" ? "white" : "black",
                      zoom: {
                        enabled: false,
                      },
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
