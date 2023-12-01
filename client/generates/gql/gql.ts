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
    "mutation CreateAnswer($comment: String!, $questionId: ID!) {\n  createAnswer(answer: $comment, questionId: $questionId) {\n    answer {\n      id\n      answer\n      timestamp\n      postedBy {\n        username\n      }\n    }\n  }\n}": types.CreateAnswerDocument,
    "mutation CreateAnswerToAnswer($comment: String!, $questionId: ID!, $parentAnswerId: ID!, $respondingAnswerId: ID!) {\n  createAnswerToAnswer(\n    answer: $comment\n    parentAnswerId: $parentAnswerId\n    questionId: $questionId\n    respondingId: $respondingAnswerId\n  ) {\n    answer {\n      id\n      answer\n      timestamp\n      postedBy {\n        username\n      }\n    }\n  }\n}": types.CreateAnswerToAnswerDocument,
    "mutation CreateQuestion($title: String!, $description: String) {\n  createQuestion(title: $title, description: $description) {\n    question {\n      id\n      title\n    }\n  }\n}": types.CreateQuestionDocument,
    "mutation CreateUser($password: String!, $username: String!, $email: String!) {\n  createUser(password: $password, username: $username, email: $email) {\n    user {\n      id\n    }\n  }\n}": types.CreateUserDocument,
    "mutation DeleteAnswer($answerId: ID!) {\n  deleteAnswer(answerId: $answerId) {\n    answer {\n      id\n    }\n  }\n}": types.DeleteAnswerDocument,
    "mutation DeleteQuestion($questionId: ID!) {\n  deleteQuestion(questionId: $questionId) {\n    question {\n      id\n    }\n  }\n}": types.DeleteQuestionDocument,
    "mutation tokenAuth($password: String!, $login: String!) {\n  tokenAuth(password: $password, username: $login) {\n    payload\n    token\n    refreshExpiresIn\n  }\n}": types.TokenAuthDocument,
    "mutation UpdateAnswer($answerId: ID!, $text: String) {\n  updateAnswer(answerId: $answerId, text: $text) {\n    answer {\n      id\n    }\n  }\n}": types.UpdateAnswerDocument,
    "mutation UpdateQuestion($questionId: ID!, $title: String, $description: String) {\n  updateQuestion(\n    questionId: $questionId\n    title: $title\n    description: $description\n  ) {\n    question {\n      id\n    }\n  }\n}": types.UpdateQuestionDocument,
    "query GetAnswersByQuestion($id: Int!) {\n  answersByQuestion(id: $id) {\n    id\n    answer\n    timestamp\n    postedBy {\n      username\n    }\n    childReplies {\n      answer\n      id\n      timestamp\n      postedBy {\n        username\n      }\n      parentAnswer {\n        id\n        postedBy {\n          username\n        }\n      }\n      respondingTo {\n        postedBy {\n          username\n        }\n      }\n    }\n    question {\n      id\n    }\n  }\n}": types.GetAnswersByQuestionDocument,
    "query GetQuestion($id: Int!) {\n  singleQuestion(id: $id) {\n    title\n    description\n    timestamp\n    createdBy {\n      username\n    }\n  }\n}": types.GetQuestionDocument,
    "query GetQuestions($first: Int, $skip: Int, $search: String = \"\") {\n  questions(first: $first, skip: $skip, search: $search) {\n    id\n    title\n    description\n    timestamp\n    createdBy {\n      id\n      username\n      email\n      firstName\n      lastName\n      isActive\n      isStaff\n      lastLogin\n    }\n  }\n  pagination {\n    currentPage\n    totalCount\n    hasNextPage\n    hasPrevPage\n    firstPage\n    lastPage\n    pageCount\n  }\n}": types.GetQuestionsDocument,
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
export function graphql(source: "mutation CreateAnswer($comment: String!, $questionId: ID!) {\n  createAnswer(answer: $comment, questionId: $questionId) {\n    answer {\n      id\n      answer\n      timestamp\n      postedBy {\n        username\n      }\n    }\n  }\n}"): (typeof documents)["mutation CreateAnswer($comment: String!, $questionId: ID!) {\n  createAnswer(answer: $comment, questionId: $questionId) {\n    answer {\n      id\n      answer\n      timestamp\n      postedBy {\n        username\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateAnswerToAnswer($comment: String!, $questionId: ID!, $parentAnswerId: ID!, $respondingAnswerId: ID!) {\n  createAnswerToAnswer(\n    answer: $comment\n    parentAnswerId: $parentAnswerId\n    questionId: $questionId\n    respondingId: $respondingAnswerId\n  ) {\n    answer {\n      id\n      answer\n      timestamp\n      postedBy {\n        username\n      }\n    }\n  }\n}"): (typeof documents)["mutation CreateAnswerToAnswer($comment: String!, $questionId: ID!, $parentAnswerId: ID!, $respondingAnswerId: ID!) {\n  createAnswerToAnswer(\n    answer: $comment\n    parentAnswerId: $parentAnswerId\n    questionId: $questionId\n    respondingId: $respondingAnswerId\n  ) {\n    answer {\n      id\n      answer\n      timestamp\n      postedBy {\n        username\n      }\n    }\n  }\n}"];
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
export function graphql(source: "mutation DeleteAnswer($answerId: ID!) {\n  deleteAnswer(answerId: $answerId) {\n    answer {\n      id\n    }\n  }\n}"): (typeof documents)["mutation DeleteAnswer($answerId: ID!) {\n  deleteAnswer(answerId: $answerId) {\n    answer {\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteQuestion($questionId: ID!) {\n  deleteQuestion(questionId: $questionId) {\n    question {\n      id\n    }\n  }\n}"): (typeof documents)["mutation DeleteQuestion($questionId: ID!) {\n  deleteQuestion(questionId: $questionId) {\n    question {\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation tokenAuth($password: String!, $login: String!) {\n  tokenAuth(password: $password, username: $login) {\n    payload\n    token\n    refreshExpiresIn\n  }\n}"): (typeof documents)["mutation tokenAuth($password: String!, $login: String!) {\n  tokenAuth(password: $password, username: $login) {\n    payload\n    token\n    refreshExpiresIn\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateAnswer($answerId: ID!, $text: String) {\n  updateAnswer(answerId: $answerId, text: $text) {\n    answer {\n      id\n    }\n  }\n}"): (typeof documents)["mutation UpdateAnswer($answerId: ID!, $text: String) {\n  updateAnswer(answerId: $answerId, text: $text) {\n    answer {\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateQuestion($questionId: ID!, $title: String, $description: String) {\n  updateQuestion(\n    questionId: $questionId\n    title: $title\n    description: $description\n  ) {\n    question {\n      id\n    }\n  }\n}"): (typeof documents)["mutation UpdateQuestion($questionId: ID!, $title: String, $description: String) {\n  updateQuestion(\n    questionId: $questionId\n    title: $title\n    description: $description\n  ) {\n    question {\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAnswersByQuestion($id: Int!) {\n  answersByQuestion(id: $id) {\n    id\n    answer\n    timestamp\n    postedBy {\n      username\n    }\n    childReplies {\n      answer\n      id\n      timestamp\n      postedBy {\n        username\n      }\n      parentAnswer {\n        id\n        postedBy {\n          username\n        }\n      }\n      respondingTo {\n        postedBy {\n          username\n        }\n      }\n    }\n    question {\n      id\n    }\n  }\n}"): (typeof documents)["query GetAnswersByQuestion($id: Int!) {\n  answersByQuestion(id: $id) {\n    id\n    answer\n    timestamp\n    postedBy {\n      username\n    }\n    childReplies {\n      answer\n      id\n      timestamp\n      postedBy {\n        username\n      }\n      parentAnswer {\n        id\n        postedBy {\n          username\n        }\n      }\n      respondingTo {\n        postedBy {\n          username\n        }\n      }\n    }\n    question {\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetQuestion($id: Int!) {\n  singleQuestion(id: $id) {\n    title\n    description\n    timestamp\n    createdBy {\n      username\n    }\n  }\n}"): (typeof documents)["query GetQuestion($id: Int!) {\n  singleQuestion(id: $id) {\n    title\n    description\n    timestamp\n    createdBy {\n      username\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetQuestions($first: Int, $skip: Int, $search: String = \"\") {\n  questions(first: $first, skip: $skip, search: $search) {\n    id\n    title\n    description\n    timestamp\n    createdBy {\n      id\n      username\n      email\n      firstName\n      lastName\n      isActive\n      isStaff\n      lastLogin\n    }\n  }\n  pagination {\n    currentPage\n    totalCount\n    hasNextPage\n    hasPrevPage\n    firstPage\n    lastPage\n    pageCount\n  }\n}"): (typeof documents)["query GetQuestions($first: Int, $skip: Int, $search: String = \"\") {\n  questions(first: $first, skip: $skip, search: $search) {\n    id\n    title\n    description\n    timestamp\n    createdBy {\n      id\n      username\n      email\n      firstName\n      lastName\n      isActive\n      isStaff\n      lastLogin\n    }\n  }\n  pagination {\n    currentPage\n    totalCount\n    hasNextPage\n    hasPrevPage\n    firstPage\n    lastPage\n    pageCount\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;