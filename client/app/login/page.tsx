import TabsAuth from "@/components/auth/TabsAuth"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Авторизация",
  description: "Страница авторизации и регистрации",
}
export default async function Page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center h-[70%]">
        <div className="self-start">
          <TabsAuth />
        </div>
      </div>
    </div>
  )
}
