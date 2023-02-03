import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Fragment, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { CurrentScoreCard } from "../../components/currentScoreCard";
import { Loader } from "../../components/loader";
import { Icon } from "@iconify/react";
// @ts-ignore
export async function getServerSideProps({ req }) {
  const token = await getToken({ req });
  const authToken = token?.accessToken;

  //console.log("GSSP", token);
  const getTime = new Date();
  const currentTime = getTime.toLocaleString().slice(0, 9);
  return { props: { score: "6", email: "2", age: 21, time: currentTime } };
}
// @ts-ignore
export const Home: NextPage = ({ score, email, age, time }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <>
      {status === "authenticated" ? (
        <div>
          {/* main body */}
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              <p>{time}</p>
              <p>Good Afternoon, ...</p>
              <br />
              <h1 className="text-2xl font-semibold text-gray-900">
                Current Scores
              </h1>
              <span className="icon-mdi-light--home"></span>
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              {/* Replace with your content */}
              <div className="py-4">
                <div className="flex h-96 rounded-lg  border-gray-200  shadow-lg">
                  <CurrentScoreCard scoreName="Sleep Score" id="getSleep" />
                  <CurrentScoreCard
                    scoreName="Readiness Score"
                    id="getReadiness"
                  />
                  <CurrentScoreCard
                    scoreName="Activity Score"
                    id="getActivity"
                  />
                </div>
              </div>
              {/* /End replace */}
            </div>
          </div>
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
