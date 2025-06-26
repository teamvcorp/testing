
     // app/login/page.tsx
     "use client";
     import { signIn } from "next-auth/react";
     import { useState } from "react";

     export default function LoginPage() {
       const [loading, setLoading] = useState(false);

       const multiPass =({provider}: {provider: string}) => {
         setLoading(true);
        switch (provider) {
          case "google":
            signIn("google", { callbackUrl: "/profiles" })
              .catch((error) => console.error("Google sign-in failed:", error))
              .finally(() => setLoading(false));
            break;
          case "facebook":
            signIn("facebook", { callbackUrl: "/profiles" })
              .catch((error) => console.error("Facebook sign-in failed:", error))
              .finally(() => setLoading(false));
            break;
          case "oauth":
            signIn("oauth", { callbackUrl: "/profiles" })
              .catch((error) => console.error("OAuth sign-in failed:", error))
              .finally(() => setLoading(false));
            break;
          default:
            console.error("Unknown provider:", provider);
            setLoading(false);
        }
       };


       return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-b from-blue-100 via-cyan-100 to-indigo-100 rounded-xl shadow-lg p-8 gap-6">
        <h1 className="text-2xl font-bold text-indigo-700 mb-4">Sign in to your account</h1>
        <button
          onClick={() => multiPass({ provider: "google" })}
          disabled={loading}
          className="w-64 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white border border-blue-200 shadow transition hover:bg-blue-50 hover:border-blue-400 disabled:opacity-60 text-blue-700 font-semibold"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 32.9 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.3-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 6.5 29.6 4 24 4c-7.2 0-13.3 4.1-16.7 10.7z"/><path fill="#FBBC05" d="M24 44c5.6 0 10.5-1.9 14.3-5.1l-6.6-5.4C29.9 35.9 27.1 37 24 37c-6.1 0-10.7-4.1-12.5-9.6l-7 5.4C6.7 39.9 14.1 44 24 44z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.1 5.5-7.7 5.5-4.6 0-8.4-3.8-8.4-8.5s3.8-8.5 8.4-8.5c2.5 0 4.7.9 6.3 2.4l6.4-6.4C38.5 8.1 31.7 4 24 4c-8.8 0-16.3 7.2-16.3 16.3S15.2 36.5 24 36.5c7.7 0 14.5-4.1 17.7-10.5.2-.4.3-.8.3-1.3 0-.5-.1-.9-.3-1.3z"/></g></svg>
          {loading ? "Signing in with Google..." : "Sign in with Google"}
        </button>
        <button
          onClick={() => multiPass({ provider: "facebook" })}
          disabled={loading}
          className="w-64 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white border border-cyan-200 shadow transition hover:bg-cyan-50 hover:border-cyan-400 disabled:opacity-60 text-cyan-700 font-semibold"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#1877F3" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 10.995 10.125 11.854v-8.385H7.078v-3.47h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.953.926-1.953 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.068 24 18.092 24 12.073z"/></svg>
          {loading ? "Signing in with Facebook..." : "Sign in with Facebook"}
        </button>
        <button
          onClick={() => multiPass({ provider: "oauth" })}
          disabled={loading}
          className="w-64 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white border border-indigo-200 shadow transition hover:bg-indigo-50 hover:border-indigo-400 disabled:opacity-60 text-indigo-700 font-semibold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeOpacity=".3"/><path d="M8 12h8M12 8v8" /></svg>
          {loading ? "Signing in with OAuth..." : "Sign in with OAuth"}
        </button>
      </div>
       );
     }