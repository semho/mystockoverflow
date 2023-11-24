import { GetQuestionsQuery } from "@/generates/gql/graphql"
import { create } from "zustand"

interface Store {
  list: GetQuestionsQuery["questions"]
  setList: (questions: GetQuestionsQuery["questions"]) => void
}

export const useQuestionsStore = create<Store>((set) => ({
  list: [],
  setList: (questions) => set({ list: questions }),
}))
