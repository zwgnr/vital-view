import { type NextPage } from "next";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";
//import { SignInButton } from "../components/signInButton";
import { TodaysScoresDemo } from "../../components/demo/todaysScoresDemo";
//import { Trends } from "../components/charts/overviewTrends";
import { greeter } from "../../lib/greeter";

export const HomeDemo = () => {
  return (
    <div className="flex h-full flex-grow flex-col gap-4 overflow-y-auto p-8 dark:bg-slate-800 sm:p-6">
      <h1 className="text-3xl">{greeter()}</h1>
      <TodaysScoresDemo />
    </div>
  );
};

export default HomeDemo;
