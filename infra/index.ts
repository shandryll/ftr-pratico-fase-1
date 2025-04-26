import * as aws from "@pulumi/aws";

const bucket = new aws.s3.BucketV2("brev-lv", {
  bucket: 'brev-lv',
  tags: {
    IAC: "true"
  }
});

export const bucketName = bucket.id;
export const bucketInfo = bucket.bucket;
