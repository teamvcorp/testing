import { Suspense } from "react";
import { auth, signOut } from "@/auth";
import { Kid } from "../../types/next-auth";
import NaughtyMeter from "@/app/components/naughtyMeter";


type SearchParams = Promise<{ kid?: string }>;

export default async function KidProfilePage({ searchParams }: { searchParams: SearchParams }) {
  const session = await auth();
  if (!session || !session.user?.email) {
    return (
      <div className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <p className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Unauthorized</p>
        </div>
      </div>
    );
  }

  const resolvedSearchParams = await searchParams;
  const kidId = resolvedSearchParams.kid;
  if (!kidId) {
    return (
      <div className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <p className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Missing kid ID</p>
        </div>
      </div>
    );
  }

  const kid = session.user.kids?.find((k: Kid) => k.id === kidId);
  if (!kid) {
    return (
      <div className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <p className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Kid not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 min-h-screen py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
      <h2 className="text-base font-semibold text-cyan-300 tracking-widest uppercase">Kid Profile</h2>
      
      <p className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl drop-shadow-lg">
        {kid.name || "Kid"}
      </p>
     <div>
      {session ? (
        <div className="mt-6 flex flex-col gap-4 rounded-xl bg-gradient-to-br from-slate-800 via-indigo-800 to-blue-900 p-6 shadow-lg ring-1 ring-white/10">
          <p className="text-lg font-medium text-cyan-200">
            Welcome, <span className="font-semibold text-white">{session.user?.name}</span>!
          </p>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="mt-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 text-base font-semibold text-white shadow-md transition hover:from-cyan-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              Sign Out
            </button>
          </form>
        </div>
      ) : (
        <div className="mt-6 rounded-xl bg-gradient-to-br from-slate-800 via-indigo-800 to-blue-900 p-6 shadow-lg ring-1 ring-white/10">
          <p className="text-lg text-cyan-200">
            Not signed in.{" "}
            <a
              href="/login"
              className="font-semibold text-cyan-300 underline hover:text-cyan-200"
            >
              Sign in
            </a>
          </p>
        </div>
      )}
    </div>
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-16 lg:grid-cols-6 lg:grid-rows-1">
        <div className="flex p-px lg:col-span-3">
          <div className="overflow-hidden rounded-lg bg-gradient-to-br from-slate-800 via-indigo-800 to-blue-900 ring-1 ring-white/15 shadow-xl max-lg:rounded-t-[2rem] lg:rounded-l-[2rem]">
          <div
            className="h-80 flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-cyan-100 to-blue-200 text-6xl text-slate-600 font-bold"
          >
            {kid.name?.[0] || "K"}
          </div>
          <div className="p-10">
            <h3 className="text-sm font-semibold text-cyan-300 tracking-wide">Profile</h3>
            <p className="mt-2 text-lg font-medium tracking-tight text-white">Kid Details</p>
            <p className="mt-2 max-w-lg text-sm text-blue-200">
            ID: <span className="font-mono">{kid.id}</span>
            </p>
          </div>
          </div>
        </div>
        <div className="flex p-px lg:col-span-3">
          <div className="overflow-hidden rounded-lg bg-gradient-to-br from-slate-800 via-indigo-800 to-blue-900 ring-1 ring-white/15 shadow-xl max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]">
          <div className="h-80 flex items-center justify-center">
            <NaughtyMeter kid={{ niceScore: kid.niceScore ?? 0 }} />
          </div>
          <div className="p-10">
            <h3 className="text-sm font-semibold text-cyan-300 tracking-wide">Naughty Meter</h3>
            <p className="mt-2 text-lg font-medium tracking-tight text-white">Behavior Score</p>
            <p className="mt-2 max-w-lg text-sm text-blue-200">
            Tracking <span className="font-semibold text-cyan-200">{kid.name || "Kid"}</span>&#39;s nice score and behavior metrics.
            </p>
          </div>
          </div>
        </div>
        </div>
      </Suspense>
      </div>
    </div>
  );
}