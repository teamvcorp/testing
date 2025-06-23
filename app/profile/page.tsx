'use client';

import { useSession } from "next-auth/react";
import { useState } from "react";
import { updateUser } from "@/app/lib/services/userService";
import { Kid } from "../lib/definitions";
export default function ProfilePage() {
    const { data: session } = useSession();
    const [kids, setKids] = useState([{ name: "", age: "" }]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleKidChange = (index: number, field: keyof Kid, value: string) => {
        const updatedKids = [...kids];
        updatedKids[index][field] = value;
        setKids(updatedKids);
    };

    const addKid = () => {
        setKids([...kids, { name: "", age: "" }]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!session?.user?.id) return;

        setLoading(true);
        setMessage("");
        try {
            const updates = {
                role: "parent",
                kids: kids.filter(k => k.name && k.age), // remove empty entries
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
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Your Profile</h1>


            {session?.user ? (
                <div className="mb-6">
                    <p><strong>Name:</strong> {session.user.name}</p>
                    <p><strong>Email:</strong> {session.user.email}</p>
                    <p><strong>ID:</strong> {session.user.id}</p>

                    {Array.isArray(session.user.kids) && session.user.kids.length > 0 && (
                        <div className="mt-4">
                            <p className="font-semibold">Kids on record:</p>
                            <ul className="list-disc list-inside">
                                {session.user.kids.map((kid: Kid, index: number) => (
                                    <li key={index}>{kid.name} (Age {kid.age})</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading user info...</p>
            )}


            <form onSubmit={handleSubmit} className="space-y-4">


                <div>
                    <label className="block font-medium">Role</label>
                    <p className="p-2 bg-gray-100 text-gray-600 rounded">Parent</p>
                    <input type="hidden" name="role" value="parent" />
                </div>



                <div>
                    <label className="block font-medium mb-2">Kids</label>
                    {kids.map((kid, index) => (
                        <div key={index} className="flex space-x-2 mb-2">
                            <input
                                type="text"
                                placeholder="Name"
                                value={kid.name}
                                onChange={(e) => handleKidChange(index, "name", e.target.value)}
                                className="border p-2 flex-1"
                            />
                            <input
                                type="number"
                                placeholder="Age"
                                value={kid.age}
                                onChange={(e) => handleKidChange(index, "age", e.target.value)}
                                className="border p-2 w-20"
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addKid} className="text-blue-600 underline">
                        + Add another child
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {loading ? "Updating..." : "Update Profile"}
                </button>

                {message && <p className="mt-2 text-sm">{message}</p>}
            </form>
        </div>
    );
}
