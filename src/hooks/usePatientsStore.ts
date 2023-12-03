import { MossApi } from '@/api';
import { onLoadPatients, onSetActivePatient, onSetLoadingPatients } from '@/redux';
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';
import { useEffect, useState } from 'react';

export const usePatientsStore = () => {
  // Router
  // const router = useRouter();

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
    } catch (error) {
      dispatch(onSetLoadingPatients(false));
      console.log('Error cargando los pacientes');
      console.log(error);
    }
  };

  return {
    // Properties
    patients,
    activePatient,
    loading,
    error,

    // Methods
    unsetActivePatient,
    startLoadingPatients,
  };
};
