/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const postQuestion = /* GraphQL */ `
  mutation PostQuestion(
    $title: String!
    $description: String
    $options: [String!]!
  ) {
    postQuestion(title: $title, description: $description, options: $options)
  }
`;
export const vote = /* GraphQL */ `
  mutation Vote($optionId: ID!) {
    vote(optionId: $optionId) {
      id
      title
      description
      options {
        items {
          id
          questionId
          index
          title
          votes
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
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
        items {
          id
          questionId
          index
          title
          votes
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
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
        items {
          id
          questionId
          index
          title
          votes
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
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
        items {
          id
          questionId
          index
          title
          votes
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createOption = /* GraphQL */ `
  mutation CreateOption(
    $input: CreateOptionInput!
    $condition: ModelOptionConditionInput
  ) {
    createOption(input: $input, condition: $condition) {
      id
      questionId
      question {
        id
        title
        description
        options {
          nextToken
        }
        createdAt
        updatedAt
      }
      index
      title
      votes
      createdAt
      updatedAt
    }
  }
`;
export const updateOption = /* GraphQL */ `
  mutation UpdateOption(
    $input: UpdateOptionInput!
    $condition: ModelOptionConditionInput
  ) {
    updateOption(input: $input, condition: $condition) {
      id
      questionId
      question {
        id
        title
        description
        options {
          nextToken
        }
        createdAt
        updatedAt
      }
      index
      title
      votes
      createdAt
      updatedAt
    }
  }
`;
export const deleteOption = /* GraphQL */ `
  mutation DeleteOption(
    $input: DeleteOptionInput!
    $condition: ModelOptionConditionInput
  ) {
    deleteOption(input: $input, condition: $condition) {
      id
      questionId
      question {
        id
        title
        description
        options {
          nextToken
        }
        createdAt
        updatedAt
      }
      index
      title
      votes
      createdAt
      updatedAt
    }
  }
`;
