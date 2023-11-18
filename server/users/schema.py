import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
from graphql import GraphQLError
import graphql_jwt


User = get_user_model()


class UserType(DjangoObjectType):
    class Meta:
        model = User


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, username, email, password):
        existing_user = User.objects.filter(email=email).first()
        if existing_user:
            raise ValueError("Пользователь с таким email уже зарегистрирован")
        user = User(username=username, email=email)
        user.set_password(password)
        user.save()
        return CreateUser(user=user)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()


class Query(graphene.ObjectType):
    user = graphene.Field(UserType)
    users = graphene.List(UserType)

    def resolve_users(self, info):
        return User.objects.all()

    def resolve_user(self, info):
        user = info.context.user
        if user.is_anonymous:
            return GraphQLError("Not authenticated")
        return user


class ObtainJSONWebToken(graphql_jwt.JSONWebTokenMutation):
    user = graphene.Field(UserType)

    @classmethod
    def resolve(cls, root, info, **kwargs):
        return cls(user=info.context.user)
