'use server';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import { endpoint, s3Client } from '@/lib/s3Client';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface FileUploadResult {
  ok: boolean;
  name: string;
  url?: string;
  extension?: string;
  size?: number;
  type?: string;
  ETag?: string;
  fileKey?: string;
}

const getFileExtension = (fileName: string): string => fileName.split('.').pop() ?? '';

const createFileRecord = async (
  file: File,
  fileKey: string,
  ETag: string,
  patientId: string
): Promise<void> => {
  await prisma.file.create({
    data: {
      name: file.name,
      url: `${endpoint}/${process.env.DO_BUCKET_NAME}/${fileKey}`,
      extension: getFileExtension(file.name),
      size: file.size,
      type: file.type,
      ETag: ETag,
      fileKey,
      patientId,
    },
  });
};

const deleteFileFromS3 = async (fileKey: string): Promise<void> => {
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.DO_BUCKET_NAME!,
      Key: fileKey,
    })
  );
};

const uploadFileToS3 = async (file: File, patientId: string): Promise<FileUploadResult> => {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileExtension = getFileExtension(file.name);
    const fileKey = `${uuid()}.${fileExtension}`;

    const uploadResult = await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.DO_BUCKET_NAME!,
        Key: fileKey,
        Body: buffer,
        ACL: 'public-read',
        ContentType: file.type,
      })
    );

    try {
      await createFileRecord(file, fileKey, uploadResult.ETag!, patientId);
    } catch (error) {
      console.log('prisma error', error);
      await deleteFileFromS3(fileKey);
      return {
        ok: false,
        name: file.name,
      };
    }

    return {
      ok: true,
      name: file.name,
      url: `${endpoint}/${process.env.DO_BUCKET_NAME}/${fileKey}`,
      extension: fileExtension,
      size: file.size,
      type: file.type,
      ETag: uploadResult.ETag,
      fileKey,
    };
  } catch (error) {
    console.log('s3 error', error);
    return {
      ok: false,
      name: file.name,
    };
  }
};

export const uploadFiles = async (
  formData: FormData,
  patientId: string,
  pathname: string
): Promise<FileUploadResult[]> => {
  const files = formData.getAll('files') as File[];

  if (!files.length) return [];

  const filesPromises = files.map((file) => uploadFileToS3(file, patientId));

  revalidatePath(pathname);

  return await Promise.all(filesPromises);
};
