import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "./ui/textarea"

type Props = {
  value: string
  title: string
  valueSubmit?: string
  description?: string
}

export function DialogBox({
  value,
  title,
  valueSubmit = "Сохранить изменения",
  description,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mr-2">
          {value}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-right">
              Заголовок
            </Label>
            <Input
              id="name"
              defaultValue="Содержимое вопроса"
              className="col-span-3"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username" className="text-right">
              Описание
            </Label>
            <Textarea rows={10} value={"Содержимое описания"} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">{valueSubmit}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
