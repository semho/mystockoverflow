import Link from "next/link"
import LinkMenu from "./link/LinkMenu"
import SignButton from "./auth/SignButton"

export function Navbar() {
  return (
    <div className="mx-auto w-full flex justify-between items-center text-sm text-slate-300 py-4">
      <div className="wrapper-menu flex items-center">
        <Link href="/">
          <div className="uppercase font-bold">
            My<span className="text-teal-500">stockoverflow</span>
          </div>
        </Link>
        <div className="flex gap-2">
          <LinkMenu href="/ask-question" label="Задать вопрос" />
        </div>
        <div className="flex gap-2">
          <LinkMenu href="/my-activity" label="Моя активность" />
        </div>
      </div>

      <div className="flex gap-2">
        <SignButton />
      </div>
    </div>
  )
}
