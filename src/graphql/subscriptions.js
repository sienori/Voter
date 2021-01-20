/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion {
    onCreateQuestion {
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion {
    onUpdateQuestion {
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion {
    onDeleteQuestion {
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
export const onCreateOption = /* GraphQL */ `
  subscription OnCreateOption {
    onCreateOption {
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
export const onUpdateOption = /* GraphQL */ `
  subscription OnUpdateOption {
    onUpdateOption {
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
export const onDeleteOption = /* GraphQL */ `
  subscription OnDeleteOption {
    onDeleteOption {
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
