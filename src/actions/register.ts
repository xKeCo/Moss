'use server';

import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';

export const registerUser = async (email: string, password: string, username: string) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return {
          ok: false,
          errorMessage: 'Ya existe una cuenta con ese correo electrónico.',
          error: 'emailExists',
        };
      }

      if (existingUser.username === username.toLowerCase()) {
        return {
          ok: false,
          errorMessage: 'Ya existe una cuenta con ese nombre de usuario.',
          error: 'usernameExists',
        };
      }
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        username: username.toLowerCase(),
        name: email.split('@')[0],
        photoURL: `https://source.boringavatars.com/marble/50/${username.toLowerCase()}`,
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        photoURL: true,
      },
    });

    return {
      ok: true,
      user: newUser,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      errorMessage: 'Ha ocurrido un error durante el registro.',
      error: 'serverError',
    };
  }
};
