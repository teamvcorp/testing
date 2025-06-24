import { auth } from "@/auth"
 
export default async function Page() {
  const session = await auth()
  if (!session) return <div>Not authenticated</div>
 
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    <div className="flex flex-col items-center mt-8">
      <img
        src={session.user.image}
        alt="Main Account"
        className="w-20 h-20 rounded-full object-cover mb-6"
      />
      <div className="flex gap-6">
        {session.user.kids?.map((kid: any, idx: number) => (
          <div key={kid.id || idx} className="flex flex-col items-center">
            <div
              className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600 mb-2 overflow-hidden"
            >
              {kid.image ? (
                <img
                  src={kid.image}
                  alt={kid.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                kid.name?.[0] || "?"
              )}
            </div>
            <span>{kid.name}</span>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}