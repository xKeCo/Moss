import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { MossApi } from '@/api';
import {
  onAddNewPatient,
  onLoadPatients,
  onSetActivePatient,
  onSetLoadingPatients,
} from '@/redux';
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';
import { IPatient } from '@/interfaces';

export const usePatientsStore = () => {
  // Router
  const router = useRouter();

  // Use selector
  const { patients, activePatient, loading } = useAppSelector((state) => state.patients);

  // Dispatch
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string | null>();

  // Unset active patient
  const unsetActivePatient = () => {
    dispatch(onSetActivePatient(null));
  };

  // Get patients
  const startLoadingPatients = async () => {
    dispatch(onSetLoadingPatients(true));

    try {
      const { data } = await MossApi.get('/patients');

      dispatch(onLoadPatients(data.patients));
    } catch (error: any) {
      const errorMessage = error.response.data.msg;
      dispatch(onSetLoadingPatients(false));
      toast.error(errorMessage);
    }
  };

  // Create patient
  const startSavingPatient = async (patient: IPatient) => {
    try {
      const { data } = await MossApi.post('/patients/', patient);

      dispatch(onAddNewPatient(data.patients));

      toast.success('Patient created successfully');
      router.push('/dashboard');
    } catch (error: any) {
      const errorMessage = error.response.data.msg;
      toast.error(errorMessage);
    }
  };

  // Get patient by ID
  const setPatientByID = async (id: string) => {
    dispatch(onSetLoadingPatients(true));

    try {
      const { data } = await MossApi.get(`/patients/patient/${id}`);

      console.log(data.patient[0]);

      // if (data.patient) {
      dispatch(onSetActivePatient(data.patient[0]));
      // setError(null);
      // }
    } catch (error: any) {
      dispatch(onSetActivePatient(null));
      setError(error.response.data.msg);
    }
  };

  // Saving activities
  // const startSavingActivity = async (activityForm: TActivity) => {
  //   const newActivityForm = formatMembersAndOwner(activityForm);

  //   try {
  //     if (newActivityForm.id) {
  //       // Update activity
  //       await projectApi.put(`/activities/${newActivityForm.id}`, newActivityForm);
  //       dispatch(onUpdateActivity(activityForm));

  //       const members = newActivityForm?.members.filter(
  //         (member) =>
  //           member.userInfo !== newActivityForm.owner && member.status !== 'aceptado'
  //       );

  //       members.forEach((member) => {
  //         projectApi.post(`/notifications`, {
  //           from: newActivityForm?.owner,
  //           to: member.userInfo,
  //           activity: newActivityForm.id,
  //           read: false,
  //           type: 'invitacion',
  //         });
  //       });

  //       // Update activity notification
  //       toast.success('Actividad actualizada con éxito');
  //     } else {
  //       // Add new activity
  //       const { data } = await projectApi.post('/activities', newActivityForm);
  //       dispatch(
  //         onAddNewActivity({
  //           ...activityForm,
  //           id: data.activity.id,
  //         })
  //       );

  //       // Send notification to members except the owner
  //       const members = newActivityForm?.members.filter(
  //         (member) => member.userInfo !== newActivityForm.owner
  //       );

  //       members.forEach((member) => {
  //         projectApi.post(`/notifications`, {
  //           from: data.activity.owner,
  //           to: member.userInfo,
  //           activity: data.activity.id,
  //           read: false,
  //           type: 'invitacion',
  //         });
  //       });

  //       // New activity notification
  //       toast.success('Actividad creada con éxito');
  //     }

  //     activeActivity ? router.back() : router.replace('/actividades');
  //   } catch (error: any) {
  //     dispatch(onSetLoadingActivities(false));

  //     toast.error(`Error guardando actividad - ${error.response.data.msg}`);

  //     console.log(error.response.data.msg);
  //   }
  // };

  return {
    // Properties
    patients,
    activePatient,
    loading,
    error,

    // Methods
    unsetActivePatient,
    startLoadingPatients,
    startSavingPatient,
    setPatientByID,
  };
};
