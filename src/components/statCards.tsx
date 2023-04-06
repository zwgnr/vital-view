import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import clsx from "clsx";

import { type Stats } from "../types/sharedTypes";
import { Loader } from "./loader";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export type StatCardProps = {
  data: Stats[];
  loading?: boolean;
};

export const StatCards = (props: StatCardProps) => {
  const { data, loading } = props;
  const { theme } = useTheme();
  return (
    <>
      {data.map((item) => (
        <div className="w-full lg:w-1/3" key={item.id}>
          <div className=" flex h-full flex-col flex-wrap rounded-2xl bg-white p-4 dark:bg-slate-800">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <Loader size="h-12 w-12" />
              </div>
            ) : (
              <div className="flex h-full flex-col justify-between pb-8 ">
                <div className="flex items-center justify-between">
                  <p className="truncate text-lg font-semibold text-slate-500 dark:text-gray-300">
                    {item.name}
                  </p>
                </div>

                <div className="flex h-full w-full items-center ">
                  <div className="flex h-full w-1/3 flex-col justify-between">
                    <div></div>
                    <div className="flex items-baseline">
                      <p className=" text-4xl font-semibold sm:text-2xl xl:text-3xl">
                        {item.stat}
                      </p>
                      <p className="ml-1 text-sm">{item.unit}</p>
                    </div>
                    <div
                      className={clsx(
                        item.changeType === "noChange"
                          ? "bg-slate-100"
                          : item.changeType === "increase"
                          ? "bg-green-100 dark:bg-green-900"
                          : "bg-red-100 dark:bg-red-900",
                        "flex w-fit items-center rounded-2xl p-1 px-2"
                      )}
                    >
                      <div
                        className={clsx(
                          item.changeType === "noChange"
                            ? "text-slate-400"
                            : item.changeType === "increase"
                            ? "text-green-400"
                            : "text-red-400",
                          " flex items-baseline text-sm font-semibold "
                        )}
                      >
                        {item.changeType === "noChange" ? (
                          <Icon
                            icon="ph:circle-half-tilt-fill"
                            width={28}
                            height={28}
                            className="text-slate-400"
                          />
                        ) : item.changeType === "increase" ? (
                          <Icon
                            icon="material-symbols:arrow-circle-up-outline"
                            width={28}
                            height={28}
                            className="text-green-400"
                          />
                        ) : (
                          <Icon
                            icon="material-symbols:arrow-circle-down-outline"
                            width={28}
                            height={28}
                            className="text-red-400"
                          />
                        )}
                      </div>
                      <p
                        className={clsx(
                          item.changeType === "noChange"
                            ? "text-slate-400"
                            : item.changeType === "increase"
                            ? "text-green-400"
                            : "text-red-400",
                          "ml-1 flex items-baseline text-sm font-semibold"
                        )}
                      >
                        <span className="sr-only">
                          {item.changeType === "increase"
                            ? "Increased"
                            : "Decreased"}
                          by
                        </span>
                        {item.change}
                      </p>
                    </div>
                  </div>
                  <div className="h-full w-full ">
                    <ApexChart
                      width="100%"
                      height="100%"
                      options={{
                        dataLabels: {
                          enabled: false,
                        },
                        stroke: {
                          curve: "smooth",
                          //dashArray: [0, 6],
                          // width: [4, 2],
                        },
                        markers: {
                          size: [0, 0],
                        },
                        chart: {
                          id: "main-chart",
                          foreColor: theme === "dark" ? "white" : "black",
                          zoom: {
                            enabled: false,
                          },
                          sparkline: { enabled: true },
                        },
                        colors: [
                          //"#4f46e5",
                          item.changeType === "noChange"
                            ? "#94a3b8"
                            : item.changeType === "increase"
                            ? "#4ade80"
                            : "#f87171",
                        ],
                        xaxis: {
                          //categories: [1, 2, 3, 4, 5, 6, 7],
                          //tickAmount: 1,
                        },
                        grid: {
                          yaxis: { lines: { show: false } },
                        },
                        tooltip: { theme: "dark", x: { show: false } },
                      }}
                      series={[
                        {
                          name: item.name,
                          data: item.dataset,
                        },
                      ]}
                      type="area"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
