import { Input } from "../ui/input"
import { CardBox } from "../CardBox"
import { Button } from "../ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"

const formSchema = z
  .object({
    login: z
      .string()
      .min(5, {
        message: "Логин должен содержать минимум 5 символов",
      })
      .max(20, {
        message: "Логин должен содержать максимум 20 символов",
      }),
    pass: z
      .string()
      .min(5, {
        message: "Пароль должен содержать минимум 5 символов",
      })
      .optional(),
    repeatPass: z
      .string()
      .min(5, {
        message: "Повтор пароля должен содержать минимум 5 символов",
      })
      .optional(),
  })
  .refine((data) => {
    const { pass, repeatPass } = data
    if (repeatPass && repeatPass.length >= 5 && pass !== repeatPass) {
      const error: any = new Error("Пароли не совпадают")
      error.errors = [
        {
          message: "Пароли не совпадают",
          path: ["repeatPass"],
          code: "custom",
        },
      ]
      throw error
    }
    return true
  })

async function onSubmit(values: z.infer<typeof formSchema>) {
  console.log("регистрация")
  console.log(
    `логин: ${values.login}, пароль: ${values.pass}, повтор пароля: ${values.repeatPass}`,
  )
  formSchema.parse({
    login: values.login,
    pass: values.pass,
    repeatPass: values.repeatPass,
  })
}

export default function Reg() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      pass: "",
      repeatPass: "",
    },
  })

  return (
    <CardBox
      title="Регистрация"
      description="Для регистрации требуется придумать логин-пароль"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Логин</FormLabel>
                <FormControl>
                  <Input placeholder="Pedro Duarte" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pass"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repeatPass"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Подтвердите пароль</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Войти</Button>
        </form>
      </Form>
    </CardBox>
  )
}
