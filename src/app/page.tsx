"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Component() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <div className="flex justify-around items-center space-x-3 w-1/4 p-5 bg-slate-50 text-black rounded-sm m-5 ">
          <Image
            className="rounded-full"
            priority={false}
            src={session.user?.image ?? "No Image"}
            alt="Description of image"
            width={50}
            height={50}
          />
          Name: {session.user?.name ?? "unknown"} <br />
          Email: {session.user?.email ?? "unknown"} <br />
          <div>
            <button
              onClick={() => signOut()}
              className="bg-black text-white font-bold p-4 rounded "
            >
              Sign out
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex justify-around items-center space-x-3 w-1/4 p-5 bg-slate-50 text-black rounded-sm m-5 ">
        Please signed first! <br />
        <button
          onClick={() => signIn()}
          className="bg-black text-white font-bold p-4 rounded "
        >
          Sign in
        </button>
        {/* if we want to login directly by click on button then write name of provider e.g. google, github in signIn() as parameter */}
        {/* <button onClick={() => signIn("google")}>Sign in with Google</button>
      <button onClick={() => signIn("github")}>Sign in with Github</button> */}
      </div>
    </>
  );
}
