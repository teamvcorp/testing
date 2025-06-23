
     // app/login/page.tsx
     "use client";
     import { signIn } from "next-auth/react";
     import { useState } from "react";

     export default function LoginPage() {
       const [loading, setLoading] = useState(false);

       const handleGoogleSignIn = async () => {
         setLoading(true);
         try {
           await signIn("google", { callbackUrl: "/profiles" });
         } catch (error) {
           console.error("Google sign-in failed:", error);
         } finally {
           setLoading(false);
         }
       };

       return (
         <div className="flex flex-col items-center justify-center min-h-screen">
           <h1 className="text-2xl mb-4">Sign In</h1>
           <button
             onClick={handleGoogleSignIn}
             disabled={loading}
             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
           >
             {loading ? "Signing in..." : "Sign in with Google"}
           </button>
         </div>
       );
     }