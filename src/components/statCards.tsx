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
                ? "dark:bg-slate-400 dark:text-black hover:dark:bg-slate-400"
                : null,
              " flex h-24 flex-col flex-wrap rounded-xl p-4 shadow-md hover:cursor-pointer dark:bg-slate-700 hover:dark:bg-slate-500"
            )}
          >
            <div>
              <p className="truncate text-lg font-medium dark:text-gray-300">
                {item.name}
              </p>
            </div>
            <div className="flex items-baseline">
              <p className=" text-3xl font-semibold">{item.stat}</p>
              <p className="ml-1 text-sm">{item.unit}</p>
              <p
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
                    width={24}
                    height={24}
                    color="green"
                  />
                ) : (
                  <Icon
                    icon="material-symbols:arrow-circle-down-outline"
                    width={24}
                    height={24}
                    color="red"
                  />
                )}

                <span className="sr-only">
                  {item.changeType === "increase" ? "Increased" : "Decreased"}
                  by
                </span>
                {item.change}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
