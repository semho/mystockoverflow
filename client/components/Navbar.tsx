import Link from "next/link"
import LinkMenu from "./link/LinkMenu"
import SignButton from "./SignButton"

export function Navbar() {
  return (
    // <header className="h-15 w-full  shadow-sm dark:border-gray-700">
    //   <div className="container  px-4 sm:px-6 py-4 flex justify-between items-center">
    //     {/* Logo */}
    //     <h2 className="font-bold text-3xl  text-gray-900 dark:text-white">
    //       <Link href="https://nextjsdev.com">Next.js Dev</Link>
    //     </h2>

    //     {/* Theme Switcher  */}
    //   </div>
    // </header>

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
          <LinkMenu href="/active" label="Моя активность" />
        </div>
      </div>

      <div className="flex gap-2">
        <SignButton />
      </div>
    </div>
  )
}
