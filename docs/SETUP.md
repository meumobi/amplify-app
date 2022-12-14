# SETUP

## What we'll build

This tutorial guides you through [setting up an AWS backend and integrating that backend with your Angular web app](https://docs.amplify.aws/start/q/integration/angular/). You will create an app with a GraphQL API to store and retrieve your favorite restaurants in a cloud database, as well as receive updates over a realtime subscription.

## Prerequisites

Before we begin, make sure you have the following installed:

- [Node.js] v12.x or later
- [npm] v5.x or later
- [git] v2.14.1 or later

If not you don't have Node.js and npm already installed, I recommend the read of [Download and install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### AWS Account

If you don't already have, you'll need to [create an AWS Account](https://portal.aws.amazon.com/billing/signup) in order to follow the steps outlined in this tutorial.

### Amplify cli

```sh
$ npm install -g @aws-amplify/cli
$ amplify configure

Sign in to your AWS administrator account:
https://console.aws.amazon.com/
Press Enter to continue

Specify the AWS Region
? region:  eu-west-1
Specify the username of the new IAM user:
? user name:  amplify-IybTQ
Complete the user creation using the AWS console
https://console.aws.amazon.com/iam/home?region=eu-west-1#/users$new?step=final&accessKey&userNames=amplify-IybTQ&permissionType=policies&policies=arn:aws:iam::aws:policy%2FAdministratorAccess-Amplify

- Created user amplify-IybTQ
- Attached policy AdministratorAccess-Amplify to user amplify-IybTQ
- Created access key (AKIA3KK7BHHDS7Y6RGPT) for user amplify-IybTQ with Secret Access key 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

Press Enter to continue

Enter the access key of the newly created user:
? accessKeyId:  ********************
? secretAccessKey:  ****************************************
This would update/create the AWS Profile in your local machine
? Profile Name:  default

Successfully set up the new user.
```

## Set up project

### Create a new Angular app

```sh
% npx -p @angular/cli ng new amplify-app
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS

% cd amplify-app
```

### Create a new Amplify backend

```sh
% amplify init
Note: It is recommended to run this command from the root of your app directory
? Enter a name for the project amplifyapp
The following configuration will be applied:

Project information
| Name: amplifyapp
| Environment: dev
| Default editor: Visual Studio Code
| App type: javascript
| Javascript framework: angular
| Source Directory Path: src
| Distribution Directory Path: dist/amplify-app
| Build Command: npm run-script build
| Start Command: ng serve

? Initialize the project with the above configuration? Yes
Using default provider  awscloudformation
? Select the authentication method you want to use: AWS profile

For more information on AWS Profiles, see:
https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html

? Please choose the profile you want to use default
Adding backend environment dev to AWS Amplify app: d2mcgyx40vlzd
⠹ Initializing project in the cloud...

CREATE_IN_PROGRESS amplify-amplifyapp-dev-173315 AWS::CloudFormation::Stack Thu May 05 2022 17:33:17 GMT+0100 (Western European Summer Time) User Initiated
CREATE_IN_PROGRESS DeploymentBucket              AWS::S3::Bucket            Thu May 05 2022 17:33:21 GMT+0100 (Western European Summer Time)
CREATE_IN_PROGRESS AuthRole                      AWS::IAM::Role             Thu May 05 2022 17:33:21 GMT+0100 (Western European Summer Time)
CREATE_IN_PROGRESS UnauthRole                    AWS::IAM::Role             Thu May 05 2022 17:33:21 GMT+0100 (Western European Summer Time)
CREATE_IN_PROGRESS AuthRole                      AWS::IAM::Role             Thu May 05 2022 17:33:22 GMT+0100 (Western European Summer Time) Resource creation Initiated
CREATE_IN_PROGRESS DeploymentBucket              AWS::S3::Bucket            Thu May 05 2022 17:33:22 GMT+0100 (Western European Summer Time) Resource creation Initiated
CREATE_IN_PROGRESS UnauthRole                    AWS::IAM::Role             Thu May 05 2022 17:33:22 GMT+0100 (Western European Summer Time) Resource creation Initiated
⠹ Initializing project in the cloud...

CREATE_COMPLETE AuthRole   AWS::IAM::Role Thu May 05 2022 17:33:40 GMT+0100 (Western European Summer Time)
CREATE_COMPLETE UnauthRole AWS::IAM::Role Thu May 05 2022 17:33:40 GMT+0100 (Western European Summer Time)
⠹ Initializing project in the cloud...

CREATE_COMPLETE DeploymentBucket              AWS::S3::Bucket            Thu May 05 2022 17:33:43 GMT+0100 (Western European Summer Time)
CREATE_COMPLETE amplify-amplifyapp-dev-173315 AWS::CloudFormation::Stack Thu May 05 2022 17:33:46 GMT+0100 (Western European Summer Time)
✔ Successfully created initial AWS cloud resources for deployments.
✔ Initialized provider successfully.
✅ Initialized your environment successfully.

Your project has been successfully initialized and connected to the cloud!

Some next steps:
"amplify status" will show you what you've added already and if it's locally configured or deployed
"amplify add <category>" will allow you to add features like user login or a backend API
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify console" to open the Amplify Console and view your project status
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud

Pro tip:
Try "amplify add api" to create a backend API and then "amplify push" to deploy everything

%
```

### Install Amplify library

```sh
% npm install --save aws-amplify @aws-amplify/ui-angular
+ aws-amplify@4.3.21
+ @aws-amplify/ui-angular@2.4.0

% npm start
```

The `@aws-amplify/ui-angular` package is a set of Angular components and an Angular provider which helps integrate your application with the AWS-Amplify library.

#### Importing the Amplify Angular UI Module

Add the Amplify Authenticator UI Module to `src/app/app.module.ts`:

```ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AmplifyAuthenticatorModule } from "@aws-amplify/ui-angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AmplifyAuthenticatorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Connect API and database to the app

### Model the data with GraphQL transform

```sh
% amplify add api
? Select from one of the below mentioned services: GraphQL
? Here is the GraphQL API that we will create. Select a setting to edit or continue Continue
? Choose a schema template: Single object with fields (e.g., “Todo” with ID, name, description)

⚠️  WARNING: your GraphQL API currently allows public create, read, update, and delete access to all models via an API Key. To configure PRODUCTION-READY authorization rules, review: https://docs.amplify.aws/cli/graphql/authorization-rules

✅ GraphQL schema compiled successfully.

Edit your schema at /Users/vdias38/Dvpt/PROJECTS/amplify-app/amplify/backend/api/amplifyapp/schema.graphql or place .graphql files in a directory at /Users/vdias38/Dvpt/PROJECTS/amplify-app/amplify/backend/api/amplifyapp/schema
✔ Do you want to edit the schema now? (Y/n) · no
✅ Successfully added resource amplifyapp locally

✅ Some next steps:
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud
%
```

### Creating the API with database

```sh
% amplify push
✔ Successfully pulled backend environment dev from the cloud.
⠴ Building resource api/amplifyapp

Current Environment: dev
┌──────────┬───────────────┬───────────┬───────────────────┐
│ Category │ Resource name │ Operation │ Provider plugin   │
├──────────┼───────────────┼───────────┼───────────────────┤
│ Api      │ amplifyapp    │ Create    │ awscloudformation │
└──────────┴───────────────┴───────────┴───────────────────┘
? Are you sure you want to continue? Yes

? Do you want to generate code for your newly created GraphQL API Yes
? Choose the code generation language target angular
? Enter the file name pattern of graphql queries, mutations and subscriptions src/graphql/**/*.graphql
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions Yes
? Enter maximum statement depth [increase from default if your schema is deeply nested] 2
? Enter the file name for the generated code src/app/API.service.ts
⠏ Updating resources in the cloud. This may take a few minutes...
...
✔ Generated GraphQL operations successfully and saved at src/graphql
✔ Code generated successfully and saved in file src/app/API.service.ts
✔ All resources are updated in the cloud

GraphQL endpoint: https://7nlloa5kubaqtecf3rongk44du.appsync-api.eu-west-1.amazonaws.com/graphql
GraphQL API KEY: da2-f7kj2ugirregrpn3xafx2mzv2i

GraphQL transformer version: 2
%
```

Once the deployment is complete, the CLI will create a new directory in `src/graphql` with all of the GraphQL operations you will need for your API. The CLI also created an `API.service.ts` file in the `app` directory

### Connect frontend to API

https://docs.amplify.aws/start/getting-started/data-model/q/integration/angular/#connect-frontend-to-api

[node.js]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/
[git]: https://git-scm.com/

## Troubleshouting

### Error: No credentials, applicationId or region

Disable Analytics [amplify-js/issues/5918](https://github.com/aws-amplify/amplify-js/issues/5918)
