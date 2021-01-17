/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
      id
      title
      description
      options {
        index
        title
        votes
      }
      updatedAt
      createdAt
    }
  }
`;
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        options {
          index
          title
          votes
        }
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;
