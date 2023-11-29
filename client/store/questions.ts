import { GetQuestionsQuery } from "@/generates/gql/graphql"
import { create } from "zustand"

interface Store {
  list: GetQuestionsQuery["questions"]
  pagination: {
    currentPage: number
    pageCount: number
    totalCount?: number
    hasNextPage?: boolean
    hasPrevPage?: boolean
  }
  search: string
  setList: (questions: GetQuestionsQuery["questions"]) => void
  setPagination: (
    update: (prev: Store["pagination"]) => Store["pagination"],
  ) => void
  setSearch: (search: string) => void
}

export const useQuestionsStore = create<Store>((set) => ({
  list: [],
  pagination: {
    currentPage: 1,
    pageCount: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
  search: "",
  setList: (questions) => set({ list: questions }),
  setPagination: (update) =>
    set((state) => ({ pagination: update(state.pagination) })),
  setSearch: (search) => set({ search }),
}))
