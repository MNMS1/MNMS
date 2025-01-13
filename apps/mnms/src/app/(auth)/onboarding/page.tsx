import { SignUp } from "../_components/sign-up"
import { db } from "@/db";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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
    
    if (user){
        throw redirect("/login")
    }
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-xl flex-col gap-6">
          <SignUp/>
        </div>
      </div>
    )
  }