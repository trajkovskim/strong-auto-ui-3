import React, { createContext, useState } from 'react';

export type FormFieldValue = string | string[] | boolean | boolean[] | number | undefined | null;

export type FormContextType<T> = {
  values: T;
  change: (name: keyof T, value: FormFieldValue) => void;
  getValue: (name: keyof T) => FormFieldValue;
  setValues: (value: T | ((values: T) => T)) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FormContext = createContext<FormContextType<any>>({
  values: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  change: (name, value) => undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getValue: (name) => undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setValues: () => undefined,
});

type Props = React.PropsWithChildren;

const FormContextProvider = <T extends Record<string, FormFieldValue>>(props: Props) => {
  const [state, setState] = useState<T>({} as T);

  const value: FormContextType<T> = {
    getValue: (name) => state[name],
    change: (name, value) => setState({ ...state, [name]: value }),
    setValues: setState,
    values: state,
  };

  return <FormContext.Provider value={value}>{props.children}</FormContext.Provider>;
};

export default FormContextProvider;
