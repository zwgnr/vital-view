import { Icon } from "@iconify/react";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

import { type Stats } from "../types/sharedTypes";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { Loader } from "./loader";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export type StatCardProps = {
  data: Stats[];
  activeTrendName: string;
  setActiveTrendName: Dispatch<SetStateAction<any>>;
  loading?: boolean;
};

export const StatCards = (props: StatCardProps) => {
  const { activeTrendName, setActiveTrendName, data, loading } = props;
  const { theme, setTheme } = useTheme();
  return (
    <>
      {data.map((item) => (
        <div className="w-full lg:w-1/3" key={item.id}>
          <div
            onClick={() => {
              setActiveTrendName(item.name);
            }}
            className={clsx(
              activeTrendName === item.name ? " " : null,
              " flex h-full flex-col flex-wrap rounded-xl border-2 border-slate-200 p-4 shadow-md dark:bg-slate-700  hover:dark:bg-slate-500"
            )}
          >
            <div className="flex h-full flex-col justify-between p-2 pb-8 ">
              <div className="flex items-center justify-between ">
                <p className="truncate text-lg font-semibold dark:text-gray-300">
                  {item.name}
                </p>
              </div>
              <div className="flex h-full w-full items-center ">
                <div className="flex h-full w-1/3 flex-col justify-between">
                  <div></div>
                  <div className="flex items-baseline">
                    <p className=" text-4xl sm:text-2xl xl:text-3xl font-semibold">{item.stat}</p>
                    <p className="ml-1 text-sm">{item.unit}</p>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={clsx(
                        item.changeType === "increase"
                          ? "text-green-600"
                          : "text-red-600",
                        " flex items-baseline text-sm font-semibold"
                      )}
                    >
                      {item.changeType === "increase" ? (
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
                        item.changeType === "increase"
                          ? "text-green-400"
                          : "text-red-400",
                        "ml-2 flex items-baseline text-sm font-semibold"
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
                {loading ? (
                  <Loader />
                ) : (
                  <div className="w-full h-full ">
                    {" "}
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
                          item.changeType === "increase"
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
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
