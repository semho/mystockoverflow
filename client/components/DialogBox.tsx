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
  buttonVarian?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined
  children: React.ReactNode
  dialogId: string
}

export function DialogBox({
  value,
  title,
  valueSubmit = "Сохранить изменения",
  description,
  buttonVarian = "outline",
  children,
  dialogId,
}: Props) {
  const [isSubmitButtonClicked, setSubmitButtonClicked] = useDialogButtonStore(
    (state) => [
      state.isSubmitButtonClicked[dialogId],
      state.setSubmitButtonClicked,
    ],
  )

  const [dialogs, setDialogOpen] = useDialogButtonStore((state) => [
    state.dialogs,
    state.setDialogOpen,
  ])

  const dialog = dialogs[dialogId]
  if (!dialog) {
    return null
  }

  return (
    <Dialog
      open={dialogs[dialogId].isOpen}
      onOpenChange={(value) => setDialogOpen(dialogId, value)}
    >
      <DialogTrigger asChild>
        <Button
          variant={buttonVarian}
          className="mr-2"
          onClick={() => setDialogOpen(dialogId, true)}
        >
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
          <Button
            type="submit"
            onClick={() => setSubmitButtonClicked(dialogId, true)}
          >
            {valueSubmit}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
