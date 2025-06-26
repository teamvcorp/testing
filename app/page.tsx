import { auth, signOut } from "@/auth";

export default async function HomePage() {
  const session = await auth();
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
      {session ? (
        <>
        <p className="text-xl font-semibold mb-6">
          Welcome, <span className="text-blue-600 dark:text-blue-400">{session.user?.name}!</span>
        </p>
        <form
          action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
          }}
        >
          <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition-colors"
          >
          Sign Out
          </button>
        </form>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-lg mb-4">Not signed in.</p>
          <a
            href="/login"
            className="flex items-center justify-center w-full py-2 px-4 rounded shadow transition-colors font-medium text-white"
            style={{
              maxWidth: 240,
              background: "linear-gradient(90deg, #4285F4 0%, #34A853 25%, #FBBC05 50%, #EA4335 100%)",
              border: "none",
            }}
          >
            Sign in
          </a>
        </div>
      )}
      </div>
    </div>
  );
}