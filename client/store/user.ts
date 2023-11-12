import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface useUserInterfaceStore {
  token: string
  user: UserPayload | null
  setToken: (token: string) => void
  setUser: (user: UserPayload | null) => void
}

interface UserPayload {
  username: string
  exp: number
  origIat: number
}

const useUserStore = create<useUserInterfaceStore>((set) => ({
  token: "",
  user: null,
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
}))

export const persistedUseUserStore = persist(useUserStore, {
  name: "user-storage",
  storage: createJSONStorage(() => sessionStorage),
})

export default useUserStore
