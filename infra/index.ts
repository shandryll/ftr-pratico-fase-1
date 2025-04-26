import * as aws from "@pulumi/aws";

const bucket = new aws.s3.BucketV2("brev-lv", {
  bucket: 'brev-lv',
  tags: {
    IAC: "true"
  }
});

const bkpsss = new aws.s3.BucketV2("bkpsss-brev-lv", {
  bucket: 'bkpsss-brev-lv',
  tags: {
    IAC: "true"
  }
});

const bkp = new aws.s3.BucketV2("bkp-brev-lv", {
  bucket: 'bkp-brev-lv',
  tags: {
    IAC: "true"
  }
});
