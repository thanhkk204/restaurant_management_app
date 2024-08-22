"use client"
import { signIn } from "next-auth/react"
import React from "react"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

export default function SocialCard() {
  return (
    <>
      <div className="w-full flex items-center gap-5">
        <div
          className="flex-1"
          onClick={() => signIn("google", { redirectTo: "/" })}
        >
          <button
            className="w-full flex items-center justify-center px-4 py-3 rounded-md bg-light-bg dark:bg-dark-bg
            shadow-shadown_hover hover:shadow-cyan-500/50 hover:scale-90 transition-all ease-linear"
          >
            <FcGoogle className="text-[25px]  dark:text-white" />
          </button>
        </div>

        <div
          className="flex-1"
          onClick={() => signIn("github", { redirectTo: "/" })}
        >
          <button
            className="w-full flex items-center justify-center px-4 py-3 rounded-md bg-light-bg dark:bg-dark-bg
            shadow-shadown_hover hover:shadow-cyan-500/50 hover:scale-90 transition-all ease-linear"
          >
            <FaGithub className="text-[25px]  dark:text-white" />
          </button>
        </div>
      </div>
    </>
  )
}
