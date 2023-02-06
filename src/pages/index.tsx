import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { SignInButton } from "../components/signInButton";
import { TodaysScores } from "../components/todaysScores";
import { Trends } from "../components/charts/overviewTrends";

export const Home: NextPage = () => {
  const { data: session, status } = useSession();

  return (
    <>
      {status === "authenticated" ? (
        <div className="flex flex-grow flex-col gap-4 overflow-y-auto  bg-white p-8 dark:bg-slate-800 sm:p-6">
          <h1 className="text-3xl">Good Afternoon,</h1>
          <TodaysScores />
          <Trends />
        </div>
      ) : (
        <div className=" flex h-[90vh] flex-col items-center justify-center">
          <h1 className="mb-8 text-xl">
            Welcome to RingLab. A data dashboard for your Oura Ring.
          </h1>
          <SignInButton />
        </div>
      )}
    </>
  );
};

export default Home;
