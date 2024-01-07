import { toast } from 'sonner';
import { MossApi } from '@/services/api';
import { useAppDispatch, useAppSelector } from '@/services/redux/app/hooks';
import {
  onAddNewTreatment,
  onLoadTreatments,
  onSetActiveTreatment,
  onSetErrorTreatment,
  onSetLoadingTreatments,
} from '@/services/redux/treatments/treatmentsSlice';
import type { ITreatment } from '@/interfaces';
import { useRouter } from 'next/navigation';

export const useTreatmentsStore = () => {
  // Router
  const router = useRouter();

  // Use selector
  const { treatments, activeTreatment, loading, errorMsg } = useAppSelector(
    (state) => state.treatments
  );

  // Dispatch
  const dispatch = useAppDispatch();

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

  // Get treatment by ID
  const setTreatmentByPatientId = async (id: string) => {
    dispatch(onSetLoadingTreatments(true));

    try {
      const { data } = await MossApi.get(`/treatments/${id}`);

      dispatch(onSetActiveTreatment(data.treatment));
    } catch (error: any) {
      dispatch(onSetActiveTreatment(null));

      if (error.response.status === 404) {
        return;
      }

      const errorMessage = error.response.data.msg;
      toast.error(errorMessage);
      dispatch(onSetErrorTreatment(errorMessage));
    }
  };

  // Get treatment by ID
  const setTreatmentByTreatmentId = async (patientId: string, treatmentId: string) => {
    dispatch(onSetLoadingTreatments(true));

    try {
      const { data } = await MossApi.get(`/treatments/${patientId}/${treatmentId}`);

      dispatch(onSetActiveTreatment(data.treatment));
    } catch (error: any) {
      dispatch(onSetActiveTreatment(null));
      const errorMessage = error.response.data.msg;
      toast.error(errorMessage);
      dispatch(onSetErrorTreatment(errorMessage));
    }
  };

  // Create treatment
  const startSavingTreatment = async (treatment: ITreatment) => {
    try {
      if (treatment._id) {
        await MossApi.put(`/treatments/${treatment._id}`, treatment);
        router.back();
        toast.success('Treatment updated successfully');
      } else {
        const { data } = await MossApi.post('/treatments/', treatment);

        dispatch(onAddNewTreatment(data.treatment));

        toast.success('Treatment created successfully');
      }
    } catch (error: any) {
      const errorMessage = error.response.data.msg;
      toast.error(errorMessage);
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
    errorMsg,

    // Methods
    unsetActiveTreatment,
    startLoadingTreatment,
    startSavingTreatment,
    setTreatmentByPatientId,
    setTreatmentByTreatmentId,
  };
};
