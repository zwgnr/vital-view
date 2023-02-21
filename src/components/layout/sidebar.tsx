import Link from "next/link";
import { clsx } from "clsx";
import { Icon } from "@iconify/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

import { Email } from "../email";
import { navigation } from "./navigation";

const package_json = require("../../../package.json");

export const SideBar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <div className=" hidden w-56 flex-col bg-white pt-5 dark:bg-slate-800 md:flex">
      <div className="flex items-center justify-center px-4">
        <Image src="/ringLabLogo.png" alt="RingLab Logo" width={36} height={36} />
        <h1 className="ml-2 text-xl font-bold dark:text-white">Ring Lab</h1>
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
                    ? " font-semibold text-black dark:text-white"
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

          <p className="text-xs dark:text-white">{`v${package_json.version}`}</p>
        </div>

        <div className="flex flex-row">
          {status === "authenticated" ? (
            <div className="border-t border-gray-300 p-2">
              <div className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600">
                <Icon
                  icon="clarity:avatar-line"
                  width={24}
                  height={24}
                  className="mr-3 h-6 w-6 flex-shrink-0 text-gray-600"
                />
                <p className="dark:text-gray-400">
                  <Email />
                </p>
              </div>

              <button
                className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600  hover:bg-slate-100 dark:text-gray-400 dark:hover:bg-slate-700"
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                <Icon
                  icon="material-symbols:logout"
                  width={24}
                  height={24}
                  className="mr-3 h-6 w-6 flex-shrink-0 text-gray-600"
                />
                <p className="dark:text-gray-400 ">Logout </p>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
