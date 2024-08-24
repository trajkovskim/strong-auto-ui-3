import { Action } from 'context/types';
import { VehicleFilters } from 'generated';

export type VehiclesState = {
  filters: VehicleFilters;
};

export type BaseReduceFunction<A extends Action> = (state: VehiclesState, action: A) => VehiclesState;

export type SetVehicleFiltersActionType = Action & {
  filters?: VehicleFilters;
};

export type SetVehicleFiltersAction = (vehicleFilters?: VehicleFilters) => SetVehicleFiltersActionType;
