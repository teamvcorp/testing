// app/api/user/update/route.ts
import { auth } from "@/auth"; // adjust path if needed
import client from "@/app/lib/db/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId, updates } = await req.json();

  if (!userId || typeof updates !== "object") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const db = (await client).db();
    const users = db.collection("users");
    // If updates.kids exists and is an array, use $addToSet to add unique items to the kids array.
    const updateQuery: any = { $set: { ...updates } };

    if (Array.isArray(updates.kids)) {
      // Remove kids from $set to avoid replacing the array
      delete updateQuery.$set.kids;
      updateQuery.$addToSet = { kids: { $each: updates.kids } };
    }

    const result = await users.updateOne(
      { _id: new ObjectId(userId) },
      updateQuery
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "User not found or not updated" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
