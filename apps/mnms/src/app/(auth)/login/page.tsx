import SignIn from "../_components/sign-in"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";

export default async function LoginPage() {

    const [session,user] = await Promise.all([
        auth.api.getSession({
            headers: await headers(),
        }),
        db.query.user.findFirst()
    ])

    if (session){
        throw redirect("/")
    }
    
    if (!user){
        throw redirect("/onboarding")
    }
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm " >
              <SignIn/>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.webp"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
