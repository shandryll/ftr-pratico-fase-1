import * as aws from "@pulumi/aws";

const buckets = new aws.s3.BucketV2("brev-lv", {
  bucket: 'brev-lv',
  tags: {
    IAC: "true"
  }
});
