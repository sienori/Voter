/* Amplify Params - DO NOT EDIT
  ENV
  REGION
Amplify Params - DO NOT EDIT */

const AWSAppSyncClient = require("aws-appsync").default;
const gql = require("graphql-tag");
global.fetch = require("node-fetch");

const createQuestion = gql(`
  mutation createQuestion(
    $input: CreateQuestionInput!
  ) {
    createQuestion(input: $input) {
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

    const title = event.arguments.title || "";
    const description = event.arguments.description || "";
    const options = event.arguments.options
        .filter(title => title !== "")
        .map((title, index) => ({
            title: title,
            index: index,
            votes: 0,
        }));

    if (title === "") callback("No title", null);
    if (options.length < 2) callback("Not enough options", null);

    const input = {
        title: title,
        description: description,
        options: options,
    };
    const result = await client.mutate({
        mutation: createQuestion,
        variables: { input: input },
    });
    return result.data.createQuestion;
};
