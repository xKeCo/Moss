'use server';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '@/lib/s3Client';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const deleteFiles = async (fileId: string, pathname: string) => {
  try {
    const file = await prisma.file.findUnique({
      where: {
        id: fileId,
      },
      select: {
        fileKey: true,
      },
    });

    if (!file) {
      return {
        ok: false,
        errorMessage: 'File not found',
        errorCode: 'file/not-found',
      };
    }

    await prisma.file.delete({
      where: {
        id: fileId,
      },
    });

    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.DO_BUCKET_NAME!,
        Key: file.fileKey,
      })
    );

    revalidatePath(pathname);

    return {
      ok: true,
      message: 'Archivo eliminado correctamente',
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      errorMessage: 'There was an error deleting the file, please try again.',
      errorCode: 'file/delete-error',
    };
  }
};
