"use client"
import SignIn from "../_components/sign-in"
import SignUp from "../_components/sign-up"

import { useState } from "react";


export default function LoginPage() {
  const [singup, setSingUp] = useState(false);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm " >
            {singup?
            <>
              <SignUp/>
              <div className="text-center text-sm">
                Do&apos; you already have an account?{" "}
                <a href="#" onClick={()=>{setSingUp(false)}} className="underline underline-offset-4">
                  Sign In
                </a>
              </div>
            </>
            :
              <>
              <SignIn/>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" onClick={()=>{setSingUp(true)}} className="underline underline-offset-4">
                  Sign Up
                </a>
              </div>
            </>
            }

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
