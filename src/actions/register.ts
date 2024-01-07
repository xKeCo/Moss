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
          errorMessage: 'An account with that email already exists.',
          error: 'emailExists',
        };
      }

      if (existingUser.username === username.toLowerCase()) {
        return {
          ok: false,
          errorMessage: 'An account with that username already exists.',
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
      errorMessage: 'There was an error creating your account, please try again.',
      error: 'serverError',
    };
  }
};
