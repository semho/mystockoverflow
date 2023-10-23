import graphene
import question_api.schema
import users.schema
import graphql_jwt


class Query(users.schema.Query, question_api.schema.Query, graphene.ObjectType):
    pass


class Mutatuin(
    users.schema.Mutation, question_api.schema.Mutation, graphene.ObjectType
):
    # token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    token_auth = users.schema.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutatuin)
