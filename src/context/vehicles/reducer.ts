import { BaseReduceFunction } from 'context/vehicles/types';
import { mapToAction } from 'context/utils';
import { SetVehicleFiltersActionType, VehiclesState } from 'context/vehicles/types';
import { SET_VEHICLE_FILTERS_ACTION } from 'context/vehicles/action';

export const initialState: VehiclesState = { filters: {} };

export const setVehicleFilters: BaseReduceFunction<SetVehicleFiltersActionType> = (state, action) => ({
  ...state,
  filters: { ...(action.filters ?? state.filters) },
});

const vehiclesReducer = mapToAction(
  {
    [SET_VEHICLE_FILTERS_ACTION]: setVehicleFilters,
  },
  initialState
);

export default vehiclesReducer;
