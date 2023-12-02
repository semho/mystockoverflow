"use client"

import { TabsTrigger } from "@radix-ui/react-tabs"
import { Tabs, TabsContent, TabsList } from "../ui/tabs"
import QuestionsMyList from "./QuestionsMyList"

export default function QuestionTabs() {
  return (
    <Tabs defaultValue="questions">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="questions" className="border-r-4">
          Мои вопросы
        </TabsTrigger>
        <TabsTrigger value="answers">Мои ответы</TabsTrigger>
      </TabsList>
      <TabsContent value="questions">
        <QuestionsMyList />
      </TabsContent>
      <TabsContent value="answers">
        <QuestionsMyList isQuestions={false} />
      </TabsContent>
    </Tabs>
  )
}
