export async function updateUser(userId: string, updates: Record<string, unknown>) {
  const res = await fetch("/api/user/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, updates }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update user");
  return data;
}
