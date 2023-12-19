// Redux hooks
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';

// Next
import { useRouter } from 'next/navigation';

// API Axios Call
import { MossApi } from '@/api';

// Redux Actions
import {
  RootState,
  onCheckingCredentials,
  // onLoadNotifications,
  onLogin,
  onLogout,
  // onLogOutActivities,
  // onLogOutProfiles,
  // onLogOutReports,
  // onLogOutSearch,
} from '@/redux';

// Soonner Notifications
import { toast } from 'sonner';
import { signIn, signOut } from 'next-auth/react';

// Helpers
// import { fileUpload } from '@/helpers';
// import { useState } from 'react';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useAppSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();
  // const [loadingNotifications, setLoadingNotifications] = useState(false);

  // const router = useRouter();

  // Logout
  const startLogout = async () => {
    // localStorage.clear();
    dispatch(onLogout());
    signOut({ callbackUrl: `/login` });
    // dispatch(onLogOutActivities());
    // dispatch(onLogOutReports());
    // dispatch(onLogOutProfiles());
    // dispatch(onLogOutSearch());
  };

  // Register
  const startRegister = async (formRegisterData: {
    email: string;
    username?: string;
    password: string;
  }) => {
    try {
      const { data } = await MossApi.post('/auth/new', formRegisterData);

      signIn('credentials', {
        email: formRegisterData.email,
        password: formRegisterData.password,
        callbackUrl: `/dashboard`,
      });

      dispatch(onLogin(data.user));
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(onLogout());
    }
  };

  // Login
  const startLogin = async ({ email, password }: { email: string; password: string }) => {
    dispatch(onCheckingCredentials());

    try {
      const { data } = await MossApi.post('/auth/login', {
        email,
        password,
      });

      signIn('credentials', {
        email,
        password,
        callbackUrl: `/dashboard`,
      });

      dispatch(onLogin(data.user));
    } catch (error: any) {
      const errorMessages = error.response.data.message;
      console.log(error);
      toast.error(errorMessages);
      dispatch(onLogout());
    }
  };

  // Update User
  const startUpdatingUser = async (formUserData: {
    name: string;
    bio: string;
    photoURL: string;
    url: string;
  }) => {
    try {
      const { data } = await MossApi.put(`/auth/update/${user?._id}`, formUserData);

      dispatch(onLogin(data.user));

      toast.success('Usuario actualizado correctamente');
    } catch (error: any) {
      console.log(error);
      toast.error('Error al actualizar el usuario');
    }
  };

  // Update User password
  const startUpdatingUserPassword = async (
    formUserData: {
      password: string;
      newPassword: string;
      confirmNewPassword: string;
    },
    onResetPasswordForm = () => {}
  ) => {
    try {
      const { data } = await MossApi.put(
        `/auth/change-password/${user?._id}`,
        formUserData
      );

      dispatch(onLogin(data.user));

      toast.success('Contraseña actualizada correctamente');
      onResetPasswordForm();
    } catch (error: any) {
      const { msg } = error.response.data;
      toast.error(msg);
    }
  };

  // Change User Image
  // const startUpdatingUserImage = async (files: File) => {
  //   const filesData = await fileUpload(files);

  //   return filesData;
  // };

  // Delete User Image
  const startDeletingUserImage = async (imageId: string) => {
    try {
      await MossApi.delete(`/activities/file/uao-app/${imageId}`);
    } catch (error: any) {
      toast.error(`Error eliminando archivo`);
      console.log(error);
    }
  };

  // const startLoadingNotifications = async (userId: string | undefined) => {
  //   setLoadingNotifications(true);
  //   try {
  //     const { data } = await MossApi.get(`/notifications/${userId}`);

  //     dispatch(onLoadNotifications(data.notifications));
  //     setLoadingNotifications(false);
  //   } catch (error: any) {
  //     console.log(error);
  //     setLoadingNotifications(false);
  //   }
  // };

  return {
    // Properties
    status,
    user,
    errorMessage,
    // loadingNotifications,

    // Methods
    startLogin,
    startRegister,
    startLogout,
    startUpdatingUser,
    // startUpdatingUserImage,
    startDeletingUserImage,
    startUpdatingUserPassword,
    // startLoadingNotifications,
  };
};
