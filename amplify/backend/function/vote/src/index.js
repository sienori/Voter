/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWSAppSyncClient = require("aws-appsync").default;
const gql = require("graphql-tag");
global.fetch = require("node-fetch");

const getQuestion = gql`
  query getQuestion($id: ID!) {
    getQuestion(id: $id) {
      id
      title
      description
      options {
        index
        title
        votes
      }
    }
  }
`;

const updateQuestion = gql(`
  mutation updateQuestion(
    $input: UpdateQuestionInput!
  ) {
    updateQuestion(input: $input) {
      id
      title
      description
      options{
          index
          title
          votes
      }
      createdAt
      updatedAt
    }
  }
`);

const localEnv = {
  API_BOYAKIGQL_GRAPHQLAPIENDPOINTOUTPUT: "http://192.168.139.2:20002/graphql",
  REGION: "ap-northeast-1",
};

exports.handler = async (event, context, callback) => {
  const isCloudEnv =
    "AWS_EXECUTION_ENV" in process.env && process.env.AWS_EXECUTION_ENV.startsWith("AWS_Lambda_");
  const env = isCloudEnv ? process.env : localEnv;
  const auth = {
    type: "API_KEY",
    apiKey: isCloudEnv ? process.env.APIKEY : "da2-fakeApiId123456",
  };

  const client = new AWSAppSyncClient({
    url: env.API_BOYAKIGQL_GRAPHQLAPIENDPOINTOUTPUT,
    region: env.REGION,
    auth: auth,
    disableOffline: true,
  });

  const getResult = await client.query({
    query: getQuestion,
    variables: { id: event.arguments.id },
    fetchPolich: "network-only",
  });
  const question = getResult.data.getQuestion;
  if (question === null) callback("Question does not exist", null);

  question.updatedAt = new Date().toISOString();
  delete question.__typename;
  for (const i in question.options) {
    delete question.options[i].__typename;
    if (question.options[i].index === event.arguments.index) {
      question.options[i].votes += 1;
    }
  }

  const updateResult = await client.mutate({
    mutation: updateQuestion,
    variables: { input: question },
  });

  return updateResult.data.updateQuestion;
};
