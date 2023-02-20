import { useSession, signIn, signOut } from "next-auth/react";

export const SignInButton = () => {
  const { data: session, status } = useSession();
  return (
    <>
      {status !== "authenticated" ? (
        <div className="flex ">
          <button
            onClick={(e) => {
              e.preventDefault();
              signIn("oura", { callbackUrl: "/" });
            }}
            className=" text-md font-bold text-white rounded-md bg-indigo-600 hover:bg-indigo-500 p-4"
          >
            Sign In with Oura
          </button>
        </div>
      ) : null}
    </>
  );
};
