"use client"

import { UserIcon } from "@heroicons/react/24/outline"
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

type Props = {
  is_auth?: boolean
}

export default function SignButton({ is_auth = false }: Props) {
  return (
    <Link
      href="/login"
      className="p-2 flex rounded-md hover:bg-slate-200 text-slate-700 hover:text-slate-700 relative transition duration-200 ease-in-out items-center"
    >
      {!is_auth && (
        <>
          <UserIcon className="w-4 h-4" strokeWidth={2} />
          <span>Авторизация</span>
        </>
      )}
      {is_auth && (
        <>
          <ArrowRightOnRectangleIcon className="w-4 h-4" strokeWidth={2} />
          <span>Выход</span>
        </>
      )}
    </Link>
  )
}
