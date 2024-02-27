'use server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import { endpoint, s3Client } from '@/lib/s3Client';

export const uploadFiles = async (formData: FormData) => {
  const files = formData.getAll('files');

  if (!files) return;

  const filesArray = Array.from(files);

  const filesPromises = filesArray.map(async (file: any) => {
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileExtension = file.name.split('.').pop();
      const fileKey = `${uuid()}.${fileExtension}`;

      const uploadResult = await s3Client.send(
        new PutObjectCommand({
          // Bucket: 'mossdental',
          Bucket: process.env.DO_BUCKET_NAME!,
          Key: fileKey,
          Body: buffer,
          ACL: 'public-read',
        })
      );

      return {
        ok: true,
        name: file.name,
        url: `${endpoint}/${process.env.DO_BUCKET_NAME}/${fileKey}`,
        ETag: uploadResult.ETag,
      };
    } catch (error) {
      return {
        ok: false,
        name: file.name,
        error,
      };
    }
  });

  const uploadedFiles = await Promise.all(filesPromises);

  return uploadedFiles;
};
