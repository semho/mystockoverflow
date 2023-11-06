"use client"
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
import useDialogButtonStore from "@/store/dialog"
type Props = {
  value: string
  title: string
  valueSubmit?: string
  description?: string
  children: React.ReactNode
}

export function DialogBox({
  value,
  title,
  valueSubmit = "Сохранить изменения",
  description,
  children,
}: Props) {
  const setSubmitButtonClicked = useDialogButtonStore(
    (state) => state.setSubmitButtonClicked,
  )

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
        <div className="grid gap-4 py-2">{children}</div>
        <DialogFooter>
          <Button type="submit" onClick={() => setSubmitButtonClicked(true)}>
            {valueSubmit}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
