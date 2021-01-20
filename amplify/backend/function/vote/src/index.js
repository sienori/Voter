/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWSAppSyncClient = require("aws-appsync").default;
const AppSyncConfig = require('./aws-exports');
const gql = require("graphql-tag");
global.fetch = require("node-fetch");

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const getOption = gql`
  query getOption($id: ID!) {
    getOption(id: $id) {
      id
      index
      title
      votes
      questionId
    }
  }
`;

const updateOption = gql(`
  mutation updateOption(
    $input: UpdateOptionInput!
  ) {
    updateOption(input: $input) {
      question {
        createdAt
        description
        id
        title
        updatedAt
        options {
          items {
            index
            id
            title
            updatedAt
            votes
          }
        }
      }
    }
  }
`);

const localConfig = {
  url: "http://192.168.139.2:20002/graphql",
  region: "ap-northeast-1",
  auth: {
    type: "API_KEY",
    apiKey: "da2-fakeApiId123456"
  },
  disableOffline: true
};

const cloudConfig = {
  url: AppSyncConfig.aws_appsync_graphqlEndpoint,
  region: AppSyncConfig.aws_appsync_region,
  auth: {
    type: AppSyncConfig.aws_appsync_authenticationType,
    apiKey: AppSyncConfig.aws_appsync_apiKey,
  },
  disableOffline: true,
};

const isCloud =
  "AWS_EXECUTION_ENV" in process.env && process.env.AWS_EXECUTION_ENV.startsWith("AWS_Lambda_");

exports.handler = async (event, context, callback) => {
  const { optionId } = event.arguments;
  const client = new AWSAppSyncClient(isCloud ? cloudConfig : localConfig);

  const optionResult = await client.query({
    query: getOption,
    variables: { id: optionId },
    fetchPolich: "network-only",
  }).catch(e => console.log(e));

  const option = optionResult.data.getOption;
  if (option === null) callback("Option does not exist", null);

  delete option.__typename;
  option.votes += 1;

  const updateResult = await client.mutate({
    mutation: updateOption,
    variables: { input: option },
  }).catch(e => console.log(e));

  return updateResult.data.updateOption.question;
};
