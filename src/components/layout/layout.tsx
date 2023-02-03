import { ReactNode, useState } from "react";
import { SideBar } from "./sidebar";
import Head from "next/head";
import { MobileMenuDialog } from "./mobileMenuDialog";
import { TopBar } from "./topBar";
import { Fragment, Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";
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
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Head>
        <title>Ring Lab</title>
        <meta name="description" content="Oura Ring Stats Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MobileMenuDialog
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {status === "loading" ? (
        <div className="flex h-screen w-full overflow-hidden">
          <SideBar />
          <Loader />
        </div>
      ) : (
        <div className="flex h-screen w-full overflow-hidden ">
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
