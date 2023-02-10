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
            className="mr-4 rounded-md bg-blue-500 p-2"
          >
            Sign In with Oura
          </button>
          <a
            href="/demo/home"
            className="flex items-center rounded-md bg-blue-500 p-2"
          >
            Try Demo
          </a>
        </div>
      ) : (
       null
      )}
    </>
  );
};
