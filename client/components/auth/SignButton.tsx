"use client"

import { UserIcon } from "@heroicons/react/24/outline"
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

type Props = {
  isAuth?: boolean
}

export default function SignButton({ isAuth = false }: Props) {
  const pathname = usePathname()
  const isActive = pathname === "/login"
  const session = useSession()

  const [isAuthState, setIsAuthState] = useState(isAuth)
  const [username, setUserName] = useState("")

  useEffect(() => {
    if (session.data) {
      setIsAuthState(true)
      setUserName(session.data.user.tokenAuth.payload.username)
    }
  }, [session])

  // return (
  //   <>
  //     {!isAuthState && (
  //       <Link
  //         href="/api/auth/signin"
  //         className={`p-2 flex rounded-md hover:bg-slate-200 text-slate-700 hover:text-slate-700 relative transition duration-200 ease-in-out items-center ${
  //           isActive ? "bg-slate-200" : ""
  //         }`}
  //       >
  //         <UserIcon className="w-4 h-4" strokeWidth={2} />
  //         <span>Авторизация</span>
  //       </Link>
  //     )}
  //     {isAuthState && (
  //       <Link
  //         href="#"
  //         className={`p-2 flex rounded-md hover:bg-slate-200 text-slate-700 hover:text-slate-700 relative transition duration-200 ease-in-out items-center ${
  //           isActive ? "bg-slate-200" : ""
  //         }`}
  //         onClick={() => signOut({ callbackUrl: "/" })}
  //       >
  //         <span className="mr-2">{username}</span>
  //         <ArrowRightOnRectangleIcon className="w-4 h-4" strokeWidth={2} />
  //         <span>Выход</span>
  //       </Link>
  //     )}
  //   </>
  // )

  return (
    <>
      {!isAuthState && (
        <Link
          href="/login"
          className={`p-2 flex rounded-md hover:bg-slate-200 text-slate-700 hover:text-slate-700 relative transition duration-200 ease-in-out items-center ${
            isActive ? "bg-slate-200" : ""
          }`}
        >
          <UserIcon className="w-4 h-4" strokeWidth={2} />
          <span>Авторизация</span>
        </Link>
      )}
      {isAuthState && (
        <Link
          href="#"
          className={`p-2 flex rounded-md hover:bg-slate-200 text-slate-700 hover:text-slate-700 relative transition duration-200 ease-in-out items-center ${
            isActive ? "bg-slate-200" : ""
          }`}
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <span className="mr-2">{username}</span>
          <ArrowRightOnRectangleIcon className="w-4 h-4" strokeWidth={2} />
          <span>Выход</span>
        </Link>
      )}
    </>
  )
}
