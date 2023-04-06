import { ReactNode, useState, Dispatch, SetStateAction } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";

import { SideBar } from "./sidebar";
import { MobileMenuDialog } from "./mobileMenuDialog";
import { TopBar } from "./topBar";
import { Loader } from "../loader";

export type SideBarOpenProps = {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout(props: LayoutProps) {
  const { children } = props;
  const { status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Head>
        <title>Vital View</title>
        <meta name="description" content="Oura Ring Stats Dashboard" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <MobileMenuDialog
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {status === "unauthenticated" ? (
        <main className="flex h-full flex-grow flex-col overflow-hidden bg-gradient-to-r from-indigo-100 via-indigo-300 to-indigo-600 text-black dark:text-white">
          {/* <div className="flex flex-grow overflow-x-hidden"></div> */}
          <div className="flex h-screen  flex-col items-center justify-center bg-gradient-to-r from-indigo-100 via-indigo-300 to-indigo-600 dark:bg-slate-700">
            {children}
          </div>
        </main>
      ) : status === "loading" ? (
        <div className="flex h-screen w-full overflow-hidden">
          <Loader size={""} />
        </div>
      ) : (
        <div
          className={
            status === "authenticated"
              ? "flex w-full overflow-hidden lg:h-screen"
              : "flex h-screen w-full overflow-hidden"
          }
        >
          <SideBar />
          <main className="flex h-full flex-grow flex-col overflow-hidden text-black dark:text-white">
            <TopBar setSidebarOpen={setSidebarOpen} />
            {/* <div className="flex flex-grow overflow-x-hidden"></div> */}
            {children}
          </main>
        </div>
      )}
    </>
  );
}
