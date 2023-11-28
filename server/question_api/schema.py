from math import ceil
import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from .models import Question, Answer
from graphene import relay
from django.db.models import Q

# class QuestionType(DjangoObjectType):
#     class Meta:
#         model = Question
#         interfaces = (relay.Node,)  # make sure you add this
#         fields = "__all__"


# class QuestionConnection(relay.Connection):
#     class Meta:
#         node = QuestionType


# class AnswerType(DjangoObjectType):
#     class Meta:
#         model = Answer


# class Query(graphene.ObjectType):
#     questions = relay.ConnectionField(QuestionConnection)


class PaginationType(graphene.ObjectType):
    total_count = graphene.Int()
    page_count = graphene.Int()
    current_page = graphene.Int()
    has_prev_page = graphene.Boolean()
    has_next_page = graphene.Boolean()
    first_page = graphene.String()
    last_page = graphene.String()


class AnswerType(DjangoObjectType):
    class Meta:
        model = Answer


class QuestionType(DjangoObjectType):
    class Meta:
        model = Question
        fields = "__all__"


class Query(graphene.ObjectType):
    questions = graphene.Field(
        graphene.List(QuestionType),
        first=graphene.Int(),
        skip=graphene.Int(),
        search=graphene.String(),
    )

    pagination = graphene.Field(PaginationType)

    def resolve_questions(self, info, first=None, skip=None, search=None, **kwargs):
        qs = Question.objects.all().order_by("-timestamp")

        if search:
            filter = Q(title__icontains=search) | Q(description__icontains=search)
            qs = qs.filter(filter)

        info.context.total_count = qs.count()

        if skip:
            qs = qs[skip:]
            info.context.skip = skip

        if first:
            qs = qs[:first]
            info.context.first = first

        return qs

    def resolve_pagination(self, info, **kwargs):
        first = info.context.first if hasattr(info.context, "first") else 0
        skip = info.context.skip if hasattr(info.context, "skip") else 0

        total_count = (
            info.context.total_count if hasattr(info.context, "total_count") else 1
        )
        page_size = first if first else total_count
        total_pages = ceil(total_count / page_size)

        current_page = (skip // page_size) + 1 if skip else 1
        has_prev_page = current_page > 1
        has_next_page = current_page < total_pages

        first_page = f"?first={first}" if first else None
        last_page = (
            f"?first={first}&skip={(total_pages - 1) * page_size}" if first else None
        )

        return PaginationType(
            total_count=total_count,
            page_count=total_pages,
            current_page=current_page,
            has_prev_page=has_prev_page,
            has_next_page=has_next_page,
            first_page=first_page,
            last_page=last_page,
        )

    single_question = graphene.Field(QuestionType, id=graphene.Int(required=True))

    def resolve_single_question(self, info, id):
        try:
            return Question.objects.get(id=id)
        except Question.DoesNotExist:
            return None

    answers = graphene.List(AnswerType)
    single_answer = graphene.Field(AnswerType, id=graphene.Int(required=True))
    answers_by_question = graphene.List(AnswerType, id=graphene.Int(required=True))

    def resolve_answers(self, info, **kwargs):
        return Answer.objects.all().order_by("-timestamp")

    def resolve_single_answer(self, info, id):
        try:
            return Answer.objects.get(id=id)
        except Answer.DoesNotExist:
            return None

    def resolve_answers_by_question(self, info, id):
        return Answer.objects.filter(question=id).all()


class CreateQuestion(graphene.Mutation):
    question = graphene.Field(QuestionType)

    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String()

    def mutate(self, info, title, description):
        user = info.context.user
        if user.is_anonymous:
            return GraphQLError("You must Log in to create a new question")
        question = Question(title=title, description=description, created_by=user)
        question.save()

        return CreateQuestion(question=question)


class CreateAnswer(graphene.Mutation):
    answer = graphene.Field(AnswerType)

    class Arguments:
        answer = graphene.String(required=True)
        question_id = graphene.ID(required=True)

    def mutate(self, info, answer, question_id):
        try:
            question = Question.objects.get(pk=question_id)
        except Question.DoesNotExist:
            raise GraphQLError("Record not found")
        user = info.context.user
        if user.is_anonymous:
            return GraphQLError("You must Log in to create a new answer")
        answer = Answer(question=question, posted_by=user, answer=answer)
        answer.save()

        return CreateAnswer(answer=answer)


class UpdateQuestion(graphene.Mutation):
    question = graphene.Field(QuestionType)

    class Arguments:
        question_id = graphene.ID(required=True)
        title = graphene.String()
        description = graphene.String()

    def mutate(self, info, question_id, title=None, description=None):
        try:
            question = Question.objects.get(pk=question_id)
        except Question.DoesNotExist:
            raise GraphQLError("Record not found")

        user = info.context.user
        if user.is_anonymous:
            return GraphQLError("You must Log in to update a question")
        if question.created_by != user:
            return GraphQLError("You do not have permission to update this question")

        if title is not None:
            question.title = title
        if description is not None:
            question.description = description
        question.save()

        return UpdateQuestion(question=question)


class UpdateAnswer(graphene.Mutation):
    answer = graphene.Field(AnswerType)

    class Arguments:
        answer_id = graphene.ID(required=True)
        text = graphene.String()

    def mutate(self, info, answer_id, text=None):
        try:
            answer = Answer.objects.get(pk=answer_id)
        except Answer.DoesNotExist:
            raise GraphQLError("Record not found")

        user = info.context.user
        if user.is_anonymous:
            return GraphQLError("You must Log in to update a answer")
        if answer.posted_by != user:
            return GraphQLError("You do not have permission to update this answer")

        if answer.answer is not None:
            answer.answer = text
        answer.save()

        return UpdateAnswer(answer=answer)


class DeleteQuestion(graphene.Mutation):
    question = graphene.Field(QuestionType)

    class Arguments:
        question_id = graphene.ID(required=True)

    def mutate(self, info, question_id):
        try:
            question = Question.objects.get(pk=question_id)
        except Question.DoesNotExist:
            raise GraphQLError("Record not found")

        user = info.context.user
        if user.is_anonymous:
            return GraphQLError("You must Log in to delete a question")
        if question.created_by != user:
            return GraphQLError("You do not have permission to delete this question")

        question.delete()

        return DeleteQuestion(question=None)


class DeleteAnswer(graphene.Mutation):
    answer = graphene.Field(AnswerType)

    class Arguments:
        answer_id = graphene.ID(required=True)

    def mutate(self, info, answer_id):
        try:
            answer = Answer.objects.get(pk=answer_id)
        except Answer.DoesNotExist:
            raise GraphQLError("Record not found")

        user = info.context.user
        if user.is_anonymous:
            return GraphQLError("You must Log in to delete a answer")
        if answer.posted_by != user:
            return GraphQLError("You do not have permission to delete this answer")

        answer.delete()

        return DeleteAnswer(answer=None)


class Mutation(graphene.ObjectType):
    create_question = CreateQuestion.Field()
    update_question = UpdateQuestion.Field()
    delete_question = DeleteQuestion.Field()
    create_answer = CreateAnswer.Field()
    update_answer = UpdateAnswer.Field()
    delete_answer = DeleteAnswer.Field()
