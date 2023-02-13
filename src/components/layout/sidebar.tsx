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
    <div className="hidden w-56 flex-col bg-slate-900 pt-5 sm:flex">
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
            <div className="border-t border-gray-300 p-2">
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
  );
};
