"use client"

import { TabsTrigger } from "@radix-ui/react-tabs"
import { Tabs, TabsContent, TabsList } from "./ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Label } from "@radix-ui/react-label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export default async function Auth() {
  return (
    <Tabs defaultValue="auth" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="auth">Авторизация</TabsTrigger>
        <TabsTrigger value="reg">Регистрация</TabsTrigger>
      </TabsList>
      <TabsContent value="auth">
        <Card>
          <CardHeader>
            <CardTitle>Авторизация</CardTitle>
            <CardDescription>
              Для входа введите Ваш логин-пароль
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="login-auth">Login</Label>
              <Input id="login-auth" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="pass-auth">Password</Label>
              <Input id="pass-auth" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="reg">
        <Card>
          <CardHeader>
            <CardTitle>Регистрация</CardTitle>
            <CardDescription>
              Для регистрации требуется придумать логин-пароль
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="login-reg">Login</Label>
              <Input id="login-reg" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="pass-reg">Password</Label>
              <Input id="pass-reg" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="pass-repeat-reg">Repeat password</Label>
              <Input id="pass-repeat-reg" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
