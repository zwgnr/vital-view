import { useSession, signIn } from "next-auth/react";

export const SignInButton = () => {
  const { status } = useSession();
  return (
    <>
      {status !== "authenticated" ? (
        <div className="flex ">
          <button
            onClick={(e) => {
              e.preventDefault();
              signIn("oura", { callbackUrl: "/" });
            }}
            className=" text-md rounded-md bg-indigo-600 p-4 font-bold text-white hover:bg-indigo-500"
          >
            Sign In with Oura
          </button>
        </div>
      ) : null}
    </>
  );
};
