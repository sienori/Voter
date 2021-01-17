/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const postQuestion = /* GraphQL */ `
  mutation PostQuestion(
    $title: String!
    $description: String
    $options: [String!]!
  ) {
    postQuestion(title: $title, description: $description, options: $options) {
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
export const vote = /* GraphQL */ `
  mutation Vote($id: String!, $index: Int!) {
    vote(id: $id, index: $index) {
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
export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
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
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
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
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
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
