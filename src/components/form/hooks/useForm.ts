import { FormContext, FormContextType, FormFieldValue } from 'components/form/FormProvider';
import { useContext } from 'react';

const useForm = <T = Record<string, FormFieldValue>>() => {
  return useContext(FormContext) as FormContextType<T>;
};

export default useForm;
