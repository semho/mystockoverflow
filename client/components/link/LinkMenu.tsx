"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"

type Props = {
  href: string
  label?: string
  isNew?: boolean
}

export default function LinkMenu({ href, label, isNew }: Props) {
  const pathname = usePathname()
  const isActive = pathname === href
  const session = useSession()
  return (
    session?.data && (
      <Link
        href={href}
        className={`text-sm text-slate-700 px-3 py-1 rounded-md
      hover:bg-slate-200 hover:text-slate-500
      transition duration-200 ease-in-out ${isActive ? "bg-slate-200" : ""}`}
      >
        <span className="relative">
          {label}
          {isNew && <NewItem />}
        </span>
      </Link>
    )
  )
}

const NewItem = () => (
  <span className="absolute bg-orange-400 w-2 h-2 rounded-full"></span>
)
