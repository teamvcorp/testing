import { auth } from "@/auth";
import { Kid } from "../types/next-auth";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page() {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

if (Array.isArray(session.user.kids)) {
  session.user.kids.forEach((kid: Kid) => {
    console.log("Kid ID:", kid.id);
  });
}

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
      <h1>Select your Profile</h1>
      <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
        {/* Render user profile */}
        <div style={{ textAlign: "center" }}>
          <div
            className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-4xl mb-2 transition duration-200 group-hover:bg-indigo-300 group-hover:scale-105"
          >
            {/* Show user initial or icon */}
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={50}
                height={50}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{session.user.name?.[0] || "U"}</span>
            )}
          </div>
        </div>
        {/* Render kids profiles if they exist */}
        <Suspense fallback={<div>Loading profiles...</div>}>
          {Array.isArray(session.user.kids) &&
            session.user.kids.map((kid: Kid, idx: number) => (
              <Link
                key={idx}
                href={`/profile/kid?kid=${kid.id}`}
                className="text-center group cursor-pointer no-underline"
              >
                <div
                  className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-4xl mb-2 transition duration-200 group-hover:bg-indigo-300 group-hover:scale-105"
                >
                  {kid.name?.[0] || "K"}
                </div>
                {/* <div>{kid.name || "Kid"}</div> */}
              </Link>
            ))}
        </Suspense>
      </div>
    </div>
  );
}