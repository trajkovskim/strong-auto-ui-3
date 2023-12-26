import rootReducer, { initialState } from 'context/root';
import { ApplicationContextState } from 'context/types';
import React, { useReducer } from 'react';

export const ApplicationContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  dispatch: (action: unknown) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getState: () => ({} as ApplicationContextState),
});

type Props = React.PropsWithChildren;

const ApplicationContextProvider: React.FC<Props> = (props) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  const value = {
    dispatch,
    getState: () => state,
  };

  return <ApplicationContext.Provider value={value}>{props.children}</ApplicationContext.Provider>;
};

export default ApplicationContextProvider;
