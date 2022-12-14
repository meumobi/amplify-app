# Rotating (change) access keys (AWS CLI)

```sh
$ cat ~/.aws/credentials
[default]
aws_access_key_id=AKIA3KK7BHHDS7Y6RGPT
aws_secret_access_key=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
```

https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_RotateAccessKey

## Install or update the AWS CLI

```sh
$ curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
$ sudo installer -pkg AWSCLIV2.pkg -target /
```

https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
