import { create } from "zustand"

interface useDialogButtonStore {
  isSubmitButtonClicked: boolean
  setSubmitButtonClicked: (value: boolean) => void
}

const useDialogButtonStore = create<useDialogButtonStore>((set) => ({
  isSubmitButtonClicked: false,
  setSubmitButtonClicked: (value: boolean) =>
    set({ isSubmitButtonClicked: value }),
}))

export default useDialogButtonStore
