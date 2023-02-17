import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Icon } from "@iconify/react";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";

export type DatePickerProps = {
  dateRange: string;
  setDateRange: Dispatch<SetStateAction<string>>;
};

export default function DatePicker(props: DatePickerProps) {
  const { dateRange, setDateRange } = props;
  const [rangeDisplayName, setrangeDisplayName] = useState("Last 7 Days");

  return (
    <>
      <Menu as="div" className="relative">
        <Menu.Button
          type="button"
          className="flex items-center rounded-md p-2 text-sm text-white font-medium  bg-black hover:bg-slate-200 dark:bg-slate-700 "
        >
          {rangeDisplayName}
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
          <Menu.Items className="bg- dark:text-whit absolute left-0 z-50 mt-3 w-36 origin-top-right overflow-hidden rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-white dark:bg-slate-800">
            <div className="py-1 ">
              <Menu.Item>
                {() => (
                  <button
                    onClick={() => {
                      setDateRange("today");
                      setrangeDisplayName("Today");
                    }}
                    className={clsx(
                      "flex w-36",
                      rangeDisplayName === "Today"
                        ? "bg-gray-600 text-blue-300 "
                        : "text-gray-700 hover:bg-slate-500 dark:text-white",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Today
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {() => (
                  <button
                    onClick={() => {
                      setDateRange("last7Days");
                      setrangeDisplayName("Last 7 Days");
                    }}
                    className={clsx(
                      "flex w-36",
                      rangeDisplayName === "Last 7 Days"
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 hover:bg-slate-500 dark:text-white",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Last 7 Days
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {() => (
                  <button
                    onClick={() => {
                      setDateRange("last30Days");
                      setrangeDisplayName("Last 30 Days");
                    }}
                    className={clsx(
                      "flex w-36",
                      rangeDisplayName === "Last 30 Days"
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 hover:bg-slate-500 dark:text-white",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Last 30 Days
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {() => (
                  <button
                    onClick={() => {
                      setDateRange("thisYear");
                      setrangeDisplayName("This Year");
                    }}
                    className={clsx(
                      "flex w-36",
                      rangeDisplayName === "This Year"
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 hover:bg-slate-500 dark:text-white",
                      "block px-4 py-2 text-sm "
                    )}
                  >
                    This Year
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
