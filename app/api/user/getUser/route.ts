// pages/api/user/getUser.js (or app/api/user/getUser/route.js)
import client from "@/app/lib/db/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
  }

  try {
        const db = (client).db();
    const user = db.collection("users");

    const results = await user.findOne({
      where: { id: userId },
      select: { id: true, name: true, email: true, kids: true },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch user" }), { status: 500 });
  }
}