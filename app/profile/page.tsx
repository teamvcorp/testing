'use client';

import { useSession } from "next-auth/react";
import { useState } from "react";
import { updateUser } from "@/app/lib/services/userService";
import { Kid } from "../types/next-auth";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [kids, setKids] = useState<Kid[]>([{ id: crypto.randomUUID(), name: "", age: "",totalPoints: 0, naughtyNicePoints: 50, niceScore: 100}]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleKidChange = (index: number, field: keyof Kid, value: string) => {
    setKids((prev) => [
      ...prev.slice(0, index),
      { ...prev[index], [field]: value },
      ...prev.slice(index + 1),
    ]);
 
  };

  const addKid = () => {
    setKids([...kids, { id: crypto.randomUUID(), name: "", age: "", naughtyNicePoints: 50, niceScore:100 }]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session?.user?.id) {
      setMessage("User ID not found.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const updates = {
        role: "parent",
        kids: kids.filter((k) => k.id && k.name && k.age), // Include only kids with id, name, and age
      };

      await updateUser(session.user.id, updates);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage("Failed to update profile.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-xl shadow-lg border border-blue-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-900 drop-shadow winter-glow">Your Profile</h1>

      {session?.user ? (
      <div className="mb-8 bg-white/80 rounded-lg p-4 shadow-inner border border-blue-100">
        <p className="mb-1"><strong className="text-blue-700">Name:</strong> {session.user.name}</p>
        <p className="mb-1"><strong className="text-blue-700">Email:</strong> {session.user.email}</p>
        <p className="mb-1"><strong className="text-blue-700">ID:</strong> {session.user.id}</p>

        {Array.isArray(session.user.kids) && session.user.kids.length > 0 && (
        <div className="mt-4">
          <p className="font-semibold text-blue-800">Kids on record:</p>
          <ul className="list-disc list-inside pl-4">
          {session.user.kids.map((kid: Kid, index: number) => (
            <li key={kid.id || index} className="text-blue-900">
            <span className="font-semibold">{kid.name}</span>
            <span className="ml-2 text-blue-600">(Age {kid.age}, ID: {kid.id}, Magic Points: <span className="font-bold text-blue-800">{kid.totalPoints}</span>)</span>
            </li>
          ))}
          </ul>
        </div>
        )}
      </div>
      ) : (
      <p className="text-blue-700">Loading user info...</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 rounded-lg p-6 shadow-inner border border-blue-100">
      <div>
        <label className="block font-medium text-blue-800">Role</label>
        <p className="p-2 bg-blue-50 text-blue-700 rounded shadow-inner">Parent</p>
        <input type="hidden" name="role" value="parent" />
      </div>

      <div>
        <label className="block font-medium mb-2 text-blue-800">Kids</label>
        {kids.map((kid, index) => (
        <div key={kid.id} className="flex space-x-2 mb-2 items-center">
          <input
          type="text"
          placeholder="Name"
          value={kid.name}
          onChange={(e) => handleKidChange(index, "name", e.target.value)}
          className="border border-blue-200 bg-blue-50 focus:ring-2 focus:ring-blue-200 p-2 flex-1 rounded placeholder:text-blue-300"
          />
          <input
          type="number"
          placeholder="Age"
          value={kid.age}
          onChange={(e) => handleKidChange(index, "age", e.target.value)}
          className="border border-blue-200 bg-blue-50 focus:ring-2 focus:ring-blue-200 p-2 w-20 rounded placeholder:text-blue-300"
          />
          <input type="hidden" value={kid.id} />
          <input type="hidden" value={kid.totalPoints} />
          <input type="hidden" value={kid.naughtyNicePoints} />
          <input type="hidden" value={kid.niceScore} />
        </div>
        ))}
        <button
        type="button"
        onClick={addKid}
        className="text-blue-700 hover:text-blue-900 underline font-semibold transition-colors"
        >
        + Add another child
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-2 rounded shadow hover:from-blue-500 hover:to-blue-700 transition-all font-semibold"
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>

      {message && (
        <p className={`mt-2 text-sm ${message.includes("success") ? "text-green-700" : "text-red-700"}`}>
        {message}
        </p>
      )}
      </form>
      <style jsx>{`
      .winter-glow {
        text-shadow: 0 2px 8px #e0f2fe, 0 0px 2px #bae6fd;
      }
      `}</style>
    </div>
  );
}