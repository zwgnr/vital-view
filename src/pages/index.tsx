import { type NextPage } from "next";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { SignInButton } from "../components/signInButton";
import Link from "next/link";
import Overview from "./overview";

export const Home: NextPage = () => {
  const { status } = useSession();

  if (status === "authenticated") {
    return <Overview />;
  }
  return (
    <>
      <div className="flex h-screen w-full  flex-col items-center justify-center bg-gradient-to-r from-indigo-100 via-indigo-300 to-indigo-600 dark:bg-slate-700">
        <Image
          src="/vitalview.png"
          alt="Vital View Logo"
          width={150}
          height={150}
          className="mb-4"
        />
        <h1 className="mb-8 flex flex-col items-center justify-center gap-2 px-4">
          <p className="text-center text-4xl md:text-5xl">
            Welcome to Vital View.
          </p>
          <p className="text-center text-xl">
            A data dashboard for your most vital health metrics.
          </p>
        </h1>
        <SignInButton />
        <div className="mt-8 flex gap-4">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Home;
