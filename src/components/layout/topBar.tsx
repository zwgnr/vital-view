import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { SignInButton } from "../signInButton";
import { Icon } from "@iconify/react";
import { type SideBarOpenProps } from "./layout";

type SetSideBarOpenPropsOnlyProp = Omit<SideBarOpenProps, "sidebarOpen">;

export const TopBar = (props: SetSideBarOpenPropsOnlyProp) => {
  const { theme, setTheme } = useTheme();
  const { setSidebarOpen } = props;

  return (
    <div className="flex h-16 w-full border-b border-gray-200 p-1 dark:border-gray-800  dark:bg-slate-900">
      <button
        type="button"
        className="border-r border-gray-200 px-4 text-gray-100 sm:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Icon
          icon="material-symbols:menu-rounded"
          width={36}
          height={36}
          color="white"
          aria-hidden="true"
        />
      </button>
      <div className="flex flex-1 justify-between px-4">
        <div className="flex flex-1">
          {/* Spacer element to ensure proper alignment for Dark Mode toggle */}
        </div>
        <div className="items-centermd:ml-6 ml-4 flex">
          <button
            type="button"
            className="rounded-full p-1 text-gray-400 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="sr-only">Help</span>
            <Icon
              icon="ic:round-help-outline"
              width={24}
              height={24}
              color="gray"
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            className="rounded-full p-1 text-gray-400 hover:text-gray-100"
            onClick={() =>
              theme === "light" ? setTheme("dark") : setTheme("light")
            }
          >
            <span className="sr-only">Toggle Dark Mode</span>
            {theme === "light" ? (
              <Icon icon="ph:sun-bold" width={24} height={24} color="gray" />
            ) : (
              <Icon icon="ph:moon-bold" width={24} height={24} color="gray" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
