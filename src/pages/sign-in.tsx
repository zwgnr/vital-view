import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { SignInButton } from "../components/signInButton";
export const SignIn: NextPage = () => {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return (
      <p className="flex h-full items-center justify-center dark:bg-slate-700">
        You are Signed In :)
      </p>
    );
  }
  return (
    <>
      <div className=" flex h-screen flex-col items-center justify-center dark:bg-slate-700">
        <h1 className="mb-8 text-xl">
          Welcome to RingLab. A data dashboard for your Oura Ring.
        </h1>
        <SignInButton />
      </div>
    </>
  );
};

export default SignIn;
