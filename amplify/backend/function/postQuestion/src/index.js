/* Amplify Params - DO NOT EDIT
  ENV
  REGION
Amplify Params - DO NOT EDIT */

const AWSAppSyncClient = require("aws-appsync").default;
const AppSyncConfig = require("./aws-exports");
const gql = require("graphql-tag");
global.fetch = require("node-fetch");

const createQuestion = gql(`
  mutation createQuestion(
    $input: CreateQuestionInput!
  ) {
    createQuestion(input: $input) {
      id
    }
  }
`);

const createOption = gql(`
  mutation createOption(
    $input: CreateOptionInput!
  ) {
    createOption(input: $input) {
      id
    }
  }
`);

const localConfig = {
    url: "http://192.168.139.2:20002/graphql",
    region: "ap-northeast-1",
    auth: {
        type: "API_KEY",
        apiKey: "da2-fakeApiId123456",
    },
    disableOffline: true,
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
    if (event.arguments.title === "") callback("No title", null);
    if (event.arguments.options.filter(title => title !== "").length < 2)
        callback("Not enough options", null);

    const client = new AWSAppSyncClient(isCloud ? cloudConfig : localConfig);

    const questionInput = {
        title: event.arguments.title || "",
        description: event.arguments.description || "",
    };

    const questionResult = await client.mutate({
        mutation: createQuestion,
        variables: { input: questionInput },
    }).catch(e => console.log(e));
    const questionId = questionResult.data.createQuestion.id;

    const optionInputs = event.arguments.options
        .filter((title) => title !== "")
        .map((title, index) => ({
            questionId: questionId,
            title: title,
            index: index,
            votes: 0,
        }));

    const optionResults = optionInputs.map(input =>
        client.mutate({
            mutation: createOption,
            variables: { input: input }
        }));

    await Promise.all(optionResults);

    return questionResult.data.createQuestion.id;
};
