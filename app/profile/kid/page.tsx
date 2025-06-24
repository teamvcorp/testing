import { auth } from "@/auth";
import { Kid } from "../../types/next-auth";

type SearchParams = Promise<{ kid?: string }>;

export default async function KidProfilePage({ searchParams }: { searchParams: SearchParams }) {
  const session = await auth();
  if (!session || !session.user?.email) {
    return <div>Unauthorized</div>;
  }

  const resolvedSearchParams = await searchParams; // Await searchParams
  const kidId = resolvedSearchParams.kid;
  if (!kidId) {
    return <div>Missing kid ID</div>;
  }

  const kid = session.user.kids?.find((k: Kid) => k.id === kidId);
  if (!kid) {
    return <div>Kid not found</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem" }}>
      <h1>Kid Profile</h1>
      <div className="text-center">
        <div
          className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-4xl mb-2"
        >
          {kid.name?.[0] || "K"}
        </div>
        <h2>{kid.name || "Kid"}</h2>
        <p>ID: {kid.id}</p>
        {/* Add more kid details here as needed */}
      </div>
    </div>
  );
}