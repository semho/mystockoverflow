import { create } from "zustand"

interface useUserInterfaceStore {
  token: string
  user: UserPayload | null
}

interface UserPayload {
  username: string
  exp: number
  origIat: number
}

const useUserStore = create<useUserInterfaceStore>((set) => ({
  token: "",
  user: null,
}))

export default useUserStore
