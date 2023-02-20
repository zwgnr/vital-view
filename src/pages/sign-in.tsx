import { type NextPage } from "next";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SignInButton } from "../components/signInButton";
import { Icon } from "@iconify/react";
export const SignIn: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (router.pathname !== "/sign-in") {
    router.push("/sign-in");
  }

  if (status === "authenticated") {
    return (
      <p className="flex h-full items-center justify-center dark:bg-slate-700">
        You are Signed In :)
      </p>
    );
  }
  return (
    <>
      <div className="flex h-screen  flex-col items-center justify-center bg-gradient-to-r from-indigo-100 via-indigo-300 to-indigo-600 dark:bg-slate-700">
        <Image
          src="/ring.png"
          alt="Oura Ring"
          width={250}
          height={250}
          className="mb-4"
        />
        <h1 className="mb-8 flex flex-col items-center justify-center gap-2">
          <p className="text-5xl">Welcome to RingLab.</p>
          <p className="text-xl">A data dashboard for your Oura Ring.</p>
        </h1>
        <SignInButton />
      </div>
      <div></div>
    </>
  );
};

export default SignIn;
