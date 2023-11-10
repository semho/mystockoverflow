"use client"

import { TabsTrigger } from "@radix-ui/react-tabs"
import { Tabs, TabsContent, TabsList } from "../ui/tabs"
import Auth from "./Auth"
import Reg from "./Reg"

export default function TabsAuth() {
  return (
    <Tabs defaultValue="auth" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="auth">Авторизация</TabsTrigger>
        <TabsTrigger value="reg">Регистрация</TabsTrigger>
      </TabsList>
      <TabsContent value="auth">
        <Auth />
      </TabsContent>
      <TabsContent value="reg">
        <Reg />
      </TabsContent>
    </Tabs>
  )
}
