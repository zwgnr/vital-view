import { Fragment } from "react";
import { clsx } from "clsx";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

import { navigation } from "./navigation";
import { type SideBarOpenProps } from "./layout";
import { Email } from "../email";

const package_json = require("../../../package.json");

export const MobileMenuDialog = (props: SideBarOpenProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
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
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4 dark:bg-slate-800">
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
                width={28}
                height={28}
                className="flex-shrink-0 text-slate-800 dark:text-white"
                icon="icon-park-outline:chart-ring"
              />
              <h1 className="ml-2 text-xl font-bold text-slate-800 dark:text-white">
                Ring Lab
              </h1>
            </div>
            <div className="mt-5 flex flex-1 flex-col">
              <nav className="flex-1 space-y-1 px-2 pb-4">
                <>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        router.pathname == item.href
                          ? "font-semibold text-black dark:text-white"
                          : "text-gray-600 hover:bg-slate-100 dark:text-gray-400 dark:hover:bg-slate-700",
                        "group flex items-center rounded-md px-2 py-2 text-sm"
                      )}
                    >
                      <Icon
                        icon={item.icon}
                        width={24}
                        height={24}
                        className={clsx(
                          router.pathname == item.href ? "text-indigo-500" : "",
                          "mr-3 h-6 w-6 flex-shrink-0"
                        )}
                      />
                      {item.name}
                    </Link>
                  ))}
                </>
              </nav>
              <div className="flex flex-row items-center justify-center gap-2 p-2">
                <a href="https://github.com/zwagnr/ring-lab">
                  <Icon
                    icon="mdi:github"
                    width={24}
                    height={24}
                    className="hover:text-indigo-600"
                  />
                </a>
                <p className="text-xs dark:text-white ">
                  {`v${package_json.version}`}
                </p>
              </div>

              <div className="flex flex-row">
                {status === "authenticated" ? (
                  <div className="w-full border-t border-gray-300 p-2">
                    <div className="group flex items-center rounded-md px-2 py-2 text-sm font-medium">
                      <Icon
                        icon="clarity:avatar-line"
                        width={24}
                        height={24}
                        className="mr-3 h-6 w-6 flex-shrink-0 text-gray-600 dark:text-gray-400"
                      />
                      <p className="text-gray-600 dark:text-gray-400">
                        <Email />
                      </p>
                    </div>

                    <button
                      className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={(e) => {
                        e.preventDefault();
                        signOut();
                      }}
                    >
                      <Icon
                        icon="material-symbols:logout"
                        width={24}
                        height={24}
                        className="mr-3 h-6 w-6 flex-shrink-0 text-gray-600 dark:text-gray-400"
                      />
                      <p className="text-gray-600 dark:text-gray-400 ">
                        Logout
                      </p>
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
