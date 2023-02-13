import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { TodaysScores } from "../components/todaysScores";
import { Trends } from "../components/charts/overviewTrends";
import { greeter } from "../lib/greeter";

export const Home = () => {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    useRouter().push("/sign-in");
  }
  if (status === "authenticated") {
    return (
      <div className="flex flex-grow flex-col gap-4 overflow-y-auto  bg-white p-8 dark:bg-slate-800 sm:p-6">
        <h1 className="text-3xl">{greeter()}</h1>
        <TodaysScores />
        <Trends />
      </div>
    ); 
  }
};

export default Home;
