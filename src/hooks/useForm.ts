// React
'use client';
import { ChangeEvent, useState } from 'react';

interface TFormState {
  [key: string]: string;
}

export const useForm = <T extends TFormState>(initialForm: T) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    setFormState,
    onInputChange,
    onResetForm,
  };
};
