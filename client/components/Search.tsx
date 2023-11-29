"use client"

import { GetQuestionsDocument } from "@/generates/gql/graphql"
import { DEFAULT_SKIP, DEFAULT_TAKE } from "@/lib/constants"
import createGraphQLClient from "@/lib/requestClient"
import { useQuestionsStore } from "@/store/questions"
import { useEffect, useState } from "react"

export function Search() {
  const [formData, setFormData] = useState({
    search: "",
  })

  const { setList, setPagination, setSearch, search } = useQuestionsStore()
  const fetchDataAndUpdate = async () => {
    const response = await createGraphQLClient().request(GetQuestionsDocument, {
      first: DEFAULT_TAKE,
      skip: DEFAULT_SKIP,
      search: search,
    })
    setList(response.questions)
    setPagination((prev) => ({
      ...prev,
      currentPage: response.pagination?.currentPage || 1,
      pageCount: response.pagination?.pageCount || 1,
    }))
  }

  useEffect(() => {
    fetchDataAndUpdate()
  }, [search])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSearch(formData.search)
    await fetchDataAndUpdate()
    setFormData({ search: "" })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  return (
    <form className="mb-5" onSubmit={handleSubmit}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
          placeholder="Поиск..."
          name="search"
          value={formData.search}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
        >
          Search
        </button>
      </div>
    </form>
  )
}
