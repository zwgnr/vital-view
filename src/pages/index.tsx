import { type NextPage } from "next";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SignInButton } from "../components/signInButton";
import Link from "next/link";
import Overview from "./overview";

export const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return <Overview />;
  }
  return (
    <>
      <div className="flex h-screen w-full  flex-col items-center justify-center bg-gradient-to-r from-indigo-100 via-indigo-300 to-indigo-600 dark:bg-slate-700">
        <Image
          src="/ringLabLogo.png"
          alt="Oura Ring"
          width={150}
          height={150}
          className="mb-4"
        />
        <h1 className="mb-8 flex flex-col items-center justify-center gap-2">
          <p className="text-4xl md:text-5xl">Welcome to RingLab.</p>
          <p className="text-xl">A data dashboard for your Oura Ring.</p>
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
