import { auth, signOut } from "@/auth";

export default async function HomePage() {
  const session = await auth();
  return (
    <div>
      {session ? (
        <>
          <p>Welcome, {session.user?.name}!</p>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button type="submit">Sign Out</button>
          </form>
        </>
      ) : (
        <p>
          Not signed in. <a href="/login">Sign in</a>
        </p>
      )}
    </div>
  );
}