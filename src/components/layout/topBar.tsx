import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import { type SideBarOpenProps } from "./layout";
import { useRouter } from "next/router";

type SetSideBarOpenPropsOnlyProp = Omit<SideBarOpenProps, "sidebarOpen">;

export const TopBar = (props: SetSideBarOpenPropsOnlyProp) => {
  const { theme, setTheme } = useTheme();
  const { setSidebarOpen } = props;
  const router = useRouter();

  const handleTitle = () => {
    if (router.pathname === "/sleep") {
      return "Sleep Stats";
    }
    if (router.pathname === "/readiness") {
      return "Readiness Stats";
    }
    if (router.pathname === "/activity") {
      return "Activity Stats";
    }
    return null;
  };
  return (
    <div className="flex h-16 w-full  p-1 dark:border-gray-800  dark:bg-slate-900">
      <button
        type="button"
        className="border-r border-gray-200 px-4 text-gray-100 md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Icon
          icon="material-symbols:menu-rounded"
          width={36}
          height={36}
          color="black"
          aria-hidden="true"
        />
      </button>
      <div className="flex flex-1 items-center justify-between px-4">
        <h1 className="text-xl font-semibold">{handleTitle()}</h1>
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
