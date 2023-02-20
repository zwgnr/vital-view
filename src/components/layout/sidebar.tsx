import Link from "next/link";
import { clsx } from "clsx";
import { Icon } from "@iconify/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

import { Email } from "../email";
import { navigation } from "./navigation";

export const SideBar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <div className=" hidden w-56 flex-col bg-white pt-5 dark:bg-slate-900 md:flex">
      <div className="flex items-center justify-center px-4">
        <Icon
          width={36}
          height={36}
          className="flex-shrink-0 text-slate-800"
          icon="ion:cube-outline"
        />
        <h1 className=" ml-3 text-xl  dark:text-white">Ring Lab</h1>
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
                    ? " font-semibold text-black"
                    : "text-gray-400 hover:bg-slate-200",
                  "group flex items-center rounded-md px-2 py-2 text-sm"
                )}
              >
                <Icon
                  icon={item.icon}
                  width={24}
                  height={24}
                  className={clsx(
                    router.pathname == item.href
                      ? "text-indigo-500"
                      : "hover:text-white",
                    "mr-3 h-6 w-6 flex-shrink-0"
                  )}
                />
                {item.name}
              </Link>
            ))}
          </>
        </nav>
        <div className="flex flex-row items-center justify-center gap-2 p-2">
          <Icon icon="mdi:github" width={24} height={24} />
          <p className="text-xs dark:text-white">v.0.0.1</p>
        </div>

        <div className="flex flex-row">
          {status === "authenticated" ? (
            <div className="border-t border-gray-300 p-2">
              <div className="group flex items-center rounded-md px-2 py-2 text-sm font-medium">
                <Icon
                  icon="clarity:avatar-line"
                  width={24}
                  height={24}
                  className="mr-3 h-6 w-6 flex-shrink-0 text-gray-700"
                />
                <p className="dark:text-white">
                  <Email />
                </p>
              </div>

              <button
                className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-indigo-200"
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                <Icon
                  icon="material-symbols:logout"
                  width={24}
                  height={24}
                  className="mr-3 h-6 w-6 flex-shrink-0 text-gray-700"
                />
                <p className="dark:text-white">Logout </p>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
