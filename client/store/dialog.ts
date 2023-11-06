import { create } from "zustand"

interface useDialogButtonStore {
  isSubmitButtonClicked: boolean
  setSubmitButtonClicked: (value: boolean) => void
  isDialogOpen: boolean
  setDialogOpen: (value: boolean) => void
}

const useDialogButtonStore = create<useDialogButtonStore>((set) => ({
  isSubmitButtonClicked: false,
  setSubmitButtonClicked: (value: boolean) =>
    set({ isSubmitButtonClicked: value }),

  isDialogOpen: false,
  setDialogOpen: (value: boolean) => set({ isDialogOpen: value }),
}))

export default useDialogButtonStore
