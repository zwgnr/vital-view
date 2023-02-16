import { Icon } from "@iconify/react";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

import { type Stats } from "../types/sharedTypes";

export type StatCardProps = {
  data: Stats[];
  activeTrendName: string;
  setActiveTrendName: Dispatch<SetStateAction<any>>;
};

export const StatCards = (props: StatCardProps) => {
  const { activeTrendName, setActiveTrendName, data } = props;
  return (
    <>
      {data.map((item) => (
        <div className="w-full flex-grow  sm:w-1/3" key={item.id}>
          <div
            onClick={() => {
              setActiveTrendName(item.name);
            }}
            className={clsx(
              activeTrendName === item.name
                ? "border-4 border-slate-900 dark:bg-slate-400 dark:text-black hover:dark:bg-white"
                : "hover:bg-slate-200",
              " flex h-full flex-col flex-wrap rounded-xl border-2 border-slate-200 p-4 shadow-lg hover:cursor-pointer  dark:bg-slate-700  hover:dark:bg-slate-500"
            )}
          >
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between ">
                <p className="truncate text-lg font-semibold dark:text-gray-300">
                  {item.name}
                </p>
                <div
                  className={clsx(
                    item.changeType === "increase"
                      ? "text-green-600"
                      : "text-red-600",
                    "ml-2 flex items-baseline text-sm font-semibold"
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
              </div>
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline">
                  <p className="text-3xl font-semibold">{item.stat}</p>
                  <p className="ml-1 text-sm">{item.unit}</p>
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
                    {item.changeType === "increase" ? "Increased" : "Decreased"}
                    by
                  </span>
                  {item.change}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
