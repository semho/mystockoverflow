/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CreateQuestion($title: String!, $description: String) {\n  createQuestion(title: $title, description: $description) {\n    question {\n      id\n      title\n    }\n  }\n}": types.CreateQuestionDocument,
    "mutation CreateUser($password: String!, $username: String!, $email: String!) {\n  createUser(password: $password, username: $username, email: $email) {\n    user {\n      id\n    }\n  }\n}": types.CreateUserDocument,
    "mutation tokenAuth($password: String!, $login: String!) {\n  tokenAuth(password: $password, username: $login) {\n    payload\n    token\n    refreshExpiresIn\n  }\n}": types.TokenAuthDocument,
    "mutation UpdateQuestion($questionId: ID!, $title: String, $description: String) {\n  updateQuestion(\n    questionId: $questionId\n    title: $title\n    description: $description\n  ) {\n    question {\n      id\n    }\n  }\n}": types.UpdateQuestionDocument,
    "query GetQuestion($id: Int!) {\n  singleQuestion(id: $id) {\n    title\n    description\n    timestamp\n    createdBy {\n      username\n    }\n  }\n}": types.GetQuestionDocument,
    "query GetQuestions {\n  questions {\n    id\n    title\n    description\n    timestamp\n    createdBy {\n      id\n      username\n      email\n      firstName\n      lastName\n      isActive\n      isStaff\n      lastLogin\n    }\n  }\n}": types.GetQuestionsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateQuestion($title: String!, $description: String) {\n  createQuestion(title: $title, description: $description) {\n    question {\n      id\n      title\n    }\n  }\n}"): (typeof documents)["mutation CreateQuestion($title: String!, $description: String) {\n  createQuestion(title: $title, description: $description) {\n    question {\n      id\n      title\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateUser($password: String!, $username: String!, $email: String!) {\n  createUser(password: $password, username: $username, email: $email) {\n    user {\n      id\n    }\n  }\n}"): (typeof documents)["mutation CreateUser($password: String!, $username: String!, $email: String!) {\n  createUser(password: $password, username: $username, email: $email) {\n    user {\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation tokenAuth($password: String!, $login: String!) {\n  tokenAuth(password: $password, username: $login) {\n    payload\n    token\n    refreshExpiresIn\n  }\n}"): (typeof documents)["mutation tokenAuth($password: String!, $login: String!) {\n  tokenAuth(password: $password, username: $login) {\n    payload\n    token\n    refreshExpiresIn\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateQuestion($questionId: ID!, $title: String, $description: String) {\n  updateQuestion(\n    questionId: $questionId\n    title: $title\n    description: $description\n  ) {\n    question {\n      id\n    }\n  }\n}"): (typeof documents)["mutation UpdateQuestion($questionId: ID!, $title: String, $description: String) {\n  updateQuestion(\n    questionId: $questionId\n    title: $title\n    description: $description\n  ) {\n    question {\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetQuestion($id: Int!) {\n  singleQuestion(id: $id) {\n    title\n    description\n    timestamp\n    createdBy {\n      username\n    }\n  }\n}"): (typeof documents)["query GetQuestion($id: Int!) {\n  singleQuestion(id: $id) {\n    title\n    description\n    timestamp\n    createdBy {\n      username\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetQuestions {\n  questions {\n    id\n    title\n    description\n    timestamp\n    createdBy {\n      id\n      username\n      email\n      firstName\n      lastName\n      isActive\n      isStaff\n      lastLogin\n    }\n  }\n}"): (typeof documents)["query GetQuestions {\n  questions {\n    id\n    title\n    description\n    timestamp\n    createdBy {\n      id\n      username\n      email\n      firstName\n      lastName\n      isActive\n      isStaff\n      lastLogin\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;