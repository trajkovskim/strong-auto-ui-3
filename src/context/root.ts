import baseReducer from 'context/base/reducer';
import { ApplicationContextState } from 'context/types';
import { combineReducers } from 'context/utils';
import { initialState as initialStateBase } from 'context/base';

export const initialState: ApplicationContextState = {
  base: initialStateBase,
};

const rootReducer = combineReducers<Required<ApplicationContextState>>({
  base: baseReducer,
});

export default rootReducer;
