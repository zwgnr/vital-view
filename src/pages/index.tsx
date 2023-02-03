import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Fragment, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { CurrentScoreCard } from "../components/currentScoreCard";
import { Loader } from "../components/loader";
import { Icon } from "@iconify/react";
import { SignInButton } from "../components/signInButton";
import Router from "next/router";
import { TodaysScores } from "../components/todaysScores";
import { Trends } from "../components/charts/overviewTrends";

export async function getServerSideProps({ req }) {
  const token = await getToken({ req });
  const authToken = token?.accessToken;

  //console.log("GSSP", token);
  const getTime = new Date();
  const currentTime = getTime.toLocaleString().slice(0, 9);
  return { props: { score: "6", email: "2", age: 21, time: currentTime } };
}


export const Home: NextPage = ({ score, email, age, time }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <>
      {status === "authenticated" ? (
        <div className="flex flex-grow flex-col gap-4 overflow-y-auto  bg-white p-8 dark:bg-slate-800 sm:p-6">
          {/* main body */}
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
