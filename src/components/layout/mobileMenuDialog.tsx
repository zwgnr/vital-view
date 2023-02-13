import { Fragment } from "react";
import useSWR from "swr";
import { Dialog, Transition, Menu } from "@headlessui/react";
import { navigation } from "./navigation";
import { clsx } from "clsx";

import { type SideBarOpenProps } from "./layout";
import { Icon } from "@iconify/react";
import Link from "next/link";
import router from "next/router";
import { signOut, useSession } from "next-auth/react";
import { fetcher } from "../../lib/fetcher";

const Email = () => {
  const { data, error } = useSWR("api/info/", fetcher);
  if (error) {
    return "Error Loading";
  }
  if (!data) {
    return "Loading...";
  }
  return data.email;
};

export const MobileMenuDialog = (props: SideBarOpenProps) => {
  const { data: session, status } = useSession();
  const { sidebarOpen, setSidebarOpen } = props;
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 flex md:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-slate-900 pt-5 pb-4">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <Icon
                  icon="mdi:close-circle-outline"
                  width={36}
                  height={36}
                  className="flex-shrink-0 text-white"
                />
              </button>
            </div>
            <div className="flex items-center justify-center px-4">
              <Icon
                width={36}
                height={36}
                className="flex-shrink-0 text-indigo-300"
                icon="ion:cube-outline"
              />
              <h1 className=" ml-3 text-xl text-white">Ring Lab</h1>
            </div>
            <div className="mt-5 flex flex-1 flex-col">
              <nav className="flex-1 space-y-1 px-2 pb-4">
                {status !== "authenticated" ? (
                  <Link
                    href="/"
                    className={clsx(
                      "group flex items-center rounded-md bg-indigo-800 px-2 py-2 text-sm font-medium text-white"
                    )}
                  >
                    <Icon
                      icon="ph:house"
                      width={24}
                      height={24}
                      className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300"
                    />
                    Overview
                  </Link>
                ) : (
                  <>
                    {" "}
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={clsx(
                          router.pathname == item.href
                            ? "bg-indigo-800 text-white"
                            : "text-indigo-100 hover:bg-indigo-600",
                          "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                        )}
                      >
                        <Icon
                          icon={item.icon}
                          width={24}
                          height={24}
                          className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </>
                )}
              </nav>
              <div className="flex flex-row items-center justify-center gap-2 p-2">
                <Icon icon="mdi:github" width={24} height={24} />
                <p className="text-xs text-white">v.0.0.1</p>
              </div>

              <div className="flex flex-row">
                {status === "authenticated" ? (
                  <div className="w-full border-t border-gray-300 p-2">
                    <div className="group flex items-center rounded-md px-2 py-2 text-sm font-medium">
                      <Icon
                        icon="clarity:avatar-line"
                        width={24}
                        height={24}
                        className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300"
                      />
                      <p className="text-white">
                        <Email />
                      </p>
                    </div>

                    <button
                      className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-indigo-600"
                      onClick={(e) => {
                        e.preventDefault();
                        signOut();
                      }}
                    >
                      <Icon
                        icon="material-symbols:logout"
                        width={24}
                        height={24}
                        className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300"
                      />
                      <p className="text-white">Logout </p>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </Transition.Child>
        <div className="w-14 flex-shrink-0" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  );
};
