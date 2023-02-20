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
            className="mr-4 text-white rounded-md bg-indigo-600 p-2"
          >
            Sign In with Oura
          </button>
        </div>
      ) : null}
    </>
  );
};
