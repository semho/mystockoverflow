import graphene
from graphene_django import DjangoObjectType
from .models import Question, Answer


class QuestionType(DjangoObjectType):
    class Meta:
        model = Question
        fields = ("id", "title", "description", "timestamp", "created_by")


class AnswerType(DjangoObjectType):
    class Meta:
        model = Answer


class Query(graphene.ObjectType):
    questions = graphene.List(QuestionType)
    single_question = graphene.Field(QuestionType, id=graphene.Int(required=True))

    def resolve_questions(self, info, **kwargs):
        return Question.objects.all()

    def resolve_single_question(self, info, id):
        try:
            return Question.objects.get(id=id)
        except Question.DoesNotExist:
            return None

    answers = graphene.List(AnswerType)
    single_answer = graphene.Field(AnswerType, id=graphene.Int(required=True))

    def resolve_answers(self, info, **kwargs):
        return Answer.objects.all()

    def resolve_single_answer(self, info, id):
        try:
            return Answer.objects.get(id=id)
        except Answer.DoesNotExist:
            return None


class CreateQuestion(graphene.Mutation):
    question = graphene.Field(QuestionType)

    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String()

    def mutate(self, info, title, description):
        user = info.context.user
        if user.is_anonymous:
            return Exception("You must Log in to create a new question")
        question = Question(title=title, description=description, created_by=user)
        question.save()

        return CreateQuestion(question=question)


class CreateAnswer(graphene.Mutation):
    answer = graphene.Field(AnswerType)

    class Arguments:
        answer = graphene.String(required=True)

    def mutate(self, info, answer):
        user = info.context.user
        question = info.context.question
        if user.is_anonymous:
            return Exception("You must Log in to create a new answer")
        answer = Answer(question=question, posted_by=user, answer=answer)
        answer.save()

        return CreateAnswer(answer=answer)


class Mutation(graphene.ObjectType):
    create_question = CreateQuestion.Field()
    create_answer = CreateAnswer.Field()
