import { create } from "zustand"

interface useDialogButtonStore {
  isSubmitButtonClicked: Record<string, boolean>
  setSubmitButtonClicked: (id: string, value: boolean) => void
  dialogs: Record<string, { isOpen: boolean }>
  setDialogOpen: (id: string, value: boolean) => void
}

const useDialogButtonStore = create<useDialogButtonStore>((set) => {
  const initialState: useDialogButtonStore = {
    isSubmitButtonClicked: {},
    setSubmitButtonClicked: (id, value) =>
      set((state) => ({
        isSubmitButtonClicked: { ...state.isSubmitButtonClicked, [id]: value },
      })),
    dialogs: {},
    setDialogOpen: (id, value) => {
      set((state) => {
        const dialogs = { ...state.dialogs }
        dialogs[id] = { isOpen: value }
        return { dialogs }
      })
    },
  }

  set(initialState)

  return initialState
})

export default useDialogButtonStore
