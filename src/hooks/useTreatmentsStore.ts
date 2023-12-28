import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { MossApi } from '@/services/api';
import { useAppDispatch, useAppSelector } from '@/services/redux/app/hooks';
import {
  onAddNewTreatment,
  onLoadTreatments,
  onSetActiveTreatment,
  onSetLoadingTreatments,
} from '@/services/redux/treatments/treatmentsSlice';
import { ITreatment } from '@/interfaces';

export const useTreatmentsStore = () => {
  // Router
  const router = useRouter();

  // Use selector
  const { treatments, activeTreatment, loading } = useAppSelector(
    (state) => state.treatments
  );

  // Dispatch
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string | null>();

  // Unset active treatment
  const unsetActiveTreatment = () => {
    dispatch(onSetActiveTreatment(null));
  };

  // Get treatments
  const startLoadingTreatment = async () => {
    dispatch(onSetLoadingTreatments(true));

    try {
      const { data } = await MossApi.get('/treatments');

      dispatch(onLoadTreatments(data.treatments));
    } catch (error: any) {
      const errorMessage = error.response.data.msg;
      dispatch(onSetLoadingTreatments(false));
      toast.error(errorMessage);
    }
  };

  // Create treatment
  const startSavingTreatment = async (treatment: ITreatment) => {
    try {
      const { data } = await MossApi.post('/treatments/', treatment);

      dispatch(onAddNewTreatment(data.treatments));

      toast.success('Treatment created successfully');
      router.push('/dashboard');
    } catch (error: any) {
      const errorMessage = error.response.data.msg;
      toast.error(errorMessage);
    }
  };

  // Get treatment by ID
  const setTreatmentByPatientId = async (id: string) => {
    dispatch(onSetLoadingTreatments(true));

    try {
      const { data } = await MossApi.get(`/treatments/${id}`);

      console.log(data.treatment[0]);

      // if (data.treatment) {
      dispatch(onSetActiveTreatment(data.treatment[0]));
      // setError(null);
      // }
    } catch (error: any) {
      dispatch(onSetActiveTreatment(null));
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
    treatments,
    activeTreatment,
    loading,
    error,

    // Methods
    unsetActiveTreatment,
    startLoadingTreatment,
    startSavingTreatment,
    setTreatmentByPatientId,
  };
};
