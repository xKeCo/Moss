import { S3 } from '@aws-sdk/client-s3';

export const endpoint = 'https://nyc3.digitaloceanspaces.com';

export const s3Client = new S3({
  endpoint,
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.DO_ACCESS_KEY!,
    secretAccessKey: process.env.DO_SECRET_KEY!,
  },
});
