# Analytics

## Set up Analytics backend

```sh
% amplify add analytics
? Select an Analytics provider Amazon Pinpoint
? Provide your pinpoint resource name: amplifyapp
Adding analytics would add the Auth category to the project if not already added.
? Apps need authorization to send analytics events. Do you want to allow guests and unauthenticated users to send analytics events? (we recommend you allow this when getting started) Yes
✅ Successfully added auth resource locally.
Successfully added resource amplifyapp locally

Some next steps:
"amplify push" builds all of your local backend resources and provisions them in the cloud
"amplify publish" builds all your local backend and front-end resources (if you have hosting category added) and provisions them in the cloud

% amplify push
...
✔ Successfully pulled backend environment dev from the cloud.

    Current Environment: dev

┌───────────┬────────────────┬───────────┬───────────────────┐
│ Category  │ Resource name  │ Operation │ Provider plugin   │
├───────────┼────────────────┼───────────┼───────────────────┤
│ Auth      │ amplifyapp     │ Create    │ awscloudformation │
├───────────┼────────────────┼───────────┼───────────────────┤
│ Analytics │ amplifyapp     │ Create    │ awscloudformation │
├───────────┼────────────────┼───────────┼───────────────────┤
│ Api       │ amplifyapp     │ No Change │ awscloudformation │
├───────────┼────────────────┼───────────┼───────────────────┤
│ Hosting   │ amplifyhosting │ No Change │ awscloudformation │
└───────────┴────────────────┴───────────┴───────────────────┘
? Are you sure you want to continue? Yes
⠋ Updating resources in the cloud. This may take a few minutes...
...
✔ All resources are updated in the cloud

Pinpoint URL to track events https://eu-west-1.console.aws.amazon.com/pinpoint/home/?region=eu-west-1#/apps/d8b6e775173c4c78aa0a7dfbe84cabf7/analytics/overview
GraphQL transformer version: 2

%
```

## Configure app

Import and load the configuration file in your `src/main.ts` file. User session data is automatically collected.

```ts
import { Amplify, Analytics } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);
//Analytics.enable();
```

OBS: when you call Amplify.configure, you are in fact calling the configure method in every category. So it makes no difference between Amplify.configure({ Analytics: {} }) or Analytics.configure({})

## Recording an event

To record custom events call the record method:

```ts

```

## Auth events captured as part of Cognito Analytics

https://github.com/aws-amplify/amplify-js/issues/9131#issuecomment-961324077

## Sending data to multiple providers

I want to send the events data to Pinpoint and Kinesis
You'll have to call Anlaytics.record twice, one for each provider, and that is expected since input format differs between providers. Check this [example](https://github.com/aws-amplify/amplify-js/issues/5329#issuecomment-620851312).
