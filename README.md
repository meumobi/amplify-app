# AmplifyApp

The aim of this project is to discover/test Analytics solution of AWS. I'm familiar w/ Google Analytics, but I didn't find a similar solution on AWS-world. But it seems I can reach same level of insight by combining different AWS modules and set up a data stream from Kinesis Data Streams to QuickSight:

| ![Data stream from Kinesis Data Streams to QuickSight](https://miro.medium.com/max/1356/1*ErLceGXkOFoeSoWOVXQoeQ.png) |
| :-------------------------------------------------------------------------------------------------------------------: |
|                                  Data stream from Kinesis Data Streams to QuickSight                                  |

Amplify supports [Amazon Kinesis Data Streams](https://aws.amazon.com/kinesis/data-streams/) to deliver logs from the front-end to QuickSight.

1. **Kinesis Data Firehose delivery stream** delivers data to S3 through Kinesis Data Stream.
1. **AWS Glue** runs a crawler that gathers data from the S3 bucket.
1. Then you are ready to query the data from S3 through AWS Glue by **Athena**.
1. Visualise data on **QuickSight**.

## Furthermore

- [DealwithData (yt) - End to End Simple Data Analytics Solution using AWS Services](https://www.youtube.com/watch?v=v1qdXQXMp2A)
- [AWS Amplify API / AnalyticsClass](https://aws-amplify.github.io/amplify-js/api/classes/analyticsclass.html)
- [Leveraging Amazon Pinpoint Analytics to Improve Application Performance and User Experience | AWS](https://www.youtube.com/watch?v=fSDQx5ardmI)
- [Data Analytics for Beginners from AWS Experts](https://www.youtube.com/watch?v=IofpKxNRnAE)
- [Web Dev Journey (yt)- Amplify - Analytics](https://www.youtube.com/watch?v=61vlNE4JeaM)
- [Daijiro Wachi (medium) - Improve UX by observability in front-end with Amplify and QuickSight](https://watilde.medium.com/improve-ux-by-observability-in-front-end-with-amplify-and-quicksight-e7083ec1913b)
- [docs.amplify.aws/lib/analytics](https://docs.amplify.aws/lib/analytics/getting-started/q/platform/js/)
- [docs.amplify.aws/start/getting-started/auth](https://docs.amplify.aws/start/getting-started/auth/q/integration/angular/)
